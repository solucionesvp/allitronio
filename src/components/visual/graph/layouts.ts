// ── AllitronGraph — Layout definitions ───────────────────────────────────────
// Four deterministic graph configurations, one per solution.
// Positions are normalized [0–1] (x: left→right, y: top→bottom).
// The engine scales them to actual canvas pixels at runtime.
//
// Node count: ~55 desktop, mobile variant uses a filtered subset (~25).
// Edge count: 60–120 desktop.
//
// Design vocabulary:
//   CORE     (1–3):  radius 7–9, opacity 1.0   — main attractors
//   PRIMARY  (5–10): radius 3.5–5, opacity 0.85 — cluster centers
//   SECONDARY(15–25):radius 2–3, opacity 0.55   — network fabric
//   MICRO    (rest): radius 1–1.8, opacity 0.28  — depth/texture

import type { GraphLayout, GraphEdge } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function e(a: number, b: number, opacity = 0.18, energized = false): GraphEdge {
  return { a, b, opacity, energized };
}

// ─────────────────────────────────────────────────────────────────────────────
// ALLITRON 90
// Narrative: chaos → friction (orange) → organized trajectory (30/60/90)
// Topology: dense disorder cluster on left, orange diagnostics node center-left,
//           then ascending right arc with 3 progress PRIMARY nodes.
// ─────────────────────────────────────────────────────────────────────────────

export const LAYOUT_ALLITRON90: GraphLayout = {
  nodes: [
    // CORE — orange friction/diagnostic node (bottleneck)
    { id: 0, targetX: 0.42, targetY: 0.48, radius: 8, opacity: 1.0, category: "CORE", cluster: "center", energized: false, orange: true },
    // CORE — execution node (90-day plan origin)
    { id: 1, targetX: 0.68, targetY: 0.42, radius: 7, opacity: 1.0, category: "CORE", cluster: "order", energized: true, orange: false },

    // PRIMARY — progress milestones
    { id: 2, targetX: 0.56, targetY: 0.38, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "progress", energized: true, orange: false },  // 30
    { id: 3, targetX: 0.62, targetY: 0.40, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "progress", energized: true, orange: false },  // 60
    { id: 4, targetX: 0.80, targetY: 0.36, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "order", energized: true, orange: false },  // 90 end

    // PRIMARY — chaos cluster anchors (left side)
    { id: 5, targetX: 0.12, targetY: 0.30, radius: 4, opacity: 0.80, category: "PRIMARY", cluster: "chaos", energized: false, orange: false },
    { id: 6, targetX: 0.18, targetY: 0.60, radius: 3.8, opacity: 0.78, category: "PRIMARY", cluster: "chaos", energized: false, orange: false },
    { id: 7, targetX: 0.08, targetY: 0.52, radius: 3.5, opacity: 0.75, category: "PRIMARY", cluster: "chaos", energized: false, orange: false },
    { id: 8, targetX: 0.24, targetY: 0.72, radius: 3.5, opacity: 0.75, category: "PRIMARY", cluster: "chaos", energized: false, orange: false },

    // SECONDARY — chaos fabric
    { id: 9,  targetX: 0.06, targetY: 0.22, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    { id: 10, targetX: 0.15, targetY: 0.42, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    { id: 11, targetX: 0.22, targetY: 0.20, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    { id: 12, targetX: 0.30, targetY: 0.35, radius: 2.2, opacity: 0.50, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    { id: 13, targetX: 0.28, targetY: 0.58, radius: 2.5, opacity: 0.52, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    { id: 14, targetX: 0.35, targetY: 0.72, radius: 2.0, opacity: 0.48, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    { id: 15, targetX: 0.36, targetY: 0.26, radius: 2.3, opacity: 0.50, category: "SECONDARY", cluster: "chaos", energized: false, orange: false },
    // SECONDARY — order/trajectory fabric
    { id: 16, targetX: 0.50, targetY: 0.55, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "order", energized: false, orange: false },
    { id: 17, targetX: 0.72, targetY: 0.55, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "order", energized: false, orange: false },
    { id: 18, targetX: 0.85, targetY: 0.48, radius: 2.0, opacity: 0.50, category: "SECONDARY", cluster: "order", energized: false, orange: false },
    { id: 19, targetX: 0.88, targetY: 0.62, radius: 2.2, opacity: 0.48, category: "SECONDARY", cluster: "satellite", energized: false, orange: false },
    { id: 20, targetX: 0.74, targetY: 0.28, radius: 2.0, opacity: 0.50, category: "SECONDARY", cluster: "order", energized: false, orange: false },
    { id: 21, targetX: 0.62, targetY: 0.62, radius: 2.3, opacity: 0.48, category: "SECONDARY", cluster: "order", energized: false, orange: false },
    { id: 22, targetX: 0.90, targetY: 0.28, radius: 2.5, opacity: 0.50, category: "SECONDARY", cluster: "satellite", energized: false, orange: false },

    // MICRO — depth texture
    { id: 23, targetX: 0.04, targetY: 0.70, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 24, targetX: 0.10, targetY: 0.80, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 25, targetX: 0.32, targetY: 0.82, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 26, targetX: 0.44, targetY: 0.70, radius: 1.3, opacity: 0.26, category: "MICRO", cluster: "center", energized: false, orange: false },
    { id: 27, targetX: 0.52, targetY: 0.78, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "order", energized: false, orange: false },
    { id: 28, targetX: 0.78, targetY: 0.70, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 29, targetX: 0.92, targetY: 0.50, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 30, targetX: 0.95, targetY: 0.72, radius: 1.2, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 31, targetX: 0.16, targetY: 0.10, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 32, targetX: 0.38, targetY: 0.12, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 33, targetX: 0.55, targetY: 0.18, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "progress", energized: false, orange: false },
    { id: 34, targetX: 0.82, targetY: 0.18, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "order", energized: false, orange: false },
    { id: 35, targetX: 0.48, targetY: 0.88, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 36, targetX: 0.68, targetY: 0.80, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 37, targetX: 0.25, targetY: 0.10, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 38, targetX: 0.06, targetY: 0.40, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 39, targetX: 0.96, targetY: 0.38, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 40, targetX: 0.86, targetY: 0.82, radius: 1.2, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 41, targetX: 0.44, targetY: 0.14, radius: 1.5, opacity: 0.26, category: "MICRO", cluster: "progress", energized: false, orange: false },
    { id: 42, targetX: 0.20, targetY: 0.88, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 43, targetX: 0.76, targetY: 0.14, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "order", energized: false, orange: false },
    { id: 44, targetX: 0.92, targetY: 0.88, radius: 1.2, opacity: 0.18, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 45, targetX: 0.60, targetY: 0.86, radius: 1.5, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 46, targetX: 0.03, targetY: 0.15, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 47, targetX: 0.50, targetY: 0.25, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "progress", energized: false, orange: false },
    { id: 48, targetX: 0.34, targetY: 0.46, radius: 1.3, opacity: 0.28, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 49, targetX: 0.78, targetY: 0.88, radius: 1.2, opacity: 0.18, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 50, targetX: 0.14, targetY: 0.22, radius: 1.5, opacity: 0.26, category: "MICRO", cluster: "chaos", energized: false, orange: false },
    { id: 51, targetX: 0.56, targetY: 0.70, radius: 1.3, opacity: 0.24, category: "MICRO", cluster: "order", energized: false, orange: false },
    { id: 52, targetX: 0.70, targetY: 0.68, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 53, targetX: 0.84, targetY: 0.08, radius: 1.2, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 54, targetX: 0.36, targetY: 0.92, radius: 1.3, opacity: 0.18, category: "MICRO", cluster: "satellite", energized: false, orange: false },
  ],
  edges: [
    // Chaos cluster internal connections
    e(5, 9, 0.22), e(5, 11, 0.18), e(5, 10, 0.20), e(6, 10, 0.18),
    e(6, 13, 0.20), e(7, 9, 0.16), e(7, 10, 0.18), e(8, 13, 0.18),
    e(8, 14, 0.16), e(9, 11, 0.14), e(11, 12, 0.18), e(11, 15, 0.16),
    e(12, 15, 0.16), e(12, 13, 0.14), e(13, 14, 0.16), e(5, 6, 0.20),
    e(5, 7, 0.18), e(6, 8, 0.16), e(10, 12, 0.14), e(9, 50, 0.12),
    e(5, 38, 0.10), e(6, 23, 0.10), e(8, 25, 0.12), e(7, 46, 0.10),

    // Chaos → friction node (CORE orange) converging lines
    e(5, 0, 0.22), e(6, 0, 0.20), e(7, 0, 0.18), e(12, 0, 0.16),
    e(13, 0, 0.14), e(15, 0, 0.16), e(48, 0, 0.12),

    // Friction → progress (energized trajectory)
    e(0, 2, 0.40, true), e(2, 3, 0.42, true), e(3, 1, 0.44, true),
    e(1, 4, 0.38, true),

    // Progress connective tissue
    e(2, 47, 0.20, true), e(3, 16, 0.18), e(1, 17, 0.20),
    e(4, 18, 0.18), e(4, 20, 0.16), e(1, 20, 0.14),

    // Order cluster
    e(1, 17, 0.18), e(17, 18, 0.16), e(17, 21, 0.14), e(18, 22, 0.14),
    e(20, 22, 0.12), e(16, 21, 0.14), e(16, 26, 0.12), e(21, 27, 0.10),

    // Satellite micro fabric
    e(4, 19, 0.12), e(18, 19, 0.10), e(19, 28, 0.10), e(22, 29, 0.10),
    e(22, 39, 0.08), e(28, 36, 0.08), e(27, 35, 0.08), e(33, 41, 0.12),

    // Cross connections (bridges)
    e(15, 16, 0.16), e(12, 48, 0.12), e(0, 26, 0.14),

    // Micro depth
    e(31, 9, 0.08), e(37, 11, 0.08), e(32, 15, 0.08), e(24, 42, 0.06),
    e(34, 43, 0.08), e(43, 53, 0.06), e(40, 44, 0.06), e(45, 54, 0.06),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL
// Narrative: external nodes → central web infrastructure → discovery → conversion
// Topology: outer satellite clusters feeding into central hub, multiple exit paths
// ─────────────────────────────────────────────────────────────────────────────

export const LAYOUT_LOCAL: GraphLayout = {
  nodes: [
    // CORE — web infrastructure center
    { id: 0, targetX: 0.48, targetY: 0.46, radius: 9, opacity: 1.0, category: "CORE", cluster: "hub", energized: true, orange: false },
    // CORE — Google/search gateway
    { id: 1, targetX: 0.72, targetY: 0.32, radius: 7, opacity: 0.95, category: "CORE", cluster: "search", energized: true, orange: false },

    // PRIMARY — presence cluster
    { id: 2, targetX: 0.18, targetY: 0.24, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "presence", energized: false, orange: false },
    { id: 3, targetX: 0.14, targetY: 0.50, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "presence", energized: false, orange: false },
    { id: 4, targetX: 0.22, targetY: 0.74, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "presence", energized: false, orange: false },
    // PRIMARY — search cluster
    { id: 5, targetX: 0.62, targetY: 0.18, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "search", energized: true, orange: false },
    { id: 6, targetX: 0.82, targetY: 0.20, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "search", energized: false, orange: false },
    // PRIMARY — contact/conversion
    { id: 7, targetX: 0.80, targetY: 0.60, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "contact", energized: false, orange: false },
    { id: 8, targetX: 0.68, targetY: 0.74, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "conversion", energized: false, orange: false },
    // PRIMARY — bridge nodes
    { id: 9, targetX: 0.36, targetY: 0.22, radius: 3.8, opacity: 0.78, category: "PRIMARY", cluster: "hub", energized: false, orange: false },
    { id: 10, targetX: 0.34, targetY: 0.70, radius: 3.8, opacity: 0.78, category: "PRIMARY", cluster: "hub", energized: false, orange: false },

    // SECONDARY — presence fabric
    { id: 11, targetX: 0.08, targetY: 0.18, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "presence", energized: false, orange: false },
    { id: 12, targetX: 0.06, targetY: 0.38, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "presence", energized: false, orange: false },
    { id: 13, targetX: 0.08, targetY: 0.64, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "presence", energized: false, orange: false },
    { id: 14, targetX: 0.16, targetY: 0.84, radius: 2.2, opacity: 0.50, category: "SECONDARY", cluster: "presence", energized: false, orange: false },
    { id: 15, targetX: 0.30, targetY: 0.36, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "hub", energized: false, orange: false },
    { id: 16, targetX: 0.28, targetY: 0.54, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "hub", energized: false, orange: false },
    // SECONDARY — search/contact fabric
    { id: 17, targetX: 0.54, targetY: 0.28, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "search", energized: false, orange: false },
    { id: 18, targetX: 0.62, targetY: 0.40, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "hub", energized: false, orange: false },
    { id: 19, targetX: 0.86, targetY: 0.40, radius: 2.2, opacity: 0.50, category: "SECONDARY", cluster: "search", energized: false, orange: false },
    { id: 20, targetX: 0.88, targetY: 0.54, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "contact", energized: false, orange: false },
    { id: 21, targetX: 0.74, targetY: 0.68, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "conversion", energized: false, orange: false },
    { id: 22, targetX: 0.56, targetY: 0.60, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "conversion", energized: false, orange: false },
    { id: 23, targetX: 0.44, targetY: 0.58, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "hub", energized: false, orange: false },
    { id: 24, targetX: 0.56, targetY: 0.78, radius: 2.2, opacity: 0.50, category: "SECONDARY", cluster: "conversion", energized: false, orange: false },
    { id: 25, targetX: 0.38, targetY: 0.84, radius: 2.3, opacity: 0.48, category: "SECONDARY", cluster: "satellite", energized: false, orange: false },
    { id: 26, targetX: 0.92, targetY: 0.28, radius: 2.0, opacity: 0.48, category: "SECONDARY", cluster: "satellite", energized: false, orange: false },
    { id: 27, targetX: 0.90, targetY: 0.74, radius: 2.2, opacity: 0.48, category: "SECONDARY", cluster: "satellite", energized: false, orange: false },

    // MICRO
    { id: 28, targetX: 0.04, targetY: 0.28, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "presence", energized: false, orange: false },
    { id: 29, targetX: 0.10, targetY: 0.56, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "presence", energized: false, orange: false },
    { id: 30, targetX: 0.24, targetY: 0.88, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 31, targetX: 0.40, targetY: 0.92, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 32, targetX: 0.70, targetY: 0.86, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 33, targetX: 0.84, targetY: 0.82, radius: 1.2, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 34, targetX: 0.94, targetY: 0.60, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 35, targetX: 0.94, targetY: 0.42, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 36, targetX: 0.92, targetY: 0.12, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 37, targetX: 0.76, targetY: 0.08, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "search", energized: false, orange: false },
    { id: 38, targetX: 0.52, targetY: 0.10, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "search", energized: false, orange: false },
    { id: 39, targetX: 0.40, targetY: 0.08, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "hub", energized: false, orange: false },
    { id: 40, targetX: 0.28, targetY: 0.10, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "presence", energized: false, orange: false },
    { id: 41, targetX: 0.14, targetY: 0.08, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "presence", energized: false, orange: false },
    { id: 42, targetX: 0.02, targetY: 0.48, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "presence", energized: false, orange: false },
    { id: 43, targetX: 0.02, targetY: 0.72, radius: 1.3, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 44, targetX: 0.46, targetY: 0.32, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "hub", energized: false, orange: false },
    { id: 45, targetX: 0.60, targetY: 0.50, radius: 1.3, opacity: 0.26, category: "MICRO", cluster: "hub", energized: false, orange: false },
    { id: 46, targetX: 0.42, targetY: 0.76, radius: 1.5, opacity: 0.24, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 47, targetX: 0.78, targetY: 0.46, radius: 1.2, opacity: 0.24, category: "MICRO", cluster: "contact", energized: false, orange: false },
    { id: 48, targetX: 0.68, targetY: 0.12, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "search", energized: false, orange: false },
    { id: 49, targetX: 0.86, targetY: 0.88, radius: 1.2, opacity: 0.18, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 50, targetX: 0.50, targetY: 0.90, radius: 1.5, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 51, targetX: 0.20, targetY: 0.38, radius: 1.3, opacity: 0.26, category: "MICRO", cluster: "presence", energized: false, orange: false },
    { id: 52, targetX: 0.32, targetY: 0.78, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 53, targetX: 0.48, targetY: 0.16, radius: 1.2, opacity: 0.26, category: "MICRO", cluster: "hub", energized: false, orange: false },
    { id: 54, targetX: 0.62, targetY: 0.64, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "conversion", energized: false, orange: false },
  ],
  edges: [
    // Presence cluster internal
    e(2, 11, 0.22), e(2, 12, 0.20), e(3, 12, 0.18), e(3, 13, 0.20),
    e(4, 13, 0.18), e(4, 14, 0.16), e(2, 3, 0.20), e(3, 4, 0.18),
    e(11, 28, 0.12), e(12, 29, 0.10), e(2, 40, 0.10), e(2, 41, 0.08),

    // Presence → hub
    e(2, 0, 0.28, true), e(3, 0, 0.26, true), e(4, 10, 0.22),
    e(2, 9, 0.24), e(9, 0, 0.26, true), e(10, 0, 0.24, true),
    e(3, 15, 0.18), e(15, 0, 0.20), e(4, 16, 0.18), e(16, 0, 0.20),

    // Hub → search (energized discovery path)
    e(0, 17, 0.30, true), e(17, 1, 0.34, true), e(0, 18, 0.26, true),
    e(18, 1, 0.28, true), e(9, 5, 0.24), e(5, 1, 0.28, true),

    // Search cluster
    e(1, 5, 0.28, true), e(1, 6, 0.24), e(5, 6, 0.20), e(6, 19, 0.18),
    e(1, 19, 0.20), e(6, 26, 0.14), e(5, 48, 0.12), e(1, 37, 0.12),

    // Hub → contact/conversion
    e(0, 22, 0.22), e(0, 23, 0.24), e(1, 7, 0.22), e(7, 20, 0.18),
    e(7, 8, 0.24), e(8, 21, 0.20), e(8, 22, 0.18), e(21, 24, 0.16),

    // Conversion exits
    e(8, 24, 0.20), e(8, 25, 0.14), e(24, 32, 0.12), e(22, 54, 0.12),
    e(7, 27, 0.14), e(20, 34, 0.12), e(20, 35, 0.10),

    // Bridge cross-connections
    e(10, 16, 0.16), e(15, 9, 0.18), e(10, 25, 0.14), e(23, 10, 0.18),
    e(18, 45, 0.12), e(17, 44, 0.14), e(16, 46, 0.12), e(23, 46, 0.10),

    // Micro fabric
    e(11, 42, 0.08), e(13, 43, 0.08), e(14, 30, 0.10), e(25, 31, 0.10),
    e(32, 33, 0.08), e(33, 49, 0.06), e(36, 26, 0.08), e(38, 53, 0.10),
    e(39, 53, 0.08), e(40, 41, 0.08), e(51, 3, 0.08), e(52, 46, 0.08),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SEGUNDO CEREBRO
// Narrative: memory hub + 5 clusters (Personas, Proyectos, Tareas, Ideas, Info)
// Topology: closest to Obsidian — dense cross-connections, organic satellite groups
// ─────────────────────────────────────────────────────────────────────────────

export const LAYOUT_SECOND_BRAIN: GraphLayout = {
  nodes: [
    // CORE — memoria central
    { id: 0, targetX: 0.50, targetY: 0.46, radius: 9, opacity: 1.0, category: "CORE", cluster: "memory", energized: true, orange: false },
    // CORE — contexto activo (output)
    { id: 1, targetX: 0.72, targetY: 0.54, radius: 7, opacity: 0.95, category: "CORE", cluster: "memory", energized: true, orange: false },

    // PRIMARY — Personas cluster
    { id: 2, targetX: 0.16, targetY: 0.24, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "people", energized: false, orange: false },
    { id: 3, targetX: 0.08, targetY: 0.44, radius: 4.0, opacity: 0.82, category: "PRIMARY", cluster: "people", energized: false, orange: false },
    { id: 4, targetX: 0.14, targetY: 0.66, radius: 4.2, opacity: 0.80, category: "PRIMARY", cluster: "people", energized: false, orange: false },
    // PRIMARY — Proyectos cluster
    { id: 5, targetX: 0.36, targetY: 0.14, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "projects", energized: false, orange: false },
    { id: 6, targetX: 0.58, targetY: 0.12, radius: 4.0, opacity: 0.82, category: "PRIMARY", cluster: "projects", energized: false, orange: false },
    // PRIMARY — Tareas cluster
    { id: 7, targetX: 0.82, targetY: 0.22, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "tasks", energized: false, orange: false },
    { id: 8, targetX: 0.88, targetY: 0.44, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "tasks", energized: false, orange: false },
    // PRIMARY — Ideas cluster
    { id: 9, targetX: 0.80, targetY: 0.74, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "ideas", energized: false, orange: false },
    { id: 10, targetX: 0.60, targetY: 0.82, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "ideas", energized: false, orange: false },
    // PRIMARY — Info cluster
    { id: 11, targetX: 0.30, targetY: 0.80, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "info", energized: false, orange: false },
    { id: 12, targetX: 0.16, targetY: 0.82, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "info", energized: false, orange: false },

    // SECONDARY — bridges and fabric
    { id: 13, targetX: 0.30, targetY: 0.28, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "projects", energized: false, orange: false },
    { id: 14, targetX: 0.24, targetY: 0.44, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "people", energized: false, orange: false },
    { id: 15, targetX: 0.24, targetY: 0.62, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "info", energized: false, orange: false },
    { id: 16, targetX: 0.40, targetY: 0.34, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "memory", energized: false, orange: false },
    { id: 17, targetX: 0.42, targetY: 0.60, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "memory", energized: false, orange: false },
    { id: 18, targetX: 0.60, targetY: 0.30, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "tasks", energized: false, orange: false },
    { id: 19, targetX: 0.68, targetY: 0.20, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "tasks", energized: false, orange: false },
    { id: 20, targetX: 0.74, targetY: 0.38, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "tasks", energized: false, orange: false },
    { id: 21, targetX: 0.80, targetY: 0.60, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "ideas", energized: false, orange: false },
    { id: 22, targetX: 0.68, targetY: 0.68, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "ideas", energized: false, orange: false },
    { id: 23, targetX: 0.56, targetY: 0.72, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "ideas", energized: false, orange: false },
    { id: 24, targetX: 0.40, targetY: 0.72, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "info", energized: false, orange: false },
    { id: 25, targetX: 0.26, targetY: 0.74, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "info", energized: false, orange: false },
    { id: 26, targetX: 0.62, targetY: 0.42, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "memory", energized: false, orange: false },

    // MICRO
    { id: 27, targetX: 0.06, targetY: 0.18, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 28, targetX: 0.04, targetY: 0.36, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 29, targetX: 0.04, targetY: 0.56, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 30, targetX: 0.08, targetY: 0.76, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "info", energized: false, orange: false },
    { id: 31, targetX: 0.22, targetY: 0.90, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 32, targetX: 0.40, targetY: 0.90, radius: 1.3, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 33, targetX: 0.56, targetY: 0.90, radius: 1.5, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 34, targetX: 0.72, targetY: 0.88, radius: 1.2, opacity: 0.18, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 35, targetX: 0.86, targetY: 0.80, radius: 1.5, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 36, targetX: 0.92, targetY: 0.62, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 37, targetX: 0.94, targetY: 0.42, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 38, targetX: 0.92, targetY: 0.22, radius: 1.2, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 39, targetX: 0.78, targetY: 0.10, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "tasks", energized: false, orange: false },
    { id: 40, targetX: 0.64, targetY: 0.06, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "projects", energized: false, orange: false },
    { id: 41, targetX: 0.46, targetY: 0.06, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "projects", energized: false, orange: false },
    { id: 42, targetX: 0.28, targetY: 0.06, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "projects", energized: false, orange: false },
    { id: 43, targetX: 0.14, targetY: 0.08, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 44, targetX: 0.48, targetY: 0.26, radius: 1.3, opacity: 0.28, category: "MICRO", cluster: "memory", energized: false, orange: false },
    { id: 45, targetX: 0.56, targetY: 0.56, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "memory", energized: false, orange: false },
    { id: 46, targetX: 0.36, targetY: 0.52, radius: 1.3, opacity: 0.26, category: "MICRO", cluster: "memory", energized: false, orange: false },
    { id: 47, targetX: 0.52, targetY: 0.68, radius: 1.5, opacity: 0.24, category: "MICRO", cluster: "ideas", energized: false, orange: false },
    { id: 48, targetX: 0.76, targetY: 0.28, radius: 1.2, opacity: 0.26, category: "MICRO", cluster: "tasks", energized: false, orange: false },
    { id: 49, targetX: 0.20, targetY: 0.54, radius: 1.5, opacity: 0.26, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 50, targetX: 0.32, targetY: 0.68, radius: 1.3, opacity: 0.24, category: "MICRO", cluster: "info", energized: false, orange: false },
    { id: 51, targetX: 0.66, targetY: 0.60, radius: 1.5, opacity: 0.24, category: "MICRO", cluster: "ideas", energized: false, orange: false },
    { id: 52, targetX: 0.44, targetY: 0.84, radius: 1.2, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 53, targetX: 0.70, targetY: 0.78, radius: 1.5, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 54, targetX: 0.84, targetY: 0.52, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
  ],
  edges: [
    // Personas cluster
    e(2, 3, 0.22), e(3, 4, 0.20), e(2, 13, 0.18), e(3, 14, 0.16),
    e(4, 15, 0.18), e(2, 27, 0.12), e(3, 28, 0.10), e(3, 29, 0.10),
    e(4, 30, 0.10), e(2, 43, 0.10), e(3, 49, 0.10),

    // Proyectos cluster
    e(5, 6, 0.22), e(5, 13, 0.20), e(5, 16, 0.18), e(6, 19, 0.18),
    e(5, 42, 0.10), e(6, 40, 0.10), e(6, 41, 0.10),

    // Tareas cluster
    e(7, 8, 0.22), e(7, 19, 0.20), e(8, 20, 0.18), e(7, 18, 0.20),
    e(7, 38, 0.10), e(7, 39, 0.10), e(8, 37, 0.10), e(8, 36, 0.08),
    e(8, 48, 0.12),

    // Ideas cluster
    e(9, 10, 0.22), e(9, 21, 0.20), e(10, 23, 0.18), e(9, 22, 0.18),
    e(9, 35, 0.10), e(9, 34, 0.10), e(10, 33, 0.10), e(10, 53, 0.10),

    // Info cluster
    e(11, 12, 0.22), e(11, 25, 0.20), e(11, 24, 0.18), e(12, 15, 0.18),
    e(12, 30, 0.12), e(11, 31, 0.10), e(11, 32, 0.10), e(12, 50, 0.10),

    // All clusters → CORE memory (hub feeds)
    e(2, 0, 0.28, true), e(5, 0, 0.28, true), e(8, 0, 0.28, true),
    e(9, 1, 0.28, true), e(11, 0, 0.28, true),
    e(16, 0, 0.24, true), e(17, 0, 0.24, true), e(13, 0, 0.22, true),
    e(14, 0, 0.20), e(15, 0, 0.20), e(18, 0, 0.20), e(20, 0, 0.18),
    e(26, 0, 0.22, true), e(26, 1, 0.24, true),

    // CORE memory ↔ CORE contexto
    e(0, 1, 0.44, true),

    // CORE contexto → ideas and tasks output
    e(1, 21, 0.26), e(1, 22, 0.22), e(1, 20, 0.22), e(1, 26, 0.24, true),

    // Cross-cluster connections (cross-references — Obsidian-like)
    e(5, 7, 0.16), e(6, 18, 0.14), e(2, 14, 0.16), e(4, 11, 0.14),
    e(10, 23, 0.16), e(11, 24, 0.14), e(9, 21, 0.18), e(8, 20, 0.16),
    e(13, 16, 0.14), e(17, 24, 0.14), e(15, 25, 0.14), e(22, 23, 0.14),
    e(46, 17, 0.12), e(45, 26, 0.12), e(44, 16, 0.12), e(47, 23, 0.12),

    // Micro connections
    e(27, 43, 0.08), e(28, 29, 0.08), e(30, 31, 0.08), e(32, 52, 0.08),
    e(33, 52, 0.06), e(34, 53, 0.08), e(35, 54, 0.08), e(36, 54, 0.06),
    e(37, 38, 0.08), e(39, 40, 0.08), e(41, 42, 0.08), e(50, 15, 0.08),
    e(51, 22, 0.08), e(47, 51, 0.08),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LAZUP
// Narrative: operational platform — 4 functional clusters + central operation hub
// Topology: more structured / modular, 4 clear clusters with strong bridges
// ─────────────────────────────────────────────────────────────────────────────

export const LAYOUT_LAZUP: GraphLayout = {
  nodes: [
    // CORE — operación central
    { id: 0, targetX: 0.50, targetY: 0.46, radius: 9, opacity: 1.0, category: "CORE", cluster: "ops", energized: true, orange: false },
    // CORE — automatización / IA
    { id: 1, targetX: 0.52, targetY: 0.28, radius: 7, opacity: 0.95, category: "CORE", cluster: "ops", energized: true, orange: false },

    // PRIMARY — Clientes/Contactos cluster (top-left)
    { id: 2, targetX: 0.20, targetY: 0.20, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "people", energized: false, orange: false },
    { id: 3, targetX: 0.10, targetY: 0.36, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "people", energized: false, orange: false },
    { id: 4, targetX: 0.16, targetY: 0.52, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "people", energized: false, orange: false },
    // PRIMARY — Conversaciones/Ventas cluster (top-right)
    { id: 5, targetX: 0.78, targetY: 0.20, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "comms", energized: false, orange: false },
    { id: 6, targetX: 0.88, targetY: 0.36, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "comms", energized: false, orange: false },
    { id: 7, targetX: 0.84, targetY: 0.52, radius: 4.0, opacity: 0.80, category: "PRIMARY", cluster: "sales", energized: false, orange: false },
    // PRIMARY — Equipo/Tareas cluster (bottom-left)
    { id: 8, targetX: 0.16, targetY: 0.70, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "team", energized: false, orange: false },
    { id: 9, targetX: 0.24, targetY: 0.82, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "team", energized: false, orange: false },
    // PRIMARY — Catálogo/Citas cluster (bottom-right)
    { id: 10, targetX: 0.76, targetY: 0.70, radius: 4.5, opacity: 0.85, category: "PRIMARY", cluster: "sales", energized: false, orange: false },
    { id: 11, targetX: 0.68, targetY: 0.82, radius: 4.2, opacity: 0.82, category: "PRIMARY", cluster: "sales", energized: false, orange: false },

    // SECONDARY — fabric and bridges
    { id: 12, targetX: 0.30, targetY: 0.24, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "people", energized: false, orange: false },
    { id: 13, targetX: 0.24, targetY: 0.38, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "people", energized: false, orange: false },
    { id: 14, targetX: 0.22, targetY: 0.60, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "team", energized: false, orange: false },
    { id: 15, targetX: 0.34, targetY: 0.70, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "team", energized: false, orange: false },
    { id: 16, targetX: 0.38, targetY: 0.32, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "ops", energized: false, orange: false },
    { id: 17, targetX: 0.38, targetY: 0.60, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "ops", energized: false, orange: false },
    { id: 18, targetX: 0.62, targetY: 0.32, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "ops", energized: false, orange: false },
    { id: 19, targetX: 0.62, targetY: 0.60, radius: 2.3, opacity: 0.52, category: "SECONDARY", cluster: "ops", energized: false, orange: false },
    { id: 20, targetX: 0.68, targetY: 0.24, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "comms", energized: false, orange: false },
    { id: 21, targetX: 0.76, targetY: 0.38, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "comms", energized: false, orange: false },
    { id: 22, targetX: 0.76, targetY: 0.58, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "sales", energized: false, orange: false },
    { id: 23, targetX: 0.64, targetY: 0.72, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "sales", energized: false, orange: false },
    { id: 24, targetX: 0.46, targetY: 0.74, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "ops", energized: false, orange: false },
    { id: 25, targetX: 0.42, targetY: 0.82, radius: 2.2, opacity: 0.50, category: "SECONDARY", cluster: "satellite", energized: false, orange: false },
    { id: 26, targetX: 0.50, targetY: 0.14, radius: 2.5, opacity: 0.55, category: "SECONDARY", cluster: "ops", energized: false, orange: false },
    { id: 27, targetX: 0.36, targetY: 0.14, radius: 2.2, opacity: 0.52, category: "SECONDARY", cluster: "people", energized: false, orange: false },
    { id: 28, targetX: 0.64, targetY: 0.14, radius: 2.5, opacity: 0.52, category: "SECONDARY", cluster: "comms", energized: false, orange: false },

    // MICRO
    { id: 29, targetX: 0.06, targetY: 0.22, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 30, targetX: 0.04, targetY: 0.42, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 31, targetX: 0.06, targetY: 0.62, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "team", energized: false, orange: false },
    { id: 32, targetX: 0.08, targetY: 0.82, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "team", energized: false, orange: false },
    { id: 33, targetX: 0.22, targetY: 0.92, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 34, targetX: 0.40, targetY: 0.92, radius: 1.3, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 35, targetX: 0.58, targetY: 0.92, radius: 1.5, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 36, targetX: 0.74, targetY: 0.90, radius: 1.2, opacity: 0.20, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 37, targetX: 0.88, targetY: 0.78, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 38, targetX: 0.94, targetY: 0.60, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 39, targetX: 0.94, targetY: 0.42, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 40, targetX: 0.94, targetY: 0.22, radius: 1.2, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 41, targetX: 0.86, targetY: 0.08, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "comms", energized: false, orange: false },
    { id: 42, targetX: 0.72, targetY: 0.06, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "comms", energized: false, orange: false },
    { id: 43, targetX: 0.56, targetY: 0.06, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "ops", energized: false, orange: false },
    { id: 44, targetX: 0.38, targetY: 0.06, radius: 1.2, opacity: 0.25, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 45, targetX: 0.22, targetY: 0.08, radius: 1.5, opacity: 0.25, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 46, targetX: 0.10, targetY: 0.16, radius: 1.3, opacity: 0.25, category: "MICRO", cluster: "people", energized: false, orange: false },
    { id: 47, targetX: 0.46, targetY: 0.36, radius: 1.5, opacity: 0.28, category: "MICRO", cluster: "ops", energized: false, orange: false },
    { id: 48, targetX: 0.54, targetY: 0.56, radius: 1.3, opacity: 0.26, category: "MICRO", cluster: "ops", energized: false, orange: false },
    { id: 49, targetX: 0.46, targetY: 0.54, radius: 1.5, opacity: 0.26, category: "MICRO", cluster: "ops", energized: false, orange: false },
    { id: 50, targetX: 0.54, targetY: 0.36, radius: 1.2, opacity: 0.26, category: "MICRO", cluster: "ops", energized: false, orange: false },
    { id: 51, targetX: 0.30, targetY: 0.82, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 52, targetX: 0.56, targetY: 0.78, radius: 1.3, opacity: 0.22, category: "MICRO", cluster: "satellite", energized: false, orange: false },
    { id: 53, targetX: 0.68, targetY: 0.60, radius: 1.5, opacity: 0.22, category: "MICRO", cluster: "sales", energized: false, orange: false },
    { id: 54, targetX: 0.30, targetY: 0.56, radius: 1.3, opacity: 0.24, category: "MICRO", cluster: "ops", energized: false, orange: false },
  ],
  edges: [
    // Clientes cluster internal
    e(2, 3, 0.22), e(3, 4, 0.20), e(2, 12, 0.18), e(3, 13, 0.16),
    e(2, 29, 0.12), e(3, 30, 0.10), e(4, 31, 0.10), e(2, 45, 0.10),
    e(2, 46, 0.08), e(2, 27, 0.16),

    // Conversaciones cluster internal
    e(5, 6, 0.22), e(6, 7, 0.20), e(5, 20, 0.18), e(6, 21, 0.16),
    e(5, 28, 0.14), e(5, 41, 0.10), e(5, 42, 0.10), e(6, 40, 0.08),

    // Equipo cluster internal
    e(8, 9, 0.22), e(8, 14, 0.20), e(9, 15, 0.18), e(8, 31, 0.12),
    e(9, 32, 0.10), e(9, 33, 0.10), e(8, 54, 0.12),

    // Catálogo/Citas cluster
    e(10, 11, 0.22), e(10, 22, 0.20), e(11, 23, 0.18), e(10, 37, 0.10),
    e(11, 36, 0.10), e(11, 35, 0.10), e(10, 53, 0.12),

    // All clusters → CORE ops (hub)
    e(2, 0, 0.30, true), e(3, 0, 0.26, true), e(4, 0, 0.24, true),
    e(5, 0, 0.30, true), e(6, 0, 0.26, true), e(7, 0, 0.24, true),
    e(8, 0, 0.30, true), e(9, 0, 0.24, true),
    e(10, 0, 0.30, true), e(11, 0, 0.24, true),

    // CORE ops ↔ CORE IA
    e(0, 1, 0.44, true),

    // CORE IA → clusters (automation connections)
    e(1, 5, 0.28, true), e(1, 7, 0.24, true), e(1, 18, 0.22, true),
    e(1, 26, 0.22, true), e(1, 27, 0.20),

    // Bridge nodes (structural modularity)
    e(16, 0, 0.22), e(17, 0, 0.22), e(18, 0, 0.22), e(19, 0, 0.22),
    e(16, 12, 0.16), e(13, 16, 0.14), e(17, 15, 0.16), e(14, 17, 0.14),
    e(18, 20, 0.16), e(21, 18, 0.14), e(19, 22, 0.16), e(23, 19, 0.14),

    // Cross-module connections (enterprise integration feel)
    e(3, 7, 0.16), e(4, 8, 0.18), e(7, 10, 0.18), e(6, 5, 0.16),
    e(9, 11, 0.16), e(8, 15, 0.18), e(24, 11, 0.16), e(24, 0, 0.20),

    // Top cluster: automation bridge
    e(26, 1, 0.22, true), e(27, 2, 0.16), e(28, 5, 0.16),
    e(26, 43, 0.12), e(26, 44, 0.10),

    // Bottom satellite
    e(25, 9, 0.14), e(25, 11, 0.14), e(25, 34, 0.10), e(25, 35, 0.10),
    e(24, 25, 0.14), e(15, 24, 0.14), e(23, 24, 0.14), e(52, 11, 0.10),

    // Micro fabric
    e(29, 46, 0.08), e(30, 31, 0.08), e(32, 33, 0.08), e(34, 51, 0.08),
    e(35, 52, 0.08), e(36, 37, 0.08), e(38, 39, 0.08), e(40, 41, 0.08),
    e(42, 43, 0.08), e(47, 50, 0.08), e(48, 49, 0.08), e(47, 16, 0.10),
    e(50, 18, 0.10), e(49, 17, 0.10), e(48, 19, 0.10),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUTS
// Filtered subsets of desktop layouts (~25 nodes, ~40 edges)
// Mobile flag checked in AllitronGraph, layout chosen dynamically
// ─────────────────────────────────────────────────────────────────────────────

/** IDs of nodes to keep in mobile view — indices into the main layout */
export const MOBILE_ALLITRON90_IDS = new Set([0,1,2,3,4,5,6,7,8,9,11,12,13,16,17,18,20,22,23,25,26,28,33,36,40]);
export const MOBILE_LOCAL_IDS = new Set([0,1,2,3,4,5,7,8,9,10,11,15,17,18,21,22,23,24,26,27,28,29,30,44,45]);
export const MOBILE_SECOND_BRAIN_IDS = new Set([0,1,2,3,4,5,7,8,9,10,11,13,14,15,16,17,20,21,22,24,25,44,45,46,47]);
export const MOBILE_LAZUP_IDS = new Set([0,1,2,3,4,5,6,7,8,9,10,11,12,14,16,17,18,19,20,22,24,25,26,47,50]);

/** Filter a layout to mobile subset */
export function toMobileLayout(
  layout: GraphLayout,
  keep: Set<number>
): GraphLayout {
  const indexMap = new Map<number, number>();
  const nodes = layout.nodes
    .filter((n) => keep.has(n.id))
    .map((n, newIdx) => {
      indexMap.set(n.id, newIdx);
      return { ...n };
    });
  const edges = layout.edges
    .filter((e) => keep.has(layout.nodes[e.a]?.id) && keep.has(layout.nodes[e.b]?.id))
    .map((edge) => ({
      ...edge,
      a: indexMap.get(layout.nodes[edge.a].id) ?? 0,
      b: indexMap.get(layout.nodes[edge.b].id) ?? 0,
    }))
    .filter((edge) => edge.a !== edge.b);

  return { nodes, edges };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOOKUP
// ─────────────────────────────────────────────────────────────────────────────

import type { SolutionId } from "./types";

export const LAYOUTS: Record<SolutionId, GraphLayout> = {
  "allitron-90": LAYOUT_ALLITRON90,
  "local": LAYOUT_LOCAL,
  "second-brain": LAYOUT_SECOND_BRAIN,
  "lazup": LAYOUT_LAZUP,
};

export const MOBILE_KEEP: Record<SolutionId, Set<number>> = {
  "allitron-90": MOBILE_ALLITRON90_IDS,
  "local": MOBILE_LOCAL_IDS,
  "second-brain": MOBILE_SECOND_BRAIN_IDS,
  "lazup": MOBILE_LAZUP_IDS,
};
