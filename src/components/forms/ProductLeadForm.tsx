"use client";

// ── ProductLeadForm — captura de interés en una landing de producto ─────────
// Compacto, una sola pantalla (no es el flujo Typeform del Hub). Reutilizable
// entre landings de producto — solo cambia `product` y `accent`.

import { useState, type CSSProperties } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { submitProductLead, type ProductLeadData } from "@/lib/submitProductLead";

interface ProductLeadFormProps {
  product: string;
  accent: string;
}

export default function ProductLeadForm({ product, accent }: ProductLeadFormProps) {
  const [form, setForm] = useState<ProductLeadData>({ nombre: "", empresa: "", contacto: "", mensaje: "" });
  const [status, setStatus] = useState<"editing" | "done">("editing");
  const [copied, setCopied] = useState(false);

  const accentVar = { ["--accent" as string]: accent } as CSSProperties;
  const canSubmit = form.nombre.trim() && form.contacto.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const { mailtoUrl } = submitProductLead(product, form);
    window.location.href = mailtoUrl;
    setStatus("done");
  };

  const copyFallback = async () => {
    const { body } = submitProductLead(product, form);
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full border-b border-white/15 bg-transparent py-3 font-body text-[0.92rem] text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-[var(--accent)]";

  if (status === "done") {
    return (
      <div style={accentVar} className="flex flex-col items-center gap-5 py-4 text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: `${accent}22` }}
        >
          <Check className="h-5 w-5" style={{ color: accent }} strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-[1.15rem] font-black text-foreground">
          Listo, {form.nombre}.
        </h3>
        <p className="max-w-sm font-body text-[0.85rem] leading-[1.75] text-muted">
          Se abrió tu cliente de correo con tu solicitud. Si no se abrió, copia el
          mensaje y envíalo a <span className="text-foreground">auroraialazaro@gmail.com</span>.
        </p>
        <button
          onClick={copyFallback}
          className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-display text-[0.58rem] font-bold tracking-[0.18em] text-muted transition-colors hover:border-white/30 hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "COPIADO" : "COPIAR MENSAJE"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={accentVar} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <input
          type="text"
          required
          value={form.nombre}
          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          placeholder="Nombre"
          className={inputClass}
        />
        <input
          type="text"
          value={form.empresa}
          onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
          placeholder="Empresa (opcional)"
          className={inputClass}
        />
      </div>
      <input
        type="text"
        required
        value={form.contacto}
        onChange={(e) => setForm((f) => ({ ...f, contacto: e.target.value }))}
        placeholder="Email o WhatsApp"
        className={inputClass}
      />
      <textarea
        rows={3}
        value={form.mensaje}
        onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
        placeholder="Cuéntanos de tu negocio (opcional)"
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display text-[0.64rem] font-bold tracking-[0.22em] text-allitron-base transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        style={{ background: accent }}
      >
        ENVIAR SOLICITUD
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
