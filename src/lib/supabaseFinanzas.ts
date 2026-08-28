import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ── Cliente de Supabase para el módulo financiero interno ──────────────────
// Solo se usa del lado del servidor (API routes) con la service role key —
// nunca se expone al navegador. Si las variables no están configuradas en
// este entorno (todavía no se creó el proyecto de Supabase / no se cargaron
// en Vercel), devuelve null y cada API route responde "not_configured" en
// vez de tronar — mismo principio de "falla cerrado" que /api/entregas/auth.

let client: SupabaseClient | null | undefined;

export function getFinanzasSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.FINANZAS_SUPABASE_URL;
  const key = process.env.FINANZAS_SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    client = null;
    return null;
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });
  return client;
}
