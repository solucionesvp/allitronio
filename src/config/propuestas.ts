// ── Kit de propuestas comerciales Allitron ───────────────────────────────
// Escenas de Alli (generadas en Higgsfield con el elemento `alli-avatar-v2`,
// bloques fijos de identidad y color de la nota 21 del vault) que se reusan en
// TODAS las propuestas: una por tipo de sección, nunca por cliente.
// Originales 2000px en `_originales/propuestas-alli/` (no se suben).
// Para agregar una escena nueva: mismo prompt base (ver vault → Plantilla —
// Propuesta comercial Allitron), exportar 1600 y 800 px en WebP.

const P = "/assets/propuestas/alli";

export type EscenaAlli = "portada" | "carta" | "investigacion" | "plan" | "meta" | "calendario" | "cierre";

export interface EscenaInfo {
  sm: string;
  lg: string;
  alt: string;
  /** Punto focal para object-position en pantallas angostas (Alli visible). */
  foco: string;
}

export const ALLI_ESCENAS: Record<EscenaAlli, EscenaInfo> = {
  portada: { sm: `${P}/alli-portada-800.webp`, lg: `${P}/alli-portada-1600.webp`, alt: "Alli da la bienvenida en una oficina luminosa", foco: "72% 50%" },
  carta: { sm: `${P}/alli-carta-800.webp`, lg: `${P}/alli-carta-1600.webp`, alt: "Alli sostiene una carta en su escritorio", foco: "74% 50%" },
  investigacion: { sm: `${P}/alli-investigacion-800.webp`, lg: `${P}/alli-investigacion-1600.webp`, alt: "Alli investiga con una lupa en una calle de Tepic", foco: "62% 50%" },
  plan: { sm: `${P}/alli-plan-800.webp`, lg: `${P}/alli-plan-1600.webp`, alt: "Alli explica el plan frente a un pizarrón", foco: "80% 50%" },
  meta: { sm: `${P}/alli-meta-800.webp`, lg: `${P}/alli-meta-1600.webp`, alt: "Alli señala una gráfica que sube", foco: "30% 50%" },
  calendario: { sm: `${P}/alli-calendario-800.webp`, lg: `${P}/alli-calendario-1600.webp`, alt: "Alli marca avances en un calendario", foco: "68% 50%" },
  cierre: { sm: `${P}/alli-cierre-800.webp`, lg: `${P}/alli-cierre-1600.webp`, alt: "Alli ofrece la mano para cerrar el acuerdo", foco: "55% 50%" },
};

export const ALLI_AVATAR = {
  sm: `${P}/alli-faq-160.webp`,
  lg: `${P}/alli-faq-640.webp`,
} as const;
