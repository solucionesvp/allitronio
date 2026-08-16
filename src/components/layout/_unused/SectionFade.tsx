// ── SectionFade — costura suave entre secciones de distinto color ───────────
// El problema que resuelve: los degradados previos usaban dos paradas
// (`color → transparent`), lo que produce una banda dura visible a media
// altura porque la interpolación de opacidad es lineal y el ojo la detecta.
//
// Aquí la rampa tiene 5 paradas con una curva tipo "ease" (rápido al inicio,
// lento al final). El resultado es una transición que se siente continua en
// vez de un bloque pegado encima de la sección.
//
// Uso: colocarlo como primer hijo de una <section> con `position: relative`.

interface SectionFadeProps {
  /** Color de la sección ANTERIOR — desde el que se desvanece */
  from: string;
  /** Altura de la rampa */
  height?: number;
  /** Colocarlo abajo en vez de arriba (desvanece hacia la sección siguiente) */
  position?: "top" | "bottom";
  className?: string;
}

export default function SectionFade({
  from,
  height = 180,
  position = "top",
  className = "",
}: SectionFadeProps) {
  const direction = position === "top" ? "to bottom" : "to top";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{
        height,
        background: `linear-gradient(${direction},
          ${from} 0%,
          color-mix(in srgb, ${from} 82%, transparent) 18%,
          color-mix(in srgb, ${from} 48%, transparent) 42%,
          color-mix(in srgb, ${from} 18%, transparent) 68%,
          transparent 100%)`,
      }}
    />
  );
}
