import type { SupabaseClient } from "@supabase/supabase-js";

// ── Bitácora de auditoría del módulo financiero ─────────────────────────────
// Registra quién hizo qué. No debe romper la operación principal si falla
// (por eso el error se traga y solo se loguea a consola) — es un registro
// de apoyo, no la fuente de verdad de los datos.

type Accion = "crear" | "editar" | "eliminar" | "archivar" | "cambiar_fx";
type Entidad = "movimiento" | "proyecto" | "servicio" | "config";

export async function registrarAuditoria(
  supabase: SupabaseClient,
  params: {
    persona: string;
    accion: Accion;
    entidad: Entidad;
    entidad_id?: string;
    detalle?: string;
    ip?: string;
  }
) {
  try {
    await supabase.from("finanzas_auditoria").insert({
      persona: params.persona,
      accion: params.accion,
      entidad: params.entidad,
      entidad_id: params.entidad_id || null,
      detalle: params.detalle || "",
      ip: params.ip || "",
    });
  } catch (err) {
    console.error("[finanzas_auditoria] no se pudo registrar:", err);
  }
}
