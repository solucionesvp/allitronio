import type { SupabaseClient } from "@supabase/supabase-js";
import { SITE_URL, ZONA_OFICINA } from "@/lib/reuniones/config";
import { nuevoToken } from "@/lib/reuniones/tokens";
import { ymdEnZona, sumarDias } from "@/lib/reuniones/tz";
import { calcularTotales, estadoPago, saldoDe, sumarAbonos } from "./calculos";
import { correoCobro, type TipoCorreoCobro } from "./correo";
import { enviarCorreo, type AdjuntoCorreo } from "@/lib/reuniones/enviar";
import { generarPdfCobro } from "./pdf";
import { destinatariosInternos } from "@/lib/reuniones/service";
import {
  folioDe,
  type AjustesCobros,
  type Cobro,
  type CobroAbono,
  type CobroCompleto,
  type CobroEnlace,
  type CobroEvento,
  type CobroItem,
  type EnvioCobro,
  type ResumenCobro,
} from "./types";
import type { EntradaAbono, EntradaCobro } from "./validar";

export const hoyTepic = (): string => ymdEnZona(new Date(), ZONA_OFICINA);
export const urlPublica = (token: string): string => `${SITE_URL}/cobros/${token}`;

const AJUSTES_DEFAULT: AjustesCobros = {
  emisor: { nombre: "Allitron", logo_url: "", email: "", telefono: "", web: "", direccion: "" },
  banco: { banco: "", beneficiario: "", cuenta: "", clabe: "" },
  iva_activo: false,
  iva_porcentaje: 16,
  metodo_pago: "Transferencia bancaria",
  notas: "Gracias por tu confianza.",
  vence_dias: 0,
};

// ── Errores de negocio de las funciones SQL → mensajes para el equipo ──────
const MENSAJES: Record<string, string> = {
  no_encontrado: "No encontramos ese cobro.",
  cancelado: "Un cobro cancelado ya no se puede editar. Duplícalo si necesitas uno nuevo.",
  total_menor_a_abonos: "El nuevo total es menor a lo que ya se abonó. Anula el abono primero o sube el total.",
  excede_saldo: "Ese abono es mayor al saldo pendiente.",
  monto_invalido: "El monto debe ser mayor a 0.",
  no_emitido: "Primero emite el cobro; solo se registran abonos en cobros emitidos.",
  abono_no_encontrado: "No encontramos ese abono (¿ya estaba anulado?).",
  estado_invalido: "Ese cambio de estado no es posible.",
  total_cero: "El total es $0; agrega renglones con precio antes de emitir.",
  tiene_abonos: "Tiene abonos registrados. Anúlalos primero si de verdad quieres cancelar.",
};

export function mensajeError(err: { message?: string } | null | undefined): string {
  const m = err?.message ?? "";
  for (const k of Object.keys(MENSAJES)) if (m.includes(k)) return MENSAJES[k];
  return "No se pudo completar la operación.";
}

// ── Ajustes ─────────────────────────────────────────────────────────────────
export async function cargarAjustes(db: SupabaseClient): Promise<AjustesCobros> {
  const { data } = await db.from("ajustes").select("valor").eq("clave", "cobros").maybeSingle();
  const v = (data?.valor ?? {}) as Partial<AjustesCobros>;
  return {
    ...AJUSTES_DEFAULT,
    ...v,
    emisor: { ...AJUSTES_DEFAULT.emisor, ...(v.emisor ?? {}) },
    banco: { ...AJUSTES_DEFAULT.banco, ...(v.banco ?? {}) },
  };
}

export async function guardarAjustes(db: SupabaseClient, a: AjustesCobros): Promise<boolean> {
  const { error } = await db.from("ajustes").upsert({ clave: "cobros", valor: a }, { onConflict: "clave" });
  return !error;
}

// ── Lecturas ────────────────────────────────────────────────────────────────
type FilaConAbonos = Cobro & { cobro_abonos: { monto: number; anulado_en: string | null }[] };

function derivar(c: Cobro, abonos: { monto: number; anulado?: boolean }[]) {
  const abonado = sumarAbonos(abonos);
  return {
    abonado,
    saldo: saldoDe(Number(c.total), abonado),
    estado_pago: estadoPago({ estado: c.estado, total: Number(c.total), abonado, vencimiento: c.fecha_vencimiento, hoy: hoyTepic() }),
  };
}

const num = (v: unknown): number => Number(v) || 0;
const normalizarCobro = (c: Cobro): Cobro => ({
  ...c,
  total: num(c.total),
  subtotal: num(c.subtotal),
  descuento_monto: num(c.descuento_monto),
  descuento_valor: num(c.descuento_valor),
  iva_monto: num(c.iva_monto),
  iva_porcentaje: num(c.iva_porcentaje),
});

export async function listarCobros(db: SupabaseClient): Promise<{ ok: true; cobros: ResumenCobro[] } | { ok: false; detalle: string }> {
  const { data, error } = await db
    .from("cobros")
    .select("*, cobro_abonos(monto, anulado_en)")
    .order("creado_en", { ascending: false })
    .limit(500);
  if (error) return { ok: false, detalle: error.message };
  const { data: logs } = await db
    .from("email_log")
    .select("cobro_id, estado, creado_en")
    .not("cobro_id", "is", null)
    .order("creado_en", { ascending: false })
    .limit(1000);
  const ultimos = new Map<string, { estado: "enviado" | "error"; creado_en: string }>();
  for (const l of (logs ?? []) as { cobro_id: string; estado: "enviado" | "error"; creado_en: string }[]) {
    if (!ultimos.has(l.cobro_id)) ultimos.set(l.cobro_id, { estado: l.estado, creado_en: l.creado_en });
  }
  const cobros = ((data ?? []) as FilaConAbonos[]).map((f) => {
    const { cobro_abonos, ...resto } = f;
    const c = normalizarCobro(resto as Cobro);
    return {
      ...c,
      folio: folioDe(c.folio_num),
      ultimo_envio: ultimos.get(c.id) ?? null,
      ...derivar(c, cobro_abonos.map((a) => ({ monto: num(a.monto), anulado: Boolean(a.anulado_en) }))),
    };
  });
  return { ok: true, cobros };
}

async function completar(db: SupabaseClient, c: Cobro, conEventos: boolean): Promise<CobroCompleto> {
  const [items, enlaces, abonos, eventos, envios] = await Promise.all([
    db.from("cobro_items").select("id, descripcion, detalle, cantidad, precio, orden").eq("cobro_id", c.id).order("orden"),
    db.from("cobro_enlaces").select("id, titulo, url, tipo, orden").eq("cobro_id", c.id).order("orden"),
    db.from("cobro_abonos").select("*").eq("cobro_id", c.id).order("fecha").order("creado_en"),
    conEventos
      ? db.from("cobro_eventos").select("id, tipo, detalle, persona, creado_en").eq("cobro_id", c.id).order("creado_en", { ascending: false }).limit(60)
      : Promise.resolve({ data: null }),
    conEventos
      ? db.from("email_log").select("id, tipo, destinatarios, estado, error, creado_en").eq("cobro_id", c.id).order("creado_en", { ascending: false }).limit(30)
      : Promise.resolve({ data: null }),
  ]);
  const abonosL = ((abonos.data ?? []) as CobroAbono[]).map((a) => ({ ...a, monto: num(a.monto) }));
  const cn = normalizarCobro(c);
  return {
    ...cn,
    items: ((items.data ?? []) as CobroItem[]).map((i) => ({ ...i, cantidad: num(i.cantidad), precio: num(i.precio) })),
    enlaces: (enlaces.data ?? []) as CobroEnlace[],
    abonos: abonosL,
    ...(conEventos ? { eventos: (eventos.data ?? []) as CobroEvento[], envios: (envios.data ?? []) as EnvioCobro[] } : {}),
    ...derivar(cn, abonosL.map((a) => ({ monto: a.monto, anulado: Boolean(a.anulado_en) }))),
  };
}

export async function cargarCobro(db: SupabaseClient, id: string): Promise<CobroCompleto | null> {
  const { data } = await db.from("cobros").select("*").eq("id", id).maybeSingle();
  return data ? completar(db, data as Cobro, true) : null;
}

/** Para la página pública: solo cobros emitidos o cancelados (nunca borradores). */
export async function cargarCobroPorToken(db: SupabaseClient, token: string): Promise<CobroCompleto | null> {
  const { data } = await db.from("cobros").select("*").eq("token", token).neq("estado", "borrador").maybeSingle();
  return data ? completar(db, data as Cobro, false) : null;
}

// ── Escrituras ──────────────────────────────────────────────────────────────
function paraSql(e: EntradaCobro, ajustes: AjustesCobros) {
  const t = calcularTotales({
    items: e.items,
    descuentoTipo: e.descuento_tipo,
    descuentoValor: e.descuento_valor,
    ivaActivo: e.iva_activo,
    ivaPorcentaje: e.iva_porcentaje,
  });
  const hoy = hoyTepic();
  const fecha_emision = e.fecha_emision ?? hoy;
  const fecha_vencimiento = e.fecha_vencimiento ?? (ajustes.vence_dias > 0 ? sumarDias(fecha_emision, ajustes.vence_dias) : null);
  return {
    datos: {
      ...e,
      items: undefined,
      enlaces: undefined,
      fecha_emision,
      fecha_vencimiento,
      subtotal: t.subtotal,
      descuento_monto: t.descuentoMonto,
      iva_monto: t.ivaMonto,
      total: t.total,
    },
    totales: t,
  };
}

export async function guardarCobro(
  db: SupabaseClient,
  persona: string,
  id: string | null,
  entrada: EntradaCobro
): Promise<{ ok: true; id: string } | { ok: false; mensaje: string }> {
  const ajustes = await cargarAjustes(db);
  const { datos } = paraSql(entrada, ajustes);
  const { data, error } = await db.rpc("cobro_guardar", {
    p_id: id,
    p_datos: { ...datos, token: id ? undefined : nuevoToken() },
    p_items: entrada.items,
    p_enlaces: entrada.enlaces,
    p_persona: persona,
  });
  if (error) {
    console.error("[cobros] cobro_guardar", error.message);
    return { ok: false, mensaje: mensajeError(error) };
  }
  return { ok: true, id: data as string };
}

export async function cambiarEstado(db: SupabaseClient, persona: string, id: string, estado: "emitido" | "cancelado", motivo?: string) {
  const { error } = await db.rpc("cobro_cambiar_estado", { p_cobro: id, p_estado: estado, p_persona: persona, p_motivo: motivo ?? null });
  return error ? { ok: false as const, mensaje: mensajeError(error) } : { ok: true as const };
}

export async function registrarAbono(db: SupabaseClient, persona: string, id: string, a: EntradaAbono) {
  const { data, error } = await db.rpc("cobro_registrar_abono", {
    p_cobro: id,
    p_fecha: a.fecha,
    p_concepto: a.concepto,
    p_metodo: a.metodo,
    p_monto: a.monto,
    p_persona: persona,
  });
  return error ? { ok: false as const, mensaje: mensajeError(error) } : { ok: true as const, abonoId: data as string };
}

export async function anularAbono(db: SupabaseClient, persona: string, abonoId: string, motivo: string) {
  const { data, error } = await db.rpc("cobro_anular_abono", { p_abono: abonoId, p_motivo: motivo, p_persona: persona });
  return error ? { ok: false as const, mensaje: mensajeError(error) } : { ok: true as const, cobroId: data as string };
}

/** Copia un cobro como borrador nuevo (sin abonos, token y folio nuevos). */
export async function duplicarCobro(db: SupabaseClient, persona: string, id: string): Promise<{ ok: true; id: string } | { ok: false; mensaje: string }> {
  const c = await cargarCobro(db, id);
  if (!c) return { ok: false, mensaje: MENSAJES.no_encontrado };
  const ajustes = await cargarAjustes(db);
  const hoy = hoyTepic();
  const entrada: EntradaCobro = {
    reunion_id: c.reunion_id,
    tipo_documento: c.tipo_documento,
    fecha_emision: hoy,
    fecha_vencimiento: ajustes.vence_dias > 0 ? sumarDias(hoy, ajustes.vence_dias) : null,
    cliente_nombre: c.cliente_nombre,
    cliente_email: c.cliente_email,
    cliente_telefono: c.cliente_telefono,
    cliente_direccion: c.cliente_direccion,
    cliente_rfc: c.cliente_rfc,
    concepto: c.concepto,
    notas: c.notas,
    metodo_pago: c.metodo_pago,
    descuento_tipo: c.descuento_tipo,
    descuento_valor: c.descuento_valor,
    iva_activo: c.iva_activo,
    iva_porcentaje: c.iva_porcentaje,
    items: c.items.map((i) => ({ descripcion: i.descripcion, detalle: i.detalle ?? "", cantidad: i.cantidad, precio: i.precio })),
    enlaces: c.enlaces.map((e) => ({ titulo: e.titulo, url: e.url, tipo: e.tipo })),
    emisor: { nombre: "", logo_url: "", email: "", telefono: "", web: "", direccion: "", ...c.emisor },
    banco: { banco: "", beneficiario: "", cuenta: "", clabe: "", ...c.banco },
    mostrar_banco: c.mostrar_banco,
  };
  return guardarCobro(db, persona, null, entrada);
}

// ── Correo ──────────────────────────────────────────────────────────────────
export async function enviarCobro(
  db: SupabaseClient,
  c: CobroCompleto,
  tipo: TipoCorreoCobro,
  persona: string
): Promise<{ ok: boolean; mensaje?: string }> {
  if (!c.cliente_email) return { ok: false, mensaje: "Este cobro no tiene correo del cliente." };
  if (c.estado !== "emitido") return { ok: false, mensaje: "Solo se envían cobros emitidos." };
  const url = urlPublica(c.token);
  const correo = correoCobro(c, tipo, url);
  // El PDF es un extra: si no se pudo generar, el correo sale igual con el enlace.
  let adjuntos: AdjuntoCorreo[] | undefined;
  try {
    const pdf = await generarPdfCobro(c, url);
    adjuntos = [{ filename: `${folioDe(c.folio_num)}.pdf`, contenido: Buffer.from(pdf).toString("base64"), contentType: "application/pdf", base64: true }];
  } catch {
    adjuntos = undefined;
  }
  // Copia oculta al equipo (los mismos administradores que reciben el aviso de citas).
  // Si no se pueden leer, el correo al cliente sale igual.
  const bcc = await destinatariosInternos(db, null).catch(() => [] as string[]);
  const r = await enviarCorreo(
    db,
    // reunionId null a propósito: el panel de Reuniones marca «Correo falló» según
    // reunion_id, y un fallo de cobros no debe contaminar esa agenda.
    { reunionId: null, tipo: tipo === "abono" ? "cobro_abono" : "cobro_comprobante", cobroId: c.id },
    {
      para: [c.cliente_email],
      asunto: correo.asunto,
      html: correo.html,
      texto: correo.texto,
      replyTo: c.emisor.email || null,
      adjuntos,
      bcc,
      idempotencyKey: `cobro-${c.id}-${tipo}-${Math.floor(Date.now() / 60_000)}`,
    }
  );
  await db.from("cobro_eventos").insert({
    cobro_id: c.id,
    tipo: r.ok ? "correo_enviado" : "correo_fallo",
    detalle: { tipo, a: c.cliente_email, pdf: Boolean(adjuntos), copias: bcc.length, ...(r.ok ? {} : { error: r.error }) },
    persona,
  });
  return r.ok ? { ok: true } : { ok: false, mensaje: "No se pudo enviar el correo. Queda registrado; puedes reintentar o compartir por WhatsApp." };
}
