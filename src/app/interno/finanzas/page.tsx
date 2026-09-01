import { cookies } from "next/headers";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import FinanzasDashboard, {
  type Movimiento,
  type Proyecto,
  type Servicio,
  type AuditoriaEntry,
} from "@/components/finanzas/FinanzasDashboard";

export default async function FinanzasPage() {
  const cookieStore = await cookies();
  const role = (cookieStore.get("finanzas_session")?.value === "admin" ? "admin" : "viewer") as
    | "admin"
    | "viewer";

  const supabase = getFinanzasSupabase();

  let movimientos: Movimiento[] = [];
  let proyectos: Proyecto[] = [];
  let servicios: Servicio[] = [];
  let auditoria: AuditoriaEntry[] = [];
  let tipoCambio = 16.95;
  const configurado = Boolean(supabase);

  if (supabase) {
    const [{ data: movs }, { data: cfg }, { data: proys }, { data: servs }, auditRes] = await Promise.all([
      supabase.from("finanzas_movimientos").select("*").order("orden", { ascending: true }),
      supabase.from("finanzas_config").select("*").eq("id", 1).maybeSingle(),
      supabase.from("finanzas_proyectos").select("*").order("orden", { ascending: true }),
      supabase.from("finanzas_servicios").select("*").order("created_at", { ascending: true }),
      role === "admin"
        ? supabase.from("finanzas_auditoria").select("*").order("momento", { ascending: false }).limit(200)
        : Promise.resolve({ data: [] as AuditoriaEntry[] }),
    ]);
    movimientos = (movs as Movimiento[]) || [];
    proyectos = (proys as Proyecto[]) || [];
    servicios = (servs as Servicio[]) || [];
    auditoria = (auditRes.data as AuditoriaEntry[]) || [];
    if (cfg?.tipo_cambio) tipoCambio = cfg.tipo_cambio;
  }

  return (
    <FinanzasDashboard
      role={role}
      initialMovimientos={movimientos}
      initialProyectos={proyectos}
      initialServicios={servicios}
      initialAuditoria={auditoria}
      initialTipoCambio={tipoCambio}
      configurado={configurado}
    />
  );
}
