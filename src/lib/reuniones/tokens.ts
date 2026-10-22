import { randomBytes, createHash, timingSafeEqual } from "node:crypto";

/** Token privado e impredecible (192 bits) para el enlace de gestión de cada reunión. */
export function nuevoToken(): string {
  return randomBytes(24).toString("base64url");
}

export function tokenValido(t: string): boolean {
  return /^[A-Za-z0-9_-]{32}$/.test(t);
}

/** Comparación en tiempo constante (para códigos de acceso). */
export function comparaSeguro(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}
