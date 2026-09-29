"use client";

// ── /productos — Portafolio de Allitron ─────────────────────────────────────
// Página de presentación (no de anuncios). Misma esencia visual que las
// landings de Domina Google y Toma tu Mercado: hero oscuro, cuerpo claro,
// tipografía display, tarjetas rectas, entradas suaves al hacer scroll.
// Diferencia con las landings: aquí no se vende un producto; se ayuda a
// elegir. Cada tarjeta lleva a su landing, que es la que cierra.
//
// Datos: src/data/portfolio.ts (precios leídos de cada archivo de contenido).

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LaunchImage } from "@/components/media/LaunchImage";
import { waLink } from "@/config/contact";
import {
  PORTFOLIO,
  PORTFOLIO_AVAILABLE,
  PORTFOLIO_GUIDE,
  PORTFOLIO_HERO_IMAGE,
  PORTFOLIO_SOON,
  type PortfolioProduct,
} from "@/data/portfolio";
import { AI_SCENES_NOTE, base } from "@/components/site/ui";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ALLITRON_GRADIENT = "linear-gradient(135deg, #3CC4F7 0%, #09AFF2 50%, #034058 100%)";

// Paleta clara neutra del portafolio (no pertenece a ningún producto).
const LIGHT_VARS = {
  "--pf-bg": "#F4F5F3",
  "--pf-bg-alt": "#E9ECE8",
  "--pf-card": "#FFFFFF",
  "--pf-ink": "#101820",
  "--pf-muted": "#56616A",
  "--pf-line": "rgba(16,24,32,0.11)",
} as CSSProperties;

const H2 = "font-display font-black leading-[1.05] tracking-tight text-[var(--pf-ink)]";
const BODY = "font-body text-[0.88rem] leading-[1.8] text-[var(--pf-muted)]";
const EYEBROW = "mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em]";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

const byId = (id: PortfolioProduct["id"]) => PORTFOLIO.find((p) => p.id === id)!;

function ProductCard({ p, index }: { p: PortfolioProduct; index: number }) {
  const [imgOk, setImgOk] = useState(false);
  return (
    <motion.article
      {...reveal(0.08 * index)}
      className="group flex flex-col overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)] shadow-[0_30px_80px_-40px_rgba(16,24,32,0.35)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-allitron-base">
        {p.image && (
          <LaunchImage
            bases={[base(p.image)]}
            alt=""
            wrapperClassName="h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
            onStatusChange={setImgOk}
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: imgOk
              ? "linear-gradient(180deg, rgba(16,24,32,0) 35%, rgba(16,24,32,0.85) 100%)"
              : `radial-gradient(ellipse 70% 80% at 80% 10%, ${p.accent}33 0%, transparent 65%)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: p.accent }}>
            {`0${index + 1}`} · DISPONIBLE
          </span>
          <h3 className="mt-2 font-display text-[1.9rem] font-black leading-none tracking-tight text-white">{p.name}</h3>
        </div>
      </div>

      {p.gallery && (
        <div className="grid grid-cols-3 gap-px bg-[var(--pf-line)]">
          {p.gallery.map((g) => (
            <LaunchImage
              key={g}
              bases={[base(g)]}
              alt=""
              wrapperClassName="aspect-[4/3] w-full overflow-hidden bg-[var(--pf-bg-alt)]"
              imgClassName="h-full w-full object-cover"
              fallback={<div className="aspect-[4/3] w-full bg-[var(--pf-bg-alt)]" />}
            />
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <p className="font-display text-[1.05rem] font-bold leading-snug text-[var(--pf-ink)]">&ldquo;{p.problem}&rdquo;</p>
        <p className={`mt-3 ${BODY}`}>{p.promise}</p>

        {p.gets && (
          <ul className="mt-6 flex flex-col gap-2.5 border-t border-[var(--pf-line)] pt-6">
            {p.gets.map((g) => (
              <li key={g} className="flex items-start gap-2.5">
                <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: p.accent }} strokeWidth={2.6} />
                <span className="font-body text-[0.82rem] leading-[1.55] text-[var(--pf-ink)]/85">{g}</span>
              </li>
            ))}
          </ul>
        )}

        {p.forWho && (
          <p className="mt-6 font-body text-[0.76rem] leading-[1.6] text-[var(--pf-muted)]">
            <strong className="text-[var(--pf-ink)]">Para quién:</strong> {p.forWho}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-5 pt-8">
          <div>
            {p.priceFrom && (
              <p className="font-display font-black leading-none tracking-tight text-[var(--pf-ink)]" style={{ fontSize: "1.7rem" }}>
                <span className="mr-1.5 align-middle text-[0.7rem] font-bold text-[var(--pf-muted)]">DESDE</span>
                {p.priceFrom}
                <span className="ml-1 text-[0.7rem] font-bold text-[var(--pf-muted)]">MXN</span>
              </p>
            )}
            <p className="mt-1.5 font-body text-[0.72rem] text-[var(--pf-muted)]">
              {[p.priceNote, p.timing].filter(Boolean).join(" · ")}
            </p>
          </div>
          <Link
            href={p.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-display text-[0.6rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02]"
            style={{ background: p.gradient ?? p.accent }}
          >
            CONOCER {p.name.toUpperCase()}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductosClient() {
  const reduced = useReducedMotion();
  const [picked, setPicked] = useState<number | null>(null);
  const pickedGuide = picked !== null ? PORTFOLIO_GUIDE[picked] : null;
  const pickedProduct = pickedGuide ? byId(pickedGuide.productId) : null;
  const dg = byId("domina-google");
  const ttm = byId("toma-tu-mercado");

  return (
    <div className="bg-allitron-base">
      <Navbar />
      <main style={LIGHT_VARS}>
        {/* ── 1. Hero (oscuro) ───────────────────────────────────────────── */}
        <section className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden bg-allitron-base px-6 pb-20 pt-40 md:justify-center md:px-10 lg:px-16 xl:px-24">
          <link rel="preload" as="image" href={PORTFOLIO_HERO_IMAGE} fetchPriority="high" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={reduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 22, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTFOLIO_HERO_IMAGE}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[70%_center]"
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, #101820 0%, rgba(16,24,32,0.9) 38%, rgba(16,24,32,0.45) 65%, rgba(16,24,32,0.15) 100%), radial-gradient(ellipse 45% 55% at 10% 95%, ${ttm.accent}22 0%, transparent 60%)`,
            }}
          />

          <div className="relative mx-auto max-w-[1100px]">
            <span className={`site-fade-up ${EYEBROW} text-allitron-blue`}>
              PRODUCTOS ALLITRON
            </span>
            <h1
              className="site-fade-up max-w-[820px] font-display font-black leading-[1.02] tracking-tight text-white"
              style={{ fontSize: "clamp(2.3rem, 5.4vw, 4.2rem)", animationDelay: "0.06s" }}
            >
              Cada negocio se atora en un lugar distinto.
            </h1>
            <p style={{ animationDelay: "0.12s" }} className="site-fade-up mt-6 max-w-[560px] font-body text-[0.95rem] leading-[1.8] text-white/70">
              Unos no aparecen cuando los buscan. Otros aparecen, pero no les llegan suficientes clientes. Por eso no vendemos un paquete para todos: primero ubicamos dónde se rompe tu venta y después te decimos qué te conviene.
            </p>

            <div style={{ animationDelay: "0.18s" }} className="site-fade-up mt-10 flex flex-wrap gap-3">
              {PORTFOLIO_AVAILABLE.map((p) => (
                <Link
                  key={p.id}
                  href={`#${p.id}`}
                  className="inline-flex items-center gap-2.5 rounded-sm border border-white/15 bg-white/[0.04] px-5 py-3 font-display text-[0.62rem] font-bold tracking-[0.18em] text-white transition-colors hover:bg-white/[0.08]"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                  {p.name.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. ¿Cuál es para ti? (claro) ──────────────────────────────── */}
        <section className="w-full bg-[var(--pf-bg)] px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className={`${EYEBROW} text-[var(--pf-muted)]`}>
              ¿CUÁL ES PARA TI?
            </motion.span>
            <motion.h2 {...reveal(0.06)} className={`max-w-[640px] ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
              Elige la frase que más se parece a tu negocio hoy.
            </motion.h2>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {PORTFOLIO_GUIDE.map((g, i) => {
                const prod = byId(g.productId);
                const active = picked === i;
                return (
                  <motion.button
                    key={g.situation}
                    {...reveal(0.06 * i)}
                    type="button"
                    onClick={() => setPicked(active ? null : i)}
                    aria-pressed={active}
                    className="flex flex-col overflow-hidden rounded-sm border bg-[var(--pf-card)] p-6 text-left transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(16,24,32,0.4)]"
                    style={{ borderColor: active ? prod.accent : "var(--pf-line)", outline: active ? `2px solid ${prod.accent}` : undefined, outlineOffset: "-2px" }}
                  >
                    <LaunchImage
                      bases={[base(g.image)]}
                      alt=""
                      wrapperClassName="-mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden"
                      imgClassName="h-full w-full object-cover"
                    />
                    <span className="font-display text-[0.55rem] font-bold tracking-[0.3em] text-[var(--pf-muted)]">{`0${i + 1}`}</span>
                    <span className="mt-3 font-display text-[1rem] font-bold leading-snug text-[var(--pf-ink)]">{g.situation}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 min-h-[120px]">
              {pickedGuide && pickedProduct && (
                <motion.div
                  key={picked}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-5 rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)] p-7 md:flex-row md:items-center md:justify-between"
                >
                  <div className="max-w-[640px]">
                    <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: pickedProduct.accent }}>
                      TE CONVIENE
                    </span>
                    <p className="mt-2 font-display text-[1.4rem] font-black leading-tight text-[var(--pf-ink)]">
                      {pickedProduct.name}
                      {pickedProduct.status === "proximamente" && (
                        <span className="ml-3 align-middle font-display text-[0.55rem] font-bold tracking-[0.2em] text-[var(--pf-muted)]">PRÓXIMAMENTE</span>
                      )}
                    </p>
                    <p className={`mt-2 ${BODY}`}>{pickedGuide.why}</p>
                  </div>
                  {pickedProduct.status === "disponible" ? (
                    <Link
                      href={pickedProduct.href}
                      className="inline-flex shrink-0 items-center gap-2 rounded-sm px-6 py-3.5 font-display text-[0.6rem] font-bold tracking-[0.2em] text-white"
                      style={{ background: pickedProduct.gradient ?? pickedProduct.accent }}
                    >
                      VER {pickedProduct.name.toUpperCase()}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </Link>
                  ) : (
                    <a
                      href={waLink(pickedProduct.keyword, `Hola, creo que mi problema está dentro del negocio y quiero saber más de ${pickedProduct.name}.`, "productos · guía")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-sm px-6 py-3.5 font-display text-[0.6rem] font-bold tracking-[0.2em] text-white"
                      style={{ background: pickedProduct.accent }}
                    >
                      PLATICARLO POR WHATSAPP
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </a>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. Productos disponibles (claro alterno) ──────────────────── */}
        <section className="w-full bg-[var(--pf-bg-alt)] px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className={`${EYEBROW} text-[var(--pf-muted)]`}>
              DISPONIBLES HOY
            </motion.span>
            <motion.h2 {...reveal(0.06)} className={`max-w-[640px] ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
              Dos productos, dos momentos distintos de tu negocio.
            </motion.h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {PORTFOLIO_AVAILABLE.map((p, i) => (
                <div key={p.id} id={p.id} className="scroll-mt-28">
                  <ProductCard p={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. La ruta: primero dónde aterriza, luego abrir la llave ───── */}
        <section className="w-full bg-[var(--pf-bg)] px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className={`${EYEBROW} text-[var(--pf-muted)]`}>
              EL ORDEN IMPORTA
            </motion.span>
            <motion.h2 {...reveal(0.06)} className={`max-w-[700px] ${H2}`} style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
              Primero, que te encuentren. Después, sal a buscar clientes.
            </motion.h2>
            <motion.p {...reveal(0.1)} className={`mt-5 max-w-[620px] ${BODY}`}>
              Si lanzas anuncios y tu cliente te busca en Google antes de escribirte, lo que encuentre decide si te escribe o se va con otro. Por eso, cuando un negocio no tiene presencia en Google, empezamos por ahí.
            </motion.p>

            <div className="mt-12 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
              {[dg, ttm].map((p, i) => (
                <motion.div key={p.id} {...reveal(0.08 * i)} className={`overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)] p-7 ${i === 1 ? "md:col-start-3" : ""}`}>
                  {p.gallery?.[0] && (
                    <LaunchImage
                      bases={[base(p.gallery[0])]}
                      alt=""
                      wrapperClassName="-mx-7 -mt-7 mb-6 aspect-[16/8] overflow-hidden"
                      imgClassName="h-full w-full object-cover"
                    />
                  )}
                  <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: p.accent }}>
                    PASO {i + 1}
                  </span>
                  <p className="mt-2 font-display text-[1.3rem] font-black text-[var(--pf-ink)]">{p.name}</p>
                  <p className={`mt-2 ${BODY}`}>
                    {i === 0
                      ? "Tu negocio aparece en Google y Maps, con una página que convierte y un botón directo a tu WhatsApp."
                      : "Con esa base lista, salimos a buscar clientes con una campaña medida: sabes cuánto te cuesta cada uno."}
                  </p>
                </motion.div>
              ))}
              <div aria-hidden="true" className="hidden items-center justify-center md:col-start-2 md:row-start-1 md:flex">
                <ArrowRight className="h-5 w-5 text-[var(--pf-muted)]" strokeWidth={2} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Próximamente ───────────────────────────────────────────── */}
        <section className="w-full bg-[var(--pf-bg-alt)] px-6 py-20 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className={`${EYEBROW} text-[var(--pf-muted)]`}>
              EN CAMINO
            </motion.span>
            <div className="grid gap-4 md:grid-cols-3">
              {PORTFOLIO_SOON.map((p, i) => (
                <motion.div key={p.id} {...reveal(0.06 * i)}>
                  <Link
                    href={p.href}
                    className="flex h-full flex-col overflow-hidden rounded-sm border border-[var(--pf-line)] bg-[var(--pf-card)]/70 p-6 transition-colors hover:bg-[var(--pf-card)]"
                  >
                    {p.image && (
                      <LaunchImage
                        bases={[base(p.image)]}
                        alt=""
                        wrapperClassName="-mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden opacity-90 grayscale-[35%]"
                        imgClassName="h-full w-full object-cover"
                      />
                    )}
                    <span className="inline-flex items-center gap-1.5 font-display text-[0.52rem] font-bold tracking-[0.24em]" style={{ color: p.accent }}>
                      <Clock className="h-3 w-3" strokeWidth={2.5} />
                      PRÓXIMAMENTE
                    </span>
                    <span className="mt-3 font-display text-[1.1rem] font-black text-[var(--pf-ink)]">{p.name}</span>
                    <span className="mt-2 font-body text-[0.8rem] leading-[1.6] text-[var(--pf-muted)]">{p.promise}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CTA final (oscuro) ─────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-allitron-base px-6 py-28 text-center md:px-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(9,175,242,0.16) 0%, transparent 65%)" }} />
          <div className="relative mx-auto max-w-[680px]">
            <motion.h2
              {...reveal(0)}
              className="font-display font-black leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
            >
              ¿No sabes cuál te toca?
            </motion.h2>
            <motion.p {...reveal(0.06)} className="mx-auto mt-5 max-w-[520px] font-body text-[0.92rem] leading-[1.8] text-white/70">
              Escríbenos. En el diagnóstico gratis revisamos dónde se rompe tu venta y te decimos qué conviene, aunque la respuesta sea que todavía no inviertas.
            </motion.p>
            <motion.a
              {...reveal(0.12)}
              href={waLink("WEB", "Hola, vi los productos de Allitron y quiero saber cuál me conviene.", "productos · CTA final")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-sm px-8 py-4 font-display text-[0.68rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: ALLITRON_GRADIENT }}
            >
              QUIERO MI DIAGNÓSTICO GRATIS
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.a>
            <p className="mt-14 font-body text-[0.66rem] text-white/40">{AI_SCENES_NOTE}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
