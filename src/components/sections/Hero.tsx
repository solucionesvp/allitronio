"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Transition,
  type TargetAndTransition,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ── Animation helpers ────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface AnimProps {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

const INSTANT: AnimProps = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0 },
};
const INSTANT_FADE: AnimProps = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  transition: { duration: 0 },
};

function makeUp(delay: number): AnimProps {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
  };
}

function makeFade(delay: number): AnimProps {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.65, delay, ease: EASE },
  };
}

// ── Node graph data ──────────────────────────────────────────────
interface Satellite {
  x: number;   // 0–1 normalized within the graph container
  y: number;
  delay: number;
  orange?: boolean;
}

// Satellites: intentionally asymmetric, not a simple circle pattern
const SATELLITES: Satellite[] = [
  { x: 0.16, y: 0.18, delay: 0.0  },
  { x: 0.60, y: 0.10, delay: 0.35 },
  { x: 0.88, y: 0.36, delay: 0.7  },
  { x: 0.84, y: 0.70, delay: 0.55 },
  { x: 0.40, y: 0.86, delay: 0.9  },
  { x: 0.06, y: 0.60, delay: 0.18 },
  { x: 0.46, y: 0.44, delay: 0.45, orange: true }, // inner node, no hub connection
];

const HUB_CONNECTIONS = [0, 1, 2, 3, 4, 5] as const; // SATELLITES indices
const SAT_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 6], [4, 6], [5, 0],
];

// ── NodeGraph ────────────────────────────────────────────────────
interface NodeGraphProps {
  rawMouseX: MotionValue<number>;
  rawMouseY: MotionValue<number>;
  reduced: boolean;
}

function NodeGraph({ rawMouseX, rawMouseY, reduced }: NodeGraphProps) {
  const svgRef    = useRef<SVGSVGElement>(null);
  const hubRef    = useRef<SVGCircleElement>(null);
  const hubGlowRef = useRef<SVGCircleElement>(null);

  // One ref slot per hub-satellite line
  const lineRefs = useRef<(SVGLineElement | null)[]>(
    Array(HUB_CONNECTIONS.length).fill(null) as (SVGLineElement | null)[],
  );

  // Cache SVG dimensions to avoid per-frame getBoundingClientRect
  const dims = useRef({ w: 0, h: 0 });
  useEffect(() => {
    const update = () => {
      if (!svgRef.current) return;
      const r = svgRef.current.getBoundingClientRect();
      dims.current = { w: r.width, h: r.height };
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Hub follows mouse with heavy spring — slow, weighted, intentional
  const hubNormX = useTransform(rawMouseX, [0, 1], [0.32, 0.68]);
  const hubNormY = useTransform(rawMouseY, [0, 1], [0.30, 0.70]);
  const hubSpringX = useSpring(hubNormX, { stiffness: 26, damping: 34, mass: 1.6 });
  const hubSpringY = useSpring(hubNormY, { stiffness: 26, damping: 34, mass: 1.6 });

  // Imperatively update hub + dynamic lines without re-renders
  useAnimationFrame(() => {
    if (reduced) return;
    const { w, h } = dims.current;
    if (w === 0 || h === 0) return;

    const hx = hubSpringX.get() * w;
    const hy = hubSpringY.get() * h;

    hubRef.current?.setAttribute("cx", String(hx));
    hubRef.current?.setAttribute("cy", String(hy));
    hubGlowRef.current?.setAttribute("cx", String(hx));
    hubGlowRef.current?.setAttribute("cy", String(hy));

    HUB_CONNECTIONS.forEach((satIdx, lineIdx) => {
      const line = lineRefs.current[lineIdx];
      if (!line) return;
      const sat = SATELLITES[satIdx];
      line.setAttribute("x1", String(hx));
      line.setAttribute("y1", String(hy));
      line.setAttribute("x2", String(sat.x * w));
      line.setAttribute("y2", String(sat.y * h));
    });
  });

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="graphHubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#09AFF2" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#09AFF2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Satellite ↔ satellite connections (static) */}
      {SAT_CONNECTIONS.map(([a, b], idx) => {
        const sa = SATELLITES[a];
        const sb = SATELLITES[b];
        return (
          <line
            key={`ss-${idx}`}
            x1={`${sa.x * 100}%`}
            y1={`${sa.y * 100}%`}
            x2={`${sb.x * 100}%`}
            y2={`${sb.y * 100}%`}
            stroke="rgba(9,175,242,0.13)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Hub → satellite connections (dynamic via refs) */}
      {HUB_CONNECTIONS.map((satIdx, lineIdx) => {
        const sat = SATELLITES[satIdx];
        return (
          <line
            key={`hl-${lineIdx}`}
            ref={(el) => {
              lineRefs.current[lineIdx] = el;
            }}
            stroke="rgba(9,175,242,0.22)"
            strokeWidth="0.6"
            x1="50%"
            y1="50%"
            x2={`${sat.x * 100}%`}
            y2={`${sat.y * 100}%`}
          />
        );
      })}

      {/* Satellite nodes */}
      {SATELLITES.map((sat, idx) => (
        <circle
          key={`sat-${idx}`}
          cx={`${sat.x * 100}%`}
          cy={`${sat.y * 100}%`}
          r={sat.orange ? "2.5" : "2"}
          fill={sat.orange ? "#F2874C" : "rgba(9,175,242,0.68)"}
          className={sat.orange ? "" : "animate-node-breathe"}
          style={{ animationDelay: `${sat.delay}s` }}
        />
      ))}

      {/* Hub ambient glow (ref-updated) */}
      <circle ref={hubGlowRef} cx="50%" cy="50%" r="24" fill="url(#graphHubGlow)" />

      {/* Hub organizer node (ref-updated) */}
      <circle ref={hubRef} cx="50%" cy="50%" r="4.5" fill="#09AFF2" opacity="0.92" />
    </svg>
  );
}

// ── Pillars ──────────────────────────────────────────────────────
const PILLARS = ["TECNOLOGÍA", "INTELIGENCIA ARTIFICIAL", "ESTRATEGIA"] as const;

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = shouldReduceMotion ?? false;

  // Normalized mouse position over entire hero section (0–1)
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      rawMouseX.set((e.clientX - left) / width);
      rawMouseY.set((e.clientY - top) / height);
    },
    [rawMouseX, rawMouseY],
  );

  const up   = (delay: number): AnimProps => (reduced ? INSTANT      : makeUp(delay));
  const fade = (delay: number): AnimProps => (reduced ? INSTANT_FADE : makeFade(delay));

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Background layers ───────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* L1: Base */}
        <div className="absolute inset-0 bg-allitron-base" />

        {/* L2: Subtle technical grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9,175,242,1) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(9,175,242,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.022,
          }}
        />

        {/* L3: Blue ambient glow — anchored to left, creates depth contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 8% 55%, rgba(3,64,88,0.72) 0%, transparent 65%)",
          }}
        />

        {/* L4: Orange accent — top-right, single restrained point */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 22% 14% at 93% 7%, rgba(242,135,76,0.06) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* ── Node graph — right zone, desktop only ───────────────── */}
      {/*
          Asset placeholder:
          To replace with a visual asset, swap <NodeGraph> for:
          <Image src="/assets/hero/hero-visual.webp" fill alt="" className="object-cover object-right" />
          Recommended path: public/assets/hero/hero-visual.webp
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 18%, black 42%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 18%, black 42%)",
        }}
      >
        <NodeGraph rawMouseX={rawMouseX} rawMouseY={rawMouseY} reduced={reduced} />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8 pb-16 pt-32 lg:px-16 xl:px-24">
        <div className="max-w-[520px] lg:max-w-[600px] xl:max-w-[660px]">

          {/* Eyebrow */}
          <motion.p
            initial={up(0).initial}
            animate={up(0).animate}
            transition={up(0).transition}
            className="mb-6 font-display text-[0.58rem] font-semibold tracking-[0.44em] text-allitron-blue"
          >
            NAYARIT · MÉXICO
          </motion.p>

          {/* Title */}
          <h1
            className="font-display font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.9rem, 7vw, 6.5rem)" }}
          >
            <motion.span
              initial={up(0.12).initial}
              animate={up(0.12).animate}
              transition={up(0.12).transition}
              className="block text-foreground"
            >
              CONECTANDO
            </motion.span>
            <motion.span
              initial={up(0.22).initial}
              animate={up(0.22).animate}
              transition={up(0.22).transition}
              className="block text-allitron-blue"
            >
              EL FUTURO.
            </motion.span>
          </h1>

          {/* Editorial separator */}
          <motion.div
            initial={fade(0.35).initial}
            animate={fade(0.35).animate}
            transition={fade(0.35).transition}
            className="mt-8 h-px w-10 bg-allitron-blue/35"
          />

          {/* Description */}
          <motion.p
            initial={fade(0.44).initial}
            animate={fade(0.44).animate}
            transition={fade(0.44).transition}
            className="mt-6 max-w-[390px] font-body text-[0.875rem] leading-[1.85] text-muted sm:text-[0.92rem]"
          >
            Tecnología, inteligencia artificial y estrategia para transformar
            empresas, conectar talento y acelerar la adopción del futuro.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={fade(0.57).initial}
            animate={fade(0.57).animate}
            transition={fade(0.57).transition}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#allitron"
              className="inline-flex items-center gap-2 bg-allitron-blue px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-allitron-base transition-colors duration-300 hover:bg-allitron-blue/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base sm:px-7 sm:py-3.5"
            >
              EXPLORAR ALLITRON
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
            </a>
            <a
              href="#hub"
              className="inline-flex items-center border border-white/[0.11] px-6 py-3 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-all duration-300 hover:border-white/22 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base sm:px-7 sm:py-3.5"
            >
              CONOCER EL HUB
            </a>
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          initial={fade(0.74).initial}
          animate={fade(0.74).animate}
          transition={fade(0.74).transition}
          className="mt-14 flex flex-wrap items-center gap-y-3 lg:mt-20"
        >
          {PILLARS.map((pillar, idx) => (
            <div key={pillar} className="flex items-center">
              {idx > 0 && (
                <div className="mx-7 h-3 w-px bg-white/10" aria-hidden="true" />
              )}
              <span className="font-display text-[0.52rem] font-bold tracking-[0.35em] text-muted/45">
                {pillar}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
