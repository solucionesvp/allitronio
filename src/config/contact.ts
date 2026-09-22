// ── Contacto único de WhatsApp (campañas) ────────────────────────────────────
// Un solo número para todo el sitio. Formato E.164 sin "+": 52 (México) + 10
// dígitos. Cambiarlo aquí lo cambia en landing, botones, formularios y chat.
// Número confirmado por Lups el 21-sep-2026 para iniciar campañas.
export const WHATSAPP_NUMBER = "523111612222";
export const WHATSAPP_DISPLAY = "311 161 2222";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensaje prellenado con palabra clave (para clasificar el lead en WhatsApp) y
 * origen (qué botón o página lo generó). Ej.:
 *   GOOGLE — Hola, quiero mi diagnóstico.
 *
 *   (Origen: Domina Google · botón hero)
 */
export function withOrigin(keyword: string, text: string, origin: string): string {
  return `${keyword} — ${text}\n\n(Origen: ${origin})`;
}

export function waLink(keyword: string, text: string, origin: string): string {
  return buildWhatsAppLink(withOrigin(keyword, text, origin));
}

/** Palabra clave y nombre legible según la página donde está el usuario. */
export function contextFromPath(pathname: string): { keyword: string; label: string } {
  if (pathname.startsWith("/productos/domina-google")) return { keyword: "GOOGLE", label: "Domina Google" };
  if (pathname.startsWith("/productos/lazup")) return { keyword: "LAZUP", label: "LAZUP" };
  if (pathname.startsWith("/productos/segundo-cerebro")) return { keyword: "CEREBRO", label: "Segundo Cerebro" };
  if (pathname.startsWith("/productos/allitron-90")) return { keyword: "ALLITRON90", label: "Allitron 90" };
  if (pathname.startsWith("/evento")) return { keyword: "EVENTO", label: "Evento" };
  if (pathname.startsWith("/hub")) return { keyword: "HUB", label: "Hub" };
  return { keyword: "WEB", label: pathname === "/" ? "Inicio" : pathname };
}

/** Palabra clave a partir del nombre de producto de los formularios. */
export function keywordForProduct(product: string): string {
  const p = product.toLowerCase();
  if (p.includes("google")) return "GOOGLE";
  if (p.includes("lazup")) return "LAZUP";
  if (p.includes("cerebro")) return "CEREBRO";
  if (p.includes("allitron 90") || p.includes("diagn")) return "ALLITRON90";
  return "WEB";
}
