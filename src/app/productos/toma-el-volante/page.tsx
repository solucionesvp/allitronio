"use client";

// ── /productos/toma-el-volante — Landing de Toma el Volante ──────────────────
// Vertical automotriz de Toma tu Mercado. Misma estructura técnica que
// /productos/toma-tu-mercado: header mínimo, un solo CTA (formulario →
// WhatsApp), hero y CTA final oscuros, cuerpo claro con paleta aislada
// (TOMA_EL_VOLANTE_LIGHT).
//
// Narrativa: Hook (lunes 9:40) → Problema (cuatro fugas) → Giro (tope de costo)
// → Qué recibes → Método → Capacitación → Pauta por niveles → Grupos y
// exclusividad → Precio único → Filtro → Garantía/FAQ → Universo → CTA.
//
// Copy y precios: src/data/tomaElVolanteContent.ts. Imágenes opcionales en
// public/assets/products/volante/ (PRODUCT_VOLANTE); si faltan, la página usa
// su visual por defecto. Sin cifras de resultados: aún no hay casos.

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ClipboardList, FileText, Funnel, GraduationCap, LineChart, Megaphone, Repeat, Target, X } from "lucide-react";
import LegalFooter from "@/components/layout/LegalFooter";
import HeroAlli from "@/components/brand/HeroAlli";
import StackingCard from "@/components/effects/StackingCard";
import { Modal } from "@/components/entregas/Modal";
import WhatsAppLeadForm from "@/components/forms/WhatsAppLeadForm";
import { LaunchImage } from "@/components/media/LaunchImage";
import { PRODUCT_VOLANTE as IMG } from "@/config/assets";
import { TOMA_EL_VOLANTE_LIGHT, TOMA_EL_VOLANTE_TOKENS } from "@/config/productTheme";
import {
  VOLANTE_ADSPEND,
  VOLANTE_AI_NOTE,
  VOLANTE_CON,
  VOLANTE_CTA_LABEL,
  VOLANTE_CYCLE,
  VOLANTE_DELIVERABLES,
  VOLANTE_EXAMPLE,
  VOLANTE_FAQ,
  VOLANTE_GROUPS,
  VOLANTE_GUARANTEE,
  VOLANTE_HERO,
  VOLANTE_LEAKS,
  VOLANTE_METHOD,
  VOLANTE_NOT_FOR,
  VOLANTE_PACKAGE,
  VOLANTE_PRICE,
  VOLANTE_REQUIREMENTS,
  VOLANTE_SIN,
  VOLANTE_STORY,
  VOLANTE_TRAINING,
  VOLANTE_UNIVERSE,
  VOLANTE_WHATSAPP_MESSAGE,
  buildWhatsAppLink,
  formatMXN,
  volanteBetaRemaining,
} from "@/data/tomaElVolanteContent";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ACCENT = TOMA_EL_VOLANTE_TOKENS.accent;
const GRADIENT = TOMA_EL_VOLANTE_TOKENS.gradient;
const L = TOMA_EL_VOLANTE_LIGHT;

const LIGHT_VARS = {
  "--tm-bg": L.bg,
  "--tm-bg-alt": L.bgAlt,
  "--tm-card": L.card,
  "--tm-ink": L.ink,
  "--tm-muted": L.muted,
  "--tm-line": L.line,
  "--tm-accent-text": L.accentText,
} as CSSProperties;

const DELIVERABLE_ICONS = [FileText, Target, Funnel, Megaphone, ClipboardList, LineChart, Repeat, GraduationCap] as const;
const PHASE_IMAGES = [IMG.fase1, IMG.fase2, IMG.fase3, IMG.fase4, IMG.fase5] as const;

const H2 = "font-display font-black leading-[1.05] tracking-tight text-[var(--tm-ink)]";
const BODY = "font-body text-[0.88rem] leading-[1.8] text-[var(--tm-muted)]";
const EYEBROW = "mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em]";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

function CtaButton({ label, onClick, large = false }: { label: string; onClick: () => void; large?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-sm font-display font-bold text-white transition-transform duration-300 hover:scale-[1.02] ${
        large ? "px-8 py-4 text-[0.68rem] tracking-[0.2em]" : "px-6 py-3 text-[0.62rem] tracking-[0.2em] sm:px-7 sm:py-3.5"
      }`}
      style={{ background: GRADIENT }}
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
    </button>
  );
}

export default function TomaElVolantePage() {
  const [fit, setFit] = useState<number[]>([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("landing");
  const [showSticky, setShowSticky] = useState(false);
  const [heroDesktopOk, setHeroDesktopOk] = useState(false);
  const [heroMovilOk, setHeroMovilOk] = useState(false);
  const reduced = useReducedMotion();
  const heroPhoto = heroDesktopOk || heroMovilOk;

  const openLead = (source = "landing") => {
    setLeadSource(source);
    setLeadOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leadMessage = `${VOLANTE_WHATSAPP_MESSAGE}\n\n(Origen: Toma el Volante · ${leadSource})`;
  const remaining = volanteBetaRemaining();

  return (
    <>
      <Modal open={leadOpen} onOpenChange={setLeadOpen} title="Cuéntanos de tu agencia">
        <WhatsAppLeadForm accent={ACCENT} buildLink={buildWhatsAppLink} baseMessage={leadMessage} />
      </Modal>

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-allitron-base/80 px-6 py-4 backdrop-blur-sm lg:px-12">
        <span className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-foreground">
          ALLITRON <span style={{ color: ACCENT }}>· TOMA EL VOLANTE</span>
        </span>
        <button
          type="button"
          onClick={() => openLead("encabezado")}
          className="hidden items-center gap-2 rounded-sm px-4 py-2 font-display text-[0.58rem] font-bold tracking-[0.18em] text-white sm:inline-flex"
          style={{ background: GRADIENT }}
        >
          {VOLANTE_CTA_LABEL}
        </button>
      </header>

      <main style={LIGHT_VARS}>
        {/* ── 1. Hero (oscuro) ─────────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-allitron-base px-6 pb-12 pt-24 md:justify-center md:px-10 md:pb-16 md:pt-28 lg:px-16 xl:px-24">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 md:hidden" style={{ aspectRatio: "1792 / 2400" }}>
            <LaunchImage bases={[IMG.heroMovil]} priority wrapperClassName="h-full w-full" imgClassName="h-full w-full object-cover" onStatusChange={setHeroMovilOk} />
            {heroMovilOk && (
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, #101820 0%, rgba(16,24,32,0.9) 14%, rgba(16,24,32,0.45) 34%, rgba(16,24,32,0) 52%)" }}
              />
            )}
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute inset-0 hidden md:block"
            initial={{ scale: 1 }}
            animate={reduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 22, ease: "linear" }}
          >
            <LaunchImage bases={[IMG.heroDesktop]} priority wrapperClassName="h-full w-full" imgClassName="h-full w-full object-cover object-[72%_70%]" onStatusChange={setHeroDesktopOk} />
          </motion.div>

          {heroDesktopOk && (
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden md:block"
              style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.88) 0%, rgba(16,24,32,0.62) 32%, rgba(16,24,32,0.15) 56%, rgba(16,24,32,0) 66%)" }}
            />
          )}

          {!heroPhoto && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse 55% 60% at 88% 12%, ${TOMA_EL_VOLANTE_TOKENS.accentSoft} 0%, transparent 62%)` }}
              />
            </div>
          )}

          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <div className="max-w-[660px]">
              <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.58rem] font-bold tracking-[0.34em]" style={{ color: ACCENT }}>
                {VOLANTE_HERO.eyebrow}
              </motion.span>
              <motion.h1
                {...reveal(0.04)}
                className="font-display font-black leading-[0.96] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2rem, 4.1vw, 3.7rem)", textShadow: "0 2px 22px rgba(0,0,0,0.5)" }}
              >
                {VOLANTE_HERO.title}
              </motion.h1>
              <motion.p
                {...reveal(0.14)}
                className="mt-5 max-w-[520px] font-body text-[0.95rem] leading-[1.75] text-foreground/85"
                style={{ textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}
              >
                {VOLANTE_HERO.body}
              </motion.p>
              <motion.div {...reveal(0.24)} className="mt-8">
                <CtaButton label={VOLANTE_CTA_LABEL} onClick={() => openLead("hero")} />
              </motion.div>
              <motion.p {...reveal(0.3)} className="mt-6 font-body text-[0.76rem] text-foreground/75">
                {VOLANTE_HERO.note}
              </motion.p>
            </div>
          </div>

          {!heroPhoto && <HeroAlli left="62%" delay={0.5} glow={ACCENT} />}
        </section>

        {/* ── 2. Historia: lunes, 9:40 (claro) ─────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <span className={EYEBROW} style={{ color: L.accentText }}>
              {VOLANTE_STORY.eyebrow}
            </span>
            <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
              {VOLANTE_STORY.title}
            </motion.h2>
            <div className="mt-10 max-w-[680px] space-y-5">
              {VOLANTE_STORY.paragraphs.map((t, i) => (
                <motion.p key={i} {...reveal(0.08 * i)} className="font-body text-[1rem] leading-[1.85] text-[var(--tm-ink)]/90">
                  {t}
                </motion.p>
              ))}
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              <motion.div {...reveal(0.1)} className="overflow-hidden rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)]">
                <LaunchImage
                  bases={[IMG.problemaSin]}
                  alt="Gerente de ventas revisando mensajes sin responder al final del día en una agencia"
                  wrapperClassName="aspect-[3/2] w-full overflow-hidden"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-8">
                  <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {VOLANTE_SIN.label}
                  </span>
                  <p className={BODY}>{VOLANTE_SIN.body}</p>
                </div>
              </motion.div>
              <motion.div {...reveal(0.18)} className="overflow-hidden rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)]">
                <LaunchImage
                  bases={[IMG.problemaCon]}
                  alt="El mismo equipo atendiendo con orden, con Alli guiando el proceso"
                  wrapperClassName="aspect-[3/2] w-full overflow-hidden"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-8">
                  <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-accent-text)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {VOLANTE_CON.label}
                  </span>
                  <p className="font-body text-[0.88rem] leading-[1.8] text-[var(--tm-ink)]/85">{VOLANTE_CON.body}</p>
                </div>
              </motion.div>
            </div>
            <p className="mt-4 font-body text-[0.72rem] text-[var(--tm-muted)]">{VOLANTE_STORY.fictionNote}</p>
          </div>
        </section>

        {/* ── 3. Cuatro fugas (claro alterno) ──────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.h2 {...reveal(0.06)} className={`mb-5 max-w-[720px] ${H2}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Cuatro fugas entre el anuncio y la firma.
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mb-14 max-w-[620px] ${BODY}`}>
              La pauta trae gente a la puerta. Estas cuatro fugas deciden cuánta se queda.
            </motion.p>
            <div className="grid gap-5 sm:grid-cols-2">
              {VOLANTE_LEAKS.map((leak, i) => (
                <motion.div key={leak.title} {...reveal(0.07 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-8">
                  <span className="mb-3 block font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                    FUGA {i + 1}
                  </span>
                  <h3 className="mb-3 font-display text-[1.1rem] font-black leading-tight text-[var(--tm-ink)]">{leak.title}</h3>
                  <p className="font-body text-[0.86rem] leading-[1.7] text-[var(--tm-ink)]/80">{leak.body}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...reveal(0.1)} className="mt-12">
              <CtaButton label={VOLANTE_CTA_LABEL} onClick={() => openLead("fugas")} />
            </motion.div>
          </div>
        </section>

        {/* ── 4. Tope de costo, con ejemplo (claro) ────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <span className={EYEBROW} style={{ color: L.accentText }}>
              {VOLANTE_EXAMPLE.eyebrow}
            </span>
            <motion.h2 {...reveal(0.06)} className={`max-w-[760px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              {VOLANTE_EXAMPLE.title}
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mt-5 max-w-[660px] ${BODY}`}>
              {VOLANTE_EXAMPLE.intro}
            </motion.p>

            <div className="mt-12 grid items-stretch gap-3 md:grid-cols-[repeat(4,1fr)_auto_1.2fr]">
              {VOLANTE_EXAMPLE.steps.map((step, i) => (
                <motion.div key={step.label} {...reveal(0.06 * i)} className="flex flex-col justify-between rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-5">
                  <span className="font-display text-[0.55rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">DATO {i + 1}</span>
                  <p className="mt-4 font-display text-[1.9rem] font-black leading-none text-[var(--tm-ink)]">{step.value}</p>
                  <p className="mt-3 font-body text-[0.76rem] leading-[1.5] text-[var(--tm-muted)]">{step.label}</p>
                </motion.div>
              ))}
              <div className="hidden items-center justify-center md:flex" aria-hidden="true">
                <ArrowRight className="h-5 w-5" style={{ color: L.accentText }} strokeWidth={2.4} />
              </div>
              <motion.div {...reveal(0.3)} className="flex flex-col justify-between rounded-sm p-6 text-white" style={{ background: GRADIENT }}>
                <span className="font-display text-[0.55rem] font-bold tracking-[0.2em] text-white/85">RESULTADO</span>
                <div className="mt-4">
                  <p className="font-body text-[0.8rem] text-white/90">{VOLANTE_EXAMPLE.result.label}</p>
                  <p className="font-display text-[2.6rem] font-black leading-none">{VOLANTE_EXAMPLE.result.value}</p>
                  <p className="mt-1 font-body text-[0.8rem] text-white/90">{VOLANTE_EXAMPLE.result.unit}</p>
                </div>
              </motion.div>
            </div>
            <p className="mt-5 font-body text-[0.72rem] text-[var(--tm-muted)]">{VOLANTE_EXAMPLE.note}</p>
          </div>
        </section>

        {/* ── 5. Qué recibes (claro alterno) ───────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.h2 {...reveal(0.06)} className={`mb-14 max-w-[640px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              Lo que queda funcionando en tu agencia al terminar.
            </motion.h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VOLANTE_DELIVERABLES.map((d, i) => {
                const Icon = DELIVERABLE_ICONS[i];
                return (
                  <motion.div key={d.title} {...reveal(0.05 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: TOMA_EL_VOLANTE_TOKENS.accentSoft }}>
                      <Icon className="h-4 w-4" style={{ color: L.accentText }} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-[0.98rem] font-black text-[var(--tm-ink)]">{d.title}</h3>
                    <p className="mt-2 font-body text-[0.82rem] leading-[1.6] text-[var(--tm-muted)]">{d.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Método: 5 fases con fotos (claro) ─────────────────────── */}
        <section id="proceso" className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1200px]">
            <motion.h2 {...reveal(0.06)} className={`mb-5 max-w-[640px] ${H2}`} style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Cinco fases. Noventa días. Un tablero.
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mb-16 max-w-[600px] ${BODY}`}>
              Así se ve el trabajo por dentro, del primer diagnóstico al reporte final.
            </motion.p>
            <div className="relative flex flex-col gap-6">
              {VOLANTE_METHOD.map((step, i) => (
                <StackingCard key={step.n} index={i} total={VOLANTE_METHOD.length}>
                  <motion.div
                    {...reveal(0.04 * i)}
                    className="grid items-center gap-8 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 shadow-[0_18px_50px_rgba(22,19,12,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-10"
                  >
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <LaunchImage
                        bases={[PHASE_IMAGES[i]]}
                        alt={`Toma el Volante — fase ${step.n}: ${step.label}`}
                        wrapperClassName="aspect-[4/3] w-full overflow-hidden rounded-sm"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <span className="mb-3 block font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                        FASE {step.n}
                      </span>
                      <h3 className="mb-4 font-display text-[1.6rem] font-black text-[var(--tm-ink)]">{step.label}</h3>
                      <p className="font-body text-[0.92rem] leading-[1.75] text-[var(--tm-muted)]">{step.body}</p>
                    </div>
                  </motion.div>
                </StackingCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. Capacitación (claro alterno) ──────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <LaunchImage
                bases={[IMG.zoom]}
                alt="Sesión por Zoom con asesores de una agencia"
                wrapperClassName="aspect-[3/2] w-full overflow-hidden rounded-sm lg:w-[48%]"
                imgClassName="h-full w-full object-cover"
              />
              <div className="flex-1">
                <span className={EYEBROW} style={{ color: L.accentText }}>
                  {VOLANTE_TRAINING.eyebrow}
                </span>
                <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}>
                  {VOLANTE_TRAINING.title}
                </motion.h2>
                <motion.p {...reveal(0.12)} className={`mt-6 ${BODY}`}>
                  {VOLANTE_TRAINING.body}
                </motion.p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VOLANTE_TRAINING.sessions.map((s, i) => (
                <motion.div key={i} {...reveal(0.05 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6">
                  <span className="font-display text-[0.55rem] font-bold tracking-[0.25em]" style={{ color: L.accentText }}>
                    {s.kind.toUpperCase()} · {s.when.toUpperCase()}
                  </span>
                  <p className="mt-3 font-body text-[0.84rem] leading-[1.6] text-[var(--tm-ink)]/85">{s.body}</p>
                </motion.div>
              ))}
            </div>

            <motion.ul {...reveal(0.1)} className="mt-10 grid gap-3 md:grid-cols-2">
              {VOLANTE_TRAINING.rules.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} />
                  <span className="font-body text-[0.84rem] leading-[1.6] text-[var(--tm-ink)]/85">{r}</span>
                </li>
              ))}
            </motion.ul>
            <p className="mt-6 font-body text-[0.8rem] text-[var(--tm-muted)]">{VOLANTE_TRAINING.library}</p>
          </div>
        </section>

        {/* ── 8. Pauta por niveles (claro) ─────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <span className={EYEBROW} style={{ color: L.accentText }}>
              {VOLANTE_ADSPEND.eyebrow}
            </span>
            <motion.h2 {...reveal(0.06)} className={`max-w-[720px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              {VOLANTE_ADSPEND.title}
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mt-5 max-w-[680px] ${BODY}`}>
              {VOLANTE_ADSPEND.body}
            </motion.p>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {VOLANTE_ADSPEND.levels.map((lv, i) => (
                <motion.div key={lv.name} {...reveal(0.07 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-7">
                  <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                    NIVEL {i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-[1.5rem] font-black text-[var(--tm-ink)]">{lv.name}</h3>
                  <p className="mt-1 font-display text-[0.85rem] font-bold text-[var(--tm-ink)]/80">{lv.range}</p>
                  <p className="mt-4 font-body text-[0.84rem] leading-[1.65] text-[var(--tm-muted)]">{lv.rule}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 font-body text-[0.84rem] leading-[1.7] text-[var(--tm-ink)]/85">{VOLANTE_ADSPEND.drop}</p>
            <p className="mt-2 font-body text-[0.76rem] leading-[1.7] text-[var(--tm-muted)]">{VOLANTE_ADSPEND.disclaimer}</p>
          </div>
        </section>

        {/* ── 9. Grupos y exclusividad (claro alterno) ─────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className={EYEBROW} style={{ color: L.accentText }}>
                {VOLANTE_GROUPS.eyebrow}
              </span>
              <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}>
                {VOLANTE_GROUPS.title}
              </motion.h2>
              <motion.p {...reveal(0.12)} className={`mt-5 ${BODY}`}>
                {VOLANTE_GROUPS.body}
              </motion.p>
              <ul className="mt-8 flex flex-col gap-3">
                {VOLANTE_GROUPS.exclusivity.map((e) => (
                  <li key={e} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} />
                    <span className="font-body text-[0.86rem] leading-[1.65] text-[var(--tm-ink)]/90">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div {...reveal(0.1)} className="self-start rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-7">
              <span className="mb-4 block font-display text-[0.58rem] font-bold tracking-[0.25em] text-[var(--tm-muted)]">MÓDULOS PARA GRUPOS</span>
              <div className="flex flex-col divide-y divide-[var(--tm-line)]">
                {VOLANTE_GROUPS.modules.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="font-body text-[0.84rem] leading-[1.5] text-[var(--tm-ink)]/90">{m.label}</span>
                    <span className="shrink-0 font-display text-[0.86rem] font-black text-[var(--tm-ink)]">{m.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-body text-[0.74rem] leading-[1.6] text-[var(--tm-muted)]">{VOLANTE_GROUPS.moduleNote}</p>
            </motion.div>
          </div>
        </section>

        {/* ── 10. Paquete único (claro) ────────────────────────────────── */}
        <section id="paquete" className="w-full bg-[var(--tm-bg)] px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[760px] text-center">
            <motion.h2 {...reveal(0.06)} className={`mx-auto max-w-[680px] ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
              Un solo paquete. Siempre completo.
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mx-auto mt-5 max-w-[560px] ${BODY}`}>
              Sin versiones a medias. La capacitación va incluida porque sin asesores preparados la mejor campaña se desperdicia.
            </motion.p>

            <motion.div
              {...reveal(0.1)}
              className="relative mt-14 rounded-sm border border-transparent bg-[var(--tm-card)] p-8 text-left shadow-[0_30px_80px_rgba(138,82,0,0.2)] sm:p-10"
              style={{ outline: `2px solid ${ACCENT}`, outlineOffset: "-2px" }}
            >
              <span className="absolute -top-3 left-6 rounded-sm px-3 py-1 font-display text-[0.55rem] font-bold tracking-[0.18em] text-white" style={{ background: GRADIENT }}>
                PRECIO BETA · {remaining} DE {VOLANTE_PRICE.betaSlots} LUGARES
              </span>
              <span className="font-display text-[0.62rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">{VOLANTE_PACKAGE.name.toUpperCase()}</span>
              <p className="mt-3 font-body text-[0.85rem] leading-[1.55] text-[var(--tm-ink)]/80">{VOLANTE_PACKAGE.forWho}</p>

              <p className="mt-6 font-display font-black leading-none tracking-tight" style={{ fontSize: "2.8rem", color: L.accentText }}>
                {formatMXN(remaining > 0 ? VOLANTE_PRICE.beta : VOLANTE_PRICE.regular).replace(" MXN", "")}
                <span className="ml-1.5 text-[0.85rem] font-bold text-[var(--tm-muted)]">MXN</span>
              </p>
              <p className="mt-2.5 font-body text-[0.78rem] text-[var(--tm-muted)]">
                Ciclo de {VOLANTE_CYCLE}, sin IVA, sin pauta.
                {remaining > 0 && ` Precio regular: ${formatMXN(VOLANTE_PRICE.regular)}.`}
              </p>

              <ul className="mt-7 flex flex-col gap-2.5 border-t border-[var(--tm-line)] pt-7">
                {VOLANTE_PACKAGE.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} />
                    <span className="font-body text-[0.84rem] leading-[1.55] text-[var(--tm-ink)]/90">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 space-y-2 font-body text-[0.76rem] leading-[1.65] text-[var(--tm-muted)]">
                <p>{VOLANTE_PACKAGE.adNote}</p>
                <p>{VOLANTE_PACKAGE.payment}</p>
                <p>{VOLANTE_PACKAGE.continuity}</p>
                <p>{VOLANTE_PACKAGE.extraPieces}</p>
                {remaining > 0 && <p>{VOLANTE_PACKAGE.betaTerms}</p>}
              </div>

              <div className="mt-8">
                <CtaButton label={VOLANTE_CTA_LABEL} onClick={() => openLead("paquete")} large />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 11. ¿Es para ti? (claro alterno) ─────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <motion.h2 {...reveal(0.06)} className={`max-w-[680px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              Es para agencias que quieren vender con orden, no con suerte.
            </motion.h2>
            <motion.p {...reveal(0.1)} className={`mt-4 max-w-[560px] ${BODY}`}>
              Marca lo que ya tienes. No tienes que cumplirlo todo hoy: el diagnóstico te dice cómo cubrir lo que falte.
            </motion.p>
            <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <motion.div {...reveal(0.08)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 sm:p-7">
                <span className={`${EYEBROW} text-[var(--tm-muted)]`}>MARCA LO QUE YA TIENES</span>
                <div className="flex flex-col gap-2">
                  {VOLANTE_REQUIREMENTS.map((req, i) => {
                    const on = fit.includes(i);
                    return (
                      <button
                        key={req}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => setFit((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))}
                        className="flex items-start gap-3 rounded-sm border border-[var(--tm-line)] px-4 py-3 text-left transition-colors hover:bg-[var(--tm-bg)]"
                        style={on ? { borderColor: L.accentText } : undefined}
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border"
                          style={on ? { background: L.accentText, borderColor: L.accentText } : { borderColor: "rgba(90,84,68,0.4)" }}
                        >
                          {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </span>
                        <span className="font-body text-[0.85rem] leading-[1.6] text-[var(--tm-ink)]/90">{req}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-5 font-body text-[0.82rem] leading-[1.6] text-[var(--tm-ink)]" aria-live="polite">
                  {fit.length === VOLANTE_REQUIREMENTS.length
                    ? "Cumples lo necesario. Pide tu diagnóstico y te decimos cómo arrancar."
                    : fit.length === 0
                      ? `Tienes ${VOLANTE_REQUIREMENTS.length} puntos por revisar.`
                      : `Llevas ${fit.length} de ${VOLANTE_REQUIREMENTS.length}. Lo que falte lo vemos en el diagnóstico.`}
                </p>
              </motion.div>
              <motion.div {...reveal(0.14)} className="rounded-sm border border-dashed border-[var(--tm-line)] p-6 sm:p-7">
                <span className={`${EYEBROW} text-[var(--tm-muted)]`}>NO ES PARA TI SI…</span>
                <div className="flex flex-col gap-3">
                  {VOLANTE_NOT_FOR.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <X className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--tm-muted)]/60" strokeWidth={2.5} />
                      <span className="font-body text-[0.85rem] leading-[1.6] text-[var(--tm-muted)]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 12. Garantía + FAQ (claro) ───────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[900px]">
            <motion.h2 {...reveal(0.06)} className={`mb-12 ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
              Lo que prometemos y lo que no.
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div {...reveal(0.08)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-accent-text)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  GARANTIZAMOS
                </span>
                <p className={BODY}>{VOLANTE_GUARANTEE.yes}</p>
              </motion.div>
              <motion.div {...reveal(0.16)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  NO GARANTIZAMOS
                </span>
                <p className={BODY}>{VOLANTE_GUARANTEE.no}</p>
              </motion.div>
            </div>

            <div className="mt-20 flex flex-col divide-y divide-[var(--tm-line)]">
              {VOLANTE_FAQ.map((item, i) => (
                <motion.div key={item.q} {...reveal(0.04 * i)} className="py-6">
                  <h3 className="font-display text-[0.95rem] font-bold text-[var(--tm-ink)]">{item.q}</h3>
                  <p className={`mt-2 ${BODY}`}>{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. Universo Allitron (claro alterno) ────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-20 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <span className={EYEBROW} style={{ color: L.accentText }}>
              {VOLANTE_UNIVERSE.eyebrow}
            </span>
            <motion.h2 {...reveal(0.06)} className={`mb-10 ${H2}`} style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              {VOLANTE_UNIVERSE.title}
            </motion.h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VOLANTE_UNIVERSE.items.map((it, i) => {
                const inner = (
                  <>
                    <span className="font-display text-[0.55rem] font-bold tracking-[0.25em]" style={{ color: it.href ? L.accentText : L.muted }}>
                      {it.status.toUpperCase()}
                    </span>
                    <h3 className="mt-2 font-display text-[1rem] font-black text-[var(--tm-ink)]">{it.name}</h3>
                    <p className="mt-2 font-body text-[0.8rem] leading-[1.6] text-[var(--tm-muted)]">{it.body}</p>
                  </>
                );
                return (
                  <motion.div key={it.name} {...reveal(0.05 * i)}>
                    {it.href ? (
                      <a href={it.href} className="block h-full rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 transition-transform duration-300 hover:-translate-y-0.5">
                        {inner}
                      </a>
                    ) : (
                      <div className="h-full rounded-sm border border-dashed border-[var(--tm-line)] p-6">{inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 14. CTA final (oscuro) ───────────────────────────────────── */}
        <section id="contacto" className="relative w-full overflow-hidden bg-allitron-base md:min-h-[620px] lg:min-h-[min(46vw,820px)]">
          <div aria-hidden="true" className="relative h-[280px] w-full md:hidden">
            <LaunchImage bases={[IMG.ctaFinal]} wrapperClassName="h-full w-full" imgClassName="h-full w-full object-cover object-[72%_center]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,24,32,0.2) 0%, rgba(16,24,32,0) 35%, rgba(16,24,32,0.75) 82%, #101820 100%)" }} />
          </div>
          <div aria-hidden="true" className="absolute inset-0 hidden md:block">
            <LaunchImage
              bases={[IMG.ctaFinal]}
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover object-[center_60%]"
              fallback={
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse 50% 60% at 50% 0%, ${TOMA_EL_VOLANTE_TOKENS.accentSoft} 0%, transparent 65%)` }}
                />
              }
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.8) 0%, rgba(16,24,32,0.45) 38%, rgba(16,24,32,0) 62%), linear-gradient(180deg, rgba(16,24,32,0.35) 0%, rgba(16,24,32,0) 30%)" }}
            />
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-28 pt-2 md:px-10 md:pb-20 md:pt-24 lg:px-16 xl:px-24">
            <div className="max-w-[540px] text-center md:text-left">
              <motion.h2
                {...reveal(0.04)}
                className="mb-6 font-display font-black leading-[0.98] tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)", textShadow: "0 2px 22px rgba(0,0,0,0.5)" }}
              >
                EL CLIENTE YA ESTÁ EN LA PLAZA. LA PREGUNTA ES QUIÉN LO ATIENDE PRIMERO.
              </motion.h2>
              <motion.p
                {...reveal(0.1)}
                className="mb-9 font-body text-[0.92rem] leading-[1.7] text-foreground/85"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
              >
                En el diagnóstico revisamos cómo entra, se atiende y se cierra un lead en tu agencia. Si no te conviene arrancar todavía, también te lo decimos.
              </motion.p>
              <motion.div {...reveal(0.16)}>
                <CtaButton label={VOLANTE_CTA_LABEL} onClick={() => openLead("cta final")} large />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <p className="bg-allitron-base px-6 pb-2 pt-6 text-center font-body text-[0.68rem] text-foreground/50">{VOLANTE_AI_NOTE}</p>
      <LegalFooter links={[{ label: "Aviso de privacidad", href: "/aviso-de-privacidad" }]} />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-6 transition-transform duration-300 md:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ background: "linear-gradient(180deg, transparent, rgba(16,24,32,0.92) 45%)" }}
      >
        <button
          type="button"
          onClick={() => openLead("botón fijo móvil")}
          tabIndex={showSticky ? 0 : -1}
          className="w-full rounded-sm px-6 py-4 font-display text-[0.66rem] font-bold tracking-[0.2em] text-white"
          style={{ background: GRADIENT }}
        >
          {VOLANTE_CTA_LABEL}
        </button>
      </div>
    </>
  );
}
