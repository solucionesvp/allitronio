"use client";

import { Eye, MessageCircle, Target, BadgeCheck, CircleAlert } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";
import { DocHero, BigText, SectionTitle, IconPoint, Highlight, GrowthChart, BigPageNav } from "@/components/entregas/isuzu/IsuzuUI";

const HOY = [
  "Datos distintos en cada sitio de internet.",
  "Pocos prospectos buenos; muchos solo preguntan el precio.",
  "Respuesta lenta y seguimiento a mano.",
  "Pocas ventas que se puedan rastrear a su origen.",
];

const MEDIMOS = [
  { icon: Eye, title: "Que los encuentren", text: "Vistas, llamadas y rutas desde Google Maps en cada agencia." },
  { icon: MessageCircle, title: "Que les escriban", text: "Mensajes de WhatsApp y formularios, por ciudad y por modelo." },
  { icon: Target, title: "Que sean buenos prospectos", text: "Cuántos de esos mensajes vienen de alguien que sí piensa comprar." },
  { icon: BadgeCheck, title: "Que se venda", text: "Citas, cotizaciones y ventas que salen de ese trabajo." },
];

export default function MetaIsuzuPage() {
  return (
    <main className="bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/isuzu" hubLabel="Inicio" current="A dónde queremos llegar" />

      <DocHero
        eyebrow="PARTE 4 DE 6"
        title={<>A dónde queremos llegar.</>}
        subtitle="La meta, en una sola gráfica."
        logo={
          <OptionalImage
            src={BRAND_LOGO.light}
            alt="Allitron"
            style={{ height: 26, width: "auto" }}
            fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>}
          />
        }
      />

      {/* Hoy */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo están hoy">Una comunicación que trabaja, pero no vende.</SectionTitle>
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
      </SectionShell>

      {/* Gráfica */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La meta">Triplicar en el primer trimestre. Quintuplicar en el segundo.</SectionTitle>
        <GrowthChart
          bars={[
            { label: "Hoy", sub: "El punto de partida", value: 100, tag: "100%", tone: "gray" },
            { label: "Fin de Fase 0", sub: "Enero 2027 · 3 veces más", value: 300, tag: "300%", tone: "blue" },
            { label: "Fin de Fase 1", sub: "Abril 2027 · 5 veces más", value: 500, tag: "500%", tone: "orange" },
          ]}
        />
        <div className="mt-8">
          <BigText>
            La gráfica mide la fuerza de su comunicación: cuánta gente los encuentra, cuánta les escribe y cuántos de esos prospectos son buenos. El punto de partida exacto lo medimos en las primeras dos semanas, con los accesos reales. Desde ahí contamos.
          </BigText>
        </div>
      </SectionShell>

      {/* Qué medimos */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo lo vamos a medir">Cuatro números, cada mes, por agencia.</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {MEDIMOS.map((m, i) => (
            <IconPoint key={m.title} icon={m.icon} title={m.title} text={m.text} tone={i === 3 ? "orange" : "blue"} delay={0.04 * i} />
          ))}
        </div>
        <div className="mt-10">
          <Highlight>Menos prospectos que solo preguntan el precio. Más clientes que llegan listos para comprar.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/isuzu" nextHref="/entregas/isuzu/primeras-semanas" nextLabel="Siguiente: Las primeras 6 semanas" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
