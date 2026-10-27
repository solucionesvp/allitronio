import { NextRequest } from "next/server";
import { listarCobros, cargarAjustes, cargarCobro } from "@/lib/cobros/service";
import { esUuid } from "@/lib/cobros/validar";
import { personaAdmin } from "@/lib/reuniones/admin";
import { getReunionesDb } from "@/lib/reuniones/db";
import { correoConfigurado } from "@/lib/reuniones/enviar";
import { json, NO_CONFIG } from "../../../reuniones/_http";

// GET /api/cobros/admin/datos
//   sin parámetros → lista de cobros + citas para ligar + ajustes
//   ?id=<uuid>     → un cobro completo (renglones, enlaces, abonos y bitácora)
// Solo con la sesión firmada del equipo (la misma de /interno).
export async function GET(req: NextRequest) {
  const persona = await personaAdmin(req);
  if (!persona) return json({ ok: false, error: "unauthorized" }, 401);
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    if (!esUuid(id)) return json({ ok: false, error: "no_encontrado" }, 404);
    const cobro = await cargarCobro(db, id);
    return cobro ? json({ ok: true, cobro }) : json({ ok: false, error: "no_encontrado" }, 404);
  }

  const desde = new Date(Date.now() - 60 * 86_400_000).toISOString();
  const [lista, ajustes, reuniones] = await Promise.all([
    listarCobros(db),
    cargarAjustes(db),
    db
      .from("reuniones")
      .select("id, producto_nombre, inicio, estado, cliente_nombre, cliente_email, cliente_whatsapp, cliente_empresa")
      .gte("inicio", desde)
      .neq("estado", "cancelada")
      .order("inicio", { ascending: false })
      .limit(300),
  ]);

  if (!lista.ok) {
    const sinTablas = /relation .*cobros.* does not exist|Could not find the table/i.test(lista.detalle);
    return json({ ok: false, error: sinTablas ? "sin_esquema" : "db_error", detalle: lista.detalle }, 500);
  }
  return json({
    ok: true,
    persona,
    cobros: lista.cobros,
    reuniones: reuniones.data ?? [],
    ajustes,
    entorno: { ...correoConfigurado() },
  });
}
