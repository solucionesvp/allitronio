"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, StepList, PullQuote, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const PREGUNTAS = [
  { texto: "¿Cuál es el objetivo concreto del 26 de noviembre y cómo se medirá?", etiqueta: "Evento" },
  { texto: "¿Quién autorizó qué por parte de Google, David y Hash?", etiqueta: "Legal / marca" },
  { texto: "¿Cuál es la sede, capacidad, costo, producción incluida y fecha límite de confirmación?", etiqueta: "Evento" },
  { texto: "¿Qué se venderá antes, durante y después del evento?", etiqueta: "Comercial" },
  { texto: "¿Quién es dueño de cada producto, código, marca, base de datos y cliente?", etiqueta: "Legal / IP" },
  { texto: "¿Qué aporta cada integrante durante septiembre–noviembre y cómo se mide?", etiqueta: "Gobierno" },
  { texto: "¿Habrá salario, comisión, reembolso, equity o combinación?", etiqueta: "Equity" },
  { texto: "¿Qué figura jurídica recomienda por escrito un abogado/contador y por qué?", etiqueta: "Legal" },
  { texto: "¿Qué actividades quedan fuera para proteger LAZUP, Lázaro y negocios previos?", etiqueta: "Legal / IP" },
  { texto: "¿Cuál es la decisión de continuar o cancelar si no hay autorización, sede, ventas o patrocinio?", etiqueta: "Gobierno" },
];

export default function PreguntasPendientesPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/fundadores-agosto26" hubLabel="Hub" current="Preguntas pendientes" />
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
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            LO QUE LA MINUTA DEBE OBLIGAR A RESPONDER
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            10 preguntas sin las cuales
            <br />
            no debería avanzar el proyecto.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Ninguna quedó respondida en la reunión del 26 de agosto. Son el
            criterio de salida de la futura minuta formal.
          </motion.p>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">PREGUNTAS ABIERTAS</Eyebrow>
        <div className="mt-6">
          <StepList items={PREGUNTAS} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={HelpCircle}>
          Mientras estas 10 preguntas no tengan respuesta por escrito, ningún
          acuerdo verbal de esta reunión debe tratarse como decisión final.
        </PullQuote>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav backHref="/entregas/fundadores-agosto26" backLabel="Volver al hub" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          Registro interno — 26 de agosto de 2026. No reenviar fuera del
          equipo fundador.
        </p>
      </footer>
    </main>
  );
}
