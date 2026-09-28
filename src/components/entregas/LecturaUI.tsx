"use client";

// ── LecturaUI — piezas de lectura grande para propuestas a cliente ──
// Pensadas para un lector de 80 años que abre el link desde WhatsApp:
// letra grande, frases cortas, un ícono por idea, alto contraste y nada que
// dependa solo del color. Todo sobre `--color-light` (sistema `.neu`), igual
// que las demás entregas; el hero de cada documento sigue oscuro.

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/entregas/ui";

type IconType = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

/* Párrafo de lectura grande — el tamaño mínimo de texto de esta propuesta. */
export function BigText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`max-w-[720px] font-body text-[1.15rem] leading-[1.85] text-[#101820] [overflow-wrap:anywhere] sm:text-[1.25rem] ${className}`}>
      {children}
    </p>
  );
}

/* Título de sección grande con número de parte opcional. */
export function SectionTitle({
  kicker,
  children,
}: {
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      {kicker && (
        <p className="mb-3 font-display text-[0.78rem] font-bold uppercase tracking-[0.22em] text-allitron-navy">
          {kicker}
        </p>
      )}
      <h2 className="mb-8 max-w-[760px] font-display text-[1.6rem] font-black leading-[1.25] text-[#101820] sm:text-[2.1rem]">
        {children}
      </h2>
    </Reveal>
  );
}

/* Una idea = un ícono + un título + una frase. */
export function IconPoint({
  icon: Icon,
  title,
  text,
  tone = "blue",
  delay = 0,
}: {
  icon: IconType;
  title: string;
  text: string;
  tone?: "blue" | "orange" | "navy";
  delay?: number;
}) {
  const toneClass =
    tone === "orange"
      ? "bg-allitron-orange"
      : tone === "navy"
        ? "bg-allitron-navy"
        : "bg-allitron-blue";
  return (
    <Reveal delay={delay}>
      <div className="neu flex h-full gap-5 rounded-[22px] p-6 sm:p-7">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_8px_20px_rgba(3,64,88,0.18)] ${toneClass}`}>
          <Icon size={28} strokeWidth={2} />
        </div>
        <div className="min-w-0 [overflow-wrap:anywhere]">
          <h3 className="font-display text-[1.15rem] font-bold leading-[1.35] text-[#101820] sm:text-[1.25rem]">
            {title}
          </h3>
          <p className="mt-2 font-body text-[1.05rem] leading-[1.7] text-secondary sm:text-[1.1rem]">
            {text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* Frase destacada — lo único que el lector debe recordar de la sección. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <blockquote className="max-w-[760px] rounded-r-[18px] border-l-[5px] border-allitron-orange bg-white/70 py-6 pl-7 pr-6">
        <p className="font-display text-[1.25rem] font-bold leading-[1.5] text-[#101820] sm:text-[1.45rem]">
          {children}
        </p>
      </blockquote>
    </Reveal>
  );
}

/* Tarjeta por ciudad: cómo se ve Isuzu frente a quién compite. */
export interface Rival {
  nombre: string;
  dato: string;
}

export function CityCard({
  ciudad,
  estado,
  isuzu,
  alerta,
  rivales,
  contexto,
  oportunidad,
  delay = 0,
}: {
  ciudad: string;
  estado: string;
  isuzu: string;
  alerta: string;
  rivales: Rival[];
  contexto: string;
  oportunidad: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="neu h-full overflow-hidden rounded-[26px]">
        <header className="bg-allitron-navy px-6 py-5 sm:px-7">
          <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            {estado}
          </p>
          <h3 className="font-display text-[1.6rem] font-black text-white">{ciudad}</h3>
        </header>
        <div className="space-y-5 p-6 sm:p-7">
          <div>
            <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.12em] text-allitron-navy">
              Isuzu hoy en Google
            </p>
            <p className="mt-1 font-body text-[1.08rem] leading-[1.65] text-[#101820]">{isuzu}</p>
            <p className="mt-2 font-body text-[1.02rem] font-medium leading-[1.6] text-[#B4531F]">
              ⚠︎ {alerta}
            </p>
          </div>
          <div>
            <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.12em] text-allitron-navy">
              Con quién compite, a unos minutos
            </p>
            <ul className="mt-2 space-y-2">
              {rivales.map((r) => (
                <li key={r.nombre} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-[#101820]/[0.07] pb-2 font-body text-[1.02rem]">
                  <span className="font-semibold text-[#101820]">{r.nombre}</span>
                  <span className="text-secondary">{r.dato}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-body text-[1.02rem] leading-[1.65] text-secondary">{contexto}</p>
          <div className="rounded-[16px] bg-allitron-blue/10 p-4">
            <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.12em] text-allitron-navy">
              La oportunidad
            </p>
            <p className="mt-1 font-body text-[1.05rem] leading-[1.6] text-[#101820]">{oportunidad}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* Gráfica de meta: barras que crecen al entrar en pantalla. Índice 100 = hoy.
   Se lee sin color: cada barra trae su número y su nombre escritos. */
export function GrowthChart({
  bars,
}: {
  bars: { label: string; sub: string; value: number; tag: string; tone: "gray" | "blue" | "orange" }[];
}) {
  const reduced = useReducedMotion() ?? false;
  const max = Math.max(...bars.map((b) => b.value));
  const toneClass = {
    gray: "bg-[#9AA8B1]",
    blue: "bg-allitron-blue",
    orange: "bg-allitron-orange",
  } as const;

  return (
    <div className="neu rounded-[28px] p-6 sm:p-10">
      <div className="flex h-[340px] items-end justify-around gap-4 sm:h-[400px] sm:gap-10">
        {bars.map((b, i) => (
          <div key={b.label} className="flex h-full w-full max-w-[150px] flex-col items-center justify-end">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.35 }}
              className="mb-2 font-display text-[1.7rem] font-black text-[#101820] sm:text-[2.2rem]"
            >
              {b.tag}
            </motion.p>
            <motion.div
              initial={reduced ? false : { height: 0 }}
              whileInView={{ height: `${(b.value / max) * 78}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={reduced ? { height: `${(b.value / max) * 78}%` } : undefined}
              className={`w-full rounded-t-[18px] ${toneClass[b.tone]}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-around gap-4 border-t-2 border-[#101820]/15 pt-4 sm:gap-10">
        {bars.map((b) => (
          <div key={b.label} className="w-full max-w-[150px] text-center">
            <p className="font-display text-[1rem] font-bold text-[#101820] sm:text-[1.1rem]">{b.label}</p>
            <p className="mt-1 font-body text-[0.92rem] leading-[1.45] text-secondary">{b.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Navegación de fin de documento, versión grande (80 años / pantalla de celular). */
export function BigPageNav({
  backHref,
  backLabel = "Volver al inicio",
  nextHref,
  nextLabel,
}: {
  backHref: string;
  backLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-stretch sm:justify-center">
      <Link
        href={backHref}
        className="neu neu-hover flex min-h-[64px] items-center justify-center gap-3 rounded-[18px] px-8 py-4 font-display text-[1.1rem] font-bold text-[#101820] transition-transform active:scale-[0.98]"
      >
        <ArrowLeft size={24} />
        {backLabel}
      </Link>
      {nextHref && nextLabel && (
        <Link
          href={nextHref}
          className="flex min-h-[64px] items-center justify-center gap-3 rounded-[18px] bg-allitron-blue px-8 py-4 font-display text-[1.1rem] font-bold text-white shadow-[0_10px_24px_rgba(9,175,242,0.3)] transition-transform active:scale-[0.98]"
        >
          {nextLabel}
          <ArrowRight size={24} />
        </Link>
      )}
    </div>
  );
}

/* Hero oscuro de cada documento, con letra grande. */
export function DocHero({
  eyebrow,
  title,
  subtitle,
  logo,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  logo: React.ReactNode;
}) {
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
  return (
    <section className="relative flex min-h-[46svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-24 sm:px-10 lg:px-16 xl:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 85% 15%, rgba(9,175,242,0.12) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 10% 95%, rgba(242,135,76,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1120px]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-8">
          {logo}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-display text-[0.78rem] font-semibold tracking-[0.3em] text-allitron-blue"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease }}
          className="mt-4 font-display font-black leading-[1.18] tracking-tight text-foreground"
          style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            className="mt-6 max-w-[640px] font-body text-[1.15rem] leading-[1.8] text-[#C9D3D9] sm:text-[1.25rem]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
