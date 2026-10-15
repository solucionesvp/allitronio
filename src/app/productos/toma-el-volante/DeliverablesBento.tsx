"use client";

// ── Lo que queda funcionando, en bento ───────────────────────────────────────
// Ocho entregables con jerarquía: tarjetas de distinto tamaño y tono, icono
// grande como marca de agua y el título como protagonista.

import { motion } from "framer-motion";
import { ClipboardList, FileText, Funnel, GraduationCap, LineChart, Megaphone, Repeat, Target, type LucideIcon } from "lucide-react";
import { VOLANTE_DELIVERABLES } from "@/data/tomaElVolanteContent";
import { CONTROL_BLUE, GRADIENT, L, reveal } from "./ui";

const ICONS: readonly LucideIcon[] = [FileText, Target, Funnel, Megaphone, ClipboardList, LineChart, Repeat, GraduationCap];
// Filas de 4 columnas: [2·1·1] [1·1·2] [2·2]
const LAYOUT = [
  { span: "lg:col-span-2", tone: "light" },
  { span: "lg:col-span-1", tone: "light" },
  { span: "lg:col-span-1", tone: "dark" },
  { span: "lg:col-span-1", tone: "light" },
  { span: "lg:col-span-1", tone: "amber" },
  { span: "lg:col-span-2", tone: "control" },
  { span: "lg:col-span-2", tone: "light" },
  { span: "lg:col-span-2", tone: "dark" },
] as const;

const TONES = {
  light: { card: "bg-[var(--tm-card)] border border-[var(--tm-line)]", title: "text-[var(--tm-ink)]", body: "text-[var(--tm-muted)]", icon: L.accentText, mark: "text-[var(--tm-ink)]/[0.05]" },
  dark: { card: "bg-allitron-base border border-white/10", title: "text-foreground", body: "text-foreground/68", icon: "#F5A300", mark: "text-white/[0.06]" },
  amber: { card: "text-white", title: "text-white", body: "text-white/90", icon: "#fff", mark: "text-white/[0.12]" },
  control: { card: "bg-[#0E1F2A] border border-[rgba(9,175,242,0.25)]", title: "text-foreground", body: "text-foreground/72", icon: CONTROL_BLUE, mark: "text-[rgba(9,175,242,0.10)]" },
} as const;

export default function DeliverablesBento() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {VOLANTE_DELIVERABLES.map((d, i) => {
        const Icon = ICONS[i];
        const { span, tone } = LAYOUT[i];
        const t = TONES[tone];
        return (
          <motion.li
            key={d.title}
            {...reveal(0.05 * i)}
            className={`relative flex min-h-[230px] flex-col overflow-hidden rounded-[28px] p-7 transition-transform duration-500 motion-safe:hover:-translate-y-1 sm:p-8 ${span} ${t.card}`}
            style={tone === "amber" ? { background: GRADIENT } : undefined}
          >
            <Icon aria-hidden="true" className={`pointer-events-none absolute -bottom-6 -right-4 h-44 w-44 ${t.mark}`} strokeWidth={1.1} />
            <Icon aria-hidden="true" className="relative h-6 w-6" style={{ color: t.icon }} strokeWidth={1.9} />
            <h4 className={`relative mt-auto pt-10 font-display text-[1.25rem] font-black leading-[1.12] tracking-tight sm:text-[1.4rem] ${t.title}`}>{d.title}</h4>
            <p className={`relative mt-2.5 max-w-[420px] font-body text-[0.86rem] leading-[1.65] ${t.body}`}>{d.body}</p>
          </motion.li>
        );
      })}
    </ul>
  );
}
