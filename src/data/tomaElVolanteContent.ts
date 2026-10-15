import { WHATSAPP_NUMBER, buildWhatsAppLink } from "@/config/contact";

// ── Contenido de la landing /productos/toma-el-volante ───────────────────────
// Vertical automotriz de Toma tu Mercado ("Toma el Volante · by Toma tu Mercado").
// Espejo de las notas de Obsidian 18 (vertical automotriz) y 19 (pauta y precios
// beta) en 01-ALLITRON/01 Productos/Toma tu Mercado. Mientras la Ficha Comercial
// no los absorba, ESTE archivo es la única fuente de precio de este producto.
//
// Estado 14-oct-2026: niveles de pauta y paquete único completo aprobados por
// Lups; precios y reglas de grupo pendientes de su OK final. Mientras
// VOLANTE_PRICES_APPROVED sea false la página no se indexa (layout.tsx).
// Prueba social: este producto aún no tiene casos; no se muestra ninguna cifra
// de resultados. Las agencias y personas de las escenas son ficticias.

export const VOLANTE_PRICES_APPROVED = false;

export const VOLANTE_WHATSAPP_NUMBER = WHATSAPP_NUMBER;
export { buildWhatsAppLink };

export const VOLANTE_CTA_LABEL = "SOLICITAR DIAGNÓSTICO COMERCIAL";
export const VOLANTE_CTA_SECONDARY = "VER CÓMO FUNCIONA";
export const VOLANTE_WHATSAPP_MESSAGE =
  "VOLANTE — vi la página de Toma el Volante y quiero el diagnóstico de mi agencia.";

export const VOLANTE_CYCLE = "90 días";

// ── Precios (90 días, MXN, sin IVA, sin pauta) ───────────────────────────────
export const VOLANTE_PRICE = {
  regular: 55900,
  beta: 49900,
  betaSlots: 5,
  /** Cuántos lugares beta se han vendido. Actualizar a mano al cerrar. */
  betaSold: 0,
  payments: [19960, 14970, 14970] as const, // 40/30/30 sobre el precio beta
  continuityMonthly: 8900,
} as const;

export const VOLANTE_ADSPEND_FLOOR = 8000;

export function formatMXN(n: number): string {
  return `$${n.toLocaleString("es-MX")} MXN`;
}

export function volanteBetaRemaining(): number {
  return Math.max(0, VOLANTE_PRICE.betaSlots - VOLANTE_PRICE.betaSold);
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export const VOLANTE_HERO = {
  eyebrow: "TOMA EL VOLANTE · POR TOMA TU MERCADO",
  title: "LLEGAN MENSAJES. SE ENFRÍAN. Y LA VENTA SE LA LLEVA LA AGENCIA DE ENFRENTE.",
  body: "En 90 días conectamos campañas, atención, seguimiento y medición para que tu concesionaria sepa qué ocurre entre el primer mensaje y el cierre.",
  note: `Para concesionarias y grupos automotrices de Nayarit. Beta: hasta ${VOLANTE_PRICE.betaSlots} grupos.`,
} as const;

// ── Historia del problema ────────────────────────────────────────────────────
export const VOLANTE_STORY = {
  eyebrow: "LUNES, 9:40",
  title: "Nadie perdió esa venta en el anuncio.",
  paragraphs: [
    "El fin de semana la agencia invirtió en anuncios. El lunes por la mañana hay veintitrés mensajes nuevos. Dos asesores están con clientes en piso. Uno contesta “¿en qué le puedo ayudar?” a las 2 de la tarde. Otro manda el mismo PDF a todos.",
    "Del otro lado hay alguien que preguntó por un modelo el sábado en la noche. Hoy ya habló con la agencia de enfrente. Le contestaron en diez minutos, con su nombre y con una cita.",
    "No fue un problema de presupuesto. Fue un problema de lo que pasa después del clic.",
  ],
  fictionNote:
    "Escena ilustrativa. Las agencias y las personas que aparecen son ficticias.",
} as const;

export const VOLANTE_SIN = {
  label: "COMO SE OPERA HOY",
  body: "Se paga el anuncio, llegan mensajes sin filtro y cada asesor contesta como puede. Nadie sabe cuánto cuesta una cita que sí llega, ni cuántas de esas citas terminan en venta.",
} as const;

export const VOLANTE_CON = {
  label: "CON UN SISTEMA",
  body: "Cada mensaje llega calificado, tiene dueño y tiene hora de respuesta. El tablero muestra el camino de cada lead hasta el cierre y la pauta sube o baja según lo que cuesta cada cita.",
} as const;

// ── Las cuatro fugas ─────────────────────────────────────────────────────────
export const VOLANTE_LEAKS: readonly { title: string; body: string }[] = [
  {
    title: "Entrada sin calificar",
    body: "Todo mensaje se trata igual: el que quiere cotizar un crédito y el que solo preguntó el precio. El equipo gasta tiempo donde menos se cierra.",
  },
  {
    title: "Respuesta sin guion",
    body: "Cada asesor improvisa. Unos contestan en minutos, otros al día siguiente. El cliente compara y se queda con quien contestó primero y mejor.",
  },
  {
    title: "Recompra y referidos sin método",
    body: "Los clientes que ya compraron son la venta más barata y nadie los llama. La base crece cada mes y no se usa.",
  },
  {
    title: "Equipo publicando sin base",
    body: "A los asesores les piden que publiquen. Nadie les enseña qué decir, qué cuidar ni qué permiten los lineamientos de la planta.",
  },
] as const;

// ── Ejemplo de tope de costo (cifras ilustrativas) ───────────────────────────
export const VOLANTE_EXAMPLE = {
  eyebrow: "ASÍ SE FIJA EL TOPE, CON UN EJEMPLO",
  title: "Antes de invertir, sabes cuánto puedes pagar por cada cita.",
  intro:
    "La pauta no se decide por “lo que se acostumbra”. Se decide por lo que la agencia puede pagar por una venta sin perder margen. Con cifras inventadas, para ilustrar:",
  steps: [
    { value: "$30,000", label: "Utilidad bruta por unidad (dato ilustrativo)" },
    { value: "15%", label: "Parte que la agencia decide invertir por venta" },
    { value: "$4,500", label: "Tope de costo de adquisición por unidad" },
    { value: "1 de 5", label: "Citas calificadas que terminan en venta" },
  ],
  result: { label: "Tope por cita calificada", value: "$900", unit: "MXN, en este ejemplo" },
  note: "Ejemplo con números ficticios. Los reales los fija tu agencia con su utilidad por unidad y se validan con tus propios datos en el diagnóstico.",
} as const;

// ── Qué incluye ──────────────────────────────────────────────────────────────
export const VOLANTE_DELIVERABLES: readonly { title: string; body: string }[] = [
  {
    title: "Línea base de tu agencia",
    body: "Cuántos leads llegan, de dónde, cuánto tardan en contestarse y cuántos se convierten. Es el punto de partida contra el que se mide todo.",
  },
  {
    title: "Matriz modelo × perfil",
    body: "Qué se ofrece a quién: el modelo, el tipo de comprador y el mensaje que le corresponde. Para que cada anuncio tenga un objetivo.",
  },
  {
    title: "Embudo con precalificación",
    body: "El camino del lead desde el anuncio hasta la cita: preguntas que filtran, guiones de respuesta y tiempos máximos por etapa.",
  },
  {
    title: "Campaña Meta + Google",
    body: "Estrategia, configuración y optimización semanal. La pauta la pagas tú en tu propia cuenta; nosotros la operamos.",
  },
  {
    title: "12 piezas al mes + producción",
    body: "Contenido pensado con un objetivo, media jornada de producción en la agencia y diseño de hasta 4 impresos para piso y exteriores.",
  },
  {
    title: "Tablero de lead a cierre",
    body: "Cada lead con su etapa y su costo. Se alimenta de tu CRM o de tu control actual; no lo reemplazamos.",
  },
  {
    title: "Recompra y referidos",
    body: "Un método para volver a hablar con quien ya compró: servicios, cambio de unidad y recomendaciones.",
  },
  {
    title: "Capacitación a tus asesores",
    body: "Cuatro sesiones en el ciclo, más una biblioteca de videos grabados. Ver la sección de capacitación.",
  },
] as const;

// ── Método en 5 fases ────────────────────────────────────────────────────────
export const VOLANTE_METHOD: readonly { n: string; label: string; body: string }[] = [
  {
    n: "1",
    label: "Línea base",
    body: "Revisamos tus números reales: leads, tiempos de respuesta, citas y cierres. Sin línea base no hay forma honesta de saber si algo mejoró.",
  },
  {
    n: "2",
    label: "Estrategia",
    body: "Definimos qué modelos empujar, a qué perfil y con qué mensaje, y fijamos el tope de costo por cita con la utilidad de tu agencia.",
  },
  {
    n: "3",
    label: "Embudo y piezas",
    body: "Armamos la precalificación, los guiones y las piezas. Se diseña de noche lo que el lunes en la mañana se contesta en minutos.",
  },
  {
    n: "4",
    label: "Capacitación",
    body: "Sesiones con tus asesores antes del lanzamiento y durante los primeros meses: respuesta, redes personales, WhatsApp e IA bien usada.",
  },
  {
    n: "5",
    label: "Medir y decidir",
    body: "Cada semana se revisa el costo por cita calificada. La pauta sube, se queda o baja según el tablero, no según el ánimo.",
  },
] as const;

// ── Capacitación ─────────────────────────────────────────────────────────────
export const VOLANTE_TRAINING = {
  eyebrow: "CAPACITACIÓN A ASESORES",
  title: "A tus asesores les piden que publiquen. Nadie les enseña cómo.",
  body: "Publican sin base, sin fuentes y sin saber qué permite la planta. Aquí se les enseña, con los lineamientos de tu marca como punto de partida.",
  sessions: [
    { kind: "Presencial", when: "Antes del lanzamiento", body: "Base común: cómo contestar, qué cuidar y cómo usar la IA sin meterse en problemas." },
    { kind: "Zoom", when: "Mes 1", body: "Seguimiento con casos reales de tu agencia." },
    { kind: "Zoom", when: "Mes 2", body: "Redes personales, segmentación y WhatsApp." },
    { kind: "Presencial", when: "Mes 3", body: "Cierre del ciclo y plan para sostener lo aprendido." },
  ],
  rules: [
    "No sustituye el CRM ni la IA corporativa de tu marca.",
    "Antes de usar redes personales se validan las reglas de la planta.",
    "Se mide por adopción: cuántos asesores aplican lo aprendido.",
    "Las sesiones Zoom se coordinan directo contigo; las presenciales fuera de Tepic llevan viáticos.",
    "Condición de arranque: sesiones en horario laboral y respaldo de quien decide.",
  ],
  library: "Biblioteca general de videos grabados para asesores nuevos y repasos.",
} as const;

// ── Pauta por niveles ────────────────────────────────────────────────────────
export const VOLANTE_ADSPEND = {
  eyebrow: "LA PAUTA, SIEMPRE EN TU CUENTA",
  title: "Nosotros recomendamos. Tú decides cuánto invertir.",
  body: `La pauta no está incluida y la pagas tú directo en tu cuenta publicitaria. Nunca pasa por nosotros. El piso para arrancar es ${formatMXN(VOLANTE_ADSPEND_FLOOR)} al mes.`,
  levels: [
    {
      name: "Arranque",
      range: "$8,000 a $19,999 al mes",
      rule: "Siempre los primeros 30 días. Se mide, no se escala.",
    },
    {
      name: "Crucero",
      range: "$20,000 a $49,999 al mes",
      rule: "Con 30 días de datos, costo por cita estable dentro del tope, atribución confiable y respuesta a tiempo de la agencia.",
    },
    {
      name: "Carretera",
      range: "$50,000 o más al mes",
      rule: "Costo por venta sostenido dentro del tope, capacidad de atención, inventario y promociones que lo respalden.",
    },
  ],
  drop: "Si el costo por cita rebasa el tope dos semanas seguidas, se baja un nivel.",
  disclaimer: "No garantizamos ventas ni retorno. Garantizamos que cada peso se mide contra tu propio tope.",
} as const;

// ── Grupos y exclusividad ────────────────────────────────────────────────────
export const VOLANTE_GROUPS = {
  eyebrow: "GRUPOS Y EXCLUSIVIDAD",
  title: "Un plan por grupo. Sin competir contra tu propia agencia.",
  body: "En Nayarit muchas agencias pertenecen al mismo grupo o a los mismos socios. Por eso el plan se contrata por grupo y lo que se agrega se cobra como módulo.",
  modules: [
    { label: "Marca adicional (a partir de la tercera)", price: "$5,000" },
    { label: "Sucursal adicional en la misma plaza", price: "$2,500" },
    { label: "Plaza adicional", price: "$8,000" },
    { label: "Sede adicional con sesión presencial", price: "$4,500 por sesión" },
  ],
  moduleNote:
    "Precios por ciclo de 90 días, sin IVA. Fuera de Tepic se suman viáticos. A partir de cierto tamaño el grupo se cotiza como proyecto a su medida.",
  exclusivity: [
    "No trabajamos con agencias que compitan directamente con la tuya: misma marca y misma plaza.",
    "Si un contrato termina, esperamos 3 meses antes de tomar a otra agencia en esa situación.",
  ],
} as const;

// ── Paquete único ────────────────────────────────────────────────────────────
export const VOLANTE_PACKAGE = {
  name: "Paquete Toma el Volante",
  forWho: "Una razón social, una sucursal, una plaza (Tepic) y hasta 2 marcas.",
  highlights: [
    "Todo lo de esta página, siempre completo, con capacitación",
    "12 piezas al mes + media jornada de producción + hasta 4 impresos",
    "Campaña Meta y Google operada por nosotros",
    "Tablero de lead a cierre",
    "4 sesiones de capacitación + biblioteca de videos",
  ],
  adNote: "Pauta no incluida: la pagas tú en tu cuenta, desde $8,000 al mes.",
  continuity: `Al terminar el ciclo puedes continuar desde ${formatMXN(VOLANTE_PRICE.continuityMonthly)} al mes.`,
  payment: `Pago en 3 partes: 40% al iniciar (${formatMXN(VOLANTE_PRICE.payments[0])}), 30% (${formatMXN(VOLANTE_PRICE.payments[1])}) y 30% (${formatMXN(VOLANTE_PRICE.payments[2])}). Más IVA si requieres factura.`,
  betaTerms: `Beta: ${VOLANTE_PRICE.betaSlots} lugares, uno por grupo o razón social. A cambio, permiso por escrito para documentar el caso con las cifras reales de tu agencia.`,
  extraPieces: "¿Necesitas más piezas? Pieza estática extra $600; video corto extra $1,500.",
} as const;

// ── Filtro ───────────────────────────────────────────────────────────────────
export const VOLANTE_REQUIREMENTS = [
  "Tienes un control de leads, aunque sea una hoja o tu CRM.",
  "Alguien con poder de decisión respalda el proyecto.",
  "Tus asesores pueden tomar sesiones en horario laboral.",
  "Estás dispuesto a invertir en pauta desde $8,000 al mes en tu cuenta.",
  "Aceptas medir contra un tope de costo por cita, aunque duela al principio.",
] as const;

export const VOLANTE_NOT_FOR = [
  "Buscas que “nos hagan los videos” sin tocar la forma en que se atiende.",
  "Quieres ventas garantizadas o un número exacto de leads.",
  "Prefieres que la pauta pase por la agencia de marketing.",
  "No hay nadie que responda los mensajes en minutos.",
] as const;

export const VOLANTE_GUARANTEE = {
  yes: "Línea base, estrategia, piezas, embudo, tablero y capacitación entregados en el ciclo. Reporte semanal del costo por cita contra tu tope.",
  no: "Número de ventas, de leads o de citas. Eso depende también de tu inventario, tus precios, tu equipo y el mercado.",
} as const;

// ── Universo Allitron ────────────────────────────────────────────────────────
export const VOLANTE_UNIVERSE = {
  eyebrow: "PARTE DE ALLITRON",
  title: "Toma el Volante no vive solo.",
  items: [
    { name: "Toma tu Mercado", status: "Disponible", body: "La base: campañas con objetivo comercial para cualquier negocio de Nayarit.", href: "/productos/toma-tu-mercado" },
    { name: "Domina Google", status: "Disponible", body: "Tu agencia primero en el mapa cuando alguien busca “agencia cerca de mí”.", href: "/productos/domina-google" },
    { name: "LAZUP", status: "Próximamente", body: "El CRM propio de Allitron para dar seguimiento a cada lead.", href: null },
    { name: "Segundo Cerebro", status: "Próximamente", body: "Asistente personal por Telegram para el director y su equipo.", href: null },
  ],
} as const;

export const VOLANTE_AI_NOTE =
  "Escenas ilustrativas creadas con IA. Las personas, las agencias y los nombres de ejemplo son ficticios.";

export const VOLANTE_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "¿Reemplazan nuestro CRM o la IA de la marca?",
    a: "No. Nos conectamos a lo que ya usas. El tablero se alimenta de tu CRM o de tu control actual y la capacitación respeta las herramientas corporativas.",
  },
  {
    q: "¿Quién paga la pauta?",
    a: "Tú, directo en tu cuenta publicitaria. Nosotros la operamos y nunca manejamos tu dinero de anuncios.",
  },
  {
    q: "¿Cuánto debo invertir?",
    a: "El piso es $8,000 al mes. El nivel adecuado depende de tu tope de costo por cita y de la capacidad de tu equipo. Arrancas en Arranque y subes con datos.",
  },
  {
    q: "¿Garantizan ventas?",
    a: "No. Nadie serio puede hacerlo. Garantizamos el sistema, la medición y un tope claro de lo que se paga por cada cita.",
  },
  {
    q: "¿Y los lineamientos de la planta?",
    a: "Son el punto de partida. Antes de usar redes personales de los asesores, validamos qué permite tu marca.",
  },
  {
    q: "Somos un grupo con varias agencias.",
    a: "Perfecto: el plan se contrata por grupo y lo que se agrega (marcas, sucursales, plazas) se cobra como módulo. Sin descuento por volumen que quite alcance.",
  },
  {
    q: "¿Por qué no atienden a otra agencia como la nuestra?",
    a: "Porque trabajar para dos agencias que compiten por el mismo cliente es un conflicto. Tu plaza y tu marca quedan protegidas mientras trabajamos contigo.",
  },
  {
    q: "Ya tenemos agencia de marketing.",
    a: "Puede convivir si acepta compartir datos y tablero. Si no, hay que decidir quién opera la pauta: no se hace a medias.",
  },
  {
    q: "¿Qué es la beta?",
    a: "Los primeros 5 grupos pagan $49,900 en lugar de $55,900 a cambio de permiso por escrito para documentar el caso con cifras reales.",
  },
  {
    q: "¿Las redes personales de mis asesores?",
    a: "Se capacitan, no se obliga. Se enseña qué publicar, qué cuidar y cómo responder, y cada asesor decide.",
  },
] as const;

// ═════════════════════════════════════════════════════════════════════════════
// Rediseño cinematográfico (15-oct-2026): "Del caos al control".
// Todo lo de abajo es contenido de las escenas nuevas. Cifras de escenas y del
// tablero son FICTICIAS e ilustrativas; no son casos ni resultados.
// ═════════════════════════════════════════════════════════════════════════════

export const VOLANTE_PAUTA_CICLO = VOLANTE_ADSPEND_FLOOR * 3; // 24,000
export const VOLANTE_INVERSION_ORIENTATIVA = VOLANTE_PRICE.beta + VOLANTE_PAUTA_CICLO; // 73,900

// ── Acto 2: la venta que se escapa ───────────────────────────────────────────
export const VOLANTE_SEQUENCE = {
  eyebrow: "ACTO 2 · LA VENTA QUE SE ESCAPA",
  title: "Un lunes cualquiera, a las 9:40.",
  steps: [
    { time: "09:40", title: "23 mensajes pendientes", body: "Llegaron durante el fin de semana, después de pagar por conseguirlos." },
    { time: "10:15", title: "Los asesores están con clientes en piso", body: "Nadie tiene tiempo de contestar y nadie sabe a quién le toca." },
    { time: "14:00", title: "Primera respuesta, tarde y genérica", body: "El mismo PDF para todos. Sin nombre, sin cita, sin siguiente paso." },
  ],
  meanwhile: "Mientras tanto, el cliente ya está comparando alternativas.",
  fiction: "Escena ficticia ilustrativa. Los horarios, las cantidades, las personas y la agencia no corresponden a ningún caso real.",
  question: "¿Cuántas oportunidades dejó escapar tu agencia después de pagar por conseguirlas?",
  answer: "Casi nadie lo sabe, porque nadie mide lo que pasa después del mensaje. No necesitas más mensajes sin seguimiento: necesitas saber qué ocurrió con cada oportunidad. Eso es lo primero que revisamos.",
} as const;

export const VOLANTE_LEAKS_SHORT: readonly { title: string; body: string }[] = [
  { title: "Entrada sin calificar", body: "El que cotiza crédito y el que solo preguntó el precio reciben el mismo trato." },
  { title: "Respuesta sin guion", body: "Cada asesor improvisa y el cliente se queda con quien contestó primero y mejor." },
  { title: "Recompra sin método", body: "Quien ya compró es la venta más barata y nadie lo vuelve a llamar." },
  { title: "Equipo sin base", body: "Les piden publicar, pero nadie les enseña qué decir ni qué permite la planta." },
] as const;

// ── Acto 3: del mensaje al cierre ────────────────────────────────────────────
export const VOLANTE_JOURNEY = {
  id: "sistema",
  eyebrow: "ACTO 3 · DEL MENSAJE AL CIERRE",
  title: "Cada oportunidad tiene un camino, un dueño y un registro.",
  body: "Así viaja un prospecto cuando el proceso está instalado. Se entiende sin animaciones y se mide en cada paso.",
  steps: [
    { n: "1", title: "El anuncio atrae", body: "Campaña en Meta y Google con un modelo y un perfil definidos." },
    { n: "2", title: "El prospecto consulta", body: "Escribe por WhatsApp o deja sus datos." },
    { n: "3", title: "Se registra y precalifica", body: "Preguntas breves separan quién está listo de quién apenas explora." },
    { n: "4", title: "Se asigna la atención", body: "Un asesor responsable y un tiempo máximo de respuesta." },
    { n: "5", title: "Se agenda o se da seguimiento", body: "Cita en agencia o siguiente contacto con fecha." },
    { n: "6", title: "Se registra el resultado", body: "Venta, cita perdida o seguimiento: nada queda sin etiqueta." },
    { n: "7", title: "Se analiza el desempeño", body: "Costo por cita y por venta contra el tope definido." },
  ],
} as const;

export const VOLANTE_DASHBOARD = {
  title: "Así se ve el tablero",
  banner: "EJEMPLO ILUSTRATIVO · DATOS FICTICIOS",
  note: "Muestra el formato de lectura. El tablero real se alimenta de tu CRM o de tu control actual y usa tus datos. No sustituye tu CRM.",
  stages: [
    { id: "leads", label: "Leads", value: 120, detail: "Todos los contactos del periodo, con su origen: Meta, Google o referido." },
    { id: "calificados", label: "Calificados", value: 54, detail: "Los que pasaron la precalificación: interés real, modelo y forma de pago." },
    { id: "citas", label: "Citas", value: 21, detail: "Citas agendadas con asesor, fecha y modelo de interés." },
    { id: "ventas", label: "Ventas", value: 5, detail: "Cierres registrados con su origen para medir el costo real por venta." },
  ],
  kpis: [
    { label: "Costo por cita calificada", value: "$780", hint: "Tope del ejemplo: $900", ok: true },
    { label: "Leads sin atender hoy", value: "3", hint: "Con asesor y hora límite", ok: false },
    { label: "Nivel de pauta", value: "Arranque", hint: "Se revisa cada semana", ok: true },
  ],
} as const;

// ── Acto 4: calculadora ──────────────────────────────────────────────────────
export const VOLANTE_CALC = {
  eyebrow: "ACTO 4 · LOS NÚMEROS TOMAN EL VOLANTE",
  title: "Antes de invertir, calcula cuánto puedes pagar por cada cita.",
  body: "Mueve los valores con los de tu agencia. Todo se calcula en tu navegador: no guardamos ni recibimos estos datos.",
  defaults: { profit: 30000, share: 15, conversion: 20 },
  limits: {
    profit: { min: 1000, max: 500000, step: 500 },
    share: { min: 1, max: 40, step: 1 },
    conversion: { min: 1, max: 100, step: 1 },
  },
  disclaimer: "Estimación ilustrativa. No es un resultado garantizado ni una promesa de ventas: depende de tu inventario, precios, equipo y mercado.",
} as const;

export interface AcquisitionResult {
  maxPerSale: number;
  maxPerAppointment: number;
}

export function computeAcquisition(profit: number, sharePct: number, conversionPct: number): AcquisitionResult {
  const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
  const maxPerSale = safe(profit) * (safe(sharePct) / 100);
  const maxPerAppointment = maxPerSale * (safe(conversionPct) / 100);
  return { maxPerSale, maxPerAppointment };
}

// ── Acto 5: 90 días ──────────────────────────────────────────────────────────
export const VOLANTE_TIMELINE = {
  eyebrow: "ACTO 5 · 90 DÍAS PARA INSTALAR EL SISTEMA",
  title: "Cinco fases. Un solo ciclo de 90 días.",
  body: "Es un ciclo de instalación y operación, no una promesa de resultados inmediatos. Cada fase deja algo en tus manos.",
  deliverablesTitle: "Lo que queda funcionando al terminar",
} as const;

// ── Acto 6: decisión ─────────────────────────────────────────────────────────
export const VOLANTE_DECISION = {
  eyebrow: "ACTO 6 · LA DECISIÓN",
  title: "Lo que pagas, lo que incluye y lo que no.",
  includes: [
    "Línea base, estrategia y tope de costo por cita calificada",
    "Embudo con precalificación y guiones de respuesta",
    "Campaña operada en Meta y Google",
    "12 piezas al mes, media jornada de producción y hasta 4 impresos",
    "Tablero de lead a cierre",
    "4 sesiones de capacitación y biblioteca de videos",
  ],
  excludes: [
    "La pauta publicitaria: la pagas tú en tu cuenta (mínimo $8,000 al mes)",
    "IVA, si requieres factura",
    "Viáticos de sesiones presenciales fuera de Tepic",
    "Marcas, sucursales o plazas adicionales (tienen condiciones propias)",
    "Piezas extra: estática $600 y video corto $1,500",
  ],
  conditions: [
    "Cubre una razón social, una sucursal, una plaza (Tepic) y hasta 2 marcas.",
    "Exclusividad comercial según las condiciones vigentes del contrato.",
    "Beta: hasta 5 grupos o razones sociales, a cambio de permiso por escrito para documentar el caso con cifras reales.",
  ],
  operation: [
    "Un responsable con poder de decisión.",
    "Un control de leads, aunque sea una hoja o tu CRM.",
    "Asesores disponibles para las sesiones, en horario laboral.",
    "Alguien que conteste los mensajes en minutos.",
  ],
  after: `Al terminar los 90 días puedes continuar desde ${formatMXN(VOLANTE_PRICE.continuityMonthly)} al mes. La continuidad de la capacitación se define aparte.`,
  orientative: "Inversión mínima orientativa de los primeros 90 días. No es un precio cerrado: cambia con plazas, marcas, sucursales y la pauta que decidas.",
} as const;

export const VOLANTE_DIAGNOSIS = {
  id: "diagnostico",
  title: "DESCUBRE DÓNDE ESTÁ PERDIENDO OPORTUNIDADES TU CONCESIONARIA.",
  review: [
    "Captación actual",
    "Atención de los leads",
    "Tiempos de respuesta disponibles",
    "Seguimiento comercial",
    "Indicadores existentes",
    "Posibles fugas en el proceso",
  ],
  next: "Al enviar, se abre WhatsApp con tu mensaje ya escrito. Te respondemos para agendar el diagnóstico.",
  tagline: "Toma el volante de tu proceso comercial.",
} as const;

export const VOLANTE_DETAILS_TITLE = "Detalles del plan";
