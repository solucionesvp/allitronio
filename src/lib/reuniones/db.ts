import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Cliente de Supabase del sistema de reuniones. Solo servidor, con la service
// role key (nunca llega al navegador). Si faltan variables devuelve null y las
// rutas responden "not_configured" — mismo principio de falla cerrada que el resto.

let client: SupabaseClient | null | undefined;

export function getReunionesDb(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.REUNIONES_SUPABASE_URL;
  const key = process.env.REUNIONES_SUPABASE_SERVICE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}
