/* eslint-disable @next/next/no-img-element */
"use client";

// ── ResponsiveCinematicImage — foto opcional con srcset y espacio reservado ──
// Recibe la ruta SIN extensión (ver PRODUCT_VOLANTE en config/assets.ts) y usa
// tres anchos: <ruta>-800.webp, <ruta>-1400.webp y <ruta>.webp (2000 px).
// El contenedor reserva su proporción con `ratio` (evita CLS) y se colapsa o
// muestra `fallback` si el archivo no existe. Usa <img> nativo porque next/image
// no permite assets opcionales (mismo criterio que LaunchImage).

import { useState, type ReactNode } from "react";

interface Props {
  base: string;
  alt?: string;
  /** Proporción CSS del contenedor, p. ej. "16 / 9". */
  ratio: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fallback?: ReactNode;
  onStatusChange?: (loaded: boolean) => void;
}

export function ResponsiveCinematicImage({
  base,
  alt = "",
  ratio,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  fallback = null,
  onStatusChange,
}: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      <img
        src={`${base}-1400.webp`}
        srcSet={`${base}-800.webp 800w, ${base}-1400.webp 1400w, ${base}.webp 2000w`}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => onStatusChange?.(true)}
        onError={() => {
          setFailed(true);
          onStatusChange?.(false);
        }}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
