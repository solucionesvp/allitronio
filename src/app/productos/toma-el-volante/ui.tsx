"use client";

// ── Piezas compartidas de la landing Toma el Volante ─────────────────────────
// Un solo lugar para el lenguaje de movimiento, los botones y los tokens, para
// que las escenas no dupliquen estilos. El movimiento respeta
// prefers-reduced-motion mediante <MotionConfig reducedMotion="user"> en page.tsx.

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { TOMA_EL_VOLANTE_LIGHT, TOMA_EL_VOLANTE_TOKENS } from "@/config/productTheme";
import { trackLandingEventOnce, type LandingEventName } from "@/lib/landingEvents";

export const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const ACCENT = TOMA_EL_VOLANTE_TOKENS.accent;
export const GRADIENT = TOMA_EL_VOLANTE_TOKENS.gradient;
export const L = TOMA_EL_VOLANTE_LIGHT;
/** Azul Allitron: lo usamos para "control" (datos, tablero); el ámbar para el "caos" y la acción. */
export const CONTROL_BLUE = "#09AFF2";

export const LIGHT_VARS = {
  "--tm-bg": L.bg,
  "--tm-bg-alt": L.bgAlt,
  "--tm-card": L.card,
  "--tm-ink": L.ink,
  "--tm-muted": L.muted,
  "--tm-line": L.line,
  "--tm-accent-text": L.accentText,
} as CSSProperties;

export const H2 = "font-display font-black leading-[1.04] tracking-tight";
export const EYEBROW = "mb-4 block font-display text-[0.6rem] font-bold tracking-[0.3em]";
export const SECTION_X = "px-6 sm:px-10 lg:px-16 xl:px-24";

export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.65, delay, ease: EASE },
  };
}

export function CtaButton({
  label,
  onClick,
  large = false,
  className = "",
}: {
  label: string;
  onClick: () => void;
  large?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm font-display font-bold text-white transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        large ? "px-8 py-4 text-[0.7rem] tracking-[0.18em]" : "px-6 py-3.5 text-[0.64rem] tracking-[0.18em] sm:px-7"
      } ${className}`}
      style={{ background: GRADIENT }}
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
    </button>
  );
}

export function GhostLink({ label, href, onClick, dark = true }: { label: string; href: string; onClick?: () => void; dark?: boolean }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-sm border px-6 py-3.5 font-display text-[0.64rem] font-bold tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        dark
          ? "border-white/35 text-foreground hover:bg-white/10 focus-visible:outline-white"
          : "border-[var(--tm-line)] text-[var(--tm-ink)] hover:bg-black/5 focus-visible:outline-[var(--tm-ink)]"
      }`}
    >
      {label}
    </a>
  );
}

/** Dispara un evento una sola vez cuando el bloque entra al viewport. */
export function ViewTracker({ event, section, children, className }: { event: LandingEventName; section: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackLandingEventOnce(event, { section });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [event, section]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export const TOMA_EL_VOLANTE_ACCENT_SOFT = TOMA_EL_VOLANTE_TOKENS.accentSoft;
