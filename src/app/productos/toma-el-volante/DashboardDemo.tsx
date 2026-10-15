"use client";

// ── DashboardDemo — demostración del tablero con datos FICTICIOS ─────────────
// Muestra el formato de lectura del tablero de lead a cierre. No es un CRM ni un
// producto implementado: es una maqueta con banner permanente de "datos
// ficticios". Las etapas son un tablist accesible (flechas, Inicio, Fin).

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { VOLANTE_DASHBOARD } from "@/data/tomaElVolanteContent";
import { ACCENT, CONTROL_BLUE, reveal } from "./ui";

export default function DashboardDemo() {
  const D = VOLANTE_DASHBOARD;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const max = D.stages[0].value;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = D.stages.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const stage = D.stages[active];
  const prev = active > 0 ? D.stages[active - 1].value : null;
  const rate = prev ? Math.round((stage.value / prev) * 100) : null;

  return (
    <motion.div {...reveal(0)} className="overflow-hidden rounded-sm border border-white/10 bg-[#0E1B23] shadow-[0_40px_90px_-40px_rgba(9,175,242,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 sm:px-7">
        <h3 className="font-display text-[0.95rem] font-black text-foreground">{D.title}</h3>
        <span className="rounded-sm border px-2.5 py-1 font-display text-[0.55rem] font-bold tracking-[0.18em]" style={{ borderColor: ACCENT, color: ACCENT }}>
          {D.banner}
        </span>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[1.25fr_1fr]">
        <div className="bg-[#0E1B23] p-5 sm:p-7">
          <div role="tablist" aria-label="Etapas del embudo (datos ficticios)" className="flex flex-col gap-3">
            {D.stages.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`dash-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="dash-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group flex min-h-[48px] items-center gap-4 rounded-sm px-2 py-1.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#09AFF2]"
                  style={selected ? { background: "rgba(9,175,242,0.10)" } : undefined}
                >
                  <span className="w-[5.5rem] shrink-0 font-display text-[0.7rem] font-bold tracking-[0.12em] text-foreground/85">{s.label.toUpperCase()}</span>
                  <span className="relative h-7 flex-1 overflow-hidden rounded-[2px] bg-white/5" aria-hidden="true">
                    <span
                      className="absolute inset-y-0 left-0 rounded-[2px] transition-[width] duration-700 ease-out"
                      style={{ width: `${Math.max(6, (s.value / max) * 100)}%`, background: selected ? CONTROL_BLUE : "rgba(9,175,242,0.45)" }}
                    />
                  </span>
                  <span className="w-10 shrink-0 text-right font-display text-[1.05rem] font-black text-foreground">{s.value}</span>
                </button>
              );
            })}
          </div>
          <div id="dash-panel" role="tabpanel" aria-labelledby={`dash-tab-${stage.id}`} className="mt-6 border-t border-white/10 pt-5" aria-live="polite">
            <p className="font-display text-[0.62rem] font-bold tracking-[0.25em]" style={{ color: CONTROL_BLUE }}>
              {stage.label.toUpperCase()}
              {rate !== null && ` · ${rate}% DE LA ETAPA ANTERIOR`}
            </p>
            <p className="mt-2 font-body text-[0.88rem] leading-[1.7] text-foreground/78">{stage.detail}</p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
          {D.kpis.map((k) => (
            <div key={k.label} className="bg-[#0E1B23] p-5 sm:p-6">
              <p className="font-display text-[0.58rem] font-bold tracking-[0.2em] text-foreground/55">{k.label.toUpperCase()}</p>
              <p className="mt-2 font-display text-[1.8rem] font-black leading-none" style={{ color: k.ok ? CONTROL_BLUE : ACCENT }}>
                {k.value}
              </p>
              <p className="mt-2 font-body text-[0.76rem] text-foreground/60">{k.hint}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-3.5 font-body text-[0.72rem] leading-[1.6] text-foreground/55 sm:px-7">{D.note}</p>
    </motion.div>
  );
}
