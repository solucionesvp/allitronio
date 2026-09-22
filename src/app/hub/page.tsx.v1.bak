"use client";

// ── /hub — 3 caminos, 3 experiencias ─────────────────────────────────────────
// El visitante elige quién es y entra a un flujo inmersivo propio — copy,
// preguntas y acento de color distintos por camino. No es la misma forma
// repintada tres veces.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OptionalImage } from "@/components/media/OptionalAsset";
import ImmersiveForm from "@/components/forms/ImmersiveForm";
import { HUB_PATHS_IMAGES, PLACEHOLDER } from "@/config/assets";
import { HUB_PATHS, type HubPathId } from "@/data/hubPaths";

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

export default function HubPage() {
  const [selected, setSelected] = useState<HubPathId | null>(null);
  const activePath = HUB_PATHS.find((p) => p.id === selected) ?? null;

  return (
    <>
      <Navbar />
      <main>
        {/* ── Intro ─────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[60svh] flex-col justify-center overflow-hidden bg-allitron-base px-8 pb-14 pt-32 lg:px-16 xl:px-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 50% 50% at 90% 20%, rgba(9,175,242,0.08) 0%, transparent 60%)" }}
          />
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
              describe — Allitron hace el resto.
            </motion.p>
          </div>
        </section>

        {/* ── Selector / flujo activo ───────────────────────────────── */}
        <section id="inscripcion" className="relative w-full overflow-hidden bg-allitron-base px-8 pb-28 lg:px-16 xl:px-24">
          <AnimatePresence mode="wait">
            {!activePath ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mx-auto grid max-w-[1300px] gap-6 sm:grid-cols-3"
              >
                {HUB_PATHS.map((path, i) => (
                  <motion.button
                    key={path.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
                    onClick={() => setSelected(path.id)}
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
                        ELEGIR
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activePath.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative mx-auto max-w-[700px] pt-4"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${activePath.accent}1f 0%, transparent 65%)` }}
                />

                <button
                  onClick={() => setSelected(null)}
                  className="mb-10 inline-flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-muted transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ELEGIR OTRO CAMINO
                </button>

                <span className="mb-4 block font-display text-[0.55rem] font-bold tracking-[0.3em]" style={{ color: activePath.accent }}>
                  {activePath.eyebrow}
                </span>
                <h2 className="mb-4 font-display text-[1.8rem] font-black leading-[1.05] text-foreground sm:text-[2.3rem]">
                  {activePath.title}
                </h2>
                <p className="mb-14 max-w-[480px] font-body text-[0.9rem] leading-[1.8] text-muted">
                  {activePath.description}
                </p>

                <ImmersiveForm config={activePath.form} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </>
  );
}
