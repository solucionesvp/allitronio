"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, Wallet } from "lucide-react";
import InternoShell from "@/components/interno/InternoShell";
import type { CobroCompleto } from "@/lib/cobros/types";
import AjustesCobros from "./AjustesCobros";
import { Aviso, P, type DatosCobros } from "./comun";
import DetalleCobro from "./DetalleCobro";
import FormularioCobro from "./FormularioCobro";
import ListaCobros from "./ListaCobros";

type Vista = { t: "lista" } | { t: "detalle"; id: string } | { t: "form"; inicial: CobroCompleto | null; agregar?: boolean } | { t: "ajustes" };

export default function PanelCobros({ inicialId = null, inicialNuevo = false }: { inicialId?: string | null; inicialNuevo?: boolean }) {
  const router = useRouter();
  const [datos, setDatos] = useState<DatosCobros | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [vista, setVista] = useState<Vista>(() => (inicialId ? { t: "detalle", id: inicialId } : inicialNuevo ? { t: "form", inicial: null } : { t: "lista" }));
  const [cargando, setCargando] = useState(false);

  const recargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/cobros/admin/datos", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/interno/reuniones/acceso?next=/interno/cobros");
        return;
      }
      const j = await res.json();
      if (!j.ok) {
        setError(
          j.error === "not_configured"
            ? "Falta configurar Supabase en este entorno (REUNIONES_SUPABASE_URL y REUNIONES_SUPABASE_SERVICE_KEY)."
            : j.error === "sin_esquema"
              ? "Faltan las tablas de cobros. Corre supabase/cobros-schema.sql en el SQL Editor del proyecto de reuniones (guía: docs/COBROS.md)."
              : `No se pudieron cargar los datos${j.detalle ? `: ${j.detalle}` : "."}`
        );
        return;
      }
      setError(null);
      setDatos(j);
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
    const alVencer = () => router.replace("/interno/reuniones/acceso?next=/interno/cobros");
    window.addEventListener("reuniones:sesion-vencida", alVencer);
    return () => window.removeEventListener("reuniones:sesion-vencida", alVencer);
  }, [router]);

  async function salir() {
    await fetch("/api/reuniones/admin/auth", { method: "DELETE" });
    router.replace("/interno/reuniones/acceso");
  }

  if (error) {
    return (
      <InternoShell titulo="Cobros" icono={<Wallet className="h-6 w-6" />}>
        <Aviso tipo="error">{error}</Aviso>
        <button className={`${P.btnGhost} mt-4`} onClick={recargar}>Reintentar</button>
      </InternoShell>
    );
  }
  if (!datos) {
    return <main className="flex min-h-svh items-center justify-center bg-[var(--color-light)] text-secondary"><Loader2 className="h-7 w-7 animate-spin" /></main>;
  }

  const tabActiva = vista.t === "ajustes" ? "ajustes" : vista.t === "form" && !vista.inicial ? "nuevo" : "cobros";
  const tabs = [
    { id: "cobros", t: "Cobros", ir: () => setVista({ t: "lista" }) },
    { id: "nuevo", t: "Nuevo cobro", ir: () => setVista({ t: "form", inicial: null }) },
    { id: "ajustes", t: "Ajustes", ir: () => setVista({ t: "ajustes" }) },
  ];

  return (
    <InternoShell
      titulo="Cobros"
      icono={<Wallet className="h-6 w-6" />}
      persona={datos.persona}
      onSalir={salir}
      ancho={1040}
      acciones={<button className={P.btnGhost} onClick={recargar} aria-label="Actualizar"><RefreshCw className={`h-4 w-4 ${cargando ? "animate-spin" : ""}`} /> Actualizar</button>}
    >
      <nav className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Secciones">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tabActiva === t.id} onClick={t.ir} className={`min-h-[48px] rounded-[14px] border-2 px-5 py-2.5 font-display text-[0.95rem] font-bold transition-colors ${tabActiva === t.id ? "border-allitron-blue bg-allitron-blue text-white shadow-[0_8px_20px_rgba(9,175,242,0.28)]" : "border-[#101820]/12 bg-white text-[#101820] hover:border-allitron-blue"}`}>
            {t.t}
          </button>
        ))}
      </nav>

      {vista.t === "lista" && <ListaCobros datos={datos} abrir={(id) => setVista({ t: "detalle", id })} nuevo={() => setVista({ t: "form", inicial: null })} />}
      {vista.t === "detalle" && (
        <DetalleCobro
          key={vista.id}
          id={vista.id}
          recargar={recargar}
          editar={(c, agregar) => setVista({ t: "form", inicial: c, agregar })}
          abrir={(id) => setVista({ t: "detalle", id })}
          volver={() => setVista({ t: "lista" })}
        />
      )}
      {vista.t === "form" && (
        <FormularioCobro
          key={vista.inicial?.id ?? "nuevo"}
          datos={datos}
          inicial={vista.inicial}
          agregar={vista.agregar}
          alTerminar={async (id) => {
            await recargar();
            setVista({ t: "detalle", id });
          }}
          alCancelar={() => setVista(vista.inicial ? { t: "detalle", id: vista.inicial.id } : { t: "lista" })}
        />
      )}
      {vista.t === "ajustes" && <AjustesCobros datos={datos} recargar={recargar} />}
    </InternoShell>
  );
}
