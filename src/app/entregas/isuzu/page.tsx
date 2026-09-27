"use client";

// ── Hub de entrega — Propuesta Isuzu (Ecocamiones del Noroeste) ─────────
// Lector principal: Ing. Alejandro Valdés (80 años), abre desde WhatsApp.
// Por eso: 6 piezas en orden de lectura, numeradas, con una instrucción
// explícita de cómo leer, y cada documento termina con un botón grande
// "Siguiente". Nivel de exposición: cliente externo (sin costos internos).

import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, ICONS_CONTENIDO } from "@/config/assets";
import AlliGuide from "@/components/brand/AlliGuide";
import { EASE, SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

export default function HubIsuzuPage() {
  return (
    <main className="relative overflow-x-clip bg-[var(--color-light)]">
      <section className="relative flex min-h-[56svh] flex-col justify-center overflow-hidden px-6 pb-12 pt-24 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 85% 15%, rgba(9,175,242,0.12) 0%, transparent 60%)",
          }}
        />
        <AlliGuide side="right" size={96} className="top-24 hidden sm:block" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 flex items-center"
          >
            <OptionalImage
              src={BRAND_LOGO.dark}
              alt="Allitron"
              style={{ height: 26, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-[#101820]">ALLITRON</span>}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.78rem] font-semibold tracking-[0.3em] text-allitron-blue"
          >
            PROPUESTA · ISUZU TEPIC · CULIACÁN · MAZATLÁN · LA PAZ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 max-w-[820px] font-display font-black leading-[1.15] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
          >
            Cuatro agencias.
            <br />
            Un solo camino para vender.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[640px] font-body text-[1.15rem] leading-[1.8] text-secondary sm:text-[1.25rem]"
          >
            Son seis partes cortas. Empiece por la carta. Al terminar cada parte encontrará un botón azul que lo lleva a la siguiente.
          </motion.p>
        </div>
      </section>

      <SectionShell className="!pt-4">
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
