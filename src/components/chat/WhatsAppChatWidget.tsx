"use client";

// ── WhatsAppChatWidget — chat flotante de Alli que manda a WhatsApp ─────────
// No es un chat en vivo: el usuario escribe, y al enviar se abre WhatsApp con
// su mensaje ya escrito, la palabra clave de la página y el origen.
// Solo se monta en páginas que no son landing (ver ChatWidgetGate).

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, X } from "lucide-react";
import { BRAND_ALLI } from "@/config/assets";
import { contextFromPath, waLink } from "@/config/contact";

const ACCENT = "#09AFF2";
const TEASER_KEY = "allitron-chat-teaser-dismissed";

function AlliFace({ size }: { size: number }) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size, background: "linear-gradient(160deg, #1B3A5C, #0B1626)" }}
    >
      <Image
        src={BRAND_ALLI.primary}
        alt=""
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
        style={{ objectPosition: "50% 22%", transform: "scale(1.25)", transformOrigin: "50% 30%" }}
      />
    </span>
  );
}

export default function WhatsAppChatWidget() {
  const pathname = usePathname() || "/";
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [teaser, setTeaser] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Globo "¿En qué te ayudo?" tras unos segundos, una vez por sesión.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {
      /* sin almacenamiento: se muestra igual */
    }
    if (dismissed) return;
    const t = setTimeout(() => setTeaser(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      /* ignorar */
    }
  };

  const openChat = () => {
    setOpen(true);
    dismissTeaser();
  };

  const send = () => {
    const msg = text.trim();
    if (!msg) return;
    const { keyword, label } = contextFromPath(pathname);
    window.open(waLink(keyword, msg, `chat de Alli · ${label}`), "_blank", "noopener,noreferrer");
    setText("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat con Alli"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="flex w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-white/10 bg-allitron-base shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(90deg, #0E2A47, #123A63)" }}>
              <div className="relative">
                <AlliFace size={40} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0E2A47] bg-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-display text-[0.8rem] font-bold text-white">Alli</p>
                <p className="font-body text-[0.68rem] text-white/70">Te respondemos por WhatsApp</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat" className="rounded p-1 text-white/70 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 bg-[#0B1626] px-4 py-5">
              <div className="flex items-end gap-2">
                <AlliFace size={28} />
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.08] px-4 py-3 font-body text-[0.85rem] leading-snug text-foreground">
                  ¡Hola! Soy Alli. ¿En qué te ayudo?
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2 border-t border-white/10 bg-allitron-base px-3 py-3"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Escribe tu mensaje…"
                aria-label="Tu mensaje"
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 font-body text-[0.85rem] text-foreground outline-none placeholder:text-muted/50 focus:border-[var(--chat-accent)]"
                style={{ ["--chat-accent" as string]: ACCENT }}
              />
              <button
                type="submit"
                disabled={!text.trim()}
                aria-label="Enviar por WhatsApp"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-allitron-base transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                style={{ background: ACCENT }}
              >
                <Send className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </form>
            <p className="bg-allitron-base px-4 pb-3 font-body text-[0.62rem] text-muted/70">
              Al enviar se abre WhatsApp con tu mensaje.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && teaser && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 pr-8 font-body text-[0.8rem] font-medium leading-snug text-[#0B1626] shadow-xl"
        >
          <button type="button" onClick={dismissTeaser} aria-label="Cerrar aviso" className="absolute right-2 top-2 text-[#0B1626]/50 hover:text-[#0B1626]">
            <X className="h-3.5 w-3.5" />
          </button>
          ¿En qué te ayudo?
        </motion.div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Cerrar chat con Alli" : "Abrir chat con Alli"}
        aria-expanded={open}
        className="relative rounded-full shadow-2xl ring-2 ring-white/15 transition-transform hover:scale-105"
      >
        <AlliFace size={60} />
        <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0B1626] bg-emerald-400" />
      </button>
    </div>
  );
}
