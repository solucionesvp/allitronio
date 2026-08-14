"use client";

// ── AllitronGraph — React wrapper ─────────────────────────────────────────────
// Connects React's narrative state to the Canvas engine.
// - Initializes engine on mount
// - Triggers morph when solutionId changes
// - Routes pointer events to engine
// - Handles responsive size (mobile vs desktop)

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { SolutionId } from "./graph/types";
import { LAYOUTS, MOBILE_KEEP, toMobileLayout } from "./graph/layouts";
import { createEngine, type AllitronEngine } from "./graph/engine";

// ─────────────────────────────────────────────────────────────────────────────

interface AllitronGraphProps {
  solutionId: SolutionId;
  surface?: "light" | "dark";
  className?: string;
  /** Optional brand accent (hex) — reskins the graph's signature color for
   * product landing pages. Omit to use the default Allitron blue. */
  accent?: string;
}

// ─────────────────────────────────────────────────────────────────────────────

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

function getLayout(solutionId: SolutionId, mobile: boolean) {
  const full = LAYOUTS[solutionId];
  if (!mobile) return full;
  return toMobileLayout(full, MOBILE_KEEP[solutionId]);
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AllitronGraph({
  solutionId,
  surface = "light",
  className = "",
  accent,
}: AllitronGraphProps) {
  const shouldReduce = useReducedMotion();
  const reduced = shouldReduce ?? false;

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const engineRef  = useRef<AllitronEngine | null>(null);
  const activeId   = useRef<SolutionId | null>(null);
  const mobileRef  = useRef<boolean>(false);

  // ── Mount: create engine ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mobile = isMobile();
    mobileRef.current = mobile;
    const layout = getLayout(solutionId, mobile);

    const engine = createEngine({ canvas, layout, surface, reduced, accent });
    engineRef.current = engine;
    activeId.current  = solutionId;

    // Resize observer
    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        mobileRef.current = isMobile();
        engine.resize();
      }, 60);
    });
    ro.observe(canvas);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      engine.destroy();
      engineRef.current = null;
      activeId.current  = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surface, reduced, accent]); // only reinitialize on surface/reduced/accent changes

  // ── Morph when solutionId changes ──────────────────────────────────────
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || activeId.current === solutionId) return;
    activeId.current = solutionId;

    const mobile = mobileRef.current;
    const layout = getLayout(solutionId, mobile);
    engine.morph(layout);
  }, [solutionId]);

  // ── Pointer events ──────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top)  / rect.height;
      engineRef.current?.setPointer(nx, ny, true);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    engineRef.current?.setPointer(0.5, 0.5, false);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
      style={{ touchAction: "none" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
