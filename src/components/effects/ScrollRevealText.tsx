"use client";

// ── ScrollRevealText — texto que se revela carácter por carácter ─────────
// Adaptado de una referencia visual, reconstruido con nuestros tokens.
// Cada carácter va de opacidad 0.2 a 1 según su posición en el texto,
// mapeada al progreso de scroll del párrafo. Sin assets nuevos.
//
// Corrección (agosto 2026): antes cada carácter era un inline-block suelto,
// así que el navegador podía cortar una palabra a la mitad al hacer wrap
// ("infraes / tructura"). Ahora los caracteres se agrupan por palabra y cada
// palabra es un inline-block indivisible — la animación sigue siendo por
// carácter, pero el salto de línea solo ocurre entre palabras.

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Char({ char, index, total, progress }: CharProps) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden="true">
        {char}
      </span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });

  const words = text.split(" ");
  const totalChars = Array.from(text).length;

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  // Índice global del carácter, para que el barrido de opacidad avance de
  // forma continua a lo largo de todo el texto y no se reinicie por palabra.
  let charIndex = 0;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        const node = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {chars.map((c, ci) => {
              const i = charIndex++;
              return <Char key={ci} char={c} index={i} total={totalChars} progress={scrollYProgress} />;
            })}
            {wi < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
          </span>
        );
        charIndex++; // cuenta el espacio que separa las palabras
        return node;
      })}
    </p>
  );
}
