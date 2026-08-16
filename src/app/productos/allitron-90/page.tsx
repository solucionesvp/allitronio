"use client";

// ── /productos/allitron-90 — Landing de producto ─────────────────────────────
// Producto propio de Allitron (no de Somos Lázaro) — usa el sistema de color
// nativo de Allitron (azul/naranja), sin acento inventado. Contenido dado
// directo por Lups en conversación, sin fuente en Obsidian para este producto.

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import ProductLeadForm from "@/components/forms/ProductLeadForm";
import AllitronGraph from "@/components/visual/AllitronGraph";
import HeroAlli from "@/components/brand/HeroAlli";
import Magnet from "@/components/effects/Magnet";
import StackingCard from "@/components/effects/StackingCard";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { PRODUCT_ALLITRON90, PEOPLE, STOCK } from "@/config/assets";
import { A90_FLOW, A90_WHY_ONE, A90_DELIVERABLES } from "@/data/allitron90Content";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const BLUE = "#09AFF2";
const ORANGE = "#F2874C";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

export default function Allitron90Page() {
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
                  "linear-gradient(rgba(9,175,242,1) 1px,transparent 1px)," +
                  "linear-gradient(90deg,rgba(9,175,242,1) 1px,transparent 1px)",
                backgroundSize: "80px 80px",
                opacity: 0.022,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 50% 50% at 8% 55%, rgba(3,64,88,0.72) 0%, transparent 65%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 30% 20% at 90% 12%, rgba(242,135,76,0.08) 0%, transparent 55%)" }}
            />
          </div>

          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
            <div className="max-w-[580px]">
              <motion.p
                {...reveal(0)}
                className="mb-6 font-display text-[0.58rem] font-semibold tracking-[0.4em] text-allitron-orange"
              >
                DIAGNÓSTICO + EJECUCIÓN · ALLITRON
              </motion.p>

              <motion.h1
                {...reveal(0.08)}
                className="font-display font-black leading-[0.94] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.3rem)" }}
              >
                ENCUENTRA EL CUELLO DE BOTELLA.{" "}
                <span className="text-allitron-blue">CONSTRUYE LOS PRÓXIMOS 90 DÍAS.</span>
              </motion.h1>

              <motion.p
                {...reveal(0.18)}
                className="mt-6 max-w-[480px] font-body text-[0.92rem] leading-[1.85] text-muted"
              >
                Una guía de consultoría real, pregunta por pregunta.
                Encontramos el único problema que más está limitando tu
                crecimiento hoy — y construimos un roadmap de 90 días para
                resolverlo, con Alejandro Valdés guiándote paso a paso.
              </motion.p>

              <motion.div {...reveal(0.28)} className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-allitron-blue px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-allitron-base transition-colors duration-300 hover:bg-allitron-blue/85 sm:px-7 sm:py-3.5"
                >
                  COORDINAR DIAGNÓSTICO
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center border border-white/[0.12] px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-all hover:border-white/25 hover:text-foreground sm:px-7 sm:py-3.5"
                >
                  VER CÓMO FUNCIONA
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="relative aspect-square w-full"
            >
              <AllitronGraph solutionId="allitron-90" surface="dark" className="h-full w-full" />
            </motion.div>
          </div>

          {/* Alli acompaña en el hero de cada producto — misma
              presencia que en el home, con el acento del producto. */}
          <HeroAlli left="52%" delay={0.5} glow={BLUE} />
        </section>

        {/* ── Cómo funciona ─────────────────────────────────────────── */}
        <section id="como-funciona" className="relative w-full bg-[var(--color-light)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="relative mx-auto max-w-[900px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-secondary/50">
              CÓMO FUNCIONA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 font-display font-black leading-[0.98] tracking-tight text-[#101820]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              DE UNA GUÍA DE PREGUNTAS A UN PLAN DE 90 DÍAS.
            </motion.h2>

            <div className="relative flex flex-col gap-5">
              {A90_FLOW.map((step, i) => (
                <StackingCard key={step.n} index={i} total={A90_FLOW.length}>
                  <motion.div
                    {...reveal(0.06 * i)}
                    className="grid min-h-[42vh] items-center gap-8 overflow-hidden rounded-sm border border-secondary/10 bg-white p-8 sm:grid-cols-[1fr_0.85fr] sm:gap-12 sm:p-12"
                  >
                    <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                      <span
                        className="font-display text-[1.6rem] font-black tabular-nums"
                        style={{ color: i === 1 ? ORANGE : BLUE }}
                      >
                        {step.n}
                      </span>
                      <h3 className="mt-2 font-display text-[1.3rem] font-bold text-[#101820] sm:text-[1.7rem]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[460px] font-body text-[0.9rem] leading-[1.85] text-secondary">
                        {step.text}
                      </p>
                    </div>

                    {/* Imagen de apoyo por paso — da ritmo visual al recorrido.
                        Material de stock temporal, ver STOCK en config/assets. */}
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 1 ? "sm:order-1" : ""}`}
                    >
                      <OptionalImage
                        src={STOCK.a90[i] ?? STOCK.a90[0]}
                        alt=""
                        className="h-full w-full object-cover"
                        fallback={<div className="h-full w-full bg-secondary/5" />}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(140deg, ${i === 1 ? ORANGE : BLUE}22 0%, transparent 62%)`,
                        }}
                      />
                    </div>
                  </motion.div>
                </StackingCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Por qué un solo cuello de botella ─────────────────────────── */}
        <section className="relative w-full bg-allitron-navy px-8 py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[720px] text-center">
            <motion.h2
              {...reveal(0)}
              className="font-display font-black leading-[1.05] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              {A90_WHY_ONE.title}
            </motion.h2>
            <motion.p
              {...reveal(0.1)}
              className="mx-auto mt-6 max-w-[560px] font-body text-[0.92rem] leading-[1.9] text-white/65"
            >
              {A90_WHY_ONE.body}
            </motion.p>
          </div>
        </section>

        {/* ── Qué recibes ───────────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              QUÉ RECIBES
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-12 max-w-[600px] font-display font-black leading-[0.98] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}
            >
              CUATRO ENTREGABLES CONCRETOS.
            </motion.h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {A90_DELIVERABLES.map((item, i) => (
                <motion.div key={item} {...reveal(0.05 * i)} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-allitron-blue" strokeWidth={2} />
                  <p className="font-body text-[0.9rem] leading-[1.7] text-muted">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── El acompañamiento — Alejandro Valdés ─────────────────────── */}
        <section className="relative w-full bg-surface px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.6fr_1fr] lg:items-center">
            <motion.div {...reveal(0)}>
              <Magnet padding={90} strength={7}>
                <PhotoFrame src={PEOPLE.alejandroValdez} alt="Alejandro Valdés" aspect="aspect-[4/5]" theme="person" />
              </Magnet>
            </motion.div>
            <div>
              <motion.span {...reveal(0.06)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
                EL ACOMPAÑAMIENTO
              </motion.span>
              <motion.h2
                {...reveal(0.12)}
                className="mb-6 font-display font-black leading-[1.02] tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}
              >
                Alejandro Valdés revisa tu resultado en persona.
              </motion.h2>
              <motion.p {...reveal(0.18)} className="max-w-[480px] font-body text-[0.9rem] leading-[1.85] text-muted">
                Empresario, con experiencia real construyendo negocios.
                Alejandro analiza el diagnóstico que arroja el sistema, lo
                platica directamente contigo y te guía paso a paso durante
                los 90 días — no es un reporte que te dejan solo para
                interpretar.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Screenshots ───────────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              ASÍ SE VE
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}
            >
              DEL DIAGNÓSTICO AL ROADMAP.
            </motion.h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <PhotoFrame src={PRODUCT_ALLITRON90.hero} alt="Allitron 90 — inicio del diagnóstico" aspect="aspect-[3/4]" theme="product" />
              <PhotoFrame src={PRODUCT_ALLITRON90.diagnostic} alt="Allitron 90 — proceso de diagnóstico" aspect="aspect-[3/4]" theme="analytics" />
              <PhotoFrame src={PRODUCT_ALLITRON90.roadmap} alt="Allitron 90 — roadmap de 90 días" aspect="aspect-[3/4]" theme="knowledge" />
            </div>
          </div>
        </section>

        {/* ── Contacto ──────────────────────────────────────────────────── */}
        <section id="contacto" className="relative w-full bg-surface px-8 py-28 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(9,175,242,0.1) 0%, transparent 65%)" }}
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
              ¿LISTO PARA ENCONTRAR TU CUELLO DE BOTELLA?
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              className="mb-12 text-center font-body text-[0.88rem] leading-[1.8] text-muted"
            >
              Coordinamos tu diagnóstico y arrancamos desde ahí.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="rounded-sm border border-white/[0.08] bg-allitron-base p-8 sm:p-10"
            >
              <ProductLeadForm product="Diagnóstico Allitron 90" accent={BLUE} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
