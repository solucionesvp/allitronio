import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import { getFinanzasRole, getFinanzasPersona, getClientIp } from "@/lib/finanzasAuth";
import { registrarAuditoria } from "@/lib/finanzasAudit";

// ── /api/finanzas/proyectos — catálogo dinámico de productos, eventos y ────
// activos de socios. GET: admin o viewer. POST: solo admin.

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
  const role = getFinanzasRole(req);
  if (!role) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("finanzas_proyectos")
    .select("*")
    .order("orden", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, proyectos: data });
}

export async function POST(req: NextRequest) {
  const role = getFinanzasRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { nombre, tipo, propietario_inversion, descripcion, recurrente_mensual_mxn, precio_recuperacion_mensual, meta_clientes_recuperacion } = body as {
    nombre?: string; tipo?: string; propietario_inversion?: string;
    descripcion?: string; recurrente_mensual_mxn?: number;
    precio_recuperacion_mensual?: number; meta_clientes_recuperacion?: number;
  };

  if (!nombre || !tipo || !propietario_inversion) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!["producto", "evento", "activo_socio"].includes(tipo)) {
    return NextResponse.json({ ok: false, error: "bad_tipo" }, { status: 400 });
  }

  const { data: maxRow } = await supabase
    .from("finanzas_proyectos")
    .select("orden")
    .order("orden", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrden = (maxRow?.orden ?? 0) + 1;

  const { data, error } = await supabase
    .from("finanzas_proyectos")
    .insert({
      slug: slugify(nombre) + "-" + Date.now().toString(36),
      nombre,
      tipo,
      propietario_inversion,
      descripcion: descripcion || "",
      recurrente_mensual_mxn: recurrente_mensual_mxn || 0,
      precio_recuperacion_mensual: precio_recuperacion_mensual || 0,
      meta_clientes_recuperacion: meta_clientes_recuperacion || 0,
      orden: nextOrden,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  await registrarAuditoria(supabase, {
    persona: getFinanzasPersona(req),
    accion: "crear",
    entidad: "proyecto",
    entidad_id: data.id,
    detalle: `${nombre} (${tipo})`,
    ip: getClientIp(req),
  });

  return NextResponse.json({ ok: true, proyecto: data });
}
