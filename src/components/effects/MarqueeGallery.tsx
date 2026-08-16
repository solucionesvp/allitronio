"use client";

// ── MarqueeGallery — dos filas de imágenes en movimiento continuo ──────────
// El carrusel SIEMPRE está en movimiento: la animación base es CSS puro
// (`.marquee-left` / `.marquee-right` en globals.css), así que no depende del
// scroll ni de JavaScript y nunca se queda congelado.
// El scroll suma un desplazamiento extra encima, en un wrapper interno, para
// conservar la sensación de parallax al recorrer la sección.
//
// Cada fila se triplica para que el bucle sea invisible: la animación
// desplaza exactamente 1/3 del ancho total y vuelve a empezar.

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { PLACEHOLDER, type PlaceholderTheme } from "@/config/assets";

export interface MarqueeImage {
  src: string;
  alt: string;
  /** Placeholder temático mientras no exista la foto real */
  theme?: PlaceholderTheme;
}

interface MarqueeGalleryProps {
  images: MarqueeImage[];
  className?: string;
}

function tripleRow(row: MarqueeImage[]): MarqueeImage[] {
  return [...row, ...row, ...row];
}

function Tile({ img }: { img: MarqueeImage }) {
  return (
    <div className="relative h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] sm:h-[220px] sm:w-[340px] md:h-[270px] md:w-[420px]">
      <OptionalImage
        src={img.src}
        alt={img.alt}
        placeholder={PLACEHOLDER[img.theme ?? "product"]}
        className="h-full w-full object-cover"
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-allitron-navy/25">
            <span className="h-1.5 w-1.5 rounded-full bg-allitron-blue/40 animate-node-breathe" aria-hidden="true" />
          </div>
        }
      />
    </div>
  );
}

export default function MarqueeGallery({ images, className = "" }: MarqueeGalleryProps) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const drift1Ref = useRef<HTMLDivElement>(null);
  const drift2Ref = useRef<HTMLDivElement>(null);

  const mid = Math.ceil(images.length / 2);
  const row1 = tripleRow(images.slice(0, mid));
  const row2 = tripleRow(images.slice(mid));

  // Desplazamiento adicional por scroll — se aplica al wrapper, no a la pista
  // animada, para que no interfiera con la animación CSS continua.
  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // Progreso de la sección respecto al viewport, centrado en 0
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height) - 0.5;
        const offset = progress * 260;
        if (drift1Ref.current) drift1Ref.current.style.transform = `translateX(${offset}px)`;
        if (drift2Ref.current) drift2Ref.current.style.transform = `translateX(${-offset}px)`;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={sectionRef} className={`flex flex-col gap-3 overflow-hidden ${className}`}>
      <div ref={drift1Ref} style={{ willChange: "transform" }}>
        <div className="marquee-left flex w-max gap-3">
          {row1.map((img, i) => (
            <Tile key={`r1-${i}`} img={img} />
          ))}
        </div>
      </div>
      <div ref={drift2Ref} style={{ willChange: "transform" }}>
        <div className="marquee-right flex w-max gap-3">
          {row2.map((img, i) => (
            <Tile key={`r2-${i}`} img={img} />
          ))}
        </div>
      </div>
    </div>
  );
}
