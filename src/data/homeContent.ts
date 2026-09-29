// ── Contenido del home (rediseño 29-sep-2026) ───────────────────────────────
// Misma esencia que las landings: hero con foto, cuerpo claro, un camino
// claro. El home presenta a Allitron y reparte al visitante: los productos se
// explican en /productos; las landings quedan para anuncios y links directos.
// Precios: nunca aquí (se leen del portafolio). Cifras de clientes: solo las
// aprobadas en DG_PROOF_CASES, con su periodo y fuente.

import { HERO, HUB, PRODUCT_ALLITRON90, PRODUCT_LOCAL_LAUNCH, PRODUCT_MARKET } from "@/config/assets";

export const HOME_HERO = {
  eyebrow: "ALLITRON · TEPIC, NAYARIT",
  title: "Tu negocio, encontrado, elegido y vendiendo.",
  body: "Somos el hub de tecnología, IA y estrategia de Nayarit. Primero encontramos dónde se rompe tu venta; después construimos lo que hace falta para arreglarla, con números.",
  primary: "QUIERO MI DIAGNÓSTICO GRATIS",
  secondary: "VER PRODUCTOS",
  /** Foto aprobada por Lups (21-sep-2026). Original sin recortes: se encuadra
   * con object-position hacia Alli y un degradado cubre el texto integrado. */
  image: HERO.hero,
  /** Móvil: la foto de escritorio trae texto integrado que se asoma al recortar;
   * se usa el vertical de Domina Google (Alli en la plaza de Tepic). */
  imageMobile: `${PRODUCT_LOCAL_LAUNCH.heroMovil}.webp`,
  trust: ["Hub en el centro de Tepic", "Estrategia + IA + ejecución", "Diagnóstico sin costo"],
} as const;

/** Dónde se rompe la venta — cada problema lleva a su solución. */
export const HOME_BREAKS: readonly {
  n: string;
  title: string;
  body: string;
  image: string;
  productId: "domina-google" | "toma-tu-mercado" | "allitron-90";
  cta: string;
}[] = [
  {
    n: "01",
    title: "No te encuentran",
    body: "Te buscan en Google y aparece tu competencia. Sin ficha cuidada ni página, el cliente se va antes de saber que existes.",
    image: PRODUCT_LOCAL_LAUNCH.problemaSin,
    productId: "domina-google",
    cta: "Se resuelve con Domina Google",
  },
  {
    n: "02",
    title: "Te conocen, pero no te llegan suficientes clientes",
    body: "Publicas, promocionas, pero el teléfono no suena lo que necesitas. Falta una campaña que sepa a quién hablarle y cuánto cuesta cada cliente.",
    image: PRODUCT_MARKET.problemaSin,
    productId: "toma-tu-mercado",
    cta: "Se resuelve con Toma tu Mercado",
  },
  {
    n: "03",
    title: "Te llegan, pero el negocio no crece",
    body: "Precios, equipo u operación. Si el problema está adentro, más anuncios no lo arreglan: primero se ordena el negocio.",
    image: PRODUCT_ALLITRON90.hero,
    productId: "allitron-90",
    cta: "Allitron 90 · próximamente",
  },
];

export const HOME_METHOD: readonly { n: string; label: string; body: string; image: string }[] = [
  { n: "01", label: "Diagnosticar", body: "Ubicamos dónde se pierde la venta hoy. Si tu problema no es de marketing, te lo decimos.", image: PRODUCT_MARKET.fase1 },
  { n: "02", label: "Investigar", body: "Tu mercado, tu competencia, tus precios y tus números antes de gastar un peso.", image: PRODUCT_MARKET.fase2 },
  { n: "03", label: "Construir", body: "Lo que haga falta: presencia en Google, campañas, piezas, medición e impresos.", image: PRODUCT_LOCAL_LAUNCH.fase3 },
  { n: "04", label: "Medir y ajustar", body: "Reportes que se entienden y decisiones cada semana. Sin likes de relleno.", image: PRODUCT_MARKET.fase6 },
];

export const HOME_HUB = {
  eyebrow: "EL HUB",
  title: "Un equipo en Tepic, no un call center.",
  body: "Allitron vive en el centro de Tepic. Aquí trabajamos, damos talleres y recibimos a dueños de negocio que quieren crecer con tecnología y criterio.",
  images: [HUB.event, HUB.interior01, HUB.interior02],
  cta: "CONOCER EL HUB",
} as const;

export const HOME_FINAL = {
  title: "¿Dónde se está rompiendo tu venta?",
  body: "Escríbenos. En el diagnóstico gratis lo revisamos contigo y te decimos qué conviene, aunque la respuesta sea que todavía no inviertas.",
  cta: "QUIERO MI DIAGNÓSTICO GRATIS",
  image: PRODUCT_MARKET.ctaFinal,
} as const;
