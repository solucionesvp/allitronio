import { esZonaValida } from "./tz";
import { ZONA_OFICINA } from "./config";

export interface DatosCliente {
  nombre: string;
  email: string;
  whatsapp: string | null;
  empresa: string | null;
  notas: string | null;
}

const EMAIL_RE = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]{2,}$/;
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Texto sin caracteres de control; los campos de una línea además colapsan saltos y espacios dobles (evita saltos en asuntos de correo). */
function limpiar(v: unknown, max: number, multilinea = false): string {
  if (typeof v !== "string") return "";
  const t = v.replace(CONTROL_RE, "");
  return (multilinea ? t : t.replace(/\s+/g, " ")).trim().slice(0, max);
}

export function validarCliente(raw: unknown): { ok: true; datos: DatosCliente } | { ok: false; error: string } {
  const r = (raw ?? {}) as Record<string, unknown>;
  const nombre = limpiar(r.nombre, 100);
  const email = limpiar(r.email, 254).toLowerCase();
  const whatsapp = limpiar(r.whatsapp, 30);
  const empresa = limpiar(r.empresa, 120);
  const notas = limpiar(r.notas, 500, true);

  if (nombre.length < 2) return { ok: false, error: "Escribe tu nombre." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Revisa tu correo electrónico." };
  if (whatsapp) {
    const digitos = whatsapp.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 15) return { ok: false, error: "Revisa tu número de WhatsApp (10 dígitos)." };
  }
  return { ok: true, datos: { nombre, email, whatsapp: whatsapp || null, empresa: empresa || null, notas: notas || null } };
}

export function zonaCliente(v: unknown): string {
  return typeof v === "string" && v.length < 64 && esZonaValida(v) ? v : ZONA_OFICINA;
}

export function esFechaIso(v: unknown): v is string {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(v) && !Number.isNaN(Date.parse(v));
}

export function esUrlHttps(v: unknown): v is string {
  if (typeof v !== "string") return false;
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
}
