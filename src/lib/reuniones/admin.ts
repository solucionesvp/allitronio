import type { NextRequest } from "next/server";
import { COOKIE_SESION } from "./config";
import { verificarSesion, type Persona } from "./session";

export async function personaAdmin(req: NextRequest): Promise<Persona | null> {
  return verificarSesion(req.cookies.get(COOKIE_SESION)?.value);
}

export function ipDe(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
