import { NextRequest } from "next/server";

// ── Rol y persona de la sesión de /interno/finanzas ────────────────────────
// role: controla permisos (admin puede escribir, viewer solo lee).
// persona: identifica a quién pertenece la sesión (Lups / Alejandro / Miki),
// usado únicamente para la bitácora de auditoría — nunca para autorizar.

export type FinanzasRole = "admin" | "viewer";
export type FinanzasPersona = "Lups" | "Alejandro" | "Miki";

export function getFinanzasRole(req: NextRequest): FinanzasRole | null {
  const v = req.cookies.get("finanzas_session")?.value;
  return v === "admin" || v === "viewer" ? v : null;
}

export function getFinanzasPersona(req: NextRequest): FinanzasPersona | "desconocido" {
  const v = req.cookies.get("finanzas_persona")?.value;
  if (v === "Lups" || v === "Alejandro" || v === "Miki") return v;
  return "desconocido";
}

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
