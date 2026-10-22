import { NextRequest } from "next/server";
import { RESERVAS_MAX_POR_IP_HORA } from "@/lib/reuniones/config";
import { getReunionesDb } from "@/lib/reuniones/db";
import { ipDe } from "@/lib/reuniones/admin";
import { intentosRecientes, registrarIntento } from "@/lib/reuniones/limites";
import { crearReunion } from "@/lib/reuniones/service";
import { esFechaIso, validarCliente, zonaCliente } from "@/lib/reuniones/validar";
import { json, NO_CONFIG } from "../_http";

// POST /api/reuniones/reservar — reserva pública.
// Defensas: honeypot, límite por IP, validación estricta y verificación del
// horario en el servidor (nunca se confía en lo que dice el navegador). El
// candado final contra doble reserva vive en la base de datos.
const MENSAJES: Record<string, string> = {
  producto_invalido: "Esta reunión ya no está disponible. Elige otra opción.",
  modalidad_invalida: "Esa modalidad no está disponible para esta reunión.",
  horario_no_disponible: "Ese horario ya no está disponible. Elige otro, por favor.",
  ocupado: "Ese horario acaba de ocuparse. Elige otro, por favor.",
  error_interno: "No pudimos completar tu reserva. Intenta de nuevo en unos minutos.",
};

export async function POST(req: NextRequest) {
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: un humano nunca ve este campo. Se responde "éxito" para no dar pistas.
  if (typeof b.sitio_web === "string" && b.sitio_web.trim() !== "") return json({ ok: true, token: null });

  const ip = ipDe(req);
  if ((await intentosRecientes(db, ip, "reserva", 60)) >= RESERVAS_MAX_POR_IP_HORA) {
    return json({ ok: false, error: "demasiados_intentos", mensaje: "Hiciste varias reservas seguidas. Intenta de nuevo más tarde o escríbenos por WhatsApp." }, 429);
  }

  const v = validarCliente(b);
  if (!v.ok) return json({ ok: false, error: "datos_invalidos", mensaje: v.error }, 400);

  const modalidad = b.modalidad === "presencial" || b.modalidad === "video" ? b.modalidad : null;
  if (!modalidad || typeof b.producto !== "string" || !esFechaIso(b.inicio)) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  await registrarIntento(db, ip, "reserva");
  const res = await crearReunion(db, {
    productoSlug: b.producto,
    inicio: new Date(b.inicio),
    modalidad,
    cliente: v.datos,
    zonaCliente: zonaCliente(b.zona),
    aceptaComunicaciones: b.acepta_comunicaciones === true,
    origen: "cliente",
  });

  if (!res.ok) {
    const status = res.error === "error_interno" ? 500 : 409;
    return json({ ok: false, error: res.error, mensaje: MENSAJES[res.error] }, status);
  }
  return json({ ok: true, token: res.reunion.token, correoEnviado: res.correos.cliente });
}
