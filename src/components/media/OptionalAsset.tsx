/* eslint-disable @next/next/no-img-element */
// OptionalAsset: usa <img> nativo para tener onError real. next/image no lo expone para assets opcionales.
"use client";

import { useState } from "react";

// ── OptionalImage ────────────────────────────────────────────────
// Muestra una imagen si existe; silencia el error si no existe.
// Nunca muestra ícono de imagen rota.

interface OptionalImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  /** Nodo a mostrar si la imagen falla o aún no existe */
  fallback?: React.ReactNode;
  loading?: "lazy" | "eager";
}

export function OptionalImage({
  src,
  alt = "",
  width,
  height,
  className,
  fallback = null,
  loading = "lazy",
}: OptionalImageProps) {
  // pending → loaded | failed
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");

  return (
    <>
      {status !== "failed" && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={className}
          style={{ display: status === "loaded" ? undefined : "none" }}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      )}
      {/* Fallback visible mientras no cargue o si falla */}
      {status !== "loaded" && fallback}
    </>
  );
}

// ── OptionalVideo ─────────────────────────────────────────────────
// Video silencioso en loop — oculto si el archivo no existe.

interface OptionalVideoProps {
  src: string;
  className?: string;
  fallback?: React.ReactNode;
  /** Poster frame antes de que arranque el video */
  poster?: string;
}

export function OptionalVideo({
  src,
  className,
  fallback = null,
  poster,
}: OptionalVideoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <video
      src={src}
      poster={poster}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      onError={() => setFailed(true)}
    />
  );
}
