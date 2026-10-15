"use client";

// ── SceneStrip — tira de escenas ilustrativas ───────────────────────────────
// Rejilla de 2–3 fotos con la misma proporción y un pie opcional. Cada foto se
// oculta sola si el archivo no existe (ver ResponsiveCinematicImage).

import { motion } from "framer-motion";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";
import { reveal } from "./ui";

export interface Scene {
  base: string;
  alt: string;
}

interface Props {
  scenes: Scene[];
  ratio?: string;
  caption?: string;
  className?: string;
  /** Tema claro (fondo crema) u oscuro. */
  tone?: "dark" | "light";
}

export function SceneStrip({ scenes, ratio = "3 / 2", caption, className = "", tone = "dark" }: Props) {
  const cols = scenes.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const border = tone === "dark" ? "border-white/10" : "border-[var(--tm-line)]";
  const text = tone === "dark" ? "text-foreground/55" : "text-[var(--tm-muted)]";
  return (
    <div className={className}>
      <div className={`grid gap-3 ${cols}`}>
        {scenes.map((s, i) => (
          <motion.figure key={s.base} {...reveal(0.08 * i)} className={`m-0 overflow-hidden rounded-sm border ${border}`}>
            <ResponsiveCinematicImage
              base={s.base}
              alt={s.alt}
              ratio={ratio}
              sizes={scenes.length >= 3 ? "(min-width: 1024px) 380px, (min-width: 640px) 33vw, 100vw" : "(min-width: 1024px) 580px, (min-width: 640px) 50vw, 100vw"}
            />
          </motion.figure>
        ))}
      </div>
      {caption && <p className={`mt-3 font-body text-[0.72rem] leading-[1.6] ${text}`}>{caption}</p>}
    </div>
  );
}
