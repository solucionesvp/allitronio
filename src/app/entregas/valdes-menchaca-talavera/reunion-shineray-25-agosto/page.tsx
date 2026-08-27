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
  RoadmapTimeline,
  SummaryBlock,
  RiskList,
  StepList,
  PersonCard,
  PageNav,
  type RoadmapItem,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const FRENTES: RoadmapItem[] = [
  {
    titulo: "Centro de marca y refacciones — CDMX",
    compromiso:
      "Shineray instala centro de marca y almacén de refacciones de al menos 1,500 m². Decoración en octubre, obra terminada en diciembre.",
    responsable: "Shineray México",
    fecha: "Confirmar sep. · límite oct.–dic. 2026",
    nota: "Promesa verbal, sin fecha en firme por escrito.",
    notaTone: "warning",
  },
  {
    titulo: "Apertura oficial del centro",
    compromiso: "Apertura formal del centro de marca.",
    responsable: "Shineray México",
    fecha: "Enero 2027",
    nota: "Meta verbal, depende de que el frente anterior se cumpla en tiempo.",
    notaTone: "warning",
  },
  {
    titulo: "Refacciones e inventario",
    compromiso:
      "Mínimo un contenedor mensual; 6 meses de stock en mantenimiento/colisión, 2–3 meses en piezas poco frecuentes.",
    responsable: "Shineray",
    fecha: "Continuo",
    nota: "Requiere KPI de disponibilidad — no hay métrica definida todavía.",
    notaTone: "warning",
  },
  {
    titulo: "Capacitación técnica",
    compromiso:
      "Centro técnico y capacitación semestral con instructores chinos y apoyo de traducción en México.",
    responsable: "Shineray",
    fecha: "Cada semestre",
    nota: "Por calendarizar.",
  },
  {
    titulo: "Financiamiento",
    compromiso:
      "Banorte ya es una colocación real, pero el seguro multianual anticipado encarece la operación. Bancos, arrendadoras, cajas y alternativas regionales siguen sin cerrarse.",
    responsable: "Shineray + IBS",
    fecha: "Inmediato",
    nota: "No hubo solución definitiva en la reunión. Es el cuello de botella real, más que el interés comercial.",
    notaTone: "warning",
  },
  {
    titulo: "VIN / permisos",
    compromiso: "Resolver retrasos que ya afectan entregas a clientes reales.",
    responsable: "Shineray",
    fecha: '"La próxima semana" — prometido de forma repetida',
    nota: "Riesgo crítico. No debe registrarse como resuelto sin folios o evidencia documental.",
    notaTone: "warning",
  },
  {
    titulo: "Ensamble local",
    compromiso:
      "Ya existe contrato y primer pedido usando la línea de un socio existente. Meta: 3,000 unidades en 2027. Planta propia si se llega a 20,000 unidades/año.",
    responsable: "Shineray + ensamblador",
    fecha: "Primera producción nov. · ventas dic. 2026",
    nota: "Falta confirmar razón social, ubicación y alcance contractual del socio.",
    notaTone: "warning",
  },
  {
    titulo: "E-commerce y marketing",
    compromiso:
      "Tienda oficial en Mercado Libre con inventario/logística central; lanzamiento de marca en enero con despliegue nacional marzo–mayo.",
    responsable: "Shineray + desarrollo/operación local",
    fecha: "Desarrollo ~3.5 meses · objetivo ene. 2027",
    nota: "Alcance técnico no cerrado — oportunidad real para Allitron, sujeta a acuerdo formal.",
  },
];

const RIESGOS = [
  {
    titulo: "VIN / permisos — el riesgo más urgente",
    texto:
      '"La próxima semana" se ha repetido cerca de quince veces. No debe registrarse como resuelto sin folios o evidencia documental.',
    critico: true,
  },
  {
    titulo: "Financiamiento chino sin línea confirmada",
    texto:
      "Se exploró, pero la respuesta fue que los bancos chinos hoy privilegian proyectos gigantes, no necesariamente crédito minorista o flotillas privadas.",
  },
  {
    titulo: "Calendario agresivo",
    texto:
      "Centro, tienda digital, ensamble, productos y lanzamiento convergen entre noviembre y enero. Requiere ruta crítica semanal.",
  },
  {
    titulo: "Responsables difusos",
    texto:
      'Muchas expresiones usan "nosotros" sin dueño individual. Cada iniciativa necesita un responsable único, como mínimo.',
  },
  {
    titulo: "Cifras de reunión, no cifras por escrito",
    texto:
      "1,500 m², un contenedor/mes, 3,000 unidades, 20,000 unidades y 10,000 km de validación son declaraciones verbales; deben confirmarse por escrito.",
  },
  {
    titulo: "Planta de ensamble sin confirmar",
    texto:
      "El audio mezcla referencias de marcas, ciudades y socios; falta confirmar razón social, ubicación y alcance contractual.",
  },
];

const PASOS = [
  "Enviar a Shineray una minuta bilingüe para confirmación, separando compromiso, responsable, evidencia y fecha.",
  "Abrir un tablero mensual con los 8 frentes: CDMX, refacciones, capacitación, VIN, financiamiento, ensamble, e-commerce y marketing.",
  "Pedir confirmación escrita de cifras, modelos, ubicación de planta, fechas y responsable de cada frente.",
  "Diseñar el piloto digital sin asumir adjudicación: inventario central, catálogo, reglas por distribuidor, CRM, trazabilidad de lead y SLA logístico.",
  "Crear el caso Banorte y el expediente de VIN con evidencia documental — son la mayor palanca y el mayor riesgo, respectivamente.",
  "Preparar después, como trabajo separado, la presentación de experiencia/propuesta solicitada. No se creó en esta etapa.",
];

const PERSONAS = [
  ["Emma", "Ejecutiva de Shineray a cargo de Latinoamérica"],
  ["José Talavera del Río · “ingeniero Pepe”", "Director y cara del proyecto ante Shineray"],
  ["Alejandro Valdés Jr.", "Arquitectura comercial y de negocios"],
  ["Guillermo Valdés Menchaca", "Coordinación de empresas familiares"],
];

export default function ResumenFamiliaPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/valdes-menchaca-talavera" hubLabel="Hub" current="Resumen interno completo" />
      {/* ── Hero (oscuro, deliberado) ────────────────────────────────── */}
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
              USO INTERNO · CONFIDENCIAL
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            REUNIÓN SHINERAY · IBS · 25 DE AGOSTO 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.02] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
          >
            Resumen interno para la familia:
            <br />
            qué se dijo, qué falta por confirmar.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[640px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Este documento distingue lo dicho en la sala de las conclusiones
            estratégicas. Es para uso interno de la familia Valdés Menchaca y
            Talavera Béjar — no se comparte con Shineray en esta forma.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="Duración" value="1h 57m" />
            <StatChip label="Frentes abiertos" value="8" />
            <StatChip label="Riesgo crítico" value="1" />
            <StatChip label="Participantes" value="6+" />
          </div>
        </div>
      </section>

      {/* ── Resumen ejecutivo (claro — se lee, no se alerta) ──────────── */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">RESUMEN EJECUTIVO</Eyebrow>
        <SummaryBlock
          lead="La reunión confirmó que IBS no quiere presentarse como un distribuidor improvisado, sino como una plataforma empresarial respaldada por dos familias con experiencia operativa, activos, red regional y capacidad automotriz. Shineray reaccionó con apertura y compartió una hoja de ruta ambiciosa: consolidar un centro de marca y refacciones en Ciudad de México, reforzar inventario y capacitación, ampliar el portafolio, activar marketing nacional y avanzar hacia ensamble local."
          highlight="El cuello de botella inmediato no es el interés comercial: son financiamiento, permisos/VIN, inventario de refacciones y disciplina de ejecución."
          pointsHeading="Oportunidad concreta para Allitron"
          points={[
            { label: "CRM y seguimiento", text: "Sistema de seguimiento de leads en vez de promesas dispersas." },
            { label: "E-commerce con inventario central", text: "Tienda con logística y stock coordinados, no por distribuidor." },
            { label: "Evidencia comercial", text: "Producción continua de material que respalde cada frente." },
            { label: "Tablero mensual", text: "Seguimiento de expansión con responsables y fechas verificables." },
            { label: "Marketing nacional–dealer", text: "Coordinación entre el lanzamiento de marca y cada distribuidor." },
            { label: "Documentación bilingüe", text: "Todo lo anterior presentado por etapas, no como capacidad ya operativa." },
          ]}
        />
      </SectionShell>

      {/* ── Frentes de trabajo (claro — hoja de ruta con fecha real) ──── */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">LOS 8 FRENTES QUE SALIERON DE LA REUNIÓN</Eyebrow>
        <p className="mb-10 max-w-[640px] font-display text-[1.5rem] font-bold text-[#101820] sm:text-[1.8rem]">
          Compromiso, responsable, fecha — y qué tan firme está cada uno.
        </p>
        <RoadmapTimeline items={FRENTES} />
      </SectionShell>

      {/* ── Riesgos y dudas abiertas (oscuro — deliberado: es la alerta) */}
      <SectionShell>
        <Eyebrow>RIESGOS Y DUDAS ABIERTAS</Eyebrow>
        <p className="mb-10 max-w-[640px] font-display text-[1.5rem] font-bold text-foreground sm:text-[1.8rem]">
          Lo que no debe darse por resuelto todavía.
        </p>
        <RiskList items={RIESGOS} />
      </SectionShell>

      {/* ── Próximos pasos (claro — accionable) ───────────────────────── */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">PRÓXIMOS PASOS RECOMENDADOS PARA ALLITRON</Eyebrow>
        <div className="mt-8">
          <StepList items={PASOS.map((texto) => ({ texto }))} />
        </div>
      </SectionShell>

      {/* ── Personas (claro — humano) ──────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">QUIÉN ESTUVO EN LA SALA</Eyebrow>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PERSONAS.map(([nombre, rol], i) => (
            <PersonCard key={nombre} nombre={nombre} rol={rol} index={i} />
          ))}
        </div>
      </SectionShell>

      {/* ── Navegación para el lector ──────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/valdes-menchaca-talavera"
          backLabel="Volver al menú principal"
          nextHref="/entregas/valdes-menchaca-talavera/plan-de-equipo"
          nextLabel="Siguiente: plan de equipo"
        />
      </SectionShell>

      {/* ── Footer confidencial ──────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <OptionalImage
          src={BRAND_ALLI.monochrome}
          alt=""
          style={{ height: 40, width: "auto", margin: "0 auto 16px", opacity: 0.5 }}
          fallback={null}
        />
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          <CalendarClock size={14} className="mr-1 inline-block align-[-2px]" />
          Documento generado a partir de la grabación de la reunión del 25 de
          agosto de 2026. Uso interno — no reenviar fuera del grupo familiar
          sin revisión de Allitron.
        </p>
      </footer>
    </main>
  );
}
