"use client";

// ── Solutions — FASE 9: el video y el texto viven en un mismo clip ─────────
// Sobre la FASE 8 (poster centrado, sonido automático, sin puntos — se
// conserva), dos rondas de corrección pedidas por Lups:
//  1) El video de ensamblaje ya NO hace loop (se quitó de OptionalVideo).
//     Antes, si el usuario hacía scroll sin cambiar de producto, el video
//     igual se cortaba en seco y reiniciaba — nunca se veía el producto ya
//     armado. Sin `loop`, el navegador lo deja quieto en su propio último
//     cuadro al terminar — comportamiento nativo, sin JS ni riesgo de
//     cortar el audio antes de tiempo (una primera versión pausaba el
//     video 1s antes de su final "a mano"; se quitó porque cortaba el
//     sonido de forma audible y no se veía bien — más simple y más
//     estable dejar que el navegador lo resuelva solo). Cada vez que el
//     panel vuelve a activarse (mobile: IntersectionObserver; desktop:
//     remount al cambiar de producto) el video arranca de cero.
//  2) Composición: video y texto dejan de ser dos bloques apilados (58%/
//     42%) con fondos separados. Ahora son un solo "clip": el video llena
//     el panel completo (mismo tamaño en los 5 productos, sin depender de
//     su proporción real) y el texto vive encima, anclado abajo, sobre un
//     degradado — pero ACOTADO a la franja baja del panel (~44svh de
//     texto, ~52svh de degradado; unidades `svh`, no `%`, porque el
//     wrapper de texto no tiene una altura explícita de la que colgar un
//     porcentaje — mismo criterio que ya usa LocalMethodology con
//     max-h-[42vh]). Así el video SIEMPRE tiene la mayor parte de la
//     pantalla libre y visible, sin importar cuánto texto traiga cada
//     producto ni el tamaño de pantalla.
//  3) `no-scrollbar` (ver globals.css) en el bloque de texto y en la
//     metodología expandible de LOCAL/11: si el contenido no cabe sigue
//     haciendo scroll interno, pero sin dibujar la barra nativa del
//     navegador encima del video — antes se veía como una forma/artefacto
//     suelto sobre la escena.
//  4) Entrada en cascada real: el texto ya no aparece a la vez que el
//     video. Primero entra el video (su propio scale/fade), y sólo cuando
//     esa animación está terminando empieza a entrar el texto (ver
//     TEXT_GROUP_VARIANTS, delayChildren ajustado a la duración del video).
//
// FASE 10 — el "switch" de producto activo ya no depende de un mount:
// antes, DesktopStage desmontaba el producto anterior y montaba el
// siguiente por cada cambio de índice (AnimatePresence + key). En scroll
// real (rueda del mouse, no cámara lenta) eso significaba volver a montar
// un <video> desde cero varias veces por segundo — si el índice cambiaba
// de nuevo antes de que ese video alcanzara a pintar su primer cuadro, el
// usuario nunca lo veía ("no se ve el video"). Ahora los 5 paneles están
// siempre montados y sólo se alterna cuál es visible (ver DesktopStage);
// combinado con quitar `autoPlay` del <video> (ver OptionalAsset.tsx:
// ahora sólo reproduce el panel activo, el resto espera pausado en su
// primer cuadro), cambiar de producto es instantáneo y no depende de que
// nada termine de cargar a tiempo — el switch reacciona sólo al scroll
// real, no a la velocidad con la que React alcance a montar cada video.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS, type MethodologyPhase } from "@/data/solutions";
import type { SolutionId } from "@/components/visual/graph/types";
import { OptionalVideo } from "@/components/media/OptionalAsset";
import {
  PRODUCT_ACCENTS,
  PRODUCT_NAMES,
  PRODUCT_ROUTES,
} from "@/config/productTheme";
import {
  PRODUCT_ALLITRON90,
  PRODUCT_LOCAL,
  PRODUCT_SECOND_BRAIN,
  PRODUCT_LAZUP,
  PRODUCT_AURORA,
} from "@/config/assets";

// ── EASING ───────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Entrada animada por producto al hacer scroll ────────────────────────────
// Cada pieza (número/etiqueta, título, descripción, CTA) entra en cascada, y
// el visual (video/ícono) entra por su cuenta con un leve escalado.
const SECTION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05, opacity: { duration: 0.35 } },
  },
};

const TEXT_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// Envuelve el bloque de texto completo: su propio `delayChildren` hace que
// el primer elemento (número/etiqueta) no aparezca hasta que la animación
// de entrada del video (0.8s, ver visualVariants) ya casi terminó — video
// primero, texto después, nunca a la vez.
const TEXT_GROUP_VARIANTS = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.75, staggerChildren: 0.12 },
  },
};

function visualVariants(reduced: boolean) {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, scale: 0.92, y: -16 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };
}

// ── Sonido automático — se activa con el primer gesto del usuario, el que
// sea (scroll, click, tecla, touch). Los navegadores bloquean audio si no
// hay gesto; esto evita pedirle al usuario que "prenda" algo a propósito. ──

function useSoundUnlocked() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (unlocked) return;
    const unlock = () => setUnlocked(true);
    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("wheel", unlock, opts);
    window.addEventListener("touchstart", unlock, opts);
    window.addEventListener("scroll", unlock, opts);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, [unlocked]);

  return unlocked;
}

// ── Video de ensamblaje por producto — mapeo id → asset ──────────────────────
const PRODUCT_ASSEMBLY: Record<SolutionId, { video: string; poster: string }> = {
  "allitron-90": { video: PRODUCT_ALLITRON90.assemblyVideo, poster: PRODUCT_ALLITRON90.assemblyPoster },
  local: { video: PRODUCT_LOCAL.assemblyVideo, poster: PRODUCT_LOCAL.assemblyPoster },
  "second-brain": { video: PRODUCT_SECOND_BRAIN.assemblyVideo, poster: PRODUCT_SECOND_BRAIN.assemblyPoster },
  lazup: { video: PRODUCT_LAZUP.assemblyVideo, poster: PRODUCT_LAZUP.assemblyPoster },
};

// ── Modelo de datos unificado — 4 productos + Aurora como 5ta pieza ──────────

interface GalleryItem {
  id: string;
  accent: string;
  label: string;
  title: string;
  description: string;
  microcopy?: string;
  ctaText?: string;
  ctaAnchor?: string;
  ctaHref?: string;
  productName?: string;
  video?: { video: string; poster: string };
  methodology?: MethodologyPhase[];
  isAurora?: boolean;
}

const AURORA_ITEM: GalleryItem = {
  id: "aurora",
  accent: "#09AFF2",
  label: "INTELIGENCIA",
  title: "AURORA",
  description:
    "Cada solución converge en la misma inteligencia: Aurora coordina diagnóstico, ejecución y seguimiento — para el equipo de Allitron y para cada cliente que entra al hub.",
  video: { video: PRODUCT_AURORA.assemblyVideo, poster: PRODUCT_AURORA.assemblyPoster },
  isAurora: true,
};

function buildGalleryItems(): GalleryItem[] {
  const products: GalleryItem[] = SOLUTIONS.map((sol) => {
    const id = sol.id as SolutionId;
    return {
      id: sol.id,
      accent: PRODUCT_ACCENTS[id],
      label: sol.label,
      title: sol.title,
      description: sol.description,
      microcopy: sol.microcopy,
      ctaText: sol.ctaText,
      ctaAnchor: sol.ctaAnchor,
      ctaHref: PRODUCT_ROUTES[id],
      productName: PRODUCT_NAMES[id],
      video: PRODUCT_ASSEMBLY[id],
      methodology: sol.methodology,
    };
  });
  return [...products, AURORA_ITEM];
}

const GALLERY_ITEMS = buildGalleryItems();

// Puntos fijos de las líneas del visual de Aurora — precalculados con
// .toFixed() (no en render) para que servidor y cliente serialicen
// exactamente el mismo string. Math.cos/sin crudo en JSX causó un mismatch
// de hidratación: el motor JS del servidor y el del navegador pueden
// redondear el último dígito de un float distinto.
const AURORA_LINE_ENDPOINTS: [string, string][] = [0, 60, 120, 180, 240, 300].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  const x2 = (100 + Math.cos(rad) * 78).toFixed(3);
  const y2 = (100 + Math.sin(rad) * 78).toFixed(3);
  return [x2, y2];
});

// ── LOCAL / 11 — Fase expandible ─────────────────────────────────────────────

// Antes esta tarjeta era clara (bg-white/95) — pensada para vivir en su
// propio bloque de texto separado. Ahora vive DENTRO del overlay sobre el
// video (fondo oscuro), así que se rediseñó en vidrio oscuro (mismo
// lenguaje que el resto del overlay) para no "entorpecer" la escena con un
// rectángulo blanco encima del video; y más compacta, porque comparte el
// mismo espacio acotado (~44svh) que el resto del texto.

function MethodPhase({
  phase,
  index,
  isOpen,
  onToggle,
}: {
  phase: MethodologyPhase;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const range =
    index === 0 ? "01—03" :
    index === 1 ? "04—06" :
    index === 2 ? "07—09" :
                  "10—11";

  return (
    <div className="border-t border-white/10">
      <button
        onClick={onToggle}
        className="group flex w-full items-baseline gap-5 py-4 text-left transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allitron-blue focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[0.42rem] font-bold tabular-nums tracking-[0.32em] text-allitron-blue/70 transition-colors duration-300 group-hover:text-allitron-blue">
          {range}
        </span>
        <span className="font-display text-[0.62rem] font-black tracking-[0.24em] text-white/60 transition-colors duration-300 group-hover:text-white">
          {phase.label}
        </span>
        <span
          className="ml-auto font-display text-[0.55rem] text-white/35 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="steps"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
            style={{ overflowAnchor: "none" }}
          >
            <div className="flex flex-col gap-3 pb-5 pl-12 text-left">
              {phase.steps.map((step) => (
                <div key={step.number} className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[0.42rem] font-bold tabular-nums text-allitron-blue/50">
                      {step.number}
                    </span>
                    <span className="font-display text-[0.52rem] font-bold tracking-[0.2em] text-white/75">
                      {step.label}
                    </span>
                  </div>
                  <p className="ml-5 font-body text-[0.72rem] leading-[1.6] text-white/55">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocalMethodology({ phases }: { phases: MethodologyPhase[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <div className="no-scrollbar mt-5 max-h-[28svh] overflow-y-auto rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-1 text-left backdrop-blur-xl">
      <div className="flex items-baseline gap-4 py-4">
        <span className="font-display text-[0.42rem] font-bold tracking-[0.4em] text-allitron-blue">
          MÉTODO / 11
        </span>
        <span className="font-display text-[0.38rem] tracking-[0.26em] text-white/35">
          MÉTODO DE IMPLEMENTACIÓN
        </span>
      </div>
      <div>
        {phases.map((phase, i) => (
          <MethodPhase
            key={phase.id}
            phase={phase}
            index={i}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
        <div className="border-t border-white/10" />
      </div>
    </div>
  );
}

// ── Aurora visual — sin video (no hay asset), nodo animado consistente
// con el resto del lenguaje visual del sitio (NodeGraph / AllitronGraph). ────

function AuroraVisual() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050708]">
      <div
        className="absolute inset-[10%] rounded-full blur-[90px]"
        style={{ background: "#09AFF233" }}
        aria-hidden="true"
      />
      <svg viewBox="0 0 200 200" fill="none" className="h-[60%] w-[60%] max-h-[420px] max-w-[420px]">
        {AURORA_LINE_ENDPOINTS.map(([x2, y2], i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke="rgba(9,175,242,0.4)"
            strokeWidth="1"
          />
        ))}
        <circle cx="100" cy="100" r="34" fill="rgba(9,175,242,0.14)" />
        <circle
          cx="100"
          cy="100"
          r="12"
          fill="#09AFF2"
          className={reduced ? "" : "animate-node-breathe"}
        />
      </svg>
    </div>
  );
}

// ── Visual — misma medida en TODOS los productos (recorte uniforme con
// object-cover): cada video tiene su propia resolución/proporción, así que
// si respetáramos su tamaño real cada uno se vería de un tamaño distinto en
// pantalla. Para que el poster se sienta parejo y full-screen, la caja de
// video es siempre igual y el video la llena por completo. ──────────────────

function ItemVisual({
  item,
  videoRef,
}: {
  item: GalleryItem;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}) {
  if (!item.video) return <AuroraVisual />;
  const v = item.video;
  return (
    <div className="absolute inset-0 bg-[#050708]">
      <OptionalVideo
        ref={videoRef}
        src={v.video}
        poster={v.poster}
        className="h-full w-full object-cover"
        fallback={
          item.isAurora ? (
            <AuroraVisual />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: `${item.accent}18` }}
            >
              <span className="font-display text-[0.5rem] font-bold tracking-[0.3em]" style={{ color: item.accent }}>
                {item.label}
              </span>
            </div>
          )
        }
      />
    </div>
  );
}

// ── Contenido de un producto — video y texto viven en el MISMO clip: el
// video llena el panel completo (borde a borde, siempre la misma medida en
// los 5 productos) y el texto va anclado abajo, encima del video, sobre un
// degradado — no son dos bloques apilados, es una sola escena con el texto
// entrando sobre ella. Misma pieza para las dos experiencias (escena fija
// en desktop, apilado en móvil); sólo cambia el contenedor que la envuelve.

function ProductPanel({
  item,
  index,
  reduced,
  active,
  soundUnlocked,
}: {
  item: GalleryItem;
  index: number;
  reduced: boolean;
  active: boolean;
  soundUnlocked: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sonido automático: sólo suena cuando el panel está activo/visible Y ya
  // hubo un gesto del usuario en la página. Sin botón — nada que "prender".
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !(active && soundUnlocked);
  }, [active, soundUnlocked]);

  // Los 5 productos están siempre montados (ver DesktopStage/MobileGallery
  // FASE 10) — el <video> tiene `autoPlay`, así que el navegador intenta
  // reproducir los 5 al cargar la página. Este efecto es el que de verdad
  // decide quién reproduce: pausa el que se desactiva (si no, seguiría
  // sonando/gastando recursos de fondo) y reinicia+reproduce el que se
  // activa, siempre desde cero, para que la animación de ensamblaje se
  // vea completa cada vez que le toca turno — nunca a medias, nunca ya
  // terminada de antemano. `.play()` puede rechazar la promesa en algunos
  // navegadores si se llama en un mal momento; se ignora en silencio y el
  // `autoPlay` nativo del <video> queda como respaldo.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      // Sólo busca el cuadro 0 si hace falta -- re-seekear un video que ya
      // está en 0 fuerza al decodificador a relocalizar el keyframe, lo que
      // puede verse como un pequeño "trabón" justo al activarse.
      if (v.currentTime !== 0) v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#050708] text-center">
      {/* Visual — llena el panel completo (mismo tamaño en los 5 productos).
          El texto ya no va debajo en un bloque aparte: vive encima, dentro
          de este mismo clip. Sin `loop` en OptionalVideo, el navegador ya
          deja el video quieto en su último cuadro al terminar — no hace
          falta pausarlo a mano ni recortar su audio antes de tiempo. */}
      <motion.div variants={visualVariants(reduced)} className="absolute inset-0 h-full w-full">
        <ItemVisual item={item} videoRef={item.video ? videoRef : undefined} />
      </motion.div>

      {/* Scrim de lectura — acotado a la franja baja del panel (~52svh),
          no a toda la escena: el video se ve claro y sin cubrir en la
          mayor parte de la pantalla, y el texto sigue siendo legible
          abajo. Usamos svh (no %) a propósito: este wrapper de texto no
          tiene una altura explícita (crece con su contenido, anclado
          abajo), así que un alto en % no tendría de qué colgarse — svh sí
          resuelve siempre, sin depender de la cadena de contenedores
          (mismo criterio que ya usa LocalMethodology con max-h-[42vh]). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52svh] bg-gradient-to-t from-[#050708] via-[#050708]/85 to-transparent"
      />

      {/* Texto — anclado abajo, DENTRO del mismo clip que el video. Entra
          después de la animación del video (ver TEXT_GROUP_VARIANTS).
          max-h acotado a la misma franja que el degradado (~44svh, la
          misma proporción ya probada y estable de la versión anterior)
          para que el video SIEMPRE tenga la mayor parte de la pantalla
          libre, sea cual sea el dispositivo. `no-scrollbar`: si el
          contenido es más largo (p.ej. LOCAL/11 con su metodología
          expandible) sigue haciendo scroll interno, pero sin dibujar la
          barra nativa encima del video. */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-6 pt-8 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
        <motion.div
          variants={TEXT_GROUP_VARIANTS}
          className="no-scrollbar mx-auto flex max-h-[44svh] w-full max-w-xl flex-col overflow-y-auto"
        >
          <motion.div variants={TEXT_ITEM_VARIANTS} className="mb-4 flex items-center justify-center gap-5">
            <span
              className="font-display font-black leading-none tabular-nums"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: item.accent, letterSpacing: "0.08em" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px w-10" style={{ background: `${item.accent}70` }} />
            <span className="font-display text-[0.44rem] font-bold tracking-[0.42em]" style={{ color: item.accent }}>
              {item.label}
            </span>
          </motion.div>

          <motion.h3
            variants={TEXT_ITEM_VARIANTS}
            className="font-display font-black leading-[0.94] tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}
          >
            {item.title}
          </motion.h3>

          <motion.p variants={TEXT_ITEM_VARIANTS} className="mt-5 font-body text-[0.9rem] leading-[1.75] text-white/85">
            {item.description}
          </motion.p>

          {item.microcopy && (
            <motion.p
              variants={TEXT_ITEM_VARIANTS}
              className="mt-4 font-body text-[0.76rem] italic text-white/60"
            >
              {item.microcopy}
            </motion.p>
          )}

          {item.ctaHref && item.productName && (
            <motion.div variants={TEXT_ITEM_VARIANTS} className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={item.ctaHref}
                className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-[0.6rem] font-bold tracking-[0.2em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ background: item.accent }}
              >
                VER {item.productName.toUpperCase()}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" strokeWidth={2.5} />
              </Link>
              {item.ctaText && (
                <a
                  href={item.ctaAnchor || "#"}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-display text-[0.6rem] font-bold tracking-[0.2em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {item.ctaText}
                </a>
              )}
            </motion.div>
          )}

          {item.methodology && item.methodology.length > 0 && (
            <motion.div variants={TEXT_ITEM_VARIANTS}>
              <LocalMethodology phases={item.methodology} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ── Desktop/tablet (lg+) — UNA escena fija, el contenido cambia adentro ─────
// Los 5 paneles (4 productos + Aurora) están SIEMPRE montados dentro de la
// escena fija — nunca se desmontan ni se vuelven a montar al cambiar de
// producto. Sólo se alterna cuál es visible (opacity) según el índice que
// da el scroll. Esto reemplaza un diseño anterior con AnimatePresence que
// desmontaba el panel saliente y montaba uno nuevo por cada cambio:
//   - En un scroll real (rueda del mouse en un monitor grande, no un
//     trackpad lento en cámara lenta), el índice activo puede cambiar
//     varias veces por segundo. Con mount/unmount, cada cambio implicaba
//     volver a montar un <video> desde cero — si el índice avanzaba de
//     nuevo antes de que ese video llegara a pintar su primer cuadro, el
//     usuario nunca llegaba a verlo. Eso era "no se ve el video".
//   - Con `AnimatePresence mode="wait"` (un intento intermedio) el panel
//     saliente y el entrante ya no convivían a la vez, pero el costo era
//     que un scroll rápido dejaba la transición "persiguiendo" al índice
//     real — se veía fundido/trabado en vez de mostrar el producto actual.
// Con los 5 ya montados y reproduciéndose sólo el activo (ver el
// useEffect de `active` en ProductPanel — arranca al activarse, sin
// `autoPlay` en el <video>), cambiar de producto es un simple cambio de
// opacidad sobre algo que ya está listo: instantáneo, sin espera y sin
// dos videos pisándose durante la transición — el "switch" que sólo
// reacciona al scroll real, sin depender de que un mount alcance a
// terminar a tiempo.

function DesktopStage({ soundUnlocked }: { soundUnlocked: boolean }) {
  const reduced = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(GALLERY_ITEMS.length - 1, Math.max(0, Math.floor(v * GALLERY_ITEMS.length)));
    setActiveIndex(idx);
  });

  return (
    <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${GALLERY_ITEMS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050708]">
        {GALLERY_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={isActive ? "visible" : "hidden"}
              variants={SECTION_VARIANTS}
              transition={reduced ? { duration: 0 } : undefined}
              className="absolute inset-0"
              style={{ pointerEvents: isActive ? "auto" : "none" }}
              aria-hidden={!isActive}
            >
              <ProductPanel item={item} index={idx} reduced={reduced} active={isActive} soundUnlocked={soundUnlocked} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Móvil/tablet chico — apilado normal, sin pin (evita jank en gama baja) ──
// Cada sección detecta con IntersectionObserver si es la más visible en
// pantalla; sólo esa activa el sonido, para no encimar audio de varios
// videos mientras se hace scroll.

function MobileGalleryItem({
  item,
  idx,
  reduced,
  soundUnlocked,
}: {
  item: GalleryItem;
  idx: number;
  reduced: boolean;
  soundUnlocked: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio >= 0.6),
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
      variants={SECTION_VARIANTS}
      className="relative h-[100svh] w-full overflow-hidden bg-[#050708]"
    >
      <ProductPanel item={item} index={idx} reduced={reduced} active={active} soundUnlocked={soundUnlocked} />
    </motion.section>
  );
}

function MobileGallery({ soundUnlocked }: { soundUnlocked: boolean }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="lg:hidden">
      {GALLERY_ITEMS.map((item, idx) => (
        <MobileGalleryItem key={item.id} item={item} idx={idx} reduced={reduced} soundUnlocked={soundUnlocked} />
      ))}
    </div>
  );
}

// ── Main Solutions section ────────────────────────────────────────────────────

export default function Solutions() {
  const reduced = useReducedMotion() ?? false;
  const soundUnlocked = useSoundUnlocked();

  return (
    <section id="productos" className="relative w-full bg-[#050708]" aria-label="Soluciones Allitron">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-allitron-base to-transparent"
      />

      {/* ── Section header ──────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-6 pt-28 sm:px-8 sm:pt-32 lg:px-16 xl:px-24 xl:pt-40 2xl:px-32">
        <motion.span
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-white/45"
        >
          SOLUCIONES
        </motion.span>
        <motion.h2
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          className="font-display font-black leading-[0.9] tracking-tight text-white"
          style={{ fontSize: "clamp(2.6rem, 6vw, 6.5rem)" }}
        >
          TECNOLOGÍA QUE
          <br />
          <span className="text-allitron-blue">TERMINA EN EJECUCIÓN.</span>
        </motion.h2>
        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="mt-6 max-w-md font-body text-[0.92rem] leading-[1.8] text-white/70"
        >
          Partimos de problemas reales. Diseñamos la ruta, construimos la
          tecnología y coordinamos la ejecución hasta convertirla en una
          solución operable — las 4 piezas y la inteligencia que las conecta.
        </motion.p>
      </div>

      <DesktopStage soundUnlocked={soundUnlocked} />
      <MobileGallery soundUnlocked={soundUnlocked} />
    </section>
  );
}
