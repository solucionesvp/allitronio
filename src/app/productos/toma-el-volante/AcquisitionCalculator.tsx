"use client";

// ── Acto 4 · Los números toman el volante ────────────────────────────────────
// Intención: concreción y utilidad. Calculadora local (no envía ni guarda nada).
//   costo máx. por venta  = utilidad bruta × % destinado a adquisición
//   costo máx. por cita   = costo máx. por venta × conversión de cita a venta
// Entradas validadas y acotadas; resultados en un aria-live educado.

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { VOLANTE_CALC, computeAcquisition, formatMXN } from "@/data/tomaElVolanteContent";
import { trackLandingEventOnce } from "@/lib/landingEvents";
import { EYEBROW, GRADIENT, H2, L, reveal, SECTION_X } from "./ui";

const fmt = (n: number) => `$${Math.round(n).toLocaleString("es-MX")}`;

function clamp(v: number, min: number, max: number) {
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

export default function AcquisitionCalculator() {
  const C = VOLANTE_CALC;
  const id = useId();
  const [profit, setProfit] = useState<string>(String(C.defaults.profit));
  const [share, setShare] = useState<number>(C.defaults.share);
  const [conv, setConv] = useState<number>(C.defaults.conversion);

  const profitNum = clamp(Number(profit.replace(/[^\d.]/g, "")), 0, C.limits.profit.max);
  const profitInvalid = profit.trim() === "" || profitNum < C.limits.profit.min;
  const r = computeAcquisition(profitNum, share, conv);

  const touch = (control: string) => trackLandingEventOnce("calculator_interaction", { section: "calculadora", control });

  return (
    <section aria-labelledby="acto4-title" className={`w-full py-24 sm:py-28 ${SECTION_X}`} style={{ background: L.bgAlt }}>
      <div className="mx-auto max-w-[1100px]">
        <span className={EYEBROW} style={{ color: L.accentText }}>
          {C.eyebrow}
        </span>
        <motion.h2 id="acto4-title" {...reveal(0.05)} className={`${H2} max-w-[780px] text-[var(--tm-ink)]`} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
          {C.title}
        </motion.h2>
        <motion.p {...reveal(0.12)} className="mt-5 max-w-[640px] font-body text-[0.94rem] leading-[1.75] text-[var(--tm-muted)]">
          {C.body}
        </motion.p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form {...reveal(0.08)} onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 sm:p-8" aria-label="Calculadora de costo máximo de adquisición">
            <div>
              <label htmlFor={`${id}-profit`} className="font-display text-[0.7rem] font-bold tracking-[0.14em] text-[var(--tm-ink)]">
                UTILIDAD BRUTA POR UNIDAD (MXN)
              </label>
              <input
                id={`${id}-profit`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={profit}
                aria-invalid={profitInvalid}
                aria-describedby={`${id}-profit-help`}
                onChange={(e) => {
                  touch("utilidad");
                  setProfit(e.target.value.replace(/[^\d]/g, "").slice(0, 7));
                }}
                className="mt-2 min-h-[48px] w-full rounded-sm border border-[var(--tm-line)] bg-white px-4 font-display text-[1.3rem] font-black text-[var(--tm-ink)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--tm-accent-text)]"
              />
              <p id={`${id}-profit-help`} className={`mt-2 font-body text-[0.76rem] ${profitInvalid ? "text-[#9B2C1F]" : "text-[var(--tm-muted)]"}`}>
                {profitInvalid ? `Escribe un monto desde ${formatMXN(C.limits.profit.min)}.` : "Lo que deja cada unidad antes de gastos de adquisición."}
              </p>
            </div>

            <Slider
              id={`${id}-share`}
              label="PRESUPUESTO DE ADQUISICIÓN SOBRE UTILIDAD"
              value={share}
              unit="%"
              {...C.limits.share}
              onChange={(v) => {
                touch("porcentaje");
                setShare(v);
              }}
            />
            <Slider
              id={`${id}-conv`}
              label="CONVERSIÓN DE CITA A VENTA"
              value={conv}
              unit="%"
              {...C.limits.conversion}
              onChange={(v) => {
                touch("conversion");
                setConv(v);
              }}
            />
          </motion.form>

          <motion.div {...reveal(0.16)} className="flex flex-col gap-4">
            <div className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6" aria-live="polite" aria-atomic="true">
              <p className="font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">COSTO MÁXIMO POR VENTA</p>
              <p className="mt-3 font-display text-[2.2rem] font-black leading-none text-[var(--tm-ink)]">{profitInvalid ? "—" : fmt(r.maxPerSale)}</p>
              <p className="mt-2 font-body text-[0.76rem] text-[var(--tm-muted)]">{fmt(profitNum)} × {share}%</p>
            </div>
            <div className="rounded-sm p-6 text-white" style={{ background: GRADIENT }} aria-live="polite" aria-atomic="true">
              <p className="font-display text-[0.6rem] font-bold tracking-[0.2em] text-white/85">COSTO MÁXIMO POR CITA</p>
              <p className="mt-3 font-display text-[3rem] font-black leading-none">{profitInvalid ? "—" : fmt(r.maxPerAppointment)}</p>
              <p className="mt-2 font-body text-[0.8rem] text-white/90">{profitInvalid ? "Completa la utilidad para calcular." : `${fmt(r.maxPerSale)} × ${conv}%`}</p>
            </div>
            <p className="font-body text-[0.76rem] leading-[1.65] text-[var(--tm-muted)]">{C.disclaimer}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Slider({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-display text-[0.7rem] font-bold tracking-[0.14em] text-[var(--tm-ink)]">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-[1.3rem] font-black" style={{ color: L.accentText }}>
          {value}
          {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-11 w-full cursor-pointer accent-[#8A5200]"
      />
      <div className="flex justify-between font-body text-[0.7rem] text-[var(--tm-muted)]" aria-hidden="true">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
