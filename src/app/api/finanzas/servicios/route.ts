import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";

// ── /api/finanzas/servicios — catálogo de servicios activos ────────────────
// (valor, periodicidad, clientes activos en bruto — sin nombres). GET:
// admin o viewer. POST: solo admin.

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
    .from("finanzas_servicios")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, servicios: data });
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
  return NextResponse.json({ ok: true, servicio: data });
}
