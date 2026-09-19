"use client";

// ── RankingDemo — identidad visual cinematográfica de Domina Google ─────────
// Referencia visual a "buscar en Google / aparecer en Maps" SIN usar el
// wordmark ni el logo real de Google (evita cualquier tema de marca): barra
// de búsqueda estilizada, pin de mapa genérico, tarjetas de resultado que
// suben de posición con glow. Se usa en el Hero y en "La prueba".

import { motion } from "framer-motion";
import { MapPin, Star, Search } from "lucide-react";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface RankingDemoProps {
  accent: string;
  accentDeep: string;
  query?: string;
  businessLabel?: string;
}

export default function DominaGoogleRankingDemo({
  accent,
  accentDeep,
  query = "servicio + tu ciudad",
  businessLabel = "Tu negocio",
}: RankingDemoProps) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Pin flotante, glow pulsante — motivo recurrente de la página */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -top-8 z-20 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: accent, boxShadow: `0 0 40px 8px ${accent}55` }}
      >
        <MapPin className="h-6 w-6 text-white" strokeWidth={2.5} />
      </motion.div>

      {/* Tarjeta tipo "browser" — barra de búsqueda estilizada */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-xl"
        style={{ background: "rgba(20,33,42,0.72)" }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <Search className="h-3 w-3 shrink-0 text-muted/60" strokeWidth={2.5} />
            <span className="truncate font-body text-[0.72rem] text-muted/70">{query}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          {/* Resultados desvanecidos — "otros negocios" */}
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5 opacity-30">
              <div className="h-8 w-8 shrink-0 rounded-md bg-white/10" />
              <div className="flex-1">
                <div className="h-2 w-24 rounded-full bg-white/20" />
                <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/10" />
              </div>
            </div>
          ))}

          {/* Resultado que sube a la posición #1 — el negocio del cliente */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative flex items-center gap-3 rounded-lg border px-3 py-3"
            style={{ borderColor: accent, background: `${accent}14` }}
          >
            <span
              className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full font-display text-[0.55rem] font-bold text-white"
              style={{ background: accent }}
            >
              1
            </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md" style={{ background: accentDeep }}>
              <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="font-display text-[0.78rem] font-bold text-foreground">{businessLabel}</p>
              <div className="mt-1 flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-2.5 w-2.5" style={{ color: accent, fill: accent }} strokeWidth={0} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <p className="mt-3 text-center font-body text-[0.68rem] text-muted/50">
        Ilustrativo — así se ve la transformación, no un resultado específico.
      </p>
    </div>
  );
}
