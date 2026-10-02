"use client";

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { Eye, MessageCircle, Truck, BadgeCheck, CircleAlert, Timer } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const HOY = [
  "Shineray Tepic y Puerto Vallarta no aparecen en Google Maps.",
  "La página de la agencia tiene 59 seguidores y ningún dato de contacto.",
  "Los prospectos llegan por distintos lados y no quedan registrados.",
  "No hay un número mensual de pruebas de manejo ni de ventas por origen.",
];

const MEDIMOS = [
  { icon: Eye, title: "Que los encuentren", text: "Vistas, llamadas y rutas desde Google Maps en cada plaza, y visitas a la web." },
  { icon: MessageCircle, title: "Que les escriban", text: "Mensajes de WhatsApp y formularios, por plaza, por modelo y por oficio." },
  { icon: Timer, title: "Que se responda rápido", text: "Cuánto tarda el equipo en contestar a cada prospecto en horario de trabajo." },
  { icon: Truck, title: "Que se suban a la unidad", text: "Citas, pruebas de manejo y demostraciones que salen de ese trabajo." },
  { icon: BadgeCheck, title: "Que se venda", text: "Créditos en trámite, unidades vendidas y, si no, por qué no se cerró." },
];

// Niveles de distribuidor según la presentación oficial de Shineray para distribuidores.
const NIVELES = [
  { nivel: "Punto de venta", ritmo: "4 a 8 unidades al mes" },
  { nivel: "Satélite", ritmo: "8 a 10 unidades al mes" },
  { nivel: "Standard", ritmo: "15 a 20 unidades al mes" },
  { nivel: "Insignia", ritmo: "20 o más unidades al mes" },
];

export default function MetaIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={4} titulo=<>A dónde queremos llegar.</> escena="meta" mensaje="Esta es la meta. La medimos cada mes, con números claros." />

      {/* Hoy */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El punto de partida">Hoy casi nada se puede medir.</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {HOY.map((h, i) => (
            <Reveal key={h} delay={0.04 * i}>
              <div className="neu flex h-full items-start gap-4 rounded-[18px] p-5">
                <CircleAlert size={26} className="mt-0.5 shrink-0 text-allitron-orange" />
                <p className="font-body text-[1.1rem] leading-[1.6] text-[#101820]">{h}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <BigText>Por eso el primer trabajo es encender la medición. En las dos primeras semanas fijamos el punto de partida real y, desde ahí, contamos.</BigText>
        </div>
      </SectionShell>

      {/* Referencia Shineray */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La referencia que da Shineray">El ritmo que Shineray espera de sus distribuidores.</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {NIVELES.map((n, i) => (
            <Reveal key={n.nivel} delay={0.05 * i}>
              <div className={`h-full rounded-[20px] p-6 ${i === 0 ? "bg-allitron-navy" : "neu"}`}>
                <p className={`font-display text-[0.85rem] font-bold uppercase tracking-[0.12em] ${i === 0 ? "text-allitron-blue" : "text-allitron-navy"}`}>{n.nivel}</p>
                <p className={`mt-2 font-display text-[1.5rem] font-black ${i === 0 ? "text-white" : "text-[#101820]"}`}>{n.ritmo}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Highlight>Meta de trabajo: que cada plaza tenga, cada mes, los prospectos y las pruebas de manejo que necesita para sostener por lo menos el ritmo de un punto de venta Shineray.</Highlight>
        </div>
        <p className="mt-5 font-body text-[0.95rem] leading-[1.6] text-secondary">
          Es una meta para trabajar, no una promesa: la venta también depende del inventario, del crédito, del precio y de la atención de cada agencia. Fuente: presentación general de Shineray para distribuidores.
        </p>
      </SectionShell>

      {/* Qué medimos */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo lo vamos a medir">Cinco números, cada mes, por plaza.</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {MEDIMOS.map((m, i) => (
            <IconPoint key={m.title} icon={m.icon} title={m.title} text={m.text} tone={i === MEDIMOS.length - 1 ? "orange" : "blue"} delay={0.04 * i} />
          ))}
        </div>
        <div className="mt-10">
          <Highlight>Menos gente que solo pregunta el precio. Más clientes que llegan a manejar la unidad, listos para comprar.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/ibs" nextHref="/entregas/ibs/primeras-semanas" nextLabel="Siguiente: Las primeras 6 semanas" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
