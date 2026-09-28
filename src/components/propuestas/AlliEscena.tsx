/* eslint-disable @next/next/no-img-element */
"use client";

// ── AlliEscena — Alli "guía" cada parte de una propuesta ─────────────────
// Foto de Alli en un entorno real + su frase de la sección en un globo.
// srcSet 800/1600 en WebP y carga diferida: pesa ~30 KB en celular.
// Se usa en cualquier propuesta: solo cambian `escena` y `mensaje`.

import { motion, useReducedMotion } from "framer-motion";
import { ALLI_AVATAR, ALLI_ESCENAS, type EscenaAlli } from "@/config/propuestas";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function AlliEscena({
  escena,
  mensaje,
  prioridad = false,
  hero = false,
}: {
  escena: EscenaAlli;
  mensaje: string;
  /** true solo si la escena está arriba del pliegue (portada del hub). */
  prioridad?: boolean;
  /** true en la parte de arriba de la página: más panorámica en escritorio para que título, Alli y botón quepan en la primera pantalla. */
  hero?: boolean;
}) {
  const e = ALLI_ESCENAS[escena];
  const reduced = useReducedMotion() ?? false;

  return (
    <figure className="relative mx-auto w-full max-w-[1120px]">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`relative isolate aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,24,32,0.18)] sm:aspect-[16/9] ${hero ? "lg:aspect-[21/9]" : ""}`}
      >
        <motion.img
          src={e.sm}
          srcSet={`${e.sm} 800w, ${e.lg} 1600w`}
          sizes="(min-width: 1200px) 1120px, 100vw"
          alt={e.alt}
          width={1600}
          height={893}
          loading={prioridad ? "eager" : "lazy"}
          decoding="async"
          initial={reduced ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: e.foco }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(16,24,32,0.55), transparent)" }} />
      </motion.div>

      <motion.figcaption
        initial={reduced ? false : { opacity: 0, y: 12, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
        className="relative z-10 mx-4 -mt-14 flex items-start gap-3 rounded-[22px] bg-white p-4 shadow-[0_14px_36px_rgba(16,24,32,0.16)] sm:mx-10 sm:-mt-16 sm:max-w-[640px] sm:p-5"
      >
        <img
          src={ALLI_AVATAR.sm}
          alt=""
          width={52}
          height={52}
          loading="lazy"
          decoding="async"
          className="h-[52px] w-[52px] shrink-0 rounded-full object-cover ring-2 ring-allitron-blue/30"
        />
        <div className="min-w-0 [overflow-wrap:anywhere]">
          <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.14em] text-allitron-blue">Alli</p>
          <p className="mt-0.5 font-body text-[1.08rem] leading-[1.55] text-[#101820] sm:text-[1.15rem]">{mensaje}</p>
        </div>
      </motion.figcaption>
    </figure>
  );
}
