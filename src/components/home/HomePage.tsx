"use client";

// ── Home de Allitron (rediseño 29-sep-2026) ─────────────────────────────────
// Pedido de Lups: misma sensación que las landings (hero con foto, cuerpo
// claro, formatos iguales), mejor estructura y carga más rápida.
//
// Rendimiento: sin intro de pantalla completa, sin videos en autoplay, sin
// galería de 21 fotos ni grafo animado. Una sola imagen con prioridad (hero);
// todo lo demás carga cuando está cerca de la vista (LaunchImage).
//
// Los componentes anteriores (Hero, ConnectionIntro, WorkMarquee, Solutions,
// HubTeaser) siguen en src/components/sections/ sin usarse aquí.

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LaunchImage } from "@/components/media/LaunchImage";
import { waLink } from "@/config/contact";
import { PORTFOLIO, PORTFOLIO_AVAILABLE, PORTFOLIO_SOON } from "@/data/portfolio";
import { DG_PROOF_CASES, DG_PROOF_LINKS } from "@/data/dominaGoogleLaunchContent";
import { HOME_BREAKS, HOME_FINAL, HOME_HERO, HOME_HUB, HOME_METHOD } from "@/data/homeContent";
import {
  AI_SCENES_NOTE,
  ALLITRON_GRADIENT,
  BODY,
  EASE,
  GradientLink,
  SECTION,
  SITE_LIGHT_VARS,
  SectionHead,
  base,
  reveal,
} from "@/components/site/ui";

const DIAG_LINK = (origin: string) =>
  waLink("WEB", "Hola, vengo de allitron.io y quiero mi diagnóstico gratis.", `home · ${origin}`);

const byId = (id: string) => PORTFOLIO.find((p) => p.id === id);

function Photo({ src, className, alt = "" }: { src: string; className: string; alt?: string }) {
  return (
    <LaunchImage
      bases={[base(src)]}
      alt={alt}
      wrapperClassName={className}
      imgClassName="h-full w-full object-cover"
      fallback={<div className={`${className} bg-[var(--pf-bg-alt)]`} />}
    />
  );
}

export default function HomePage() {
  const reduced = useReducedMotion();
  const proof = DG_PROOF_CASES.filter((c) => c.approved);

  return (
    <div className="bg-allitron-base">
      {/* Solo se descarga la foto del hero que corresponde al tamaño de pantalla:
          precarga por media query + las <img> ocultas son lazy (no bajan si no se ven). */}
      <link rel="preload" as="image" href={HOME_HERO.image} media="(min-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href={HOME_HERO.imageMobile} media="(max-width: 767px)" fetchPriority="high" />
      <Navbar />

      <main style={SITE_LIGHT_VARS}>
        {/* ── 1. Hero (oscuro, con foto) ────────────────────────────────── */}
        <section className="relative flex flex-col overflow-hidden bg-allitron-base px-6 pb-14 md:min-h-[100svh] md:justify-center md:px-10 md:pb-20 md:pt-32 lg:px-16 xl:px-24">
          {/* Móvil: la foto va arriba (Alli completo) y el texto debajo, sin encimarse. */}
          <div aria-hidden="true" className="relative -mx-6 aspect-[4/5] overflow-hidden md:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HOME_HERO.imageMobile} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-[center_75%]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,24,32,0) 55%, #101820 100%)" }} />
          </div>
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 hidden md:block"
            initial={{ scale: 1 }}
            animate={reduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 22, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HOME_HERO.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[85%_center]"
            />
          </motion.div>
          {/* Degradados: cubren el texto integrado en la foto y dan lectura. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(90deg, #101820 0%, #101820 30%, rgba(16,24,32,0.93) 48%, rgba(16,24,32,0.5) 62%, rgba(16,24,32,0) 80%)" }}
          />

          <div className="relative mx-auto -mt-10 w-full max-w-[1200px] md:mt-0">
            <span style={{ animationDelay: "0s" }} className="site-fade-up mb-5 block font-display text-[0.55rem] font-bold tracking-[0.34em] text-allitron-blue">
              {HOME_HERO.eyebrow}
            </span>
            <h1
              className="site-fade-up max-w-[640px] font-display font-black leading-[1.02] tracking-tight text-white"
              style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)", animationDelay: "0.06s" }}
            >
              {HOME_HERO.title}
            </h1>
            <p style={{ animationDelay: "0.12s" }} className="site-fade-up mt-6 max-w-[520px] font-body text-[0.95rem] leading-[1.8] text-white/75">
              {HOME_HERO.body}
            </p>
            <div style={{ animationDelay: "0.18s" }} className="site-fade-up mt-10 flex flex-col gap-3 sm:flex-row">
              <GradientLink href={DIAG_LINK("hero")} external large>
                {HOME_HERO.primary}
              </GradientLink>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 bg-white/[0.05] px-8 py-4 font-display text-[0.68rem] font-bold tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white/[0.12]"
              >
                {HOME_HERO.secondary}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
            <ul style={{ animationDelay: "0.24s" }} className="site-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {HOME_HERO.trust.map((t) => (
                <li key={t} className="flex items-center gap-2 font-body text-[0.76rem] text-white/65">
                  <Check className="h-3.5 w-3.5 text-allitron-blue" strokeWidth={2.6} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 2. Dónde se rompe tu venta (claro) ─────────────────────────── */}
        <section className={`${SECTION} bg-[var(--pf-bg)]`}>
          <div className="mx-auto max-w-[1200px]">
            <SectionHead
              eyebrow="EL PROBLEMA REAL"
              title="Vender más es el síntoma. Primero hay que saber dónde se rompe la venta."
              body="Casi todos los negocios que atendemos se atoran en uno de estos tres puntos. Cada uno se resuelve distinto."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {HOME_BREAKS.map((b, i) => {
                const prod = byId(b.productId);
                const available = prod?.status === "disponible";
                return (
                  <motion.article
                    key={b.n}
                    {...reveal(0.08 * i)}
                    className="flex flex-col overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)]"
                  >
                    <Photo src={b.image} className="aspect-[16/10] w-full overflow-hidden" />
                    <div className="flex flex-1 flex-col p-6">
                      <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: prod?.accent }}>
                        {b.n}
                      </span>
                      <h3 className="mt-2 font-display text-[1.15rem] font-black leading-snug text-[var(--pf-ink)]">{b.title}</h3>
                      <p className={`mt-3 ${BODY}`}>{b.body}</p>
                      <Link
                        href={available ? `/productos#${b.productId}` : "/productos"}
                        className="mt-auto inline-flex items-center gap-1.5 pt-6 font-display text-[0.58rem] font-bold tracking-[0.18em]"
                        style={{ color: prod?.accent }}
                      >
                        {available ? <ArrowRight className="h-3 w-3" strokeWidth={2.6} /> : <Clock className="h-3 w-3" strokeWidth={2.6} />}
                        {b.cta.toUpperCase()}
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. Productos (claro alterno, filas con foto) ──────────────── */}
        <section className={`${SECTION} bg-[var(--pf-bg-alt)]`}>
          <div className="mx-auto max-w-[1200px]">
            <SectionHead eyebrow="PRODUCTOS" title="Dos productos disponibles hoy. Cada uno para un momento distinto de tu negocio." />
            <div className="mt-14 flex flex-col gap-8">
              {PORTFOLIO_AVAILABLE.map((p, i) => (
                <motion.article
                  key={p.id}
                  {...reveal(0.06)}
                  className={`grid overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)] shadow-[0_30px_80px_-45px_rgba(16,24,32,0.35)] md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="relative min-h-[260px] overflow-hidden bg-allitron-base">
                    {p.image && <Photo src={p.image} className="absolute inset-0 h-full w-full" />}
                  </div>
                  <div className="flex flex-col p-8 md:p-10">
                    <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: p.accent }}>
                      {`0${i + 1}`} · DISPONIBLE
                    </span>
                    <h3 className="mt-2 font-display text-[2rem] font-black leading-none tracking-tight text-[var(--pf-ink)]">{p.name}</h3>
                    <p className="mt-5 font-display text-[1.02rem] font-bold leading-snug text-[var(--pf-ink)]">&ldquo;{p.problem}&rdquo;</p>
                    <p className={`mt-3 ${BODY}`}>{p.promise}</p>
                    {p.gets && (
                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {p.gets.map((g) => (
                          <li key={g} className="flex items-start gap-2.5">
                            <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: p.accent }} strokeWidth={2.6} />
                            <span className="font-body text-[0.8rem] leading-[1.55] text-[var(--pf-ink)]/85">{g}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                      {p.priceFrom && (
                        <p className="font-display font-black leading-none tracking-tight text-[var(--pf-ink)]" style={{ fontSize: "1.6rem" }}>
                          <span className="mr-1.5 align-middle text-[0.66rem] font-bold text-[var(--pf-muted)]">DESDE</span>
                          {p.priceFrom}
                          <span className="ml-1 text-[0.66rem] font-bold text-[var(--pf-muted)]">MXN</span>
                          <span className="mt-1.5 block font-body text-[0.7rem] font-normal tracking-normal text-[var(--pf-muted)]">{p.priceNote}</span>
                        </p>
                      )}
                      <Link
                        href={`/productos#${p.id}`}
                        className="inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-display text-[0.6rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02]"
                        style={{ background: p.gradient ?? p.accent }}
                      >
                        VER {p.name.toUpperCase()}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div {...reveal(0.1)} className="mt-8 flex flex-col gap-3 rounded-sm border border-dashed border-[var(--pf-line)] p-6 md:flex-row md:items-center md:justify-between">
              <p className="font-body text-[0.84rem] text-[var(--pf-muted)]">
                <strong className="text-[var(--pf-ink)]">En camino:</strong> {PORTFOLIO_SOON.map((p) => p.name).join(" · ")}
              </p>
              <Link href="/productos" className="inline-flex items-center gap-1.5 font-display text-[0.58rem] font-bold tracking-[0.18em] text-allitron-blue">
                VER TODOS LOS PRODUCTOS <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 4. Prueba real (claro) ────────────────────────────────────── */}
        {proof.length > 0 && (
          <section className={`${SECTION} bg-[var(--pf-bg)]`}>
            <div className="mx-auto max-w-[1200px]">
              <SectionHead
                eyebrow="NEGOCIOS REALES"
                title="Negocios de Tepic que ya aparecen cuando los buscan."
                body="Clientes de Domina Google. Cifras tomadas de su propio panel de Google, con el periodo de cada una."
              />
              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {proof.map((c, i) => (
                  <motion.article key={c.id} {...reveal(0.08 * i)} className="flex flex-col overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)]">
                    <Photo src={c.web} alt={`Página web de ${c.business ?? c.niche}`} className="aspect-[16/10] w-full overflow-hidden border-b border-[var(--pf-line)] bg-white" />
                    <div className="flex flex-1 flex-col p-6">
                      <span className="font-display text-[0.55rem] font-bold tracking-[0.24em] text-[var(--pf-muted)]">
                        {c.niche.toUpperCase()} · {c.city.toUpperCase()}
                      </span>
                      <h3 className="mt-2 font-display text-[1.1rem] font-black text-[var(--pf-ink)]">{c.business}</h3>
                      <dl className="mt-5 grid grid-cols-2 gap-4">
                        {c.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="font-display text-[1.5rem] font-black leading-none text-[var(--pf-ink)]">{m.value}</dt>
                            <dd className="mt-1.5 font-body text-[0.72rem] leading-snug text-[var(--pf-muted)]">{m.label}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-auto pt-5 font-body text-[0.66rem] text-[var(--pf-muted)]">{c.period}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
              {DG_PROOF_LINKS.length > 0 && (
                <motion.div {...reveal(0.1)} className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="font-display text-[0.55rem] font-bold tracking-[0.24em] text-[var(--pf-muted)]">TAMBIÉN CONFÍAN EN NOSOTROS</span>
                  {DG_PROOF_LINKS.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)] px-3.5 py-2 font-body text-[0.74rem] text-[var(--pf-ink)] transition-colors hover:border-allitron-blue"
                    >
                      {l.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* ── 5. Cómo trabajamos (claro alterno) ────────────────────────── */}
        <section className={`${SECTION} bg-[var(--pf-bg-alt)]`}>
          <div className="mx-auto max-w-[1200px]">
            <SectionHead eyebrow="CÓMO TRABAJAMOS" title="Primero entender. Después construir. Siempre medir." />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {HOME_METHOD.map((m, i) => (
                <motion.div key={m.n} {...reveal(0.06 * i)} className="overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)]">
                  <Photo src={m.image} className="aspect-[4/3] w-full overflow-hidden" />
                  <div className="p-6">
                    <span className="font-display text-[0.55rem] font-bold tracking-[0.3em] text-allitron-blue">{m.n}</span>
                    <h3 className="mt-2 font-display text-[1.1rem] font-black text-[var(--pf-ink)]">{m.label}</h3>
                    <p className="mt-2 font-body text-[0.8rem] leading-[1.65] text-[var(--pf-muted)]">{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Hub (oscuro) ───────────────────────────────────────────── */}
        <section className={`${SECTION} relative bg-allitron-base`}>
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHead dark eyebrow={HOME_HUB.eyebrow} title={HOME_HUB.title} body={HOME_HUB.body} />
              <motion.div {...reveal(0.14)} className="mt-9">
                <Link
                  href="/hub"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-7 py-3.5 font-display text-[0.62rem] font-bold tracking-[0.2em] text-white transition-colors hover:bg-white/[0.08]"
                >
                  {HOME_HUB.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HOME_HUB.images.map((src, i) => (
                <motion.div key={src} {...reveal(0.06 * i)} className={i === 0 ? "col-span-2" : ""}>
                  <Photo src={src} className={`${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"} w-full overflow-hidden rounded-sm`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. Cierre (oscuro, con foto) ──────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-allitron-base px-6 py-32 text-center md:px-10">
          <div aria-hidden="true" className="absolute inset-0">
            <LaunchImage bases={[base(HOME_FINAL.image)]} wrapperClassName="h-full w-full" imgClassName="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,24,32,0.55) 0%, rgba(16,24,32,0.8) 60%, #101820 100%)" }} />
          </div>
          <div className="relative mx-auto max-w-[680px]">
            <motion.h2 {...reveal(0)} className="font-display font-black leading-[1.05] tracking-tight text-white" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
              {HOME_FINAL.title}
            </motion.h2>
            <motion.p {...reveal(0.06)} className="mx-auto mt-5 max-w-[520px] font-body text-[0.94rem] leading-[1.8] text-white/75">
              {HOME_FINAL.body}
            </motion.p>
            <motion.div {...reveal(0.12)} className="mt-10">
              <GradientLink href={DIAG_LINK("cierre")} external large gradient={ALLITRON_GRADIENT}>
                {HOME_FINAL.cta}
              </GradientLink>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-14 font-body text-[0.66rem] text-white/40"
            >
              {AI_SCENES_NOTE}
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
