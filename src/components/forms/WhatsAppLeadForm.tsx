"use client";

// ── WhatsAppLeadForm — captura 3 datos antes de saltar a WhatsApp ───────────
// A diferencia de ProductLeadForm (que manda un correo), este formulario no
// "envía" nada por sí mismo: arma el mensaje de WhatsApp con los datos del
// negocio ya adentro y abre el chat directo. Menos fricción para Lups del
// lado de recibir (llega con contexto, no un "hola" en blanco) y el
// prospecto sigue terminando en WhatsApp, que es donde de verdad se cierra.
//
// Reutilizable entre landings de producto — solo cambia `accent`, `buildLink`
// y `baseMessage`.

import { useState, type CSSProperties, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { trackMetaEvent } from "@/lib/metaPixel";

interface WhatsAppLeadFormProps {
  accent: string;
  /** ej. buildWhatsAppLink de dominaGoogleLaunchContent.ts */
  buildLink: (message: string) => string;
  /** Mensaje base que ya usa el CTA plano — se le antepone el contexto del negocio. */
  baseMessage: string;
}

export default function WhatsAppLeadForm({ accent, buildLink, baseMessage }: WhatsAppLeadFormProps) {
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [ciudad, setCiudad] = useState("");

  const accentVar = { ["--accent" as string]: accent } as CSSProperties;
  const canSubmit = nombre.trim() && negocio.trim() && ciudad.trim();

  const inputClass =
    "w-full rounded-sm border-b border-white/15 bg-transparent py-3 font-body text-[0.92rem] text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-[var(--accent)]";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const message = `Soy ${nombre.trim()}, tengo ${negocio.trim()} en ${ciudad.trim()}. ${baseMessage}`;
    trackMetaEvent("Lead");
    window.open(buildLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} style={accentVar} className="flex flex-col gap-6">
      <p className="font-body text-[0.82rem] leading-[1.7] text-muted">
        Llega directo con tu contexto — sin escribir todo desde cero en WhatsApp.
      </p>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className={inputClass}
        />
        <input
          type="text"
          required
          value={negocio}
          onChange={(e) => setNegocio(e.target.value)}
          placeholder="Nombre de tu negocio"
          className={inputClass}
        />
        <input
          type="text"
          required
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Ciudad (Tepic, Vallarta, Mazatlán...)"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 font-display text-[0.64rem] font-bold tracking-[0.22em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        style={{ background: accent }}
      >
        CONTINUAR A WHATSAPP
        <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
