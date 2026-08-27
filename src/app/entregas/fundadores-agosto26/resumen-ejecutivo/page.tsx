"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import {
  EASE,
  Eyebrow,
  SectionShell,
  StatChip,
  SummaryBlock,
  StepList,
  PersonCard,
  PageNav,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const PERSONAS: [string, string][] = [
  ["Alejandro Valdés", "Fundador/dueño actual del concepto Allitron; relaciones, espacio, evento y dirección general"],
  ["José Guadalupe Molina · “Lups”", "Producto, validación, desarrollo tecnológico, automatización, marketing y ventas iniciales"],
  ["Miguel Gardea · “Miki”", "Perfil financiero/comercial; contactos en Querétaro, estructura empresarial y prospección"],
];

const ACEPTADOS = [
  "Seguir trabajando como equipo y usar el grupo existente para coordinación.",
  "Documentar la reunión y aterrizar tareas la semana siguiente.",
  "Tratar de estructurar comercialmente septiembre–octubre y usar noviembre como horizonte de lanzamiento/evento.",
  "Evitar depender únicamente del evento: desarrollar productos y continuidad comercial.",
  "Investigar y ordenar la constitución empresarial antes de facturar o recibir inversión formalmente.",
];

const EN_PRINCIPIO = [
  "Evento tentativo el 26 de noviembre y posible formato de dos días.",
  "Conversación con recinto/sede y búsqueda de colaboración técnica.",
  "Miguel como frente comercial/seguimiento de clientes.",
  "Reunión de presentación con el jefe de Miguel la semana siguiente.",
  "Evaluar viaje, charla o conexiones en Querétaro a finales de septiembre.",
];

const PROPUESTAS = [
  "Constituir una SAPI.",
  "Constituir fuera de México o usar Estonia.",
  "Acceder a Google for Startups.",
  "Dar acciones a los tres o recibir inversión.",
  "Anunciar presencia de Google.",
  "Considerar a BP, IBS o Isuzu como clientes formales de Allitron.",
  "Lanzar un SaaS con precio, porcentaje o número específico de clientes.",
];

export default function ResumenEjecutivoPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/fundadores-agosto26" hubLabel="Hub" current="Resumen ejecutivo" />
      {/* ── Hero ─────────────────────────────────────────────────────── */}
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
            className="mb-8 flex items-center justify-between"
          >
            <OptionalImage
              src={BRAND_LOGO.light}
              alt="Allitron"
              style={{ height: 22, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>}
            />
            <span className="glass rounded-full px-4 py-1.5 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-allitron-orange">
              USO INTERNO · SOLO FUNDADORES
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            PRIMERA REUNIÓN INTERNA · 26 DE AGOSTO 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.02] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
          >
            De proyecto de escritorio a
            <br />
            algo que el equipo quiere formalizar.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Primera reunión formal del equipo Allitron: Alejandro Valdés, José
            Guadalupe Molina (Lups) y Miguel Gardea, miércoles 26 de agosto de
            2026, 20:13–22:10 hora de Tepic, por Google Meet. Este documento es
            la fuente para elaborar la minuta — no la sustituye, y no es
            asesoría legal, fiscal o corporativa.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="Duración" value="1h 57m" />
            <StatChip label="Frentes abiertos" value="4" />
            <StatChip label="Participantes" value="3" />
            <StatChip label="Sin cerrar por escrito" value="Equity" />
          </div>
        </div>
      </section>

      {/* ── Resultado ejecutivo ────────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">RESULTADO EJECUTIVO</Eyebrow>
        <SummaryBlock
          lead="Allitron pasó en esta conversación de ser tratado como “proyecto de escritorio” a una iniciativa que el equipo quiere formalizar, facturar y operar. Hay cuatro frentes superpuestos: constitución/gobierno, evento piloto, venta de productos y servicios, y construcción del hub/comunidad. Los tres participantes muestran intención de colaborar, pero no quedaron cerrados por escrito los porcentajes, la propiedad intelectual, las aportaciones, los sueldos, la figura jurídica ni la forma de incorporar clientes y activos previos."
          highlight="El debate de fondo fue capital versus trabajo. La conclusión práctica no es repartir acciones inmediatamente, sino medir aportaciones, vender, validar y formalizar antes de comprometer propiedad."
          pointsHeading="Los 4 frentes superpuestos"
          points={[
            { label: "Constitución y gobierno", text: "SAPI vs. SAS vs. extranjera; separar marca, razón social, IP y clientes previos de cada participante." },
            { label: "Evento piloto", text: "Fecha tentativa 26 de noviembre, formato de dos días — catalizador, no debe ser el único producto." },
            { label: "Venta de productos y servicios", text: "José Guadalupe aporta desarrollo/automatización; septiembre–octubre como ventana de validación." },
            { label: "Hub y comunidad", text: "Espacio en Tepic como posible base; ecosistema de eventos, formación y conexión empresarial." },
          ]}
        />
      </SectionShell>

      {/* ── Quién estuvo en la sala ────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">QUIÉN ESTUVO EN LA SALA</Eyebrow>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PERSONAS.map(([nombre, rol], i) => (
            <PersonCard key={nombre} nombre={nombre} rol={rol} index={i} />
          ))}
        </div>
      </SectionShell>

      {/* ── Decisiones — claramente aceptadas (claro) ──────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">CLARAMENTE ACEPTADO</Eyebrow>
        <div className="mt-6">
          <StepList items={ACEPTADOS.map((texto) => ({ texto, etiqueta: "Aceptado" }))} />
        </div>
      </SectionShell>

      {/* ── Decisiones — en principio (claro) ───────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">ACEPTADO EN PRINCIPIO — SIN CIERRE OPERATIVO</Eyebrow>
        <div className="mt-6">
          <StepList items={EN_PRINCIPIO.map((texto) => ({ texto, etiqueta: "En principio" }))} />
        </div>
      </SectionShell>

      {/* ── Decisiones — propuestas, no decisiones (claro) ──────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">PROPUESTAS — TODAVÍA NO SON DECISIONES</Eyebrow>
        <div className="mt-6">
          <StepList items={PROPUESTAS.map((texto) => ({ texto, etiqueta: "Propuesta" }))} />
        </div>
      </SectionShell>

      {/* ── Navegación ───────────────────────────────────────────────── */}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/fundadores-agosto26"
          backLabel="Volver al hub"
          nextHref="/entregas/fundadores-agosto26/riesgos-y-contradicciones"
          nextLabel="Siguiente: riesgos y contradicciones"
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
          Documento generado a partir del registro y análisis de la reunión del
          26 de agosto de 2026. Uso interno — no reenviar fuera del equipo
          fundador.
        </p>
      </footer>
    </main>
  );
}
