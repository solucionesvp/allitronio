/* eslint-disable @next/next/no-img-element */
"use client";

// ── LaunchImage — imagen que se activa sola al guardar el archivo ────────────
// Para la landing de lanzamiento de Domina Google. Recibe rutas SIN extensión
// (ver PRODUCT_LOCAL_LAUNCH en config/assets.ts) y prueba .webp, .jpg, .png y
// .svg en ese orden, y luego cada ruta alternativa. Si ninguna existe:
//   · con `fallback` → muestra ese nodo
//   · sin `fallback` → no renderiza nada (el contenedor queda colapsado)
// Carga diferida: no pide la imagen hasta que está a 600px del viewport
// (salvo `priority`, para el hero). Usa <img> nativo por la misma razón que
// OptionalAsset: next/image no expone onError para assets opcionales.

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";

const EXTS = ["webp", "jpg", "png", "svg"] as const;

interface LaunchImageProps {
  /** Rutas SIN extensión, en orden de prioridad. */
  bases: readonly string[];
  /** URL exacta (con extensión) si ninguna base existe. */
  fallbackSrc?: string;
  alt?: string;
  /** Clases del contenedor (aspect-ratio, bordes). Se oculta mientras no haya imagen. */
  wrapperClassName?: string;
  imgClassName?: string;
  /** Carga inmediata (hero). Por defecto, carga diferida. */
  priority?: boolean;
  /** Nodo a mostrar mientras no haya imagen. */
  fallback?: ReactNode;
  /** Avisa al padre si hay imagen visible (para cambiar el layout). */
  onStatusChange?: (loaded: boolean) => void;
}

export function LaunchImage({
  bases,
  fallbackSrc,
  alt = "",
  wrapperClassName,
  imgClassName,
  priority = false,
  fallback = null,
  onStatusChange,
}: LaunchImageProps) {
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const seen = useInView(sentinelRef, { once: true, margin: "600px 0px" });
  const started = priority || seen;

  const sources: string[] = [];
  for (const base of bases) for (const ext of EXTS) sources.push(`${base}.${ext}`);
  if (fallbackSrc) sources.push(fallbackSrc);

  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = idx >= sources.length;
  const src = sources[idx];

  useEffect(() => {
    onStatusChange?.(loaded);
  }, [loaded, onStatusChange]);

  const next = useCallback(() => setIdx((i) => i + 1), []);

  // Igual que OptionalImage: si el navegador ya resolvió la imagen (caché),
  // sincronizamos sin esperar el evento onLoad.
  const attachRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img || !img.complete) return;
      if (img.naturalWidth > 0) setLoaded(true);
      else next();
    },
    [next],
  );

  if (failed) return <>{fallback}</>;

  return (
    <>
      <span ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute h-px w-px" />
      {started && (
        <div className={wrapperClassName} style={{ display: loaded ? undefined : "none" }}>
          <img
            key={src}
            ref={attachRef}
            src={src}
            alt={alt}
            decoding="async"
            className={imgClassName}
            onLoad={() => setLoaded(true)}
            onError={next}
          />
        </div>
      )}
      {!loaded && fallback}
    </>
  );
}
