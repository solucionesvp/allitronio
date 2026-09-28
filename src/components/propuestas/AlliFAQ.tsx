/* eslint-disable @next/next/no-img-element */
"use client";

// ── AlliFAQ — "Pregúntale a Alli" ────────────────────────────────────────
// Tarjetas con la pregunta; al tocar una, Alli responde en un globo.
// Una abierta a la vez para que la lectura sea simple en celular.
// Va justo antes del cierre con los botones de WhatsApp: resuelve la duda
// y deja al cliente frente a "Acepto".

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ALLI_AVATAR } from "@/config/propuestas";
import type { FaqItem } from "@/content/propuestas/faq";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function AlliFAQ({
  items,
  titulo = "Pregúntale a Alli",
  subtitulo = "Toca una pregunta y te respondo.",
}: {
  items: FaqItem[];
  titulo?: string;
  subtitulo?: string;
}) {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <div id="preguntas" className="scroll-mt-20">
      <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <img
          src={ALLI_AVATAR.lg}
          alt="Alli"
          width={112}
          height={112}
          loading="lazy"
          decoding="async"
          className="h-28 w-28 shrink-0 rounded-full object-cover shadow-[0_12px_30px_rgba(9,175,242,0.28)] ring-4 ring-white"
        />
        <div>
          <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.22em] text-allitron-navy">Preguntas frecuentes</p>
          <h2 className="mt-1 font-display text-[1.7rem] font-black leading-[1.2] text-[#101820] sm:text-[2.1rem]">{titulo}</h2>
          <p className="mt-1 font-body text-[1.1rem] text-secondary">{subtitulo}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it, i) => {
          const open = abierta === i;
          return (
            <motion.div
              key={it.pregunta}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: 0.03 * i, ease: EASE }}
              className={`neu self-start overflow-hidden rounded-[22px] ${open ? "ring-2 ring-allitron-blue/40" : ""}`}
            >
              <button
                type="button"
                onClick={() => setAbierta(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <img src={ALLI_AVATAR.sm} alt="" width={44} height={44} loading="lazy" decoding="async" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                <span className="min-w-0 flex-1 font-display text-[1.08rem] font-bold leading-[1.35] text-[#101820] [overflow-wrap:anywhere]">{it.pregunta}</span>
                <ChevronDown size={22} className={`shrink-0 text-allitron-blue transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="r"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <div className="px-5 pb-5">
                      <div className="relative rounded-[18px] rounded-tl-[6px] bg-allitron-blue/10 p-4">
                        <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-allitron-blue">Alli responde</p>
                        <p className="mt-1 font-body text-[1.05rem] leading-[1.65] text-[#101820] [overflow-wrap:anywhere]">{it.respuesta}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
