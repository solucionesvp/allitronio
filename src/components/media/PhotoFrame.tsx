"use client";

// ── PhotoFrame — slot listo para recibir una foto real ───────────────────────
// Mientras no exista el archivo en /public, muestra una foto real de stock
// (placeholder temático, ver PLACEHOLDER en config/assets.ts) en vez de un
// espacio vacío. En cuanto se coloca el archivo en la ruta registrada en
// config/assets.ts, aparece automáticamente — no requiere tocar código.

import { OptionalImage } from "./OptionalAsset";
import { PLACEHOLDER, type PlaceholderTheme } from "@/config/assets";

interface PhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
  /** Clase de aspect-ratio de Tailwind, ej. "aspect-[4/3]" */
  aspect?: string;
  /** Tema del placeholder remoto mientras no exista la foto real */
  theme?: PlaceholderTheme;
}

export function PhotoFrame({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  theme = "product",
}: PhotoFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-white/[0.07] bg-gradient-to-br from-allitron-navy/50 to-allitron-base ${aspect} ${className}`}
    >
      <OptionalImage
        src={src}
        alt={alt}
        placeholder={PLACEHOLDER[theme]}
        className="h-full w-full object-cover"
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="h-2 w-2 rounded-full bg-allitron-blue/50 animate-node-breathe"
              aria-hidden="true"
            />
          </div>
        }
      />
    </div>
  );
}
