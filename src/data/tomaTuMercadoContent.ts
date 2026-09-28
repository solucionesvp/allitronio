import { WHATSAPP_NUMBER, buildWhatsAppLink } from "@/config/contact";

// ── Contenido de la landing /productos/toma-tu-mercado ───────────────────────
// Nombre público: "Toma tu Mercado". Nombre interno: "Motor de Captación" —
// NUNCA mostrar el nombre interno en la página.
//
// Espejo de la nota de Obsidian "Toma tu Mercado — Ficha Comercial"
// (01-ALLITRON/01 Productos/Toma tu Mercado). Cuando esta landing se publique,
// la landing pasa a ser la fuente de verdad y la ficha su espejo.
//
// ÚNICA fuente de precio en el código: TTM_PACKAGES (abajo).
// Estado 28-sep-2026: precios PROPUESTOS, pendientes de aprobación de Lups.
// Mientras TTM_PRICES_APPROVED sea false, la página no se indexa (layout.tsx).

export const TTM_PRICES_APPROVED = false;

export const TTM_WHATSAPP_NUMBER = WHATSAPP_NUMBER;
export { buildWhatsAppLink };

// CTA único de la página (mismo criterio que Domina Google).
export const TTM_CTA_LABEL = "QUIERO MI DIAGNÓSTICO GRATIS";

// Palabra clave para clasificar el lead en WhatsApp.
export const TTM_WHATSAPP_MESSAGE = "MERCADO — vi la página de Toma tu Mercado y quiero mi diagnóstico comercial.";

export const TTM_CYCLE = "90 días";
export const TTM_LAUNCH_TIME = "10 a 15 días hábiles";
export const TTM_MARKETS = ["Tepic y Xalisco", "Bahía de Banderas", "Todo Nayarit"] as const;

// ── Paquetes ─────────────────────────────────────────────────────────────────
export interface TtmPackage {
  id: "basico" | "profesional" | "empresarial";
  label: string;
  forWho: string;
  /** Precio fundador (primeros N clientes). null = no aplica. */
  founderPrice: number | null;
  founderSlots: number;
  /** Precio regular del ciclo de 90 días. */
  regularPrice: number;
  /** true = "desde" (se cotiza con tabulador). */
  from: boolean;
  minAdSpend: string;
  highlights: readonly string[];
}

export const TTM_PACKAGES: readonly TtmPackage[] = [
  {
    id: "basico",
    label: "Básico",
    forWho: "Emprendedor o negocio local: una ubicación, un producto o servicio estrella, una ciudad.",
    founderPrice: 11900,
    founderSlots: 5,
    regularPrice: 14900,
    from: false,
    minAdSpend: "$3,000 MXN al mes",
    highlights: [
      "Diagnóstico del problema real",
      "Estudio de 3 a 5 competidores directos",
      "Tus números: cuánto puede costarte cada prospecto",
      "Una oferta y un mensaje principal",
      "Campaña en Facebook e Instagram hacia tu WhatsApp",
      "6 piezas creativas y 1 diseño impreso",
      "Optimización semanal y reporte mensual",
    ],
  },
  {
    id: "profesional",
    label: "Profesional",
    forWho: "PyME establecida: hasta dos ubicaciones o dos líneas de venta, hasta dos ciudades.",
    founderPrice: 24900,
    founderSlots: 5,
    regularPrice: 29900,
    from: false,
    minAdSpend: "$8,000 MXN al mes",
    highlights: [
      "Todo lo del Básico, más:",
      "Estudio de hasta 8 competidores y mapa de quién domina tu mercado",
      "Oferta de entrada para iniciar conversaciones",
      "Meta + Google y remarketing",
      "Landing de campaña y medición completa",
      "12 piezas creativas, medio día de producción en Tepic y kit de 4 impresos",
      "Reporte cada 15 días y sesión mensual de resultados",
    ],
  },
  {
    id: "empresarial",
    label: "Empresarial",
    forWho: "Empresas con varias sucursales, varias ciudades, venta B2B o de ticket alto.",
    founderPrice: null,
    founderSlots: 0,
    regularPrice: 49000,
    from: true,
    minAdSpend: "$20,000 MXN al mes",
    highlights: [
      "Todo lo del Profesional, más:",
      "Campañas por plaza, sucursal o segmento",
      "Escalera de ofertas por línea de venta",
      "TikTok, YouTube o LinkedIn según tu cliente",
      "Integración con tu CRM si aplica",
      "Tablero de métricas y junta quincenal",
      "Alcance a la medida con nuestro tabulador",
    ],
  },
];

// ✏️ Al cerrar una venta fundador, sumar aquí (y volver a desplegar).
// v1 manual y honesta: no hay contador automático.
export const TTM_FOUNDER_SOLD: Record<TtmPackage["id"], number> = {
  basico: 0,
  profesional: 0,
  empresarial: 0,
};

export function formatMXN(n: number): string {
  return `$${n.toLocaleString("es-MX")} MXN`;
}

export function founderRemaining(p: TtmPackage): number {
  return Math.max(0, p.founderSlots - (TTM_FOUNDER_SOLD[p.id] ?? 0));
}

export const TTM_PAYMENT_TERMS =
  "Pagas en tres partes ligadas al avance: 40% al firmar, 30% cuando apruebas la estrategia y 30% al día 30 de la campaña.";

export const TTM_PRICE_NOTE = "Precios por ciclo de 90 días, en MXN. Más IVA si requieres factura. La pauta va aparte.";

// ── Qué incluye cada paquete (explorador navegable) ──────────────────────────
// Valores por paquete: [Básico, Profesional, Empresarial]. "✓" = incluido,
// "—" = no incluido en ese paquete, cualquier otro texto = cantidad o alcance.
export type TtmValues = readonly [string, string, string];

export interface TtmIncludeItem {
  item: string;
  /** Una línea en lenguaje llano: qué es y para qué te sirve. */
  note: string;
  values: TtmValues;
}

export interface TtmIncludeGroup {
  id: string;
  label: string;
  icon: "radar" | "target" | "chart" | "camera";
  intro: string;
  items: readonly TtmIncludeItem[];
}

export const TTM_INCLUDES: readonly TtmIncludeGroup[] = [
  {
    id: "investigacion",
    label: "Investigación",
    icon: "radar",
    intro: "Antes de gastar en anuncios, sabemos dónde estás parado y contra quién compites.",
    items: [
      { item: "Diagnóstico del problema real", note: "Sesión para ubicar dónde se rompe tu venta: si no te conocen, si no te eligen o si te escriben y no compran.", values: ["✓", "✓", "✓"] },
      { item: "Competidores directos analizados", note: "Los negocios que venden lo mismo que tú en tu zona, con su oferta y su forma de comunicar.", values: ["3 a 5", "Hasta 8", "Por plaza"] },
      { item: "Competidores indirectos", note: "Quienes resuelven la misma necesidad de otra manera y te quitan clientes sin parecerse a ti.", values: ["2", "4", "Por plaza"] },
      { item: "Precios, ofertas, anuncios y reseñas de la competencia", note: "Qué cobran, qué prometen, qué anuncian hoy y qué dicen sus clientes.", values: ["✓", "✓", "✓"] },
      { item: "Mapa de quién domina tu mercado", note: "Una vista clara de quién se lleva la atención, en qué canales y con qué ventaja.", values: ["—", "✓", "✓"] },
      { item: "Tus números y proyección en 3 escenarios", note: "Con tu ticket y margen: cuánto puedes pagar por prospecto y qué esperar en un escenario bajo, medio y alto.", values: ["✓", "✓", "✓"] },
    ],
  },
  {
    id: "estrategia",
    label: "Estrategia",
    icon: "target",
    intro: "Decidimos qué vender, cómo decirlo y cómo se ve tu marca en todos lados.",
    items: [
      { item: "Ofertas", note: "La oferta principal de la campaña. En Profesional se suma una oferta de entrada para captar a quien aún no te conoce.", values: ["1", "1 + oferta de entrada", "Por línea"] },
      { item: "Mensajes en prueba", note: "Distintas formas de decir lo mismo. Las medimos y nos quedamos con la que trae más prospectos.", values: ["1", "2", "3 o más"] },
      { item: "Homologación de marca", note: "Que tu negocio se vea y suene igual en anuncios, landing e impresos.", values: ["Básica", "Completa", "Por sucursal"] },
    ],
  },
  {
    id: "campana",
    label: "Campaña y medición",
    icon: "chart",
    intro: "Lo que se lanza, dónde se lanza y cómo sabes si está funcionando.",
    items: [
      { item: "Plataformas", note: "Dónde corren tus anuncios. La inversión en anuncios la pagas tú, directo a la plataforma.", values: ["Facebook e Instagram", "Meta + Google", "Según plan"] },
      { item: "Landing de campaña y remarketing", note: "Una página hecha para convertir esta campaña y anuncios para quien ya te visitó.", values: ["—", "✓", "✓"] },
      { item: "Guion de respuesta para tu WhatsApp", note: "Qué contestar y en qué orden para que un prospecto llegue a comprar. Tú o tu equipo atienden.", values: ["✓", "✓", "✓"] },
      { item: "Reportes", note: "Prospectos, costo por prospecto y ventas que tú nos reportas, con decisiones claras.", values: ["Mensual", "Quincenal", "Quincenal + junta"] },
    ],
  },
  {
    id: "creativos",
    label: "Creativos e impresos",
    icon: "camera",
    intro: "Las piezas que verá tu cliente, en digital y en físico.",
    items: [
      { item: "Piezas creativas del ciclo", note: "Anuncios en imagen y video durante los 90 días.", values: ["6", "12", "Según plan"] },
      { item: "Producción en Tepic", note: "Una sesión de fotos y video en tu negocio, con nuestro equipo.", values: ["—", "Medio día", "Día completo"] },
      { item: "Diseño de impresos", note: "Volantes, lonas, tarjetas o pósters con QR propio. La impresión se cotiza aparte.", values: ["1 pieza", "Hasta 4", "Según alcance"] },
    ],
  },
] as const;

// ── Qué hacemos distinto (3 pilares) ─────────────────────────────────────────
export interface TtmPillar {
  id: string;
  icon: "target" | "radar" | "calculator";
  title: string;
  body: string;
}

export const TTM_PILLARS: readonly TtmPillar[] = [
  {
    id: "problema",
    icon: "target",
    title: "Encontramos el problema real",
    body: "Quieres vender más, pero eso es el síntoma. Revisamos dónde se rompe tu venta: si no te conocen, si no te eligen o si te escriben y no compran. Si tu problema no es de anuncios, te lo decimos.",
  },
  {
    id: "mercado",
    icon: "radar",
    title: "Estudiamos tu mercado",
    body: "Tus competidores directos e indirectos, sus precios, sus ofertas, los anuncios que tienen activos y lo que sus clientes dicen de ellos. Sabrás quién se está llevando la atención y con qué.",
  },
  {
    id: "numeros",
    icon: "calculator",
    title: "Números antes de invertir",
    body: "Con tu ticket promedio y tu margen calculamos cuánto puede costarte, como máximo, cada prospecto. Te damos una proyección en tres escenarios antes de gastar un peso en anuncios.",
  },
];

// ── Método (6 fases) ─────────────────────────────────────────────────────────
export const TTM_METHOD: readonly { n: string; label: string; body: string }[] = [
  { n: "01", label: "Diagnosticar", body: "Una sesión para entender tu objetivo, tus números y dónde se pierde la venta hoy." },
  { n: "02", label: "Investigar", body: "Competencia, precios, ticket promedio, anuncios activos y a quién le estás vendiendo de verdad." },
  { n: "03", label: "Estrategia", body: "La oferta, el mensaje, el camino del prospecto hasta tu WhatsApp y dónde conviene estar: digital, impresos o ambos." },
  { n: "04", label: "Construir", body: "Textos, fotos y videos, landing, medición, impresos y tu marca igual en todos lados." },
  { n: "05", label: "Lanzar y ajustar", body: "Cada semana apagamos lo que no funciona y le damos más a lo que sí, con reglas claras." },
  { n: "06", label: "Medir y decidir", body: "Reporte con prospectos, costo por prospecto y ventas. Al cierre, qué aprendimos y qué sigue." },
];

// ── Impresos ─────────────────────────────────────────────────────────────────
export const TTM_PRINT = {
  title: "¿Tu campaña necesita impresos? Nosotros los resolvemos.",
  body: "Volantes, lonas, tarjetas, pósters de mostrador o rotulación. Los diseñamos dentro de la estrategia, cotizamos con imprentas de confianza, revisamos la calidad y te los entregamos. Cada pieza lleva su propio código QR para saber cuántos clientes trae.",
  note: "El diseño va incluido según tu paquete. La impresión se cotiza aparte y se paga por adelantado.",
} as const;

// ── Pauta aparte ─────────────────────────────────────────────────────────────
export const TTM_ADSPEND = {
  title: "Tu dinero de anuncios es tuyo.",
  body: "La pauta la pagas directo a Meta o Google con tu tarjeta, en tu propia cuenta. Ves cuánto se gasta y nadie se queda con un porcentaje escondido. Nuestro honorario es aparte y fijo.",
} as const;

// ── Requisitos / no es para ti / no incluye ─────────────────────────────────
export const TTM_REQUIREMENTS = [
  "Un producto o servicio que ya vendes, con precio definido",
  "Presupuesto de anuncios mínimo según tu paquete",
  "Alguien que conteste WhatsApp rápido",
  "Disposición para mostrar tu negocio real (fotos o video)",
  "Anotar qué prospectos se vuelven clientes",
] as const;

export const TTM_NOT_FOR = [
  "Esperas vender sin invertir en anuncios",
  "Quieres solo posts bonitos para Instagram",
  "Esperas que nosotros atendamos tu WhatsApp y cerremos tus ventas",
] as const;

export const TTM_EXCLUDES: readonly { title: string; instead: string }[] = [
  { title: "Presupuesto de anuncios", instead: "Lo pagas directo a Meta o Google, en tu cuenta. Te decimos cuánto se necesita según tu paquete." },
  { title: "Costo de impresión", instead: "Cotizamos con imprentas de confianza y se paga por adelantado. Nosotros diseñamos y revisamos la calidad." },
  { title: "Manejo de redes o calendario de publicaciones", instead: "No es este servicio. Aquí se construye una campaña con objetivo de ventas." },
  { title: "Atención de mensajes y cierre de ventas", instead: "Tú o tu equipo contestan. Te dejamos el guion de respuesta para que cierren mejor." },
  { title: "Sitio web completo y posicionamiento en Google", instead: "Eso es Domina Google. Si lo necesitas, se contrata por separado." },
  { title: "Ventas o número de prospectos garantizados", instead: "Nadie honesto puede prometerlo. Sí te garantizamos el trabajo entregado, la medición y los reportes." },
] as const;

// ── Garantía ─────────────────────────────────────────────────────────────────
export const TTM_GUARANTEE = {
  yes: `Investigación entregada, estrategia documentada, campaña lanzada en ${TTM_LAUNCH_TIME} desde que recibimos tu información completa, medición funcionando, optimización y reportes durante los ${TTM_CYCLE}.`,
  no: "Ventas, un número exacto de prospectos o un costo fijo por prospecto. Tampoco resultados si la pauta es menor a la mínima o si tu negocio tarda en contestar. Nadie honesto puede prometerte eso.",
} as const;

// ── Quién lo hace (equipo) ────────────────────────────────────────────────────
// Decisión 28-sep-2026: en esta landing no sale Lups (ya es la cara de Domina
// Google). Se presenta al equipo de Allitron por ROLES, sin afirmar número de
// personas ni cargos que no existan. Las fotos son escenas ilustrativas con IA.
export const TTM_TEAM = {
  eyebrow: "QUIÉN LO HACE",
  title: "Un equipo en Tepic, no un call center.",
  body: "Toma tu Mercado lo trabaja el equipo de Allitron, desde nuestro hub en el centro de Tepic. Conocemos la ciudad, sus colonias y cómo compra la gente de aquí.",
  roles: [
    { title: "Estrategia", body: "Diagnóstico, estudio de mercado, números y la oferta que vamos a llevar a la calle." },
    { title: "Creatividad y producción", body: "Textos, fotos, videos e impresos pensados para vender, no solo para verse bonitos." },
    { title: "Anuncios y medición", body: "Campañas en Meta y Google, medición y ajustes cada semana con reglas claras." },
    { title: "Alli, nuestra IA", body: "Nos ayuda a investigar competidores y ordenar datos más rápido. Las decisiones las toma el equipo." },
  ],
  promise: "Si tu problema no es de anuncios, te lo decimos.",
} as const;

// ── Así funciona, con un ejemplo ─────────────────────────────────────────────
// EJEMPLO ILUSTRATIVO con números ficticios (se rotula así en la página). La
// referencia de CPL para restaurantes ($120–$350) viene de benchmarks
// nacionales publicados (Focus Media, 2026) — ver nota 13 del vault.
export const TTM_EXAMPLE = {
  business: "Restaurante con paquetes para eventos (ejemplo)",
  steps: [
    { label: "Ticket promedio por evento", value: "$9,000" },
    { label: "Ganancia por evento (40%)", value: "$3,600" },
    { label: "Lo máximo que acepta invertir para conseguir un evento (25%)", value: "$900" },
    { label: "De cada 10 cotizaciones cierra", value: "3" },
  ],
  result: { label: "Puede pagar hasta", value: "$270", unit: "por prospecto" },
  reference: "Referencia de mercado para restaurantes en México: entre $120 y $350 por prospecto.",
  verdict: "Los números dan. Vale la pena invertir. Si no dieran, antes de gastar en anuncios ajustamos la oferta, el precio o el seguimiento.",
  note: "Ejemplo ilustrativo con números ficticios. Tu cálculo se hace con tus datos reales en el diagnóstico.",
} as const;

// ── Qué recibes (entregables tangibles) ─────────────────────────────────────
export const TTM_DELIVERABLES: readonly { title: string; body: string }[] = [
  { title: "Diagnóstico por escrito", body: "Dónde se rompe tu venta hoy y qué conviene atacar primero." },
  { title: "Estudio de mercado", body: "Tus competidores, sus precios, sus ofertas y los anuncios que ya están pagando." },
  { title: "Tus números", body: "Cuánto puedes pagar por cada prospecto y una proyección en tres escenarios." },
  { title: "La estrategia", body: "La oferta, el mensaje y el camino que sigue tu cliente hasta escribirte." },
  { title: "La campaña funcionando", body: "Piezas, anuncios, medición y, si aplica, landing e impresos." },
  { title: "Reportes que se entienden", body: "Prospectos, costo por prospecto y ventas. Sin likes de relleno." },
];

// Leyenda obligatoria de imágenes (regla de Allitron para escenas con IA).
export const TTM_AI_NOTE = "Escenas ilustrativas creadas con IA. Las personas que aparecen son ficticias.";

// ── Preguntas directas ───────────────────────────────────────────────────────
export const TTM_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "¿En qué es distinto de que me manejen las redes?",
    a: "El manejo de redes te entrega publicaciones al mes. Toma tu Mercado te entrega una campaña con objetivo comercial: a quién le hablas, qué le ofreces, cuánto te cuesta cada prospecto y qué se ajusta cada semana.",
  },
  {
    q: "¿Me garantizan ventas?",
    a: "No. Las ventas dependen también de tu producto, tu precio y cómo atiendes. Lo que sí te damos antes de invertir es una proyección en tres escenarios, y la actualizamos con datos reales al día 30.",
  },
  {
    q: "¿Por qué 90 días?",
    a: "La primera semana se aprende, el primer mes se ajusta y el segundo y tercero se aprovecha lo que funciona. Una campaña de 30 días se apaga justo cuando empieza a tener datos.",
  },
  {
    q: "¿Cuánto tengo que invertir en anuncios?",
    a: "Desde $3,000 MXN al mes en el paquete Básico. El monto ideal lo definimos en el diagnóstico con tus números. Lo pagas directo a la plataforma.",
  },
  {
    q: "¿Y si no tengo página web?",
    a: "El Básico lleva tus anuncios directo a tu WhatsApp, así que no la necesitas para arrancar. Si nadie te encuentra en Google, te vamos a recomendar primero Domina Google.",
  },
  {
    q: "¿Qué pasa después de los 90 días?",
    a: "Te entregamos un reporte de cierre con lo aprendido. Puedes seguir con la optimización mensual o arrancar un ciclo nuevo con otra oferta, temporada o ciudad.",
  },
  {
    q: "¿Qué es el precio fundador?",
    a: "Los primeros 5 clientes de los paquetes Básico y Profesional entran a precio fundador a cambio de permitirnos documentar su caso con cifras reales. Cuando se ocupan, aplica el precio regular.",
  },
];
