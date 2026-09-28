"use client";

// ── Hub de entrega — Propuesta NutriMontse (Nutrióloga Montse Ibarra, Tepic) ──
// Cliente externo (sin costos internos). 6 piezas en orden de lectura, cada
// documento termina con botón "Siguiente". Mobile-first: se abre desde WhatsApp.

import { PASOS_NUTRIMONTSE } from "@/content/propuestas/pasos";
import { PropuestaPortada } from "@/components/propuestas/PropuestaTop";
import { ICONS_CONTENIDO } from "@/config/assets";
import { SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

const B = "/entregas/nutrimontse";

export default function HubNutriMontsePage() {
  return (
    <main className="relative overflow-x-clip bg-[var(--color-light)]">
      <PropuestaPortada
        pasos={PASOS_NUTRIMONTSE}
        para="Propuesta para Nutrióloga Montse Ibarra"
        titulo=<>Tu forma de trabajar ya es distinta. <br /> Ahora hay que llenar tu agenda.</>
        mensaje="Hola, soy Alli. Son seis partes cortas: empieza por la carta y, al terminar cada una, te llevo a la siguiente."
        empezar="Empezar por la carta"
      />

      <SectionShell className="!pt-4">
        <p className="mb-6 font-display text-[1.15rem] font-bold text-[#101820]">O elige directo la parte que quieras ver:</p>
        <div className="grid auto-rows-[minmax(190px,auto)] gap-5 sm:grid-cols-2">
          <BentoTile icon={ICONS_CONTENIDO.documento} title="1 · Una carta para ti" subtitle="Lo que vimos de tu trabajo y por qué creemos que puede crecer mucho." size="protagonist" kind="documento" href={`${B}/carta`} />
          <BentoTile icon={ICONS_CONTENIDO.imagen} title="2 · Lo que vimos" subtitle="Tus redes, tu ficha de Google y las nutriólogas con las que hoy compites en Tepic." kind="documento" href={`${B}/lo-que-vimos`} delay={0.05} />
          <BentoTile icon={ICONS_CONTENIDO.presentacion} title="3 · La campaña" subtitle="No es contenido por contenido: una oferta, un camino y un calendario para vender." kind="documento" href={`${B}/campana`} delay={0.1} />
          <BentoTile icon={ICONS_CONTENIDO.link} title="4 · Los objetivos" subtitle="Qué vamos a medir y a dónde queremos llegar en enero." kind="documento" href={`${B}/objetivos`} delay={0.15} />
          <BentoTile icon={ICONS_CONTENIDO.presentacion} title="5 · Las primeras 4 semanas" subtitle="Semana por semana, hasta tener los anuncios encendidos." kind="documento" href={`${B}/primeras-semanas`} delay={0.2} />
          <BentoTile icon={ICONS_CONTENIDO.pdf} title="6 · Cuánto cuesta" subtitle="Dos opciones: campaña de octubre a enero, o campaña de 6 meses." kind="documento" href={`${B}/cotizacion`} delay={0.25} />
          <BentoTile icon={ICONS_CONTENIDO.link} title="7 · Pregúntale a Alli" subtitle="Las dudas más comunes, respondidas por Alli." kind="documento" href="/entregas/nutrimontse/cotizacion#preguntas" delay={0.3} />
        </div>
      </SectionShell>

      <footer className="border-t border-[#101820]/10 px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-secondary">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
