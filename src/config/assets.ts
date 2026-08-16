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
  primary: `${B}/brand/alli/alli-primary.png`,
  /** Alli — versión sobre fondo azul Allitron */
  blue: `${B}/brand/alli/alli-blue.png`,
  /** Alli — versión monocromática / ghosting */
  monochrome: `${B}/brand/alli/alli-monochrome.png`,
} as const;

// ── Hero ─────────────────────────────────────────────────────────
export const HERO = {
  /** Retrato/visual con efecto magnético (sigue el cursor) en el Hero del
   * home. Puede ser una persona (Lups, Alejandro, equipo) o un visual de
   * marca — decisión abierta, no asumida por el código. */
  portrait: `${B}/hero/hero-portrait.png`,
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

// ── Placeholders remotos ─────────────────────────────────────────
/**
 * Fotos reales (Unsplash, licencia libre) que se muestran mientras el asset
 * local correspondiente no exista. Evita que un slot sin foto se vea vacío.
 * Se reemplazan solas en cuanto el archivo local aparece en public/.
 *
 * Agrupadas por tema para que el placeholder tenga sentido con la sección
 * donde vive — no son fotos genéricas al azar.
 */
export const PLACEHOLDER = {
  /** Interfaz / dashboard / producto digital */
  product: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  /** Pantalla de app / mensajería en móvil */
  app: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
  /** Notas / conocimiento / escritorio de trabajo */
  knowledge: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
  /** Analítica / SEO / métricas */
  analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  /** Espacio de coworking — interior */
  spaceInterior: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  /** Espacio / edificio — exterior */
  spaceExterior: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
  /** Sesión de trabajo en equipo */
  workSession: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  /** Evento / conferencia / audiencia */
  event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
  /** Retrato de persona — perfil profesional */
  person: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
  /** Ciudad / entorno urbano */
  city: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1600&q=80",
} as const;

export type PlaceholderTheme = keyof typeof PLACEHOLDER;

/**
 * Imágenes de apoyo (Unsplash, licencia libre) para secciones que necesitan
 * ritmo visual mientras no exista material propio. A diferencia de
 * PLACEHOLDER — que sustituye a un archivo local ausente — estas son
 * ilustrativas por diseño: acompañan al contenido, no simulan producto.
 *
 * Reemplazar por material propio antes de considerarlo definitivo.
 */
export const STOCK = {
  /** Allitron 90 — un visual por paso del diagnóstico */
  a90: [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  ],
  /** LAZUP — una por vertical (servicios, hotelería/reservas, inmobiliaria) */
  lazupVerticals: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  ],
  /** Segundo Cerebro — apoyo visual de captura y conocimiento */
  secondBrain: [
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1200&q=80",
  ],
} as const;

// ── Convenience aggregate (optional, for component use) ──────────
export const ASSETS = {
  brand: { logo: BRAND_LOGO, alli: BRAND_ALLI },
  hero: HERO,
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
