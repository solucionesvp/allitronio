"use client";

// ── Hub de entrega — Propuesta Vie Saine (Elizabeth Montero · Rehabilitación Física, Tepic) ──
// Cliente externo (sin costos internos). 6 piezas en orden de lectura, cada
// documento termina con botón "Siguiente". Mobile-first: se abre desde WhatsApp.

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaPortada } from "@/components/propuestas/PropuestaTop";
import { ICONS_CONTENIDO } from "@/config/assets";
import { SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

const B = "/entregas/viesaine";

export default function HubVieSainePage() {
  return (
    <main className="relative overflow-x-clip bg-[var(--color-light)]">
      <PropuestaPortada
        pasos={PASOS_VIESAINE}
        para="Propuesta para Vie Saine · Elizabeth Montero"
        titulo=<>Años ayudando a la gente a moverse. <br /> Ahora, que más pacientes las encuentren.</>
        mensaje="Hola, soy Alli. Son seis partes cortas: empiecen por la carta y, al terminar cada una, las llevo a la siguiente."
        empezar="Empezar por la carta"
      />

      <SectionShell className="!pt-4">
        <p className="mb-6 font-display text-[1.15rem] font-bold text-[#101820]">O elijan directo la parte que quieran ver:</p>
        <div className="grid auto-rows-[minmax(190px,auto)] gap-5 sm:grid-cols-2">
          <BentoTile icon={ICONS_CONTENIDO.documento} title="1 · Una carta para ustedes" subtitle="Lo que vimos de su trabajo y por qué creemos que puede crecer mucho." size="protagonist" kind="documento" href={`${B}/carta`} />
          <BentoTile icon={ICONS_CONTENIDO.imagen} title="2 · Lo que vimos" subtitle="Sus redes, su ficha de Google, el tema COFEPRIS y las clínicas con las que hoy compiten." kind="documento" href={`${B}/lo-que-vimos`} delay={0.05} />
          <BentoTile icon={ICONS_CONTENIDO.presentacion} title="3 · El plan" subtitle="Una campaña para traer pacientes y una agenda que se confirma sola." kind="documento" href={`${B}/plan`} delay={0.1} />
          <BentoTile icon={ICONS_CONTENIDO.link} title="4 · Los objetivos" subtitle="Qué vamos a medir y a dónde queremos llegar." kind="documento" href={`${B}/objetivos`} delay={0.15} />
          <BentoTile icon={ICONS_CONTENIDO.presentacion} title="5 · Las primeras 4 semanas" subtitle="Semana por semana, hasta tener anuncios y recordatorios funcionando." kind="documento" href={`${B}/primeras-semanas`} delay={0.2} />
          <BentoTile icon={ICONS_CONTENIDO.pdf} title="6 · Cuánto cuesta" subtitle="Dos opciones: de octubre a enero, o 6 meses con página web incluida." kind="documento" href={`${B}/cotizacion`} delay={0.25} />
          <BentoTile icon={ICONS_CONTENIDO.link} title="7 · Pregúntenle a Alli" subtitle="Las dudas más comunes, respondidas por Alli." kind="documento" href="/entregas/viesaine/cotizacion#preguntas" delay={0.3} />
        </div>
      </SectionShell>

      <footer className="border-t border-[#101820]/10 px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-secondary">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
