import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ANTICIPACION_MIN_HORAS,
  CAMBIOS_LIMITE_HORAS,
  HORIZONTE_DIAS,
  PASO_SLOTS_MIN,
  ZONA_OFICINA,
} from "./config";
import { correoAvisoInterno, correoCancelacionCliente, correoConfirmacionCliente, type ContextoCorreo } from "./correos";
import { enviarCorreo, type AdjuntoCorreo } from "./enviar";
import { eventoDe } from "./evento";
import { generarIcs } from "./ics";
import { generarSlots, type AnfitrionEntrada } from "./slots";
import { nuevoToken } from "./tokens";
import type {
  Anfitrion,
  Modalidad,
  Oficina,
  ProductoReunion,
  Reunion,
  SlotDisponible,
} from "./types";
import type { DatosCliente } from "./validar";

const OFICINA_DEFAULT: Oficina = { direccion: "Tepic, Nayarit", maps_url: null };
const DIA = 86_400_000;

export type AnfitrionProducto = Anfitrion & { prioridad: number };

export interface CatalogoProducto {
  producto: ProductoReunion;
  anfitriones: AnfitrionProducto[];
}

// ── Lecturas ────────────────────────────────────────────────────────────────

export async function cargarOficina(db: SupabaseClient): Promise<Oficina> {
  const { data } = await db.from("ajustes").select("valor").eq("clave", "oficina").maybeSingle();
  const v = data?.valor as Partial<Oficina> | undefined;
  return v?.direccion ? { direccion: v.direccion, maps_url: v.maps_url ?? null } : OFICINA_DEFAULT;
}

export async function cargarProducto(
  db: SupabaseClient,
  filtro: { slug?: string; id?: string },
  soloActivo = true
): Promise<CatalogoProducto | null> {
  let q = db.from("productos_reunion").select("*");
  q = filtro.id ? q.eq("id", filtro.id) : q.eq("slug", filtro.slug ?? "");
  if (soloActivo) q = q.eq("activo", true);
  const { data: producto } = await q.maybeSingle();
  if (!producto) return null;

  const { data: links } = await db
    .from("producto_anfitriones")
    .select("prioridad, anfitriones(*)")
    .eq("producto_id", producto.id);
  const anfitriones = ((links ?? []) as unknown as { prioridad: number; anfitriones: Anfitrion | null }[])
    .filter((l) => l.anfitriones && (!soloActivo || l.anfitriones.activo))
    .map((l) => ({ ...(l.anfitriones as Anfitrion), prioridad: l.prioridad }));
  return { producto: producto as ProductoReunion, anfitriones };
}

export async function cargarReunionPorToken(db: SupabaseClient, token: string): Promise<Reunion | null> {
  const { data } = await db.from("reuniones").select("*").eq("token", token).maybeSingle();
  return (data as Reunion | null) ?? null;
}

async function contextoDe(db: SupabaseClient, reunion: Reunion): Promise<ContextoCorreo | null> {
  const [{ data: a }, oficina, { data: p }] = await Promise.all([
    db.from("anfitriones").select("*").eq("id", reunion.anfitrion_id).maybeSingle(),
    cargarOficina(db),
    db.from("productos_reunion").select("slug").eq("id", reunion.producto_id).maybeSingle(),
  ]);
  if (!a) return null;
  return { reunion, anfitrion: a as Anfitrion, oficina, productoSlug: (p as { slug: string } | null)?.slug };
}

// ── Disponibilidad ──────────────────────────────────────────────────────────

export interface Disponibilidad {
  slots: SlotDisponible[];
  /** Reuniones confirmadas futuras por anfitrión (para repartir carga). */
  cargas: Map<string, number>;
  /** Anfitriones considerados (con horario y, en video, con enlace). */
  usados: AnfitrionProducto[];
}

export async function calcularDisponibilidad(
  db: SupabaseClient,
  cat: CatalogoProducto,
  modalidad: Modalidad,
  opts: { excluirReunionId?: string; anticipacionHoras?: number } = {}
): Promise<Disponibilidad> {
  const candidatos = cat.anfitriones.filter((a) => (modalidad === "video" ? Boolean(a.enlace_video) : true));
  const vacio: Disponibilidad = { slots: [], cargas: new Map(), usados: [] };
  if (candidatos.length === 0) return vacio;

  const ids = candidatos.map((a) => a.id);
  const ahora = new Date();
  const hasta = new Date(ahora.getTime() + (HORIZONTE_DIAS + 2) * DIA).toISOString();

  const [reglasQ, reunionesQ, bloqueosQ] = await Promise.all([
    db.from("disponibilidad_semanal").select("*").in("anfitrion_id", ids),
    db
      .from("reuniones")
      .select("id, anfitrion_id, inicio, fin")
      .in("anfitrion_id", ids)
      .eq("estado", "confirmada")
      .gt("fin", ahora.toISOString())
      .lt("inicio", hasta),
    db
      .from("bloqueos")
      .select("anfitrion_id, inicio, fin")
      .gt("fin", ahora.toISOString())
      .lt("inicio", hasta)
      .or(`anfitrion_id.is.null,anfitrion_id.in.(${ids.join(",")})`),
  ]);

  const reglas = (reglasQ.data ?? []) as { anfitrion_id: string; dia_semana: number; hora_inicio: string; hora_fin: string }[];
  const reuniones = ((reunionesQ.data ?? []) as { id: string; anfitrion_id: string; inicio: string; fin: string }[]).filter(
    (r) => r.id !== opts.excluirReunionId
  );
  const bloqueos = (bloqueosQ.data ?? []) as { anfitrion_id: string | null; inicio: string; fin: string }[];

  const cargas = new Map<string, number>();
  for (const r of reuniones) cargas.set(r.anfitrion_id, (cargas.get(r.anfitrion_id) ?? 0) + 1);

  const entradas: AnfitrionEntrada[] = candidatos
    .map((a) => ({
      id: a.id,
      zona: a.zona_horaria,
      reglas: reglas.filter((r) => r.anfitrion_id === a.id),
      reuniones: reuniones
        .filter((r) => r.anfitrion_id === a.id)
        .map((r) => ({ inicio: new Date(r.inicio), fin: new Date(r.fin) })),
      bloqueos: bloqueos
        .filter((b) => b.anfitrion_id === null || b.anfitrion_id === a.id)
        .map((b) => ({ inicio: new Date(b.inicio), fin: new Date(b.fin) })),
    }))
    .filter((e) => e.reglas.length > 0);

  const slots = generarSlots({
    anfitriones: entradas,
    duracionMin: cat.producto.duracion_min,
    bufferMin: cat.producto.buffer_min,
    pasoMin: PASO_SLOTS_MIN,
    ahora,
    anticipacionHoras: opts.anticipacionHoras ?? ANTICIPACION_MIN_HORAS,
    horizonteDias: HORIZONTE_DIAS,
    zonaReferencia: ZONA_OFICINA,
  });
  return { slots, cargas, usados: candidatos.filter((a) => entradas.some((e) => e.id === a.id)) };
}

/** Orden de asignación: prioridad del producto, luego quien tenga menos reuniones. */
function ordenarCandidatos(ids: string[], cat: CatalogoProducto, cargas: Map<string, number>): AnfitrionProducto[] {
  return cat.anfitriones
    .filter((a) => ids.includes(a.id))
    .sort((x, y) => x.prioridad - y.prioridad || (cargas.get(x.id) ?? 0) - (cargas.get(y.id) ?? 0) || x.nombre.localeCompare(y.nombre));
}

// ── Correos ─────────────────────────────────────────────────────────────────

function adjuntoIcs(ctx: ContextoCorreo, metodo: "PUBLISH" | "CANCEL"): AdjuntoCorreo {
  return {
    filename: metodo === "CANCEL" ? "reunion-cancelada.ics" : "reunion-allitron.ics",
    contenido: generarIcs(eventoDe(ctx.reunion, ctx.anfitrion, ctx.oficina), metodo),
    contentType: `text/calendar; method=${metodo}; charset=UTF-8`,
  };
}

export async function destinatariosInternos(db: SupabaseClient, anfitrion?: Anfitrion | null): Promise<string[]> {
  const { data } = await db.from("anfitriones").select("email").eq("activo", true);
  const todos = ((data ?? []) as { email: string | null }[]).map((a) => a.email).filter((e): e is string => Boolean(e));
  if (anfitrion?.email) todos.push(anfitrion.email);
  return [...new Set(todos.map((e) => e.toLowerCase()))];
}

export type TipoNotificacion = "nueva" | "reprogramada" | "cancelada";

/** Envía al cliente y al equipo. Nunca lanza: devuelve qué salió bien. */
export async function notificarReunion(
  db: SupabaseClient,
  ctx: ContextoCorreo,
  tipo: TipoNotificacion,
  reenvio = false
): Promise<{ cliente: boolean; equipo: boolean }> {
  const r = ctx.reunion;
  // La clave evita duplicados si Vercel reintenta la petición; un reenvío manual lleva clave nueva.
  const clave = `${tipo}-${r.id}-${r.secuencia}${reenvio ? `-r${Date.now()}` : ""}`;
  const publicar = tipo !== "cancelada";
  const cliente = publicar ? correoConfirmacionCliente(ctx, tipo === "reprogramada") : correoCancelacionCliente(ctx);
  const interno = correoAvisoInterno(ctx, tipo);
  const adj = [adjuntoIcs(ctx, publicar ? "PUBLISH" : "CANCEL")];

  const [c, e] = await Promise.allSettled([
    enviarCorreo(db, { reunionId: r.id, tipo: `cliente_${tipo}` }, {
      para: [r.cliente_email],
      asunto: cliente.asunto,
      html: cliente.html,
      texto: cliente.texto,
      replyTo: ctx.anfitrion.email,
      adjuntos: adj,
      idempotencyKey: `c-${clave}`,
    }),
    (async () =>
      enviarCorreo(db, { reunionId: r.id, tipo: `equipo_${tipo}` }, {
        para: await destinatariosInternos(db, ctx.anfitrion),
        asunto: interno.asunto,
        html: interno.html,
        texto: interno.texto,
        replyTo: r.cliente_email,
        adjuntos: adj,
        idempotencyKey: `e-${clave}`,
      }))(),
  ]);
  return {
    cliente: c.status === "fulfilled" && c.value.ok,
    equipo: e.status === "fulfilled" && e.value.ok,
  };
}

// ── Crear ───────────────────────────────────────────────────────────────────

export type ErrorReserva =
  | "producto_invalido"
  | "modalidad_invalida"
  | "horario_no_disponible"
  | "ocupado"
  | "error_interno";

export interface EntradaReserva {
  productoSlug: string;
  inicio: Date;
  modalidad: Modalidad;
  cliente: DatosCliente;
  zonaCliente: string;
  aceptaComunicaciones: boolean;
  origen: "cliente" | "interno";
  /** Solo interno: elegir anfitrión y saltarse horarios/anticipación (nunca el candado de traslape). */
  anfitrionId?: string;
  forzar?: boolean;
}

export async function crearReunion(
  db: SupabaseClient,
  e: EntradaReserva
): Promise<{ ok: true; reunion: Reunion; correos: { cliente: boolean; equipo: boolean } } | { ok: false; error: ErrorReserva }> {
  const cat = await cargarProducto(db, { slug: e.productoSlug });
  if (!cat) return { ok: false, error: "producto_invalido" };
  const p = cat.producto;
  if ((e.modalidad === "presencial" && !p.permite_presencial) || (e.modalidad === "video" && !p.permite_video)) {
    return { ok: false, error: "modalidad_invalida" };
  }

  const fin = new Date(e.inicio.getTime() + p.duracion_min * 60_000);
  let candidatos: AnfitrionProducto[];

  if (e.forzar) {
    candidatos = cat.anfitriones.filter((a) => (e.anfitrionId ? a.id === e.anfitrionId : true));
    if (e.modalidad === "video") candidatos = candidatos.filter((a) => a.enlace_video);
    if (candidatos.length === 0) return { ok: false, error: "horario_no_disponible" };
  } else {
    const disp = await calcularDisponibilidad(db, cat, e.modalidad);
    const slot = disp.slots.find((s) => s.inicio === e.inicio.toISOString());
    if (!slot) return { ok: false, error: "horario_no_disponible" };
    const ids = e.anfitrionId ? slot.anfitriones.filter((id) => id === e.anfitrionId) : slot.anfitriones;
    if (ids.length === 0) return { ok: false, error: "horario_no_disponible" };
    candidatos = ordenarCandidatos(ids, cat, disp.cargas);
  }

  for (const a of candidatos) {
    const { data, error } = await db
      .from("reuniones")
      .insert({
        producto_id: p.id,
        producto_nombre: p.nombre,
        anfitrion_id: a.id,
        inicio: e.inicio.toISOString(),
        fin: fin.toISOString(),
        modalidad: e.modalidad,
        origen: e.origen,
        cliente_nombre: e.cliente.nombre,
        cliente_email: e.cliente.email,
        cliente_whatsapp: e.cliente.whatsapp,
        cliente_empresa: e.cliente.empresa,
        notas: e.cliente.notas,
        zona_cliente: e.zonaCliente,
        token: nuevoToken(),
        acepta_comunicaciones: e.aceptaComunicaciones,
        consentimiento_en: e.aceptaComunicaciones ? new Date().toISOString() : null,
      })
      .select("*")
      .single();

    if (error) {
      if (error.code === "23P01") continue; // otro cliente tomó ese horario con este anfitrión
      console.error("[reuniones] insert falló", error.message);
      return { ok: false, error: "error_interno" };
    }

    const reunion = data as Reunion;
    const ctx = await contextoDe(db, reunion);
    const correos = ctx ? await notificarReunion(db, ctx, "nueva") : { cliente: false, equipo: false };
    return { ok: true, reunion, correos };
  }
  return { ok: false, error: "ocupado" };
}

// ── Cancelar / reprogramar ──────────────────────────────────────────────────

export function puedeCambiar(r: Reunion): boolean {
  return r.estado === "confirmada" && new Date(r.inicio).getTime() - Date.now() > CAMBIOS_LIMITE_HORAS * 3_600_000;
}

export async function cancelarReunion(
  db: SupabaseClient,
  r: Reunion,
  por: string,
  motivo?: string | null
): Promise<{ ok: boolean; correos?: { cliente: boolean; equipo: boolean } }> {
  if (r.estado !== "confirmada") return { ok: false };
  const { data, error } = await db
    .from("reuniones")
    .update({ estado: "cancelada", secuencia: r.secuencia + 1, cancelada_por: por, motivo_cancelacion: motivo?.slice(0, 300) || null })
    .eq("id", r.id)
    .eq("estado", "confirmada")
    .select("*")
    .maybeSingle();
  if (error || !data) return { ok: false };
  const ctx = await contextoDe(db, data as Reunion);
  const correos = ctx ? await notificarReunion(db, ctx, "cancelada") : undefined;
  return { ok: true, correos };
}

export async function reprogramarReunion(
  db: SupabaseClient,
  r: Reunion,
  nuevoInicio: Date,
  opts: { forzar?: boolean } = {}
): Promise<{ ok: true; reunion: Reunion; correos: { cliente: boolean; equipo: boolean } } | { ok: false; error: ErrorReserva }> {
  if (r.estado !== "confirmada") return { ok: false, error: "horario_no_disponible" };
  const cat = await cargarProducto(db, { id: r.producto_id }, false);
  if (!cat) return { ok: false, error: "producto_invalido" };

  const fin = new Date(nuevoInicio.getTime() + cat.producto.duracion_min * 60_000);
  let orden: AnfitrionProducto[];

  if (opts.forzar) {
    orden = cat.anfitriones.filter((a) => a.id === r.anfitrion_id);
    if (orden.length === 0) orden = cat.anfitriones;
  } else {
    const activo = { ...cat, anfitriones: cat.anfitriones.filter((a) => a.activo) };
    const disp = await calcularDisponibilidad(db, activo, r.modalidad, { excluirReunionId: r.id });
    const slot = disp.slots.find((s) => s.inicio === nuevoInicio.toISOString());
    if (!slot) return { ok: false, error: "horario_no_disponible" };
    // Se prefiere el mismo anfitrión; si no está libre, cualquiera que lo esté.
    orden = ordenarCandidatos(slot.anfitriones, activo, disp.cargas).sort(
      (x, y) => Number(y.id === r.anfitrion_id) - Number(x.id === r.anfitrion_id)
    );
  }

  for (const a of orden) {
    const { data, error } = await db
      .from("reuniones")
      .update({ inicio: nuevoInicio.toISOString(), fin: fin.toISOString(), anfitrion_id: a.id, secuencia: r.secuencia + 1 })
      .eq("id", r.id)
      .eq("estado", "confirmada")
      .select("*")
      .maybeSingle();
    if (error) {
      if (error.code === "23P01") continue;
      console.error("[reuniones] reprogramar falló", error.message);
      return { ok: false, error: "error_interno" };
    }
    if (!data) return { ok: false, error: "horario_no_disponible" };
    const reunion = data as Reunion;
    const ctx = await contextoDe(db, reunion);
    const correos = ctx ? await notificarReunion(db, ctx, "reprogramada") : { cliente: false, equipo: false };
    return { ok: true, reunion, correos };
  }
  return { ok: false, error: "ocupado" };
}

/** Reenvía la confirmación vigente (botón del panel). */
export async function reenviarConfirmacion(db: SupabaseClient, r: Reunion) {
  const ctx = await contextoDe(db, r);
  if (!ctx) return { cliente: false, equipo: false };
  return notificarReunion(db, ctx, r.estado === "cancelada" ? "cancelada" : r.secuencia > 0 ? "reprogramada" : "nueva", true);
}

export { contextoDe };
