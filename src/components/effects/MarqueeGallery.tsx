"use client";

// ── MarqueeGallery — dos filas de imágenes que se desplazan con el scroll ──
// Adaptado de una referencia visual, reconstruido con nuestros propios
// assets (ya registrados en config/assets.ts — no assets nuevos requeridos
// para el uso en el home). Fila 1 se mueve a la derecha, fila 2 a la
// izquierda, cada una triplicada para loop visual continuo.

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";

export interface MarqueeImage {
  src: string;
  alt: string;
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
        loading="lazy"
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
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const mid = Math.ceil(images.length / 2);
  const row1 = tripleRow(images.slice(0, mid));
  const row2 = tripleRow(images.slice(mid));

  useEffect(() => {
    if (reduced) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  return (
    <div ref={sectionRef} className={`flex flex-col gap-3 overflow-hidden ${className}`}>
      <div ref={row1Ref} className="flex gap-3" style={{ willChange: "transform" }}>
        {row1.map((img, i) => (
          <Tile key={`r1-${i}`} img={img} />
        ))}
      </div>
      <div ref={row2Ref} className="flex gap-3" style={{ willChange: "transform" }}>
        {row2.map((img, i) => (
          <Tile key={`r2-${i}`} img={img} />
        ))}
      </div>
    </div>
  );
}
