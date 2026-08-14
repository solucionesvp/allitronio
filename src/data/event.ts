// ── Evento — Revolución Tecnológica ──────────────────────────────
// Fecha confirmada por Lups: 20 de septiembre de 2026, Tepic, Nayarit.
// Evento bajo marca Allitron. NO mencionar a Google, Xerpas ni "alianza"
// en ningún copy público — solo contacto/exploración, sin autorización
// para proclamar partnership (ver notas de gobierno del proyecto).
//
// Ponentes invitados, proyectos del showcase y sede están marcados
// TBD/propuesta hasta que Lups y su equipo confirmen. Lups dio libertad
// creativa explícita para inventar el concepto del evento ("aquí te lo
// dejo a tu criterio... nosotros nos encargamos de hacerlo real") — pero
// no se inventan nombres de personas, direcciones exactas, cifras de
// asistencia ni marcas asociadas.

export const EVENT_INFO = {
  name: "Revolución Tecnológica",
  date: "2026-09-20",
  dateLabel: "20 DE SEPTIEMBRE, 2026",
  timeLabel: "4:00 PM — EN ADELANTE",
  location: "Tepic, Nayarit",
  brand: "Allitron",
} as const;

// ── Fotos externas (hotlink) ──────────────────────────────────────
// Stock verificado con licencia libre (Unsplash License, uso comercial
// sin atribución obligatoria) mientras no existan fotos reales del
// evento. Reemplazar por fotografía propia en cuanto exista — ver guía
// al final de la respuesta de Lups. No usar como fuente de verdad sobre
// el lugar real: son atmósfera/referencia, no el venue confirmado.
export const EVENT_STOCK_PHOTOS = {
  /** DJ tocando con crowd de fondo, noche — cierre del evento */
  djClose: "https://images.unsplash.com/photo-1506485854521-3e13d857db0b?auto=format&fit=crop&w=1600&q=80",
  /** Crowd alrededor de escenario, luces rojas — atmósfera de cierre */
  partyCrowd: "https://images.unsplash.com/photo-1713885462557-12b5c41f22cd?auto=format&fit=crop&w=1600&q=80",
  /** Colegas conversando/riendo en espacio abierto — networking, "por qué Tepic" */
  networking01: "https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?auto=format&fit=crop&w=1600&q=80",
  /** Dos personas conversando, ambiente de negocios — networking */
  networking02: "https://images.unsplash.com/photo-1560250163-17506787d971?auto=format&fit=crop&w=1600&q=80",
} as const;

export type AgendaKind = "registro" | "charla" | "pausa" | "showcase" | "cierre";

export interface AgendaItem {
  time: string;
  label: string;
  title: string;
  description: string;
  kind: AgendaKind;
  speakerKind?: "confirmada" | "propuesta";
}

// Charla 1: Lups. Charlas 2–3: invitados — perfiles propuestos, no
// nombres confirmados. Horarios son un itinerario propuesto por Allitron
// para planeación — el equipo los ajusta al confirmar sede y ponentes.
export const EVENT_AGENDA: AgendaItem[] = [
  {
    time: "16:00",
    label: "REGISTRO",
    title: "Registro y bienvenida",
    description: "Acreditación, gafete y café de bienvenida.",
    kind: "registro",
  },
  {
    time: "16:30",
    label: "CHARLA 01",
    title: "Lups — Somos Lázaro",
    description: "Tema por definir.",
    kind: "charla",
    speakerKind: "confirmada",
  },
  {
    time: "17:10",
    label: "CHARLA 02",
    title: "Ponente invitado — por confirmar",
    description: "Adopción tecnológica para PyMEs en Nayarit.",
    kind: "charla",
    speakerKind: "propuesta",
  },
  {
    time: "17:50",
    label: "PAUSA",
    title: "Pausa y networking corto",
    description: "Espacio breve para conectar antes de la última charla.",
    kind: "pausa",
  },
  {
    time: "18:10",
    label: "CHARLA 03",
    title: "Ponente invitado — por confirmar",
    description: "Ecosistema de innovación regional.",
    kind: "charla",
    speakerKind: "propuesta",
  },
  {
    time: "18:50",
    label: "SHOWCASE",
    title: "3 proyectos suben al escenario",
    description: "Presentación de los proyectos seleccionados entre los inscritos.",
    kind: "showcase",
  },
  {
    time: "19:30",
    label: "CIERRE",
    title: "Networking + DJ",
    description: "El evento se abre: música en vivo y networking sin agenda.",
    kind: "cierre",
  },
];

// Se conserva por compatibilidad con copy que referencia charlas de forma
// aislada (fuera del timeline completo).
export type TalkSlot = {
  numeral: string;
  kind: "confirmada" | "propuesta";
  speakerLabel: string;
  topic: string;
};

export const EVENT_TALKS: TalkSlot[] = [
  { numeral: "01", kind: "confirmada", speakerLabel: "Lups — Somos Lázaro", topic: "Tema por definir" },
  { numeral: "02", kind: "propuesta", speakerLabel: "Ponente invitado — por confirmar", topic: "Adopción tecnológica para PyMEs en Nayarit" },
  { numeral: "03", kind: "propuesta", speakerLabel: "Ponente invitado — por confirmar", topic: "Ecosistema de innovación regional" },
];

export const EVENT_SHOWCASE = {
  slots: 3,
  ruleText:
    "Los proyectos que se presentan se eligen entre quienes se inscriban. No hay lugares garantizados: la organización revisa las postulaciones y selecciona.",
};

export const EVENT_CLOSE = {
  title: "Networking + DJ",
  description:
    "El evento cierra con networking abierto y música en vivo. Espacio para conectar con la comunidad tech de Tepic y Nayarit.",
};

// ── Por qué Tepic ───────────────────────────────────────────────
// Tesis/postura de Allitron, no una estadística — evitar cifras
// inventadas de mercado, inversión o crecimiento.
export const EVENT_WHY_TEPIC = {
  eyebrow: "POR QUÉ TEPIC",
  title: "La tecnología no necesita nacer en CDMX o Guadalajara.",
  paragraphs: [
    "Nayarit tiene negocios reales, gente construyendo y un corredor económico activo entre Tepic y la Riviera Nayarit. Lo que ha faltado no es talento — es un lugar donde ese talento se encuentre.",
    "Revolución Tecnológica es la apuesta de Allitron por hacer ese lugar. No un evento de una sola vez: el primero de una comunidad que se queda.",
  ],
};

// ── Sede ────────────────────────────────────────────────────────
// Conceptual — la dirección exacta y el proveedor del venue están en
// definición por el equipo de Lups. No se publica dirección hasta que
// esté confirmada.
export const EVENT_VENUE = {
  status: "SEDE EN CONFIRMACIÓN",
  city: "Tepic, Nayarit",
  vibeTitle: "Un espacio con carácter, no un salón de hotel.",
  vibeDescription:
    "Buscamos un espacio industrial abierto — techos altos, buena acústica, lugar de sobra para charlas, showcase y la fiesta de cierre. La dirección exacta se confirma y se comparte a quienes se registren.",
};
