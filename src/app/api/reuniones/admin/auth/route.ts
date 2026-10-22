import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESION, LOGIN_MAX_FALLIDOS, LOGIN_VENTANA_MIN, SESION_DURACION_DIAS } from "@/lib/reuniones/config";
import { ipDe } from "@/lib/reuniones/admin";
import { getReunionesDb } from "@/lib/reuniones/db";
import { intentosRecientes, limpiarIntentos, registrarIntento } from "@/lib/reuniones/limites";
import { firmarSesion, type Persona } from "@/lib/reuniones/session";
import { comparaSeguro } from "@/lib/reuniones/tokens";
import { json, NO_CONFIG } from "../../_http";

// POST: valida el código y entrega una cookie FIRMADA (no un valor simple).
// DELETE: cierra sesión. Sin códigos o sin secreto configurados, nadie entra.
export async function POST(req: NextRequest) {
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  const codigos: { code: string | undefined; persona: Persona }[] = [
    { code: process.env.REUNIONES_CODE_LUPS, persona: "Lups" },
    { code: process.env.REUNIONES_CODE_ALEJANDRO, persona: "Alejandro" },
  ];
  const activos = codigos.filter((c) => c.code && c.code.length >= 8);
  if (activos.length === 0 || !process.env.REUNIONES_SESSION_SECRET) return json(NO_CONFIG, 503);

  const ip = ipDe(req);
  if ((await intentosRecientes(db, ip, "login_fallido", LOGIN_VENTANA_MIN)) >= LOGIN_MAX_FALLIDOS) {
    return json({ ok: false, error: "too_many_attempts", retryAfterSeconds: LOGIN_VENTANA_MIN * 60 }, 429);
  }

  let code = "";
  try {
    code = String((await req.json()).code ?? "");
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const match = activos.find((c) => comparaSeguro(code, c.code as string));
  if (!match) {
    await registrarIntento(db, ip, "login_fallido");
    return json({ ok: false, error: "wrong_code" }, 401);
  }

  const valor = await firmarSesion(match.persona);
  if (!valor) return json(NO_CONFIG, 503);
  await limpiarIntentos(db, ip, "login_fallido");

  const res = NextResponse.json({ ok: true, persona: match.persona }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(COOKIE_SESION, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * SESION_DURACION_DIAS,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(COOKIE_SESION, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
