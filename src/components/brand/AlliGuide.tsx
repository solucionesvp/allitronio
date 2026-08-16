"use client";

// ── AlliGuide — Alli marcando los cambios de sección del home ────────────────
// Decisión de diseño (agosto 2026): antes Alli aparecía en solo 2 puntos para
// no saturar (ver docs/ASSETS.md). Ahora es deliberadamente el "anfitrión" que
// aparece en cada transición del home — Hero→Productos→Hub→Footer — como en
// el recorrido de Cyclemon, pero guiado por nuestro propio personaje en vez
// de un efecto genérico. Reutiliza los 3 assets ya existentes (primary/blue/
// monochrome) — no requiere arte nuevo.

import { motion, useReducedMotion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// El arte de `primary` es el único de alta fidelidad (los archivos blue y
// monochrome vienen con paleta reducida y se ven rotos al quitarles el fondo).
// Las variantes se derivan del primary con filtros CSS — mismo personaje,
// misma calidad, sin depender de arte degradado.
const VARIANT_SRC = {
  primary: BRAND_ALLI.primary,
  blue: BRAND_ALLI.primary,
  monochrome: BRAND_ALLI.primary,
} as const;

const VARIANT_FILTER: Record<keyof typeof VARIANT_SRC, string | undefined> = {
  primary: undefined,
  blue: "saturate(1.35) hue-rotate(-8deg) brightness(1.05)",
  monochrome: "grayscale(1) brightness(1.15) opacity(0.5)",
};

interface AlliGuideProps {
  variant?: keyof typeof VARIANT_SRC;
  /** Posición horizontal del personaje respecto al contenedor padre (relative/absolute). */
  side?: "left" | "right";
  /** Ancho en px — se mantiene modesto, Alli acompaña, no protagoniza. */
  size?: number;
  className?: string;
}

export default function AlliGuide({
  variant = "primary",
  side = "right",
  size = 84,
  className = "",
}: AlliGuideProps) {
  const reduced = useReducedMotion() ?? false;
  const sideClass = side === "left" ? "left-8 lg:left-16" : "right-8 lg:right-16";

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`pointer-events-none absolute z-20 ${sideClass} ${className}`}
      style={{ width: size }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={reduced ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ filter: VARIANT_FILTER[variant] }}>
          <OptionalImage
            src={VARIANT_SRC[variant]}
            alt=""
            className="w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            fallback={null}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
