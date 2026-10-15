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
import JourneyScroll from "./JourneyScroll";
import { CONTROL_BLUE, EYEBROW, H2, reveal, SECTION_X, ViewTracker } from "./ui";

export default function LeadJourney() {
  const J = VOLANTE_JOURNEY;
  return (
    <section
      id={J.id}
      aria-labelledby="acto3-title"
      className={`relative w-full scroll-mt-20 bg-allitron-base py-24 sm:py-28 ${SECTION_X}`}
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

        <JourneyScroll />

        <motion.figure {...reveal(0.05)} className="m-0 mt-24 overflow-hidden rounded-sm border border-white/10">
          <ResponsiveCinematicImage
            base={IMG.control}
            alt="Escena ilustrativa: una gerente comercial y Alli revisan un tablero de seguimiento en la oficina de una agencia"
            ratio="16 / 9"
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
        </motion.figure>

        <ViewTracker event="system_demo_view" section="tablero" className="mt-10">
          <DashboardDemo />
        </ViewTracker>
      </div>
    </section>
  );
}
