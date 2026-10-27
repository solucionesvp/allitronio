"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Loader2 } from "lucide-react";

export default function AccesoForm() {
  const router = useRouter();
  const params = useSearchParams();
  const destino = params.get("next");
  // Solo destinos cubiertos por esta sesión firmada: el inicio interno, Reuniones y Cobros.
  const permitido = destino === "/interno" || ((destino?.startsWith("/interno/reuniones") || destino?.startsWith("/interno/cobros")) && !destino.startsWith("//"));
  const next = permitido && destino ? destino : "/interno";

  const [code, setCode] = useState("");
  const [estado, setEstado] = useState<"idle" | "cargando" | "error" | "bloqueado" | "sin_config">("idle");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("cargando");
    try {
      const res = await fetch("/api/reuniones/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
      } else if (res.status === 429) setEstado("bloqueado");
      else if (res.status === 503) setEstado("sin_config");
      else setEstado("error");
    } catch {
      setEstado("error");
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-[var(--color-light)] px-5">
      <form onSubmit={enviar} className="neu w-full max-w-[440px] rounded-[28px] px-8 py-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[18px] bg-allitron-blue/10"><CalendarDays size={26} className="text-allitron-blue" /></div>
        <h1 className="font-display text-[1.8rem] font-black leading-tight text-[#101820]">Acceso interno</h1>
        <p className="mt-2 font-body text-[1rem] leading-[1.65] text-secondary">Solo para el equipo de Allitron.</p>
        <label htmlFor="code" className="sr-only">Código de acceso</label>
        <input id="code" type="password" autoComplete="current-password" autoFocus required value={code} onChange={(e) => setCode(e.target.value)} placeholder="Tu código de acceso" className="mt-7 min-h-[56px] w-full rounded-[16px] border-2 border-[#101820]/10 bg-white px-4 text-center font-body text-[1.1rem] text-[#101820] outline-none focus:border-allitron-blue focus-visible:ring-4 focus-visible:ring-allitron-blue/20" />
        <button disabled={estado === "cargando" || estado === "bloqueado" || code.length < 4} className="mt-4 inline-flex min-h-[60px] w-full items-center justify-center gap-2 rounded-[18px] bg-allitron-blue px-4 font-display text-[1.05rem] font-bold text-white shadow-[0_12px_28px_rgba(9,175,242,0.32)] disabled:opacity-40 disabled:shadow-none">
          {estado === "cargando" && <Loader2 className="h-5 w-5 animate-spin" />} Entrar
        </button>
        <p role="alert" className="mt-4 min-h-6 font-body text-[0.95rem] font-semibold text-[#B4541B]">
          {estado === "error" && "Código incorrecto."}
          {estado === "bloqueado" && "Demasiados intentos. Espera 15 minutos."}
          {estado === "sin_config" && "El acceso aún no está configurado en este entorno."}
        </p>
      </form>
    </main>
  );
}
