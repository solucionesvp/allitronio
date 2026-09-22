"use client";

// ── /hub — Comunidad tech de Tepic y Nayarit ─────────────────────────────────
// "Más poder" (instrucción de Lups, 21-sep-2026): el objetivo de negocio es
// que la gente se inscriba y quede apuntada a WhatsApp para que Lups la
// agregue manualmente al grupo — todavía no existe un link de invitación a
// un grupo real, así que cada CTA abre su WhatsApp personal con un mensaje
// prellenado (y el camino elegido, para que sepa a quién está agregando).
// El formulario inmersivo por correo (ImmersiveForm) queda retirado de este
// flujo: dejaba al usuario mandando un correo que nadie procesaba en
// automático — WhatsApp es el canal real que Lups revisa.

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OptionalImage } from "@/components/media/OptionalAsset";
import FilmGrain from "@/components/effects/FilmGrain";
import { HERO, HUB_PATHS_IMAGES, PLACEHOLDER } from "@/config/assets";
import { HUB_PATHS, type HubPathId } from "@/data/hubPaths";
import { waLink } from "@/config/contact";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PATH_IMAGE: Record<HubPathId, string> = {
  publico: HUB_PATHS_IMAGES.publico,
  empresa: HUB_PATHS_IMAGES.empresa,
  creador: HUB_PATHS_IMAGES.creador,
};

/** Foto real de stock mientras no exista la foto propia de cada camino */
const PATH_PLACEHOLDER: Record<HubPathId, string> = {
  publico: PLACEHOLDER.event,
  empresa: PLACEHOLDER.workSession,
  creador: PLACEHOLDER.knowledge,
};

const HERO_WA_LINK = waLink("HUB", "Quiero entrar al Hub de Allitron.", "hub · hero");

export default function HubPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Intro ─────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[68svh] flex-col justify-center overflow-hidden bg-allitron-base px-8 pb-14 pt-32 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 50% 50% at 90% 20%, rgba(9,175,242,0.08) 0%, transparent 60%)" }}
          />
          {/* ── Foto de Alli (misma foto del Hero del home, HERO.hero,
              foto original sin recortes — mismo tratamiento que Hero.tsx,
              23-sep-2026: portada completa, no panel lateral. La foto cubre
              toda la sección de fondo. object-position 72% en desktop (85%
              en móvil) deja a Alli completo con la catedral detrás.
              Degradado oscuro→transparente encima, deja notar la foto de
              fondo sin taparla del todo. En móvil vive de fondo completo y
              muy atenuada (sin cambios, ese tratamiento nunca fue el
              problema). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12] lg:opacity-100"
          >
            <OptionalImage
              src={HERO.hero}
              alt=""
              className="h-full w-full object-cover object-[85%_center] lg:object-[72%_center]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden
                lg:block lg:bg-[linear-gradient(to_right,rgba(16,24,32,0.94)_0%,rgba(16,24,32,0)_60%)]"
            />
            <FilmGrain opacity={0.1} />
          </div>
          <div className="relative z-10 max-w-[700px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 font-display text-[0.58rem] font-semibold tracking-[0.44em] text-allitron-blue"
            >
              HUB DE DESARROLLADORES · NAYARIT
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              className="font-display font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              TALENTO TECNOLÓGICO DE TEPIC Y NAYARIT, EN UN SOLO LUGAR.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mt-6 max-w-[460px] font-body text-[0.9rem] leading-[1.85] text-muted"
            >
              Tres caminos, tres experiencias distintas. Elige el que te
              describe y te agregamos al grupo de WhatsApp del Hub.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
              className="mt-9"
            >
              <a
                href={HERO_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-allitron-blue px-7 py-3.5 font-display text-[0.64rem] font-bold tracking-[0.2em] text-allitron-base transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2 focus-visible:ring-offset-allitron-base"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                ÚNETE AL HUB POR WHATSAPP
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Selector — cada camino abre WhatsApp directo, con el camino
             elegido en el mensaje para que Lups sepa a quién está agregando ── */}
        <section id="inscripcion" className="relative w-full overflow-hidden bg-allitron-base px-8 pb-28 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mx-auto grid max-w-[1300px] gap-6 sm:grid-cols-3"
          >
            {HUB_PATHS.map((path, i) => (
              <motion.a
                key={path.id}
                href={waLink("HUB", `Quiero entrar al Hub — ${path.eyebrow}.`, `hub · selector · ${path.id}`)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden border border-white/[0.08] p-7 text-left transition-transform duration-400 hover:-translate-y-1"
              >
                {/* Background photo — placeholder de marca si no existe aún */}
                <div className="absolute inset-0">
                  <OptionalImage
                    src={PATH_IMAGE[path.id]}
                    alt=""
                    placeholder={PATH_PLACEHOLDER[path.id]}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallback={
                      <div
                        className="h-full w-full"
                        style={{ background: `radial-gradient(circle at 30% 20%, ${path.accent}26, #101820 70%)` }}
                      />
                    }
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(16,24,32,0.96) 10%, rgba(16,24,32,0.55) 55%, rgba(16,24,32,0.25) 100%)" }}
                  />
                </div>

                {/* Top accent line */}
                <div className="absolute left-0 top-0 h-[3px] w-full" style={{ background: path.accent }} />

                <div className="relative z-10">
                  {path.badge && (
                    <span
                      className="mb-4 inline-block border px-2.5 py-1 font-display text-[0.5rem] font-bold tracking-[0.14em]"
                      style={{ borderColor: `${path.accent}55`, color: path.accent }}
                    >
                      {path.badge.toUpperCase()}
                    </span>
                  )}
                  <span className="mb-3 block font-display text-[0.5rem] font-bold tracking-[0.3em]" style={{ color: path.accent }}>
                    {path.eyebrow}
                  </span>
                  <h3 className="mb-3 font-display text-[1.3rem] font-black leading-[1.1] text-foreground">
                    {path.title}
                  </h3>
                  <p className="mb-5 font-body text-[0.8rem] leading-[1.65] text-muted">
                    {path.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] transition-colors"
                    style={{ color: path.accent }}
                  >
                    UNIRME POR WHATSAPP
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
