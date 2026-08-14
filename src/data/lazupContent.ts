// ── Contenido de la landing /productos/lazup ─────────────────────
// Basado en la documentación real del producto (Obsidian — carpeta LAZUP).
// Presentado como producto terminado por instrucción directa de Lups.

export const LAZUP_FLOW = [
  { n: "01", text: "Llega un mensaje por WhatsApp." },
  { n: "02", text: "LAZUP encuentra o crea el contacto automáticamente." },
  { n: "03", text: "Abre o continúa la conversación con todo el historial." },
  { n: "04", text: "Se asigna a un responsable y se relaciona con una oportunidad." },
  { n: "05", text: "El agente de IA del departamento puede atender, agendar o transferir." },
  { n: "06", text: "Todo queda registrado. Nada se pierde." },
] as const;

export interface LazupModule {
  icon: "users" | "messages" | "sales" | "clock" | "calendar" | "team" | "bot" | "aurora";
  title: string;
  description: string;
}

export const LAZUP_MODULES: LazupModule[] = [
  {
    icon: "users",
    title: "Contacto 360",
    description:
      "Identidad, empresa, notas, segmentos e intereses. Un cliente, una ficha, todo el historial en un solo lugar.",
  },
  {
    icon: "messages",
    title: "Conversaciones",
    description:
      "Bandeja con Mis tickets, pendientes y cerrados. Asignación automática, chats fijados y estados de WhatsApp en tiempo real: enviado, entregado, leído.",
  },
  {
    icon: "sales",
    title: "Ventas y oportunidades",
    description:
      "Pipeline visual conectado a cada conversación. La venta avanza donde ya está la conversación con el cliente.",
  },
  {
    icon: "clock",
    title: "Seguimientos y mensajes programados",
    description:
      "Recordatorios con fecha, responsable y prioridad. Mensajes programados con consentimiento, zona horaria y ventana de envío.",
  },
  {
    icon: "calendar",
    title: "Catálogo y citas",
    description:
      "Servicios, productos o habitaciones con disponibilidad real. El sistema evita dobles reservas — no se agenda lo que no existe.",
  },
  {
    icon: "team",
    title: "Equipo y departamentos",
    description:
      "Roles claros — administrador, gerente, agente. Cada departamento con su propia bandeja y su propio agente de IA.",
  },
  {
    icon: "bot",
    title: "Automatización con IA",
    description:
      "Un agente por departamento que conoce el catálogo, las políticas y el contexto del cliente — y transfiere sin perder el hilo de la conversación.",
  },
  {
    icon: "aurora",
    title: "Aurora",
    description:
      "La asistente interna de LAZUP: resume al equipo, explica métricas y avisa lo que necesita atención. No atiende clientes — trabaja para el dueño del negocio.",
  },
];

export const LAZUP_VERTICALS = [
  {
    name: "LAZUP",
    tag: "General",
    description: "Para cualquier negocio que opera y vende por WhatsApp.",
  },
  {
    name: "LAZUP SOLBA",
    tag: "Hotelería boutique",
    description: "Hasta 30 habitaciones. Disponibilidad, tarifas y reservaciones por fecha.",
  },
  {
    name: "LAZUP TERRENO",
    tag: "Negocios locales",
    description: "Servicios o productos con catálogo, citas y stock.",
  },
] as const;
