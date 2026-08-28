import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";

// ── /api/finanzas/movimientos/[id] — editar (PATCH) y borrar (DELETE) ─────
// Solo admin (Lups / Alejandro). Miki no puede modificar ni borrar nada.

function getRole(req: NextRequest): "admin" | "viewer" | null {
  const v = req.cookies.get("finanzas_session")?.value;
  return v === "admin" || v === "viewer" ? v : null;
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const role = getRole(req);
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

  const allowed = ["proyecto", "concepto", "fecha", "monto", "moneda", "quien_pago", "estado", "notas"];
  const update: Record<string, unknown> = {};
  for (const k of allowed) if (k in body) update[k] = body[k];

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "nothing_to_update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("finanzas_movimientos")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, movimiento: data });
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const role = getRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { id } = await ctx.params;
  const { error } = await supabase.from("finanzas_movimientos").delete().eq("id", id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
