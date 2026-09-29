// ── Portafolio de productos — fuente única para /productos y el menú ─────────
// Creado 29-sep-2026 (decisión de Lups): la sección "Productos" deja de llevar
// directo a las landings de anuncios. /productos presenta el portafolio y
// ayuda a elegir; las landings quedan para tráfico pagado y links directos.
//
// Reglas:
// · Precios NUNCA escritos a mano aquí: se leen de los archivos de contenido
//   de cada producto (dominaGoogleLaunchContent.ts, tomaTuMercadoContent.ts).
// · En el menú solo aparecen los productos con status "disponible".
// · No toca PRODUCT_ACCENTS / PRODUCT_NAMES / PRODUCT_ROUTES (productTheme.ts):
//   esos alimentan la galería del home y el grafo, que siguen con 4 productos.

import {
  DOMINA_GOOGLE_TOKENS,
  PRODUCT_ACCENTS,
  PRODUCT_NAMES,
  PRODUCT_ROUTES,
  TOMA_TU_MERCADO_TOKENS,
} from "@/config/productTheme";
import {
  HUB,
  PRODUCT_ALLITRON90,
  PRODUCT_LAZUP,
  PRODUCT_LOCAL_LAUNCH,
  PRODUCT_MARKET,
  PRODUCT_SECOND_BRAIN,
} from "@/config/assets";
import { DG_DELIVERY } from "@/data/dominaGoogleContent";
import { getActiveTier } from "@/data/dominaGoogleLaunchContent";
import { TTM_CYCLE, TTM_LAUNCH_TIME, TTM_PACKAGES, founderRemaining } from "@/data/tomaTuMercadoContent";

export type PortfolioStatus = "disponible" | "proximamente";

export interface PortfolioProduct {
  id: "domina-google" | "toma-tu-mercado" | "allitron-90" | "segundo-cerebro" | "lazup";
  name: string;
  status: PortfolioStatus;
  href: string;
  accent: string;
  gradient?: string;
  /** Una línea para el menú. */
  menuLine: string;
  /** El problema que resuelve, en palabras del dueño. */
  problem: string;
  /** Qué es, en una frase. */
  promise: string;
  forWho?: string;
  gets?: readonly string[];
  timing?: string;
  /** Precio de entrada ya formateado (se calcula desde el contenido del producto). */
  priceFrom?: string;
  priceNote?: string;
  image?: string;
  /** Fotos de apoyo para la tarjeta de /productos (rutas del config). */
  gallery?: readonly string[];
  keyword: string;
}

function mxn(n: number): string {
  return `$${n.toLocaleString("es-MX")}`;
}

function ttmEntryPrice(): number {
  const basico = TTM_PACKAGES.find((p) => p.id === "basico");
  if (!basico) return 0;
  return basico.founderPrice !== null && founderRemaining(basico) > 0 ? basico.founderPrice : basico.regularPrice;
}

export const PORTFOLIO: readonly PortfolioProduct[] = [
  {
    id: "domina-google",
    name: PRODUCT_NAMES.local,
    status: "disponible",
    href: PRODUCT_ROUTES.local,
    accent: DOMINA_GOOGLE_TOKENS.accent,
    gradient: DOMINA_GOOGLE_TOKENS.gradient,
    menuLine: "Que te encuentren en Google y Maps antes que a tu competencia",
    problem: "Me buscan y no me encuentran.",
    promise: "Tu negocio visible en Google y Maps, con una web rápida que manda clientes directo a tu WhatsApp.",
    forWho: "Negocios locales que no aparecen en Google, tienen su ficha abandonada o no tienen página.",
    gets: [
      "Ficha de Google Business optimizada",
      "Página web rápida conectada a Maps y a tu WhatsApp",
      "Estudio de tu competencia local",
      "Seguimiento de tu visibilidad por 90 días",
    ],
    timing: `Entrega en ${DG_DELIVERY.delivery}`,
    priceFrom: mxn(getActiveTier().price),
    priceNote: "pago único",
    image: PRODUCT_LOCAL_LAUNCH.heroDesktop,
    gallery: [PRODUCT_LOCAL_LAUNCH.problemaCon, PRODUCT_LOCAL_LAUNCH.historia, PRODUCT_LOCAL_LAUNCH.fase4],
    keyword: "GOOGLE",
  },
  {
    id: "toma-tu-mercado",
    name: "Toma tu Mercado",
    status: "disponible",
    href: "/productos/toma-tu-mercado",
    accent: TOMA_TU_MERCADO_TOKENS.accent,
    gradient: TOMA_TU_MERCADO_TOKENS.gradient,
    menuLine: "Campañas con objetivo comercial, con los anuncios ya incluidos",
    problem: "Ya me conocen, pero no me llegan suficientes clientes.",
    promise: "Estudiamos tu mercado y tus números, y lanzamos una campaña para ir por tus clientes. Los anuncios ya van incluidos.",
    forWho: "Negocios que ya venden, tienen precio definido y quieren más clientes con una campaña medible.",
    gets: [
      "Diagnóstico y estudio de tu competencia",
      "Tus números: cuánto puede costarte cada prospecto",
      "Oferta, mensaje y campaña en Meta (y Google en Profesional)",
      "Inversión mínima en anuncios incluida, con $1,000 al mes de regalo",
    ],
    timing: `Ciclo de ${TTM_CYCLE} · lanzamiento en ${TTM_LAUNCH_TIME}`,
    priceFrom: mxn(ttmEntryPrice()),
    priceNote: "por ciclo, anuncios incluidos",
    image: PRODUCT_MARKET.heroDesktop,
    gallery: [PRODUCT_MARKET.fase2, PRODUCT_MARKET.impresos, PRODUCT_MARKET.problemaCon],
    keyword: "MERCADO",
  },
  {
    id: "allitron-90",
    name: PRODUCT_NAMES["allitron-90"],
    status: "proximamente",
    href: PRODUCT_ROUTES["allitron-90"],
    accent: PRODUCT_ACCENTS["allitron-90"],
    menuLine: "Diagnóstico + roadmap de 90 días",
    problem: "El problema no es de marketing: está dentro del negocio.",
    promise: "Diagnóstico y roadmap de 90 días para ordenar operación, precios y equipo.",
    image: PRODUCT_ALLITRON90.hero,
    keyword: "ALLITRON90",
  },
  {
    id: "segundo-cerebro",
    name: PRODUCT_NAMES["second-brain"],
    status: "proximamente",
    href: PRODUCT_ROUTES["second-brain"],
    accent: PRODUCT_ACCENTS["second-brain"],
    menuLine: "Tu memoria operativa, siempre lista",
    problem: "Todo depende de lo que yo recuerdo.",
    promise: "Procesos, decisiones y conocimiento del negocio en un solo sistema.",
    image: PRODUCT_SECOND_BRAIN.hero,
    keyword: "CEREBRO",
  },
  {
    id: "lazup",
    name: PRODUCT_NAMES.lazup,
    status: "proximamente",
    href: PRODUCT_ROUTES.lazup,
    accent: PRODUCT_ACCENTS.lazup,
    menuLine: "Tu negocio ordenado dentro de WhatsApp",
    problem: "Se me pierden clientes en WhatsApp.",
    promise: "Conversaciones, seguimiento y ventas en un solo lugar.",
    image: PRODUCT_LAZUP.hero,
    keyword: "LAZUP",
  },
];

export const PORTFOLIO_AVAILABLE = PORTFOLIO.filter((p) => p.status === "disponible");
export const PORTFOLIO_SOON = PORTFOLIO.filter((p) => p.status === "proximamente");

/** Guía "¿cuál es para ti?" — cada opción apunta a un producto del portafolio. */
export const PORTFOLIO_GUIDE: readonly { situation: string; productId: PortfolioProduct["id"]; why: string; image: string }[] = [
  {
    situation: "Me buscan en Google y no aparezco, o aparece primero mi competencia.",
    productId: "domina-google",
    why: "Antes de pagar por atraer gente, tu negocio tiene que existir donde te buscan. Es la base.",
    image: PRODUCT_LOCAL_LAUNCH.problemaSin,
  },
  {
    situation: "Ya aparezco y me conocen, pero necesito que me lleguen más clientes cada mes.",
    productId: "toma-tu-mercado",
    why: "Tu negocio ya tiene dónde recibir clientes. Lo que falta es salir a buscarlos con una campaña con números.",
    image: PRODUCT_MARKET.problemaSin,
  },
  {
    situation: "Me llegan clientes, pero el negocio no crece: precios, equipo u operación.",
    productId: "allitron-90",
    why: "Si el problema está dentro del negocio, más anuncios no lo arreglan. Primero se ordena.",
    image: PRODUCT_ALLITRON90.diagnostic,
  },
];

/** Foto del hero de /productos. */
export const PORTFOLIO_HERO_IMAGE = `${PRODUCT_MARKET.equipo}.webp`;
export const PORTFOLIO_HUB_IMAGE = HUB.workSession;
