import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import { getFinanzasRole, getFinanzasPersona, getClientIp } from "@/lib/finanzasAuth";
import { registrarAuditoria } from "@/lib/finanzasAudit";

// ── /api/finanzas/servicios — catálogo de servicios activos ────────────────
// (valor, periodicidad, clientes activos en bruto — sin nombres). GET:
// admin o viewer. POST: solo admin.

export async function GET(req: NextRequest) {
  const role = getFinanzasRole(req);
  if (!role) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("finanzas_servicios")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, servicios: data });
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

  const { proyecto_id, nombre, valor, moneda, periodicidad, clientes_activos, notas } = body as {
    proyecto_id?: string | null; nombre?: string; valor?: number; moneda?: string;
    periodicidad?: string; clientes_activos?: number; notas?: string;
  };

  if (!nombre || typeof valor !== "number" || !moneda || !periodicidad) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("finanzas_servicios")
    .insert({
      proyecto_id: proyecto_id || null,
      nombre,
      valor,
      moneda,
      periodicidad,
      clientes_activos: clientes_activos || 0,
      notas: notas || "",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  await registrarAuditoria(supabase, {
    persona: getFinanzasPersona(req),
    accion: "crear",
    entidad: "servicio",
    entidad_id: data.id,
    detalle: `${nombre} — ${valor} ${moneda}/${periodicidad}`,
    ip: getClientIp(req),
  });

  return NextResponse.json({ ok: true, servicio: data });
}
