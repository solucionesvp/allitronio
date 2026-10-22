"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, Circle, Loader2, RefreshCw } from "lucide-react";
import InternoShell from "@/components/interno/InternoShell";
import { Aviso, P, type DatosPanel } from "./comun";
import TabAgenda from "./TabAgenda";
import TabBloqueos from "./TabBloqueos";
import TabCatalogo from "./TabCatalogo";
import TabNueva from "./TabNueva";

type Tab = "agenda" | "nueva" | "catalogo" | "bloqueos";

export default function PanelReuniones() {
  const router = useRouter();
  const [datos, setDatos] = useState<DatosPanel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("agenda");
  const [cargando, setCargando] = useState(false);
  const [ahora, setAhora] = useState(0);

  const recargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/reuniones/admin/datos", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/interno/reuniones/acceso");
        return;
      }
      const j = await res.json();
      if (!j.ok) {
        setError(j.error === "not_configured" ? "Falta configurar Supabase en este entorno (REUNIONES_SUPABASE_URL y REUNIONES_SUPABASE_SERVICE_KEY)." : `No se pudieron cargar los datos${j.detalle ? `: ${j.detalle}` : "."}`);
        return;
      }
      setError(null);
      setDatos(j);
      setAhora(Date.now());
    } catch {
      setError("Sin conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  }, [router]);

  useEffect(() => {
    let vivo = true;
    (async () => {
      if (vivo) await recargar();
    })();
    return () => {
      vivo = false;
    };
  }, [recargar]);

  useEffect(() => {
    const alVencer = () => router.replace("/interno/reuniones/acceso");
    window.addEventListener("reuniones:sesion-vencida", alVencer);
    return () => window.removeEventListener("reuniones:sesion-vencida", alVencer);
  }, [router]);

  async function salir() {
    await fetch("/api/reuniones/admin/auth", { method: "DELETE" });
    router.replace("/interno/reuniones/acceso");
  }

  if (error) {
    return (
      <InternoShell titulo="Reuniones" icono={<CalendarDays className="h-6 w-6" />}>
        <Aviso tipo="error">{error}</Aviso>
        <button className={`${P.btnGhost} mt-4`} onClick={recargar}>Reintentar</button>
      </InternoShell>
    );
  }
  if (!datos) {
    return <main className="flex min-h-svh items-center justify-center bg-[var(--color-light)] text-secondary"><Loader2 className="h-7 w-7 animate-spin" /></main>;
  }

  // Lista de puesta en marcha: qué falta para que la agenda pública funcione.
  const anfActivos = datos.anfitriones.filter((a) => a.activo);
  const items = [
    { ok: datos.entorno.resend && datos.entorno.remitente, t: "Correo configurado (Resend y remitente)", ayuda: "Faltan RESEND_API_KEY y/o REUNIONES_FROM_EMAIL en Vercel." },
    { ok: anfActivos.length > 0, t: "Al menos un anfitrión activo con correo y horario", ayuda: "Pestaña Catálogo → Equipo y horarios." },
    { ok: anfActivos.some((a) => a.enlace_video), t: "Enlace de videollamada en al menos un anfitrión", ayuda: "Sin enlace no se ofrece videollamada." },
    { ok: datos.productos.some((p) => p.activo && datos.enlaces.some((e) => e.producto_id === p.id)), t: "Al menos un producto activo con anfitrión asignado", ayuda: "Pestaña Catálogo → Productos." },
  ];
  const listo = items.every((i) => i.ok);
  const porMarcar = datos.reuniones.filter((r) => r.estado === "confirmada" && Date.parse(r.fin) <= ahora).length;

  const tabs: { id: Tab; t: string }[] = [
    { id: "agenda", t: "Agenda" },
    { id: "nueva", t: "Nueva reunión" },
    { id: "catalogo", t: "Catálogo" },
    { id: "bloqueos", t: "Bloqueos" },
  ];

  return (
    <InternoShell
      titulo="Reuniones"
      icono={<CalendarDays className="h-6 w-6" />}
      persona={datos.persona}
      onSalir={salir}
      acciones={<button className={P.btnGhost} onClick={recargar} aria-label="Actualizar"><RefreshCw className={`h-4 w-4 ${cargando ? "animate-spin" : ""}`} /> Actualizar</button>}
    >
      {!listo ? (
        <section className={`${P.card} mb-8`} aria-label="Puesta en marcha">
          <h2 className={P.h2}>Para abrir la agenda al público falta</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((i) => (
              <li key={i.t} className="flex items-start gap-3 font-body text-[1rem]">
                {i.ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-allitron-blue" /> : <Circle className="mt-0.5 h-5 w-5 shrink-0 text-allitron-orange" />}
                <span className={i.ok ? "text-secondary line-through" : "font-semibold text-[#101820]"}>{i.t}{!i.ok && <span className="block text-[0.9rem] font-normal text-secondary">{i.ayuda}</span>}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="mb-8 flex items-center gap-2 font-body text-[0.95rem] text-secondary"><CheckCircle2 className="h-5 w-5 text-allitron-blue" /> Agenda pública lista y recibiendo reservas.</p>
      )}

      <nav className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Secciones">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`min-h-[48px] rounded-[14px] border-2 px-5 py-2.5 font-display text-[0.95rem] font-bold transition-colors ${tab === t.id ? "border-allitron-blue bg-allitron-blue text-white shadow-[0_8px_20px_rgba(9,175,242,0.28)]" : "border-[#101820]/12 bg-white text-[#101820] hover:border-allitron-blue"}`}>
            {t.t}
            {t.id === "agenda" && porMarcar > 0 && <span className="ml-2 rounded-full bg-allitron-orange px-2 py-0.5 text-[0.75rem] text-white">{porMarcar}</span>}
          </button>
        ))}
      </nav>

      {tab === "agenda" && <TabAgenda datos={datos} ahora={ahora} recargar={recargar} />}
      {tab === "nueva" && <TabNueva datos={datos} recargar={recargar} />}
      {tab === "catalogo" && <TabCatalogo datos={datos} recargar={recargar} />}
      {tab === "bloqueos" && <TabBloqueos datos={datos} recargar={recargar} />}
    </InternoShell>
  );
}
