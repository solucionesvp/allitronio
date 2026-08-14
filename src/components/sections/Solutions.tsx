"use client";

// ── Solutions — FASE 3.2: Narrative Scrollytelling ───────────────────────────
// Left: AllitronGraph sticky (desktop) — morphs as user scrolls through products
// Right: Sequential narrative — each product expands when in focus
// Mobile: stacked product → graph → product → graph

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS, type SolutionData, type MethodologyPhase } from "@/data/solutions";
import AllitronGraph from "@/components/visual/AllitronGraph";
import type { SolutionId } from "@/components/visual/graph/types";

// ── EASING ───────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── LOCAL / 11 — Fase expandible ─────────────────────────────────────────────

function MethodPhase({
  phase,
  index,
  isOpen,
  onToggle,
}: {
  phase: MethodologyPhase;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const range =
    index === 0 ? "01—03" :
    index === 1 ? "04—06" :
    index === 2 ? "07—09" :
                  "10—11";

  return (
    <div className="border-t border-secondary/10">
      <button
        onClick={onToggle}
        className="group flex w-full items-baseline gap-6 py-6 text-left transition-colors duration-300 hover:text-[#101820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[0.45rem] font-bold tabular-nums tracking-[0.32em] text-allitron-blue/60 transition-colors duration-300 group-hover:text-allitron-blue">
          {range}
        </span>
        <span className="font-display text-[0.7rem] font-black tracking-[0.28em] text-secondary/60 transition-colors duration-300 group-hover:text-[#101820]">
          {phase.label}
        </span>
        <span
          className="ml-auto font-display text-[0.55rem] text-secondary/40 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="steps"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
            style={{ overflowAnchor: "none" }}
          >
            <div className="flex flex-col gap-5 pb-8 pl-[5.5rem]">
              {phase.steps.map((step) => (
                <div key={step.number} className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[0.44rem] font-bold tabular-nums text-allitron-blue/40">
                      {step.number}
                    </span>
                    <span className="font-display text-[0.56rem] font-bold tracking-[0.22em] text-[#101820]/70">
                      {step.label}
                    </span>
                  </div>
                  <p className="ml-[1.3rem] font-body text-[0.78rem] leading-[1.72] text-secondary/65">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocalMethodology({ phases }: { phases: MethodologyPhase[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      className="mt-12 border-t border-secondary/10"
    >
      {/* Header */}
      <div className="flex items-baseline gap-5 py-5">
        <span className="font-display text-[0.45rem] font-bold tracking-[0.42em] text-allitron-blue">
          MÉTODO / 11
        </span>
        <span className="font-display text-[0.42rem] tracking-[0.28em] text-secondary/40">
          MÉTODO DE IMPLEMENTACIÓN
        </span>
      </div>

      {/* Phases — expandible */}
      <div>
        {phases.map((phase, i) => (
          <MethodPhase
            key={phase.id}
            phase={phase}
            index={i}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
        {/* Close last border */}
        <div className="border-t border-secondary/10" />
      </div>
    </motion.div>
  );
}

// ── Product item ──────────────────────────────────────────────────────────────

interface ProductProps {
  data: SolutionData;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  observerRef: (el: HTMLElement | null) => void;
}

function ProductItem({ data, index, isActive, onActivate, observerRef }: ProductProps) {
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={observerRef}
      data-product-id={data.id}
      className="py-16 lg:py-24 cursor-pointer"
      onClick={onActivate}
    >
      {/* Numeral + Label row */}
      <div className="mb-5 flex items-center gap-5">
        <span
          className="font-display font-black leading-none tabular-nums transition-all duration-500"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: isActive ? "#09AFF2" : "rgba(74,96,112,0.3)",
            letterSpacing: "0.08em",
          }}
        >
          {numeral}
        </span>
        <div
          className="h-px flex-1 transition-all duration-700"
          style={{
            background: isActive
              ? "rgba(9,175,242,0.35)"
              : "rgba(74,96,112,0.1)",
            maxWidth: isActive ? "48px" : "24px",
          }}
        />
        <span
          className="font-display text-[0.44rem] font-bold tracking-[0.42em] transition-colors duration-500"
          style={{ color: isActive ? "#09AFF2" : "rgba(74,96,112,0.35)" }}
        >
          {data.label}
        </span>
      </div>

      {/* Product name — large typographic treatment */}
      <h3
        className="font-display font-black leading-[0.92] tracking-tight transition-all duration-500"
        style={{
          fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
          color: isActive ? "#101820" : "rgba(74,96,112,0.32)",
          transform: isActive ? "translateY(-4px)" : "translateY(0px)",
          willChange: "transform, color",
        }}
      >
        {data.title}
      </h3>

      {/* Expanded content — only for active */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
            style={{ overflowAnchor: "none" }}
          >
            <div className="pt-8">
              {/* Description */}
              <p className="max-w-md font-body text-[0.92rem] leading-[1.8] text-secondary">
                {data.description}
              </p>

              {/* Microcopy */}
              {data.microcopy && (
                <p className="mt-6 max-w-sm border-l-2 border-allitron-blue/20 pl-4 font-body text-[0.78rem] italic text-secondary/60">
                  {data.microcopy}
                </p>
              )}

              {/* CTA */}
              <div className="mt-8">
                <a
                  href={data.ctaAnchor || "#"}
                  className="inline-flex items-center gap-2 border-b border-allitron-blue pb-1 font-display text-[0.58rem] font-bold tracking-[0.22em] text-[#101820] transition-all hover:border-allitron-orange hover:text-allitron-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {data.ctaText}
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </a>
              </div>

              {/* LOCAL / 11 */}
              {data.methodology && data.methodology.length > 0 && (
                <LocalMethodology phases={data.methodology} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

// ── Mobile Graph Slot ─────────────────────────────────────────────────────────

function MobileGraphSlot({ solutionId }: { solutionId: SolutionId }) {
  return (
    <div className="relative mx-4 aspect-[4/3] overflow-hidden rounded-sm bg-[#F4F6F5]">
      <AllitronGraph solutionId={solutionId} surface="light" className="h-full w-full" />
    </div>
  );
}

// ── Convergence node — placeholder Hub transition ─────────────────────────────

function ConvergenceNode() {
  return (
    <div className="flex flex-col items-center py-24 opacity-30" aria-hidden="true">
      {/* Converging lines represented as decorative SVG */}
      <svg viewBox="0 0 120 80" fill="none" className="w-[80px] md:w-[100px]">
        {/* Multiple paths converging to center */}
        <line x1="0" y1="0"   x2="60" y2="40" stroke="rgba(9,175,242,0.4)" strokeWidth="0.8" />
        <line x1="30" y1="0"  x2="60" y2="40" stroke="rgba(9,175,242,0.3)" strokeWidth="0.6" />
        <line x1="90" y1="0"  x2="60" y2="40" stroke="rgba(9,175,242,0.3)" strokeWidth="0.6" />
        <line x1="120" y1="0" x2="60" y2="40" stroke="rgba(9,175,242,0.4)" strokeWidth="0.8" />
        <line x1="60" y1="0"  x2="60" y2="40" stroke="rgba(9,175,242,0.2)" strokeWidth="0.6" />
        {/* Center node */}
        <circle cx="60" cy="40" r="4" fill="#09AFF2" opacity="0.8" />
        <circle cx="60" cy="40" r="12" fill="rgba(9,175,242,0.08)" />
      </svg>
    </div>
  );
}

// ── Main Solutions section ────────────────────────────────────────────────────

export default function Solutions() {
  const reduced = useReducedMotion() ?? false;
  const [activeSolution, setActiveSolution] = useState<SolutionId>("allitron-90");
  const [isMobileView, setIsMobileView] = useState(false);

  // Map product article elements for intersection observer
  const articleRefs = useRef<Map<string, HTMLElement | null>>(new Map());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scrollytelling observer
  useEffect(() => {
    if (isMobileView) return; // Mobile uses explicit click/tap

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-product-id") as SolutionId;
            if (id) setActiveSolution(id);
          }
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px", // fire when product center crosses viewport middle
        threshold: 0,
      }
    );

    articleRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobileView]);

  const setRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      articleRefs.current.set(id, el);
    },
    []
  );

  // ── DESKTOP layout ──────────────────────────────────────────────────────
  if (!isMobileView) {
    return (
      <section
        id="productos"
        className="relative w-full bg-[var(--color-light)]"
        aria-label="Soluciones Allitron"
      >
        {/* ── Chapter transition from dark Hero ────────────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-40 w-full"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-allitron-base) 0%, transparent 100%)",
          }}
        />

        {/* Section boundary node */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        >
          <div className="h-8 w-px bg-allitron-blue/30" />
          <div className="h-2.5 w-2.5 rounded-full border-2 border-allitron-base bg-allitron-blue" />
          <div className="h-12 w-px bg-secondary/15" />
        </div>

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-[1440px] px-8 pb-12 pt-36 lg:px-16 xl:px-24 xl:pt-44">
          <motion.span
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-secondary/50"
          >
            SOLUCIONES
          </motion.span>
          <motion.h2
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="font-display font-black leading-[0.9] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)" }}
          >
            TECNOLOGÍA QUE
            <br />
            <span className="text-allitron-blue">TERMINA EN EJECUCIÓN.</span>
          </motion.h2>
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mt-6 max-w-md font-body text-[0.92rem] leading-[1.8] text-secondary"
          >
            Partimos de problemas reales. Diseñamos la ruta, construimos la
            tecnología y coordinamos la ejecución hasta convertirla en una
            solución operable.
          </motion.p>
        </div>

        {/* ── Main scrollytelling body ─────────────────────────────── */}
        <div
          ref={containerRef}
          className="relative mx-auto flex w-full max-w-[1440px] gap-0 px-8 lg:px-16 xl:px-24"
        >
          {/* LEFT: sticky graph canvas */}
          <div className="hidden w-[50%] shrink-0 lg:block xl:w-[52%]">
            <div
              className="sticky top-0 flex items-center justify-center"
              style={{ height: "100vh" }}
            >
              <div className="relative h-[75vh] w-full max-h-[640px]">
                <AllitronGraph
                  solutionId={activeSolution}
                  surface="light"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: narrative scroll — overflow-anchor disabled: heights change
              as products expand/collapse, which otherwise fights browser
              scroll anchoring and causes large involuntary scroll jumps */}
          <div
            className="flex flex-1 flex-col divide-y-0 lg:pl-16 xl:pl-20"
            style={{ overflowAnchor: "none" }}
          >
            {SOLUTIONS.map((sol, idx) => (
              <ProductItem
                key={sol.id}
                data={sol}
                index={idx}
                isActive={activeSolution === sol.id}
                onActivate={() => setActiveSolution(sol.id as SolutionId)}
                observerRef={setRef(sol.id)}
              />
            ))}

            {/* Convergence placeholder */}
            <ConvergenceNode />
          </div>
        </div>
      </section>
    );
  }

  // ── MOBILE layout ───────────────────────────────────────────────────────
  return (
    <section
      id="productos"
      className="relative w-full bg-[var(--color-light)]"
      aria-label="Soluciones Allitron"
    >
      {/* Transition overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-32 w-full"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-allitron-base) 0%, transparent 100%)",
        }}
      />

      {/* Header */}
      <div className="relative px-6 pb-10 pt-28">
        <span className="mb-4 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-secondary/50">
          SOLUCIONES
        </span>
        <h2
          className="font-display font-black leading-[0.9] tracking-tight text-[#101820]"
          style={{ fontSize: "clamp(2.4rem, 10vw, 3.8rem)" }}
        >
          TECNOLOGÍA QUE
          <br />
          <span className="text-allitron-blue">TERMINA EN EJECUCIÓN.</span>
        </h2>
        <p className="mt-5 font-body text-[0.88rem] leading-[1.8] text-secondary">
          Partimos de problemas reales. Diseñamos la ruta, construimos la
          tecnología y coordinamos la ejecución.
        </p>
      </div>

      {/* Products: text → graph stacked */}
      <div className="flex flex-col" style={{ overflowAnchor: "none" }}>
        {SOLUTIONS.map((sol, idx) => {
          const isActive = activeSolution === sol.id;
          const numeral = String(idx + 1).padStart(2, "0");

          return (
            <div key={sol.id}>
              {/* Product text */}
              <div
                ref={setRef(sol.id)}
                data-product-id={sol.id}
                className="px-6 py-12"
                onClick={() => setActiveSolution(sol.id as SolutionId)}
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-display text-[0.55rem] font-bold tabular-nums tracking-[0.08em] text-allitron-blue">
                    {numeral}
                  </span>
                  <span className="font-display text-[0.42rem] font-bold tracking-[0.38em] text-secondary/40">
                    {sol.label}
                  </span>
                </div>

                <h3
                  className="mb-5 font-display font-black leading-[0.92] tracking-tight text-[#101820]"
                  style={{ fontSize: "clamp(1.8rem, 8vw, 2.8rem)" }}
                >
                  {sol.title}
                </h3>

                <p className="font-body text-[0.88rem] leading-[1.8] text-secondary">
                  {sol.description}
                </p>

                {sol.microcopy && (
                  <p className="mt-4 border-l-2 border-allitron-blue/20 pl-3 font-body text-[0.76rem] italic text-secondary/60">
                    {sol.microcopy}
                  </p>
                )}

                <div className="mt-6">
                  <a
                    href={sol.ctaAnchor || "#"}
                    className="inline-flex items-center gap-2 border-b border-allitron-blue pb-0.5 font-display text-[0.56rem] font-bold tracking-[0.2em] text-[#101820] transition-all hover:border-allitron-orange hover:text-allitron-blue"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sol.ctaText}
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                  </a>
                </div>

                {sol.methodology && sol.methodology.length > 0 && isActive && (
                  <LocalMethodology phases={sol.methodology} />
                )}
              </div>

              {/* Graph slot */}
              <MobileGraphSlot solutionId={sol.id as SolutionId} />
            </div>
          );
        })}

        <ConvergenceNode />
      </div>
    </section>
  );
}
