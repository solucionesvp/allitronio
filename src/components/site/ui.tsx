"use client";

// ── Piezas visuales compartidas del sitio (home y /productos) ───────────────
// Mismo lenguaje que las landings de Domina Google y Toma tu Mercado:
// display en negritas, eyebrows espaciados, tarjetas rectas (rounded-sm),
// entradas suaves al hacer scroll, hero y cierre oscuros, cuerpo claro.

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const ALLITRON_GRADIENT = "linear-gradient(135deg, #3CC4F7 0%, #09AFF2 50%, #034058 100%)";

/** Paleta clara neutra del sitio (no pertenece a ningún producto). */
export const SITE_LIGHT_VARS = {
  "--pf-bg": "#F4F5F3",
  "--pf-bg-alt": "#E9ECE8",
  "--pf-card": "#FFFFFF",
  "--pf-ink": "#101820",
  "--pf-muted": "#56616A",
  "--pf-line": "rgba(16,24,32,0.11)",
} as CSSProperties;

export const H2 = "font-display font-black leading-[1.05] tracking-tight text-[var(--pf-ink)]";
export const BODY = "font-body text-[0.88rem] leading-[1.8] text-[var(--pf-muted)]";
export const EYEBROW = "mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em]";
export const SECTION = "w-full px-6 py-24 md:px-10 lg:px-16 xl:px-24";

export const H2_SIZE = { fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" } as const;

export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

/** Quita la extensión de un asset para usarlo como `bases` de LaunchImage. */
export function base(path: string): string {
  return path.replace(/\.(webp|jpg|jpeg|png|svg)$/i, "");
}

export function GradientLink({
  href,
  children,
  gradient = ALLITRON_GRADIENT,
  external = false,
  full = false,
  large = false,
}: {
  href: string;
  children: ReactNode;
  gradient?: string;
  external?: boolean;
  full?: boolean;
  large?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-display font-bold text-white transition-transform duration-300 hover:scale-[1.02] ${
        large ? "px-8 py-4 text-[0.68rem] tracking-[0.2em]" : "px-6 py-3.5 text-[0.6rem] tracking-[0.2em]"
      } ${full ? "w-full" : ""}`}
      style={{ background: gradient }}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
    </a>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <motion.span {...reveal(0)} className={`${EYEBROW} ${dark ? "text-allitron-blue" : "text-[var(--pf-muted)]"}`}>
        {eyebrow}
      </motion.span>
      <motion.h2
        {...reveal(0.06)}
        className={`${center ? "mx-auto" : ""} max-w-[720px] font-display font-black leading-[1.05] tracking-tight ${dark ? "text-white" : "text-[var(--pf-ink)]"}`}
        style={H2_SIZE}
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          {...reveal(0.1)}
          className={`${center ? "mx-auto" : ""} mt-5 max-w-[620px] font-body text-[0.9rem] leading-[1.8] ${dark ? "text-white/70" : "text-[var(--pf-muted)]"}`}
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}

export const AI_SCENES_NOTE = "Algunas imágenes son escenas ilustrativas creadas con IA.";
