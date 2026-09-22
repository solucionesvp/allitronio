"use client";

// ── 404 — página no encontrada. Diseño con criterio libre (Lups: "tu
// criterio es perfecto"): tema claro premium (mismo patrón que header/
// footer/landing de lanzamiento), Alli como pieza visual y salidas claras
// en vez de un muro de texto: volver al inicio, ver Domina Google (el
// producto con más peso comercial ahora mismo) o hablar directo por
// WhatsApp si la persona llegó buscando algo puntual.

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Home, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";
import { waLink } from "@/config/contact";

const INK = "text-[var(--color-chrome-ink)]";
const MUTED = "text-[var(--color-chrome-muted)]";
const LINE = "border-[var(--color-chrome-line)]";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-chrome-bg-solid)]">
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-[720px] flex-col items-center justify-center px-8 pb-24 pt-40 text-center lg:px-16">
        <OptionalImage
          src={BRAND_ALLI.primary}
          alt=""
          style={{ height: 88, width: "auto" }}
          className="opacity-90"
          fallback={null}
        />

        <span className={`mt-8 font-display text-[0.62rem] font-bold tracking-[0.32em] text-allitron-blue`}>
          ERROR 404
        </span>

        <h1 className={`mt-4 font-display text-[2.2rem] font-black leading-[1.1] tracking-tight ${INK} sm:text-[2.8rem]`}>
          Esta página no existe (o ya no está aquí).
        </h1>

        <p className={`mt-5 max-w-[440px] font-body text-[0.95rem] leading-[1.7] ${MUTED}`}>
          Puede que el enlace esté roto o que la página se haya movido. Elige a dónde ir:
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-allitron-blue px-6 py-3.5 font-display text-[0.66rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            <Home className="h-3.5 w-3.5" strokeWidth={2.5} /> IR AL INICIO
          </Link>
          <Link
            href="/productos/domina-google/lanzamiento"
            className={`inline-flex items-center justify-center gap-1.5 rounded-full border ${LINE} px-6 py-3.5 font-display text-[0.66rem] font-bold tracking-[0.2em] ${INK} transition-colors hover:bg-[var(--color-chrome-ink)]/[0.04]`}
          >
            VER DOMINA GOOGLE <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        <a
          href={waLink("WEB", "Hola, llegué a una página que no encontré (404) y busco información.", "página 404")}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex items-center gap-1.5 font-body text-[0.82rem] ${MUTED} transition-colors hover:text-[var(--color-chrome-ink)]`}
        >
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
          O escríbenos directo por WhatsApp <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </main>
      <Footer />
    </div>
  );
}
