"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { PRODUCT_ACCENTS, PRODUCT_NAMES, PRODUCT_ROUTES } from "@/config/productTheme";

/** Las 4 landings reales — accesibles desde el menú en todas las páginas,
 * no solo desde el scroll del home. Cada una con su acento de producto. */
const PRODUCT_LINKS = (
  [
    ["allitron-90", "Diagnóstico + roadmap de 90 días"],
    ["local", "Presencia local que atrae clientes"],
    ["second-brain", "Tu memoria operativa, siempre lista"],
    ["lazup", "Tu negocio ordenado dentro de WhatsApp"],
  ] as const
).map(([id, desc]) => ({
  label: PRODUCT_NAMES[id],
  href: PRODUCT_ROUTES[id],
  accent: PRODUCT_ACCENTS[id],
  desc,
}));

const NAV_LINKS = [
  { label: "Evento", href: "/evento" },
  { label: "Hub", href: "/hub" },
] as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
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

  // Close menu on route change (link click) handled via onClick below

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/[0.05] bg-allitron-base/85 backdrop-blur-xl"
          : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-5 lg:px-16 xl:px-24"
        aria-label="Navegación principal"
      >
        {/* Wordmark — muestra logo SVG si existe; texto ALLITRON como fallback */}
        <Link
          href="/"
          className="relative z-10 font-display text-[0.68rem] font-black tracking-[0.35em] text-foreground transition-colors duration-300 hover:text-allitron-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base"
          onClick={() => setOpen(false)}
        >
          <OptionalImage
            src={BRAND_LOGO.light}
            alt="Allitron"
            /* Altura inline: el SVG trae dimensiones intrínsecas (400×80) y el
               reset de imágenes gana sobre la utilidad de altura. Inline es
               determinista. */
            style={{ height: 20, width: "auto" }}
            fallback={<span>ALLITRON</span>}
            loading="eager"
          />
        </Link>

        {/* Nav links — desktop only */}
        <ul className="hidden items-center gap-10 md:flex" role="list">
          {/* Productos — despliega las 4 landings reales */}
          <li
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
              className="flex items-center gap-1.5 font-body text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue"
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
                  className="glass-strong absolute left-1/2 top-full w-[330px] -translate-x-1/2 rounded-xl p-2"
                  style={{ marginTop: 14 }}
                >
                  {PRODUCT_LINKS.map(({ label, desc, href, accent }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setProductsOpen(false)}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.06]"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ background: accent }}
                      />
                      <span className="min-w-0">
                        <span className="block font-display text-[0.76rem] font-bold text-foreground">
                          {label}
                        </span>
                        <span className="mt-0.5 block font-body text-[0.68rem] leading-snug text-muted">
                          {desc}
                        </span>
                      </span>
                    </Link>
                  ))}

                  <Link
                    href="/#productos"
                    onClick={() => setProductsOpen(false)}
                    className="mt-1 flex items-center gap-1.5 border-t border-white/[0.07] px-3 pb-1 pt-3 font-display text-[0.6rem] font-bold tracking-[0.18em] text-allitron-blue transition-colors hover:text-allitron-orange"
                  >
                    VER TODO
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
                className="font-body text-[0.68rem] tracking-[0.14em] text-muted uppercase transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop only */}
        <a
          href="/hub#inscripcion"
          className="hidden border border-allitron-blue/20 px-5 py-2 font-display text-[0.62rem] font-semibold tracking-[0.22em] text-allitron-blue transition-all duration-300 hover:border-allitron-blue/50 hover:bg-allitron-blue/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-allitron-blue md:inline-block"
        >
          CONECTAR
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="relative z-10 flex h-9 w-9 items-center justify-center text-foreground md:hidden"
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
            className="border-t border-white/[0.06] bg-allitron-base/97 px-8 pb-10 pt-6 backdrop-blur-xl md:hidden"
          >
            {/* Productos — las 4 landings, siempre visibles en móvil */}
            <span className="mb-3 block font-display text-[0.5rem] font-bold tracking-[0.36em] text-muted/50">
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
                    className="flex items-start gap-3 border-b border-white/[0.05] py-3.5"
                  >
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>
                      <span className="block font-display text-[0.95rem] font-bold text-foreground">
                        {label}
                      </span>
                      <span className="mt-0.5 block font-body text-[0.72rem] leading-snug text-muted">
                        {desc}
                      </span>
                    </span>
                  </Link>
                </motion.li>
              ))}
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
                    className="block border-b border-white/[0.05] py-4 font-display text-[1.1rem] font-bold tracking-wide text-foreground transition-colors hover:text-allitron-blue"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="/hub#inscripcion"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16, ease: EASE }}
              className="mt-8 inline-flex w-full items-center justify-center border border-allitron-blue/30 px-5 py-3.5 font-display text-[0.68rem] font-semibold tracking-[0.22em] text-allitron-blue"
            >
              CONECTAR
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
