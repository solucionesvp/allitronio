"use client";

// ── Acto 3 · Del mensaje al cierre ───────────────────────────────────────────
// Intención: descubrimiento y concreción. Siete pasos que se entienden sin
// animación: lista vertical en móvil, rejilla con conector en escritorio. El
// color pasa del ámbar (caos) al azul Allitron (control). Incluye la demo del
// tablero (DashboardDemo) con datos ficticios rotulados.

import { motion } from "framer-motion";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { VOLANTE_JOURNEY } from "@/data/tomaElVolanteContent";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";
import DashboardDemo from "./DashboardDemo";
import { SceneStrip } from "./SceneStrip";
import { CONTROL_BLUE, EYEBROW, H2, L, reveal, SECTION_X, ViewTracker } from "./ui";

export default function LeadJourney() {
  const J = VOLANTE_JOURNEY;
  return (
    <section
      id={J.id}
      aria-labelledby="acto3-title"
      className={`relative w-full scroll-mt-20 py-24 sm:py-28 ${SECTION_X}`}
      style={{ background: `linear-gradient(180deg, #101820 0%, #1B2A33 10%, ${L.bg} 34%, ${L.bg} 100%)` }}
    >
      <div className="mx-auto max-w-[1200px]">
        <span className={EYEBROW} style={{ color: CONTROL_BLUE }}>
          {J.eyebrow}
        </span>
        <motion.h2 id="acto3-title" {...reveal(0.05)} className={`${H2} max-w-[820px] text-foreground`} style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)" }}>
          {J.title}
        </motion.h2>
        <motion.p {...reveal(0.12)} className="mt-5 max-w-[620px] font-body text-[0.96rem] leading-[1.75] text-foreground/75">
          {J.body}
        </motion.p>

        <ol className="relative mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-7 lg:gap-4">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[1.15rem] hidden h-px lg:block"
            style={{ background: `linear-gradient(90deg, transparent, ${CONTROL_BLUE}, transparent)`, opacity: 0.55 }}
          />
          {J.steps.map((s, i) => (
            <motion.li key={s.n} {...reveal(0.07 * i)} className="relative flex gap-4 lg:flex-col lg:gap-5">
              <span
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-[0.8rem] font-black"
                style={{ background: "#101820", borderColor: CONTROL_BLUE, color: CONTROL_BLUE }}
              >
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-[0.98rem] font-black leading-tight text-[var(--tm-ink)] lg:text-[0.9rem]">{s.title}</h3>
                <p className="mt-2 font-body text-[0.84rem] leading-[1.6] text-[var(--tm-muted)] lg:text-[0.78rem]">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.figure {...reveal(0.05)} className="m-0 mt-24 overflow-hidden rounded-sm border border-[var(--tm-line)]">
          <ResponsiveCinematicImage
            base={IMG.control}
            alt="Escena ilustrativa: una gerente comercial y Alli revisan un tablero de seguimiento en la oficina de una agencia"
            ratio="16 / 9"
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
        </motion.figure>

        <SceneStrip
          className="mt-4"
          ratio="16 / 9"
          tone="light"
          scenes={[
            { base: IMG.escenaTableroA, alt: "Escena ilustrativa: Alli y una asesora frente a un tablero con gráficas en una agencia" },
            { base: IMG.escenaTableroB, alt: "Escena ilustrativa: una gerente y Alli revisan indicadores en una pantalla" },
            { base: IMG.escenaTableroC, alt: "Escena ilustrativa: una gerente y Alli analizan un tablero de resultados" },
          ]}
        />

        <ViewTracker event="system_demo_view" section="tablero" className="mt-10">
          <DashboardDemo />
        </ViewTracker>
      </div>
    </section>
  );
}
