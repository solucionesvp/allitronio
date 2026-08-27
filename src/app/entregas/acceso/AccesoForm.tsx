"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function AccesoForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";
  const scope = params.get("scope") || "";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/entregas/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, scope }),
      });
      if (res.ok) {
        // Confirmación visible antes de navegar — que quede claro que el
        // código se verificó de verdad, no que la página solo "brincó".
        setStatus("success");
        setTimeout(() => {
          router.push(next);
          router.refresh();
        }, 700);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const busy = status === "loading" || status === "success";

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-allitron-base px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(9,175,242,0.10) 0%, transparent 60%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="glass-strong relative z-10 w-full max-w-[400px] rounded-[28px] px-8 py-10 text-center"
      >
        <OptionalImage
          src={BRAND_LOGO.light}
          alt="Allitron"
          style={{ height: 22, width: "auto", margin: "0 auto 24px" }}
          fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>}
        />

        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06]">
          <Lock size={20} className="text-allitron-blue" />
        </div>

        <h1 className="font-display text-[1.2rem] font-bold text-foreground">
          Entrega privada y protegida
        </h1>
        <p className="mt-2 font-body text-[0.88rem] leading-[1.65] text-muted">
          Este contenido no es público. Nadie puede entrar sin el código que
          te compartimos — sin él, esta página no se abre para nadie más.
        </p>

        {/* ── Señal de seguridad ─────────────────────────────────────── */}
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-white/[0.05] px-4 py-2">
          <ShieldCheck size={15} className="shrink-0 text-allitron-blue" />
          <span className="font-body text-[0.74rem] leading-[1.4] text-muted">
            Acceso restringido y verificado en el servidor
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
          <input
            type="password"
            inputMode="text"
            autoFocus
            disabled={busy}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Código de acceso"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-body text-[0.95rem] tracking-[0.15em] text-foreground outline-none placeholder:text-muted focus:border-allitron-blue disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || code.length === 0}
            className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-allitron-blue px-4 py-3 font-display text-[0.82rem] font-bold tracking-[0.08em] text-allitron-base transition-opacity disabled:opacity-60"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "loading" && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 size={15} className="animate-spin" />
                  Verificando de forma segura…
                </motion.span>
              )}
              {status === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 size={15} />
                  Acceso concedido
                </motion.span>
              )}
              {status !== "loading" && status !== "success" && (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Entrar
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>

        {status === "error" && (
          <p className="mt-4 font-body text-[0.8rem] text-allitron-orange">
            Código incorrecto. Verifica con quien te lo compartió.
          </p>
        )}

        <p className="mt-6 font-body text-[0.72rem] leading-[1.5] text-muted/70">
          Tu acceso queda guardado de forma segura solo en este dispositivo —
          no se comparte con nadie más ni se hace público en ningún lugar.
        </p>
      </motion.div>
    </main>
  );
}
