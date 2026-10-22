"use client";

// ── HubInterno — el centro del negocio ──────────────────────────────────────
// Alli saluda, muestra lo de hoy y desde aquí se entra a cada módulo.
// Para sumar un módulo nuevo (Finanzas, Newsletter…) solo se agrega una
// entrada en MODULOS; el marco y el acceso ya están resueltos.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, Landmark, Loader2, LogOut, Mail } from "lucide-react";
import { AlliEscena } from "@/components/propuestas/AlliEscena";
import { ZONA_OFICINA } from "@/lib/reuniones/config";
import { ymdEnZona } from "@/lib/reuniones/tz";

interface Resumen {
  persona: string;
  hoy: number;
  porMarcar: number;
  proximas: number;
}

const MODULOS: { id: string; titulo: string; texto: string; href?: string; icono: React.ReactNode; nota?: string }[] = [
  { id: "reuniones", titulo: "Reuniones", texto: "Agenda, nuevas reuniones, productos, horarios y bloqueos.", href: "/interno/reuniones", icono: <CalendarDays className="h-7 w-7" /> },
  { id: "finanzas", titulo: "Finanzas", texto: "Control financiero del negocio.", href: "/interno/finanzas", icono: <Landmark className="h-7 w-7" />, nota: "Por ahora tiene su propio acceso" },
  { id: "newsletter", titulo: "Newsletter", texto: "Correos a clientes y seguimiento.", icono: <Mail className="h-7 w-7" />, nota: "Próximamente" },
];

export default function HubInterno() {
  const router = useRouter();
  const [r, setR] = useState<Resumen | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    fetch("/api/reuniones/admin/datos", { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) return router.replace("/interno/reuniones/acceso?next=/interno");
        const j = await res.json();
        if (!vivo) return;
        if (!j.ok) return setAviso("No pudimos leer la agenda ahora mismo. Los módulos siguen disponibles.");
        const ahora = Date.now();
        const hoyYmd = ymdEnZona(new Date(ahora), ZONA_OFICINA);
        const conf = (j.reuniones as { estado: string; inicio: string; fin: string }[]).filter((x) => x.estado === "confirmada");
        setR({
          persona: j.persona,
          hoy: conf.filter((x) => Date.parse(x.fin) > ahora && ymdEnZona(new Date(x.inicio), ZONA_OFICINA) === hoyYmd).length,
          porMarcar: conf.filter((x) => Date.parse(x.fin) <= ahora).length,
          proximas: conf.filter((x) => Date.parse(x.fin) > ahora).length,
        });
      })
      .catch(() => vivo && setAviso("Sin conexión con el servidor."));
    return () => {
      vivo = false;
    };
  }, [router]);

  async function salir() {
    await fetch("/api/reuniones/admin/auth", { method: "DELETE" });
    router.replace("/interno/reuniones/acceso");
  }

  const saludo = r
    ? r.hoy > 0
      ? `Hola, ${r.persona}. Hoy tienes ${r.hoy} ${r.hoy === 1 ? "reunión pendiente" : "reuniones pendientes"}.${r.porMarcar > 0 ? ` Y ${r.porMarcar} por marcar como realizada o sin asistencia.` : ""}`
      : `Hola, ${r.persona}. Hoy no tienes reuniones pendientes.${r.porMarcar > 0 ? ` Eso sí, ${r.porMarcar} esperan que las marques como realizadas o sin asistencia.` : ""}`
    : "Hola, soy Alli. Aquí está todo el negocio en un solo lugar.";

  return (
    <div className="min-h-svh bg-[var(--color-light)]">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-4 py-4 sm:px-10">
        <span className="font-display text-[0.8rem] font-bold uppercase tracking-[0.3em] text-allitron-navy">Allitron · Interno</span>
        <button type="button" onClick={salir} className="inline-flex min-h-[44px] items-center gap-2 rounded-[14px] border-2 border-[#101820]/15 bg-white px-4 font-display text-[0.85rem] font-bold text-[#101820] hover:border-allitron-blue">
          <LogOut className="h-4 w-4" /> Salir
        </button>
      </div>
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-4 sm:px-10">
        <h1 className="mb-6 font-display text-[2.2rem] font-black leading-[1.08] tracking-tight text-[#101820] sm:text-[3rem]">Centro del negocio</h1>
        <div className="mb-10">
          <AlliEscena escena="plan" mensaje={saludo} prioridad compacta />
        </div>
        {aviso && <p role="status" className="mb-6 rounded-[16px] border-2 border-allitron-orange/50 bg-allitron-orange/10 px-5 py-4 font-body text-[1rem] text-[#101820]">{aviso}</p>}

        {r === null && !aviso ? (
          <div className="flex justify-center py-8 text-secondary" role="status"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : r ? (
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: r.hoy, t: "Hoy" },
              { n: r.proximas, t: "Próximas en total" },
              { n: r.porMarcar, t: "Por marcar", alerta: r.porMarcar > 0 },
            ].map((x) => (
              <div key={x.t} className="neu rounded-[22px] p-5">
                <p className={`font-display text-[2.6rem] font-black leading-none ${x.alerta ? "text-[#B4541B]" : "text-[#101820]"}`}>{x.n}</p>
                <p className="mt-2 font-body text-[1rem] text-secondary">{x.t}</p>
              </div>
            ))}
          </div>
        ) : null}

        <h2 className="mb-4 font-display text-[1.5rem] font-bold text-[#101820]">Módulos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODULOS.map((m) => {
            const dentro = (
              <>
                <span className="flex w-full items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-allitron-blue/10 text-allitron-blue">{m.icono}</span>
                  {m.href && <span className="flex h-10 w-10 items-center justify-center rounded-full bg-allitron-blue/10 text-allitron-blue transition-colors group-hover:bg-allitron-blue group-hover:text-white"><ArrowUpRight size={20} /></span>}
                </span>
                <span className="mt-5 block font-display text-[1.4rem] font-bold text-[#101820]">{m.titulo}</span>
                <span className="mt-1 block font-body text-[1rem] leading-[1.6] text-secondary">{m.texto}</span>
                {m.nota && <span className="mt-3 inline-block rounded-full bg-[#101820]/[0.07] px-3 py-1 font-body text-[0.85rem] font-semibold text-secondary">{m.nota}</span>}
              </>
            );
            return m.href ? (
              <Link key={m.id} href={m.href} className="neu neu-hover group flex min-h-[200px] flex-col rounded-[26px] p-6 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange">{dentro}</Link>
            ) : (
              <div key={m.id} className="flex min-h-[200px] flex-col rounded-[26px] border-2 border-dashed border-[#101820]/15 p-6 opacity-80">{dentro}</div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
