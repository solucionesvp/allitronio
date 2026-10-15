"use client";

// ── Acto 2 · La venta que se escapa ──────────────────────────────────────────
// Intención: pérdida y tensión, sin exagerar. Tres marcas de tiempo (secuencia
// visual breve), la brecha de curiosidad con su respuesta, y las cuatro fugas
// condensadas. Todo rotulado como escena ficticia ilustrativa.

import { motion } from "framer-motion";
import { Clock3, Gauge, MessageSquareWarning, Repeat, Users } from "lucide-react";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { VOLANTE_LEAKS_SHORT, VOLANTE_SEQUENCE } from "@/data/tomaElVolanteContent";
import { ACCENT, EYEBROW, H2, reveal, SECTION_X } from "./ui";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";
import { SceneStrip } from "./SceneStrip";

const LEAK_ICONS = [Gauge, MessageSquareWarning, Repeat, Users] as const;

export default function ProblemSequence() {
  const S = VOLANTE_SEQUENCE;
  return (
    <section aria-labelledby="acto2-title" className={`relative w-full overflow-hidden bg-allitron-base py-24 sm:py-28 ${SECTION_X}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(242,135,76,0.10) 0%, transparent 62%)" }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <span className={EYEBROW} style={{ color: ACCENT }}>
          {S.eyebrow}
        </span>
        <motion.h2 id="acto2-title" {...reveal(0.05)} className={`${H2} max-w-[760px] text-foreground`} style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)" }}>
          {S.title}
        </motion.h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <ol className="relative flex flex-col gap-9 border-l border-white/15 pl-8">
            {S.steps.map((s, i) => (
              <motion.li key={s.time} {...reveal(0.1 * i)} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.45rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 0 6px rgba(245,163,0,0.15)` }}
                />
                <span className="flex items-center gap-2 font-display text-[0.7rem] font-bold tracking-[0.25em]" style={{ color: ACCENT }}>
                  <Clock3 className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                  {s.time}
                </span>
                <h3 className="mt-2 font-display text-[1.25rem] font-black leading-tight text-foreground">{s.title}</h3>
                <p className="mt-2 max-w-[430px] font-body text-[0.9rem] leading-[1.7] text-foreground/70">{s.body}</p>
              </motion.li>
            ))}
            <motion.li {...reveal(0.35)} className="relative">
              <span aria-hidden="true" className="absolute -left-[2.35rem] top-2 h-2.5 w-2.5 rounded-full border border-white/40" />
              <p className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{S.meanwhile}</p>
            </motion.li>
          </ol>

          <div className="flex flex-col gap-4">
            <motion.figure {...reveal(0.1)} className="m-0 overflow-hidden rounded-sm border border-white/10">
              <ResponsiveCinematicImage
                base={IMG.problemaSin}
                alt="Escena ilustrativa: un gerente de ventas revisa mensajes sin responder al final del día"
                ratio="3 / 2"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </motion.figure>
            <motion.figure {...reveal(0.2)} className="m-0 overflow-hidden rounded-sm border border-white/10">
              <ResponsiveCinematicImage
                base={IMG.prospecto}
                alt="Escena ilustrativa: una persona consulta opciones desde su teléfono en la calle, al anochecer"
                ratio="3 / 2"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </motion.figure>
            <p className="font-body text-[0.72rem] leading-[1.6] text-foreground/55">{S.fiction}</p>
          </div>
        </div>

        <SceneStrip
          className="mt-14"
          ratio="16 / 9"
          scenes={[
            { base: IMG.escenaCruce, alt: "Escena ilustrativa: una persona revisa opciones en su teléfono al anochecer, junto a un auto usado" },
            { base: IMG.escenaInventario, alt: "Escena ilustrativa: dos personas recorren una bodega con inventario sin rotar" },
          ]}
        />

        <motion.div {...reveal(0.1)} className="mt-20 max-w-[820px] border-l-2 pl-6" style={{ borderColor: ACCENT }}>
          <p className="font-display text-[1.35rem] font-bold leading-[1.35] text-foreground sm:text-[1.7rem]">{S.question}</p>
          <p className="mt-4 font-body text-[0.96rem] leading-[1.8] text-foreground/78">{S.answer}</p>
        </motion.div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {VOLANTE_LEAKS_SHORT.map((l, i) => {
            const Icon = LEAK_ICONS[i];
            return (
              <motion.li key={l.title} {...reveal(0.06 * i)} className="bg-allitron-base p-6">
                <Icon className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={2.1} aria-hidden="true" />
                <h3 className="mt-4 font-display text-[0.98rem] font-black text-foreground">{l.title}</h3>
                <p className="mt-2 font-body text-[0.82rem] leading-[1.65] text-foreground/68">{l.body}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
