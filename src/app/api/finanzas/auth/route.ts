import { NextRequest, NextResponse } from "next/server";

// ── /api/finanzas/auth — valida el código y pone la cookie de sesión ───────
// Mismo principio que /api/entregas/auth: los códigos NUNCA viven en el
// bundle del cliente, solo en variables de entorno del servidor. Sin
// FINANZAS_CODE_* configurado en el hosting, el acceso queda bloqueado
// (falla cerrado, no abierto). A diferencia de entregas, aquí el código
// determina un ROL (admin o viewer), no solo "entró / no entró".

const ADMIN_CODES = [process.env.FINANZAS_CODE_LUPS, process.env.FINANZAS_CODE_ALEJANDRO].filter(
  (c): c is string => Boolean(c)
);
const VIEWER_CODES = [process.env.FINANZAS_CODE_MIKI].filter((c): c is string => Boolean(c));

export async function POST(req: NextRequest) {
  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { code } = body;

  if (ADMIN_CODES.length === 0 && VIEWER_CODES.length === 0) {
    // No hay ningún FINANZAS_CODE_* configurado en este entorno.
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!code) {
    return NextResponse.json({ ok: false, error: "wrong_code" }, { status: 401 });
  }

  let role: "admin" | "viewer" | null = null;
  if (ADMIN_CODES.includes(code)) role = "admin";
  else if (VIEWER_CODES.includes(code)) role = "viewer";

  if (!role) {
    return NextResponse.json({ ok: false, error: "wrong_code" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, role });
  res.cookies.set("finanzas_session", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: "/",
  });
  return res;
}
