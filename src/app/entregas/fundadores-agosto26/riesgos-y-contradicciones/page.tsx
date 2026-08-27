"use client";

import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, RiskList, PageNav } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const RIESGOS = [
  {
    titulo: "Marca Google — el mayor riesgo reputacional y legal",
    texto:
      "Área: legal / marca. El equipo habla a veces como si la presencia de Google en el evento estuviera asegurada; documentalmente solo hay contactos y conversaciones con Hash (empleado directo de Google) y David (Google Partner externo, no empleado). Mitigación: cualquier uso de nombre, logo, anuncio o frase “Google estará” necesita autorización escrita y alcance exacto antes de publicarse. No anunciar nada hasta tenerla.",
    critico: true,
  },
  {
    titulo: "Evento antes que producto",
    texto:
      "Área: comercial / operativo. Gastar en producción del evento sin oferta, embudo y seguimiento comercial puede dejar solo visibilidad temporal, sin negocio real después. Mitigación: validar y vender en paralelo al piloto del evento — septiembre y octubre como ventana de validación, no esperar a noviembre.",
  },
  {
    titulo: "Equity prematuro",
    texto:
      "Área: societario / legal. Se discuten porcentajes de propiedad sin valoración, vesting ni aportaciones medibles. Mitigación: no repartir acciones todavía — medir aportaciones reales (dinero, tiempo, contactos, ventas, ejecución) y cerrar un acuerdo de fundadores antes de comprometer propiedad.",
  },
  {
    titulo: "Propiedad intelectual mezclada",
    texto:
      "Área: legal / IP. Los productos de José Guadalupe/Lázaro (LAZUP, MAPS 2.0, Segundo Cerebro) no pasan automáticamente a ser propiedad de Allitron por el solo hecho de mencionarse en la reunión. Mitigación: cualquier transferencia o licencia de estos activos requiere acuerdo escrito explícito.",
  },
  {
    titulo: "Clientes relacionados sin contrato",
    texto:
      "Área: comercial / gobierno corporativo. BP, IBS e Isuzu están vinculados a Alejandro/familia, pero se mencionan como si ya fueran cuentas de Allitron. Mitigación: tratarlos como intención, no como adjudicación — requieren alcance, precio y contrato transparentes antes de contarlos como clientes formales.",
  },
  {
    titulo: "Conflictos de tiempo y dinero",
    texto:
      "Área: operativo. Los tres participantes tienen otros proyectos (José Guadalupe expresó límites de dinero, tiempo y atención); no hay disponibilidad mínima acordada por persona. Mitigación: definir cuánto tiempo/semana compromete cada quien antes de fijar plazos de ejecución.",
  },
  {
    titulo: "Sede y fecha del evento no confirmadas",
    texto:
      "Área: evento / operativo. El 80% de certeza que expresa Alejandro sobre el recinto no equivale a una reserva confirmada. Mitigación: no comunicar el evento como confirmado hacia afuera hasta tener carta/correo de sede y alcance por escrito.",
  },
  {
    titulo: "Presupuesto del evento inexistente",
    texto:
      "Área: financiero. No quedó un estado de resultados del evento ni una fuente de capital definida (renta, producción, operadores, luz, sonido, patrocinadores, boletaje). Mitigación: construir el presupuesto antes de comprometer fecha o comunicación pública.",
  },
  {
    titulo: "Metas de ventas hipotéticas",
    texto:
      "Área: comercial. Las cifras mencionadas (por ejemplo, 20 clientes a $9,500 o escenarios de 100 clientes) son cálculos de conversación, no proyecciones aprobadas ni forecast validado. Mitigación: no usarlas en ningún material externo hasta tener ventas reales que las respalden.",
  },
  {
    titulo: "Lenguaje de roles variable",
    texto:
      "Área: gobierno interno. Fundador, socio, líder, vendedor y responsable se mezclan sin definición formal de gobierno. Mitigación: fijar roles, facultades y cadena de decisión como parte del acuerdo de fundadores, no dejarlo implícito.",
  },
];

export default function RiesgosPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/fundadores-agosto26" hubLabel="Hub" current="Riesgos y contradicciones" />
      <section className="relative flex min-h-[46svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 15% 15%, rgba(242,135,76,0.12) 0%, transparent 60%)",
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
            10 PUNTOS QUE NO DEBEN DARSE POR RESUELTOS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
          >
            Riesgos y contradicciones,
            <br />
            con área afectada y mitigación.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[660px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            Ninguno de estos bloquea el proyecto por sí solo, pero tratarlos
            como resueltos sin evidencia sí puede generar un problema legal,
            comercial o reputacional real.
          </motion.p>
        </div>
      </section>

      <SectionShell>
        <Eyebrow>RIESGOS Y CONTRADICCIONES</Eyebrow>
        <RiskList items={RIESGOS} />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/fundadores-agosto26"
          backLabel="Volver al hub"
          nextHref="/entregas/fundadores-agosto26/capital-y-estructura"
          nextLabel="Siguiente: capital y estructura"
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
