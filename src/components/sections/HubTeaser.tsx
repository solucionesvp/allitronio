"use client";

// ── Hub teaser — cierre narrativo del home ───────────────────────────────────
// Estático (sin formulario aquí — eso vive en /hub). Fotos vía PhotoFrame:
// se ven en cuanto Lups coloque los archivos en las rutas de config/assets.ts.

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { HUB, BRAND_ALLI } from "@/config/assets";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function HubTeaser() {
  return (
    <section
      id="hub"
      className="relative w-full overflow-hidden bg-allitron-base px-8 py-28 lg:px-16 xl:px-24"
    >
      {/* Ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 45% at 15% 15%, rgba(9,175,242,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Text */}
        <div className="max-w-[520px]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-allitron-blue"
          >
            HUB · TEPIC, NAYARIT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="font-display font-black leading-[0.92] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            DONDE EL TALENTO
            <br />
            SE CONECTA.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mt-6 font-body text-[0.9rem] leading-[1.85] text-muted"
          >
            Un espacio para tecnólogos, empresas y talento de Nayarit.
            Regístrate, postula tu proyecto o conecta con quien puede llevarlo
            más lejos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
            className="mt-10"
          >
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 border border-white/[0.12] px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-all duration-300 hover:border-allitron-blue/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue"
            >
              CONOCER EL HUB
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>

        {/* Photo grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="relative grid grid-cols-2 gap-3 sm:gap-4"
        >
          <PhotoFrame
            src={HUB.interiorWide}
            alt="Interior del Hub Allitron"
            aspect="aspect-[4/5]"
            className="col-span-1 row-span-2"
          />
          <PhotoFrame src={HUB.workSession} alt="Sesión de trabajo en el Hub" aspect="aspect-[4/3]" />
          <PhotoFrame src={HUB.event} alt="Evento en el Hub Allitron" aspect="aspect-[4/3]" />

          {/* Alli — ghost/decorativo, aparición sutil */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -right-6 w-24 sm:w-28"
          >
            <OptionalImage
              src={BRAND_ALLI.monochrome}
              alt=""
              className="w-full opacity-40"
              fallback={null}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
