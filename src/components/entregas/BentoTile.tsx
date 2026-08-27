"use client";

// ── BentoTile — pieza del hub de entrega ────────────────────────────────
// Documento → <Link> a su propia sub-página (/entregas/[cliente]/[doc]).
// Media/extracto → <button> que dispara un modal sobre el mismo hub.
// Mismo componente visual para ambos: lo único que cambia es qué pasa al
// hacer click, nunca cómo se ve.
//
// Superficie neumórfica clara (`.neu`) en vez de `.glass` oscuro: el ícono
// (que ya trae su propio panel navy/glass en el SVG) queda como una pieza
// "insertada" sobre la tarjeta clara, en vez de perderse contra un fondo
// oscuro casi idéntico.

import Link from "next/link";
import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { ArrowUpRight, Play } from "lucide-react";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface BentoTileProps {
  icon: string;
  title: string;
  subtitle: string;
  size?: "protagonist" | "normal";
  kind?: "documento" | "media";
  href?: string;
  onClick?: () => void;
  delay?: number;
}

export function BentoTile({
  icon,
  title,
  subtitle,
  size = "normal",
  kind = "documento",
  href,
  onClick,
  delay = 0,
}: BentoTileProps) {
  const spanClass = size === "protagonist" ? "sm:col-span-2 sm:row-span-2" : "";

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={`neu neu-hover group relative flex h-full min-h-[176px] cursor-pointer flex-col justify-between overflow-hidden rounded-[26px] p-6 ${
        size === "protagonist" ? "min-h-[240px] p-8" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(9,175,242,0.16), transparent 70%)" }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className={`neu-inset flex items-center justify-center rounded-2xl p-2.5 ${
            size === "protagonist" ? "h-[76px] w-[76px]" : "h-[60px] w-[60px]"
          }`}
        >
          <OptionalImage src={icon} alt="" style={{ width: size === "protagonist" ? 56 : 42, height: "auto" }} />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#101820]/[0.06] text-secondary transition-colors group-hover:bg-allitron-blue group-hover:text-white">
          {kind === "media" ? <Play size={13} /> : <ArrowUpRight size={14} />}
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <h3
          className={`font-display font-bold text-[#101820] ${
            size === "protagonist" ? "text-[1.3rem]" : "text-[1rem]"
          }`}
        >
          {title}
        </h3>
        <p className="mt-2 font-body text-[0.82rem] leading-[1.6] text-secondary">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={spanClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`text-left ${spanClass}`}>
      {inner}
    </button>
  );
}
