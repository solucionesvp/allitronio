"use client";

// ── StackingCard — tarjeta sticky que se apila y se encoge al hacer scroll ──
// Adaptado de una referencia visual, reconstruido con nuestros tokens.
// Renderiza N de estas en secuencia (una por elemento real: verticales,
// fases, tiers, pasos) y cada una se "apila" detrás de la siguiente según
// se hace scroll. Sin assets nuevos — el contenido interno es libre
// (children), reutiliza lo que cada página ya tiene.

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface StackingCardProps {
  index: number;
  total: number;
  children: ReactNode;
  className?: string;
}

export default function StackingCard({ index, total, children, className = "" }: StackingCardProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={ref}
      className="sticky h-[85vh]"
      style={{ top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.div
        style={reduced ? undefined : { scale }}
        className={`h-full origin-top ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
