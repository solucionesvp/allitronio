"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, StepList, SummaryBlock, PullQuote, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const OPCIONES_CONSTITUCION = [
  {
    titulo: "SAPI",
    texto: "Propuesta a analizar por su capacidad para recibir inversión y estructurar acciones.",
    etiqueta: "Propuesta",
  },
  {
    titulo: "SAS",
    texto: "Alternativa inicialmente pensada por Alejandro, pero con límites de facturación e inversión, y posibles restricciones por su relación con otra empresa.",
    etiqueta: "En revisión",
  },
  {
    titulo: "Empresa extranjera / Estonia",
    texto: "Mencionada junto con programas internacionales, pero únicamente como posibilidad a investigar — no hay análisis legal/fiscal todavía.",
    etiqueta: "Por investigar",
  },
  {
    titulo: "Notario y costo estimado",
    texto: "Miguel menciona un notario externo y un costo aproximado de $12,000 MXN; la opción no queda aceptada ni confirmada.",
    etiqueta: "Sin cerrar",
  },
  {
    titulo: "Ubicación de la constitución",
    texto: "Alejandro prefiere constituir en Nayarit por congruencia con la identidad regional del proyecto.",
    etiqueta: "Preferencia expresada",
  },
];

const PENDIENTE_EQUITY = [
  "Salario o sueldo para cada participante.",
  "Comisión sobre ventas.",
  "Equity / porcentaje de propiedad.",
  "Vesting (calendario de consolidación de la propiedad).",
  "Propiedad intelectual de cada producto, código, marca, base de datos.",
  "Reembolso de gastos.",
  "Reglas de salida de un socio.",
];

export default function CapitalYEstructuraPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/fundadores-agosto26" hubLabel="Hub" current="Capital y estructura" />
      <section className="relative flex min-h-[50svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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
            CONSTITUCIÓN, GOBIERNO Y EQUITY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            Capital versus trabajo:
            <br />
            el debate de fondo de la reunión.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Miguel plantea aportar estructura financiera, contactos, ventas y
            operación; José Guadalupe aporta productos tecnológicos,
            desarrollo, ventas y automatización; Alejandro aporta dirección,
            relaciones, espacio, gestión institucional y visión. Todos
            reconocen que el proyecto necesita dinero, pero difieren sobre
            cuándo levantar inversión, cuánto entregar y cómo valorar
            aportaciones no monetarias.
          </motion.p>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">CONSTITUCIÓN — OPCIONES SOBRE LA MESA</Eyebrow>
        <div className="mt-6">
          <StepList items={OPCIONES_CONSTITUCION.map((o) => ({ titulo: o.titulo, texto: o.texto, etiqueta: o.etiqueta }))} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">CAPITAL Y APORTACIONES</Eyebrow>
        <SummaryBlock
          lead="Miguel cuestiona cómo se reconocerán dinero, tiempo, contactos, ventas y ejecución. Se menciona la posibilidad de inversión y porcentajes, pero no existe cifra acordada ni cap table. José Guadalupe advierte contra “regalar” participación si todavía no se necesita inversión; Alejandro sostiene que deben reconocerse aportaciones y construir una empresa seria."
          highlight="La conversación debe convertirse en un acuerdo de fundadores antes de aceptar dinero, clientes compartidos o comprometer porcentajes."
        />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">LO QUE FALTA DEFINIR ANTES DE REPARTIR PROPIEDAD</Eyebrow>
        <div className="mt-6">
          <StepList items={PENDIENTE_EQUITY.map((texto) => ({ texto, etiqueta: "Sin definir" }))} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Scale}>
          No repartir acciones inmediatamente — medir aportaciones, vender,
          validar y formalizar antes de comprometer propiedad.
        </PullQuote>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/fundadores-agosto26"
          backLabel="Volver al hub"
          nextHref="/entregas/fundadores-agosto26/modelo-y-evento"
          nextLabel="Siguiente: modelo comercial y evento"
        />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          Registro interno — 26 de agosto de 2026. No constituye asesoría
          legal, fiscal o corporativa.
        </p>
      </footer>
    </main>
  );
}
