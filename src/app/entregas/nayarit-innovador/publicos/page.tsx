"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, StepList, PullQuote, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const PUBLICOS = [
  {
    titulo: "1. General — universitarios y público interesado",
    texto: "Conocer y entender IA y tecnología aplicada a emprendimientos, empresas y estudios. Se lleva conocimiento aplicable, certificado de asistencia y, si Google puede confirmarlo, créditos de Google/Gemini.",
    etiqueta: "Acceso abierto",
  },
  {
    titulo: "2. Emprendedores y pymes",
    texto: "Dueños de negocio que quieren integrar IA, marketing y nuevas tecnologías para crecer. Se llevan talleres prácticos, casos de uso reales y contacto directo con Allitron.",
    etiqueta: "Acceso moderado",
  },
  {
    titulo: "3. Empresas — acompañamiento",
    texto: "Empresas con presupuesto real para invertir en transformación. En una sesión privada (máximo 3 personas por empresa) reciben diagnóstico exprés y roadmap de regalo; quien decide avanzar entra a un acompañamiento de 90 días con Allitron.",
    etiqueta: "Sesión privada",
  },
];

export default function PublicosPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/nayarit-innovador" hubLabel="Hub" current="Los 3 públicos" />
      <section className="relative flex min-h-[40svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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
            Un evento, tres públicos,
            <br />
            un mismo embudo hacia negocio real.
          </motion.h1>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">LOS 3 PÚBLICOS</Eyebrow>
        <div className="mt-6">
          <StepList items={PUBLICOS} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Users}>
          No buscamos solo asistencia — buscamos que cada público avance un
          paso: de curiosidad a conocimiento, de conocimiento a adopción, y
          de adopción a un acompañamiento real de 90 días.
        </PullQuote>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/nayarit-innovador"
          backLabel="Volver al hub"
          nextHref="/entregas/nayarit-innovador/sistema"
          nextLabel="Siguiente: nuestro sistema"
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
