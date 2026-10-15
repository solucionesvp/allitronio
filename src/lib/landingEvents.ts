// ── Eventos de la landing Toma el Volante ───────────────────────────────────
// Medición mínima y sin datos personales. Hoy la única herramienta instalada es
// el Meta Pixel (solo activo si existe NEXT_PUBLIC_META_PIXEL_ID). Estos eventos:
//   · se envían como eventos personalizados al Pixel, si está activo;
//   · se emiten también como CustomEvent "allitron:analytics" en window, para
//     que una herramienta futura (o una prueba A/B) los escuche sin tocar la página.
// Los parámetros nunca incluyen nombre, agencia, ciudad ni mensaje del formulario.

import { META_PIXEL_ENABLED } from "@/lib/metaPixel";

export type LandingEventName =
  | "landing_view"
  | "hero_cta_click"
  | "system_demo_view"
  | "calculator_interaction"
  | "pricing_view"
  | "diagnosis_cta_click"
  | "diagnosis_form_start"
  | "diagnosis_form_submit_success"
  | "diagnosis_form_submit_error";

export interface LandingEventParams {
  /** Sección que originó la interacción (hero, sistema, calculadora, precio, cierre…). */
  section?: string;
  /** Variante para pruebas A/B futuras. */
  variant?: string;
  [key: string]: string | number | boolean | undefined;
}

const PRODUCT = "toma-el-volante";
const fired = new Set<string>();

type Fbq = (action: "trackCustom", event: string, params?: Record<string, unknown>) => void;

export function trackLandingEvent(name: LandingEventName, params: LandingEventParams = {}) {
  if (typeof window === "undefined") return;
  const payload = { product: PRODUCT, ...params };
  if (META_PIXEL_ENABLED) {
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (typeof fbq === "function") fbq("trackCustom", name, payload);
  }
  window.dispatchEvent(new CustomEvent("allitron:analytics", { detail: { event: name, ...payload } }));
}

/** Dispara el evento una sola vez por visita (evita duplicados al re-render o re-scroll). */
export function trackLandingEventOnce(name: LandingEventName, params: LandingEventParams = {}, key = name) {
  if (fired.has(key)) return;
  fired.add(key);
  trackLandingEvent(name, params);
}
