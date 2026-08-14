// ── Envío genérico de flujos inmersivos (Hub) ─────────────────────
// Mismo patrón mailto que submitInscripcion.ts / submitProductLead.ts,
// generalizado para cualquier conjunto de campos — usado por los 3 caminos
// del Hub sin triplicar lógica de envío.

import { INSCRIPCION_DESTINO } from "./submitInscripcion";

export interface FlowSubmission {
  subjectPrefix: string;
  /** key -> pregunta legible, en el orden que deben aparecer en el correo */
  fieldLabels: [key: string, label: string][];
  values: Record<string, string | boolean | undefined>;
  destination?: string;
}

export function formatFlowBody(sub: FlowSubmission): string {
  return sub.fieldLabels
    .map(([key, label]) => {
      const v = sub.values[key];
      if (v === undefined || v === "") return null;
      const display = typeof v === "boolean" ? (v ? "Sí" : "No") : v;
      return `${label}: ${display}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function submitFlow(sub: FlowSubmission): { mailtoUrl: string; body: string } {
  const nameValue = sub.values["nombre"];
  const subject = `${sub.subjectPrefix}${typeof nameValue === "string" && nameValue ? ` — ${nameValue}` : ""}`;
  const body = formatFlowBody(sub);
  const destination = sub.destination ?? INSCRIPCION_DESTINO;
  const mailtoUrl = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { mailtoUrl, body };
}
