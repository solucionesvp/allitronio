// ── Sesión firmada del panel interno ────────────────────────────────────────
// A diferencia de una cookie con valor simple ("ok"), esta lleva firma HMAC:
// no se puede fabricar ni modificar sin REUNIONES_SESSION_SECRET. Usa Web
// Crypto, así funciona igual en el proxy (Edge) y en las API routes (Node).
// Si el secreto no está configurado, NADIE entra (falla cerrado).

import { SESION_DURACION_DIAS } from "./config";

export type Persona = "Lups" | "Alejandro";

const enc = new TextEncoder();

function secreto(): string | null {
  const s = process.env.REUNIONES_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of u8) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string, key: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return b64url(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
}

function iguales(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function firmarSesion(persona: Persona): Promise<string | null> {
  const key = secreto();
  if (!key) return null;
  const exp = Date.now() + SESION_DURACION_DIAS * 24 * 60 * 60 * 1000;
  const payload = `${persona}.${exp}`;
  return `${payload}.${await hmac(payload, key)}`;
}

export async function verificarSesion(valor: string | undefined | null): Promise<Persona | null> {
  const key = secreto();
  if (!key || !valor) return null;
  const partes = valor.split(".");
  if (partes.length !== 3) return null;
  const [persona, exp, firma] = partes;
  if (persona !== "Lups" && persona !== "Alejandro") return null;
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return null;
  const esperada = await hmac(`${persona}.${exp}`, key);
  return iguales(firma, esperada) ? persona : null;
}
