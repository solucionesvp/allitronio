import { cookies } from "next/headers";
import { getFinanzasSupabase } from "@/lib/supabaseFinanzas";
import FinanzasDashboard, { type Movimiento } from "@/components/finanzas/FinanzasDashboard";

export default async function FinanzasPage() {
  const cookieStore = await cookies();
  const role = (cookieStore.get("finanzas_session")?.value === "admin" ? "admin" : "viewer") as
    | "admin"
    | "viewer";

  const supabase = getFinanzasSupabase();

  let movimientos: Movimiento[] = [];
  let tipoCambio = 16.95;
  const configurado = Boolean(supabase);

  if (supabase) {
    const [{ data: movs }, { data: cfg }] = await Promise.all([
      supabase.from("finanzas_movimientos").select("*").order("orden", { ascending: true }),
      supabase.from("finanzas_config").select("*").eq("id", 1).maybeSingle(),
    ]);
    movimientos = (movs as Movimiento[]) || [];
    if (cfg?.tipo_cambio) tipoCambio = cfg.tipo_cambio;
  }

  return (
    <FinanzasDashboard
      role={role}
      initialMovimientos={movimientos}
      initialTipoCambio={tipoCambio}
      configurado={configurado}
    />
  );
}
