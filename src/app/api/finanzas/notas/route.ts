import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import { getFinanzasRole, getFinanzasPersona, getClientIp } from "@/lib/finanzasAuth";
import { registrarAuditoria } from "@/lib/finanzasAudit";

// ── /api/finanzas/notas — pendientes / temas abiertos (fiscal, legal, etc.) ─
// GET: admin o viewer. POST: solo admin. No es asesoría — es una bitácora
// de temas a resolver con quien corresponda.

export async function GET(req: NextRequest) {
  const role = getFinanzasRole(req);
  if (!role) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("finanzas_notas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, notas: data });
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

  const { categoria, titulo, detalle, estado } = body as {
    categoria?: string; titulo?: string; detalle?: string; estado?: string;
  };

  if (!categoria || !titulo) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const persona = getFinanzasPersona(req);
  const { data, error } = await supabase
    .from("finanzas_notas")
    .insert({
      categoria,
      titulo,
      detalle: detalle || "",
      estado: estado || "pendiente",
      creado_por: persona,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  await registrarAuditoria(supabase, {
    persona,
    accion: "crear",
    entidad: "nota",
    entidad_id: data.id,
    detalle: `[${categoria}] ${titulo}`,
    ip: getClientIp(req),
  });

  return NextResponse.json({ ok: true, nota: data });
}
