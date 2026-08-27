"use client";

import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import {
  EASE,
  Eyebrow,
  SectionShell,
  SummaryBlock,
  RoadmapTimeline,
  StepList,
  PageNav,
  type RoadmapItem,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const LINEA_DE_TIEMPO: RoadmapItem[] = [
  {
    titulo: "Primera reunión interna",
    compromiso: "Alejandro se compromete verbalmente a terminar/enviar el material del evento.",
    responsable: "Alejandro",
    fecha: "26 ago. 2026",
  },
  {
    titulo: "Gestión en Querétaro",
    compromiso: "Miguel habla con contactos de Querétaro (mamá, secretario, coordinadora) para proponer una llamada la semana siguiente.",
    responsable: "Miguel",
    fecha: "28 ago. aprox. (viernes)",
  },
  {
    titulo: "Aterrizaje comercial y de equipo",
    compromiso: "Llamada con coordinadora, reunión con el jefe de Miguel y aterrizaje de tareas comerciales.",
    responsable: "Los tres",
    fecha: "Semana del 31 ago.",
  },
  {
    titulo: "Evento/referencia de la Autónoma de Querétaro",
    compromiso: "Mencionado en la conversación; falta confirmar nombre y acceso.",
    responsable: "Equipo",
    fecha: "9 sep.",
    nota: "No confirmado — verificar antes de comprometer asistencia.",
    notaTone: "warning",
  },
  {
    titulo: "Posible evento de Stripe",
    compromiso: "Viaje/charla mencionado a finales de septiembre.",
    responsable: "Equipo",
    fecha: "Finales de sep.",
    nota: "No confirmado.",
    notaTone: "warning",
  },
  {
    titulo: "Ventas, producto y estructura",
    compromiso: "Etapa propuesta para validar comercialmente antes del evento.",
    responsable: "José Guadalupe + Miguel",
    fecha: "Sep.–oct. 2026",
  },
  {
    titulo: "Evento principal (tentativo)",
    compromiso: "Fecha tentativa del evento piloto — no debe registrarse como sede o fecha confirmada (80% de certeza expresado por Alejandro).",
    responsable: "Alejandro + equipo",
    fecha: "26 nov. 2026",
    nota: "Sede reconocida de forma dudosa; falta confirmación por escrito.",
    notaTone: "warning",
  },
];

const PRODUCTO_PUNTOS = [
  { label: "Portafolio actual", text: "Automatización, CRM, agentes de IA, MAPS y servicios derivados de Lázaro/LAZUP, presentados por José Guadalupe." },
  { label: "Ventana de validación", text: "Septiembre y octubre para vender/validar; noviembre como horizonte de lanzamiento o consolidación." },
  { label: "Frente comercial", text: "Miguel sugerido como posible responsable comercial (dialogar, vender, dar seguimiento) — sin nombramiento formal todavía." },
  { label: "Arquitectura comercial", text: "Allitron vendería soluciones a empresas, con terceros/proveedores entregando capacidades bajo una arquitectura común." },
];

export default function ModeloYEventoPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/fundadores-agosto26" hubLabel="Hub" current="Modelo comercial y evento" />
      <section className="relative flex min-h-[50svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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
            PRODUCTO, VENTAS Y EVENTO PILOTO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            El evento es catalizador,
            <br />
            no puede ser el único producto.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Formato tentativo de dos días: primer día de charlas y
            posicionamiento, segundo día de taller o actividad pagada para los
            prospectos con mayor interés. Audiencias mencionadas: empresarios,
            emprendedores, freelancers, organizaciones, universidades y
            prospectos B2B.
          </motion.p>
        </div>
      </section>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">MODELO COMERCIAL</Eyebrow>
        <SummaryBlock
          lead="José Guadalupe presenta productos/servicios ya desarrollados o en construcción, incluyendo automatización, CRM, agentes de IA, MAPS y servicios derivados de Lázaro/LAZUP."
          highlight="Aparecen metas ilustrativas de clientes y precio —por ejemplo, 20 clientes a $9,500 y escenarios de 100 clientes—; son cálculos de conversación, no proyecciones aprobadas."
          pointsHeading="Puntos clave"
          points={PRODUCTO_PUNTOS}
        />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">LÍNEA DE TIEMPO — DE LA REUNIÓN AL EVENTO</Eyebrow>
        <div className="mt-6">
          <RoadmapTimeline items={LINEA_DE_TIEMPO} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">EVENTO — LO QUE SE HABLÓ Y LO QUE FALTA</Eyebrow>
        <div className="mt-6">
          <StepList
            items={[
              { texto: "Se evalúan renta, colaboración con recinto, producción técnica, operadores, luz, sonido, patrocinadores y boletaje.", etiqueta: "Por definir" },
              { texto: "El evento debe generar negocio posterior: clientes, talleres, SaaS, consultoría o comunidad — no solo fotografías o reputación.", etiqueta: "Criterio de éxito" },
              { texto: "Se propone estudiar eventos de Querétaro y asistir a encuentros previos como referencia de formato.", etiqueta: "Investigación" },
              { texto: "Relación con Google (Hash, empleado; David, Google Partner externo) es exploratoria y operativa — no prueba alianza, patrocinio ni autorización para anunciar “un evento donde va a estar Google”.", etiqueta: "Verificar antes de anunciar" },
              { texto: "Se rechaza de facto pagar una propuesta cercana a $400,000 MXN para construir productos/hub; se prefiere pagar viáticos/charlas o negociar comisión sobre ventas.", etiqueta: "Decisión de costo" },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/fundadores-agosto26"
          backLabel="Volver al hub"
          nextHref="/entregas/fundadores-agosto26/acciones-y-plazos"
          nextLabel="Siguiente: acciones y plazos"
        />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          Registro interno — 26 de agosto de 2026. Cifras y fechas son
          declaraciones de la conversación, no compromisos confirmados por
          escrito.
        </p>
      </footer>
    </main>
  );
}
