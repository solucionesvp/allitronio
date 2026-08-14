"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";

const NAV_LINKS = [
  { label: "Productos", href: "/#productos" },
  { label: "Evento", href: "/evento" },
  { label: "Hub", href: "/hub" },
] as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            height={18}
            className="h-[18px] w-auto"
            fallback={<span>ALLITRON</span>}
            loading="eager"
          />
        </Link>

        {/* Nav links — desktop only */}
        <ul className="hidden items-center gap-10 md:flex" role="list">
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
