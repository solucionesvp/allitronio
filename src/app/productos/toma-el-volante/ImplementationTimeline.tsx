"use client";

// ── Acto 5 · 90 días para instalar el sistema ────────────────────────────────
// Intención: confianza por claridad de proceso. Cinco fases en línea de tiempo
// (rejilla en escritorio, columna con hilo vertical en móvil), seguidas de los
// entregables comprimidos y un apartado secundario con los detalles del plan
// (<details> nativos: accesibles por teclado y lector de pantalla).

import { motion } from "framer-motion";
import { Check, ChevronDown, ClipboardList, FileText, Funnel, GraduationCap, LineChart, Megaphone, Repeat, Target } from "lucide-react";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import {
  VOLANTE_ADSPEND,
  VOLANTE_DELIVERABLES,
  VOLANTE_DETAILS_TITLE,
  VOLANTE_FAQ,
  VOLANTE_GROUPS,
  VOLANTE_GUARANTEE,
  VOLANTE_METHOD,
  VOLANTE_NOT_FOR,
  VOLANTE_REQUIREMENTS,
  VOLANTE_TIMELINE,
  VOLANTE_TRAINING,
} from "@/data/tomaElVolanteContent";
import { EYEBROW, H2, L, reveal, SECTION_X } from "./ui";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";
import { SceneStrip } from "./SceneStrip";

const PHASE_IMAGES = [IMG.fase1, IMG.fase2, IMG.fase3, IMG.fase4, IMG.fase5] as const;
const DELIVERABLE_ICONS = [FileText, Target, Funnel, Megaphone, ClipboardList, LineChart, Repeat, GraduationCap] as const;

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-[var(--tm-line)] last:border-b-0">
      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[0.98rem] font-black text-[var(--tm-ink)] outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-[var(--tm-accent-text)] [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180" strokeWidth={2.4} aria-hidden="true" />
      </summary>
      <div className="pb-6 pr-2 font-body text-[0.88rem] leading-[1.75] text-[var(--tm-muted)]">{children}</div>
    </details>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5">
          <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} aria-hidden="true" />
          <span className="text-[var(--tm-ink)]/88">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ImplementationTimeline() {
  const T = VOLANTE_TIMELINE;
  return (
    <section id="proceso" aria-labelledby="acto5-title" className={`w-full scroll-mt-20 bg-[var(--tm-bg)] py-24 sm:py-28 ${SECTION_X}`}>
      <div className="mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-sm bg-allitron-base px-6 py-14 sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0">
            <ResponsiveCinematicImage base={IMG.detalleFaro} ratio="auto" className="!aspect-auto h-full w-full" imgClassName="object-[50%_40%]" sizes="(min-width: 1200px) 1200px, 100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.94) 0%, rgba(16,24,32,0.78) 50%, rgba(16,24,32,0.35) 100%)" }} />
          </div>
          <div className="relative">
            <span className={EYEBROW} style={{ color: "#F5A300" }}>
              {T.eyebrow}
            </span>
            <motion.h2 id="acto5-title" {...reveal(0.05)} className={`${H2} max-w-[760px] text-foreground`} style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
              {T.title}
            </motion.h2>
            <motion.p {...reveal(0.12)} className="mt-5 max-w-[620px] font-body text-[0.94rem] leading-[1.75] text-foreground/82">
              {T.body}
            </motion.p>
          </div>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {VOLANTE_METHOD.map((step, i) => (
            <motion.li key={step.n} {...reveal(0.07 * i)} className="relative flex flex-col">
              <div className="overflow-hidden rounded-sm border border-[var(--tm-line)]">
                <ResponsiveCinematicImage
                  base={PHASE_IMAGES[i]}
                  alt={`Fase ${step.n}: ${step.label}`}
                  ratio="4 / 3"
                  sizes="(min-width: 1024px) 220px, (min-width: 768px) 45vw, 100vw"
                />
              </div>
              <span className="mt-5 font-display text-[0.58rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                FASE {step.n}
              </span>
              <h3 className="mt-2 font-display text-[1.15rem] font-black leading-tight text-[var(--tm-ink)]">{step.label}</h3>
              <p className="mt-2 font-body text-[0.82rem] leading-[1.65] text-[var(--tm-muted)]">{step.body}</p>
            </motion.li>
          ))}
        </ol>

        <SceneStrip
          className="mt-14"
          ratio="3 / 2"
          tone="light"
          scenes={[
            { base: IMG.escenaShowroom, alt: "Escena ilustrativa: salón de exhibición de una agencia por la noche" },
            { base: IMG.escenaFaroB, alt: "Escena ilustrativa: detalle de un faro de auto con lluvia" },
            { base: IMG.escenaVolanteClasico, alt: "Escena ilustrativa: interior de un auto visto desde el asiento del conductor" },
          ]}
        />

        <div className="mt-24">
          <motion.h3 {...reveal(0.05)} className={`${H2} text-[var(--tm-ink)]`} style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)" }}>
            {T.deliverablesTitle}
          </motion.h3>
          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {VOLANTE_DELIVERABLES.map((d, i) => {
              const Icon = DELIVERABLE_ICONS[i];
              return (
                <motion.li key={d.title} {...reveal(0.04 * i)} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(245,163,0,0.14)" }}>
                    <Icon className="h-4 w-4" style={{ color: L.accentText }} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-display text-[0.98rem] font-black text-[var(--tm-ink)]">{d.title}</h4>
                    <p className="mt-1 font-body text-[0.84rem] leading-[1.6] text-[var(--tm-muted)]">{d.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-24">
          <h3 className={`${H2} text-[var(--tm-ink)]`} style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)" }}>
            {VOLANTE_DETAILS_TITLE}
          </h3>
          <div className="mt-8 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] px-6 sm:px-8">
            <Detail title="Capacitación a asesores">
              <p>{VOLANTE_TRAINING.body}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {VOLANTE_TRAINING.sessions.map((s) => (
                  <li key={`${s.kind}-${s.when}`}>
                    <strong className="text-[var(--tm-ink)]">
                      {s.kind} · {s.when}.
                    </strong>{" "}
                    {s.body}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Bullets items={VOLANTE_TRAINING.rules} />
              </div>
              <p className="mt-4">{VOLANTE_TRAINING.library}</p>
            </Detail>
            <Detail title="Niveles de pauta: Arranque, Crucero y Carretera">
              <p>{VOLANTE_ADSPEND.body}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {VOLANTE_ADSPEND.levels.map((lv) => (
                  <li key={lv.name}>
                    <strong className="text-[var(--tm-ink)]">
                      {lv.name} · {lv.range}.
                    </strong>{" "}
                    {lv.rule}
                  </li>
                ))}
              </ul>
              <p className="mt-4">{VOLANTE_ADSPEND.drop}</p>
              <p className="mt-2">{VOLANTE_ADSPEND.disclaimer}</p>
            </Detail>
            <Detail title="Grupos, módulos y exclusividad">
              <p>{VOLANTE_GROUPS.body}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {VOLANTE_GROUPS.modules.map((m) => (
                  <li key={m.label} className="flex justify-between gap-4 border-b border-[var(--tm-line)] pb-2">
                    <span>{m.label}</span>
                    <strong className="shrink-0 text-[var(--tm-ink)]">{m.price}</strong>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.8rem]">{VOLANTE_GROUPS.moduleNote}</p>
              <div className="mt-4">
                <Bullets items={VOLANTE_GROUPS.exclusivity} />
              </div>
            </Detail>
            <Detail title="¿Es para tu agencia?">
              <p className="mb-3 font-semibold text-[var(--tm-ink)]">Lo que necesitas tener:</p>
              <Bullets items={VOLANTE_REQUIREMENTS} />
              <p className="mb-3 mt-5 font-semibold text-[var(--tm-ink)]">No es para ti si:</p>
              <ul className="flex flex-col gap-2">
                {VOLANTE_NOT_FOR.map((t) => (
                  <li key={t}>— {t}</li>
                ))}
              </ul>
            </Detail>
            <Detail title="Lo que prometemos y lo que no">
              <p>
                <strong className="text-[var(--tm-ink)]">Garantizamos:</strong> {VOLANTE_GUARANTEE.yes}
              </p>
              <p className="mt-3">
                <strong className="text-[var(--tm-ink)]">No garantizamos:</strong> {VOLANTE_GUARANTEE.no}
              </p>
            </Detail>
            <Detail title="Preguntas frecuentes">
              <dl className="flex flex-col gap-5">
                {VOLANTE_FAQ.map((f) => (
                  <div key={f.q}>
                    <dt className="font-display text-[0.92rem] font-bold text-[var(--tm-ink)]">{f.q}</dt>
                    <dd className="mt-1">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Detail>
          </div>
        </div>
      </div>
    </section>
  );
}
