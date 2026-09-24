"use client";

// ── /productos/domina-google/recepcion — Recepción post-pago ────────────────
// Página evergreen: se envía a TODO cliente de Domina Google justo después de
// confirmar el anticipo. Mismo link para todos los clientes, no hay versión
// por cliente. Vive bajo el nav completo (no es landing de tráfico pagado) —
// mismo criterio que /productos/domina-google (evergreen).
//
// Único valor a editar a mano: RECEPTION_FORM_URL, en cuanto exista el Google
// Form real (ver especificación de campos entregada aparte a Lups).
//
// Precio y plazo de entrega NO se repiten a mano aquí: se importan de
// DG_DELIVERY (dominaGoogleContent.ts), fuente única ya usada en el resto del
// sitio, para que esta página nunca quede desincronizada si cambian.

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, ShieldCheck, MessageCircle } from "lucide-react";
import MinimalHeader from "@/components/layout/MinimalHeader";
import { DOMINA_GOOGLE_LIGHT, DOMINA_GOOGLE_TOKENS } from "@/config/productTheme";
import { DG_DELIVERY } from "@/data/dominaGoogleContent";
import { WHATSAPP_DISPLAY } from "@/config/contact";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const ACCENT = DOMINA_GOOGLE_TOKENS.accent;
const L = DOMINA_GOOGLE_LIGHT;

// Se llena en cuanto exista el Google Form real (ver especificación aparte).
const RECEPTION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdtYiOVZzrKl1xY82-waUMfUiGYfFJWKkBz9vvHVoj8u0Oy6w/viewform";

const LIGHT_VARS = {
  "--dg-bg": L.bg,
  "--dg-bg-alt": L.bgAlt,
  "--dg-card": L.card,
  "--dg-ink": L.ink,
  "--dg-muted": L.muted,
  "--dg-line": L.line,
  "--dg-accent-text": L.accentText,
} as CSSProperties;

const H2 = "font-display font-black leading-[1.05] tracking-tight text-[var(--dg-ink)]";
const BODY = "font-body text-[0.88rem] leading-[1.8] text-[var(--dg-muted)]";
const EYEBROW = "mb-5 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-[var(--dg-muted)]";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

const STEPS = [
  {
    n: "1",
    title: "Hoy — nos compartes tu información",
    text: "10-15 minutos, es el formulario de abajo.",
  },
  {
    n: "2",
    title: `Tu plazo de entrega — ${DG_DELIVERY.delivery}`,
    text: DG_DELIVERY.deliveryNote,
  },
  {
    n: "3",
    title: "Entrega",
    text: "Revisas, aprobamos juntos y queda publicado.",
  },
] as const;

const PREP_ITEMS = [
  "Nombre exacto de tu negocio y tu WhatsApp de contacto",
  "Dirección y horarios",
  "Acceso a tu ficha de Google Business Profile, como propietario o administrador",
  "Tu logo, si lo tienes a la mano — si no, lo completas después",
] as const;

export default function DominaGoogleRecepcionPage() {
  return (
    <>
      <MinimalHeader />
      <main style={LIGHT_VARS}>
        <section className="w-full bg-[var(--dg-bg)] px-8 pb-24 pt-40 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-[760px]">
            <motion.div
              {...reveal(0)}
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: DOMINA_GOOGLE_TOKENS.accentSoft }}
            >
              <Check className="h-6 w-6" style={{ color: ACCENT }} strokeWidth={2.6} />
            </motion.div>

            <span className={EYEBROW}>DOMINA GOOGLE · RECEPCIÓN DE CLIENTE</span>

            <motion.h1 {...reveal(0.06)} className={H2} style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.2rem)" }}>
              Pago confirmado. Arrancamos.
            </motion.h1>

            <motion.p {...reveal(0.12)} className={`mt-6 max-w-[520px] ${BODY}`}>
              Esto es lo que sigue, en tres pasos. El primero depende de ti — los otros dos, de nosotros.
            </motion.p>

            <motion.ol {...reveal(0.16)} className="mt-14 overflow-hidden rounded-sm border border-[var(--dg-line)]">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`flex gap-5 bg-[var(--dg-card)] p-6 ${i !== STEPS.length - 1 ? "border-b border-[var(--dg-line)]" : ""}`}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[0.75rem] font-bold"
                    style={{ background: DOMINA_GOOGLE_TOKENS.accentSoft, color: ACCENT }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <div className="font-display text-[0.92rem] font-bold text-[var(--dg-ink)]">{s.title}</div>
                    <div className={`mt-1.5 ${BODY}`}>{s.text}</div>
                  </div>
                </li>
              ))}
            </motion.ol>

            <motion.div {...reveal(0.2)} className="mt-10 rounded-sm border border-[var(--dg-line)] bg-[var(--dg-bg-alt)] p-6">
              <span className="mb-4 flex items-center gap-2 font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--dg-accent-text)]">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                ANTES DE ENTRAR, TEN A LA MANO
              </span>
              <ul className="flex flex-col gap-3">
                {PREP_ITEMS.map((item) => (
                  <li key={item} className={`flex items-start gap-3 ${BODY}`}>
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} strokeWidth={2.6} />
                    <span className="text-[var(--dg-ink)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...reveal(0.26)} className="mt-12 flex flex-col items-center gap-3 text-center">
              <a
                href={RECEPTION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm px-8 py-4 font-display text-[0.68rem] font-bold tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: DOMINA_GOOGLE_TOKENS.gradient }}
              >
                COMPLETAR MI INFORMACIÓN
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
              <span className="font-body text-[0.78rem] text-[var(--dg-muted)]">
                Tu plazo de entrega arranca en cuanto esté completo.
              </span>
            </motion.div>

            <motion.p {...reveal(0.3)} className={`mt-16 border-t border-[var(--dg-line)] pt-8 ${BODY}`}>
              <MessageCircle className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" style={{ color: ACCENT }} strokeWidth={2.4} />
              <strong className="text-[var(--dg-ink)]">¿Dudas?</strong> Contéstanos por el mismo WhatsApp donde confirmaste tu pago
              {WHATSAPP_DISPLAY ? ` (${WHATSAPP_DISPLAY})` : ""} — no hace falta abrir otro canal.
            </motion.p>
          </div>
        </section>
      </main>
    </>
  );
}
