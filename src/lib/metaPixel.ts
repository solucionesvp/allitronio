// ── Meta Pixel — utilidades ──────────────────────────────────────────────
// El pixel SOLO se activa si existe NEXT_PUBLIC_META_PIXEL_ID (variable de
// entorno en Vercel). Sin ID, todo esto es un no-op: no se carga nada ni se
// rastrea nada, y el Aviso de privacidad no menciona el pixel.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const META_PIXEL_ENABLED = META_PIXEL_ID.length > 0;

type Fbq = (action: "track" | "trackCustom", event: string, params?: Record<string, unknown>) => void;

/** Evento estándar de Meta (ej. "Lead", "Contact"). No hace nada si el pixel no está activo. */
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (!META_PIXEL_ENABLED || typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}
