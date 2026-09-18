/* eslint-disable @next/next/no-img-element */
// OptionalAsset: usa <img> nativo para tener onError real. next/image no lo expone para assets opcionales.
"use client";

import { forwardRef, useCallback, useState } from "react";

// ── OptionalImage ────────────────────────────────────────────────
// Muestra una imagen si existe; si falla, cae a `placeholder` (foto real
// remota) y, si tampoco hay, a `fallback` (nodo de marca).
//
// IMPORTANTE — corrección de race condition (agosto 2026):
// El bug anterior era que `onLoad` se dispara ANTES de que React hidrate y
// enganche el handler cuando la imagen ya está en caché o carga muy rápido.
// El estado se quedaba en "pending" para siempre y el <img> permanecía en
// display:none — imágenes que sí cargaban pero nunca se mostraban.
// El ref callback de abajo consulta `img.complete`/`naturalWidth` en el
// momento exacto en que el nodo entra al DOM — fuente de verdad del
// navegador, sin depender de que el evento llegue a tiempo.

interface OptionalImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  /** Foto remota real a usar si `src` no existe todavía */
  placeholder?: string;
  /** Nodo a mostrar si la imagen falla y no hay placeholder */
  fallback?: React.ReactNode;
  loading?: "lazy" | "eager";
  /** Estilos inline extra (se combinan con el control de visibilidad) */
  style?: React.CSSProperties;
}

export function OptionalImage({
  src,
  alt = "",
  width,
  height,
  className,
  placeholder,
  fallback = null,
  loading = "eager",
  style,
}: OptionalImageProps) {
  // pending → loaded | failed
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");
  // Cuando el src local falla y hay placeholder, cambiamos a la foto remota.
  const [usingPlaceholder, setUsingPlaceholder] = useState(false);
  // Reinicio de estado al cambiar de src, en render (patrón oficial de React
  // para derivar estado de props — evita un efecto con setState en cascada).
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setStatus("pending");
    setUsingPlaceholder(false);
  }

  const currentSrc = usingPlaceholder && placeholder ? placeholder : src;

  const handleError = useCallback(() => {
    setUsingPlaceholder((wasUsingPlaceholder) => {
      if (!wasUsingPlaceholder && placeholder) {
        setStatus("pending");
        return true;
      }
      setStatus("failed");
      return wasUsingPlaceholder;
    });
  }, [placeholder]);

  // Se ejecuta cuando el <img> entra al DOM: si el navegador ya la resolvió
  // (caché), sincronizamos el estado sin esperar el evento onLoad.
  const attachRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img || !img.complete) return;
      if (img.naturalWidth > 0) setStatus("loaded");
      else handleError();
    },
    [handleError],
  );

  return (
    <>
      {status !== "failed" && (
        <img
          key={currentSrc}
          ref={attachRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className={className}
          style={{ ...style, display: status === "loaded" ? undefined : "none" }}
          onLoad={() => setStatus("loaded")}
          onError={handleError}
        />
      )}
      {/* Fallback visible mientras no cargue o si falla definitivamente */}
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

export const OptionalVideo = forwardRef<HTMLVideoElement, OptionalVideoProps>(
  function OptionalVideo({ src, className, fallback = null, poster }, ref) {
    const [failed, setFailed] = useState(false);

    if (failed) return <>{fallback}</>;

    // Empieza siempre silenciado -- requisito de los navegadores para
    // autoplay. Cuando se necesita sonido, el padre recibe el ref y
    // alterna `.muted` en el primer gesto del usuario (ver
    // useSoundUnlocked).
    //
    // autoPlay + muted: es el mecanismo nativo del navegador para arrancar
    // el primer play, más confiable que disparar `.play()` a mano desde un
    // efecto de React (que puede perderse por timing en el primer render).
    // En Solutions.tsx los 5 productos están siempre montados a la vez
    // (nunca se desmontan al cambiar de producto) — el padre se encarga de
    // pausar el que no está activo y de reiniciar+reproducir el que sí
    // (ver el useEffect de `active` en ProductPanel), así que sólo el
    // producto visible reproduce, y siempre arranca desde cero al
    // activarse, aunque el navegador haya intentado auto-reproducir los 5
    // al cargar la página.
    //
    // Sin `loop`: el clip de ensamblaje no está pensado para repetirse en
    // seco. Al terminar, el navegador lo deja quieto en su último cuadro
    // (el producto ya armado) de forma nativa — sin JS extra, sin cortar
    // el audio antes de tiempo.
    return (
      <video
        ref={ref}
        src={src}
        poster={poster}
        className={className}
        autoPlay
        muted
        playsInline
        preload="auto"
        onError={() => setFailed(true)}
      />
    );
  },
);
