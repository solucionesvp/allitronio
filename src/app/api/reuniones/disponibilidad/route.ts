import { NextRequest } from "next/server";
import { getReunionesDb } from "@/lib/reuniones/db";
import { calcularDisponibilidad, cargarProducto, cargarReunionPorToken } from "@/lib/reuniones/service";
import { tokenValido } from "@/lib/reuniones/tokens";
import type { Modalidad } from "@/lib/reuniones/types";
import { json, NO_CONFIG } from "../_http";

// GET /api/reuniones/disponibilidad?producto=slug&modalidad=video|presencial
// GET /api/reuniones/disponibilidad?reprogramar=TOKEN   (excluye la propia reunión)
// Devuelve solo los instantes libres (ISO UTC). Nunca quién atiende.
export async function GET(req: NextRequest) {
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  const sp = req.nextUrl.searchParams;
  const token = sp.get("reprogramar");

  const slug = sp.get("producto") ?? "";
  let modalidad = sp.get("modalidad") as Modalidad | null;
  let excluir: string | undefined;
  let productoId: string | undefined;

  if (token) {
    if (!tokenValido(token)) return json({ ok: false, error: "no_encontrada" }, 404);
    const r = await cargarReunionPorToken(db, token);
    if (!r || r.estado !== "confirmada") return json({ ok: false, error: "no_encontrada" }, 404);
    excluir = r.id;
    modalidad = r.modalidad;
    productoId = r.producto_id;
  }

  if (modalidad !== "video" && modalidad !== "presencial") return json({ ok: false, error: "modalidad_invalida" }, 400);

  const cat = await cargarProducto(db, productoId ? { id: productoId } : { slug }, !productoId);
  if (!cat) return json({ ok: false, error: "producto_invalido" }, 404);
  const ok = modalidad === "presencial" ? cat.producto.permite_presencial : cat.producto.permite_video;
  if (!ok) return json({ ok: false, error: "modalidad_invalida" }, 400);

  const activo = { ...cat, anfitriones: cat.anfitriones.filter((a) => a.activo) };
  const disp = await calcularDisponibilidad(db, activo, modalidad, { excluirReunionId: excluir });
  return json({
    ok: true,
    duracion_min: cat.producto.duracion_min,
    slots: disp.slots.map((s) => s.inicio),
  });
}
