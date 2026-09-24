import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";

// ── MinimalHeader — páginas legales y de cliente ─────────────────────────
// Aviso de privacidad, políticas y recepción post-pago: sin menú ni footer
// de navegación. Solo marca + un único camino de regreso (decisión de Lups,
// 23-sep-2026). Barra clara, misma familia visual que el Navbar.
export default function MinimalHeader({ backHref = "/", backLabel = "Volver al inicio" }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-chrome-line)] bg-[var(--color-chrome-bg)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" aria-label="Allitron — inicio" className="flex items-center text-[var(--color-chrome-ink)]">
          <OptionalImage
            src={BRAND_LOGO.dark}
            alt="Allitron"
            style={{ height: 20, width: "auto" }}
            fallback={<span className="font-display text-[0.7rem] font-bold tracking-[0.2em]">ALLITRON</span>}
            loading="eager"
          />
        </Link>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.18em] text-[var(--color-chrome-ink)] transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
          {backLabel.toUpperCase()}
        </Link>
      </div>
    </header>
  );
}
