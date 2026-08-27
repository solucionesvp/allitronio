"use client";

import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, ICONS_CONTENIDO } from "@/config/assets";
import AlliGuide from "@/components/brand/AlliGuide";
import { EASE, SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

export default function HubFundadoresPage() {
  return (
    <main className="relative bg-[var(--color-light)]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[56svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 85% 15%, rgba(9,175,242,0.12) 0%, transparent 60%)",
          }}
        />
        <AlliGuide side="right" size={96} className="top-24" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8"
          >
            <OptionalImage
              src={BRAND_LOGO.dark}
              alt="Allitron"
              style={{ height: 22, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-[#101820]">ALLITRON</span>}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            PRIMERA REUNIÓN INTERNA · 26 DE AGOSTO 2026
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
            className="mt-2 font-body text-[0.7rem] font-medium tracking-[0.1em] text-secondary/70"
          >
            Uso interno · confidencial — solo Alejandro, Miguel y Lups
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.02] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)" }}
          >
            Todo lo de la reunión, ordenado por importancia.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
            className="mt-6 max-w-[620px] font-body text-[0.95rem] leading-[1.85] text-secondary"
          >
            Cada tarjeta abre su propio documento completo. Empieza por el
            resumen ejecutivo y los riesgos — son lo más urgente de resolver
            antes de avanzar con constitución, evento o inversión.
          </motion.p>
        </div>
      </section>

      {/* ── Bento grid — orden = importancia ────────────────────────── */}
      <SectionShell>
        <div className="grid auto-rows-[minmax(176px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title="Resumen ejecutivo y decisiones"
            subtitle="Qué se acordó, qué quedó en principio y qué es solo propuesta — con la ficha verificable completa."
            size="protagonist"
            kind="documento"
            href="/entregas/fundadores-agosto26/resumen-ejecutivo"
          />
          <BentoTile
            icon={ICONS_CONTENIDO.pdf}
            title="Riesgos y contradicciones"
            subtitle="Los 10 puntos que no deben darse por resueltos — con área afectada y mitigación recomendada."
            kind="documento"
            href="/entregas/fundadores-agosto26/riesgos-y-contradicciones"
            delay={0.05}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.pdf}
            title="Capital, equity y estructura legal"
            subtitle="SAPI vs. SAS vs. extranjera, y todo lo que falta definir antes de repartir propiedad."
            kind="documento"
            href="/entregas/fundadores-agosto26/capital-y-estructura"
            delay={0.1}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.presentacion}
            title="Modelo comercial y evento piloto"
            subtitle="Productos, ventas septiembre–octubre, y el evento tentativo del 26 de noviembre."
            kind="documento"
            href="/entregas/fundadores-agosto26/modelo-y-evento"
            delay={0.15}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title="Acciones, responsables y plazos"
            subtitle="Las 12 tareas que salieron de la conversación, con evidencia requerida para cada una."
            kind="documento"
            href="/entregas/fundadores-agosto26/acciones-y-plazos"
            delay={0.2}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.link}
            title="Preguntas que la minuta debe resolver"
            subtitle="Las 10 preguntas abiertas que definen si el proyecto avanza, se pausa o se reestructura."
            kind="documento"
            href="/entregas/fundadores-agosto26/preguntas-pendientes"
            delay={0.25}
          />
        </div>
      </SectionShell>

      <footer className="border-t border-[#101820]/10 px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[560px] font-body text-[0.78rem] leading-[1.7] text-secondary">
          Generado a partir del registro y análisis de la primera reunión
          interna del 26 de agosto de 2026. Uso interno — no reenviar fuera
          del equipo fundador sin revisión de Allitron.
        </p>
      </footer>
    </main>
  );
}
