import type { SupabaseClient } from "@supabase/supabase-js";

// Límites por IP guardados en Supabase (en serverless cada invocación puede
// correr en una instancia distinta: la memoria del proceso no sirve).

export async function intentosRecientes(
  db: SupabaseClient,
  ip: string,
  tipo: "reserva" | "login_fallido",
  ventanaMin: number
): Promise<number> {
  const desde = new Date(Date.now() - ventanaMin * 60_000).toISOString();
  const { count } = await db
    .from("reuniones_intentos")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("tipo", tipo)
    .gt("creado_en", desde);
  return count ?? 0;
}

export async function registrarIntento(db: SupabaseClient, ip: string, tipo: "reserva" | "login_fallido") {
  await db.from("reuniones_intentos").insert({ ip, tipo });
}

export async function limpiarIntentos(db: SupabaseClient, ip: string, tipo: "login_fallido") {
  await db.from("reuniones_intentos").delete().eq("ip", ip).eq("tipo", tipo);
}
