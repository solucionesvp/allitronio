"use client";

// ── WorkMarquee — respiro entre Hero y Productos ─────────────────────────
// Adaptado de una referencia visual (marquee de scroll + texto letra por
// letra), reconstruido con nuestros propios assets: reutiliza las 21 fotos
// ya registradas de los 4 productos + Hub — cero assets nuevos requeridos.

import { motion } from "framer-motion";
import MarqueeGallery, { type MarqueeImage } from "@/components/effects/MarqueeGallery";
import ScrollRevealText from "@/components/effects/ScrollRevealText";
import {
  PRODUCT_ALLITRON90,
  PRODUCT_LOCAL,
  PRODUCT_SECOND_BRAIN,
  PRODUCT_LAZUP,
  HUB,
} from "@/config/assets";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const GALLERY_IMAGES: MarqueeImage[] = [
  { src: PRODUCT_ALLITRON90.hero, alt: "Allitron 90", theme: "product" },
  { src: PRODUCT_ALLITRON90.diagnostic, alt: "Allitron 90 — diagnóstico", theme: "analytics" },
  { src: PRODUCT_ALLITRON90.roadmap, alt: "Allitron 90 — roadmap", theme: "knowledge" },
  { src: PRODUCT_LOCAL.hero, alt: "Domina Google", theme: "analytics" },
  { src: PRODUCT_LOCAL.analysis, alt: "Domina Google — análisis", theme: "analytics" },
  { src: PRODUCT_LOCAL.build, alt: "Domina Google — construcción", theme: "product" },
  { src: PRODUCT_LOCAL.result, alt: "Domina Google — resultado", theme: "analytics" },
  { src: PRODUCT_SECOND_BRAIN.hero, alt: "Segundo Cerebro", theme: "knowledge" },
  { src: PRODUCT_SECOND_BRAIN.telegram, alt: "Segundo Cerebro — Telegram", theme: "app" },
  { src: PRODUCT_SECOND_BRAIN.vault, alt: "Segundo Cerebro — vault", theme: "knowledge" },
  { src: PRODUCT_LAZUP.hero, alt: "LAZUP", theme: "product" },
  { src: PRODUCT_LAZUP.conversations, alt: "LAZUP — conversaciones", theme: "app" },
  { src: PRODUCT_LAZUP.crm, alt: "LAZUP — CRM", theme: "product" },
  { src: PRODUCT_LAZUP.appointments, alt: "LAZUP — citas", theme: "product" },
  { src: HUB.exterior, alt: "Hub Allitron — exterior", theme: "spaceExterior" },
  { src: HUB.interiorWide, alt: "Hub Allitron — interior", theme: "spaceInterior" },
  { src: HUB.interior01, alt: "Hub Allitron — detalle", theme: "spaceInterior" },
  { src: HUB.interior02, alt: "Hub Allitron — detalle", theme: "spaceInterior" },
  { src: HUB.workSession, alt: "Hub Allitron — sesión de trabajo", theme: "workSession" },
  { src: HUB.event, alt: "Hub Allitron — evento", theme: "event" },
  { src: HUB.detail, alt: "Hub Allitron — arquitectura", theme: "spaceExterior" },
];

export default function WorkMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-allitron-base pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="mx-auto mb-14 max-w-[900px] px-8 text-center lg:px-16 xl:px-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-allitron-blue"
        >
          LO QUE CONSTRUIMOS
        </motion.span>

        {/* Misma tipografía y tratamiento que el resto de titulares del sitio:
            Montserrat (font-display) en peso black, mayúsculas y tracking
            cerrado — antes iba en peso bold y caja normal, y por eso se leía
            como una fuente distinta. */}
        <ScrollRevealText
          text="CUATRO PRODUCTOS, UN HUB DE TALENTO Y UN EVENTO QUE APENAS EMPIEZA."
          className="mx-auto font-display font-black uppercase leading-[1.05] tracking-tight text-foreground text-[clamp(1.6rem,4vw,3rem)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mx-auto mt-6 max-w-[520px] font-body text-[0.9rem] leading-[1.85] text-muted"
        >
          Infraestructura real para negocios reales en Nayarit.
        </motion.p>
      </div>

      <MarqueeGallery images={GALLERY_IMAGES} />
    </section>
  );
}
