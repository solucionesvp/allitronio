import { cookies } from "next/headers";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import FinanzasDashboard, {
  type Movimiento,
  type Proyecto,
  type Servicio,
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
  let tipoCambio = 16.95;
  const configurado = Boolean(supabase);

  if (supabase) {
    const [{ data: movs }, { data: cfg }, { data: proys }, { data: servs }] = await Promise.all([
      supabase.from("finanzas_movimientos").select("*").order("orden", { ascending: true }),
      supabase.from("finanzas_config").select("*").eq("id", 1).maybeSingle(),
      supabase.from("finanzas_proyectos").select("*").order("orden", { ascending: true }),
      supabase.from("finanzas_servicios").select("*").order("created_at", { ascending: true }),
    ]);
    movimientos = (movs as Movimiento[]) || [];
    proyectos = (proys as Proyecto[]) || [];
    servicios = (servs as Servicio[]) || [];
    if (cfg?.tipo_cambio) tipoCambio = cfg.tipo_cambio;
  }

  return (
    <FinanzasDashboard
      role={role}
      initialMovimientos={movimientos}
      initialProyectos={proyectos}
      initialServicios={servicios}
      initialTipoCambio={tipoCambio}
      configurado={configurado}
    />
  );
}
