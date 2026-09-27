"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessagesSquare, Star, CalendarHeart, Search } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { SectionShell } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";
import { DocHero, BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/nutrimontse";

const EMBUDO = [
  { etapa: "Te ven", detalle: "Personas de Tepic que ven tus anuncios y tu perfil", ancho: 100, tone: "bg-[#9AA8B1]" },
  { etapa: "Te escriben", detalle: "Conversaciones nuevas por WhatsApp", ancho: 76, tone: "bg-allitron-navy" },
  { etapa: "Agendan", detalle: "Primeras consultas agendadas", ancho: 54, tone: "bg-allitron-blue" },
  { etapa: "Continúan", detalle: "Pacientes que siguen en su programa y te recomiendan", ancho: 34, tone: "bg-allitron-orange" },
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

export default function ObjetivosNutriMontsePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <Breadcrumbs hubHref={B} hubLabel="Inicio" current="Los objetivos" />
      <DocHero
        eyebrow="PARTE 4 DE 6"
        title={<>Los objetivos.</>}
        subtitle="Qué vamos a medir, cada semana, y a dónde queremos llegar."
        logo={<OptionalImage src={BRAND_LOGO.light} alt="Allitron" style={{ height: 26, width: "auto" }} fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>} />}
      />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Lo que medimos">Cuatro pasos, cada semana.</SectionTitle>
        <Embudo />
        <BigText className="mt-8">Así sabemos en qué paso se pierde gente y dónde conviene poner el esfuerzo. Nada de medir “likes”.</BigText>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Las metas de trabajo">A dónde queremos llegar.</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <IconPoint icon={MessagesSquare} title="Ningún mensaje sin respuesta" text="Toda persona que escriba recibe respuesta el mismo día hábil, con precio y cómo agendar." />
          <IconPoint icon={CalendarHeart} tone="orange" title="El doble de citas nuevas en enero" text="Frente a tu mes de septiembre. Tu número de partida lo medimos contigo en la primera semana." delay={0.04} />
          <IconPoint icon={Star} title="Tu ficha de Google con opiniones reales" text="De 0 a 15 opiniones de pacientes al cierre de enero, pidiéndolas en cada consulta." delay={0.08} />
          <IconPoint icon={Search} title="Ser “la nutrióloga funcional de Tepic”" text="Que al buscar nutrición funcional u hormonal en Tepic, tu nombre aparezca y se reconozca." delay={0.12} />
        </div>
        <div className="mt-10">
          <Highlight>Son metas de trabajo, no promesas: dependen también de tu agenda, tu atención y la inversión en anuncios. Lo que sí prometemos es trabajo cada semana y números claros.</Highlight>
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
