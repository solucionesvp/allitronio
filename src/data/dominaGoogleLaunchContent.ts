import { DG_INCLUDES } from "./dominaGoogleContent";
import { PRODUCT_LOCAL_LAUNCH } from "@/config/assets";
import { WHATSAPP_NUMBER, buildWhatsAppLink } from "@/config/contact";

// ── Contenido de la landing de LANZAMIENTO /productos/domina-google/lanzamiento ──
// Landing de campaña (tráfico pagado), separada de la evergreen /productos/domina-google.
// Reutiliza el mismo copy base y las mismas reglas de la Ficha Comercial de
// Obsidian ("MAPS 2.0 — Ficha Comercial" — nombre público sigue siendo
// "Domina Google", nunca mostrar el nombre interno).
//
// Precio real vigente en producción (evergreen): $13,000 MXN flat.
// Esta landing ofrece tiers de lanzamiento por tiempo/cupo limitado, definidos
// en la sesión de estrategia del 17-18 sep 2026 (ver doc "MAPS 2.0 × Allitron —
// Landing Page y Oferta de Lanzamiento"), meta: 20 clientes en 45 días.

// Número de WhatsApp único del sitio: ver src/config/contact.ts (21-sep-2026).
export const DG_WHATSAPP_NUMBER = WHATSAPP_NUMBER;
export { buildWhatsAppLink };

export const DG_WHATSAPP_MESSAGE =
  "GOOGLE — vi la landing de Domina Google y quiero mi diagnóstico.";

export interface LaunchTier {
  id: string;
  label: string;
  slots: number;
  price: number;
  priceLabel: string;
}

// Cupo total de lanzamiento: 20 clientes / 45 días.
export const DG_LAUNCH_TIERS: LaunchTier[] = [
  { id: "fundador", label: "Fundador", slots: 5, price: 5999, priceLabel: "$5,999 MXN" },
  { id: "early", label: "Early", slots: 10, price: 9999, priceLabel: "$9,999 MXN" },
  { id: "lanzamiento", label: "Lanzamiento", slots: 5, price: 14999, priceLabel: "$14,999 MXN" },
];

// ✏️ ÚNICO NÚMERO QUE CAMBIAS al cerrar una venta: cuántos lugares de
// lanzamiento llevas vendidos (real). Se reparte solo entre los niveles en
// orden: los primeros 5 son Fundador, los siguientes 10 Early y los últimos 5
// Lanzamiento. Después de editarlo, hay que volver a desplegar la página
// (no hay backend/CRM conectado todavía: v1 manual y honesta, no un contador
// automático inventado).
export const DG_LAUNCH_SOLD_TOTAL = 3;

export const DG_LAUNCH_TOTAL_SLOTS = DG_LAUNCH_TIERS.reduce((acc, tier) => acc + tier.slots, 0);

// Precio regular vigente de la evergreen (Ficha Comercial, $13,000 MXN flat).
// Se usa solo como ancla de comparación en los niveles que cuestan menos.
export const DG_REGULAR_PRICE = 13000;

export const DG_LAUNCH_SOLD: Record<string, number> = (() => {
  let left = Math.max(0, Math.min(DG_LAUNCH_SOLD_TOTAL, DG_LAUNCH_TOTAL_SLOTS));
  const result: Record<string, number> = {};
  for (const tier of DG_LAUNCH_TIERS) {
    const taken = Math.min(left, tier.slots);
    result[tier.id] = taken;
    left -= taken;
  }
  return result;
})();

export function getActiveTier(): LaunchTier {
  for (const tier of DG_LAUNCH_TIERS) {
    if ((DG_LAUNCH_SOLD[tier.id] ?? 0) < tier.slots) return tier;
  }
  return DG_LAUNCH_TIERS[DG_LAUNCH_TIERS.length - 1];
}

export function getTotalRemaining(): number {
  return DG_LAUNCH_TIERS.reduce(
    (acc, tier) => acc + Math.max(0, tier.slots - (DG_LAUNCH_SOLD[tier.id] ?? 0)),
    0
  );
}

// Mercados de la campaña — no reparte tráfico parejo, ver doc de estrategia.
export const DG_LAUNCH_MARKETS = ["Tepic y Bahía de Banderas", "Puerto Vallarta", "Mazatlán y Culiacán"] as const;

// Piezas nuevas sobre el alcance evergreen (DG_INCLUDES en dominaGoogleContent.ts).
// Formalizan cosas que en la Ficha Comercial estaban PENDIENTE (dominio, hosting,
// rondas de revisión) y suman valor de bajo costo real (QR, seguimiento extendido).
export const DG_LAUNCH_ADDONS = [
  "Dominio conectado si ya lo tienes, o registrado a tu nombre si no — primer año incluido",
  "Hosting en Vercel, primer año incluido",
  "2 rondas de revisión formales",
  "Auditoría de mercado y competencia, entregada como documento",
  "Tarjeta/QR de reseña directa a tu ficha de Google",
  "Seguimiento de posición y visibilidad por 90 días (automatizado)",
] as const;

export const DG_LAUNCH_DELIVERY = {
  delivery: "7 días hábiles",
  deliveryNote:
    "El reloj arranca cuando nos compartes el 100% de tu información, fotos y textos. Sin material completo, no corre el tiempo.",
} as const;

// Diferenciador vs. agencias de SEO local que cobran mensualidad — benchmark
// real, ver doc de estrategia sección "Benchmark competitivo".
export const DG_LAUNCH_DIFFERENTIATOR =
  "Otras agencias cobran entre $8,500 y $35,000 MXN AL MES por SEO local. Esto se paga una sola vez.";

// ── Historia (sección "Quién está detrás") ───────────────────────────────────
// TEXTO A CONFIRMAR POR LUPS: solo afirma lo que ya está en su posicionamiento
// ("Arquitecto de Sistemas para Negocios Locales") y en el alcance real del
// producto. No agregar anécdotas ni cifras que no sean verificables.
export const DG_STORY = {
  eyebrow: "QUIÉN ESTÁ DETRÁS",
  title: "Construyo sistemas para negocios locales.",
  paragraphs: [
    "Soy Lups, arquitecto de sistemas para negocios locales en Tepic. Domina Google resuelve una sola cosa: que cuando alguien busque tu servicio en Google, te encuentre a ti y pueda escribirte por WhatsApp en segundos.",
    "Alli es quien te acompaña en el proceso. Yo respondo por que la parte técnica quede instalada, validada y funcionando.",
  ],
} as const;

// ── Oferta agrupada en 3 bloques ─────────────────────────────────────────────
// Reagrupa los 9 puntos de DG_INCLUDES + los 6 de DG_LAUNCH_ADDONS (15 en total,
// ninguno se pierde ni se reescribe). Los índices apuntan a esas listas: si se
// reordena alguna, revisar aquí.
const inc = (...i: number[]) => i.map((n) => DG_INCLUDES[n]);
const add = (...i: number[]) => i.map((n) => DG_LAUNCH_ADDONS[n]);

export interface OfferGroup {
  id: string;
  title: string;
  icon: "search" | "chat" | "shield";
  items: readonly string[];
}

export const DG_OFFER_GROUPS: readonly OfferGroup[] = [
  {
    id: "encuentran",
    title: "Te encuentran cuando te buscan",
    icon: "search",
    items: [...inc(2, 3, 4, 5), ...add(3)],
  },
  {
    id: "escriben",
    title: "Te escriben directo",
    icon: "chat",
    items: [...inc(1, 6, 0), ...add(4)],
  },
  {
    id: "listo",
    title: "Queda instalado y validado",
    icon: "shield",
    items: [...inc(7, 8), ...add(0, 1, 2, 5)],
  },
];

// ── Preguntas directas ───────────────────────────────────────────────────────
export const DG_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "¿Por qué no es más barato?",
    a: "Puede haber opciones más baratas. La diferencia es que no trabajamos solo por publicar o diseñar: construimos la infraestructura completa.",
  },
  { q: "¿Y si ya tengo página web?", a: "La conectamos y optimizamos. No empezamos de cero si no hace falta." },
  { q: "¿Qué pasa si no tengo dominio?", a: "Se registra a tu nombre. El primer año va incluido en el paquete." },
  { q: "¿Cuánto tarda?", a: `${DG_LAUNCH_DELIVERY.delivery} desde que tenemos tu información completa.` },
  { q: "¿Qué pasa después de la entrega?", a: "Seguimiento de posición y visibilidad por 90 días, incluido." },
];

// ── PRUEBA (casos antes/después y logos) — HOY VACÍO A PROPÓSITO ────────────
// La landing solo pinta estas secciones cuando hay datos reales. No inventar
// resultados. Para agregar un caso:
//   1. Guardar en public/assets/products/local/lanzamiento/prueba/:
//      <id>-web.webp (captura de su web) y <id>-google.webp (ficha/panel).
//   2. Agregar el objeto abajo con cifras copiadas TAL CUAL de la captura y su periodo.
//   3. `approved: true` SOLO con permiso escrito del cliente (ver `permiso_prueba`
//      en su ficha de Obsidian). Con `approved: false` no se pinta nada.
//   4. `url` es opcional: solo si el cliente autoriza el enlace y es dominio oficial.
// Logos: guardar prueba/logos/<slug>.svg (o png) y agregar {slug, name}.
export interface LaunchProofMetric {
  value: string;
  label: string;
}

export interface LaunchProofCase {
  id: string;
  business: string | null;
  niche: string;
  city: string;
  /** Rutas SIN extensión, ej. `${PRODUCT_LOCAL_LAUNCH.proofDir}/daxit-web` */
  web: string;
  google: string;
  /** Cifras verificables de la captura. Nada estimado. */
  metrics: readonly LaunchProofMetric[];
  /** Periodo y fuente de las cifras, tal como aparece en la captura. */
  period: string;
  caption?: string;
  url?: string;
  approved: boolean;
}

export interface LaunchProofLogo {
  slug: string;
  name: string;
}

export const DG_PROOF_CASES: readonly LaunchProofCase[] = [
  {
    id: "daxit",
    business: "Daxit Nails",
    niche: "Salón de belleza",
    city: "Tepic",
    web: `${PRODUCT_LOCAL_LAUNCH.proofDir}/daxit-web`,
    google: `${PRODUCT_LOCAL_LAUNCH.proofDir}/daxit-google`,
    metrics: [
      { value: "122", label: "llamadas desde su ficha" },
      { value: "345", label: "solicitudes de cómo llegar" },
      { value: "4.8 ★", label: "76 reseñas en Google" },
    ],
    period: "Ficha de Google · may–sept 2026",
    approved: true,
  },
  {
    id: "adal",
    business: "ADAL Electronics",
    niche: "Reparación de celulares",
    city: "Tepic",
    web: `${PRODUCT_LOCAL_LAUNCH.proofDir}/adal-web`,
    google: `${PRODUCT_LOCAL_LAUNCH.proofDir}/adal-google`,
    metrics: [{ value: "413", label: "interacciones con su ficha de Google" }],
    period: "Ficha de Google · abr–sept 2026",
    url: "https://www.adalelectronics.mx",
    approved: true,
  },
  {
    id: "odontic",
    business: "Odontic Tepic Clinic",
    niche: "Clínica dental",
    city: "Tepic",
    web: `${PRODUCT_LOCAL_LAUNCH.proofDir}/odontic-web`,
    google: `${PRODUCT_LOCAL_LAUNCH.proofDir}/odontic-google`,
    metrics: [
      { value: "310", label: "interacciones con su ficha de Google" },
      { value: "3.77 mil", label: "apariciones en búsquedas de Google" },
    ],
    period: "Ficha: abr–sept 2026 · Búsquedas (Search Console): últimos 3 meses",
    url: "https://odontictepic.com",
    approved: true,
  },
  // En pausa hasta vincular su web a la ficha (la captura muestra "Agregar sitio web")
  // y recapturar. Sin cifras de panel todavía.
  {
    id: "zamora",
    business: "Dra. Cinthya Nava",
    niche: "Ginecología y obstetricia",
    city: "Zamora",
    web: `${PRODUCT_LOCAL_LAUNCH.proofDir}/zamora-web`,
    google: `${PRODUCT_LOCAL_LAUNCH.proofDir}/zamora-google`,
    metrics: [{ value: "4.8 ★", label: "17 reseñas en Google" }],
    period: "Google Maps · sept 2026",
    approved: false,
  },
];
export const DG_PROOF_LOGOS: readonly LaunchProofLogo[] = [];
export const DG_PROOF_LOGO_BASE = `${PRODUCT_LOCAL_LAUNCH.proofDir}/logos`;

// Otros negocios con sitio propio (solo enlace; sin cifras). Dominios verificados
// que cargan. Agregar aquí solo con permiso del cliente.
export interface LaunchProofLink {
  name: string;
  niche: string;
  url: string;
  domain: string;
}

export const DG_PROOF_LINKS: readonly LaunchProofLink[] = [
  { name: "UC Universidad Continental", niche: "Educación superior · Tepic", url: "https://univercidadcontinetal.com/", domain: "univercidadcontinetal.com" },
  { name: "Soluciones Prontas en Electricidad", niche: "Instalaciones eléctricas · Tepic", url: "https://www.solucionesprontas.com/", domain: "solucionesprontas.com" },
  { name: "Soluciones VP", niche: "Bombas y equipo · Nayarit", url: "https://www.solucionesvp.com/", domain: "solucionesvp.com" },
  { name: "Lockers JGA México", niche: "Fabricante de lockers", url: "https://lockersjgamexico.com/", domain: "lockersjgamexico.com" },
];
