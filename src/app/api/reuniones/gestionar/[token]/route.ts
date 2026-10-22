import { NextRequest } from "next/server";
import { CAMBIOS_LIMITE_HORAS } from "@/lib/reuniones/config";
import { getReunionesDb } from "@/lib/reuniones/db";
import {
  cancelarReunion,
  cargarOficina,
  cargarReunionPorToken,
  puedeCambiar,
  reprogramarReunion,
} from "@/lib/reuniones/service";
import { tokenValido } from "@/lib/reuniones/tokens";
import { esFechaIso } from "@/lib/reuniones/validar";
import { json, NO_CONFIG } from "../../_http";

type Ctx = { params: Promise<{ token: string }> };

// GET: datos de SU reunión (el token es un secreto de 192 bits; no hay listados).
export async function GET(_req: NextRequest, { params }: Ctx) {
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);
  const { token } = await params;
  if (!tokenValido(token)) return json({ ok: false, error: "no_encontrada" }, 404);

  const r = await cargarReunionPorToken(db, token);
  if (!r) return json({ ok: false, error: "no_encontrada" }, 404);

  const [{ data: a }, { data: p }, oficina] = await Promise.all([
    db.from("anfitriones").select("nombre, enlace_video").eq("id", r.anfitrion_id).maybeSingle(),
    db.from("productos_reunion").select("slug").eq("id", r.producto_id).maybeSingle(),
    cargarOficina(db),
  ]);

  return json({
    ok: true,
    reunion: {
      producto: r.producto_nombre,
      producto_slug: (p as { slug: string } | null)?.slug ?? null,
      inicio: r.inicio,
      fin: r.fin,
      modalidad: r.modalidad,
      estado: r.estado,
      zona_cliente: r.zona_cliente,
      cliente_nombre: r.cliente_nombre,
      anfitrion: (a as { nombre: string } | null)?.nombre ?? "Allitron",
      enlace_video: r.modalidad === "video" && r.estado === "confirmada" ? (a as { enlace_video: string | null } | null)?.enlace_video ?? null : null,
      direccion: r.modalidad === "presencial" ? oficina.direccion : null,
      puede_cambiar: puedeCambiar(r),
      limite_horas: CAMBIOS_LIMITE_HORAS,
    },
  });
}

// POST: { accion: "cancelar", motivo? } | { accion: "reprogramar", inicio }
export async function POST(req: NextRequest, { params }: Ctx) {
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);
  const { token } = await params;
  if (!tokenValido(token)) return json({ ok: false, error: "no_encontrada" }, 404);

  const r = await cargarReunionPorToken(db, token);
  if (!r) return json({ ok: false, error: "no_encontrada" }, 404);
  if (!puedeCambiar(r)) {
    return json({ ok: false, error: "fuera_de_plazo", mensaje: `Los cambios en línea se permiten hasta ${CAMBIOS_LIMITE_HORAS} horas antes. Escríbenos por WhatsApp y lo resolvemos.` }, 409);
  }

  let b: { accion?: string; motivo?: string; inicio?: string };
  try {
    b = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  if (b.accion === "cancelar") {
    const res = await cancelarReunion(db, r, "cliente", typeof b.motivo === "string" ? b.motivo : null);
    return res.ok ? json({ ok: true }) : json({ ok: false, error: "error_interno" }, 500);
  }

  if (b.accion === "reprogramar") {
    if (!esFechaIso(b.inicio)) return json({ ok: false, error: "bad_request" }, 400);
    const res = await reprogramarReunion(db, r, new Date(b.inicio));
    if (!res.ok) {
      const msg = res.error === "ocupado" || res.error === "horario_no_disponible" ? "Ese horario ya no está disponible. Elige otro, por favor." : "No pudimos reprogramar. Intenta de nuevo.";
      return json({ ok: false, error: res.error, mensaje: msg }, res.error === "error_interno" ? 500 : 409);
    }
    return json({ ok: true, token: res.reunion.token });
  }

  return json({ ok: false, error: "bad_request" }, 400);
}
