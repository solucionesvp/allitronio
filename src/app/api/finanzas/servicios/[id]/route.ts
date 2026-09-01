import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import { getFinanzasRole, getFinanzasPersona, getClientIp } from "@/lib/finanzasAuth";
import { registrarAuditoria } from "@/lib/finanzasAudit";

// ── /api/finanzas/servicios/[id] — editar / borrar. Solo admin. ────────────

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const role = getFinanzasRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { id } = await ctx.params;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const allowed = ["proyecto_id", "nombre", "valor", "moneda", "periodicidad", "clientes_activos", "notas"];
  const update: Record<string, unknown> = {};
  for (const k of allowed) if (k in body) update[k] = body[k];

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "nothing_to_update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("finanzas_servicios")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  await registrarAuditoria(supabase, {
    persona: getFinanzasPersona(req),
    accion: "editar",
    entidad: "servicio",
    entidad_id: id,
    detalle: data.nombre,
    ip: getClientIp(req),
  });

  return NextResponse.json({ ok: true, servicio: data });
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const role = getFinanzasRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { id } = await ctx.params;
  const { data: existing } = await supabase.from("finanzas_servicios").select("nombre").eq("id", id).maybeSingle();
  const { error } = await supabase.from("finanzas_servicios").delete().eq("id", id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  await registrarAuditoria(supabase, {
    persona: getFinanzasPersona(req),
    accion: "eliminar",
    entidad: "servicio",
    entidad_id: id,
    detalle: existing?.nombre || "",
    ip: getClientIp(req),
  });

  return NextResponse.json({ ok: true });
}
