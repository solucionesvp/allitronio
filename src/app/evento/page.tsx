"use client";

// ── /evento — Revolución Tecnológica, 20 de septiembre 2026 ──────────────────
// Landing pública del evento. Bajo marca Allitron.
// No mencionar Google, Xerpas ni "alianza" en ningún copy — ver notas de
// gobierno del proyecto (contacto/exploración ≠ partnership confirmada).
// Concepto y estructura del evento son creación de Allitron (libertad
// creativa explícita) — sede/hora exacta marcadas como conceptuales hasta
// que el equipo de Lups las confirme.

import { motion, useReducedMotion, type Transition, type TargetAndTransition } from "framer-motion";
import { ArrowUpRight, MapPin, Clock3 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { EVENTS } from "@/config/assets";
import {
  EVENT_INFO,
  EVENT_AGENDA,
  EVENT_SHOWCASE,
  EVENT_CLOSE,
  EVENT_WHY_TEPIC,
  EVENT_VENUE,
  EVENT_STOCK_PHOTOS,
} from "@/data/event";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface AnimProps {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

function useMotionPreset() {
  const reduced = useReducedMotion() ?? false;

  const up = (delay: number): AnimProps =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65, delay, ease: EASE } };

  const fade = (delay: number): AnimProps =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.65, delay, ease: EASE } };

  return { up, fade };
}

const AGENDA_KIND_LABEL: Record<string, string> = {
  registro: "REGISTRO",
  charla: "CHARLA",
  pausa: "PAUSA",
  showcase: "SHOWCASE",
  cierre: "CIERRE",
};

export default function EventoPage() {
  const { up, fade } = useMotionPreset();

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-allitron-base">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <OptionalImage
              src={EVENT_STOCK_PHOTOS.partyCrowd}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
              fallback={null}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.92) 65%, #09090B 100%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 55% 55% at 85% 15%, rgba(242,135,76,0.14) 0%, transparent 60%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 50% 50% at 10% 75%, rgba(3,64,88,0.7) 0%, transparent 65%)" }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8 pb-16 pt-32 lg:px-16 xl:px-24">
            <div className="max-w-[640px]">
              <motion.p
                {...up(0)}
                className="mb-6 font-display text-[0.58rem] font-semibold tracking-[0.44em] text-allitron-orange"
              >
                ALLITRON PRESENTA
              </motion.p>

              <h1
                className="font-display font-black leading-[0.9] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.6rem, 7vw, 5.6rem)" }}
              >
                <motion.span {...up(0.12)} className="block">
                  REVOLUCIÓN
                </motion.span>
                <motion.span {...up(0.22)} className="block text-allitron-blue">
                  TECNOLÓGICA.
                </motion.span>
              </h1>

              <motion.div {...fade(0.35)} className="mt-8 h-px w-10 bg-allitron-blue/35" />

              <motion.div {...fade(0.44)} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="inline-flex items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.16em] text-muted">
                  <Clock3 className="h-3.5 w-3.5 text-allitron-blue" strokeWidth={2.5} />
                  {EVENT_INFO.dateLabel}
                </span>
                <span className="inline-flex items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.16em] text-muted">
                  <MapPin className="h-3.5 w-3.5 text-allitron-orange" strokeWidth={2.5} />
                  {EVENT_INFO.location.toUpperCase()}
                </span>
              </motion.div>

              <motion.p
                {...fade(0.52)}
                className="mt-6 max-w-[440px] font-body text-[0.9rem] leading-[1.85] text-muted"
              >
                Un encuentro de Allitron para conectar tecnología, talento y
                negocios reales en Tepic y Nayarit. Tres charlas, presentación
                de proyectos y una fiesta de cierre con networking y DJ.
              </motion.p>

              <motion.div {...fade(0.62)} className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/hub#inscripcion"
                  className="inline-flex items-center gap-2 bg-allitron-blue px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-allitron-base transition-colors duration-300 hover:bg-allitron-blue/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base sm:px-7 sm:py-3.5"
                >
                  REGISTRARME
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                </a>
                <a
                  href="#programa"
                  className="inline-flex items-center border border-white/[0.11] px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-all duration-300 hover:border-white/22 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base sm:px-7 sm:py-3.5"
                >
                  VER PROGRAMA
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Por qué Tepic ─────────────────────────────────────────── */}
        <section className="relative w-full bg-[var(--color-light)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-secondary/50"
              >
                {EVENT_WHY_TEPIC.eyebrow}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                className="font-display font-black leading-[1.05] tracking-tight text-[#101820]"
                style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)" }}
              >
                {EVENT_WHY_TEPIC.title}
              </motion.h2>
              <div className="mt-6 flex flex-col gap-4">
                {EVENT_WHY_TEPIC.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: 0.14 + i * 0.08, ease: EASE }}
                    className="max-w-[460px] font-body text-[0.92rem] leading-[1.85] text-secondary"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <PhotoFrame
                src={EVENT_STOCK_PHOTOS.networking01}
                alt="Comunidad conectando en un espacio de trabajo"
                aspect="aspect-[4/3]"
              />
              <p className="mt-3 font-body text-[0.62rem] text-secondary/40">
                Foto de referencia — se reemplaza por fotografía propia del evento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Programa — timeline ──────────────────────────────────────── */}
        <section id="programa" className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[840px]">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-allitron-blue/60"
            >
              PROGRAMA
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
            >
              TRES CHARLAS. TALENTO REAL.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
              className="mt-5 max-w-[440px] font-body text-[0.85rem] leading-[1.8] text-muted"
            >
              Itinerario propuesto por Allitron. Los horarios finales se
              confirman junto con la sede.
            </motion.p>

            <div className="mt-14 flex flex-col">
              {EVENT_AGENDA.map((item, idx) => (
                <motion.div
                  key={item.time + item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.05, ease: EASE }}
                  className="flex items-start gap-6 border-t border-white/[0.08] py-7"
                >
                  <span className="w-14 shrink-0 font-display text-[0.85rem] font-black tabular-nums text-allitron-blue/70 sm:w-16">
                    {item.time}
                  </span>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="font-display text-[0.48rem] font-bold tracking-[0.28em] text-allitron-orange/70">
                        {AGENDA_KIND_LABEL[item.kind]}
                      </span>
                      {item.speakerKind && (
                        <span
                          className={`font-display text-[0.48rem] font-bold tracking-[0.2em] ${
                            item.speakerKind === "confirmada" ? "text-allitron-blue" : "text-muted/60"
                          }`}
                        >
                          {item.speakerKind === "confirmada" ? "CONFIRMADA" : "PROPUESTA · POR CONFIRMAR"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-[0.95rem] font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 font-body text-[0.85rem] leading-[1.7] text-muted">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-white/[0.08]" />
            </div>
          </div>
        </section>

        {/* ── Sede ──────────────────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-navy px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="order-2 lg:order-1"
            >
              <PhotoFrame src={EVENTS["2026-09-20"].space} alt="Sede del evento — por confirmar" aspect="aspect-[4/3]" />
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-5 inline-block border border-allitron-orange/30 px-2.5 py-1 font-display text-[0.5rem] font-bold tracking-[0.2em] text-allitron-orange"
              >
                {EVENT_VENUE.status}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                className="font-display font-black leading-[1.05] tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)" }}
              >
                {EVENT_VENUE.vibeTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                className="mt-6 max-w-[440px] font-body text-[0.9rem] leading-[1.85] text-muted"
              >
                {EVENT_VENUE.vibeDescription}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
                className="mt-4 font-display text-[0.68rem] font-bold tracking-[0.1em] text-muted/60"
              >
                {EVENT_VENUE.city.toUpperCase()}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Showcase de proyectos ────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[900px] text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-allitron-blue"
            >
              PRESENTACIÓN DE PROYECTOS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {EVENT_SHOWCASE.slots} PROYECTOS SUBEN AL ESCENARIO.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="mx-auto mt-6 max-w-[520px] font-body text-[0.9rem] leading-[1.85] text-muted"
            >
              {EVENT_SHOWCASE.ruleText}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
              className="mt-10"
            >
              <a
                href="/hub#inscripcion"
                className="inline-flex items-center gap-2 border border-allitron-blue/30 px-7 py-3.5 font-display text-[0.62rem] font-bold tracking-[0.2em] text-allitron-blue transition-all hover:border-allitron-blue/60 hover:bg-allitron-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue"
              >
                POSTULAR MI PROYECTO
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Cierre — Networking + DJ ─────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: EASE }}
                className="font-display font-black leading-[0.95] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
              >
                {EVENT_CLOSE.title.toUpperCase()}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                className="mx-auto mt-6 max-w-[460px] font-body text-[0.9rem] leading-[1.85] text-muted"
              >
                {EVENT_CLOSE.description}
              </motion.p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <PhotoFrame src={EVENT_STOCK_PHOTOS.djClose} alt="DJ tocando en vivo con público" aspect="aspect-[4/3]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              >
                <PhotoFrame src={EVENT_STOCK_PHOTOS.partyCrowd} alt="Público disfrutando el cierre del evento" aspect="aspect-[4/3]" />
              </motion.div>
            </div>
            <p className="mt-3 text-center font-body text-[0.62rem] text-muted/40">
              Fotos de referencia — se reemplazan por fotografía propia del evento.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-12 flex justify-center"
            >
              <a
                href="/hub#inscripcion"
                className="inline-flex items-center gap-2 bg-allitron-orange px-7 py-3.5 font-display text-[0.62rem] font-bold tracking-[0.2em] text-allitron-base transition-colors hover:bg-allitron-orange/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-orange focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base"
              >
                QUIERO IR
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
