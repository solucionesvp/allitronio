"use client";

// ── Hub de entrega — Propuesta IBS (Innovación Blue Sky) · Shineray ─────
// Lector principal: Ing. José Talavera del Río, director de IBS. La envía
// Alejandro Valdés por WhatsApp. Tratamiento: usted. 6 piezas en orden de
// lectura + preguntas con Alli. Nivel de exposición: cliente externo.
// Slug "ibs" (no "shineray-…"): /entregas/shineray ya es otro scope.

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaPortada } from "@/components/propuestas/PropuestaTop";
import { ICONS_CONTENIDO } from "@/config/assets";
import { SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

const B = "/entregas/ibs";

export default function HubIbsPage() {
  return (
    <main className="relative overflow-x-clip bg-[var(--color-light)]">
      <PropuestaPortada
        pasos={PASOS_IBS}
        para="Propuesta para el grupo IBS · Tepic, Puerto Vallarta y Guadalajara"
        titulo=<>No ser “el Shineray de Tepic”. <br /> Ser el grupo de referencia.</>
        mensaje="Buen día, Ingeniero, soy Alli. Son seis partes cortas: empiece por la carta y, al terminar cada una, le llevo a la siguiente."
        empezar="Empezar por la carta"
      />

      <SectionShell className="!pt-4">
        <p className="mb-6 font-display text-[1.15rem] font-bold text-[#101820]">O elija directo la parte que quiera ver:</p>
        <div className="grid auto-rows-[minmax(190px,auto)] gap-5 sm:grid-cols-2">
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title="1 · Una carta para usted"
            subtitle="Lo que ya lograron, lo que encontramos y por qué ahora es el momento de crear marca."
            size="protagonist"
            kind="documento"
            href={`${B}/carta`}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.imagen}
            title="2 · Lo que vimos"
            subtitle="Cómo encuentra hoy un cliente a Shineray en Tepic y en Vallarta, y quién está enfrente."
            kind="documento"
            href={`${B}/lo-que-vimos`}
            delay={0.05}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.presentacion}
            title="3 · El plan"
            subtitle="Ordenar y vender al mismo tiempo, dentro de los lineamientos de Shineray México."
            kind="documento"
            href={`${B}/plan`}
            delay={0.1}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.link}
            title="4 · La marca del grupo"
            subtitle="Tres nombres para que ustedes elijan, qué significan y cómo se verían."
            kind="documento"
            href={`${B}/marca`}
            delay={0.15}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.presentacion}
            title="5 · Las primeras 6 semanas"
            subtitle="Semana por semana, del arranque a los anuncios encendidos en noviembre."
            kind="documento"
            href={`${B}/primeras-semanas`}
            delay={0.2}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.pdf}
            title="6 · Cuánto cuesta"
            subtitle="Seis meses de trabajo, en un solo pago mensual."
            kind="documento"
            href={`${B}/cotizacion`}
            delay={0.25}
          />
          <BentoTile icon={ICONS_CONTENIDO.link} title="7 · Pregúntele a Alli" subtitle="Las dudas más comunes, respondidas por Alli." kind="documento" href={`${B}/cotizacion#preguntas`} delay={0.3} />
        </div>
      </SectionShell>

      <footer className="border-t border-[#101820]/10 px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-secondary">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
