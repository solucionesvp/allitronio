"use client";

import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, RoadmapTimeline, PageNav, type RoadmapItem } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const DIA_1: RoadmapItem[] = [
  { titulo: "Registro y bienvenida", compromiso: "Apertura de puertas y acreditación de asistentes.", responsable: "Equipo Allitron", fecha: "16:00" },
  { titulo: "Apertura oficial", compromiso: "Bienvenida y contexto del evento.", responsable: "Alejandro Valdés", fecha: "16:30" },
  { titulo: "Conferencia magistral de Allitron", compromiso: "Charla principal — contenido propio de Allitron.", responsable: "José Guadalupe “Lups”", fecha: "16:45" },
  { titulo: "Charla — visión de innovación e IA", compromiso: "Siguiendo el temario ya compartido en la guía Nayarit Innovador.", responsable: "Jahasiel", fecha: "17:30" },
  { titulo: "Charla invitada", compromiso: "Tema dentro de la misma línea temática, a confirmar.", responsable: "David Carrera Palacios", fecha: "18:15" },
  { titulo: "Charlas adicionales", compromiso: "Speakers invitados dentro de la línea temática del evento.", responsable: "Por confirmar", fecha: "19:00" },
  { titulo: "Lanzamiento de producto", compromiso: "Bloque independiente de ~20 minutos, sin mezclarse con las conferencias.", responsable: "José Guadalupe", fecha: "19:45" },
  { titulo: "Networking y experiencia", compromiso: "Café, alimentos y espacio de conexión entre asistentes.", responsable: "Equipo Allitron", fecha: "20:05" },
  { titulo: "Cierre del día 1", compromiso: "Entrega de certificado de asistencia.", responsable: "Equipo Allitron", fecha: "20:45" },
];

const DIA_2: RoadmapItem[] = [
  { titulo: "Continuación de charlas y talleres", compromiso: "Para público general y pymes, mismo temario.", responsable: "Equipo Allitron", fecha: "Sede general" },
  { titulo: "Taller práctico de IA aplicada", compromiso: "Ejercicio guiado para pymes, no solo teoría.", responsable: "Equipo Allitron", fecha: "Sede general" },
  { titulo: "Sesión privada de diagnóstico", compromiso: "Diagnóstico exprés y roadmap de regalo para empresas interesadas (máx. 3 personas por empresa).", responsable: "Equipo Allitron", fecha: "Allitron Hub" },
  { titulo: "Cierre comercial", compromiso: "Presentación del programa de acompañamiento de 90 días a quienes ya vieron su diagnóstico.", responsable: "Equipo Allitron", fecha: "Allitron Hub" },
];

export default function ItinerarioPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/nayarit-innovador" hubLabel="Hub" current="Itinerario" />
      <section className="relative flex min-h-[40svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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
            Itinerario de los 2 días
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Horarios orientativos, sujetos a ajuste una vez confirmemos
            juntos el contenido de sus charlas.
          </motion.p>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">DÍA 1 — CONFERENCIA Y POSICIONAMIENTO</Eyebrow>
        <div className="mt-6">
          <RoadmapTimeline items={DIA_1} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">DÍA 2 — TALLERES Y SESIÓN PRIVADA</Eyebrow>
        <div className="mt-6">
          <RoadmapTimeline items={DIA_2} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/nayarit-innovador"
          backLabel="Volver al hub"
          nextHref="/entregas/nayarit-innovador/publicos"
          nextLabel="Siguiente: los 3 públicos"
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
