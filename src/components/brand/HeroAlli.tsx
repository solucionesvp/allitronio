"use client";

// ── HeroAlli — Alli como anfitrión del hero ──────────────────────────────────
// Mismo personaje, misma presencia, en el home y en las 4 landings de producto
// (decisión de Lups, agosto 2026). Un solo componente para que la posición y
// el comportamiento responsive sean idénticos en todo el sitio.
//
// Responsive — el problema que resuelve:
//   · Móvil / tablet: el texto ocupa todo el ancho, así que Alli baja al fondo
//     con opacidad reducida y se lee como atmósfera, nunca encima del texto.
//   · Desktop: se coloca en la mitad derecha (`left`, por defecto 66%), donde
//     el titular ya no llega, a tamaño completo.
//
// Cada capa tiene una sola responsabilidad para que los `transform` no se
// pisen entre sí:
//   posición (utilidades) → entrada (.alli-rise) → magnético (Magnet)
//   → flotación (.alli-float) → imagen

import Magnet from "@/components/effects/Magnet";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { HERO, BRAND_ALLI } from "@/config/assets";

interface HeroAlliProps {
  /** Posición horizontal en desktop (por defecto "66%") */
  left?: string;
  /** Retraso de entrada en segundos */
  delay?: number;
  /** Halo de color bajo el personaje — normalmente el acento del producto */
  glow?: string;
  className?: string;
}

export default function HeroAlli({
  left = "66%",
  delay = 0.45,
  glow,
  className = "",
}: HeroAlliProps) {
  return (
    <div
      aria-hidden="true"
      className={`hero-alli pointer-events-none absolute bottom-0 z-[6] w-[clamp(170px,40vw,260px)] -translate-x-1/2 opacity-[0.16] sm:w-[clamp(210px,38vw,300px)] sm:opacity-[0.22] lg:bottom-auto lg:top-1/2 lg:w-[clamp(290px,25vw,420px)] lg:-translate-x-0 lg:-translate-y-1/2 lg:opacity-100 ${className}`}
      style={{ ["--alli-left" as string]: left }}
    >
      <div className="alli-rise" style={{ animationDelay: `${delay}s` }}>
        {glow && (
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background: `radial-gradient(circle at 50% 55%, ${glow}3d 0%, transparent 68%)`,
            }}
          />
        )}
        <Magnet padding={200} strength={8}>
          <div className="alli-float">
            <OptionalImage
              src={HERO.portrait}
              alt=""
              placeholder={BRAND_ALLI.primary}
              className="w-full drop-shadow-[0_26px_70px_rgba(0,0,0,0.62)]"
              fallback={null}
            />
          </div>
        </Magnet>
      </div>
    </div>
  );
}
