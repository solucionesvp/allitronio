"use client";

// ── /productos/domina-google — Landing de producto ───────────────────────────
// Nombre público del servicio interno "local" (antes "MAPS 2.0" — no usar ese
// nombre de cara al usuario). Contenido basado en la Ficha Comercial real
// (Obsidian): precio, garantía, incluye/no incluye, cliente ideal.
// Mismo patrón visual que /productos/lazup y /productos/segundo-cerebro.

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Zap,
  LayoutTemplate,
  Search,
  MapPin,
  Link2,
  CheckCircle2,
  MessageCircle,
  Upload,
  ShieldCheck,
  X,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import ProductLeadForm from "@/components/forms/ProductLeadForm";
import AllitronGraph from "@/components/visual/AllitronGraph";
import Magnet from "@/components/effects/Magnet";
import StackingCard from "@/components/effects/StackingCard";
import { PRODUCT_LOCAL } from "@/config/assets";
import { DOMINA_GOOGLE_TOKENS } from "@/config/productTheme";
import { LOCAL_METHODOLOGY } from "@/data/solutions";
import {
  DG_INCLUDES,
  DG_EXCLUDES,
  DG_IDEAL_CLIENT,
  DG_REQUIREMENTS,
  DG_PRICING,
} from "@/data/dominaGoogleContent";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ACCENT = DOMINA_GOOGLE_TOKENS.accent;
const ACCENT_SOFT = DOMINA_GOOGLE_TOKENS.accentSoft;
const GRADIENT = DOMINA_GOOGLE_TOKENS.gradient;

const INCLUDE_ICONS = [Zap, LayoutTemplate, Search, MapPin, Link2, CheckCircle2, MessageCircle, Upload, ShieldCheck];

const PHASE_PHOTOS = [PRODUCT_LOCAL.hero, PRODUCT_LOCAL.analysis, PRODUCT_LOCAL.build, PRODUCT_LOCAL.result];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

export default function DominaGooglePage() {
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
                PRESENCIA LOCAL · BY SOMOS LÁZARO
              </motion.p>

              <motion.h1
                {...reveal(0.08)}
                className="font-display font-black leading-[0.94] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)" }}
              >
                DOMINA GOOGLE. ATRAE CLIENTES.
              </motion.h1>

              <motion.p
                {...reveal(0.18)}
                className="mt-6 max-w-[460px] font-body text-[0.92rem] leading-[1.85] text-muted"
              >
                Construimos la infraestructura digital que conecta tu
                negocio, tu sitio web y Google para que aparezcas cuando
                alguien busca lo que vendes en tu ciudad.
              </motion.p>

              <motion.div {...reveal(0.28)} className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02] sm:px-7 sm:py-3.5"
                  style={{ background: GRADIENT }}
                >
                  QUIERO MI DIAGNÓSTICO
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
                <a
                  href="#proceso"
                  className="inline-flex items-center border border-white/[0.12] px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-all hover:border-white/25 hover:text-foreground sm:px-7 sm:py-3.5"
                >
                  VER CÓMO TRABAJAMOS
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="relative aspect-square w-full"
            >
              <AllitronGraph solutionId="local" surface="dark" accent={ACCENT} className="h-full w-full" />
            </motion.div>
          </div>
        </section>

        {/* ── Problema — el argumento central ──────────────────────────── */}
        <section className="relative w-full bg-surface px-8 py-28 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 45% 55% at 15% 10%, ${ACCENT_SOFT} 0%, transparent 65%)` }}
          />
          <div className="relative mx-auto max-w-[900px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              EL MOMENTO QUE IMPORTA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="font-display font-black leading-[1.05] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}
            >
              Cuando alguien ya quiere comprar, busca en Google.
            </motion.h2>
            <motion.p
              {...reveal(0.14)}
              className="mt-8 max-w-[620px] font-body text-[0.95rem] leading-[1.9] text-muted"
            >
              Las redes sociales son para descubrir. Google es para decidir.
              Nadie busca &quot;plomero cerca de mí&quot; o &quot;dentista en
              Tepic&quot; por curiosidad — busca porque ya necesita resolver
              algo, ahora. Ese es el momento de mayor intención de compra que
              existe, y si tu negocio no aparece ahí, simplemente no formas
              parte de la decisión.
            </motion.p>

            {/* Pull quote real, del gancho comercial */}
            <motion.blockquote
              {...reveal(0.22)}
              className="mt-14 border-l-2 pl-6 font-display text-[1.3rem] font-bold leading-[1.4] text-foreground sm:text-[1.6rem]"
              style={{ borderColor: ACCENT }}
            >
              &quot;Deja de ser invisible cuando alguien busca tu servicio en
              Google.&quot;
            </motion.blockquote>

            <motion.p
              {...reveal(0.3)}
              className="mt-8 max-w-[620px] font-body text-[0.9rem] leading-[1.85] text-muted"
            >
              Tu competencia se está llevando clientes simplemente porque
              aparece mejor cuando la gente busca lo que tú vendes. No
              porque sea mejor negocio — porque es más fácil de encontrar.
            </motion.p>

            {/* Contraste visible: sin presencia vs. con presencia */}
            <div className="mt-16 grid gap-px overflow-hidden bg-white/[0.08] sm:grid-cols-2">
              <motion.div {...reveal(0.1)} className="bg-surface p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-muted/60">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  SIN PRESENCIA
                </span>
                <p className="font-body text-[0.85rem] leading-[1.8] text-muted">
                  Alguien busca tu servicio. No apareces, o aparece
                  información vieja, sin fotos, sin forma rápida de
                  contactarte. Sigue buscando — y encuentra a tu competencia.
                </p>
              </motion.div>
              <motion.div {...reveal(0.18)} className="bg-surface p-8">
                <span
                  className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  CON PRESENCIA
                </span>
                <p className="font-body text-[0.85rem] leading-[1.8] text-foreground/80">
                  Aparece tu negocio, con información real, tu sitio carga
                  rápido y hay un botón directo a WhatsApp. La decisión toma
                  segundos — y es a tu favor.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Qué incluye — única sección clara ────────────────────────── */}
        <section className="relative w-full bg-[var(--color-light)] px-8 py-24 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-40 w-full"
            style={{ background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 100%)" }}
          />
          <div className="relative mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-secondary/50">
              QUÉ INCLUYE
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 max-w-[640px] font-display font-black leading-[0.98] tracking-tight text-[#101820]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              LA INFRAESTRUCTURA COMPLETA. NO SOLO UNA PÁGINA.
            </motion.h2>

            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {DG_INCLUDES.map((item, i) => {
                const Icon = INCLUDE_ICONS[i] ?? CheckCircle2;
                return (
                  <motion.div key={item} {...reveal(0.03 * i)} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${ACCENT}1f` }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: DOMINA_GOOGLE_TOKENS.accentDeep }} strokeWidth={2.2} />
                    </div>
                    <p className="pt-1 font-body text-[0.9rem] leading-[1.6] text-[#101820]">{item}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Cómo trabajamos — método real de 4 fases ─────────────────── */}
        <section id="proceso" className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-40 w-full"
            style={{ background: "linear-gradient(to bottom, var(--color-light) 0%, transparent 100%)" }}
          />
          <div className="relative mx-auto max-w-[1200px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              CÓMO TRABAJAMOS
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-16 max-w-[600px] font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              MÉTODO PROPIO. CUATRO FASES, ONCE PASOS.
            </motion.h2>

            <div className="relative flex flex-col gap-6">
              {LOCAL_METHODOLOGY.map((phase, i) => (
                <StackingCard key={phase.id} index={i} total={LOCAL_METHODOLOGY.length}>
                  <motion.div
                    {...reveal(0.06 * i)}
                    className="grid h-full items-center gap-8 rounded-sm border border-white/[0.06] bg-surface/70 p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-12"
                  >
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      {i === 0 ? (
                        <Magnet padding={80} strength={9}>
                          <PhotoFrame src={PHASE_PHOTOS[i]} alt={`Domina Google — fase ${phase.label}`} aspect="aspect-[4/3]" />
                        </Magnet>
                      ) : (
                        <PhotoFrame src={PHASE_PHOTOS[i]} alt={`Domina Google — fase ${phase.label}`} aspect="aspect-[4/3]" />
                      )}
                    </div>
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <span className="mb-3 flex items-baseline gap-3">
                        <span className="font-display text-[0.5rem] font-bold tracking-[0.3em]" style={{ color: ACCENT }}>
                          {phase.phase}
                        </span>
                      </span>
                      <h3 className="mb-5 font-display text-[1.4rem] font-black text-foreground">
                        {phase.label}
                      </h3>
                      <div className="flex flex-col gap-4">
                        {phase.steps.map((step) => (
                          <div key={step.number} className="flex gap-3">
                            <span className="font-display text-[0.62rem] font-bold tabular-nums text-muted/50">
                              {step.number}
                            </span>
                            <div>
                              <span className="font-display text-[0.72rem] font-bold tracking-wide text-foreground/90">
                                {step.label}
                              </span>
                              <p className="mt-1 font-body text-[0.82rem] leading-[1.65] text-muted">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </StackingCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Qué NO incluye — transparencia ───────────────────────────── */}
        <section className="relative w-full bg-surface-soft px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[900px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              PARA SER CLAROS
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-12 max-w-[600px] font-display font-black leading-[1.05] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)" }}
            >
              Esto no incluye — y preferimos decírtelo ahora.
            </motion.h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {DG_EXCLUDES.map((item, i) => (
                <motion.div key={item} {...reveal(0.03 * i)} className="flex items-start gap-3">
                  <X className="mt-1 h-3.5 w-3.5 shrink-0 text-muted/50" strokeWidth={2.5} />
                  <p className="font-body text-[0.85rem] leading-[1.7] text-muted">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Garantía ──────────────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[900px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              GARANTÍA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-12 font-display font-black leading-[1.05] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}
            >
              Trabajamos para que compitas por las posiciones más visibles.
            </motion.h2>

            <div className="grid gap-px overflow-hidden bg-white/[0.06] sm:grid-cols-2">
              <motion.div {...reveal(0.08)} className="bg-allitron-base p-8">
                <span
                  className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  GARANTIZAMOS
                </span>
                <p className="font-body text-[0.85rem] leading-[1.8] text-muted">
                  Entrega técnica en 7 días hábiles desde que recibimos tu
                  información completa: infraestructura web en línea, ficha
                  de Google optimizada y ruta directa a WhatsApp operativa.
                </p>
              </motion.div>
              <motion.div {...reveal(0.16)} className="bg-allitron-base p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-muted/60">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  NO GARANTIZAMOS
                </span>
                <p className="font-body text-[0.85rem] leading-[1.8] text-muted">
                  Posición #1 absoluta, resultados si no generas reseñas o
                  no respondes a tus prospectos, ni cambios del algoritmo de
                  Google. Nadie honesto puede prometerte eso.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Para quién es ─────────────────────────────────────────────── */}
        <section className="relative w-full bg-surface px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              PARA QUIÉN ES
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-12 max-w-[600px] font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}
            >
              NEGOCIOS LOCALES QUE YA EXISTEN Y QUIEREN SER ENCONTRADOS.
            </motion.h2>

            <div className="flex flex-wrap gap-3">
              {DG_IDEAL_CLIENT.map((item, i) => (
                <motion.span
                  key={item}
                  {...reveal(0.02 * i)}
                  className="border px-4 py-2 font-body text-[0.8rem]"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "var(--color-foreground)" }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <motion.div {...reveal(0.2)} className="mt-12 border-t border-white/10 pt-8">
              <span className="mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em] text-muted/60">
                REQUISITOS
              </span>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {DG_REQUIREMENTS.map((req) => (
                  <div key={req} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} strokeWidth={2.5} />
                    <span className="font-body text-[0.85rem] text-muted">{req}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Precio ────────────────────────────────────────────────────── */}
        <section className="relative w-full bg-allitron-base px-8 py-28 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 50% 50% at 50% 0%, ${ACCENT_SOFT} 0%, transparent 65%)` }}
          />
          <div className="relative mx-auto max-w-[640px] text-center">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-muted/70">
              PRECIO
            </motion.span>
            <motion.p
              {...reveal(0.08)}
              className="font-display font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: ACCENT }}
            >
              {DG_PRICING.price}
            </motion.p>
            <motion.p {...reveal(0.14)} className="mt-4 font-body text-[0.85rem] text-muted">
              {DG_PRICING.deposit} · {DG_PRICING.balance}
            </motion.p>
            <motion.p {...reveal(0.2)} className="mt-2 font-body text-[0.8rem] text-muted/70">
              Entrega en {DG_PRICING.delivery}. {DG_PRICING.deliveryNote}
            </motion.p>
          </div>
        </section>

        {/* ── Contacto ──────────────────────────────────────────────────── */}
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
              ¿LISTO PARA APARECER CUANDO TE BUSCAN?
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              className="mb-12 text-center font-body text-[0.88rem] leading-[1.8] text-muted"
            >
              Cuéntanos de tu negocio y revisamos juntos cómo apareces hoy
              en Google.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="rounded-sm border border-white/[0.08] bg-allitron-base p-8 sm:p-10"
            >
              <ProductLeadForm product="Domina Google" accent={ACCENT} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
