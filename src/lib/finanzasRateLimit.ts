import type { SupabaseClient } from "@supabase/supabase-js";

// ── Rate limiting del login de /interno/finanzas ────────────────────────────
// Bloquea por IP tras varios códigos incorrectos seguidos. Vive en Supabase
// (no en memoria del proceso) porque en un entorno serverless cada invocación
// puede correr en una instancia distinta — una tabla es lo único confiable.

const MAX_INTENTOS = 5;
const VENTANA_MINUTOS = 15;
const BLOQUEO_MINUTOS = 15;

export async function checkRateLimit(
  supabase: SupabaseClient,
  ip: string
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  const { data } = await supabase.from("finanzas_intentos_login").select("*").eq("ip", ip).maybeSingle();
  if (!data) return { allowed: true };

  if (data.bloqueado_hasta && new Date(data.bloqueado_hasta) > new Date()) {
    const retryAfterSeconds = Math.ceil((new Date(data.bloqueado_hasta).getTime() - Date.now()) / 1000);
    return { allowed: false, retryAfterSeconds };
  }
  return { allowed: true };
}

export async function registerFailedAttempt(supabase: SupabaseClient, ip: string) {
  const { data } = await supabase.from("finanzas_intentos_login").select("*").eq("ip", ip).maybeSingle();

  const ahora = new Date();
  const ventanaExpirada =
    data?.ultimo_intento && Date.now() - new Date(data.ultimo_intento).getTime() > VENTANA_MINUTOS * 60 * 1000;

  const intentosPrevios = ventanaExpirada ? 0 : data?.intentos_fallidos || 0;
  const nuevosIntentos = intentosPrevios + 1;
  const bloqueado_hasta =
    nuevosIntentos >= MAX_INTENTOS ? new Date(ahora.getTime() + BLOQUEO_MINUTOS * 60 * 1000).toISOString() : null;

  await supabase.from("finanzas_intentos_login").upsert({
    ip,
    intentos_fallidos: nuevosIntentos,
    ultimo_intento: ahora.toISOString(),
    bloqueado_hasta,
  });
}

export async function resetAttempts(supabase: SupabaseClient, ip: string) {
  await supabase.from("finanzas_intentos_login").delete().eq("ip", ip);
}
