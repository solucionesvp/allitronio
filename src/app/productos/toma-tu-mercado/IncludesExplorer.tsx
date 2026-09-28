"use client";

/**
 * Explorador "qué incluye / qué no" de Toma tu Mercado.
 * Un paquete a la vez, por categorías, con explicación en cada renglón.
 * Datos: TTM_INCLUDES y TTM_EXCLUDES en tomaTuMercadoContent.ts.
 */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, Check, LineChart, Minus, Radar, Target, X } from "lucide-react";
import { TTM_EXCLUDES, TTM_INCLUDES, TTM_PACKAGES } from "@/data/tomaTuMercadoContent";

const ICONS = { radar: Radar, target: Target, chart: LineChart, camera: Camera } as const;
const NO_INCLUYE = "no-incluye";

export default function IncludesExplorer({ onChoose }: { onChoose: (label: string) => void }) {
  const reduce = useReducedMotion();
  const [pkg, setPkg] = useState(1); // Profesional por defecto
  const [tab, setTab] = useState<string>(TTM_INCLUDES[0].id);

  const pkgLabel = TTM_PACKAGES[pkg].label;
  const group = TTM_INCLUDES.find((g) => g.id === tab);
  const isExcludes = tab === NO_INCLUYE;

  const countFor = (items: readonly { values: readonly [string, string, string] }[]) =>
    items.filter((i) => i.values[pkg] !== "—").length;

  return (
    <div className="mt-16">
      <span className="mb-4 block text-center font-display text-[0.55rem] font-bold tracking-[0.3em] text-[var(--tm-muted)]">
        QUÉ INCLUYE Y QUÉ NO
      </span>
      <h3 className="mx-auto max-w-[620px] text-center font-display text-[1.5rem] font-black leading-[1.1] tracking-tight text-[var(--tm-ink)] sm:text-[1.9rem]">
        Elige un paquete y revisa qué recibes, sección por sección.
      </h3>

      {/* 1. Selector de paquete */}
      <div role="tablist" aria-label="Paquete" className="mx-auto mt-8 grid max-w-[560px] grid-cols-3 gap-1 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-1">
        {TTM_PACKAGES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={pkg === i}
            onClick={() => setPkg(i)}
            className={`rounded-sm px-2 py-3 font-display text-[0.6rem] font-bold tracking-[0.16em] transition-colors sm:text-[0.66rem] ${
              pkg === i ? "bg-[var(--tm-ink)] text-white" : "text-[var(--tm-muted)] hover:text-[var(--tm-ink)]"
            }`}
          >
            {p.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[250px_1fr] md:gap-8">
        {/* 2. Navegación por categorías */}
        <nav aria-label="Secciones" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0">
          {TTM_INCLUDES.map((g) => {
            const Icon = ICONS[g.icon];
            const active = tab === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setTab(g.id)}
                aria-current={active}
                className={`flex shrink-0 items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${
                  active ? "border-[var(--tm-accent-text)] bg-[var(--tm-card)]" : "border-[var(--tm-line)] bg-transparent hover:bg-[var(--tm-card)]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color: active ? "var(--tm-accent-text)" : "var(--tm-muted)" }} strokeWidth={2} />
                <span className="flex-1 font-display text-[0.66rem] font-bold tracking-[0.08em] text-[var(--tm-ink)]">{g.label}</span>
                <span className="font-body text-[0.68rem] text-[var(--tm-muted)]">
                  {countFor(g.items)}/{g.items.length}
                </span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setTab(NO_INCLUYE)}
            aria-current={isExcludes}
            className={`flex shrink-0 items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${
              isExcludes ? "border-[var(--tm-ink)] bg-[var(--tm-card)]" : "border-dashed border-[var(--tm-line)] hover:bg-[var(--tm-card)]"
            }`}
          >
            <X className="h-4 w-4 shrink-0 text-[var(--tm-muted)]" strokeWidth={2} />
            <span className="flex-1 font-display text-[0.66rem] font-bold tracking-[0.08em] text-[var(--tm-ink)]">Lo que no incluye</span>
            <span className="font-body text-[0.68rem] text-[var(--tm-muted)]">{TTM_EXCLUDES.length}</span>
          </button>
        </nav>

        {/* 3. Contenido */}
        <div className="min-h-[360px] rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${isExcludes ? "x" : pkg}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isExcludes ? (
                <>
                  <p className="font-body text-[0.86rem] leading-[1.7] text-[var(--tm-muted)]">
                    Lo decimos desde ahora para que no haya sorpresas. Esto aplica a los tres paquetes.
                  </p>
                  <ul className="mt-5 divide-y divide-[var(--tm-line)]">
                    {TTM_EXCLUDES.map((e) => (
                      <li key={e.title} className="flex items-start gap-3 py-4">
                        <X className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--tm-muted)]" strokeWidth={2.5} />
                        <div>
                          <p className="font-display text-[0.8rem] font-bold text-[var(--tm-ink)]">{e.title}</p>
                          <p className="mt-1 font-body text-[0.8rem] leading-[1.65] text-[var(--tm-muted)]">
                            <span className="font-semibold text-[var(--tm-ink)]/80">En su lugar: </span>
                            {e.instead}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                group && (
                  <>
                    <p className="font-body text-[0.86rem] leading-[1.7] text-[var(--tm-muted)]">{group.intro}</p>
                    <ul className="mt-5 divide-y divide-[var(--tm-line)]">
                      {group.items.map((it) => {
                        const v = it.values[pkg];
                        const off = v === "—";
                        const upgrade = off ? TTM_PACKAGES.find((_, i) => it.values[i] !== "—") : null;
                        return (
                          <li key={it.item} className="flex items-start gap-3 py-4">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                              style={{ background: off ? "rgba(80,90,84,0.12)" : "rgba(31,191,143,0.16)" }}
                            >
                              {off ? (
                                <Minus className="h-3 w-3 text-[var(--tm-muted)]" strokeWidth={2.5} />
                              ) : (
                                <Check className="h-3 w-3" style={{ color: "var(--tm-accent-text)" }} strokeWidth={3} />
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <p className={`font-display text-[0.8rem] font-bold ${off ? "text-[var(--tm-muted)]" : "text-[var(--tm-ink)]"}`}>{it.item}</p>
                                {!off && v !== "✓" && (
                                  <span className="rounded-sm px-2 py-0.5 font-display text-[0.6rem] font-bold tracking-[0.06em]" style={{ background: "rgba(31,191,143,0.14)", color: "var(--tm-accent-text)" }}>
                                    {v}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 font-body text-[0.8rem] leading-[1.65] text-[var(--tm-muted)]">{it.note}</p>
                              {off && upgrade && (
                                <p className="mt-1.5 font-body text-[0.74rem] font-semibold text-[var(--tm-muted)]">No incluido en {pkgLabel}. Disponible desde {upgrade.label}.</p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] px-5 py-4 sm:flex-row">
        <p className="font-body text-[0.82rem] text-[var(--tm-ink)]/85">
          ¿No sabes cuál te toca? El diagnóstico es gratis y te lo decimos.
        </p>
        <button
          type="button"
          onClick={() => onChoose(pkgLabel)}
          className="shrink-0 rounded-sm border border-[var(--tm-ink)] px-5 py-2.5 font-display text-[0.6rem] font-bold tracking-[0.18em] text-[var(--tm-ink)] transition-colors hover:bg-[var(--tm-ink)] hover:text-white"
        >
          ME INTERESA {pkgLabel.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
