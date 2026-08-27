"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, AlertTriangle, ArrowLeft, ArrowRight, Languages } from "lucide-react";

export const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`mb-4 font-display text-[0.62rem] font-semibold tracking-[0.4em] ${
        tone === "light" ? "text-allitron-navy" : "text-allitron-blue"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionShell({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 py-16 sm:px-10 md:py-24 lg:px-16 xl:px-24 ${className}`}
    >
      <div className="mx-auto max-w-[1120px]">{children}</div>
    </section>
  );
}

/* ── FrenteCard / StatChip — sistema original (fondo oscuro) ───────────
   Se conservan para compatibilidad; los reportes de reunión ahora usan
   RoadmapTimeline en su lugar (ver más abajo), pero StatChip sigue
   usándose en los heroes. */
export function FrenteCard({
  titulo,
  compromiso,
  responsable,
  fecha,
  nota,
  notaTone = "muted",
  delay = 0,
}: {
  titulo: string;
  compromiso: string;
  responsable: string;
  fecha: string;
  nota?: string;
  notaTone?: "muted" | "warning";
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="glass flex h-full flex-col rounded-[22px] p-6">
        <h3 className="font-display text-[0.95rem] font-bold text-foreground">
          {titulo}
        </h3>
        <p className="mt-3 flex-1 font-body text-[0.86rem] leading-[1.65] text-muted">
          {compromiso}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.07] pt-4 font-body text-[0.74rem] text-muted">
          <span>
            <strong className="text-foreground">Responsable:</strong> {responsable}
          </span>
          <span>
            <strong className="text-foreground">Fecha:</strong> {fecha}
          </span>
        </div>
        {nota && (
          <p
            className={`mt-3 font-body text-[0.76rem] leading-[1.5] ${
              notaTone === "warning" ? "text-allitron-orange" : "text-muted"
            }`}
          >
            {nota}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-5 py-4 text-center">
      <p className="font-display text-[1.3rem] font-black text-allitron-blue">
        {value}
      </p>
      <p className="mt-1 font-body text-[0.68rem] uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
    </div>
  );
}

/* ── RoadmapTimeline — fondo claro ──────────────────────────────────────
   Sustituye al grid de FrenteCard para contenido con fecha/orden real
   (los frentes de la reunión). La numeración y el riel vertical hacen
   visible que es una hoja de ruta, no una colección de tarjetas sueltas.
   Vive sobre `--color-light` (mismo sistema `.neu` que los hubs). */
export interface RoadmapItem {
  titulo: string;
  compromiso: string;
  responsable: string;
  fecha: string;
  nota?: string;
  notaTone?: "muted" | "warning";
}

export function RoadmapTimeline({ items }: { items: RoadmapItem[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[27px] top-2 w-px bg-[#101820]/[0.10] sm:left-[31px]"
      />
      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <Reveal key={item.titulo} delay={0.04 * i}>
            <div className="relative flex gap-5">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full neu-inset font-display text-[0.78rem] font-bold text-allitron-navy sm:h-16 sm:w-16">
                {i + 1}
              </div>
              <div className="neu min-w-0 flex-1 overflow-hidden rounded-[20px] p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="min-w-0 font-display text-[0.92rem] font-bold text-[#101820]">
                    {item.titulo}
                  </h3>
                  <span className="inline-block max-w-full shrink-0 self-start whitespace-normal break-words rounded-[10px] bg-[#101820]/[0.06] px-3 py-1 font-display text-[0.68rem] font-semibold leading-[1.4] tracking-[0.02em] text-allitron-navy">
                    {item.fecha}
                  </span>
                </div>
                <p className="mt-2 font-body text-[0.95rem] leading-[1.7] text-secondary">
                  {item.compromiso}
                </p>
                <div className="mt-3 border-t border-[#101820]/[0.07] pt-3 font-body text-[0.82rem] text-secondary/90">
                  <strong className="text-[#101820]">Responsable:</strong>{" "}
                  {item.responsable}
                </div>
                {item.nota && (
                  <p
                    className={`mt-2 flex items-start gap-1.5 font-body text-[0.85rem] leading-[1.55] ${
                      item.notaTone === "warning"
                        ? "text-allitron-orange"
                        : "text-secondary/80"
                    }`}
                  >
                    {item.notaTone === "warning" && (
                      <ShieldAlert size={13} className="mt-0.5 shrink-0" />
                    )}
                    {item.nota}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ── SummaryBlock — fondo claro ─────────────────────────────────────────
   Sustituye el bloque de 3 párrafos dentro de una caja `.glass-strong`.
   Separa: lectura corrida (lead), la frase que de verdad importa
   (highlight, como cita destacada) y el resto como puntos escaneables
   (points) — mismo contenido, jerarquía real en vez de un muro de texto. */
export function SummaryBlock({
  lead,
  highlight,
  pointsHeading,
  points,
}: {
  lead: string;
  highlight?: string;
  pointsHeading?: string;
  points?: { label: string; text: string }[];
}) {
  return (
    <div className="space-y-8">
      <Reveal>
        <p className="max-w-[720px] font-body text-[1.05rem] leading-[1.9] text-[#101820]">
          {lead}
        </p>
      </Reveal>
      {highlight && (
        <Reveal delay={0.05}>
          <blockquote className="max-w-[720px] border-l-[3px] border-allitron-orange bg-[#101820]/[0.03] py-4 pl-6 pr-4">
            <p className="font-display text-[1.05rem] font-semibold leading-[1.55] text-[#101820]">
              {highlight}
            </p>
          </blockquote>
        </Reveal>
      )}
      {points && points.length > 0 && (
        <Reveal delay={0.1}>
          <div>
            {pointsHeading && (
              <p className="mb-3 font-display text-[0.66rem] font-bold uppercase tracking-[0.14em] text-allitron-navy">
                {pointsHeading}
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <div key={p.label} className="neu rounded-[16px] p-4">
                  <p className="font-display text-[0.8rem] font-bold text-[#101820]">
                    {p.label}
                  </p>
                  <p className="mt-1 font-body text-[0.9rem] leading-[1.6] text-secondary">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ── StepList — fondo claro ──────────────────────────────────────────────
   Para listas que sí son una secuencia real (próximos pasos, plan de
   equipo): la numeración indica orden/prioridad, no decoración. */
export function StepList({
  items,
}: {
  items: { titulo?: string; texto: string; etiqueta?: string }[];
}) {
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <Reveal key={item.texto} delay={0.04 * i}>
          <div className="neu flex flex-col gap-3 rounded-[16px] p-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-allitron-blue font-display text-[0.72rem] font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                {item.titulo && (
                  <p className="font-display text-[0.95rem] font-bold text-[#101820]">
                    {item.titulo}
                  </p>
                )}
                <p
                  className={`font-body text-[0.95rem] leading-[1.65] ${
                    item.titulo ? "mt-1 text-secondary" : "text-[#101820]"
                  }`}
                >
                  {item.texto}
                </p>
              </div>
            </div>
            {item.etiqueta && (
              <span className="ml-11 shrink-0 self-start rounded-full bg-[#101820]/[0.06] px-3 py-1 font-display text-[0.66rem] font-semibold tracking-[0.03em] text-allitron-navy sm:ml-0 sm:self-center">
                {item.etiqueta}
              </span>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── RiskList — fondo oscuro, se conserva deliberadamente oscuro ────────
   Es la única sección que debe seguir leyéndose como alerta: lo crítico
   no compite en el mismo tono que el resto del reporte. La etiqueta
   "Crítico" reemplaza el anillo como única señal, para que no dependa
   solo del color. */
export function RiskList({
  items,
}: {
  items: { titulo: string; texto: string; critico?: boolean }[];
}) {
  return (
    <div className="grid gap-4">
      {items.map((r, i) => (
        <Reveal key={r.titulo} delay={0.04 * i}>
          <div
            className={`glass flex gap-4 rounded-[20px] p-5 ${
              r.critico ? "ring-1 ring-allitron-orange/50" : ""
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {r.critico ? (
                <ShieldAlert size={20} className="text-allitron-orange" />
              ) : (
                <AlertTriangle size={18} className="text-muted" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-[0.98rem] font-bold text-foreground">
                  {r.titulo}
                </h3>
                {r.critico && (
                  <span className="rounded-full bg-allitron-orange/15 px-2.5 py-0.5 font-display text-[0.6rem] font-bold uppercase tracking-[0.08em] text-allitron-orange">
                    Crítico
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-body text-[0.93rem] leading-[1.65] text-muted">
                {r.texto}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── PersonCard — fondo claro ────────────────────────────────────────────
   Reemplaza el mismo ícono "Users" repetido para las 4 personas por
   iniciales sobre un color de marca — distingue a cada persona en vez
   de repetir la misma pieza visual. */
const PERSON_TONES = [
  "bg-allitron-blue",
  "bg-allitron-orange",
  "bg-allitron-navy",
  "bg-secondary",
];

function initials(nombre: string) {
  return nombre
    .replace(/["“”·].*$/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function PersonCard({
  nombre,
  rol,
  index = 0,
}: {
  nombre: string;
  rol: string;
  index?: number;
}) {
  return (
    <Reveal delay={0.04 * index}>
      <div className="neu flex items-center gap-4 rounded-[18px] p-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[0.78rem] font-bold text-white ${
            PERSON_TONES[index % PERSON_TONES.length]
          }`}
        >
          {initials(nombre)}
        </div>
        <div className="min-w-0">
          <p className="font-display text-[0.92rem] font-bold text-[#101820]">
            {nombre}
          </p>
          <p className="font-body text-[0.86rem] text-secondary">{rol}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ── PullQuote — fondo claro ─────────────────────────────────────────────
   Para cierres/declaraciones positivas (no de alerta): mismo rol que el
   antiguo `.glass-strong` de cierre, pero en el sistema `.neu` claro. */
export function PullQuote({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="neu flex flex-col items-center gap-5 rounded-[28px] p-10 text-center">
        <Icon size={26} className="text-allitron-blue" />
        <p className="max-w-[560px] font-body text-[1.08rem] leading-[1.85] text-[#101820]">
          {children}
        </p>
      </div>
    </Reveal>
  );
}

/* ── PageNav — navegación de fin de página, pensada para lectores de edad
   mayor ─────────────────────────────────────────────────────────────────
   Botones grandes, con texto explícito (nunca solo un ícono), alto
   contraste y área de toque amplia. Vive al final de cada documento, antes
   del footer — es lo primero que se busca al terminar de leer. */
export function PageNav({
  backHref,
  backLabel = "Volver al menú principal",
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
        className="neu neu-hover flex items-center justify-center gap-2.5 rounded-[16px] px-7 py-4 font-display text-[0.95rem] font-bold text-[#101820] transition-transform active:scale-[0.98]"
      >
        <ArrowLeft size={20} />
        {backLabel}
      </Link>
      {nextHref && nextLabel && (
        <Link
          href={nextHref}
          className="flex items-center justify-center gap-2.5 rounded-[16px] bg-allitron-blue px-7 py-4 font-display text-[0.95rem] font-bold text-white shadow-[0_10px_24px_rgba(9,175,242,0.28)] transition-transform active:scale-[0.98]"
        >
          {nextLabel}
          <ArrowRight size={20} />
        </Link>
      )}
    </div>
  );
}

/* ── LangToggle — ES / 中文 ──────────────────────────────────────────────
   Para las páginas que ve Shineray directamente. Interruptor simple de
   estado local (no persiste entre páginas a propósito: cada documento es
   independiente). El texto en chino usa `lang="zh"` para que el navegador
   y lectores de pantalla lo traten como tal. */
export type Lang = "es" | "zh";

export function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
}) {
  return (
    <div className="neu inline-flex items-center gap-1 rounded-full p-1">
      <Languages size={15} className="ml-2 mr-0.5 text-secondary" />
      <button
        type="button"
        onClick={() => onChange("es")}
        className={`rounded-full px-3.5 py-1.5 font-display text-[0.72rem] font-bold transition-colors ${
          lang === "es" ? "bg-allitron-blue text-white" : "text-secondary"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => onChange("zh")}
        lang="zh"
        className={`rounded-full px-3.5 py-1.5 font-display text-[0.72rem] font-bold transition-colors ${
          lang === "zh" ? "bg-allitron-blue text-white" : "text-secondary"
        }`}
      >
        中文
      </button>
    </div>
  );
}
