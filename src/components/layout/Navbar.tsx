"use client";

// ── Navbar — chrome fijo del sitio ────────────────────────────────────────
// Rediseño 21-sep-2026: barra clara y siempre presente (glass claro con
// blur), no oscura-hasta-el-scroll — misma calidad y efectos que la
// landing de lanzamiento de Domina Google, pero en claro. Funciona igual
// de bien sobre un hero oscuro (home) o una sección clara (Domina Google
// info): al ser su propia capa opaca, no depende de lo que haya detrás.

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { waLink } from "@/config/contact";
import { PORTFOLIO_AVAILABLE } from "@/data/portfolio";

/** Menú de productos (29-sep-2026): solo los productos disponibles hoy,
 * desde el portafolio (src/data/portfolio.ts). "Ver todos" lleva a /productos,
 * donde también están los que vienen en camino. */
// Regla (Lups, 29-sep-2026): el menú NO lleva a las landings de anuncios;
// lleva a la presentación de cada producto dentro de /productos.
const PRODUCT_LINKS = PORTFOLIO_AVAILABLE.map((p) => ({
  label: p.name,
  href: `/productos#${p.id}`,
  accent: p.accent,
  desc: p.menuLine,
}));

const NAV_LINKS = [
  { label: "Hub", href: "/hub" },
] as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const CHROME_BG = "bg-[var(--color-chrome-bg)]";
const CHROME_LINE = "border-[var(--color-chrome-line)]";
const INK = "text-[var(--color-chrome-ink)]";
const MUTED = "text-[var(--color-chrome-muted)]";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${CHROME_BG} backdrop-blur-xl transition-shadow duration-500 ${
        scrolled || open ? `border-b ${CHROME_LINE} shadow-[0_1px_0_0_rgba(16,24,32,0.03),0_12px_30px_-18px_rgba(16,24,32,0.25)]` : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4 lg:px-16 xl:px-24"
        aria-label="Navegación principal"
      >
        {/* Wordmark — variante oscura del logo (fondo claro). Texto ALLITRON como fallback. */}
        <Link
          href="/"
          className={`relative z-10 font-display text-[0.68rem] font-black tracking-[0.35em] ${INK} transition-colors duration-300 hover:text-allitron-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue focus-visible:ring-offset-2`}
          onClick={() => setOpen(false)}
        >
          <OptionalImage
            src={BRAND_LOGO.dark}
            alt="Allitron"
            style={{ height: 20, width: "auto" }}
            fallback={<span>ALLITRON</span>}
            loading="eager"
          />
        </Link>

        {/* Nav links — desktop only */}
        <ul className="hidden items-center gap-10 md:flex" role="list">
          {/* Productos — disponibles hoy + liga al portafolio */}
          <li
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
              className={`flex items-center gap-1.5 font-body text-[0.68rem] uppercase tracking-[0.14em] ${MUTED} transition-colors duration-200 hover:text-[var(--color-chrome-ink)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue`}
            >
              Productos
              <ChevronDown
                className="h-3 w-3 transition-transform duration-300"
                style={{ transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                strokeWidth={2.2}
              />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className={`absolute left-1/2 top-full w-[340px] -translate-x-1/2 rounded-xl border ${CHROME_LINE} bg-[var(--color-chrome-bg-solid)] p-2 shadow-[0_24px_60px_-24px_rgba(16,24,32,0.3)] backdrop-blur-xl`}
                  style={{ marginTop: 14 }}
                >
                  {PRODUCT_LINKS.map(({ label, desc, href, accent }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setProductsOpen(false)}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-[var(--color-chrome-ink)]/[0.04]"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ background: accent }}
                      />
                      <span className="min-w-0">
                        <span className={`block font-display text-[0.76rem] font-bold ${INK}`}>
                          {label}
                        </span>
                        <span className={`mt-0.5 block font-body text-[0.68rem] leading-snug ${MUTED}`}>
                          {desc}
                        </span>
                      </span>
                    </Link>
                  ))}

                  <Link
                    href="/productos"
                    onClick={() => setProductsOpen(false)}
                    className={`mt-1 flex items-center gap-1.5 border-t ${CHROME_LINE} px-3 pb-1 pt-3 font-display text-[0.6rem] font-bold tracking-[0.18em] text-allitron-blue transition-colors hover:text-allitron-orange`}
                  >
                    VER TODOS LOS PRODUCTOS
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`font-body text-[0.68rem] tracking-[0.14em] ${MUTED} uppercase transition-colors duration-200 hover:text-[var(--color-chrome-ink)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop only */}
        <a
          href={waLink("WEB", "Hola, vengo de allitron.io y quiero información.", "menú superior · escritorio")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-full bg-allitron-blue px-5 py-2.5 font-display text-[0.62rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2 md:inline-flex"
        >
          CONECTAR
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className={`relative z-10 flex h-9 w-9 items-center justify-center ${INK} md:hidden`}
        >
          {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`border-t ${CHROME_LINE} bg-[var(--color-chrome-bg-solid)] px-8 pb-10 pt-6 backdrop-blur-xl md:hidden`}
          >
            {/* Productos — disponibles hoy, siempre visibles en móvil */}
            <span className={`mb-3 block font-display text-[0.5rem] font-bold tracking-[0.36em] ${MUTED}`}>
              PRODUCTOS
            </span>
            <ul className="mb-6 flex flex-col gap-1" role="list">
              {PRODUCT_LINKS.map(({ label, desc, href, accent }, idx) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04, ease: EASE }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-start gap-3 border-b ${CHROME_LINE} py-3.5`}
                  >
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>
                      <span className={`block font-display text-[0.95rem] font-bold ${INK}`}>
                        {label}
                      </span>
                      <span className={`mt-0.5 block font-body text-[0.72rem] leading-snug ${MUTED}`}>
                        {desc}
                      </span>
                    </span>
                  </Link>
                </motion.li>
              ))}
              <li>
                <Link
                  href="/productos"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 py-3.5 font-display text-[0.62rem] font-bold tracking-[0.18em] text-allitron-blue"
                >
                  VER TODOS LOS PRODUCTOS
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }, idx) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: EASE }}
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block border-b ${CHROME_LINE} py-4 font-display text-[1.1rem] font-bold tracking-wide ${INK} transition-colors hover:text-allitron-blue`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={waLink("WEB", "Hola, vengo de allitron.io y quiero información.", "menú móvil")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16, ease: EASE }}
              className="mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-allitron-blue px-5 py-3.5 font-display text-[0.68rem] font-bold tracking-[0.22em] text-white"
            >
              CONECTAR
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
