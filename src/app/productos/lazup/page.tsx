"use client";

// ── /productos/lazup — Landing de producto ───────────────────────────────────
// Presentado como producto terminado (instrucción directa de Lups). Usa el
// rosa oficial de LAZUP y sus superficies reales (config/productTheme.ts,
// tomados de la documentación técnica del producto), y reutiliza el mismo
// grafo animado del home (reskineado en rosa) como pieza central del hero —
// misma "experiencia" que el resto del sitio, no una landing genérica aparte.

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Users,
  MessageCircle,
  TrendingUp,
  Clock,
  CalendarCheck,
  Building2,
  Bot,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import ProductLeadForm from "@/components/forms/ProductLeadForm";
import AllitronGraph from "@/components/visual/AllitronGraph";
import Magnet from "@/components/effects/Magnet";
import StackingCard from "@/components/effects/StackingCard";
import { PRODUCT_LAZUP } from "@/config/assets";
import { LAZUP_TOKENS } from "@/config/productTheme";
import { LAZUP_FLOW, LAZUP_MODULES, LAZUP_VERTICALS, type LazupModule } from "@/data/lazupContent";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const T = LAZUP_TOKENS;

const ICONS: Record<LazupModule["icon"], React.ElementType> = {
  users: Users,
  messages: MessageCircle,
  sales: TrendingUp,
  clock: Clock,
  calendar: CalendarCheck,
  team: Building2,
  bot: Bot,
  aurora: Sparkles,
};

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

export default function LazupPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-8 pb-16 pt-32 lg:px-16 xl:px-24"
          style={{ background: T.bg }}
        >
          {/* Layered ambient — same vocabulary as the home Hero */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  `linear-gradient(${T.accent}1a 1px,transparent 1px),` +
                  `linear-gradient(90deg,${T.accent}1a 1px,transparent 1px)`,
                backgroundSize: "80px 80px",
                opacity: 0.05,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 55% 60% at 88% 12%, ${T.accentSoft} 0%, transparent 62%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 45% 45% at 4% 85%, ${T.accent}14 0%, transparent 60%)`,
              }}
            />
          </div>

          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-6">
            <div className="max-w-[560px]">
              <motion.p
                {...reveal(0)}
                className="mb-6 inline-flex items-center gap-2 font-display text-[0.58rem] font-semibold tracking-[0.4em]"
                style={{ color: T.accent }}
              >
                LAZUP · BY SOMOS LÁZARO
              </motion.p>

              <motion.h1
                {...reveal(0.08)}
                className="font-display font-black leading-[0.94] tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)", color: T.text }}
              >
                TU NEGOCIO, ORDENADO DENTRO DE WHATSAPP.
              </motion.h1>

              <motion.p
                {...reveal(0.18)}
                className="mt-6 max-w-[460px] font-body text-[0.92rem] leading-[1.85]"
                style={{ color: T.textMuted }}
              >
                Contactos, conversaciones, ventas, citas y equipo en un solo
                sistema. Sin hojas de cálculo. Sin cadenas de mensajes
                perdidas entre celulares.
              </motion.p>

              <motion.div {...reveal(0.28)} className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02] sm:px-7 sm:py-3.5"
                  style={{ background: T.gradient }}
                >
                  OBTENER INFORMACIÓN
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center border px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] transition-all sm:px-7 sm:py-3.5"
                  style={{ borderColor: T.border, color: T.textMuted }}
                >
                  VER CÓMO FUNCIONA
                </a>
              </motion.div>
            </div>

            {/* Grafo animado — mismo motor del home, reskineado en rosa LAZUP */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="relative aspect-square w-full"
            >
              <AllitronGraph
                solutionId="lazup"
                surface="dark"
                accent={T.accent}
                className="h-full w-full"
              />
            </motion.div>
          </div>
        </section>

        {/* ── Problema ──────────────────────────────────────────────── */}
        <section className="relative w-full px-8 py-24 lg:px-16 xl:px-24" style={{ background: T.surface }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 40% 50% at 15% 0%, ${T.accentSoft} 0%, transparent 65%)` }}
          />
          <div className="relative mx-auto max-w-[1000px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em]" style={{ color: T.textMuted }}>
              EL PROBLEMA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="max-w-[720px] font-display font-black leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)", color: T.text }}
            >
              Tu WhatsApp sabe más de tus clientes que tu negocio.
            </motion.h2>

            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {[
                "Un cliente escribe, alguien contesta, y esa información se queda atrapada en un celular.",
                "Nadie sabe qué se prometió, cuándo, ni quién debe dar el siguiente paso.",
                "Los leads se enfrían mientras el equipo busca el hilo de la conversación.",
              ].map((text, i) => (
                <motion.p
                  key={text}
                  {...reveal(0.1 + i * 0.08)}
                  className="border-t pt-5 font-body text-[0.88rem] leading-[1.8]"
                  style={{ borderColor: T.border, color: T.textMuted }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cómo funciona — única sección clara, como el home Hero→Solutions ── */}
        <section id="como-funciona" className="relative w-full bg-[var(--color-light)] px-8 py-24 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-40 w-full"
            style={{ background: `linear-gradient(to bottom, ${T.surface} 0%, transparent 100%)` }}
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
              DE UN MENSAJE A UNA VENTA REGISTRADA.
            </motion.h2>

            <div className="mt-14 flex flex-col">
              {LAZUP_FLOW.map((step, i) => (
                <motion.div
                  key={step.n}
                  {...reveal(0.05 * i)}
                  className="flex items-center gap-6 border-t border-secondary/10 py-6"
                >
                  <span className="font-display text-[1.1rem] font-black tabular-nums" style={{ color: T.accent }}>
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

        {/* ── Módulos ───────────────────────────────────────────────── */}
        <section className="relative w-full px-8 py-24 lg:px-16 xl:px-24" style={{ background: T.bg }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-40 w-full"
            style={{ background: "linear-gradient(to bottom, var(--color-light) 0%, transparent 100%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 50% 40% at 90% 100%, ${T.accentSoft} 0%, transparent 60%)` }}
          />
          <div className="relative mx-auto max-w-[1200px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em]" style={{ color: T.textMuted }}>
              TODO EL SISTEMA
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="max-w-[600px] font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: T.text }}
            >
              OCHO MÓDULOS. UNA SOLA OPERACIÓN.
            </motion.h2>

            <div className="mt-14 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4" style={{ background: T.border }}>
              {LAZUP_MODULES.map((mod, i) => {
                const Icon = ICONS[mod.icon];
                return (
                  <motion.div
                    key={mod.title}
                    {...reveal(0.04 * i)}
                    className="flex flex-col gap-4 p-7 transition-colors duration-300 hover:brightness-110"
                    style={{ background: T.bg }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: `${T.accent}1f` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: T.accent }} strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-[0.88rem] font-bold" style={{ color: T.text }}>
                      {mod.title}
                    </h3>
                    <p className="font-body text-[0.8rem] leading-[1.7]" style={{ color: T.textMuted }}>
                      {mod.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Screenshots — continúa la misma zona oscura, sin salto ──── */}
        <section className="relative w-full px-8 py-24 lg:px-16 xl:px-24" style={{ background: T.bg }}>
          <div className="mx-auto max-w-[1200px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em]" style={{ color: T.textMuted }}>
              ASÍ SE VE POR DENTRO
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: T.text }}
            >
              EL PRODUCTO, NO UNA MAQUETA.
            </motion.h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <Magnet padding={80} strength={9}>
                <PhotoFrame src={PRODUCT_LAZUP.conversations} alt="LAZUP — bandeja de conversaciones" aspect="aspect-[3/4]" />
              </Magnet>
              <PhotoFrame src={PRODUCT_LAZUP.crm} alt="LAZUP — Contacto 360 y pipeline" aspect="aspect-[3/4]" />
              <PhotoFrame src={PRODUCT_LAZUP.appointments} alt="LAZUP — catálogo y citas" aspect="aspect-[3/4]" />
            </div>
          </div>
        </section>

        {/* ── Verticales ────────────────────────────────────────────── */}
        <section className="relative w-full px-8 py-24 lg:px-16 xl:px-24" style={{ background: T.surfaceSoft }}>
          <div className="mx-auto max-w-[1100px]">
            <motion.span {...reveal(0)} className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em]" style={{ color: T.textMuted }}>
              UNA PLATAFORMA, TRES FORMAS DE OPERAR
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-14 max-w-[600px] font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)", color: T.text }}
            >
              MISMO NÚCLEO. VOCABULARIO DISTINTO SEGÚN TU NEGOCIO.
            </motion.h2>

            <div className="relative flex flex-col gap-6">
              {LAZUP_VERTICALS.map((v, i) => (
                <StackingCard key={v.name} index={i} total={LAZUP_VERTICALS.length}>
                  <div
                    className="flex h-full flex-col justify-center gap-5 rounded-sm border-t-2 p-10 sm:p-14"
                    style={{ borderColor: i === 0 ? T.accent : T.border, background: T.bg }}
                  >
                    <span className="block font-display text-[0.52rem] font-bold tracking-[0.3em]" style={{ color: T.textMuted }}>
                      {v.tag.toUpperCase()}
                    </span>
                    <h3
                      className="font-display font-black leading-[0.95]"
                      style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", color: T.text }}
                    >
                      {v.name}
                    </h3>
                    <p className="max-w-[560px] font-body text-[0.9rem] leading-[1.85]" style={{ color: T.textMuted }}>
                      {v.description}
                    </p>
                  </div>
                </StackingCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Diferenciador ─────────────────────────────────────────── */}
        <section className="relative w-full px-8 py-28 lg:px-16 xl:px-24" style={{ background: T.bg }}>
          <div className="mx-auto max-w-[720px] text-center">
            <motion.h2
              {...reveal(0)}
              className="font-display font-black leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", color: T.text }}
            >
              LAZUP no entrega un{" "}
              <span
                style={{
                  background: T.gradient,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                CRM vacío
              </span>
              .
            </motion.h2>
            <motion.p
              {...reveal(0.1)}
              className="mx-auto mt-6 max-w-[520px] font-body text-[0.92rem] leading-[1.9]"
              style={{ color: T.textMuted }}
            >
              La mayoría de los CRM te dan una base de datos y te dejan solo.
              LAZUP configura la operación completa — WhatsApp conectado,
              catálogo cargado, equipo con roles, IA lista por departamento.
              Llegas y ya está funcionando.
            </motion.p>
          </div>
        </section>

        {/* ── Contacto ──────────────────────────────────────────────── */}
        <section id="contacto" className="relative w-full px-8 py-28 lg:px-16 xl:px-24" style={{ background: T.surface }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 50% 50% at 50% 0%, ${T.accentSoft} 0%, transparent 65%)` }}
          />
          <div className="relative mx-auto max-w-[560px]">
            <motion.span {...reveal(0)} className="mb-5 block text-center font-display text-[0.52rem] font-bold tracking-[0.44em]" style={{ color: T.textMuted }}>
              CONTACTO
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="mb-4 text-center font-display font-black leading-[0.98] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.6rem)", color: T.text }}
            >
              ¿LISTO PARA ORDENAR TU OPERACIÓN?
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              className="mb-12 text-center font-body text-[0.88rem] leading-[1.8]"
              style={{ color: T.textMuted }}
            >
              Cuéntanos de tu negocio y te mostramos cómo se vería LAZUP
              funcionando en tu WhatsApp.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="rounded-sm border p-8 sm:p-10"
              style={{ borderColor: T.border, background: T.bg }}
            >
              <ProductLeadForm product="LAZUP" accent={T.accent} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
