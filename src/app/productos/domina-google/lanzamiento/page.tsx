"use client";

// ── /productos/domina-google/lanzamiento — Landing de CAMPAÑA (tráfico pagado) ──
// Separada de la evergreen /productos/domina-google: sin nav completo, un solo
// CTA (WhatsApp vía formulario), tiers de lanzamiento por cupo limitado.
//
// Reestructurada 18-sep-2026 (feedback de Lups: "todo muy oscuro", estructura
// repetida). Método: Hook → Problema → Prueba → Historia → Oferta → Proceso →
// Filtro (para quién) → Precio → Garantía/FAQ → CTA. Hero y CTA final oscuros
// (cine); el cuerpo, claro con paleta propia (DOMINA_GOOGLE_LIGHT, aislada).
//
// Imágenes: se activan solas al guardar el archivo con su nombre en
// public/assets/products/local/lanzamiento/ (ver PRODUCT_LOCAL_LAUNCH).
// Prueba (casos/logos): solo se pinta con datos reales en DG_PROOF_*.

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink, MapPin, MessageCircle, Search, ShieldCheck, X } from "lucide-react";
import Footer from "@/components/layout/Footer";
import AllitronGraph from "@/components/visual/AllitronGraph";
import HeroAlli from "@/components/brand/HeroAlli";
import StackingCard from "@/components/effects/StackingCard";
import { Modal } from "@/components/entregas/Modal";
import WhatsAppLeadForm from "@/components/forms/WhatsAppLeadForm";
import LaunchCounter from "@/components/sections/LaunchCounter";
import { LaunchImage } from "@/components/media/LaunchImage";
import { PRODUCT_LOCAL, PRODUCT_LOCAL_LAUNCH as IMG } from "@/config/assets";
import { DOMINA_GOOGLE_LIGHT, DOMINA_GOOGLE_TOKENS } from "@/config/productTheme";
import { LOCAL_METHODOLOGY } from "@/data/solutions";
import { DG_EXCLUDES, DG_REQUIREMENTS } from "@/data/dominaGoogleContent";
import {
  DG_LAUNCH_TIERS,
  DG_LAUNCH_SOLD,
  DG_LAUNCH_MARKETS,
  DG_LAUNCH_ADDONS,
  DG_LAUNCH_DELIVERY,
  DG_LAUNCH_DIFFERENTIATOR,
  DG_OFFER_GROUPS,
  DG_STORY,
  DG_FAQ,
  DG_PROOF_CASES,
  DG_PROOF_LINKS,
  DG_PROOF_LOGOS,
  DG_PROOF_LOGO_BASE,
  DG_REGULAR_PRICE,
  DG_LAUNCH_TOTAL_SLOTS,
  DG_WHATSAPP_MESSAGE,
  buildWhatsAppLink,
  getActiveTier,
  getTotalRemaining,
} from "@/data/dominaGoogleLaunchContent";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ACCENT = DOMINA_GOOGLE_TOKENS.accent;
const GRADIENT = DOMINA_GOOGLE_TOKENS.gradient;
const L = DOMINA_GOOGLE_LIGHT;

// Variables de la paleta clara — solo viven dentro de <main> de esta página.
const LIGHT_VARS = {
  "--dg-bg": L.bg,
  "--dg-bg-alt": L.bgAlt,
  "--dg-card": L.card,
  "--dg-ink": L.ink,
  "--dg-muted": L.muted,
  "--dg-line": L.line,
  "--dg-accent-text": L.accentText,
} as CSSProperties;

const GROUP_ICONS = { search: Search, chat: MessageCircle, shield: ShieldCheck } as const;
const PHASE_BASES = [IMG.fase1, IMG.fase2, IMG.fase3, IMG.fase4] as const;
// Mientras no exista la foto nueva de cada fase, se usa la de la evergreen.
const PHASE_FALLBACKS = [PRODUCT_LOCAL.hero, PRODUCT_LOCAL.analysis, PRODUCT_LOCAL.build, PRODUCT_LOCAL.result] as const;

const PROOF_CASES = DG_PROOF_CASES.filter((c) => c.approved);
const FEATURED_CASE = PROOF_CASES[0];
const OTHER_CASES = PROOF_CASES.slice(1);

function CaseVisual({ c }: { c: (typeof DG_PROOF_CASES)[number] }) {
  return (
    <div className="relative bg-[var(--dg-bg-alt)] pb-10 pr-8 pt-8 pl-8">
      <div className="overflow-hidden rounded-sm border border-[var(--dg-line)] shadow-md">
        <LaunchImage
          bases={[c.web]}
          alt={`Web de ${c.business ?? c.niche}`}
          wrapperClassName="aspect-[16/10] w-full overflow-hidden"
          imgClassName="h-full w-full object-cover object-top"
        />
      </div>
      <div className="absolute bottom-2 right-3 w-[42%] overflow-hidden rounded-sm border border-[var(--dg-line)] bg-black shadow-xl">
        <LaunchImage
          bases={[c.google]}
          alt={`Ficha de Google de ${c.business ?? c.niche}`}
          wrapperClassName="aspect-[4/3] w-full overflow-hidden"
          imgClassName="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

function CaseLink({ c }: { c: (typeof DG_PROOF_CASES)[number] }) {
  if (!c.url) return null;
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1 font-display text-[0.58rem] font-bold tracking-[0.16em] text-[var(--dg-accent-text)]"
    >
      VER SITIO <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
    </a>
  );
}

const H2 = "font-display font-black leading-[1.05] tracking-tight text-[var(--dg-ink)]";
const BODY = "font-body text-[0.88rem] leading-[1.8] text-[var(--dg-muted)]";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

const activeTier = getActiveTier();
const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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

export default function DominaGoogleLanzamientoPage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadTier, setLeadTier] = useState<string | null>(null);
  const [leadSource, setLeadSource] = useState("landing");
  const [showSticky, setShowSticky] = useState(false);
  const [heroDesktopOk, setHeroDesktopOk] = useState(false);
  const [heroMovilOk, setHeroMovilOk] = useState(false);
  const reduced = useReducedMotion();
  const heroPhoto = heroDesktopOk || heroMovilOk;
  const openLead = (source = "landing") => {
    setLeadTier(null);
    setLeadSource(source);
    setLeadOpen(true);
  };
  const openLeadForTier = (label: string) => {
    setLeadTier(label);
    setLeadSource(`precio · nivel ${label}`);
    setLeadOpen(true);
  };

  // CTA fijo en móvil: aparece al pasar el hero (83% del tráfico pagado es móvil).
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Modal open={leadOpen} onOpenChange={setLeadOpen} title="Cuéntanos de tu negocio">
        <WhatsAppLeadForm accent={ACCENT} buildLink={buildWhatsAppLink} baseMessage={`${leadTier ? `${DG_WHATSAPP_MESSAGE} Me interesa el nivel ${leadTier}.` : DG_WHATSAPP_MESSAGE}\n\n(Origen: landing lanzamiento · ${leadSource})`} />
      </Modal>

      {/* Header mínimo — sin nav completo, esta página tiene un solo camino */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-allitron-base/80 px-6 py-4 backdrop-blur-sm lg:px-12">
        <span className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-foreground">
          ALLITRON <span style={{ color: ACCENT }}>· DOMINA GOOGLE</span>
        </span>
        <button
          type="button"
          onClick={() => openLead("encabezado")}
          className="inline-flex items-center gap-2 rounded-sm px-4 py-2 font-display text-[0.58rem] font-bold tracking-[0.18em] text-white"
          style={{ background: GRADIENT }}
        >
          QUIERO MI DIAGNÓSTICO
        </button>
      </header>

      <main style={LIGHT_VARS}>
        {/* ── 1. Hero (oscuro, cine) ─────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-allitron-base px-6 pb-12 pt-24 md:justify-center md:px-10 md:pb-16 md:pt-28 lg:px-16 xl:px-24">
          {/* Móvil: la foto 3:4 completa, anclada abajo (Alli siempre visible) y
              fundida hacia el fondo arriba, donde va el texto. */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 md:hidden" style={{ aspectRatio: "1792 / 2400" }}>
            <LaunchImage
              bases={[IMG.heroMovil]}
              priority
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover"
              onStatusChange={setHeroMovilOk}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #101820 0%, rgba(16,24,32,0.9) 14%, rgba(16,24,32,0.45) 34%, rgba(16,24,32,0) 52%)",
              }}
            />
          </div>

          {/* Desktop: foto 3:2 a pantalla completa, encuadre a la derecha-abajo para no cortar a Alli */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 hidden md:block"
            initial={{ scale: 1 }}
            animate={reduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 22, ease: "linear" }}
          >
            <LaunchImage
              bases={[IMG.heroDesktop]}
              priority
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover object-[68%_90%]"
              onStatusChange={setHeroDesktopOk}
            />
          </motion.div>

          {heroDesktopOk && (
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(16,24,32,0.82) 0%, rgba(16,24,32,0.6) 28%, rgba(16,24,32,0.18) 50%, rgba(16,24,32,0) 62%), linear-gradient(180deg, rgba(16,24,32,0.35) 0%, rgba(16,24,32,0) 22%)",
              }}
            />
          )}

          {!heroPhoto && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 55% 60% at 88% 12%, ${DOMINA_GOOGLE_TOKENS.accentSoft} 0%, transparent 62%)`,
                }}
              />
            </div>
          )}

          <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
            <div className="max-w-[620px]">
              <motion.h1
                {...reveal(0.04)}
                className="font-display font-black leading-[0.96] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2rem, 4.3vw, 3.9rem)", textShadow: "0 2px 22px rgba(0,0,0,0.5)" }}
              >
                TU COMPETENCIA SE ESTÁ LLEVANDO CLIENTES QUE DEBERÍAN SER TUYOS.
              </motion.h1>

              <motion.p
                {...reveal(0.14)}
                className="mt-5 max-w-[460px] font-body text-[0.95rem] leading-[1.75] text-foreground/85"
                style={{ textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}
              >
                Web, Google Maps y WhatsApp conectados en {DG_LAUNCH_DELIVERY.delivery}. Un solo pago, sin mensualidad.
              </motion.p>

              <motion.div {...reveal(0.24)} className="mt-8">
                <CtaButton label="QUIERO MI DIAGNÓSTICO" onClick={() => openLead("hero")} />
              </motion.div>

              <motion.div {...reveal(0.32)} className="mt-7">
                <LaunchCounter tiers={DG_LAUNCH_TIERS} soldByTier={DG_LAUNCH_SOLD} accent={ACCENT} variant="hero" />
              </motion.div>

              <motion.ul {...reveal(0.4)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {DG_LAUNCH_MARKETS.map((market) => (
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

        {/* ── 2. Logos (solo con datos reales) ───────────────────────────── */}
        {DG_PROOF_LOGOS.length > 0 && (
          <section className="w-full bg-[var(--dg-card)] px-8 py-10 lg:px-16 xl:px-24">
            <div className="mx-auto max-w-[1100px] text-center">
              <span className="mb-6 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-[var(--dg-muted)]">
                NEGOCIOS CON LOS QUE HEMOS TRABAJADO
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                {DG_PROOF_LOGOS.map((logo) => (
                  <LaunchImage
                    key={logo.slug}
                    bases={[`${DG_PROOF_LOGO_BASE}/${logo.slug}`]}
                    alt={logo.name}
                    wrapperClassName="h-9"
                    imgClassName="h-full w-auto object-contain opacity-60 grayscale"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. Problema (claro) ────────────────────────────────────────── */}
        <section className="w-full bg-[var(--dg-bg)] px-8 py-28 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
              Cuando alguien ya quiere comprar, busca en Google.
            </motion.h2>
            <motion.blockquote
              {...reveal(0.14)}
              className="mt-10 border-l-2 pl-6 font-display text-[1.3rem] font-bold leading-[1.4] text-[var(--dg-ink)] sm:text-[1.6rem]"
              style={{ borderColor: ACCENT }}
            >
              &quot;Deja de ser invisible cuando alguien busca tu servicio en Google.&quot;
            </motion.blockquote>

            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              <motion.div {...reveal(0.1)} className="overflow-hidden rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)]">
                <LaunchImage
                  bases={[IMG.problemaSin]}
                  alt="Negocio sin presencia digital: nadie lo encuentra"
                  wrapperClassName="aspect-[3/2] w-full overflow-hidden"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-8">
                  <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--dg-muted)]">
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    SIN PRESENCIA
                  </span>
                  <p className={BODY}>
                    Alguien busca tu servicio. No apareces, o aparece información vieja, sin fotos, sin forma rápida de
                    contactarte. Sigue buscando — y encuentra a tu competencia.
                  </p>
                </div>
              </motion.div>
              <motion.div {...reveal(0.18)} className="overflow-hidden rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)]">
                <LaunchImage
                  bases={[IMG.problemaCon]}
                  alt="El mismo negocio con presencia digital: clientes entrando"
                  wrapperClassName="aspect-[3/2] w-full overflow-hidden"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="p-8">
                  <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--dg-accent-text)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    CON PRESENCIA
                  </span>
                  <p className="font-body text-[0.88rem] leading-[1.8] text-[var(--dg-ink)]/85">
                    Aparece tu negocio, con información real, tu sitio carga rápido y hay un botón directo a WhatsApp. La
                    decisión toma segundos — y es a tu favor.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 5. Historia: Lups + Alli (claro) ───────────────────────────── */}
        <section className="w-full bg-[var(--dg-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <motion.div {...reveal(0)} className="relative w-full lg:w-[46%]">
              <LaunchImage
                bases={[IMG.historia]}
                alt="Lups y Alli trabajando juntos"
                wrapperClassName="aspect-[3/2] w-full overflow-hidden rounded-sm"
                imgClassName="h-full w-full object-cover"
              />
            </motion.div>
            <div className="flex-1">
              <motion.h2 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}>
                {DG_STORY.title}
              </motion.h2>
              <div className="mt-8 flex flex-col gap-5">
                {DG_STORY.paragraphs.map((p, i) => (
                  <motion.p key={p} {...reveal(0.12 + i * 0.06)} className={BODY}>
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Oferta: qué recibes, en 3 bloques (claro) ───────────────── */}
        <section className="w-full bg-[var(--dg-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.h2 {...reveal(0.06)} className={`mb-14 max-w-[640px] ${H2}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              La infraestructura completa. No solo una página.
            </motion.h2>

            <div className="grid gap-6 lg:grid-cols-3">
              {DG_OFFER_GROUPS.map((group, i) => {
                const Icon = GROUP_ICONS[group.icon];
                return (
                  <motion.div key={group.id} {...reveal(0.08 * i)} className="rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] p-8">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${ACCENT}1f` }}>
                      <Icon className="h-4 w-4" style={{ color: L.accentText }} strokeWidth={2.2} />
                    </div>
                    <h3 className="mb-5 font-display text-[1.05rem] font-black leading-tight text-[var(--dg-ink)]">{group.title}</h3>
                    <ul className="flex flex-col gap-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: L.accentText }} strokeWidth={2.6} />
                          <span className="font-body text-[0.84rem] leading-[1.6] text-[var(--dg-ink)]/85">
                            {item}
                            {(DG_LAUNCH_ADDONS as readonly string[]).includes(item) && (
                              <span className="ml-1.5 text-[0.6rem] font-bold tracking-wide" style={{ color: L.accentText }}>
                                · NUEVO
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            <motion.div {...reveal(0.1)} className="mt-12">
              <CtaButton label="QUIERO MI DIAGNÓSTICO" onClick={() => openLead("problema")} />
            </motion.div>
          </div>
        </section>

        {/* ── 7. Cómo trabajamos: 4 fases con fotos (claro) ──────────────── */}
        <section id="proceso" className="w-full bg-[var(--dg-bg-alt)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1200px]">
            <motion.h2 {...reveal(0.06)} className={`mb-16 max-w-[600px] ${H2}`} style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Método propio. Cuatro fases, once pasos.
            </motion.h2>

            <div className="relative flex flex-col gap-6">
              {LOCAL_METHODOLOGY.map((phase, i) => (
                <StackingCard key={phase.id} index={i} total={LOCAL_METHODOLOGY.length}>
                  <motion.div
                    {...reveal(0.06 * i)}
                    className="grid items-center gap-8 rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] p-6 shadow-[0_18px_50px_rgba(26,22,20,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:p-10"
                  >
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <LaunchImage
                        bases={[PHASE_BASES[i]]}
                        fallbackSrc={PHASE_FALLBACKS[i]}
                        alt={`Domina Google — fase ${phase.label}`}
                        wrapperClassName="aspect-[4/3] w-full overflow-hidden rounded-sm"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <span className="mb-3 block font-display text-[0.5rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                        {phase.phase}
                      </span>
                      <h3 className="mb-5 font-display text-[1.4rem] font-black text-[var(--dg-ink)]">{phase.label}</h3>
                      <div className="flex flex-col gap-4">
                        {phase.steps.map((step) => (
                          <div key={step.number} className="flex gap-3">
                            <span className="font-display text-[0.62rem] font-bold tabular-nums text-[var(--dg-muted)]/60">{step.number}</span>
                            <div>
                              <span className="font-display text-[0.72rem] font-bold tracking-wide text-[var(--dg-ink)]">{step.label}</span>
                              <p className="mt-1 font-body text-[0.82rem] leading-[1.65] text-[var(--dg-muted)]">{step.description}</p>
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

        {/* ── 8. Negocios locales: casos reales + requisitos / no incluye (claro) ── */}
        <section className="w-full bg-[var(--dg-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.h2 {...reveal(0.06)} className={`max-w-[680px] ${H2}`} style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}>
              Negocios locales que ya existen y quieren ser encontrados.
            </motion.h2>
            {FEATURED_CASE && (
              <motion.p {...reveal(0.12)} className={`mt-5 max-w-[620px] ${BODY}`}>
                Así se ven algunos, con su web, su ficha y las cifras de su propio panel de Google.
              </motion.p>
            )}

            {FEATURED_CASE && (
              <div className="mt-12 flex flex-col gap-8">
                {/* Caso principal */}
                <motion.article {...reveal(0.06)} className="grid overflow-hidden rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] lg:grid-cols-[1.25fr_1fr]">
                  <CaseVisual c={FEATURED_CASE} />
                  <div className="flex flex-col justify-between gap-8 p-8">
                    <div>
                      <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: L.accentText }}>
                        CASO DESTACADO
                      </span>
                      <p className="mt-3 font-display text-[1.15rem] font-black leading-tight text-[var(--dg-ink)]">
                        {FEATURED_CASE.business ?? FEATURED_CASE.niche}
                      </p>
                      <p className="mt-1 text-[0.75rem] text-[var(--dg-muted)]">
                        {FEATURED_CASE.niche} · {FEATURED_CASE.city}
                      </p>
                    </div>
                    <div className="flex flex-col gap-5">
                      {FEATURED_CASE.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline gap-4 border-b border-[var(--dg-line)] pb-4 last:border-0 last:pb-0">
                          <p className="font-display text-[2.4rem] font-black leading-none text-[var(--dg-ink)]">{m.value}</p>
                          <p className="text-[0.78rem] leading-snug text-[var(--dg-muted)]">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[0.68rem] leading-snug text-[var(--dg-muted)]">{FEATURED_CASE.period}</p>
                      <CaseLink c={FEATURED_CASE} />
                    </div>
                  </div>
                </motion.article>

                {/* Otros casos */}
                {OTHER_CASES.length > 0 && (
                  <div className="grid gap-8 md:grid-cols-2">
                    {OTHER_CASES.map((c, i) => (
                      <motion.article key={c.id} {...reveal(0.06 * i)} className="flex flex-col overflow-hidden rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)]">
                        <CaseVisual c={c} />
                        <div className="flex flex-1 flex-col gap-5 p-6">
                          <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-5">
                            {c.metrics.map((m) => (
                              <div key={m.label}>
                                <p className="font-display text-[1.8rem] font-black leading-none text-[var(--dg-ink)]">{m.value}</p>
                                <p className="mt-2 text-[0.72rem] leading-snug text-[var(--dg-muted)]">{m.label}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-auto border-t border-[var(--dg-line)] pt-4">
                            <p className="font-display text-[0.85rem] font-bold text-[var(--dg-ink)]">
                              {c.business ?? c.niche} · {c.city}
                            </p>
                            <p className="mt-1 text-[0.68rem] leading-snug text-[var(--dg-muted)]">{c.period}</p>
                            <CaseLink c={c} />
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
                <p className="text-[0.68rem] text-[var(--dg-muted)]">
                  Cifras de cada negocio en el periodo indicado. Los resultados varían según giro, ciudad y competencia.
                </p>
              </div>
            )}

            {DG_PROOF_LINKS.length > 0 && (
              <div className="mt-14">
                <span className="mb-5 block font-display text-[0.55rem] font-bold tracking-[0.3em] text-[var(--dg-muted)]">
                  MÁS NEGOCIOS CON SITIO PROPIO
                </span>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {DG_PROOF_LINKS.map((l, i) => (
                    <motion.a
                      key={l.url}
                      {...reveal(0.05 * i)}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between gap-6 rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] p-5 transition-colors hover:border-[var(--dg-accent-text)]"
                    >
                      <div>
                        <p className="font-display text-[0.85rem] font-black leading-snug text-[var(--dg-ink)]">{l.name}</p>
                        <p className="mt-1 text-[0.7rem] leading-snug text-[var(--dg-muted)]">{l.niche}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 font-display text-[0.55rem] font-bold tracking-[0.14em] text-[var(--dg-accent-text)]">
                        {l.domain.toUpperCase()} <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 grid gap-12 border-t border-[var(--dg-line)] pt-10 md:grid-cols-2">
              <motion.div {...reveal(0.1)}>
                <span className="mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em] text-[var(--dg-muted)]">REQUISITOS</span>
                <div className="flex flex-col gap-3">
                  {DG_REQUIREMENTS.map((req) => (
                    <div key={req} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5" style={{ color: L.accentText }} strokeWidth={2.5} />
                      <span className="font-body text-[0.85rem] text-[var(--dg-ink)]/85">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...reveal(0.16)}>
                <span className="mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em] text-[var(--dg-muted)]">
                  NO INCLUYE — PREFERIMOS DECÍRTELO AHORA
                </span>
                <div className="flex flex-col gap-3">
                  {DG_EXCLUDES.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <X className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--dg-muted)]/60" strokeWidth={2.5} />
                      <span className="font-body text-[0.85rem] leading-[1.6] text-[var(--dg-muted)]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 9. Precio: contador + niveles de lanzamiento (claro) ───────── */}
        <section className="w-full bg-[var(--dg-bg-alt)] px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-center">
              <motion.h2 {...reveal(0.06)} className={`mx-auto max-w-[680px] ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
                Una instalación única. No una mensualidad de por vida.
              </motion.h2>
              <motion.p {...reveal(0.12)} className={`mx-auto mt-5 max-w-[560px] ${BODY}`}>
                20 lugares de lanzamiento, en tres niveles. Cuando un nivel se agota, el siguiente cuesta más.
              </motion.p>
            </div>

            <motion.div {...reveal(0.14)} className="mt-12">
              <LaunchCounter
                tiers={DG_LAUNCH_TIERS}
                soldByTier={DG_LAUNCH_SOLD}
                accent={ACCENT}
                accentText={L.accentText}
                variant="panel"
              />
            </motion.div>

            <div className="mt-10 grid items-start gap-5 md:grid-cols-3">
              {DG_LAUNCH_TIERS.map((tier, i) => {
                const sold = DG_LAUNCH_SOLD[tier.id] ?? 0;
                const remaining = Math.max(0, tier.slots - sold);
                const soldOut = remaining === 0;
                const isActive = tier.id === activeTier.id && !soldOut;
                const saving = DG_REGULAR_PRICE - tier.price;
                const prev = DG_LAUNCH_TIERS[i - 1];
                const next = DG_LAUNCH_TIERS[i + 1];
                const pct = Math.min(100, (sold / tier.slots) * 100);
                return (
                  <motion.div
                    key={tier.id}
                    {...reveal(0.08 * i)}
                    className={`relative flex flex-col rounded-sm border p-7 text-left ${
                      isActive
                        ? "border-transparent bg-[var(--dg-card)] shadow-[0_30px_80px_rgba(178,58,46,0.24)] md:-translate-y-3"
                        : "border-[var(--dg-line)] bg-[var(--dg-card)]/70"
                    } ${soldOut ? "opacity-55" : ""}`}
                    style={isActive ? { outline: `2px solid ${ACCENT}`, outlineOffset: "-2px" } : undefined}
                  >
                    {isActive && (
                      <span
                        className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-sm px-3 py-1 font-display text-[0.55rem] font-bold tracking-[0.18em] text-white"
                        style={{ background: GRADIENT }}
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        ABIERTO AHORA
                      </span>
                    )}

                    <span className="font-display text-[0.62rem] font-bold tracking-[0.2em] text-[var(--dg-muted)]">
                      {tier.label.toUpperCase()}
                      {soldOut ? " · AGOTADO" : ""}
                    </span>

                    <p
                      className="mt-4 font-display font-black leading-none tracking-tight"
                      style={{ fontSize: "2.6rem", color: isActive ? L.accentText : L.ink }}
                    >
                      {tier.priceLabel}
                    </p>

                    {saving > 0 ? (
                      <p className="mt-2.5 font-body text-[0.8rem] text-[var(--dg-muted)]">
                        <span className="line-through">${fmt(DG_REGULAR_PRICE)} MXN</span>
                        <span className="mx-1.5">·</span>
                        <strong style={{ color: L.accentText }}>ahorras ${fmt(saving)}</strong>
                      </p>
                    ) : (
                      <p className="mt-2.5 font-body text-[0.8rem] text-[var(--dg-muted)]">Último nivel de lanzamiento</p>
                    )}

                    <div className="mt-6">
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ACCENT }} />
                      </div>
                      <p className="mt-2 font-body text-[0.76rem] text-[var(--dg-muted)]">
                        {soldOut
                          ? `${tier.slots} de ${tier.slots} tomados`
                          : isActive
                            ? `Quedan ${remaining} de ${tier.slots} a este precio`
                            : `${tier.slots} lugares`}
                      </p>
                    </div>

                    <p className="mt-5 min-h-[2.6rem] font-body text-[0.8rem] leading-[1.55] text-[var(--dg-ink)]/85">
                      {isActive
                        ? next
                          ? `Al agotarse, el precio sube a ${next.priceLabel}.`
                          : "Es el último nivel de lanzamiento."
                        : soldOut
                          ? "Este nivel ya cerró."
                          : prev
                            ? `Se abre cuando se agote el nivel ${prev.label}.`
                            : ""}
                    </p>

                    {isActive ? (
                      <button
                        type="button"
                        onClick={() => openLeadForTier(tier.label)}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-display text-[0.64rem] font-bold tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.02]"
                        style={{ background: GRADIENT }}
                      >
                        APARTAR MI LUGAR
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="mt-6 w-full cursor-not-allowed rounded-sm border border-[var(--dg-line)] px-5 py-3.5 font-display text-[0.64rem] font-bold tracking-[0.18em] text-[var(--dg-muted)]"
                      >
                        {soldOut ? "AGOTADO" : "AÚN NO DISPONIBLE"}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <motion.p {...reveal(0.1)} className="font-body text-[0.9rem] font-semibold text-[var(--dg-accent-text)]">
                {DG_LAUNCH_DIFFERENTIATOR}
              </motion.p>
              <motion.p {...reveal(0.16)} className="mx-auto mt-4 max-w-[640px] font-body text-[0.82rem] leading-[1.7] text-[var(--dg-muted)]">
                50% de anticipo para arrancar / 50% contra entrega. Entrega en {DG_LAUNCH_DELIVERY.delivery}. {DG_LAUNCH_DELIVERY.deliveryNote}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── 10. Garantía + preguntas (claro) ───────────────────────────── */}
        <section className="w-full bg-[var(--dg-bg)] px-8 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[900px]">
            <motion.h2 {...reveal(0.06)} className={`mb-12 ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
              Trabajamos para que compitas por las posiciones más visibles.
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div {...reveal(0.08)} className="rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--dg-accent-text)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  GARANTIZAMOS
                </span>
                <p className={BODY}>
                  Entrega técnica en {DG_LAUNCH_DELIVERY.delivery} desde que recibimos tu información completa: infraestructura web en línea,
                  ficha de Google optimizada y ruta directa a WhatsApp operativa.
                </p>
              </motion.div>
              <motion.div {...reveal(0.16)} className="rounded-sm border border-[var(--dg-line)] bg-[var(--dg-card)] p-8">
                <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--dg-muted)]">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  NO GARANTIZAMOS
                </span>
                <p className={BODY}>
                  Posición #1 absoluta, resultados si no generas reseñas o no respondes a tus prospectos, ni cambios del algoritmo de Google.
                  Nadie honesto puede prometerte eso.
                </p>
              </motion.div>
            </div>

            <div className="mt-20">
              <div className="flex flex-col divide-y divide-[var(--dg-line)]">
                {DG_FAQ.map((item, i) => (
                  <motion.div key={item.q} {...reveal(0.04 * i)} className="py-6">
                    <h3 className="font-display text-[0.95rem] font-bold text-[var(--dg-ink)]">{item.q}</h3>
                    <p className={`mt-2 ${BODY}`}>{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. CTA final (oscuro, cine) ───────────────────────────────── */}
        <section id="contacto" className="relative w-full overflow-hidden bg-allitron-base md:min-h-[640px] lg:min-h-[min(52vw,780px)] xl:min-h-[min(50vw,960px)]">
          {/* Móvil: la foto arriba en bloque (encuadre en Alli + letras) y el texto debajo */}
          <div aria-hidden="true" className="relative h-[300px] w-full md:hidden">
            <LaunchImage
              bases={[IMG.ctaFinal]}
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover object-[78%_center]"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(16,24,32,0.35) 0%, rgba(16,24,32,0) 30%, rgba(16,24,32,0.7) 80%, #101820 100%)" }}
            />
          </div>

          {/* Desktop: foto de fondo; el texto va arriba a la izquierda, sobre el cielo, sin tapar las letras */}
          <div aria-hidden="true" className="absolute inset-0 hidden md:block">
            <LaunchImage
              bases={[IMG.ctaFinal]}
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover object-[center_72%] xl:object-[center_50%]"
              fallback={
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse 50% 50% at 50% 0%, ${DOMINA_GOOGLE_TOKENS.accentSoft} 0%, transparent 65%)` }}
                />
              }
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,24,32,0.78) 0%, rgba(16,24,32,0.4) 34%, rgba(16,24,32,0) 58%), linear-gradient(90deg, rgba(16,24,32,0.5) 0%, rgba(16,24,32,0) 52%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-28 pt-2 md:px-10 md:pb-20 md:pt-16 lg:px-16 xl:px-24">
            <div className="max-w-[520px] text-center md:text-left">
              <motion.h2
                {...reveal(0.04)}
                className="mb-7 font-display font-black leading-[0.98] tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)", textShadow: "0 2px 22px rgba(0,0,0,0.5)" }}
              >
                ¿LISTO PARA APARECER CUANDO TE BUSCAN?
              </motion.h2>
              <motion.div {...reveal(0.1)}>
                <CtaButton label="SÍ, QUIERO MI DIAGNÓSTICO" onClick={() => openLead("cta final")} large />
              </motion.div>
              <motion.p {...reveal(0.16)} className="mt-5 font-body text-[0.8rem] text-foreground/75" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>
                Quedan <strong className="text-foreground">{getTotalRemaining()}</strong> de {DG_LAUNCH_TOTAL_SLOTS} lugares de lanzamiento. El precio sube al agotarse cada nivel.
              </motion.p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
          QUIERO MI DIAGNÓSTICO
        </button>
      </div>
    </>
  );
}
