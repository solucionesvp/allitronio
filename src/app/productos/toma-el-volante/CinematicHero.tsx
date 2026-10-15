"use client";

// ── Acto 1 · El hero ─────────────────────────────────────────────────────────
// Intención: reconocimiento. Una concesionaria real al caer la noche; el titular
// (HTML, no imagen) nombra el problema. Dos CTAs: diagnóstico y "cómo funciona".

import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { VOLANTE_CTA_LABEL, VOLANTE_CTA_SECONDARY, VOLANTE_HERO } from "@/data/tomaElVolanteContent";
import { trackLandingEvent } from "@/lib/landingEvents";
import { ACCENT, CtaButton, GhostLink, reveal, SECTION_X, TOMA_EL_VOLANTE_ACCENT_SOFT } from "./ui";
import { ResponsiveCinematicImage } from "./ResponsiveCinematicImage";

export default function CinematicHero({ onPrimary }: { onPrimary: () => void }) {
  // null = aún sin saber; true/false = resultado de la carga. El respaldo
  // (solo un resplandor ámbar, sin personajes) aparece cuando AMBAS fotos fallaron.
  const [desktopOk, setDesktopOk] = useState<boolean | null>(null);
  const [movilOk, setMovilOk] = useState<boolean | null>(null);
  const noPhoto = desktopOk === false && movilOk === false;

  return (
    <section
      aria-labelledby="hero-title"
      className={`relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-allitron-base pb-0 pt-24 md:justify-center md:pb-16 md:pt-28 ${SECTION_X}`}
    >
      {/* Escritorio: foto de fondo con movimiento lento de cámara (solo transform) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        initial={{ scale: 1 }}
        animate={{ scale: 1.045 }}
        transition={{ duration: 24, ease: "linear" }}
      >
        <ResponsiveCinematicImage
          base={IMG.heroDesktop}
          ratio="auto"
          className="!aspect-auto h-full w-full"
          imgClassName="object-[72%_62%]"
          priority
          sizes="100vw"
          onStatusChange={setDesktopOk}
        />
      </motion.div>
      {desktopOk === true && (
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.92) 0%, rgba(16,24,32,0.66) 34%, rgba(16,24,32,0.14) 58%, rgba(16,24,32,0) 68%), linear-gradient(0deg, rgba(16,24,32,0.7) 0%, rgba(16,24,32,0) 28%)" }}
        />
      )}
      {noPhoto && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 60% at 80% 20%, ${TOMA_EL_VOLANTE_ACCENT_SOFT} 0%, transparent 62%)` }}
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="max-w-[680px]">
          <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.6rem] font-bold tracking-[0.34em]" style={{ color: ACCENT }}>
            {VOLANTE_HERO.eyebrow}
          </motion.span>
          <motion.h1
            id="hero-title"
            {...reveal(0.05)}
            className="font-display font-black leading-[0.97] tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.9rem, 4.6vw, 3.9rem)", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            LLEGAN MENSAJES.
            <br />
            SE ENFRÍAN.
            <br />
            <span style={{ color: ACCENT }}>Y LA VENTA SE LA LLEVA LA AGENCIA DE ENFRENTE.</span>
          </motion.h1>
          <motion.p
            {...reveal(0.15)}
            className="mt-6 max-w-[540px] font-body text-[1rem] leading-[1.7] text-foreground/88"
            style={{ textShadow: "0 1px 14px rgba(0,0,0,0.6)" }}
          >
            {VOLANTE_HERO.body}
          </motion.p>
          <motion.div {...reveal(0.25)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton
              label={VOLANTE_CTA_LABEL}
              onClick={() => {
                trackLandingEvent("hero_cta_click", { section: "hero" });
                onPrimary();
              }}
            />
            <GhostLink label={VOLANTE_CTA_SECONDARY} href="#sistema" onClick={() => trackLandingEvent("hero_cta_click", { section: "hero", cta: "secundario" })} />
          </motion.div>
          <motion.p {...reveal(0.32)} className="mt-6 max-w-[520px] font-body text-[0.78rem] leading-[1.6] text-foreground/75">
            {VOLANTE_HERO.note}
          </motion.p>
        </div>
      </div>

      {/* Móvil: la foto vertical va DEBAJO del texto (en flujo) para que nunca se encime con el titular, los CTA o la nota */}
      <div aria-hidden="true" className="relative z-0 -mx-6 mt-8 sm:-mx-10 md:hidden">
        <ResponsiveCinematicImage
          base={IMG.heroMovil}
          ratio="1792 / 2400"
          priority
          sizes="100vw"
          onStatusChange={setMovilOk}
        />
        {movilOk === true && (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, #101820 0%, rgba(16,24,32,0.55) 14%, rgba(16,24,32,0) 32%)" }}
          />
        )}
      </div>

    </section>
  );
}
