"use client";

// ── ScrollRevealText — texto que se revela carácter por carácter ─────────
// Adaptado de una referencia visual, reconstruido con nuestros tokens.
// Cada carácter va de opacidad 0.2 a 1 según su posición en el texto,
// mapeada al progreso de scroll del párrafo. Sin assets nuevos.

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

// Non-breaking space (U+00A0) — evita que los espacios colapsen al quedar
// cada carácter envuelto en su propio span.
const NBSP = " ";

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
  const chars = Array.from(text);

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {chars.map((c, i) => (
        <Char key={i} char={c === " " ? NBSP : c} index={i} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}
