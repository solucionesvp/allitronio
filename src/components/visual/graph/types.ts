// ── AllitronGraph — Type definitions ─────────────────────────────────────────
// Single source of truth for the graph engine's data model.

export type SolutionId = "allitron-90" | "local" | "second-brain" | "lazup";

/** Visual importance / physics weight of a node */
export type NodeCategory = "CORE" | "PRIMARY" | "SECONDARY" | "MICRO";

/** Cluster label — used for attraction forces */
export type ClusterLabel =
  | "center"
  | "chaos"
  | "order"
  | "progress"
  | "presence"
  | "search"
  | "contact"
  | "conversion"
  | "memory"
  | "people"
  | "projects"
  | "tasks"
  | "ideas"
  | "info"
  | "ops"
  | "sales"
  | "comms"
  | "team"
  | "hub"
  | "satellite";

// ── Node ──────────────────────────────────────────────────────────────────────

export interface GraphNode {
  /** Stable identifier across morphs — same id = same node */
  id: number;
  /** Target position (layout destination) */
  targetX: number;
  targetY: number;
  /** Current interpolated position (physics) */
  x: number;
  y: number;
  /** Velocity components */
  vx: number;
  vy: number;
  /** Base radius in CSS pixels */
  radius: number;
  /** Base opacity [0–1] */
  opacity: number;
  /** Visual category */
  category: NodeCategory;
  /** Cluster this node belongs to — drives attraction spring */
  cluster: ClusterLabel;
  /** Whether this node pulses with Allitron Blue energy */
  energized: boolean;
  /** Diagnostic / strategic accent — renders in Allitron Orange */
  orange: boolean;
}

// ── Edge ─────────────────────────────────────────────────────────────────────

export interface GraphEdge {
  /** Index into nodes array */
  a: number;
  b: number;
  /** Base opacity [0–1] */
  opacity: number;
  /** Energized edges render in Allitron Blue */
  energized: boolean;
}

// ── Layout snapshot ───────────────────────────────────────────────────────────

/**
 * A complete graph configuration for one solution state.
 * Node positions are normalized [0–1], scaled by the engine at runtime.
 */
export interface GraphLayout {
  nodes: Omit<GraphNode, "x" | "y" | "vx" | "vy">[];
  edges: GraphEdge[];
}

// ── Engine options ────────────────────────────────────────────────────────────

export interface EngineOptions {
  /** Canvas element */
  canvas: HTMLCanvasElement;
  /** Initial layout */
  layout: GraphLayout;
  /** Light or dark surface — affects render colors */
  surface: "light" | "dark";
  /** Skip animation (prefers-reduced-motion) */
  reduced: boolean;
  /**
   * Optional brand accent (hex, e.g. "#D84482") — overrides the energized/glow
   * color so a product landing page can reuse this exact engine reskinned in
   * its own color instead of the default Allitron blue.
   */
  accent?: string;
}

// ── Pointer state ─────────────────────────────────────────────────────────────

export interface PointerState {
  /** Normalized [0–1] within canvas */
  nx: number;
  ny: number;
  active: boolean;
}
