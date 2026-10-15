"use client";

// ── Cinco fases, una a la vez ────────────────────────────────────────────────
// Control segmentado (pastilla deslizante) + un solo panel grande: foto y texto.
// Menos ruido que cinco tarjetas juntas. Tablist accesible con flechas, Inicio y Fin.

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { VOLANTE_METHOD } from "@/data/tomaElVolanteContent";
import { EASE, L } from "./ui";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";

const IMAGES = [IMG.fase1, IMG.fase2, IMG.fase3, IMG.fase4, IMG.fase5] as const;
const N = VOLANTE_METHOD.length;

export default function PhaseTabs() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (k: number, focus = false) => {
    const j = (k + N) % N;
    setI(j);
    if (focus) refs.current[j]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: N - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };
  const step = VOLANTE_METHOD[i];
  const next = VOLANTE_METHOD[(i + 1) % N];

  return (
    <div className="mt-14">
      <div
        role="tablist"
        aria-label="Fases del ciclo de 90 días"
        onKeyDown={onKey}
        className="mx-auto flex w-full snap-x gap-1 overflow-x-auto rounded-full bg-black/[0.055] p-1 [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden"
      >
        {VOLANTE_METHOD.map((m, k) => {
          const on = k === i;
          return (
            <button
              key={m.n}
              ref={(el) => {
                refs.current[k] = el;
              }}
              role="tab"
              id={`fase-tab-${m.n}`}
              aria-selected={on}
              aria-controls="fase-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => go(k)}
              className={`relative min-h-[44px] shrink-0 snap-center whitespace-nowrap rounded-full px-4 font-display text-[0.72rem] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--tm-accent-text)] sm:px-5 ${on ? "text-white" : "text-[var(--tm-ink)]/70 hover:text-[var(--tm-ink)]"}`}
            >
              {on && <motion.span layoutId="fase-pill" transition={{ duration: 0.35, ease: EASE }} className="absolute inset-0 rounded-full bg-[var(--tm-ink)]" />}
              <span className="relative z-10">
                <span className={on ? "opacity-60" : "opacity-50"}>{m.n}</span>
                <span className="ml-2">{m.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="fase-panel" role="tabpanel" aria-labelledby={`fase-tab-${step.n}`} className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14"
          >
            <div className="overflow-hidden rounded-[28px] bg-allitron-base shadow-[0_30px_70px_rgba(22,19,12,0.18)]">
              <ResponsiveCinematicImage base={IMAGES[i]} alt={`Fase ${step.n}: ${step.label}`} ratio="4 / 3" sizes="(min-width: 768px) 560px, 100vw" />
            </div>
            <div>
              <span className="font-display text-[0.62rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                FASE {step.n} DE {N}
              </span>
              <h3 className="mt-4 font-display font-black leading-[1.05] tracking-tight text-[var(--tm-ink)]" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)" }}>
                {step.label}
              </h3>
              <p className="mt-4 max-w-[460px] font-body text-[1rem] leading-[1.75] text-[var(--tm-muted)]">{step.body}</p>
              <button
                type="button"
                onClick={() => go(i + 1)}
                className="mt-7 inline-flex min-h-[44px] items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.12em] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--tm-accent-text)]"
                style={{ color: L.accentText }}
              >
                {i === N - 1 ? "VOLVER A LA FASE 1" : `SIGUIENTE: ${next.label.toUpperCase()}`}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
