"use client";

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { motion, useReducedMotion } from "framer-motion";
import { MessagesSquare, Star, CalendarHeart, BellRing } from "lucide-react";
import { SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/viesaine";

const EMBUDO = [
  { etapa: "Te ven", detalle: "Personas de Tepic que ven sus anuncios y su perfil", ancho: 100, tone: "bg-[#9AA8B1]" },
  { etapa: "Te escriben", detalle: "Conversaciones nuevas por WhatsApp", ancho: 76, tone: "bg-allitron-navy" },
  { etapa: "Agendan", detalle: "Primeras valoraciones agendadas", ancho: 54, tone: "bg-allitron-blue" },
  { etapa: "Continúan", detalle: "Pacientes que terminan su tratamiento y las recomiendan", ancho: 34, tone: "bg-allitron-orange" },
];

function Embudo() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="neu rounded-[28px] p-6 sm:p-10">
      <div className="flex flex-col items-center gap-3">
        {EMBUDO.map((e, i) => (
          <motion.div
            key={e.etapa}
            initial={reduced ? false : { width: "20%", opacity: 0 }}
            whileInView={{ width: `${e.ancho}%`, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={reduced ? { width: `${e.ancho}%` } : undefined}
            className={`min-w-[210px] rounded-[16px] px-5 py-4 text-center text-white ${e.tone}`}
          >
            <p className="font-display text-[1.2rem] font-black">{e.etapa}</p>
            <p className="mt-1 font-body text-[0.92rem] leading-[1.4] text-white/90">{e.detalle}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ObjetivosVieSainePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_VIESAINE} paso={4} titulo=<>Los objetivos.</> escena="meta" mensaje="Esto es lo que vamos a medir, cada semana." />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Lo que medimos">Cuatro pasos, cada semana.</SectionTitle>
        <Embudo />
        <BigText className="mt-8">Así sabemos en qué paso se pierde gente y dónde conviene poner el esfuerzo. Nada de medir “likes”.</BigText>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Las metas de trabajo">A dónde queremos llegar.</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <IconPoint icon={MessagesSquare} title="Ningún mensaje ni comentario sin respuesta" text="Toda persona que escriba o comente recibe respuesta el mismo día hábil, con cómo agendar." />
          <IconPoint icon={CalendarHeart} tone="orange" title="50% más pacientes nuevos en enero" text="Frente a su mes de septiembre. El número de partida lo medimos con ustedes en la primera semana." delay={0.04} />
          <IconPoint icon={BellRing} title="Todas las citas con recordatorio automático" text="Y medimos cuántas citas se pierden hoy por olvido, para ver cuánto bajan." delay={0.08} />
          <IconPoint icon={Star} title="De 4 a 20 opiniones en Google" text="Al cierre de enero, pidiendo la opinión a cada paciente que termina su tratamiento. Para cuidar el primer lugar." delay={0.12} />
        </div>
        <div className="mt-10">
          <Highlight>Son metas de trabajo, no promesas: dependen también de su agenda, su atención y la inversión en anuncios. Lo que sí prometemos es trabajo cada semana y números claros.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} nextHref={`${B}/primeras-semanas`} nextLabel="Siguiente: Las primeras 4 semanas" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
