"use client";

// ── Acto 6 · La decisión ─────────────────────────────────────────────────────
// Intención: reducir incertidumbre. Precio beta junto a la pauta mínima y la
// inversión orientativa total, qué incluye / qué no, condiciones, pago,
// requisitos y qué pasa después de los 90 días. Sin contadores ni urgencia
// inventada: no se muestra cuántos lugares beta quedan (dato sin verificar).

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  VOLANTE_ADSPEND_FLOOR,
  VOLANTE_CTA_LABEL,
  VOLANTE_CYCLE,
  VOLANTE_DECISION,
  VOLANTE_INVERSION_ORIENTATIVA,
  VOLANTE_PACKAGE,
  VOLANTE_PAUTA_CICLO,
  VOLANTE_PRICE,
  formatMXN,
} from "@/data/tomaElVolanteContent";
import { trackLandingEvent } from "@/lib/landingEvents";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { CtaButton, EYEBROW, GRADIENT, H2, L, reveal, SECTION_X, ViewTracker } from "./ui";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";
import { SceneStrip } from "./SceneStrip";

export default function PricingSection({ onCta }: { onCta: () => void }) {
  const D = VOLANTE_DECISION;
  return (
    <section id="paquete" aria-labelledby="acto6-title" className={`w-full scroll-mt-20 py-24 sm:py-28 ${SECTION_X}`} style={{ background: L.bgAlt }}>
      <div className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-sm bg-allitron-base px-6 py-14 sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0">
            <ResponsiveCinematicImage base={IMG.detalleVolante} ratio="auto" className="!aspect-auto h-full w-full" imgClassName="object-[50%_55%]" sizes="(min-width: 1100px) 1100px, 100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.94) 0%, rgba(16,24,32,0.78) 52%, rgba(16,24,32,0.4) 100%)" }} />
          </div>
          <div className="relative">
            <span className={EYEBROW} style={{ color: "#F5A300" }}>
              {D.eyebrow}
            </span>
            <motion.h2 id="acto6-title" {...reveal(0.05)} className={`${H2} max-w-[760px] text-foreground`} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
              {D.title}
            </motion.h2>
          </div>
        </div>

        <ViewTracker event="pricing_view" section="precio" className="mt-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...reveal(0.05)} className="rounded-sm border border-transparent bg-[var(--tm-card)] p-7 shadow-[0_30px_80px_rgba(138,82,0,0.16)] sm:p-9" style={{ outline: "2px solid #F5A300", outlineOffset: "-2px" }}>
              <p className="font-display text-[0.62rem] font-bold tracking-[0.22em] text-[var(--tm-muted)]">{VOLANTE_PACKAGE.name.toUpperCase()} · PRECIO BETA</p>
              <p className="mt-4 font-display font-black leading-none tracking-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)", color: L.accentText }}>
                {formatMXN(VOLANTE_PRICE.beta).replace(" MXN", "")}
                <span className="ml-2 text-[0.9rem] font-bold text-[var(--tm-muted)]">MXN</span>
              </p>
              <p className="mt-2 font-body text-[0.82rem] text-[var(--tm-muted)]">
                por {VOLANTE_CYCLE}, sin IVA y sin pauta. Precio regular: {formatMXN(VOLANTE_PRICE.regular)}.
              </p>

              <dl className="mt-7 grid gap-px overflow-hidden rounded-sm border border-[var(--tm-line)] bg-[var(--tm-line)] sm:grid-cols-3">
                <div className="bg-white p-4">
                  <dt className="font-display text-[0.55rem] font-bold tracking-[0.16em] text-[var(--tm-muted)]">SERVICIO</dt>
                  <dd className="mt-1.5 font-display text-[1.1rem] font-black text-[var(--tm-ink)]">{formatMXN(VOLANTE_PRICE.beta).replace(" MXN", "")}</dd>
                </div>
                <div className="bg-white p-4">
                  <dt className="font-display text-[0.55rem] font-bold tracking-[0.16em] text-[var(--tm-muted)]">PAUTA MÍNIMA DEL CICLO</dt>
                  <dd className="mt-1.5 font-display text-[1.1rem] font-black text-[var(--tm-ink)]">{formatMXN(VOLANTE_PAUTA_CICLO).replace(" MXN", "")}</dd>
                  <dd className="mt-0.5 font-body text-[0.68rem] text-[var(--tm-muted)]">3 × {formatMXN(VOLANTE_ADSPEND_FLOOR).replace(" MXN", "")}, en tu cuenta</dd>
                </div>
                <div className="bg-[var(--tm-ink)] p-4 text-white">
                  <dt className="font-display text-[0.55rem] font-bold tracking-[0.16em] text-white/70">INVERSIÓN MÍNIMA ORIENTATIVA</dt>
                  <dd className="mt-1.5 font-display text-[1.25rem] font-black">{formatMXN(VOLANTE_INVERSION_ORIENTATIVA).replace(" MXN", "")}</dd>
                </div>
              </dl>
              <p className="mt-3 font-body text-[0.74rem] leading-[1.6] text-[var(--tm-muted)]">{D.orientative}</p>

              <p className="mt-6 font-body text-[0.84rem] leading-[1.7] text-[var(--tm-ink)]/88">{VOLANTE_PACKAGE.payment}</p>

              <div className="mt-7">
                <CtaButton
                  label={VOLANTE_CTA_LABEL}
                  onClick={() => {
                    trackLandingEvent("diagnosis_cta_click", { section: "precio" });
                    onCta();
                  }}
                />
              </div>
            </motion.div>

            <motion.div {...reveal(0.12)} className="flex flex-col gap-6">
              <div className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 sm:p-7">
                <h3 className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-[var(--tm-accent-text)]">QUÉ INCLUYE</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {D.includes.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} aria-hidden="true" />
                      <span className="font-body text-[0.84rem] leading-[1.55] text-[var(--tm-ink)]/90">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-sm border border-dashed border-[var(--tm-line)] p-6 sm:p-7">
                <h3 className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">QUÉ NO INCLUYE</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {D.excludes.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <X className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--tm-muted)]/70" strokeWidth={2.5} aria-hidden="true" />
                      <span className="font-body text-[0.84rem] leading-[1.55] text-[var(--tm-muted)]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </ViewTracker>

        <SceneStrip
          className="mt-10"
          ratio="3 / 2"
          tone="light"
          scenes={[
            { base: IMG.escenaAgenciaA, alt: "Escena ilustrativa: Alli frente a una agencia automotriz al anochecer" },
            { base: IMG.escenaAgenciaB, alt: "Escena ilustrativa: Alli junto a la fila de autos de una agencia" },
            { base: IMG.escenaAgenciaC, alt: "Escena ilustrativa: Alli en el estacionamiento de una agencia con piso mojado" },
          ]}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { title: "Condiciones principales", items: D.conditions },
            { title: "Requisitos de operación", items: D.operation },
          ].map((b, i) => (
            <motion.div key={b.title} {...reveal(0.05 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6">
              <h3 className="font-display text-[0.95rem] font-black text-[var(--tm-ink)]">{b.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {b.items.map((t) => (
                  <li key={t} className="font-body text-[0.82rem] leading-[1.6] text-[var(--tm-muted)]">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div {...reveal(0.1)} className="rounded-sm p-6 text-white" style={{ background: GRADIENT }}>
            <h3 className="font-display text-[0.95rem] font-black">Después de los 90 días</h3>
            <p className="mt-3 font-body text-[0.84rem] leading-[1.65] text-white/92">{D.after}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
