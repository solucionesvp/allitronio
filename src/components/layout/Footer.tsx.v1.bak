"use client";

// ── Footer — cierre global del sitio ─────────────────────────────────────────

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";

const FOOTER_LINKS = [
  { label: "Productos", href: "/#productos" },
  { label: "Evento", href: "/evento" },
  { label: "Hub", href: "/hub" },
] as const;

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/[0.06] bg-allitron-base px-8 pb-8 pt-20 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-[340px]">
            <Link
              href="/"
              className="inline-block font-display text-[0.72rem] font-black tracking-[0.35em] text-foreground transition-colors hover:text-allitron-blue"
            >
              <OptionalImage
                src={BRAND_LOGO.light}
                alt="Allitron"
                style={{ height: 24, width: "auto" }}
                fallback={<span>ALLITRON</span>}
              />
            </Link>
            <p className="mt-5 font-body text-[0.82rem] leading-[1.8] text-muted">
              Connecting the Future. Tecnología, inteligencia artificial y
              estrategia desde Tepic, Nayarit.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <span className="mb-5 block font-display text-[0.5rem] font-bold tracking-[0.32em] text-muted/50">
                NAVEGAR
              </span>
              <ul className="flex flex-col gap-3" role="list">
                {FOOTER_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-body text-[0.85rem] text-muted transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="mb-5 block font-display text-[0.5rem] font-bold tracking-[0.32em] text-muted/50">
                ÚNETE
              </span>
              <Link
                href="/hub#inscripcion"
                className="inline-flex items-center gap-1.5 font-body text-[0.85rem] text-allitron-blue transition-colors hover:text-allitron-blue/80"
              >
                Regístrate al Hub
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="font-body text-[0.72rem] text-muted/50">
            © {new Date().getFullYear()} Allitron. Todos los derechos reservados.
          </p>

          <a
            href="https://somoslazaro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-[0.72rem] text-muted/60 transition-colors hover:text-foreground"
          >
            <OptionalImage
              src={BRAND_ALLI.primary}
              alt=""
              style={{ height: 18, width: "auto" }}
              className="opacity-70"
              fallback={null}
            />
            Hecho con <span aria-hidden="true">♥</span> por somoslazaro.com
          </a>
        </div>
      </div>
    </footer>
  );
}
