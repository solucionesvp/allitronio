// ── AllitronGraph — Canvas 2D Engine ─────────────────────────────────────────
// Pure imperative engine. No React. No D3. No Three.js.
// Owns the canvas loop, physics, morphing and pointer influence.
//
// Usage:
//   const engine = createEngine(options);
//   engine.setPointer(nx, ny, active);
//   engine.morph(newLayout);
//   engine.destroy();

import type { GraphLayout, GraphNode, GraphEdge, EngineOptions, PointerState } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const PHYSICS = {
  damping:          0.88,
  clusterSpring:    0.018,   // attraction to cluster center
  separationRadius: 28,      // pixels — minimum distance before push
  separationForce:  0.12,
  pointerRadius:    140,     // influence area of the organizer node
  pointerStrength:  0.055,
  organizerRadius:  200,     // how far organizer's secondary influence reaches
  organizerFalloff: 0.015,
  morphStiffness:   0.062,   // spring toward target during morph
  morphDamping:     0.76,
  settleThreshold:  0.08,    // velocity below which we consider node settled
} as const;

interface ColorPalette {
  node: string;
  energized: string;
  orange: string;
  edge: string;
  edgeEnergized: string;
  glow: string;
  glowOrange: string;
}

const COLORS: Record<"light" | "dark", ColorPalette> = {
  light: {
    node:          "rgba(74,96,112,",   // secondary color base
    energized:     "rgba(9,175,242,",   // allitron-blue
    orange:        "rgba(242,135,76,",  // allitron-orange
    edge:          "rgba(74,96,112,",
    edgeEnergized: "rgba(9,175,242,",
    glow:          "rgba(9,175,242,",
    glowOrange:    "rgba(242,135,76,",
  },
  dark: {
    node:          "rgba(255,255,255,",
    energized:     "rgba(9,175,242,",
    orange:        "rgba(242,135,76,",
    edge:          "rgba(255,255,255,",
    edgeEnergized: "rgba(9,175,242,",
    glow:          "rgba(9,175,242,",
    glowOrange:    "rgba(242,135,76,",
  },
};

/** "#D84482" → "rgba(216,68,130," — same string shape as the COLORS table
 * above, so every draw call that appends `${alpha})` keeps working untouched. */
function hexToRgbaPrefix(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},`;
}

/** Base palette, optionally reskinned with a product accent color on the
 * "energized" channel (the graph's signature color — hub glow, active edges,
 * synapse pulses). Node/edge base colors stay neutral either way. */
function buildPalette(surface: "light" | "dark", accent?: string): ColorPalette {
  const base = COLORS[surface];
  if (!accent) return base;
  const accentRgba = hexToRgbaPrefix(accent);
  return {
    ...base,
    energized: accentRgba,
    edgeEnergized: accentRgba,
    glow: accentRgba,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// State types
// ─────────────────────────────────────────────────────────────────────────────

interface LiveNode extends GraphNode {
  // Cluster center cache (updated each frame)
  cx: number;
  cy: number;
  // Morph lerp flag
  morphing: boolean;
}

/** Decorative background particle — not part of the data graph, never morphs,
 * exists purely to give the canvas neural-network / brain-interface density. */
interface AmbientParticle {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

interface EngineState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nodes: LiveNode[];
  edges: GraphEdge[];
  surface: "light" | "dark";
  reduced: boolean;
  pointer: PointerState;
  morphTarget: (Omit<GraphNode, "x"|"y"|"vx"|"vy"> & { targetX: number; targetY: number }) [] | null;
  rafId: number;
  w: number;
  h: number;
  dpr: number;
  paused: boolean;
  morphEdges: GraphEdge[] | null;
  morphEdgeT: number;
  // Cluster center map (computed lazily)
  clusterCenters: Map<string, { x: number; y: number }>;
  // Ambient depth-field particles
  ambient: AmbientParticle[];
  // Resolved color palette (base or accent-reskinned)
  palette: ColorPalette;
}

// ─────────────────────────────────────────────────────────────────────────────
// Factory
// ─────────────────────────────────────────────────────────────────────────────

export interface AllitronEngine {
  setPointer(nx: number, ny: number, active: boolean): void;
  morph(layout: GraphLayout): void;
  resize(): void;
  destroy(): void;
}

export function createEngine(options: EngineOptions): AllitronEngine {
  const { canvas, layout, surface, reduced, accent } = options;
  const ctx = canvas.getContext("2d")!;

  const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

  const state: EngineState = {
    canvas,
    ctx,
    nodes: [],
    edges: [],
    surface,
    reduced,
    pointer: { nx: 0.5, ny: 0.5, active: false },
    morphTarget: null,
    rafId: 0,
    w: 0,
    h: 0,
    dpr,
    paused: false,
    morphEdges: null,
    morphEdgeT: 0,
    clusterCenters: new Map(),
    ambient: [],
    palette: buildPalette(surface, accent),
  };

  // Initial setup
  resize(state);
  initNodes(state, layout);
  state.edges = layout.edges;

  if (!reduced) {
    startLoop(state);
  } else {
    renderFrame(state);
  }

  // Visibility / intersection pausing
  const visHandler = () => {
    state.paused = document.hidden;
    if (!state.paused && !reduced) ensureLoop(state);
  };
  document.addEventListener("visibilitychange", visHandler);

  let observer: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      ([entry]) => {
        state.paused = !entry.isIntersecting;
        if (!state.paused && !reduced) ensureLoop(state);
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);
  }

  return {
    setPointer(nx, ny, active) {
      state.pointer = { nx, ny, active };
    },
    morph(newLayout) {
      morphToLayout(state, newLayout);
    },
    resize() {
      resize(state);
      if (reduced) renderFrame(state);
    },
    destroy() {
      cancelAnimationFrame(state.rafId);
      document.removeEventListener("visibilitychange", visHandler);
      observer?.disconnect();
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Initialization
// ─────────────────────────────────────────────────────────────────────────────

function initNodes(state: EngineState, layout: GraphLayout) {
  const { w, h } = state;
  state.nodes = layout.nodes.map((n) => ({
    ...n,
    x: n.targetX * w,
    y: n.targetY * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    cx: n.targetX * w,
    cy: n.targetY * h,
    morphing: false,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Resize
// ─────────────────────────────────────────────────────────────────────────────

function resize(state: EngineState) {
  const rect = state.canvas.getBoundingClientRect();
  const w = rect.width || state.canvas.offsetWidth || 600;
  const h = rect.height || state.canvas.offsetHeight || 500;
  const { dpr } = state;

  state.canvas.width  = w * dpr;
  state.canvas.height = h * dpr;
  state.ctx.scale(dpr, dpr);

  const scaleX = state.w > 0 ? w / state.w : 1;
  const scaleY = state.h > 0 ? h / state.h : 1;

  // Rescale existing node positions
  for (const n of state.nodes) {
    n.x  *= scaleX;
    n.y  *= scaleY;
    n.cx *= scaleX;
    n.cy *= scaleY;
    n.targetX *= scaleX > 1 ? 1 : 1; // targets stay normalized; recompute below
  }

  state.w = w;
  state.h = h;

  // Recompute absolute targets
  for (const n of state.nodes) {
    const layout_n = n; // targetX/Y are still normalized 0-1
    n.cx = layout_n.targetX * w;
    n.cy = layout_n.targetY * h;
  }

  generateAmbient(state);
}

// ─────────────────────────────────────────────────────────────────────────────
// Ambient depth field — decorative particles, independent of the data graph.
// Gives the canvas neural-network density ("son pocos" fix) without touching
// the hand-authored, index-matched layouts.ts (which morph relies on).
// ─────────────────────────────────────────────────────────────────────────────

function generateAmbient(state: EngineState) {
  const { w, h } = state;
  if (w === 0 || h === 0) {
    state.ambient = [];
    return;
  }
  const area = w * h;
  const isSmall = w < 640;
  let count = Math.round(area / 5200);
  count = Math.max(28, Math.min(count, 140));
  if (isSmall) count = Math.round(count * 0.5);

  const particles: AmbientParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 1.1,
      baseOpacity: 0.035 + Math.random() * 0.085,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.75,
    });
  }
  state.ambient = particles;
}

// ─────────────────────────────────────────────────────────────────────────────
// Morph
// ─────────────────────────────────────────────────────────────────────────────

function morphToLayout(state: EngineState, newLayout: GraphLayout) {
  const { w, h, nodes } = state;

  // Match by index (layouts always have the same count)
  const newNodes = newLayout.nodes;
  for (let i = 0; i < nodes.length && i < newNodes.length; i++) {
    const n = nodes[i];
    const t = newNodes[i];
    n.targetX = t.targetX;
    n.targetY = t.targetY;
    n.cx = t.targetX * w;
    n.cy = t.targetY * h;
    n.category = t.category;
    n.cluster   = t.cluster;
    n.energized = t.energized;
    n.orange    = t.orange;
    n.radius    = t.radius;
    n.opacity   = t.opacity;
    n.morphing  = true;
  }

  // Cross-fade edges
  state.morphEdges = state.edges;
  state.edges = newLayout.edges;
  state.morphEdgeT = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Physics
// ─────────────────────────────────────────────────────────────────────────────

function computeClusterCenters(state: EngineState) {
  const map = state.clusterCenters;
  map.clear();
  const counts: Map<string, number> = new Map();

  for (const n of state.nodes) {
    const prev = map.get(n.cluster) ?? { x: 0, y: 0 };
    const cnt  = (counts.get(n.cluster) ?? 0) + 1;
    map.set(n.cluster, { x: prev.x + n.x, y: prev.y + n.y });
    counts.set(n.cluster, cnt);
  }

  for (const [key, val] of map) {
    const cnt = counts.get(key)!;
    map.set(key, { x: val.x / cnt, y: val.y / cnt });
  }
}

function applyPhysics(state: EngineState) {
  const { nodes, pointer, w, h } = state;

  computeClusterCenters(state);

  const px = pointer.nx * w;
  const py = pointer.ny * h;

  // Find the CORE/PRIMARY node closest to pointer (the "organizer")
  let organizerIdx = -1;
  let minDist = Infinity;
  if (pointer.active) {
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.category !== "CORE" && n.category !== "PRIMARY") continue;
      const dx = n.x - px;
      const dy = n.y - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < PHYSICS.pointerRadius && d < minDist) {
        minDist = d;
        organizerIdx = i;
      }
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];

    // ── Morph spring (highest priority during morph) ──────────────────────
    if (n.morphing) {
      const tx = n.targetX * w;
      const ty = n.targetY * h;
      const dx = tx - n.x;
      const dy = ty - n.y;
      n.vx += dx * PHYSICS.morphStiffness;
      n.vy += dy * PHYSICS.morphStiffness;
      n.vx *= PHYSICS.morphDamping;
      n.vy *= PHYSICS.morphDamping;
      // Check if settled
      const dist = Math.sqrt(dx * dx + dy * dy);
      const spd  = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (dist < 0.5 && spd < PHYSICS.settleThreshold) {
        n.morphing = false;
        n.x = tx;
        n.y = ty;
        n.vx = 0;
        n.vy = 0;
      }
    } else {
      // ── Cluster attraction ──────────────────────────────────────────────
      const cc = state.clusterCenters.get(n.cluster);
      if (cc) {
        n.vx += (cc.x - n.x) * PHYSICS.clusterSpring;
        n.vy += (cc.y - n.y) * PHYSICS.clusterSpring;
      }

      // Gentle pull toward absolute target position
      n.vx += (n.targetX * w - n.x) * 0.005;
      n.vy += (n.targetY * h - n.y) * 0.005;
    }

    // ── Separation between close nodes ───────────────────────────────────
    for (let j = i + 1; j < nodes.length; j++) {
      const m = nodes[j];
      const dx = n.x - m.x;
      const dy = n.y - m.y;
      const d2 = dx * dx + dy * dy;
      const minD = PHYSICS.separationRadius + n.radius + m.radius;
      if (d2 < minD * minD && d2 > 0) {
        const d    = Math.sqrt(d2);
        const force = ((minD - d) / d) * PHYSICS.separationForce;
        n.vx += dx * force;
        n.vy += dy * force;
        m.vx -= dx * force;
        m.vy -= dy * force;
      }
    }

    // ── Pointer influence ─────────────────────────────────────────────────
    if (pointer.active && i === organizerIdx) {
      // Organizer node: move toward pointer gently
      const dx = px - n.x;
      const dy = py - n.y;
      n.vx += dx * PHYSICS.pointerStrength;
      n.vy += dy * PHYSICS.pointerStrength;
    } else if (pointer.active && organizerIdx >= 0) {
      // Secondary influence: nodes near organizer get slight perturbation
      const org = nodes[organizerIdx];
      const dx = n.x - org.x;
      const dy = n.y - org.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < PHYSICS.organizerRadius * PHYSICS.organizerRadius && d2 > 0) {
        const d = Math.sqrt(d2);
        const falloff = 1 - d / PHYSICS.organizerRadius;
        n.vx += (dx / d) * falloff * PHYSICS.organizerFalloff;
        n.vy += (dy / d) * falloff * PHYSICS.organizerFalloff;
      }
    }

    // ── Damping ───────────────────────────────────────────────────────────
    n.vx *= PHYSICS.damping;
    n.vy *= PHYSICS.damping;

    // ── Integrate ─────────────────────────────────────────────────────────
    n.x += n.vx;
    n.y += n.vy;

    // ── Boundary soft repulsion ───────────────────────────────────────────
    const margin = n.radius + 4;
    if (n.x < margin)       n.vx += (margin - n.x) * 0.08;
    if (n.x > w - margin)   n.vx -= (n.x - (w - margin)) * 0.08;
    if (n.y < margin)       n.vy += (margin - n.y) * 0.08;
    if (n.y > h - margin)   n.vy -= (n.y - (h - margin)) * 0.08;
  }

  // Advance morph edge crossfade
  if (state.morphEdges) {
    state.morphEdgeT += 0.025;
    if (state.morphEdgeT >= 1) {
      state.morphEdges = null;
      state.morphEdgeT = 1;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────

function renderFrame(state: EngineState, now = 0) {
  const { ctx, nodes, edges, surface, w, h, reduced } = state;
  const C = state.palette;

  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";

  // ── Ambient depth field — behind everything ─────────────────────────────
  drawAmbient(ctx, state.ambient, now, C.node, reduced);

  // ── Draw fading-out old edges during morph ──────────────────────────────
  if (state.morphEdges) {
    const oldAlpha = 1 - state.morphEdgeT;
    drawEdges(ctx, nodes, state.morphEdges, C, oldAlpha);
  }

  // ── Draw current edges ──────────────────────────────────────────────────
  const edgeAlpha = state.morphEdges ? state.morphEdgeT : 1;
  drawEdges(ctx, nodes, edges, C, edgeAlpha);

  // ── Traveling synapse pulses along energized edges ──────────────────────
  drawEdgePulses(ctx, nodes, edges, C, now, edgeAlpha, reduced, surface);

  // ── Draw nodes ──────────────────────────────────────────────────────────
  drawNodes(ctx, nodes, C, now, reduced, surface);
}

// ─────────────────────────────────────────────────────────────────────────────
// Ambient field render
// ─────────────────────────────────────────────────────────────────────────────

function drawAmbient(
  ctx: CanvasRenderingContext2D,
  ambient: AmbientParticle[],
  now: number,
  color: string,
  reduced: boolean
) {
  for (const p of ambient) {
    const twinkle = reduced ? 1 : 0.5 + 0.5 * Math.sin(now * 0.00095 * p.speed + p.phase);
    const alpha = p.baseOpacity * twinkle;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = color + `${alpha.toFixed(3)})`;
    ctx.fill();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Node render — layered glow (bright core + soft halo), per-node breathing.
// Additive ("lighter") blend only on dark surfaces — on the light surface it
// barely reads against a near-white background, so glows use normal alpha
// there instead. This was the source of the flat "ring" look reported.
// ─────────────────────────────────────────────────────────────────────────────

function drawNodes(
  ctx: CanvasRenderingContext2D,
  nodes: LiveNode[],
  C: ColorPalette,
  now: number,
  reduced: boolean,
  surface: "light" | "dark"
) {
  const additive = surface === "dark";

  for (const n of nodes) {
    const color = n.orange ? C.orange : n.energized ? C.energized : C.node;
    const glowColor = n.orange ? C.glowOrange : C.glow;

    // Per-node breathing pulse — deterministic per id, so nodes don't sync up.
    const animated = !reduced && (n.category === "CORE" || n.category === "PRIMARY" || n.energized);
    const pulse = animated ? 0.87 + 0.13 * Math.sin(now * 0.0017 + n.id * 0.9) : 1;

    const effOpacity = Math.min(n.opacity * pulse, 1);
    const effRadius = n.radius * (0.97 + 0.03 * pulse);

    if (n.category === "CORE") {
      ctx.globalCompositeOperation = additive ? "lighter" : "source-over";

      // Soft outer halo
      const outerR = effRadius * 3.1;
      const gradOuter = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, outerR);
      gradOuter.addColorStop(0, glowColor + `${(additive ? 0.16 : 0.13) * pulse})`);
      gradOuter.addColorStop(1, glowColor + "0)");
      ctx.beginPath();
      ctx.arc(n.x, n.y, outerR, 0, Math.PI * 2);
      ctx.fillStyle = gradOuter;
      ctx.fill();

      // Tight bright inner halo — reads as a point of light, not a ring
      const innerR = effRadius * 1.6;
      const gradInner = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, innerR);
      gradInner.addColorStop(0, glowColor + `${(additive ? 0.5 : 0.38) * pulse})`);
      gradInner.addColorStop(1, glowColor + "0)");
      ctx.beginPath();
      ctx.arc(n.x, n.y, innerR, 0, Math.PI * 2);
      ctx.fillStyle = gradInner;
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
    } else if (n.category === "PRIMARY") {
      ctx.globalCompositeOperation = additive ? "lighter" : "source-over";
      const glowR = effRadius * 2.3;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      grad.addColorStop(0, glowColor + `${(additive ? 0.13 : 0.1) * pulse})`);
      grad.addColorStop(1, glowColor + "0)");
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }

    // Node body — solid, crisp
    ctx.beginPath();
    ctx.arc(n.x, n.y, effRadius, 0, Math.PI * 2);
    ctx.fillStyle = color + `${effOpacity.toFixed(3)})`;
    ctx.fill();

    // Specular hotspot on CORE nodes — small tech-glass highlight
    if (n.category === "CORE") {
      ctx.beginPath();
      ctx.arc(n.x - effRadius * 0.28, n.y - effRadius * 0.3, effRadius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Energized edge pulses — small comet-trail dot traveling a→b, like a signal
// firing along a synapse. Skipped entirely when reduced-motion is on.
// ─────────────────────────────────────────────────────────────────────────────

function drawEdgePulses(
  ctx: CanvasRenderingContext2D,
  nodes: LiveNode[],
  edges: GraphEdge[],
  C: ColorPalette,
  now: number,
  globalMult: number,
  reduced: boolean,
  surface: "light" | "dark"
) {
  if (reduced) return;

  ctx.globalCompositeOperation = surface === "dark" ? "lighter" : "source-over";

  for (const edge of edges) {
    if (!edge.energized) continue;
    const a = nodes[edge.a];
    const b = nodes[edge.b];
    if (!a || !b) continue;

    const offset = ((edge.a * 7 + edge.b * 13) % 100) / 100;
    const t = ((now * 0.00028 + offset) % 1 + 1) % 1;

    for (let k = 0; k < 3; k++) {
      const tt = (((t - k * 0.04) % 1) + 1) % 1;
      const px = a.x + (b.x - a.x) * tt;
      const py = a.y + (b.y - a.y) * tt;
      const alpha = (surface === "dark" ? 0.55 : 0.4 - k * 0.1) * globalMult - k * 0.14;
      if (alpha <= 0) continue;
      ctx.beginPath();
      ctx.arc(px, py, 1.7 - k * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = C.edgeEnergized + `${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  ctx.globalCompositeOperation = "source-over";
}

function drawEdges(
  ctx: CanvasRenderingContext2D,
  nodes: LiveNode[],
  edges: GraphEdge[],
  C: ColorPalette,
  globalMult: number
) {
  for (const edge of edges) {
    const a = nodes[edge.a];
    const b = nodes[edge.b];
    if (!a || !b) continue;

    const color = edge.energized ? C.edgeEnergized : C.edge;
    const alpha = edge.opacity * globalMult;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = color + `${alpha})`;
    ctx.lineWidth = edge.energized ? 1.2 : 0.6;
    ctx.stroke();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Loop
// ─────────────────────────────────────────────────────────────────────────────

function startLoop(state: EngineState) {
  let last = performance.now();

  const tick = (now: number) => {
    if (state.paused) {
      state.rafId = requestAnimationFrame(tick);
      return;
    }

    // Limit to ~60fps budget
    const dt = now - last;
    last = now;
    if (dt > 100) {
      // Tab was hidden — skip frame to avoid physics explosion
      state.rafId = requestAnimationFrame(tick);
      return;
    }

    applyPhysics(state);
    renderFrame(state, now);

    state.rafId = requestAnimationFrame(tick);
  };

  state.rafId = requestAnimationFrame(tick);
}

function ensureLoop(state: EngineState) {
  if (state.rafId) return;
  startLoop(state);
}
