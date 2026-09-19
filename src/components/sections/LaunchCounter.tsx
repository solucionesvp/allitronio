"use client";

// ── LaunchCounter — contador de lugares de lanzamiento ───────────────────────
// Dos variantes:
//   · "hero"  — compacto, para fondos oscuros: número que baja de 20 al valor
//               real al entrar en pantalla + 20 pines de mapa (vendidos rellenos).
//   · "panel" — grande, para la sección de precio (fondo claro): mismo número
//               en grande, los 20 pines y una barra segmentada por nivel.
// Los datos NO viven aquí: vienen de dominaGoogleLaunchContent.ts
// (DG_LAUNCH_SOLD_TOTAL es el único número que se edita al vender).

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import type { LaunchTier } from "@/data/dominaGoogleLaunchContent";

interface LaunchCounterProps {
  tiers: readonly LaunchTier[];
  soldByTier: Record<string, number>;
  accent: string;
  /** Color del acento para texto sobre fondo claro (más oscuro, contraste AA) */
  accentText?: string;
  variant: "hero" | "panel";
  className?: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Número que baja desde `from` hasta `to` al entrar en pantalla. */
function CountDown({ from, to, className }: { from: number; to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(from, to, {
      duration: 1.8,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  );
}

export default function LaunchCounter({
  tiers,
  soldByTier,
  accent,
  accentText,
  variant,
  className = "",
}: LaunchCounterProps) {
  const total = tiers.reduce((acc, t) => acc + t.slots, 0);
  const sold = tiers.reduce((acc, t) => acc + (soldByTier[t.id] ?? 0), 0);
  const remaining = Math.max(0, total - sold);
  const pins = Array.from({ length: total }, (_, i) => i);
  const dark = variant === "hero";
  const textMain = dark ? "#FFFFFF" : "var(--dg-ink)";
  const textSoft = dark ? "rgba(255,255,255,0.72)" : "var(--dg-muted)";
  const emptyStroke = dark ? "rgba(255,255,255,0.42)" : "rgba(26,22,20,0.32)";
  const strong = accentText ?? accent;

  const pinRow = (size: number) => (
    <div className="flex flex-wrap gap-x-1 gap-y-1.5" role="img" aria-label={`${sold} de ${total} lugares ya tomados`}>
      {pins.map((i) => {
        const isSold = i < sold;
        const isNext = i === sold;
        return (
          <span key={i} className="relative inline-flex">
            {isNext && (
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full opacity-60"
                style={{ background: accent, transform: "scale(0.55)" }}
              />
            )}
            <MapPin
              style={{ width: size, height: size }}
              strokeWidth={isSold ? 1.5 : 1.8}
              stroke={isSold ? accent : isNext ? accent : emptyStroke}
              fill={isSold ? accent : "none"}
              className="relative"
            />
          </span>
        );
      })}
    </div>
  );

  if (variant === "hero") {
    return (
      <div
        className={`inline-flex max-w-full flex-col gap-3 rounded-sm border border-white/15 bg-black/30 px-4 py-3.5 backdrop-blur-md ${className}`}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: accent }} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
          </span>
          <p className="font-body text-[0.82rem] leading-none" style={{ color: textSoft }}>
            <CountDown from={total} to={remaining} className="font-display text-[1.6rem] font-black" />
            <span style={{ color: textMain }} className="ml-1.5 font-semibold">
              lugares disponibles
            </span>{" "}
            de {total}
          </p>
        </div>
        {pinRow(15)}
        <p className="font-body text-[0.72rem]" style={{ color: textSoft }}>
          {sold} {sold === 1 ? "ya tomado" : "ya tomados"} · el precio sube al agotarse cada nivel
        </p>
      </div>
    );
  }

  // variant === "panel"
  return (
    <div className={`rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] p-6 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex items-end gap-4">
          <CountDown
            from={total}
            to={remaining}
            className="font-display text-[4.2rem] font-black leading-[0.85] tracking-tight sm:text-[5.4rem]"
          />
          <p className="pb-1 font-body text-[0.9rem] leading-[1.35]" style={{ color: textSoft }}>
            <strong className="block font-display text-[1rem]" style={{ color: textMain }}>
              lugares disponibles
            </strong>
            de {total} de lanzamiento
          </p>
        </div>
        <p className="flex items-center gap-2 font-body text-[0.82rem]" style={{ color: textSoft }}>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ background: accent }}>
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
          <span>
            <strong style={{ color: strong }}>{sold}</strong> {sold === 1 ? "ya tomado" : "ya tomados"}
          </span>
        </p>
      </div>

      <div className="mt-6">{pinRow(22)}</div>

      {/* Barra segmentada por nivel */}
      <div className="mt-7 flex gap-1.5">
        {tiers.map((t) => {
          const taken = soldByTier[t.id] ?? 0;
          const pct = Math.min(100, (taken / t.slots) * 100);
          return (
            <div key={t.id} style={{ flex: t.slots }} className="min-w-0">
              <div className="h-2 overflow-hidden rounded-full bg-black/10">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accent }} />
              </div>
              <p className="mt-2 truncate font-body text-[0.7rem]" style={{ color: textSoft }}>
                <span className="font-semibold" style={{ color: textMain }}>{t.label}</span> · {t.priceLabel.replace(" MXN", "")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
