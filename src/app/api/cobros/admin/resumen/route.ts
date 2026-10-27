import { NextRequest } from "next/server";
import { hoyTepic, listarCobros } from "@/lib/cobros/service";
import { personaAdmin } from "@/lib/reuniones/admin";
import { getReunionesDb } from "@/lib/reuniones/db";
import { json, NO_CONFIG } from "../../../reuniones/_http";

// GET /api/cobros/admin/resumen — números del tablero /interno (ligero, solo lectura).
export async function GET(req: NextRequest) {
  const persona = await personaAdmin(req);
  if (!persona) return json({ ok: false, error: "unauthorized" }, 401);
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  const hoy = hoyTepic();
  const inicioMes = `${hoy.slice(0, 7)}-01`;
  const [lista, mes] = await Promise.all([
    listarCobros(db),
    db.from("cobro_abonos").select("monto").gte("fecha", inicioMes).lte("fecha", hoy).is("anulado_en", null),
  ]);
  if (!lista.ok) {
    const sinTablas = /relation .*cobros.* does not exist|Could not find the table/i.test(lista.detalle);
    return json({ ok: false, error: sinTablas ? "sin_esquema" : "db_error" }, 500);
  }

  const abiertos = lista.cobros.filter((c) => c.estado === "emitido" && c.saldo > 0);
  const vencidos = abiertos.filter((c) => c.estado_pago === "vencido");
  const suma = (xs: { saldo: number }[]) => Math.round(xs.reduce((a, c) => a + c.saldo, 0) * 100) / 100;
  // Vencidos primero; dentro de cada grupo, el que vence antes.
  const orden = [...abiertos].sort((a, b) => {
    const va = a.estado_pago === "vencido" ? 0 : 1;
    const vb = b.estado_pago === "vencido" ? 0 : 1;
    return va - vb || (a.fecha_vencimiento ?? "9999").localeCompare(b.fecha_vencimiento ?? "9999");
  });

  return json({
    ok: true,
    porCobrar: suma(abiertos),
    nPorCobrar: abiertos.length,
    vencido: suma(vencidos),
    nVencidos: vencidos.length,
    cobradoMes: Math.round((mes.data ?? []).reduce((a, r) => a + Number((r as { monto: number }).monto), 0) * 100) / 100,
    borradores: lista.cobros.filter((c) => c.estado === "borrador").length,
    sinEnviar: abiertos.filter((c) => c.cliente_email && !c.ultimo_envio).length,
    pendientes: orden.slice(0, 6).map((c) => ({
      id: c.id,
      folio: c.folio,
      cliente: c.cliente_nombre,
      saldo: c.saldo,
      estado_pago: c.estado_pago,
      vence: c.fecha_vencimiento,
    })),
  });
}
