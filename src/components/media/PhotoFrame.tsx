"use client";

// ── PhotoFrame — slot listo para recibir una foto real ───────────────────────
// Mientras no exista el archivo en /public, muestra un placeholder de marca
// (gradiente + nodo pulsante) en vez de espacio vacío o ícono roto.
// En cuanto se coloca el archivo en la ruta registrada en config/assets.ts,
// aparece automáticamente — no requiere tocar código.

import { OptionalImage } from "./OptionalAsset";

interface PhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
  /** Clase de aspect-ratio de Tailwind, ej. "aspect-[4/3]" */
  aspect?: string;
}

export function PhotoFrame({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
}: PhotoFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-white/[0.07] bg-gradient-to-br from-allitron-navy/50 to-allitron-base ${aspect} ${className}`}
    >
      <OptionalImage
        src={src}
        alt={alt}
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
