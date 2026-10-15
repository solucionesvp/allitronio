"use client";

// ── Las cuatro fugas, en bento ───────────────────────────────────────────────
// Una idea por tarjeta y una mini-ilustración hecha con formas (sin datos, sin
// fotos): cada fuga se entiende de un vistazo. Orden de lectura: entra el lead,
// se responde, se vuelve a vender y, al final, quién lo sostiene todo.

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Repeat } from "lucide-react";
import { VOLANTE_LEAKS_SHORT } from "@/data/tomaElVolanteContent";
import { ACCENT, reveal } from "./ui";

const CARD =
  "group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-7 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.055] sm:p-9";

function Chip({ children, accent = false, dashed = false }: { children: ReactNode; accent?: boolean; dashed?: boolean }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-[0.74rem] ${dashed ? "border-dashed" : ""}`}
      style={accent ? { background: "rgba(245,163,0,0.14)", borderColor: "rgba(245,163,0,0.5)", color: ACCENT } : { borderColor: "rgba(255,255,255,0.18)", color: "rgba(245,247,248,0.8)" }}
    >
      {children}
    </span>
  );
}

function VisualEntrada() {
  return (
    <div className="flex items-center gap-4 sm:gap-6" aria-hidden="true">
      <div className="flex flex-col items-start gap-2">
        <Chip>Pide el precio</Chip>
        <Chip>Cotiza crédito</Chip>
        <Chip>Solo explora</Chip>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-white/35" strokeWidth={1.6} />
      <Chip accent>El mismo mensaje</Chip>
    </div>
  );
}

function VisualRespuesta() {
  const rows = [
    { w: "w-[78%]", tone: "bg-white/30" },
    { w: "w-[46%]", tone: "bg-white/15" },
    { w: "w-[62%]", tone: "bg-white/15" },
  ];
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {rows.map((r, i) => (
        <div key={r.w} className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 font-display text-[0.6rem] font-bold text-white/70">
            {"ABC"[i]}
          </span>
          <span className={`h-2.5 rounded-full ${r.tone} ${r.w}`} />
        </div>
      ))}
    </div>
  );
}

function VisualRecompra() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
      <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/30">
        <Repeat className="h-7 w-7" style={{ color: ACCENT }} strokeWidth={1.8} />
      </span>
    </div>
  );
}

function VisualEquipo() {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-hidden="true">
      <div className="flex -space-x-2">
        <span className="h-9 w-9 rounded-full border-2 border-[#101820] bg-white/25" />
        <span className="h-9 w-9 rounded-full border-2 border-[#101820] bg-white/15" />
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-white/35 bg-[#101820] font-display text-[0.8rem] text-white/60">?</span>
      </div>
      <Chip dashed>¿Qué publicar?</Chip>
      <Chip dashed>¿Qué permite la planta?</Chip>
    </div>
  );
}

const VISUALS = [VisualEntrada, VisualRespuesta, VisualRecompra, VisualEquipo] as const;
// Bento: 2/1 arriba, 1/2 abajo en escritorio; una columna en móvil.
const SPANS = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"] as const;
const WIDE = [true, false, false, true] as const;

export default function LeakBento() {
  return (
    <ul className="mt-16 grid gap-4 lg:grid-cols-3">
      {VOLANTE_LEAKS_SHORT.map((l, i) => {
        const Visual = VISUALS[i];
        return (
          <motion.li key={l.title} {...reveal(0.07 * i)} className={`${CARD} ${SPANS[i]} ${WIDE[i] ? "lg:flex-row lg:items-center lg:justify-between lg:gap-12" : ""}`}>
            <div>
              <span className="font-display text-[0.62rem] font-bold tracking-[0.3em]" style={{ color: ACCENT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[1.45rem] font-black leading-[1.12] tracking-tight text-foreground sm:text-[1.7rem]">{l.title}</h3>
              <p className="mt-3 max-w-[420px] font-body text-[0.95rem] leading-[1.7] text-foreground/68">{l.body}</p>
            </div>
            <div className={`mt-auto pt-9 ${WIDE[i] ? "lg:mt-0 lg:shrink-0 lg:pt-0" : ""}`}>
              <Visual />
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
