import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import { getFinanzasRole } from "@/lib/finanzasAuth";

// ── /api/finanzas/auditoria — bitácora de cambios. Solo admin. ─────────────
// Miki (viewer) no necesita ver quién cambió qué a este nivel de detalle;
// si eso cambia, basta con quitar esta restricción.

export async function GET(req: NextRequest) {
  const role = getFinanzasRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("finanzas_auditoria")
    .select("*")
    .order("momento", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, auditoria: data });
}
