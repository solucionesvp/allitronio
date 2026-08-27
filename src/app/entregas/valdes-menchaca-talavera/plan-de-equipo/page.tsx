"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, StepList, PullQuote, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const FRENTES_EQUIPO = [
  {
    frente: "Minuta y confirmación con Shineray",
    accion: "Enviar minuta bilingüe separando compromiso, responsable, evidencia y fecha para cada punto.",
    dueno: "Allitron",
  },
  {
    frente: "Tablero mensual de los 8 frentes",
    accion: "Abrir un tablero único (CDMX, refacciones, capacitación, VIN, financiamiento, ensamble, e-commerce, marketing) con estado semanal.",
    dueno: "Allitron + José Talavera",
  },
  {
    frente: "Confirmación por escrito",
    accion: "Pedir cifras, modelos, ubicación de planta, fechas y responsable de cada frente — nada se registra como cerrado solo porque se dijo en la reunión.",
    dueno: "José Talavera",
  },
  {
    frente: "Piloto digital",
    accion: "Diseñar inventario central, catálogo, reglas por distribuidor, CRM y trazabilidad de leads — sin asumir que ya está adjudicado.",
    dueno: "Allitron",
  },
  {
    frente: "Expediente de riesgo",
    accion: "Documentar el caso Banorte (palanca) y el expediente de VIN/permisos (riesgo) con evidencia, no con promesas verbales.",
    dueno: "Allitron + Alejandro Jr.",
  },
  {
    frente: "Propuesta de experiencia",
    accion: "Preparar, como trabajo aparte, la presentación de experiencia que Shineray pidió. No se ha creado todavía.",
    dueno: "Allitron",
  },
] as const;

export default function PlanDeEquipoPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/valdes-menchaca-talavera" hubLabel="Hub" current="Plan de equipo" />
      {/* ── Hero (oscuro, deliberado) ────────────────────────────────── */}
      <section className="relative flex min-h-[50svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 15% 15%, rgba(242,135,76,0.10) 0%, transparent 60%)",
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
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-orange"
          >
            PROPUESTA DE ALLITRON · PARA DISCUTIR EN EQUIPO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            Estructura desde el día 1 —
            <br />
            igual que Shineray llega con la suya.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[640px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Shineray llegó con roadmap, cifras y responsables claros. Del lado
            del grupo, si no fijamos desde ahora quién hace qué y con qué
            evidencia, corremos el riesgo de que el proyecto avance más rápido
            de su lado que del nuestro. Esta es una propuesta de Allitron para
            discutir en equipo — no son tareas ya asignadas.
          </motion.p>
        </div>
      </section>

      {/* ── Frentes y responsables (claro — es un plan de acción) ─────── */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">PROPUESTA DE FRENTES Y RESPONSABLES</Eyebrow>
        <div className="mt-6">
          <StepList
            items={FRENTES_EQUIPO.map((f) => ({
              titulo: f.frente,
              texto: f.accion,
              etiqueta: f.dueno,
            }))}
          />
        </div>
      </SectionShell>

      {/* ── Cierre (claro) ─────────────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Building2}>
          El objetivo no es tener más juntas — es que cada frente tenga un
          responsable, una fecha y una evidencia, para que en la próxima
          reunión con Shineray lleguemos con la misma disciplina que ellos
          mostraron.
        </PullQuote>
      </SectionShell>

      {/* ── Navegación para el lector ──────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/valdes-menchaca-talavera"
          backLabel="Volver al menú principal"
        />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          Propuesta interna de Allitron — 26 de agosto de 2026. No compartir
          con Shineray en esta forma.
        </p>
      </footer>
    </main>
  );
}
