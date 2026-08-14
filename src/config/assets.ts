/**
 * ALLITRON — Central Asset Registry
 *
 * Este archivo es la única fuente de verdad para rutas de medios estáticos.
 * Nunca hardcodees rutas en componentes; impórtalas desde aquí.
 *
 * Para agregar un asset:
 *   1. Coloca el archivo en la carpeta indicada bajo public/
 *   2. La ruta ya está registrada — simplemente refresca.
 *
 * @see docs/ASSETS.md — Guía humana completa de assets
 */

const B = "/assets" as const;

// ── Brand ────────────────────────────────────────────────────────
export const BRAND_LOGO = {
  /** Logo principal (sobre fondos oscuros) */
  primary: `${B}/brand/logo/allitron-primary.svg`,
  /** Logo versión clara (para navbar sobre fondo oscuro) */
  light: `${B}/brand/logo/allitron-light.svg`,
  /** Logo versión oscura (para secciones claras) */
  dark: `${B}/brand/logo/allitron-dark.svg`,
  /** Isotipo / marca sin wordmark */
  mark: `${B}/brand/logo/allitron-mark.svg`,
} as const;

export const BRAND_ALLI = {
  /** Alli — versión full color, fondo transparente */
  primary: `${B}/brand/alli/alli-primary.webp`,
  /** Alli — versión sobre fondo azul Allitron */
  blue: `${B}/brand/alli/alli-blue.webp`,
  /** Alli — versión monocromática / ghosting */
  monochrome: `${B}/brand/alli/alli-monochrome.webp`,
} as const;

// ── Products ─────────────────────────────────────────────────────
export const PRODUCT_ALLITRON90 = {
  hero: `${B}/products/allitron-90/hero.webp`,
  diagnostic: `${B}/products/allitron-90/diagnostic.webp`,
  roadmap: `${B}/products/allitron-90/roadmap.webp`,
} as const;

export const PRODUCT_LOCAL = {
  hero: `${B}/products/local/local-hero.webp`,
  analysis: `${B}/products/local/local-analysis.webp`,
  build: `${B}/products/local/local-build.webp`,
  result: `${B}/products/local/local-result.webp`,
} as const;

export const PRODUCT_SECOND_BRAIN = {
  hero: `${B}/products/second-brain/hero.webp`,
  telegram: `${B}/products/second-brain/telegram.webp`,
  vault: `${B}/products/second-brain/vault.webp`,
} as const;

export const PRODUCT_LAZUP = {
  hero: `${B}/products/lazup/hero.webp`,
  conversations: `${B}/products/lazup/conversations.webp`,
  crm: `${B}/products/lazup/crm.webp`,
  appointments: `${B}/products/lazup/appointments.webp`,
} as const;

// ── Hub ──────────────────────────────────────────────────────────
export const HUB = {
  exterior: `${B}/hub/hub-exterior.webp`,
  interiorWide: `${B}/hub/hub-interior-wide.webp`,
  interior01: `${B}/hub/hub-interior-01.webp`,
  interior02: `${B}/hub/hub-interior-02.webp`,
  workSession: `${B}/hub/hub-work-session.webp`,
  event: `${B}/hub/hub-event.webp`,
  detail: `${B}/hub/hub-detail.webp`,
  /** Video — atmosphera del Hub en loop silencioso */
  atmosphere: `${B}/hub/hub-atmosphere.mp4`,
  /** Video — loop corto de evento */
  eventLoop: `${B}/hub/hub-event-loop.mp4`,
} as const;

/** Fotos de fondo para las 3 tarjetas de selección del Hub (/hub) —
 * una por audiencia: público general, empresas, productos digitales. */
export const HUB_PATHS_IMAGES = {
  publico: `${B}/hub/paths/publico.webp`,
  empresa: `${B}/hub/paths/empresa.webp`,
  creador: `${B}/hub/paths/creador.webp`,
} as const;

// ── Nayarit ──────────────────────────────────────────────────────
export const NAYARIT = {
  tepic: {
    city01: `${B}/nayarit/tepic/tepic-city-01.webp`,
    city02: `${B}/nayarit/tepic/tepic-city-02.webp`,
    street01: `${B}/nayarit/tepic/tepic-street-01.webp`,
    detail01: `${B}/nayarit/tepic/tepic-detail-01.webp`,
  },
  hub: {
    exterior: `${B}/nayarit/hub/hub-nayarit.webp`,
  },
} as const;

// ── Events ───────────────────────────────────────────────────────
export const EVENTS = {
  "2026-09-20": {
    hero: `${B}/events/2026-09-20/event-hero.webp`,
    space: `${B}/events/2026-09-20/event-space.webp`,
    speaker01: `${B}/events/2026-09-20/speaker-01.webp`,
    speaker02: `${B}/events/2026-09-20/speaker-02.webp`,
    speaker03: `${B}/events/2026-09-20/speaker-03.webp`,
    atmosphere: `${B}/events/2026-09-20/event-atmosphere.mp4`,
  },
} as const;

// ── People ───────────────────────────────────────────────────────
export const PEOPLE = {
  alejandroValdez: `${B}/people/alejandro-valdez.webp`,
  lups: `${B}/people/lups.webp`,
} as const;

// ── Convenience aggregate (optional, for component use) ──────────
export const ASSETS = {
  brand: { logo: BRAND_LOGO, alli: BRAND_ALLI },
  products: {
    allitron90: PRODUCT_ALLITRON90,
    local: PRODUCT_LOCAL,
    secondBrain: PRODUCT_SECOND_BRAIN,
    lazup: PRODUCT_LAZUP,
  },
  hub: HUB,
  nayarit: NAYARIT,
  events: EVENTS,
  people: PEOPLE,
} as const;

export type AssetPath = string;
