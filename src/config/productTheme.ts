/**
 * ALLITRON — Acentos de color y tokens por producto
 *
 * LAZUP: color oficial confirmado en la documentación técnica del producto
 * (`designTokens.js`, vía Obsidian — nota "LAZUP — Corrección integral de
 * conversaciones"). Se usan los valores del tema oscuro porque las landings
 * de producto viven sobre el fondo oscuro de Allitron.
 *
 * Segundo Cerebro: no existe token de marca oficial documentado todavía —
 * decisión de diseño (violeta, asociado a memoria/cognición), fácil de
 * cambiar en un solo lugar si se define un color oficial más adelante.
 */

/** Mapa completo — un acento real por producto, usado tanto en las landings
 * individuales como en los paneles de color del home (Solutions) y en el
 * AllitronGraph reskineado por producto durante el scroll. Allitron 90 usa
 * el naranja nativo de Allitron (no es "by Somos Lázaro"); los otros tres
 * reutilizan sus tokens ya documentados arriba. */
export const PRODUCT_ACCENTS: Record<"allitron-90" | "local" | "second-brain" | "lazup", string> = {
  "allitron-90": "#F2874C",
  local: "#E5484D",
  "second-brain": "#8B5CF6",
  lazup: "#D84482",
};

/** Nombre comercial de cada producto — fuente única para menús, CTAs y
 * cualquier lugar que necesite nombrarlos. Antes se derivaba cortando el
 * titular, lo que producía textos sin sentido ("VER ENCUENTRA"). */
export const PRODUCT_NAMES: Record<"allitron-90" | "local" | "second-brain" | "lazup", string> = {
  "allitron-90": "Allitron 90",
  local: "Domina Google",
  "second-brain": "Segundo Cerebro",
  lazup: "LAZUP",
};

/** Ruta de la landing de cada producto — fuente única. */
export const PRODUCT_ROUTES: Record<"allitron-90" | "local" | "second-brain" | "lazup", string> = {
  "allitron-90": "/productos/allitron-90",
  local: "/productos/domina-google",
  "second-brain": "/productos/segundo-cerebro",
  lazup: "/productos/lazup",
};

/** Tokens reales del sistema visual de LAZUP (tema oscuro) — para que la
 * landing use exactamente las mismas superficies que el producto real. */
export const LAZUP_TOKENS = {
  bg: "#0A090A",
  surface: "#121012",
  surfaceSoft: "#1A1619",
  border: "#2B2428",
  text: "#F7F2F4",
  textMuted: "#A79CA2",
  accent: "#D84482",
  accentDeep: "#9D2C60",
  accentSoft: "#291620",
  gradient: "linear-gradient(135deg, #E04C8C 0%, #C53778 48%, #922A5C 100%)",
} as const;

/** Segundo Cerebro no tiene un sistema visual documentado como LAZUP — estas
 * superficies reutilizan los tokens ya existentes de Allitron (surface /
 * surface-soft, definidos en globals.css) y solo el acento violeta es
 * decisión de diseño nueva. */
export const SECOND_BRAIN_TOKENS = {
  accent: "#8B5CF6",
  accentDeep: "#6D28D9",
  accentSoft: "rgba(139,92,246,0.12)",
  gradient: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 48%, #6D28D9 100%)",
} as const;

/** "Domina Google" (id interno "local" / antes "MAPS 2.0", no usar ese nombre
 * públicamente).
 *
 * Actualizado agosto 2026 (decisión de Lups): pasa de esmeralda a una familia
 * roja, evocativa del pin de Google Maps y del momento de búsqueda.
 *
 * Ajustado 18-sep-2026 (feedback de Lups: "los colores los siento oscuros" —
 * landing de lanzamiento sentía frío/alarmante, no premium-amigable). Se
 * mantiene la misma familia roja (la lógica del pin de Maps sigue vigente,
 * sigue sin ser la paleta de marca de Google) pero se sube temperatura y
 * luminosidad en los dos extremos: el rojo puro (#E5484D→#8C1D18) leía como
 * alerta/stop, no como CTA cálido. accentDeep ya no baja a un rojo casi
 * negro — se queda en un terracota cálido, para que se sienta premium sin
 * perder el fondo oscuro de Allitron (ese fondo no cambia: es la identidad
 * del sitio completo, no algo exclusivo de este producto). */
export const DOMINA_GOOGLE_TOKENS = {
  accent: "#FF6B4A",
  accentDeep: "#B23A2E",
  accentSoft: "rgba(255,107,74,0.14)",
  gradient: "linear-gradient(135deg, #FF8F6B 0%, #FF6B4A 50%, #B23A2E 100%)",
} as const;

/** Paleta CLARA de la landing de lanzamiento de Domina Google (18-sep-2026).
 * Feedback de Lups: "todo muy oscuro". Estas superficies son SOLO de la landing
 * de campaña: no tocan DOMINA_GOOGLE_TOKENS (compartido con la evergreen y los
 * paneles del home) ni el fondo oscuro de Allitron. Contraste verificado:
 * ink/bg ≈ 15:1, muted/bg ≈ 6.5:1, accentText/bg ≈ 5.6:1. */
export const DOMINA_GOOGLE_LIGHT = {
  bg: "#F6F1EA",
  bgAlt: "#EDE6DA",
  card: "#FFFFFF",
  ink: "#1A1614",
  muted: "#5F564E",
  line: "rgba(26,22,20,0.12)",
  accentText: "#B23A2E",
} as const;
