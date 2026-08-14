"use client";

// ── /productos/segundo-cerebro — Landing de producto ─────────────────────────
// Mismo patrón que /productos/lazup: grafo animado reskineado, superficies
// reales de Allitron (surface/surface-soft de globals.css, no inventadas),
// acento violeta (decisión de diseño — no hay color oficial documentado).

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  User,
  Lightbulb,
  ListChecks,
  CalendarClock,
  Wallet,
  BookOpen,
  BrainCircuit,
  Mic,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import ProductLeadForm from "@/components/forms/ProductLeadForm";
import AllitronGraph from "@/components/visual/AllitronGraph";
import { PRODUCT_SECOND_BRAIN } from "@/config/assets";
import { SECOND_BRAIN_TOKENS } from "@/config/productTheme";
import { SB_FLOW, SB_CAPABILITIES, SB_PRICING, type SBCapability } from "@/data/segundoCerebroContent";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ACCENT = SECOND_BRAIN_TOKENS.accent;
const ACCENT_SOFT = SECOND_BRAIN_TOKENS.accentSoft;
const GRADIENT = SECOND_BRAIN_TOKENS.gradient;

const ICONS: Record<SBCapability["icon"], React.ElementType> = {
  person: User,
  project: Lightbulb,
  task: ListChecks,
  interaction: CalendarClock,
  finance: Wallet,
  reading: BookOpen,
  insight: BrainCircuit,
  voice: Mic,
};

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

export default function SegundoCerebroPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-allitron-base px-8 pb-16 pt-32 lg:px-16 xl:px-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  `linear-gradient(${ACCENT}1a 1px,transparent 1px),` +
                  `linear-gradient(90deg,${ACCENT}1a 1px,transparent 1px)`,
                backgroundSize: "80px 80px",
                opacity: 0.05,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse 55% 60% at 88% 12%, ${ACCENT_SOFT} 0%, transparent 62%)` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 45% 45% at 4% 85%, rgba(3,64,88,0.5) 0%, transparent 60%)" }}
            />
          </div>

          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
            <div className="max-w-[560px]">
              <motion.p
                {...reveal(0)}
                className="mb-6 font-display text-[0.58rem] font-semibold tracking-[0.4em]"
                style={{ color: ACCENT }}
              >
                SEGUNDO CEREBRO · BY SOMOS LÁZARO
              </motion.p>

              <motion.h1
                {...reveal(0.08)}
                className="font-display font-black leading-[0.94] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)" }}
              >
                TU MEMORIA, SIEMPRE DESPIERTA.
              </motion.h1>

              <motion.p
                {...reveal(0.18)}
                className="mt-6 max-w-[460px] font-body text-[0.92rem] leading-[1.85] text-muted"
              >
                Captura lo que pasa por tu día — por texto o voz, en Telegram
                — y encuéntralo después, estructurado, en tu propio vault de
                Obsidian. Tú decides y actúas; Segundo Cerebro recuerda.
              </motion.p>

              <motion.div {...reveal(0.28)} className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02] sm:px-7 sm:py-3.5"
                  style={{ background: GRADIENT }}
                >
                  OBTENER INFORMACIÓN
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
                <a
                  href="#capacidades"
                  className="inline-flex items-center border border-white/[0.12] px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-all hover:border-white/25 hover:text-foreground sm:px-7 sm:py-3.5"
                >
                  VER QUÉ HACE
                </a>
              </motion.div>
            </div>

            {/* Grafo animado — mismo motor del home, reskineado en violeta */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="relative aspect-square w-full"
            >
              <AllitronGraph
                solutionId="second-brain"
                surface="dark"
                accent={ACCENT}
                className="h-full w-full"
              />
            </motion.div>
          </div>
        </section>

        {/* ── Problema ──────────────────────────────────────────────── */}
        <section className="relative w-full bg-surface px-8 py-24 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 40% 50% at 15% 0%, ${ACCENT_SOFT} 0%, transparent 65%)` }}
          />
          <div className="relative mx-auto max-w-[1000px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              EL PROBLEMA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="max-w-[720px] font-display font-black leading-[1.05] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)" }}
            >
              Tu cabeza no es un buen lugar para guardar pendientes.
            </motion.h2>

            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {[
                "Las ideas se pierden entre notas sueltas, WhatsApp y papel — nunca en un solo lugar.",
                "Cada vez que necesitas contexto de algo, tienes que recordarlo tú, desde cero.",
                "Sin una fuente única de verdad, hasta las buenas decisiones se toman a ciegas.",
              ].map((text, i) => (
                <motion.p
                  key={text}
                  {...reveal(0.1 + i * 0.08)}
                  className="border-t border-white/10 pt-5 font-body text-[0.88rem] leading-[1.8] text-muted"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cómo funciona — única sección clara ─────────────────────── */}
        <section id="capacidades" className="relative w-full bg-[var(--color-light)] px-8 py-24 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-40 w-full"
            style={{ background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 100%)" }}
          />
          <div className="relative mx-auto max-w-[900px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-secondary/50">
              CÓMO FUNCIONA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="font-display font-black leading-[0.95] tracking-tight text-[#101820]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              DE UN MENSAJE DE VOZ A UN VAULT ORDENADO.
            </motion.h2>

            <div className="mt-14 flex flex-col">
              {SB_FLOW.map((step, i) => (
                <motion.div
                  key={step.n}
                  {...reveal(0.05 * i)}
                  className="flex items-center gap-6 border-t border-secondary/10 py-6"
                >
                  <span className="font-display text-[1.1rem] font-black tabular-nums" style={{ color: ACCENT }}>
                    {step.n}
                  </span>
                  <p className="font-body text-[0.92rem] leading-[1.6] text-secondary">
                    {step.text}
                  </p>
                </motion.div>
              ))}
              <div className="border-t border-secondary/10" />
            </div>
          </div>
        </section>

        {/* ── Capacidades ───────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-40 w-full"
            style={{ background: "linear-gradient(to bottom, var(--color-light) 0%, transparent 100%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 50% 40% at 90% 100%, ${ACCENT_SOFT} 0%, transparent 60%)` }}
          />
          <div className="relative mx-auto max-w-[1200px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              TODO LO QUE CAPTURA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="max-w-[600px] font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              OCHO TIPOS DE CAPTURA. UN SOLO VAULT.
            </motion.h2>

            <div className="mt-14 grid gap-px overflow-hidden bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {SB_CAPABILITIES.map((cap, i) => {
                const Icon = ICONS[cap.icon];
                return (
                  <motion.div
                    key={cap.title}
                    {...reveal(0.04 * i)}
                    className="flex flex-col gap-4 bg-allitron-base p-7"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: ACCENT_SOFT }}
                    >
                      <Icon className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-[0.88rem] font-bold text-foreground">
                      {cap.title}
                    </h3>
                    <p className="font-body text-[0.8rem] leading-[1.7] text-muted">
                      {cap.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Screenshots ───────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              ASÍ SE VE POR DENTRO
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              TU VAULT. TU TELEGRAM. TU MEMORIA.
            </motion.h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <PhotoFrame src={PRODUCT_SECOND_BRAIN.telegram} alt="Segundo Cerebro — captura por Telegram" aspect="aspect-[4/5]" />
              <PhotoFrame src={PRODUCT_SECOND_BRAIN.vault} alt="Segundo Cerebro — vault de Obsidian" aspect="aspect-[4/5]" />
            </div>
          </div>
        </section>

        {/* ── Principio diferenciador — No notas huérfanas ─────────────── */}
        <section className="relative w-full bg-surface-soft px-8 py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[720px] text-center">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em]" style={{ color: ACCENT }}>
              EL PRINCIPIO
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="font-display font-black leading-[1.05] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Ninguna nota queda huérfana.
            </motion.h2>
            <motion.p
              {...reveal(0.14)}
              className="mx-auto mt-6 max-w-[520px] font-body text-[0.92rem] leading-[1.9] text-muted"
            >
              Todo lo que capturas termina en el lugar correcto de tu vault
              — relacionado con la persona, el proyecto o el área a la que
              pertenece, y navegable desde ahí. Antes de guardar algo nuevo,
              Segundo Cerebro busca si ya existe. Nunca duplica. Nunca
              inventa. Si no puede relacionar algo con confianza, no lo
              fuerza — lo deja pendiente en vez de ensuciar tu vault.
            </motion.p>
          </div>
        </section>

        {/* ── Precios ───────────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              NIVELES
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 max-w-[600px] font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}
            >
              IMPLEMENTACIÓN A TU MEDIDA.
            </motion.h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {SB_PRICING.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  {...reveal(0.08 * i)}
                  className="border-t-2 pt-6"
                  style={{ borderColor: i === 0 ? ACCENT : "rgba(255,255,255,0.12)" }}
                >
                  <h3 className="mb-2 font-display text-[1rem] font-black text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mb-4 font-display text-[1.3rem] font-bold" style={{ color: ACCENT }}>
                    {tier.price}
                  </p>
                  <p className="font-body text-[0.85rem] leading-[1.75] text-muted">
                    {tier.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contacto ──────────────────────────────────────────────── */}
        <section id="contacto" className="relative w-full bg-surface px-8 py-28 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 50% 50% at 50% 0%, ${ACCENT_SOFT} 0%, transparent 65%)` }}
          />
          <div className="relative mx-auto max-w-[560px]">
            <motion.span {...reveal(0)} className="mb-5 block text-center font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              CONTACTO
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-4 text-center font-display font-black leading-[0.98] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.6rem)" }}
            >
              ¿LISTO PARA NO OLVIDAR NADA IMPORTANTE?
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              className="mb-12 text-center font-body text-[0.88rem] leading-[1.8] text-muted"
            >
              Cuéntanos de tu operación y te mostramos cómo se vería tu
              propio Segundo Cerebro funcionando.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="rounded-sm border border-white/[0.08] bg-allitron-base p-8 sm:p-10"
            >
              <ProductLeadForm product="Segundo Cerebro" accent={ACCENT} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
