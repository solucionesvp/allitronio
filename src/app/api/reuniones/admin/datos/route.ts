import { NextRequest } from "next/server";
import { personaAdmin } from "@/lib/reuniones/admin";
import { getReunionesDb } from "@/lib/reuniones/db";
import { correoConfigurado } from "@/lib/reuniones/enviar";
import { cargarOficina } from "@/lib/reuniones/service";
import { json, NO_CONFIG } from "../../_http";

// GET: todo lo que necesita el panel en una sola llamada. Solo sesión válida.
export async function GET(req: NextRequest) {
  const persona = await personaAdmin(req);
  if (!persona) return json({ ok: false, error: "unauthorized" }, 401);
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  const desde = new Date(Date.now() - 30 * 86_400_000).toISOString();
  const [reuniones, productos, anfitriones, enlaces, reglas, bloqueos, fallos, oficina] = await Promise.all([
    db.from("reuniones").select("*").gte("inicio", desde).order("inicio", { ascending: true }).limit(1000),
    db.from("productos_reunion").select("*").order("orden"),
    db.from("anfitriones").select("*").order("nombre"),
    db.from("producto_anfitriones").select("*"),
    db.from("disponibilidad_semanal").select("*").order("dia_semana").order("hora_inicio"),
    db.from("bloqueos").select("*").gte("fin", new Date().toISOString()).order("inicio"),
    db
      .from("email_log")
      .select("reunion_id, tipo, creado_en")
      .eq("estado", "error")
      .gte("creado_en", desde)
      .not("reunion_id", "is", null),
    cargarOficina(db),
  ]);

  const err = [reuniones, productos, anfitriones, enlaces, reglas, bloqueos].find((r) => r.error);
  if (err?.error) return json({ ok: false, error: "db_error", detalle: err.error.message }, 500);

  return json({
    ok: true,
    persona,
    reuniones: reuniones.data ?? [],
    productos: productos.data ?? [],
    anfitriones: anfitriones.data ?? [],
    enlaces: enlaces.data ?? [],
    reglas: reglas.data ?? [],
    bloqueos: bloqueos.data ?? [],
    correoFallido: [...new Set((fallos.data ?? []).map((f) => f.reunion_id as string))],
    oficina,
    entorno: { ...correoConfigurado() },
  });
}
