"use client";

import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, StepList, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const ACCIONES = [
  {
    titulo: "Terminar y enviar material del evento para validación",
    texto: "Evidencia requerida: correo/documento enviado y respuesta.",
    etiqueta: "Alejandro · hoy (26 ago.)",
  },
  {
    titulo: "Proponer fecha de llamada con coordinadora de Querétaro",
    texto: "Evidencia requerida: invitación de calendario.",
    etiqueta: "Miguel · tras su gestión del viernes",
  },
  {
    titulo: "Buscar reunión de presentación con el jefe de Miguel",
    texto: "Evidencia requerida: fecha, agenda y asistentes.",
    etiqueta: "Miguel + equipo · semana siguiente",
  },
  {
    titulo: "Aterrizar tareas y parte comercial",
    texto: "Evidencia requerida: tablero y responsables.",
    etiqueta: "Los tres · lunes / semana siguiente",
  },
  {
    titulo: "Confirmar fecha, sede y esquema del evento",
    texto: "Evidencia requerida: carta/correo de sede y alcance.",
    etiqueta: "Alejandro + equipo · cuanto antes",
  },
  {
    titulo: "Validar autorización para usar Google/nombres/logos",
    texto: "Evidencia requerida: autorización escrita, antes de publicar cualquier material.",
    etiqueta: "Alejandro con Hash/David",
  },
  {
    titulo: "Comparar SAPI, SAS y otras alternativas",
    texto: "Evidencia requerida: opinión legal/fiscal escrita, antes de facturar o invertir.",
    etiqueta: "Alejandro + Miguel + abogado/contador",
  },
  {
    titulo: "Definir aportaciones, propiedad, roles y salida",
    texto: "Evidencia requerida: acuerdo de fundadores, antes de constituir o repartir acciones.",
    etiqueta: "Los tres",
  },
  {
    titulo: "Preparar oferta comercial y vender pilotos",
    texto: "Evidencia requerida: oferta, CRM, ventas y aprendizaje.",
    etiqueta: "José Guadalupe + Miguel · sep.–oct. 2026",
  },
  {
    titulo: "Investigar Nodo y referencias de eventos",
    texto: "Evidencia requerida: nota de investigación.",
    etiqueta: "Miguel/equipo · sin fecha cerrada",
  },
  {
    titulo: "Evaluar asistencia/charla en Querétaro y Stripe",
    texto: "Evidencia requerida: agenda, costo y objetivo.",
    etiqueta: "Equipo · sep. 2026",
  },
  {
    titulo: "Identificar patrocinadores y modelo económico del evento",
    texto: "Evidencia requerida: presupuesto y compromisos, antes del lanzamiento público.",
    etiqueta: "Equipo",
  },
];

export default function AccionesYPlazosPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/fundadores-agosto26" hubLabel="Hub" current="Acciones y plazos" />
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
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            PROPUESTA DE ALLITRON · PARA CONFIRMAR EN EQUIPO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            12 acciones, con evidencia
            <br />
            requerida para cada una.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Responsables y plazos son los mencionados o inferidos en la
            conversación — ninguno es un nombramiento formal todavía. La
            columna de evidencia existe para que nada se cuente como hecho
            solo porque se dijo en la sala.
          </motion.p>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">ACCIONES SURGIDAS DE LA CONVERSACIÓN</Eyebrow>
        <div className="mt-6">
          <StepList items={ACCIONES} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/fundadores-agosto26"
          backLabel="Volver al hub"
          nextHref="/entregas/fundadores-agosto26/preguntas-pendientes"
          nextLabel="Siguiente: preguntas pendientes"
        />
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
