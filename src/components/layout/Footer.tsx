"use client";

// ── Footer — cierre global del sitio ─────────────────────────────────────────
// Rediseño 21-sep-2026: claro, mismo patrón que Navbar y que la landing de
// lanzamiento. El link al Hub abre WhatsApp directo (grupo del Hub se arma
// manualmente por ahora — ver src/config/contact.ts).

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import { waLink } from "@/config/contact";

const FOOTER_LINKS = [
  { label: "Productos", href: "/#productos" },
  { label: "Hub", href: "/hub" },
  { label: "Aviso de Privacidad", href: "/aviso-de-privacidad" },
] as const;

const INK = "text-[var(--color-chrome-ink)]";
const MUTED = "text-[var(--color-chrome-muted)]";

export default function Footer() {
  return (
    <footer className={`relative w-full border-t border-[var(--color-chrome-line)] bg-[var(--color-chrome-bg-solid)] px-8 pb-8 pt-20 lg:px-16 xl:px-24`}>
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-[340px]">
            <Link
              href="/"
              className={`inline-block font-display text-[0.72rem] font-black tracking-[0.35em] ${INK} transition-colors hover:text-allitron-blue`}
            >
              <OptionalImage
                src={BRAND_LOGO.dark}
                alt="Allitron"
                style={{ height: 24, width: "auto" }}
                fallback={<span>ALLITRON</span>}
              />
            </Link>
            <p className={`mt-5 font-body text-[0.82rem] leading-[1.8] ${MUTED}`}>
              Connecting the Future. Tecnología, inteligencia artificial y
              estrategia desde Tepic, Nayarit.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <span className={`mb-5 block font-display text-[0.5rem] font-bold tracking-[0.32em] ${MUTED}`}>
                NAVEGAR
              </span>
              <ul className="flex flex-col gap-3" role="list">
                {FOOTER_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`font-body text-[0.85rem] ${MUTED} transition-colors hover:text-[var(--color-chrome-ink)]`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className={`mb-5 block font-display text-[0.5rem] font-bold tracking-[0.32em] ${MUTED}`}>
                ÚNETE
              </span>
              <a
                href={waLink("HUB", "Hola, quiero unirme al Hub de Allitron.", "footer · Únete")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[0.85rem] text-allitron-blue transition-colors hover:text-allitron-blue/80"
              >
                Únete al grupo del Hub
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-[var(--color-chrome-line)] pt-8 md:flex-row">
          <p className={`font-body text-[0.72rem] ${MUTED}`}>
            © {new Date().getFullYear()} Allitron. Todos los derechos reservados.
          </p>

          <a
            href="https://somoslazaro.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 font-body text-[0.72rem] ${MUTED} transition-colors hover:text-[var(--color-chrome-ink)]`}
          >
            <OptionalImage
              src={BRAND_ALLI.primary}
              alt=""
              style={{ height: 18, width: "auto" }}
              className="opacity-80"
              fallback={null}
            />
            Hecho con <span aria-hidden="true">♥</span> por somoslazaro.com
          </a>
        </div>
      </div>
    </footer>
  );
}
