"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, SummaryBlock, PullQuote, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

export default function SistemaPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/nayarit-innovador" hubLabel="Hub" current="Nuestro sistema" />
      <section className="relative flex min-h-[46svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 15% 15%, rgba(9,175,242,0.10) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8"
          >
            <OptionalImage
              src={BRAND_LOGO.light}
              alt="Allitron"
              style={{ height: 22, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            La herramienta detrás
            <br />
            del acompañamiento de 90 días.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Lo que hace que esto no sea solo una promesa de evento: Allitron
            ejecuta con un sistema propio.
          </motion.p>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">SISTEMA PROPIO DE ALLITRON</Eyebrow>
        <SummaryBlock
          lead="Allitron cuenta con un sistema propio basado en agentes de IA que ejecuta el proceso completo de acompañamiento: diagnóstico de la empresa, generación del roadmap personalizado, producción de manuales/documentación, y seguimiento durante los 90 días del programa."
          highlight="Nos gustaría mostrárselo directamente a Jahasiel y David antes del evento — es la evidencia de que Allitron puede ejecutar, no solo hablar de ello."
          pointsHeading="Qué automatiza"
          points={[
            { label: "Diagnóstico", text: "Levanta el problema real de la empresa antes de proponer una solución." },
            { label: "Roadmap", text: "Genera el plan personalizado de 90 días a partir del diagnóstico." },
            { label: "Manuales y documentación", text: "Produce el material de soporte para que la implementación quede documentada." },
            { label: "Seguimiento", text: "Da continuidad al acompañamiento durante todo el programa." },
          ]}
        />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Cpu}>
          Queremos agendar una sesión con ustedes para hacer una demostración
          en vivo antes del evento.
        </PullQuote>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/nayarit-innovador"
          backLabel="Volver al hub"
          nextHref="/entregas/nayarit-innovador/colaboracion"
          nextLabel="Siguiente: propuesta de colaboración"
        />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          Allitron — Nayarit Innovador.
        </p>
      </footer>
    </main>
  );
}
