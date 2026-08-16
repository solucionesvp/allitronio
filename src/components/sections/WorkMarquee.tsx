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
  { src: PRODUCT_ALLITRON90.hero, alt: "Allitron 90" },
  { src: PRODUCT_ALLITRON90.diagnostic, alt: "Allitron 90 — diagnóstico" },
  { src: PRODUCT_ALLITRON90.roadmap, alt: "Allitron 90 — roadmap" },
  { src: PRODUCT_LOCAL.hero, alt: "Domina Google" },
  { src: PRODUCT_LOCAL.analysis, alt: "Domina Google — análisis" },
  { src: PRODUCT_LOCAL.build, alt: "Domina Google — construcción" },
  { src: PRODUCT_LOCAL.result, alt: "Domina Google — resultado" },
  { src: PRODUCT_SECOND_BRAIN.hero, alt: "Segundo Cerebro" },
  { src: PRODUCT_SECOND_BRAIN.telegram, alt: "Segundo Cerebro — Telegram" },
  { src: PRODUCT_SECOND_BRAIN.vault, alt: "Segundo Cerebro — vault" },
  { src: PRODUCT_LAZUP.hero, alt: "LAZUP" },
  { src: PRODUCT_LAZUP.conversations, alt: "LAZUP — conversaciones" },
  { src: PRODUCT_LAZUP.crm, alt: "LAZUP — CRM" },
  { src: PRODUCT_LAZUP.appointments, alt: "LAZUP — citas" },
  { src: HUB.exterior, alt: "Hub Allitron — exterior" },
  { src: HUB.interiorWide, alt: "Hub Allitron — interior" },
  { src: HUB.interior01, alt: "Hub Allitron — detalle" },
  { src: HUB.interior02, alt: "Hub Allitron — detalle" },
  { src: HUB.workSession, alt: "Hub Allitron — sesión de trabajo" },
  { src: HUB.event, alt: "Hub Allitron — evento" },
  { src: HUB.detail, alt: "Hub Allitron — arquitectura" },
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

        <ScrollRevealText
          text="Cuatro productos, un hub de talento y un evento que apenas empieza — infraestructura real para negocios reales en Nayarit."
          className="mx-auto font-display font-bold leading-[1.3] text-foreground text-[clamp(1.3rem,3vw,2.1rem)]"
        />
      </div>

      <MarqueeGallery images={GALLERY_IMAGES} />
    </section>
  );
}
