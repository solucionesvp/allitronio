"use client";

// ── Embudo del anuncio al análisis, contado en pantalla fija ─────────────────
// Un paso por pantalla: el escenario se queda fijo y el scroll avanza el paso
// (técnica de "scroll narrativo"). Numeral grande, título y texto cambian con un
// fundido corto; abajo, una barra de siete segmentos que también sirve para saltar.
// Para lectores de pantalla va la lista completa (sr-only) y el escenario se oculta.

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { VOLANTE_JOURNEY } from "@/data/tomaElVolanteContent";
import { CONTROL_BLUE, EASE } from "./ui";

const STEPS = VOLANTE_JOURNEY.steps;
const N = STEPS.length;

export default function JourneyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N * 0.999)))));

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (range * (i + 0.5)) / N });
  };

  const s = STEPS[active];
  return (
    <div ref={ref} className="relative mt-14" style={{ height: `${N * 58}vh` }}>
      <ol className="sr-only">
        {STEPS.map((x) => (
          <li key={x.n}>
            {x.title}. {x.body}
          </li>
        ))}
      </ol>

      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center gap-6 lg:flex-row lg:items-center lg:gap-20" aria-hidden="true">
        <div className="lg:w-[38%]">
          <AnimatePresence mode="wait">
            <motion.span
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="block select-none font-display font-black leading-[0.82] tracking-tighter"
              style={{ fontSize: "clamp(7rem, 24vw, 17rem)", color: CONTROL_BLUE }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="max-w-[560px] lg:flex-1">
          <span className="font-display text-[0.62rem] font-bold tracking-[0.3em]" style={{ color: CONTROL_BLUE }}>
            PASO {active + 1} DE {N}
          </span>
          <div className="mt-4 min-h-[11.5rem] sm:min-h-[12rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                <h3 className="font-display font-black leading-[1.06] tracking-tight text-foreground" style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.9rem)" }}>
                  {s.title}
                </h3>
                <p className="mt-4 font-body text-[1.02rem] leading-[1.75] text-foreground/72">{s.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex gap-1.5">
            {STEPS.map((x, i) => (
              <button
                key={x.n}
                type="button"
                tabIndex={-1}
                onClick={() => jump(i)}
                aria-label={`Ir al paso ${x.n}`}
                className="group flex h-11 flex-1 items-center"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/15 transition-[height] group-hover:h-[5px]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
                    style={{ width: i <= active ? "100%" : "0%", background: CONTROL_BLUE }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
