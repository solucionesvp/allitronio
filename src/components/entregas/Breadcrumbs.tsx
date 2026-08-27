"use client";

// ── Breadcrumbs — "migas de pan" del hub de entregas ────────────────────
// Sin esto, alguien que abre un documento desde WhatsApp y llega directo a
// una sub-página no tiene forma de saber que existe un hub con más
// contenido, ni cómo volver a él. Fijo arriba (sticky) para que siga visible
// aunque se haga scroll en documentos largos — no asumimos que el usuario
// sepa que puede volver al inicio del navegador.

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  hubHref: string;
  hubLabel: string;
  current: string;
  /** "dark" = sobre bg-allitron-base (documentos). "light" = sobre el hub neumórfico. */
  theme?: "dark" | "light";
}

export function Breadcrumbs({ hubHref, hubLabel, current, theme = "dark" }: BreadcrumbsProps) {
  const isDark = theme === "dark";

  return (
    <div className={`sticky top-0 z-40 w-full ${isDark ? "bg-allitron-base/80" : "bg-[var(--color-light)]/85"} backdrop-blur-md`}>
      <nav
        aria-label="Ruta de navegación"
        className={`mx-auto flex w-full max-w-[1120px] items-center gap-2 overflow-x-auto px-6 py-3 font-body text-[0.78rem] sm:px-10 lg:px-16 xl:px-24 ${
          isDark ? "text-muted" : "text-secondary"
        }`}
      >
        <Link
          href={hubHref}
          className={`flex shrink-0 items-center gap-1.5 font-semibold transition-colors ${
            isDark ? "text-foreground hover:text-allitron-blue" : "text-[#101820] hover:text-allitron-blue"
          }`}
        >
          <Home size={14} />
          {hubLabel}
        </Link>
        <ChevronRight size={13} className="shrink-0 opacity-50" />
        <span className="truncate font-medium opacity-80">{current}</span>
      </nav>
    </div>
  );
}
