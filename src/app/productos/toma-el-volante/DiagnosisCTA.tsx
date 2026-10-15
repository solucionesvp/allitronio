"use client";

// ── Cierre · La escena final y el diagnóstico ────────────────────────────────
// Intención: decisión. La concesionaria ordenada y luminosa cierra el arco que
// abrió el hero; el titular nombra qué se revisa y el formulario breve es el
// siguiente paso natural. Compromiso progresivo: solo tres datos y aceptación.

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { VOLANTE_DIAGNOSIS, VOLANTE_WHATSAPP_MESSAGE, buildWhatsAppLink } from "@/data/tomaElVolanteContent";
import { ACCENT, reveal, SECTION_X } from "./ui";
import DiagnosisForm from "./DiagnosisForm";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";

export default function DiagnosisCTA() {
  const D = VOLANTE_DIAGNOSIS;
  return (
    <section id={D.id} aria-labelledby="diag-title" className={`relative w-full scroll-mt-16 overflow-hidden bg-allitron-base py-24 sm:py-28 ${SECTION_X}`}>
      <div aria-hidden="true" className="absolute inset-0">
        <ResponsiveCinematicImage base={IMG.cierre} ratio="auto" className="!aspect-auto h-full w-full" imgClassName="object-[50%_55%]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,24,32,0.9) 0%, rgba(16,24,32,0.7) 50%, rgba(16,24,32,0.92) 100%)" }} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.h2
            id="diag-title"
            {...reveal(0.04)}
            className="font-display font-black leading-[1.0] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.1rem)", textShadow: "0 2px 22px rgba(0,0,0,0.55)" }}
          >
            {D.title}
          </motion.h2>
          <motion.p {...reveal(0.1)} className="mt-6 font-body text-[0.95rem] leading-[1.75] text-foreground/82">
            En el diagnóstico revisamos, con la información que tengas disponible:
          </motion.p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {D.review.map((r, i) => (
              <motion.li key={r} {...reveal(0.05 * i)} className="flex items-center gap-2.5 font-body text-[0.9rem] text-foreground/90">
                <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} strokeWidth={2.6} aria-hidden="true" />
                {r}
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 max-w-[520px] font-body text-[0.84rem] leading-[1.7] text-foreground/68">{D.next}</p>
          <p className="mt-10 font-display text-[1.1rem] font-bold" style={{ color: ACCENT }}>
            {D.tagline}
          </p>
        </div>

        <motion.div {...reveal(0.12)} className="self-start rounded-sm border border-white/12 bg-[#0E1B23]/90 p-6 backdrop-blur-sm sm:p-8">
          <DiagnosisForm buildLink={buildWhatsAppLink} baseMessage={`${VOLANTE_WHATSAPP_MESSAGE}\n\n(Origen: Toma el Volante · cierre)`} section="cierre" tone="dark" />
        </motion.div>
      </div>
    </section>
  );
}
