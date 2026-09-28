"use client";

// ── /productos/toma-tu-mercado — Landing de Toma tu Mercado ─────────────────
// Nombre interno: Motor de Captación (nunca visible). Misma idea y estructura
// que /productos/domina-google/lanzamiento: header mínimo, un solo CTA
// (formulario → WhatsApp), hero y CTA final oscuros, cuerpo claro con paleta
// propia aislada (TOMA_TU_MERCADO_LIGHT).
//
// Método de la página: Hook → Problema → Qué hacemos distinto → Historia →
// Método → Pauta e impresos → Paquetes → Filtro (para quién) → Garantía/FAQ → CTA.
//
// Todo el copy y los precios viven en src/data/tomaTuMercadoContent.ts.
// Imágenes opcionales en public/assets/products/mercado/ (PRODUCT_MARKET):
// si no existen, la página usa su visual por defecto.
// Prueba: este producto aún no tiene casos; no se muestra ninguna cifra de
// resultados hasta tener casos reales con permiso escrito.

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calculator, Check, FileText, LineChart, MapPin, Megaphone, Printer, Radar, Target, Wallet, X } from "lucide-react";
import LegalFooter from "@/components/layout/LegalFooter";
import AllitronGraph from "@/components/visual/AllitronGraph";
import HeroAlli from "@/components/brand/HeroAlli";
import StackingCard from "@/components/effects/StackingCard";
import { Modal } from "@/components/entregas/Modal";
import WhatsAppLeadForm from "@/components/forms/WhatsAppLeadForm";
import { LaunchImage } from "@/components/media/LaunchImage";
import IncludesExplorer from "./IncludesExplorer";
import { PRODUCT_MARKET as IMG } from "@/config/assets";
import { TOMA_TU_MERCADO_LIGHT, TOMA_TU_MERCADO_TOKENS } from "@/config/productTheme";
import {
  TTM_ADSPEND,
  TTM_AI_NOTE,
  TTM_DELIVERABLES,
  TTM_EXAMPLE,
  TTM_TEAM,
  TTM_CTA_LABEL,
  TTM_CYCLE,
  TTM_FAQ,
  TTM_GUARANTEE,
  TTM_MARKETS,
  TTM_METHOD,
  TTM_NOT_FOR,
  TTM_PACKAGES,
  TTM_PAYMENT_TERMS,
  TTM_PILLARS,
  TTM_PRICE_NOTE,
  TTM_PRINT,
  TTM_REQUIREMENTS,
  TTM_WHATSAPP_MESSAGE,
  buildWhatsAppLink,
  formatMXN,
  founderRemaining,
  type TtmPackage,
} from "@/data/tomaTuMercadoContent";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ACCENT = TOMA_TU_MERCADO_TOKENS.accent;
const GRADIENT = TOMA_TU_MERCADO_TOKENS.gradient;
const L = TOMA_TU_MERCADO_LIGHT;

// Variables de la paleta clara — solo viven dentro de <main> de esta página.
const LIGHT_VARS = {
  "--tm-bg": L.bg,
  "--tm-bg-alt": L.bgAlt,
  "--tm-card": L.card,
  "--tm-ink": L.ink,
  "--tm-muted": L.muted,
  "--tm-line": L.line,
  "--tm-accent-text": L.accentText,
} as CSSProperties;

const PILLAR_ICONS = { target: Target, radar: Radar, calculator: Calculator } as const;
const DELIVERABLE_ICONS = [FileText, Radar, Calculator, Target, Megaphone, LineChart] as const;
const PHASE_IMAGES = [IMG.fase1, IMG.fase2, IMG.fase3, IMG.fase4, IMG.fase5, IMG.fase6] as const;

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

function PackageCard({ p, featured, onChoose, delay }: { p: TtmPackage; featured: boolean; onChoose: () => void; delay: number }) {
  const remaining = founderRemaining(p);
  const founderOpen = p.founderPrice !== null && remaining > 0;
  const price = founderOpen && p.founderPrice !== null ? p.founderPrice : p.regularPrice;
  return (
    <motion.div
      {...reveal(delay)}
      className={`relative flex flex-col rounded-sm border bg-[var(--tm-card)] p-7 text-left ${
        featured ? "border-transparent shadow-[0_30px_80px_rgba(11,107,79,0.22)] md:-translate-y-3" : "border-[var(--tm-line)]"
      }`}
      style={featured ? { outline: `2px solid ${ACCENT}`, outlineOffset: "-2px" } : undefined}
    >
      {featured && (
        <span
          className="absolute -top-3 left-6 rounded-sm px-3 py-1 font-display text-[0.55rem] font-bold tracking-[0.18em] text-white"
          style={{ background: GRADIENT }}
        >
          RECOMENDADO PARA PYMES
        </span>
      )}

      <span className="font-display text-[0.62rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">{p.label.toUpperCase()}</span>
      <p className="mt-3 min-h-[3.6rem] font-body text-[0.8rem] leading-[1.55] text-[var(--tm-ink)]/80">{p.forWho}</p>

      <p className="mt-5 font-display font-black leading-none tracking-tight" style={{ fontSize: "2.4rem", color: featured ? L.accentText : L.ink }}>
        {p.from && <span className="mr-1.5 align-middle text-[0.9rem] font-bold text-[var(--tm-muted)]">DESDE</span>}
        {formatMXN(price).replace(" MXN", "")}
        <span className="ml-1.5 text-[0.8rem] font-bold text-[var(--tm-muted)]">MXN</span>
      </p>
      <p className="mt-2.5 font-body text-[0.78rem] text-[var(--tm-muted)]">
        Ciclo de {TTM_CYCLE}
        {founderOpen ? ` · precio fundador` : p.from ? " · se cotiza a tu medida" : ""}
      </p>
      {founderOpen && (
        <p className="mt-1.5 font-body text-[0.76rem] text-[var(--tm-ink)]/80">
          Quedan <strong>{remaining}</strong> de {p.founderSlots} lugares. Después: {formatMXN(p.regularPrice)}.
        </p>
      )}

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-[var(--tm-line)] pt-6">
        {p.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} />
            <span className="font-body text-[0.82rem] leading-[1.55] text-[var(--tm-ink)]/85">{h}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-body text-[0.74rem] text-[var(--tm-muted)]">
        Pauta mínima recomendada: <strong className="text-[var(--tm-ink)]">{p.minAdSpend}</strong>, directo a la plataforma.
      </p>

      <button
        type="button"
        onClick={onChoose}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-display text-[0.62rem] font-bold tracking-[0.18em] transition-transform duration-300 hover:scale-[1.02] ${
          featured ? "text-white" : "border border-[var(--tm-line)] text-[var(--tm-ink)]"
        }`}
        style={featured ? { background: GRADIENT } : undefined}
      >
        {TTM_CTA_LABEL}
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </motion.div>
  );
}

export default function TomaTuMercadoPage() {
  const [fit, setFit] = useState<number[]>([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadPackage, setLeadPackage] = useState<string | null>(null);
  const [leadSource, setLeadSource] = useState("landing");
  const [showSticky, setShowSticky] = useState(false);
  const [heroDesktopOk, setHeroDesktopOk] = useState(false);
  const [heroMovilOk, setHeroMovilOk] = useState(false);
  const reduced = useReducedMotion();
  const heroPhoto = heroDesktopOk || heroMovilOk;

  const openLead = (source = "landing") => {
    setLeadPackage(null);
    setLeadSource(source);
    setLeadOpen(true);
  };
  const openLeadForPackage = (label: string) => {
    setLeadPackage(label);
    setLeadSource(`paquetes · ${label}`);
    setLeadOpen(true);
  };

  // CTA fijo en móvil: aparece al pasar el hero.
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leadMessage = `${leadPackage ? `${TTM_WHATSAPP_MESSAGE} Me interesa el paquete ${leadPackage}.` : TTM_WHATSAPP_MESSAGE}\n\n(Origen: Toma tu Mercado · ${leadSource})`;

  return (
    <>
      <Modal open={leadOpen} onOpenChange={setLeadOpen} title="Cuéntanos de tu negocio">
        <WhatsAppLeadForm accent={ACCENT} buildLink={buildWhatsAppLink} baseMessage={leadMessage} />
      </Modal>

      {/* Header mínimo — un solo camino */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-allitron-base/80 px-6 py-4 backdrop-blur-sm lg:px-12">
        <span className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-foreground">
          ALLITRON <span style={{ color: ACCENT }}>· TOMA TU MERCADO</span>
        </span>
        <button
          type="button"
          onClick={() => openLead("encabezado")}
          className="hidden items-center gap-2 rounded-sm px-4 py-2 font-display text-[0.58rem] font-bold tracking-[0.18em] text-white sm:inline-flex"
          style={{ background: GRADIENT }}
        >
          {TTM_CTA_LABEL}
        </button>
      </header>

      <main style={LIGHT_VARS}>
        {/* ── 1. Hero (oscuro) ───────────────────────────────────────────── */}
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
            <LaunchImage bases={[IMG.heroDesktop]} priority wrapperClassName="h-full w-full" imgClassName="h-full w-full object-cover object-[68%_90%]" onStatusChange={setHeroDesktopOk} />
          </motion.div>

          {heroDesktopOk && (
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden md:block"
              style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.85) 0%, rgba(16,24,32,0.6) 30%, rgba(16,24,32,0.15) 55%, rgba(16,24,32,0) 65%)" }}
            />
          )}

          {!heroPhoto && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse 55% 60% at 88% 12%, ${TOMA_TU_MERCADO_TOKENS.accentSoft} 0%, transparent 62%)` }}
              />
            </div>
          )}

          <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
            <div className="max-w-[640px]">
              <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.58rem] font-bold tracking-[0.34em]" style={{ color: ACCENT }}>
                CAMPAÑAS CON OBJETIVO COMERCIAL
              </motion.span>
              <motion.h1
                {...reveal(0.04)}
                className="font-display font-black leading-[0.96] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2rem, 4.3vw, 3.9rem)", textShadow: "0 2px 22px rgba(0,0,0,0.5)" }}
              >
                TENER LIKES NO SIRVE DE NADA SI EL TELÉFONO NO SUENA.
              </motion.h1>

              <motion.p
                {...reveal(0.14)}
                className="mt-5 max-w-[500px] font-body text-[0.95rem] leading-[1.75] text-foreground/85"
                style={{ textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}
              >
                Estudiamos tu mercado, tu competencia y tus números. Después lanzamos la campaña para ir por los clientes que hoy se lleva otro. Ciclo de {TTM_CYCLE}.
              </motion.p>

              <motion.div {...reveal(0.24)} className="mt-8">
                <CtaButton label={TTM_CTA_LABEL} onClick={() => openLead("hero")} />
              </motion.div>

              <motion.p {...reveal(0.3)} className="mt-6 font-body text-[0.76rem] text-foreground/75">
                Precio fundador para los primeros 5 negocios de cada paquete.
              </motion.p>

              <motion.ul {...reveal(0.38)} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {TTM_MARKETS.map((market) => (
                  <li key={market} className="flex items-center gap-1.5 font-body text-[0.72rem] text-foreground/75">
                    <MapPin className="h-3 w-3 shrink-0" style={{ color: ACCENT }} strokeWidth={2.4} />
                    {market}
                  </li>
                ))}
              </motion.ul>
            </div>

            {!heroPhoto && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="relative aspect-square w-full"
              >
                <AllitronGraph solutionId="local" surface="dark" accent={ACCENT} className="h-full w-full" />
              </motion.div>
            )}
          </div>

          {!heroPhoto && <HeroAlli left="52%" delay={0.5} glow={ACCENT} />}
        </section>

        {/* ── 2. Problema (claro) ────────────────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
              Publicar no es vender.
            </motion.h2>
            <motion.blockquote
              {...reveal(0.14)}
              className="mt-10 border-l-2 pl-6 font-display text-[1.3rem] font-bold leading-[1.4] text-[var(--tm-ink)] sm:text-[1.6rem]"
              style={{ borderColor: ACCENT }}
            >
              &quot;Deja de publicar sin rumbo. Sal a tomar tu mercado.&quot;
            </motion.blockquote>

            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              <motion.div {...reveal(0.1)} className="overflow-hidden rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)]">
                <LaunchImage
                  bases={[IMG.problemaSin]}
                  alt="Dueño de un restaurante vacío revisando su celular de noche"
                  wrapperClassName="aspect-[3/2] w-full overflow-hidden"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  SIN RUMBO
                </span>
                <p className={BODY}>
                  Publicas todos los días, le das a &quot;promocionar&quot; y llegan likes. Pero no sabes cuánto te cuesta un cliente, qué anuncio
                  funciona ni por qué la competencia se lleva las ventas.
                </p>
                </div>
              </motion.div>
              <motion.div {...reveal(0.18)} className="overflow-hidden rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)]">
                <LaunchImage
                  bases={[IMG.problemaCon]}
                  alt="El mismo dueño atendiendo clientes y contestando mensajes"
                  wrapperClassName="aspect-[3/2] w-full overflow-hidden"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-accent-text)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  CON OBJETIVO
                </span>
                <p className="font-body text-[0.88rem] leading-[1.8] text-[var(--tm-ink)]/85">
                  Sabes a quién le hablas, qué le ofreces y cuánto puedes pagar por cada prospecto. Cada semana se apaga lo que no funciona y se
                  refuerza lo que sí. Los mensajes llegan a tu WhatsApp con alguien listo para comprar.
                </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3. Qué hacemos distinto (claro) ────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.h2 {...reveal(0.06)} className={`mb-5 max-w-[700px] ${H2}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Lo que hacemos antes de gastar un peso en anuncios.
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mb-14 max-w-[620px] ${BODY}`}>
              La mayoría empieza por el anuncio. Nosotros empezamos por tu mercado y tus números, porque un buen anuncio no salva una mala oferta.
            </motion.p>

            <div className="grid gap-6 lg:grid-cols-3">
              {TTM_PILLARS.map((pillar, i) => {
                const Icon = PILLAR_ICONS[pillar.icon];
                return (
                  <motion.div key={pillar.id} {...reveal(0.08 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-8">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${ACCENT}1f` }}>
                      <Icon className="h-4 w-4" style={{ color: L.accentText }} strokeWidth={2.2} />
                    </div>
                    <h3 className="mb-4 font-display text-[1.05rem] font-black leading-tight text-[var(--tm-ink)]">{pillar.title}</h3>
                    <p className="font-body text-[0.84rem] leading-[1.7] text-[var(--tm-ink)]/80">{pillar.body}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div {...reveal(0.1)} className="mt-12">
              <CtaButton label={TTM_CTA_LABEL} onClick={() => openLead("qué hacemos distinto")} />
            </motion.div>
          </div>
        </section>

        {/* ── 4. Así funciona, con un ejemplo (claro) ────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <span className={EYEBROW} style={{ color: L.accentText }}>
              ASÍ FUNCIONA, CON UN EJEMPLO
            </span>
            <motion.h2 {...reveal(0.06)} className={`max-w-[760px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              Antes de gastar en anuncios, sabes cuánto puedes pagar por cada cliente.
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mt-5 max-w-[640px] ${BODY}`}>
              Es la pregunta que casi ningún negocio se hace. Con cuatro datos de tu negocio la respondemos en el diagnóstico. Así se ve con un{" "}
              <strong className="text-[var(--tm-ink)]">{TTM_EXAMPLE.business.toLowerCase()}</strong>:
            </motion.p>

            <div className="mt-12 grid items-stretch gap-3 md:grid-cols-[repeat(4,1fr)_auto_1.2fr]">
              {TTM_EXAMPLE.steps.map((step, i) => (
                <motion.div key={step.label} {...reveal(0.06 * i)} className="flex flex-col justify-between rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-5">
                  <span className="font-display text-[0.55rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">DATO {i + 1}</span>
                  <p className="mt-4 font-display text-[1.9rem] font-black leading-none text-[var(--tm-ink)]">{step.value}</p>
                  <p className="mt-3 font-body text-[0.76rem] leading-[1.5] text-[var(--tm-muted)]">{step.label}</p>
                </motion.div>
              ))}
              <div className="hidden items-center justify-center md:flex" aria-hidden="true">
                <ArrowRight className="h-5 w-5" style={{ color: L.accentText }} strokeWidth={2.4} />
              </div>
              <motion.div
                {...reveal(0.3)}
                className="flex flex-col justify-between rounded-sm p-6 text-white"
                style={{ background: GRADIENT }}
              >
                <span className="font-display text-[0.55rem] font-bold tracking-[0.2em] text-white/85">RESULTADO</span>
                <div className="mt-4">
                  <p className="font-body text-[0.8rem] text-white/90">{TTM_EXAMPLE.result.label}</p>
                  <p className="font-display text-[2.6rem] font-black leading-none">{TTM_EXAMPLE.result.value}</p>
                  <p className="mt-1 font-body text-[0.8rem] text-white/90">{TTM_EXAMPLE.result.unit}</p>
                </div>
              </motion.div>
            </div>

            <motion.div {...reveal(0.1)} className="mt-8 grid gap-4 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
              <Check className="h-6 w-6" style={{ color: L.accentText }} strokeWidth={2.6} />
              <div>
                <p className="font-body text-[0.9rem] leading-[1.7] text-[var(--tm-ink)]">{TTM_EXAMPLE.reference}</p>
                <p className="mt-1 font-body text-[0.9rem] font-semibold leading-[1.7] text-[var(--tm-accent-text)]">{TTM_EXAMPLE.verdict}</p>
              </div>
            </motion.div>
            <p className="mt-4 font-body text-[0.72rem] text-[var(--tm-muted)]">{TTM_EXAMPLE.note}</p>
          </div>
        </section>

        {/* ── 5. Qué recibes (claro) ─────────────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.h2 {...reveal(0.06)} className={`mb-14 max-w-[640px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              Lo que tienes en tus manos al terminar.
            </motion.h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TTM_DELIVERABLES.map((d, i) => {
                const Icon = DELIVERABLE_ICONS[i];
                return (
                  <motion.div key={d.title} {...reveal(0.05 * i)} className="flex gap-4 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `${ACCENT}1f` }}>
                      <Icon className="h-4 w-4" style={{ color: L.accentText }} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-display text-[0.98rem] font-black text-[var(--tm-ink)]">{d.title}</h3>
                      <p className="mt-2 font-body text-[0.82rem] leading-[1.6] text-[var(--tm-muted)]">{d.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div {...reveal(0.1)} className="mt-12">
              <CtaButton label={TTM_CTA_LABEL} onClick={() => openLead("qué recibes")} />
            </motion.div>
          </div>
        </section>

        {/* ── 6. Método: 6 fases con fotos (claro) ───────────────────────── */}
        <section id="proceso" className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1200px]">
            <motion.h2 {...reveal(0.06)} className={`mb-5 max-w-[640px] ${H2}`} style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Seis fases. Noventa días. Un objetivo.
            </motion.h2>
            <motion.p {...reveal(0.12)} className={`mb-16 max-w-[600px] ${BODY}`}>
              Así se ve el trabajo por dentro, de la primera plática al reporte final.
            </motion.p>
            <div className="relative flex flex-col gap-6">
              {TTM_METHOD.map((step, i) => (
                <StackingCard key={step.n} index={i} total={TTM_METHOD.length}>
                  <motion.div
                    {...reveal(0.04 * i)}
                    className="grid items-center gap-8 rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 shadow-[0_18px_50px_rgba(20,26,23,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-10"
                  >
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <LaunchImage
                        bases={[PHASE_IMAGES[i]]}
                        alt={`Toma tu Mercado — fase ${step.n}: ${step.label}`}
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

        {/* ── 7. Equipo (claro) ──────────────────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <LaunchImage
                bases={[IMG.equipo]}
                alt="Equipo de Allitron trabajando en una estrategia en el hub de Tepic"
                wrapperClassName="aspect-[3/2] w-full overflow-hidden rounded-sm lg:w-[52%]"
                imgClassName="h-full w-full object-cover"
              />
              <div className="flex-1">
                <span className={EYEBROW} style={{ color: L.accentText }}>
                  {TTM_TEAM.eyebrow}
                </span>
                <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}>
                  {TTM_TEAM.title}
                </motion.h2>
                <motion.p {...reveal(0.12)} className={`mt-6 ${BODY}`}>
                  {TTM_TEAM.body}
                </motion.p>
                <motion.p {...reveal(0.16)} className="mt-5 border-l-2 pl-4 font-display text-[1.05rem] font-bold text-[var(--tm-ink)]" style={{ borderColor: ACCENT }}>
                  {TTM_TEAM.promise}
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TTM_TEAM.roles.map((r, i) => (
                <motion.div key={r.title} {...reveal(0.05 * i)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6">
                  <h3 className="font-display text-[0.95rem] font-black text-[var(--tm-ink)]">{r.title}</h3>
                  <p className="mt-2 font-body text-[0.82rem] leading-[1.6] text-[var(--tm-muted)]">{r.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Pauta aparte + impresos (claro) ─────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <motion.div {...reveal(0.06)} className="flex flex-col justify-center rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-8">
              <Wallet className="mb-5 h-5 w-5" style={{ color: L.accentText }} strokeWidth={2.2} />
              <h3 className="font-display text-[1.35rem] font-black leading-tight text-[var(--tm-ink)]">{TTM_ADSPEND.title}</h3>
              <p className={`mt-4 ${BODY}`}>{TTM_ADSPEND.body}</p>
            </motion.div>
            <motion.div {...reveal(0.12)} className="overflow-hidden rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)]">
              <LaunchImage
                bases={[IMG.impresos]}
                alt="Volantes y lona con código QR revisados antes de entregarse"
                wrapperClassName="aspect-[16/9] w-full overflow-hidden"
                imgClassName="h-full w-full object-cover"
              />
              <div className="p-8">
                <Printer className="mb-4 h-5 w-5" style={{ color: L.accentText }} strokeWidth={2.2} />
                <h3 className="font-display text-[1.35rem] font-black leading-tight text-[var(--tm-ink)]">{TTM_PRINT.title}</h3>
                <p className={`mt-4 ${BODY}`}>{TTM_PRINT.body}</p>
                <p className="mt-4 font-body text-[0.76rem] leading-[1.6] text-[var(--tm-muted)]">{TTM_PRINT.note}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 9. Paquetes (claro) ────────────────────────────────────────── */}
        <section id="paquetes" className="w-full bg-[var(--tm-bg-alt)] px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <motion.h2 {...reveal(0.06)} className={`mx-auto max-w-[700px] ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
                No cuesta lo mismo un emprendedor que una empresa con cinco sucursales.
              </motion.h2>
              <motion.p {...reveal(0.12)} className={`mx-auto mt-5 max-w-[600px] ${BODY}`}>
                Por eso hay tres paquetes. En el diagnóstico gratis te decimos cuál te toca, o si todavía no te conviene invertir en anuncios.
              </motion.p>
            </div>

            <div className="mt-14 grid items-start gap-5 md:grid-cols-3">
              {TTM_PACKAGES.map((p, i) => (
                <PackageCard key={p.id} p={p} featured={p.id === "profesional"} onChoose={() => openLeadForPackage(p.label)} delay={0.08 * i} />
              ))}
            </div>

            <motion.div {...reveal(0.1)} className="mt-12 text-center">
              <p className="mx-auto max-w-[680px] font-body text-[0.84rem] leading-[1.7] text-[var(--tm-ink)]/85">{TTM_PAYMENT_TERMS}</p>
              <p className="mx-auto mt-2 max-w-[680px] font-body text-[0.76rem] leading-[1.7] text-[var(--tm-muted)]">{TTM_PRICE_NOTE}</p>
            </motion.div>

            <IncludesExplorer onChoose={openLeadForPackage} />
          </div>
        </section>

        {/* ── 10. ¿Es para ti? (autoevaluación) ───────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <motion.h2 {...reveal(0.06)} className={`max-w-[680px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              Es para negocios que ya venden y quieren vender con rumbo.
            </motion.h2>
            <motion.p {...reveal(0.1)} className={`mt-4 max-w-[560px] ${BODY}`}>
              Marca lo que ya tienes. No tienes que cumplirlo todo hoy: el diagnóstico te dice cómo cubrir lo que falte.
            </motion.p>
            <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <motion.div {...reveal(0.08)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-6 sm:p-7">
                <span className={`${EYEBROW} text-[var(--tm-muted)]`}>MARCA LO QUE YA TIENES</span>
                <div className="flex flex-col gap-2">
                  {TTM_REQUIREMENTS.map((req, i) => {
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
                          style={on ? { background: L.accentText, borderColor: L.accentText } : { borderColor: "rgba(80,90,84,0.4)" }}
                        >
                          {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </span>
                        <span className="font-body text-[0.85rem] leading-[1.6] text-[var(--tm-ink)]/90">{req}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-5 font-body text-[0.82rem] leading-[1.6] text-[var(--tm-ink)]" aria-live="polite">
                  {fit.length === TTM_REQUIREMENTS.length
                    ? "Cumples lo necesario. Pide tu diagnóstico y te decimos qué paquete te toca."
                    : fit.length === 0
                      ? `Tienes ${TTM_REQUIREMENTS.length} puntos por revisar.`
                      : `Llevas ${fit.length} de ${TTM_REQUIREMENTS.length}. Lo que falte lo vemos en el diagnóstico.`}
                </p>
              </motion.div>
              <motion.div {...reveal(0.14)} className="rounded-sm border border-dashed border-[var(--tm-line)] p-6 sm:p-7">
                <span className={`${EYEBROW} text-[var(--tm-muted)]`}>NO ES PARA TI SI…</span>
                <div className="flex flex-col gap-3">
                  {TTM_NOT_FOR.map((item) => (
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

        {/* ── 11. Garantía + preguntas (claro) ────────────────────────────── */}
        <section className="w-full bg-[var(--tm-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
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
                <p className={BODY}>{TTM_GUARANTEE.yes}</p>
              </motion.div>
              <motion.div {...reveal(0.16)} className="rounded-sm border border-[var(--tm-line)] bg-[var(--tm-card)] p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--tm-muted)]">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  NO GARANTIZAMOS
                </span>
                <p className={BODY}>{TTM_GUARANTEE.no}</p>
              </motion.div>
            </div>

            <div className="mt-20 flex flex-col divide-y divide-[var(--tm-line)]">
              {TTM_FAQ.map((item, i) => (
                <motion.div key={item.q} {...reveal(0.04 * i)} className="py-6">
                  <h3 className="font-display text-[0.95rem] font-bold text-[var(--tm-ink)]">{item.q}</h3>
                  <p className={`mt-2 ${BODY}`}>{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. CTA final (oscuro) ─────────────────────────────────────── */}
        <section id="contacto" className="relative w-full overflow-hidden bg-allitron-base md:min-h-[620px] lg:min-h-[min(46vw,820px)]">
          {/* Móvil: foto arriba (Alli y la ciudad) y el texto debajo */}
          <div aria-hidden="true" className="relative h-[280px] w-full md:hidden">
            <LaunchImage bases={[IMG.ctaFinal]} wrapperClassName="h-full w-full" imgClassName="h-full w-full object-cover object-[72%_center]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,24,32,0.2) 0%, rgba(16,24,32,0) 35%, rgba(16,24,32,0.75) 82%, #101820 100%)" }} />
          </div>
          {/* Desktop: foto de fondo; el texto arriba a la izquierda, sobre el cielo */}
          <div aria-hidden="true" className="absolute inset-0 hidden md:block">
            <LaunchImage
              bases={[IMG.ctaFinal]}
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover object-[center_60%]"
              fallback={
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse 50% 60% at 50% 0%, ${TOMA_TU_MERCADO_TOKENS.accentSoft} 0%, transparent 65%)` }}
                />
              }
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(16,24,32,0.78) 0%, rgba(16,24,32,0.45) 38%, rgba(16,24,32,0) 62%), linear-gradient(180deg, rgba(16,24,32,0.35) 0%, rgba(16,24,32,0) 30%)" }}
            />
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-28 pt-2 md:px-10 md:pb-20 md:pt-24 lg:px-16 xl:px-24">
            <div className="max-w-[540px] text-center md:text-left">
              <motion.h2
                {...reveal(0.04)}
                className="mb-6 font-display font-black leading-[0.98] tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)", textShadow: "0 2px 22px rgba(0,0,0,0.5)" }}
              >
                TU MERCADO YA ESTÁ AHÍ. LA PREGUNTA ES QUIÉN SE LO QUEDA.
              </motion.h2>
              <motion.p
                {...reveal(0.1)}
                className="mb-9 font-body text-[0.92rem] leading-[1.7] text-foreground/85"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
              >
                En el diagnóstico gratis revisamos tu mercado, tu competencia y tus números. Si una campaña te conviene, te decimos cuál. Si no, también.
              </motion.p>
              <motion.div {...reveal(0.16)}>
                <CtaButton label={TTM_CTA_LABEL} onClick={() => openLead("cta final")} large />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <p className="bg-allitron-base px-6 pb-2 pt-6 text-center font-body text-[0.68rem] text-foreground/50">{TTM_AI_NOTE}</p>
      <LegalFooter links={[{ label: "Aviso de privacidad", href: "/aviso-de-privacidad" }]} />

      {/* CTA fijo, solo móvil, después del hero */}
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
          {TTM_CTA_LABEL}
        </button>
      </div>
    </>
  );
}
