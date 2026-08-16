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
 * roja. Es un rojo *evocativo* del pin de Google Maps y del momento de
 * búsqueda, no la paleta de marca de Google — se usa un tono más profundo y
 * sobrio (#D93025 → #8C1D18) para que se lea elegante sobre el fondo oscuro
 * de Allitron y no como una imitación del logo de Google. */
export const DOMINA_GOOGLE_TOKENS = {
  accent: "#E5484D",
  accentDeep: "#8C1D18",
  accentSoft: "rgba(229,72,77,0.13)",
  gradient: "linear-gradient(135deg, #F2645F 0%, #D93025 50%, #8C1D18 100%)",
} as const;
