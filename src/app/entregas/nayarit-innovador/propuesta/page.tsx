"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, StatChip, SummaryBlock, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

export default function PropuestaPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/nayarit-innovador" hubLabel="Hub" current="La propuesta" />
      <section className="relative flex min-h-[70svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 85% 15%, rgba(9,175,242,0.10) 0%, transparent 60%)",
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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            NAYARIT INNOVADOR · 26 DE NOVIEMBRE DE 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.02] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
          >
            Dos días para llevar la
            <br />
            adopción de IA a Nayarit.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Allitron organiza Nayarit Innovador: un evento de dos días que
            convierte el interés por la inteligencia artificial en
            resultados concretos para personas, emprendedores y empresas de
            la región — con Tepic como sede y convocatoria que se extiende a
            Puerto Vallarta, Guadalajara y zonas cercanas.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="Duración" value="2 días" />
            <StatChip label="Aforo objetivo" value="300–500" />
            <StatChip label="Públicos" value="3" />
            <StatChip label="Alcance" value="Regional" />
          </div>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">QUÉ ES NAYARIT INNOVADOR</Eyebrow>
        <SummaryBlock
          lead="Es un evento construido y operado por Allitron para llevar fundamentos de innovación, tipos de IA e implementación práctica a tres audiencias distintas en un mismo espacio: público general y universitarios, emprendedores/pymes, y empresas listas para invertir en transformación real."
          highlight="El objetivo no es solo generar contenido o asistencia — es que el evento produzca negocio real y medible: empresas con diagnóstico, roadmap y, para quien decida avanzar, un acompañamiento de 90 días con Allitron."
          pointsHeading="Lo que ya tenemos resuelto"
          points={[
            { label: "Fecha y aforo", text: "26 de noviembre de 2026, con capacidad para 300 a 500 personas." },
            { label: "Sede", text: "Espacio identificado en Tepic para el evento general, y Allitron Hub para la sesión privada de empresas." },
            { label: "Estructura de 2 días", text: "Día 1: conferencia y posicionamiento. Día 2: talleres y sesión privada de acompañamiento." },
            { label: "Producto propio", text: "Un sistema de agentes de IA que ejecuta diagnóstico, roadmap y seguimiento — no solo la promesa, sino la herramienta." },
          ]}
        />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/nayarit-innovador"
          backLabel="Volver al hub"
          nextHref="/entregas/nayarit-innovador/itinerario"
          nextLabel="Siguiente: itinerario de los 2 días"
        />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <OptionalImage
          src={BRAND_ALLI.monochrome}
          alt=""
          style={{ height: 40, width: "auto", margin: "0 auto 16px", opacity: 0.5 }}
          fallback={null}
        />
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          <CalendarClock size={14} className="mr-1 inline-block align-[-2px]" />
          Allitron — Nayarit Innovador. Propuesta preparada para revisión de
          Jahasiel y David.
        </p>
      </footer>
    </main>
  );
}
