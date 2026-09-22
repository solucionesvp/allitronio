"use client";

// ── FilmGrain ────────────────────────────────────────────────────
// Textura de grano fino sobre una foto, para que se sienta editorial/
// cinematográfica en vez de un recorte digital "duro" (pedido de Lups,
// 23-sep-2026, sobre el hero del home y el Hub). Ruido generado con un
// filtro SVG (feTurbulence) codificado como data URI — no depende de
// ningún archivo de imagen, cero peso de red, se ve nítido a cualquier
// resolución. mix-blend-mode "overlay" hace que el grano reaccione a la
// luminosidad de lo que tiene debajo (más claro en zonas claras, más
// oscuro en zonas oscuras) en vez de verse como una capa plana encima.
//
// Uso: <FilmGrain /> como última capa (la de más arriba) dentro del
// contenedor relative/absolute de la foto que se quiere texturizar.

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='grain'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#grain)'/></svg>`;

const NOISE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}`;

interface FilmGrainProps {
  /** Opacidad del grano (0–1). Sutil por default — es textura, no ruido visible. */
  opacity?: number;
  className?: string;
}

export default function FilmGrain({ opacity = 0.1, className = "" }: FilmGrainProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mix-blend-overlay ${className}`}
      style={{
        backgroundImage: `url("${NOISE_DATA_URI}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity,
      }}
    />
  );
}
