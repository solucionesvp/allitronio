import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";

// ── /api/finanzas/config — tipo de cambio y corte ───────────────────────────
function getRole(req: NextRequest): "admin" | "viewer" | null {
  const v = req.cookies.get("finanzas_session")?.value;
  return v === "admin" || v === "viewer" ? v : null;
}

export async function GET(req: NextRequest) {
  const role = getRole(req);
  if (!role) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase.from("finanzas_config").select("*").eq("id", 1).maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, config: data || { tipo_cambio: 16.95 } });
}

export async function PATCH(req: NextRequest) {
  const role = getRole(req);
  if (role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: { tipo_cambio?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (typeof body.tipo_cambio !== "number" || body.tipo_cambio <= 0) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("finanzas_config")
    .upsert({ id: 1, tipo_cambio: body.tipo_cambio })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, config: data });
}
