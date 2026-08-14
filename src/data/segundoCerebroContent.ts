// ── Contenido de la landing /productos/segundo-cerebro ───────────
// Basado en documentación real del producto (Obsidian — carpeta Segundo
// Cerebro): Hub, Visión, Comandos y Capacidades, Matriz de capacidades,
// Principio No Notas Huérfanas.

export const SB_FLOW = [
  { n: "01", text: "Escribes o mandas un audio por Telegram." },
  { n: "02", text: "Segundo Cerebro clasifica: persona, proyecto, tarea, idea, gasto, lectura." },
  { n: "03", text: "Busca si ya existe antes de crear — nunca duplica." },
  { n: "04", text: "Lo guarda en el lugar correcto de tu vault de Obsidian." },
  { n: "05", text: "Le puedes preguntar después y responde con lo que realmente sabe." },
  { n: "06", text: "Al cierre del día, sintetiza y prepara mañana. Nada se pierde." },
] as const;

export interface SBCapability {
  icon: "person" | "project" | "task" | "interaction" | "finance" | "reading" | "insight" | "voice";
  title: string;
  description: string;
}

export const SB_CAPABILITIES: SBCapability[] = [
  {
    icon: "person",
    title: "Personas y organizaciones",
    description:
      "Ficha con resumen acumulativo por fecha. Clasifica cliente, personal, aliado o proveedor automáticamente.",
  },
  {
    icon: "project",
    title: "Proyectos e ideas",
    description:
      "Se crean o actualizan — el sistema busca antes de crear, nunca termina la misma idea en dos notas distintas.",
  },
  {
    icon: "task",
    title: "Tareas con prioridad real",
    description:
      "Checklist en la nota del día. Al preguntar qué hacer hoy, ordena por vencida, prioridad, compromiso y antigüedad — sin IA inventando el orden.",
  },
  {
    icon: "interaction",
    title: "Interacciones y reuniones",
    description:
      '"Mañana me reúno con Roberto" se integra directo a la ficha de Roberto. Nunca genera un archivo suelto.',
  },
  {
    icon: "finance",
    title: "Finanzas",
    description:
      "Captura gastos e ingresos por texto y los agrega a tu ledger real — nunca una contabilidad paralela inventada.",
  },
  {
    icon: "reading",
    title: "Lecturas",
    description:
      "Avances, ideas y citas de lo que estás leyendo, acumulados en la nota del libro correspondiente.",
  },
  {
    icon: "insight",
    title: "Autoanálisis en tiempo real",
    description:
      'Reflexiones guardadas tal cual las escribes, con fecha — nunca resumidas ni reescritas por la IA.',
  },
  {
    icon: "voice",
    title: "Notas de voz",
    description:
      "Se transcriben y siguen exactamente el mismo flujo que el texto. Habla y ya quedó capturado.",
  },
];

export const SB_PRICING = [
  {
    name: "Básico",
    price: "$23,000 MXN",
    description: "Implementación personal en tu vault de Obsidian, captura por Telegram.",
  },
  {
    name: "Intermedio",
    price: "$30,000 MXN",
    description: "Incluye configuración avanzada de capturas y flujos personalizados.",
  },
  {
    name: "Pro",
    price: "Precio por definir",
    description: "Asistente personal por WhatsApp o Telegram, con capacidades ampliadas.",
  },
] as const;
