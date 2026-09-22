"use client";

// ── Placeholder "Próximamente" para productos sin identidad visual propia
// todavía (LAZUP, Segundo Cerebro, Allitron 90). Cada uno tendrá su propia
// landing más adelante — mientras tanto esto evita mostrar una landing a
// medio terminar o con precios/CTAs que no reflejan la oferta real. El
// contenido original de cada página queda respaldado en el mismo folder
// (page.tsx.bak) y NO se borra.

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { waLink } from "@/config/contact";

const INK = "text-[var(--color-chrome-ink)]";
const MUTED = "text-[var(--color-chrome-muted)]";
const LINE = "border-[var(--color-chrome-line)]";

export default function ComingSoonProduct({
  name,
  keyword,
  accent,
  tagline,
}: {
  name: string;
  keyword: string;
  accent: string;
  tagline: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-chrome-bg-solid)]">
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-[840px] flex-col items-center justify-center px-8 pb-24 pt-40 text-center lg:px-16">
        <span
          className={`inline-flex items-center gap-2 rounded-full border ${LINE} px-4 py-1.5 font-display text-[0.62rem] font-bold tracking-[0.24em]`}
          style={{ color: accent }}
        >
          <Clock className="h-3 w-3" strokeWidth={2.5} />
          PRÓXIMAMENTE
        </span>

        <h1 className={`mt-8 font-display text-[2.4rem] font-black leading-[1.05] tracking-tight ${INK} sm:text-[3.2rem]`}>
          {name}
        </h1>

        <p className={`mt-6 max-w-[480px] font-body text-[1rem] leading-[1.7] ${MUTED}`}>
          {tagline}
        </p>

        <p className={`mt-3 max-w-[480px] font-body text-[0.92rem] leading-[1.7] ${MUTED}`}>
          Estamos construyendo la identidad visual propia de este producto. Si quieres que te avisemos en cuanto esté disponible, o si te interesa ahora mismo, escríbenos directo.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={waLink(keyword, `Hola, quiero saber más sobre ${name}.`, `${name} · próximamente`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-7 py-3.5 font-display text-[0.68rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.03]"
            style={{ background: accent }}
          >
            AVÍSAME / QUIERO SABER MÁS <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
          <Link
            href="/#productos"
            className={`inline-flex items-center gap-1.5 font-body text-[0.82rem] ${MUTED} transition-colors hover:text-[var(--color-chrome-ink)]`}
          >
            Ver los demás productos <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
