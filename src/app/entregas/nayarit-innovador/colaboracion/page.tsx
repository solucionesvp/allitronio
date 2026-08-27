"use client";

import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, SummaryBlock, StepList, PullQuote, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const SOLICITUDES = [
  { texto: "Su propuesta de esquema de comisión sobre las ventas de acompañamiento que se cierren a partir del evento.", etiqueta: "Comisión" },
  { texto: "Autorización sobre qué podemos comunicar respecto a su participación y la de Google en los materiales del evento.", etiqueta: "Marca" },
  { texto: "Si es posible gestionar créditos de Google/Gemini para los asistentes, y por cuánto tiempo.", etiqueta: "Créditos" },
  { texto: "Cómo prefieren manejar el certificado de asistencia — emitido por Allitron, por ustedes, o de forma conjunta.", etiqueta: "Certificado" },
  { texto: "Confirmación del contenido y duración de sus charlas, siguiendo el temario que ya compartieron, o si prefieren ajustarlo.", etiqueta: "Contenido" },
  { texto: "Si tienen otros speakers que sugerir dentro de su red, en la misma línea temática.", etiqueta: "Speakers" },
];

export default function ColaboracionPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/nayarit-innovador" hubLabel="Hub" current="Colaboración" />
      <section className="relative flex min-h-[46svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            Lo que proponemos,
            <br />
            y lo que les pedimos.
          </motion.h1>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">MODELO DE COLABORACIÓN</Eyebrow>
        <SummaryBlock
          lead="Allitron ejecuta y vende el acompañamiento de 90 días bajo su propia marca y responsabilidad. El rol que les proponemos a ustedes es de mentoría de metodología, charla en el evento, y respaldo de imagen ante las empresas que participen."
          highlight="En vez de proponer nosotros un porcentaje fijo, preferimos que ustedes nos compartan su propuesta de esquema de comisión sobre las ventas de acompañamiento que se cierren a partir del evento — queremos que el modelo funcione para ambos lados."
        />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">LO QUE LES PEDIMOS PARA CERRAR LA PROPUESTA</Eyebrow>
        <div className="mt-6">
          <StepList items={SOLICITUDES} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Handshake}>
          Nos encantaría platicarlo en una llamada esta semana y dejar todo
          confirmado con tiempo para preparar el evento juntos.
        </PullQuote>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav backHref="/entregas/nayarit-innovador" backLabel="Volver al hub" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <OptionalImage
          src={BRAND_ALLI.monochrome}
          alt=""
          style={{ height: 40, width: "auto", margin: "0 auto 16px", opacity: 0.5 }}
          fallback={null}
        />
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          Allitron — Nayarit Innovador. Gracias por su tiempo y su
          colaboración hasta aquí.
        </p>
      </footer>
    </main>
  );
}
