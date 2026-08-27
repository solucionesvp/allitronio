import { NextRequest, NextResponse } from "next/server";

// ── /api/entregas/auth — valida el código y pone la cookie de sesión ───────
// Los códigos NUNCA viven en el bundle del cliente: solo existen en el
// servidor, vía variables de entorno. Sin ENTREGAS_CODE_* configurado en el
// hosting, el acceso a esa ruta queda bloqueado (falla cerrado, no abierto).

const CODE_BY_SCOPE: Record<string, string | undefined> = {
  entregas_familia: process.env.ENTREGAS_CODE_FAMILIA,
  entregas_shineray: process.env.ENTREGAS_CODE_SHINERAY,
};

const VALID_SCOPES = new Set(Object.keys(CODE_BY_SCOPE));

export async function POST(req: NextRequest) {
  let body: { code?: string; scope?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { code, scope } = body;

  if (!scope || !VALID_SCOPES.has(scope)) {
    return NextResponse.json({ ok: false, error: "invalid_scope" }, { status: 400 });
  }

  const expected = CODE_BY_SCOPE[scope];
  if (!expected) {
    // No configurado en este entorno — falla cerrado.
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!code || code !== expected) {
    return NextResponse.json({ ok: false, error: "wrong_code" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(scope, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: "/",
  });
  return res;
}
