import { NextRequest, NextResponse } from "next/server";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import { getClientIp } from "@/lib/finanzasAuth";
import { checkRateLimit, registerFailedAttempt, resetAttempts } from "@/lib/finanzasRateLimit";

// ── /api/finanzas/auth — valida el código y pone la cookie de sesión ───────
// Mismo principio que /api/entregas/auth: los códigos NUNCA viven en el
// bundle del cliente, solo en variables de entorno del servidor. Sin
// FINANZAS_CODE_* configurado en el hosting, el acceso queda bloqueado
// (falla cerrado, no abierto). A diferencia de entregas, aquí el código
// determina un ROL (admin o viewer) y una PERSONA (para auditoría), no
// solo "entró / no entró".
//
// Incluye rate limiting por IP (5 intentos fallidos → bloqueo 15 min) para
// que un código de 8 caracteres no quede expuesto a fuerza bruta sin límite.

const ALL_CODES = [
  { code: process.env.FINANZAS_CODE_LUPS, role: "admin", persona: "Lups" },
  { code: process.env.FINANZAS_CODE_ALEJANDRO, role: "admin", persona: "Alejandro" },
  { code: process.env.FINANZAS_CODE_MIKI, role: "viewer", persona: "Miki" },
] as const;
const CODES = ALL_CODES.filter((c) => Boolean(c.code));

export async function POST(req: NextRequest) {
  const supabase = getFinanzasSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  if (CODES.length === 0) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip = getClientIp(req);
  const rl = await checkRateLimit(supabase, ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "too_many_attempts", retryAfterSeconds: rl.retryAfterSeconds },
      { status: 429 }
    );
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { code } = body;
  const match = code ? CODES.find((c) => c.code === code) : undefined;

  if (!match) {
    await registerFailedAttempt(supabase, ip);
    return NextResponse.json({ ok: false, error: "wrong_code" }, { status: 401 });
  }

  await resetAttempts(supabase, ip);

  const res = NextResponse.json({ ok: true, role: match.role });
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: "/",
  };
  res.cookies.set("finanzas_session", match.role, cookieOpts);
  res.cookies.set("finanzas_persona", match.persona, cookieOpts);
  return res;
}
