// ── Envío de inscripciones — Hub / Tecnólogos ────────────────────
//
// Sin backend todavía en el proyecto (sin API routes, sin service de email
// configurado). Implementación actual: mailto (cero infraestructura,
// funciona hoy). Si más adelante se conecta Resend u otro servicio,
// esta es la única función que hay que cambiar — el formulario no se toca.
//
// TODO: reemplazar por POST a /api/inscripcion cuando exista backend real.

export const INSCRIPCION_DESTINO = "auroraialazaro@gmail.com"; // ajustar a inbox oficial si existe otro

export interface InscripcionData {
  nombre: string;
  proyecto: string;
  descripcion: string;
  buscando: string;
  email: string;
  whatsapp?: string;
  postularEvento: boolean;
}

export function formatInscripcionBody(data: InscripcionData): string {
  return [
    `Nombre: ${data.nombre}`,
    `Proyecto / especialidad: ${data.proyecto}`,
    `Descripción: ${data.descripcion}`,
    `Qué busca: ${data.buscando}`,
    `Email de contacto: ${data.email}`,
    data.whatsapp ? `WhatsApp: ${data.whatsapp}` : null,
    `¿Postula para Revolución Tecnológica (20 sept)?: ${data.postularEvento ? "Sí" : "No"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Abre el cliente de correo con la inscripción pre-llenada. */
export function submitInscripcionByEmail(data: InscripcionData): { mailtoUrl: string; body: string } {
  const subject = `Inscripción Hub Allitron — ${data.nombre}`;
  const body = formatInscripcionBody(data);
  const mailtoUrl = `mailto:${INSCRIPCION_DESTINO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { mailtoUrl, body };
}
