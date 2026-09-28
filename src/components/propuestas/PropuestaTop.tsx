"use client";

// ── PropuestaNav + PropuestaTop ──────────────────────────────────────────
// Barra fija de lectura, como en un libro digital: casita al inicio,
// círculos 1·2·3·4·5·6 (leídas en azul, actual en naranja, pendientes en
// gris) y una línea que se llena conforme se baja por la página.
// PropuestaTop = barra + título + escena de Alli como hero (su globo
// explica la página; ya no hay subtítulo ni "Parte X de 6").

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Home, Check, ArrowRight } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { AlliEscena } from "@/components/propuestas/AlliEscena";
import type { EscenaAlli } from "@/config/propuestas";
import type { PasosPropuesta } from "@/content/propuestas/pasos";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function PropuestaNav({ pasos, paso }: { pasos: PasosPropuesta; paso: number }) {
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <div className="sticky top-0 z-40 w-full bg-[var(--color-light)]/90 backdrop-blur-md">
      <nav aria-label="Páginas de la propuesta" className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 py-3 sm:px-10">
        <Link
          href={pasos.hub}
          aria-label="Volver al inicio de la propuesta"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
            paso === 0 ? "bg-allitron-orange text-white" : "bg-[#101820]/[0.06] text-[#101820] hover:bg-allitron-blue hover:text-white"
          }`}
        >
          <Home size={18} />
        </Link>
        <ol className="flex items-center gap-1.5 sm:gap-2.5">
          {pasos.pasos.map((p, i) => {
            const n = i + 1;
            const leida = n < paso;
            const actual = n === paso;
            return (
              <li key={p.href} className="flex items-center">
                <Link
                  href={p.href}
                  title={p.label}
                  aria-label={`${n}. ${p.label}${actual ? " (estás aquí)" : ""}`}
                  aria-current={actual ? "page" : undefined}
                  className={`flex items-center justify-center rounded-full font-display font-bold transition-all ${
                    actual
                      ? "h-10 w-10 bg-allitron-orange text-[1rem] text-white shadow-[0_6px_16px_rgba(242,135,76,0.35)]"
                      : leida
                        ? "h-8 w-8 bg-allitron-blue text-[0.85rem] text-white"
                        : "h-8 w-8 border-2 border-[#101820]/15 bg-white text-[0.85rem] text-[#101820]/60"
                  }`}
                >
                  {leida ? <Check size={15} strokeWidth={3} /> : n}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="h-[4px] w-full bg-[#101820]/[0.06]">
        <motion.div className="h-full origin-left bg-allitron-blue" style={{ scaleX: progreso }} />
      </div>
    </div>
  );
}

export function PropuestaTop({
  pasos,
  paso,
  titulo,
  escena,
  mensaje,
}: {
  pasos: PasosPropuesta;
  paso: number;
  titulo: React.ReactNode;
  escena: EscenaAlli;
  mensaje: string;
}) {
  return (
    <>
      <PropuestaNav pasos={pasos} paso={paso} />
      <section className="relative w-full bg-[var(--color-light)] px-6 pb-4 pt-8 sm:px-10 sm:pt-12 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1120px]">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 font-display font-black leading-[1.15] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)" }}
          >
            {titulo}
          </motion.h1>
        </div>
        <AlliEscena escena={escena} mensaje={mensaje} prioridad hero />
      </section>
    </>
  );
}

// ── PropuestaPortada — hero del inicio (hub) de una propuesta ────────────
// Orden pensado para quien abre desde WhatsApp: marca y para quién es →
// título → Alli (su globo dice cómo leer) → un solo botón grande para
// empezar. Las tarjetas de cada parte quedan debajo como índice.
export function PropuestaPortada({
  pasos,
  para,
  titulo,
  mensaje,
  empezar = "Empezar a leer",
}: {
  pasos: PasosPropuesta;
  para: string;
  titulo: React.ReactNode;
  mensaje: string;
  empezar?: string;
}) {
  return (
    <>
      <PropuestaNav pasos={pasos} paso={0} />
      <section className="relative w-full bg-[var(--color-light)] px-6 pb-6 pt-8 sm:px-10 sm:pt-12 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <OptionalImage
              src={BRAND_LOGO.dark}
              alt="Allitron"
              style={{ height: 22, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-[#101820]">ALLITRON</span>}
            />
            <span aria-hidden="true" className="hidden h-4 w-px bg-[#101820]/20 sm:block" />
            <span className="w-full font-body text-[1rem] text-secondary sm:w-auto">{para}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mb-8 max-w-[860px] font-display font-black leading-[1.12] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(2.2rem, 5.2vw, 3.6rem)" }}
          >
            {titulo}
          </motion.h1>
        </div>
        <AlliEscena escena="portada" mensaje={mensaje} prioridad hero />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          className="mx-auto mt-8 flex max-w-[1120px] justify-center"
        >
          <Link
            href={pasos.pasos[0].href}
            className="flex min-h-[64px] w-full max-w-[420px] items-center justify-center gap-3 rounded-[18px] bg-allitron-blue px-8 py-4 font-display text-[1.15rem] font-bold text-white shadow-[0_12px_28px_rgba(9,175,242,0.32)] transition-transform active:scale-[0.98]"
          >
            {empezar}
            <ArrowRight size={24} />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
