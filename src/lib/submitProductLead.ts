// ── Envío de leads de producto (landing pages) ───────────────────
// Mismo patrón que submitInscripcion.ts: mailto hoy, sin backend.
// Si se conecta un servicio de email/CRM real, solo se cambia esta función.

import { INSCRIPCION_DESTINO } from "./submitInscripcion";

export interface ProductLeadData {
  nombre: string;
  empresa?: string;
  contacto: string; // email o WhatsApp
  mensaje?: string;
}

export function formatProductLeadBody(product: string, data: ProductLeadData): string {
  return [
    `Producto: ${product}`,
    `Nombre: ${data.nombre}`,
    data.empresa ? `Empresa: ${data.empresa}` : null,
    `Contacto: ${data.contacto}`,
    data.mensaje ? `Mensaje: ${data.mensaje}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function submitProductLead(
  product: string,
  data: ProductLeadData
): { mailtoUrl: string; body: string } {
  const subject = `Información ${product} — ${data.nombre}`;
  const body = formatProductLeadBody(product, data);
  const mailtoUrl = `mailto:${INSCRIPCION_DESTINO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { mailtoUrl, body };
}
