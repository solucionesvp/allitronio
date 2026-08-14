// ── Types ────────────────────────────────────────────────────────

export type SolutionType = "allitron-90" | "local" | "second-brain" | "lazup";

export interface MethodologyStep {
  number: string;
  label: string;
  description: string;
}

export interface MethodologyPhase {
  id: string;
  /** Identificador visual de fase, e.g. "FASE 01" */
  phase: string;
  /** Nombre de la fase, e.g. "ENTENDER" */
  label: string;
  steps: MethodologyStep[];
}

export interface SolutionData {
  id: SolutionType;
  label: string;
  /** Nota interna — no mostrar al usuario final */
  note?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAnchor?: string;
  microcopy?: string;
  features?: string[];
  /** Metodología expandida — solo aplicable a LOCAL por ahora */
  methodology?: MethodologyPhase[];
}

// ── LOCAL / 11 — Metodología propia de Allitron ──────────────────
// Método de implementación diseñado por Allitron.
// NO identificar como "metodología de Google" ni mencionar certificación.

export const LOCAL_METHODOLOGY: MethodologyPhase[] = [
  {
    id: "entender",
    phase: "FASE 01",
    label: "ENTENDER",
    steps: [
      {
        number: "01",
        label: "OBJETIVO",
        description:
          "Definir qué necesita lograr el negocio y qué acción queremos generar.",
      },
      {
        number: "02",
        label: "MERCADO",
        description:
          "Analizar demanda local, búsquedas, categoría y competidores.",
      },
      {
        number: "03",
        label: "MVP",
        description:
          "Definir la infraestructura mínima necesaria para competir sin construir de más.",
      },
    ],
  },
  {
    id: "disenar",
    phase: "FASE 02",
    label: "DISEÑAR",
    steps: [
      {
        number: "04",
        label: "ARQUITECTURA",
        description:
          "Organizar información, páginas, jerarquía y rutas de conversión.",
      },
      {
        number: "05",
        label: "EXPERIENCIA",
        description:
          "Diseñar navegación rápida, clara, mobile-first y orientada a contacto.",
      },
      {
        number: "06",
        label: "PROTOTIPO",
        description:
          "Validar estructura y comportamiento antes de cerrar la implementación.",
      },
    ],
  },
  {
    id: "construir",
    phase: "FASE 03",
    label: "CONSTRUIR",
    steps: [
      {
        number: "07",
        label: "DESARROLLO",
        description: "Construir la infraestructura web y sus conexiones.",
      },
      {
        number: "08",
        label: "QA",
        description:
          "Validar rendimiento, responsive, enlaces, seguridad y experiencia.",
      },
      {
        number: "09",
        label: "SEO LOCAL",
        description:
          "Preparar contenido, estructura técnica, datos y presencia para Google y búsquedas locales.",
      },
    ],
  },
  {
    id: "activar",
    phase: "FASE 04",
    label: "ACTIVAR",
    steps: [
      {
        number: "10",
        label: "LANZAMIENTO",
        description:
          "Publicar, conectar herramientas de medición e iniciar indexación.",
      },
      {
        number: "11",
        label: "MEDIR",
        description:
          "Observar comportamiento real, búsquedas y conversiones para decidir mejoras.",
      },
    ],
  },
];

// ── Solutions ─────────────────────────────────────────────────────

export const SOLUTIONS: SolutionData[] = [
  {
    id: "allitron-90",
    label: "DIAGNÓSTICO + EJECUCIÓN",
    title: "Encuentra el cuello de botella. Construye los próximos 90 días.",
    description:
      "Analizamos la operación de la empresa para identificar la fricción que más limita su crecimiento. A partir del diagnóstico construimos un roadmap ejecutable de 90 días y, si la empresa lo requiere, acompañamos su implementación.",
    ctaText: "COORDINAR DIAGNÓSTICO",
    ctaAnchor: "/productos/allitron-90#contacto",
    microcopy: "Allitron coordina especialistas para resolver el problema detectado.",
    features: ["ANALIZAR", "IDENTIFICAR", "PRIORIZAR", "DISEÑAR", "EJECUTAR"],
  },
  {
    id: "local",
    label: "PRESENCIA LOCAL · BY SOMOS LÁZARO",
    note: "Nombre público definido: 'Domina Google. Atrae Clientes.' No usar 'MAPS 2.0' ni 'LOCAL' como nombre de marca de cara al usuario — son identificadores internos.",
    title: "DOMINA GOOGLE. ATRAE CLIENTES.",
    description:
      "Construimos la infraestructura digital que conecta tu negocio, tu sitio web, Google y tus canales de contacto para aumentar tu capacidad de ser encontrado cuando alguien busca lo que vendes en tu ciudad.",
    ctaText: "MEJORAR MI PRESENCIA",
    ctaAnchor: "/productos/domina-google#contacto",
    features: [
      "Arquitectura web Next.js",
      "Alta velocidad",
      "SEO local inicial",
      "Optimización Google Business",
      "Conexión sitio ↔ Google Maps",
      "Homologación de información",
      "Integración WhatsApp",
    ],
    methodology: LOCAL_METHODOLOGY,
  },
  {
    id: "second-brain",
    label: "SEGUNDO CEREBRO · BY SOMOS LÁZARO",
    note: "Nombre oficial: Segundo Cerebro.",
    title: "TU OPERACIÓN. TU MEMORIA. UN SOLO LUGAR.",
    description:
      "Un sistema personal para dueños, operadores y profesionales que necesitan capturar lo que ocurre durante el día, recuperar contexto y convertir información dispersa en acciones claras.",
    ctaText: "QUIERO IMPLEMENTARLO",
    ctaAnchor: "/productos/segundo-cerebro#contacto",
    microcopy:
      "Implementación personalizada. El cliente conserva su información. Arquitectura preparada para evolucionar a nuevos canales.",
    features: ["CAPTURA", "MEMORIA", "CONTEXTO", "PRIORIZACIÓN", "SEGUIMIENTO"],
  },
  {
    id: "lazup",
    label: "LAZUP · BY SOMOS LÁZARO",
    title: "LA OPERACIÓN DEL NEGOCIO, EN UN SOLO SISTEMA.",
    description:
      "Una plataforma para PYMEs que conecta clientes, conversaciones, oportunidades, tareas, catálogo, equipo, citas y automatización en una misma operación.",
    ctaText: "OBTENER INFORMACIÓN",
    ctaAnchor: "/productos/lazup#contacto",
    microcopy: "Primer grupo limitado a 20 empresas. Para Servicios, Productos y Hospitalidad.",
    features: [
      "CONTACTOS",
      "CONVERSACIONES",
      "VENTAS",
      "TAREAS",
      "CATÁLOGO",
      "CITAS",
      "EQUIPO",
      "AUTOMATIZACIÓN",
      "IA",
    ],
  },
];
