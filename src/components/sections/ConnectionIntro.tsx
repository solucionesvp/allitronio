"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── Intro network ────────────────────────────────────────────────
const INTRO_NODES = [
  { id: "hub", cx: 50, cy: 50, r: 4,   isHub: true  },
  { id: "n1",  cx: 28, cy: 26, r: 2,   isHub: false },
  { id: "n2",  cx: 70, cy: 22, r: 2.5, isHub: false },
  { id: "n3",  cx: 82, cy: 53, r: 2,   isHub: false },
  { id: "n4",  cx: 54, cy: 78, r: 2,   isHub: false },
  { id: "n5",  cx: 20, cy: 63, r: 2,   isHub: false },
] as const;

type NodeId = (typeof INTRO_NODES)[number]["id"];
const INTRO_EDGES: [NodeId, NodeId][] = [
  ["hub", "n1"], ["hub", "n2"], ["hub", "n3"],
  ["hub", "n4"], ["hub", "n5"], ["n1", "n2"],
];

function getIntroNode(id: NodeId) {
  return INTRO_NODES.find((n) => n.id === id)!;
}

// ── Component ────────────────────────────────────────────────────
export default function ConnectionIntro() {
  const [phase, setPhase] = useState<"active" | "fading" | "done">("active");

  useEffect(() => {
    const timers: number[] = [];

    // Check reduced motion preference client-side
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Skip intro immediately for users who prefer reduced motion
      timers.push(window.setTimeout(() => setPhase("done"), 0) as unknown as number);
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    // Vibration: tic-pause-tic at the network "activation" moment
    timers.push(
      window.setTimeout(() => {
        try {
          if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            navigator.vibrate([35, 28, 35]);
          }
        } catch {
          // silently unsupported on desktop
        }
      }, 720) as unknown as number,
    );

    timers.push(window.setTimeout(() => setPhase("fading"), 1050) as unknown as number);
    timers.push(window.setTimeout(() => setPhase("done"), 1480) as unknown as number);

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-allitron-base"
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{ duration: 0.44, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-9">
        {/* Network composition */}
        <div className="h-[132px] w-[150px] sm:h-[160px] sm:w-[185px]">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* Edges */}
            {INTRO_EDGES.map(([aId, bId], idx) => {
              const a = getIntroNode(aId);
              const b = getIntroNode(bId);
              return (
                <motion.line
                  key={`${aId}-${bId}`}
                  x1={a.cx}
                  y1={a.cy}
                  x2={b.cx}
                  y2={b.cy}
                  stroke="rgba(9,175,242,0.38)"
                  strokeWidth="0.65"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.22,
                    delay: 0.4 + idx * 0.07,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Hub radial pulse */}
            <motion.circle
              cx={50}
              cy={50}
              r={17}
              fill="rgba(9,175,242,0.1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.45, 0] }}
              transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
            />

            {/* Satellite nodes */}
            {INTRO_NODES.filter((n) => !n.isHub).map((node, idx) => (
              <motion.circle
                key={node.id}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="rgba(9,175,242,0.72)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.16,
                  delay: 0.05 + (idx + 1) * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Hub node — appears last */}
            <motion.circle
              cx={50}
              cy={50}
              r={4}
              fill="#09AFF2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Brand text */}
        <motion.div
          className="flex flex-col items-center gap-2.5"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.78, ease: "easeOut" }}
        >
          <span className="font-display text-[0.56rem] font-semibold tracking-[0.5em] text-allitron-blue">
            CONECTANDO
          </span>
          <motion.div
            className="h-px w-8 origin-left bg-allitron-blue/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.32, delay: 0.94, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
