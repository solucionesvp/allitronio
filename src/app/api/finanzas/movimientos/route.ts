import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";

// ── /api/finanzas/movimientos — listar (GET) y crear (POST) ────────────────
// GET: admin o viewer. POST: solo admin (Lups / Alejandro). Miki consulta,
// no carga — si reporta un gasto, alguno de los dos lo registra por él.

function getRole(req: NextRequest): "admin" | "viewer" | null {
  const v = req.cookies.get("finanzas_session")?.value;
  return v === "admin" || v === "viewer" ? v : null;
}

export async function GET(req: NextRequest) {
  const role = getRole(req);
  if (!role) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("finanzas_movimientos")
    .select("*")
    .order("orden", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, movimientos: data });
}

export async function POST(req: NextRequest) {
  const role = getRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { proyecto, concepto, fecha, monto, moneda, quien_pago, estado, notas } = body as {
    proyecto?: string; concepto?: string; fecha?: string; monto?: number;
    moneda?: string; quien_pago?: string; estado?: string; notas?: string;
  };

  if (!proyecto || !concepto || !fecha || typeof monto !== "number" || !moneda || !quien_pago || !estado) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const { data: maxRow } = await supabase
    .from("finanzas_movimientos")
    .select("orden")
    .order("orden", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrden = (maxRow?.orden ?? 0) + 1;

  const { data, error } = await supabase
    .from("finanzas_movimientos")
    .insert({ proyecto, concepto, fecha, monto, moneda, quien_pago, estado, notas: notas || "", orden: nextOrden })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, movimiento: data });
}
