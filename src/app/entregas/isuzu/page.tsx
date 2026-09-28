"use client";

// ── Hub de entrega — Propuesta Isuzu (Ecocamiones del Noroeste) ─────────
// Lector principal: Ing. Alejandro Valdés (80 años), abre desde WhatsApp.
// Por eso: 6 piezas en orden de lectura, numeradas, con una instrucción
// explícita de cómo leer, y cada documento termina con un botón grande
// "Siguiente". Nivel de exposición: cliente externo (sin costos internos).

import { PASOS_ISUZU } from "@/content/propuestas/pasos";
import { PropuestaPortada } from "@/components/propuestas/PropuestaTop";
import { ICONS_CONTENIDO } from "@/config/assets";
import { SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

export default function HubIsuzuPage() {
  return (
    <main className="relative overflow-x-clip bg-[var(--color-light)]">
      <PropuestaPortada
        pasos={PASOS_ISUZU}
        para="Propuesta para Isuzu · Tepic, Culiacán, Mazatlán y La Paz"
        titulo=<>Cuatro agencias. <br /> Un solo camino para vender.</>
        mensaje="Buen día, soy Alli. Son seis partes cortas: empiece por la carta y, al terminar cada una, le llevo a la siguiente."
        empezar="Empezar por la carta"
      />

      <SectionShell className="!pt-4">
        <p className="mb-6 font-display text-[1.15rem] font-bold text-[#101820]">O elija directo la parte que quiera ver:</p>
        <div className="grid auto-rows-[minmax(190px,auto)] gap-5 sm:grid-cols-2">
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title="1 · Una carta para usted"
            subtitle="Gracias por abrirnos la puerta. Lo que encontramos, en pocas palabras."
            size="protagonist"
            kind="documento"
            href="/entregas/isuzu/carta"
          />
          <BentoTile
            icon={ICONS_CONTENIDO.imagen}
            title="2 · Lo que vimos"
            subtitle="Cómo se ve Isuzu hoy en cada ciudad, y quién está compitiendo por sus clientes."
            kind="documento"
            href="/entregas/isuzu/lo-que-vimos"
            delay={0.05}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.presentacion}
            title="3 · El plan: Fase 0 y Fase 1"
            subtitle="Qué haremos, en qué orden y para qué. Primero vender en noviembre, diciembre y enero."
            kind="documento"
            href="/entregas/isuzu/plan"
            delay={0.1}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.link}
            title="4 · A dónde queremos llegar"
            subtitle="La meta en una sola gráfica: triplicar en el primer trimestre, quintuplicar en el segundo."
            kind="documento"
            href="/entregas/isuzu/meta"
            delay={0.15}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.presentacion}
            title="5 · Las primeras 6 semanas"
            subtitle="Semana por semana, del arranque a los anuncios encendidos el 2 de noviembre."
            kind="documento"
            href="/entregas/isuzu/primeras-semanas"
            delay={0.2}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.pdf}
            title="6 · Cuánto cuesta"
            subtitle="Dos formas de trabajar juntos: todo junto o por bloques."
            kind="documento"
            href="/entregas/isuzu/cotizacion"
            delay={0.25}
          />
          <BentoTile icon={ICONS_CONTENIDO.link} title="7 · Pregúntele a Alli" subtitle="Las dudas más comunes, respondidas por Alli." kind="documento" href="/entregas/isuzu/cotizacion#preguntas" delay={0.3} />
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
