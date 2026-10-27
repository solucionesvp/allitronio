import type { DescuentoTipo } from "./calculos";
import type { AjustesCobros, Banco, Emisor, TipoDocumento, TipoEnlace } from "./types";

// ── Validación de todo lo que llega del navegador ───────────────────────────
// Nada se confía: se limpia, se acota y se rechaza lo raro. Los totales NO se
// aceptan del cliente; se recalculan en el servidor con calculos.ts.

const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EMAIL_RE = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]{2,}$/;
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const MAX_ITEMS = 50;
export const MAX_ENLACES = 10;
export const MAX_MONTO = 10_000_000;

function limpiar(v: unknown, max: number, multilinea = false): string {
  if (typeof v !== "string") return "";
  const t = v.replace(CONTROL_RE, "");
  return (multilinea ? t : t.replace(/\s+/g, " ")).trim().slice(0, max);
}

function num(v: unknown): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v.replace(/,/g, "")) : NaN;
  return Number.isFinite(n) ? n : NaN;
}

export const esFechaYmd = (v: unknown): v is string => {
  if (typeof v !== "string" || !FECHA_RE.test(v)) return false;
  const d = new Date(`${v}T12:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
};

export const esUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

function urlHttps(v: unknown): string {
  const t = limpiar(v, 500);
  if (!t) return "";
  try {
    return new URL(t).protocol === "https:" ? t : "";
  } catch {
    return "";
  }
}

function emailOpc(v: unknown): string | null {
  const t = limpiar(v, 254).toLowerCase();
  return t && EMAIL_RE.test(t) ? t : null;
}

export function emisorDe(raw: unknown): Emisor {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    nombre: limpiar(r.nombre, 120),
    logo_url: urlHttps(r.logo_url),
    email: emailOpc(r.email) ?? "",
    telefono: limpiar(r.telefono, 30),
    web: urlHttps(r.web),
    direccion: limpiar(r.direccion, 250),
  };
}

export function bancoDe(raw: unknown): Banco {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    banco: limpiar(r.banco, 80),
    beneficiario: limpiar(r.beneficiario, 120),
    cuenta: limpiar(r.cuenta, 30).replace(/[^\d\s-]/g, ""),
    clabe: limpiar(r.clabe, 30).replace(/\D/g, "").slice(0, 18),
  };
}

export interface EntradaCobro {
  reunion_id: string | null;
  tipo_documento: TipoDocumento;
  fecha_emision: string | null;
  fecha_vencimiento: string | null;
  cliente_nombre: string;
  cliente_email: string | null;
  cliente_telefono: string | null;
  cliente_direccion: string | null;
  cliente_rfc: string | null;
  concepto: string | null;
  notas: string | null;
  metodo_pago: string | null;
  descuento_tipo: DescuentoTipo;
  descuento_valor: number;
  iva_activo: boolean;
  iva_porcentaje: number;
  items: { descripcion: string; detalle: string; cantidad: number; precio: number }[];
  enlaces: { titulo: string; url: string; tipo: TipoEnlace }[];
  emisor: Emisor;
  banco: Banco;
  mostrar_banco: boolean;
}

type R<T> = { ok: true; datos: T } | { ok: false; error: string };

/** `emitir` = reglas estrictas (se va a mandar al cliente). Un borrador solo exige el nombre. */
export function validarCobro(raw: unknown, emitir: boolean): R<EntradaCobro> {
  const r = (raw ?? {}) as Record<string, unknown>;

  const cliente_nombre = limpiar(r.cliente_nombre, 120);
  if (cliente_nombre.length < 2) return { ok: false, error: "Escribe el nombre del cliente." };

  const emailRaw = limpiar(r.cliente_email, 254);
  const cliente_email = emailOpc(emailRaw);
  if (emailRaw && !cliente_email) return { ok: false, error: "Revisa el correo del cliente." };

  const tipo = r.tipo_documento === "recibo" || r.tipo_documento === "factura" ? r.tipo_documento : "nota";

  const reunion_id = r.reunion_id === null || r.reunion_id === "" || r.reunion_id === undefined ? null : esUuid(r.reunion_id) ? r.reunion_id : undefined;
  if (reunion_id === undefined) return { ok: false, error: "La reunión elegida no es válida." };

  const fe = r.fecha_emision;
  if (fe !== undefined && fe !== null && fe !== "" && !esFechaYmd(fe)) return { ok: false, error: "Fecha de emisión inválida." };
  const fv = r.fecha_vencimiento;
  if (fv !== undefined && fv !== null && fv !== "" && !esFechaYmd(fv)) return { ok: false, error: "Fecha de vencimiento inválida." };
  const fecha_emision = typeof fe === "string" && fe ? fe : null;
  const fecha_vencimiento = typeof fv === "string" && fv ? fv : null;
  if (fecha_emision && fecha_vencimiento && fecha_vencimiento < fecha_emision) return { ok: false, error: "El vencimiento no puede ser antes de la emisión." };

  const descuento_tipo: DescuentoTipo = r.descuento_tipo === "monto" ? "monto" : "porcentaje";
  const descuento_valor = r.descuento_valor === undefined || r.descuento_valor === "" ? 0 : num(r.descuento_valor);
  if (!Number.isFinite(descuento_valor) || descuento_valor < 0) return { ok: false, error: "Descuento inválido." };
  if (descuento_tipo === "porcentaje" && descuento_valor > 100) return { ok: false, error: "El descuento no puede pasar de 100%." };
  if (descuento_tipo === "monto" && descuento_valor > MAX_MONTO) return { ok: false, error: "Descuento demasiado alto." };

  const iva_porcentaje = r.iva_porcentaje === undefined || r.iva_porcentaje === "" ? 16 : num(r.iva_porcentaje);
  if (!Number.isFinite(iva_porcentaje) || iva_porcentaje < 0 || iva_porcentaje > 100) return { ok: false, error: "IVA inválido." };

  const itemsRaw = Array.isArray(r.items) ? r.items : [];
  if (itemsRaw.length > MAX_ITEMS) return { ok: false, error: `Máximo ${MAX_ITEMS} renglones.` };
  const items: EntradaCobro["items"] = [];
  for (let i = 0; i < itemsRaw.length; i++) {
    const it = (itemsRaw[i] ?? {}) as Record<string, unknown>;
    const descripcion = limpiar(it.descripcion, 300);
    const detalle = limpiar(it.detalle, 600, true);
    const cantidad = num(it.cantidad);
    const precio = num(it.precio);
    const vacio = !descripcion && (!Number.isFinite(precio) || precio === 0);
    if (vacio && !emitir) continue; // en borrador se ignoran los renglones en blanco
    if (!descripcion) return { ok: false, error: `El renglón ${i + 1} necesita descripción.` };
    if (!Number.isFinite(cantidad) || cantidad <= 0 || cantidad > 100_000) return { ok: false, error: `El renglón ${i + 1} necesita una cantidad mayor a 0.` };
    if (!Number.isFinite(precio) || precio < 0 || precio > MAX_MONTO) return { ok: false, error: `El renglón ${i + 1} tiene un precio inválido.` };
    items.push({ descripcion, detalle, cantidad: Math.round(cantidad * 100) / 100, precio: Math.round(precio * 100) / 100 });
  }
  if (emitir && items.length === 0) return { ok: false, error: "Agrega al menos un renglón para emitir." };

  const enlacesRaw = Array.isArray(r.enlaces) ? r.enlaces : [];
  const enlaces: EntradaCobro["enlaces"] = [];
  for (const e of enlacesRaw.slice(0, MAX_ENLACES)) {
    const x = (e ?? {}) as Record<string, unknown>;
    const rawUrl = limpiar(x.url, 500);
    if (!rawUrl) continue;
    const url = urlHttps(rawUrl);
    if (!url) return { ok: false, error: "Los enlaces deben empezar con https://" };
    const tipoE: TipoEnlace = x.tipo === "pdf" || x.tipo === "imagen" ? x.tipo : "otro";
    enlaces.push({ titulo: limpiar(x.titulo, 120) || "Documento", url, tipo: tipoE });
  }

  const banco = bancoDe(r.banco);
  if (banco.clabe && banco.clabe.length !== 18) return { ok: false, error: "La CLABE debe tener 18 dígitos." };

  return {
    ok: true,
    datos: {
      reunion_id,
      tipo_documento: tipo as TipoDocumento,
      fecha_emision,
      fecha_vencimiento,
      cliente_nombre,
      cliente_email,
      cliente_telefono: limpiar(r.cliente_telefono, 30) || null,
      cliente_direccion: limpiar(r.cliente_direccion, 250) || null,
      cliente_rfc: limpiar(r.cliente_rfc, 13).toUpperCase() || null,
      concepto: limpiar(r.concepto, 400) || null,
      notas: limpiar(r.notas, 1000, true) || null,
      metodo_pago: limpiar(r.metodo_pago, 60) || null,
      descuento_tipo,
      descuento_valor,
      iva_activo: r.iva_activo === true,
      iva_porcentaje,
      items,
      enlaces,
      emisor: emisorDe(r.emisor),
      banco,
      mostrar_banco: r.mostrar_banco !== false,
    },
  };
}

export interface EntradaAbono {
  fecha: string;
  concepto: string;
  metodo: string | null;
  monto: number;
}

export function validarAbono(raw: unknown): R<EntradaAbono> {
  const r = (raw ?? {}) as Record<string, unknown>;
  if (!esFechaYmd(r.fecha)) return { ok: false, error: "Fecha del abono inválida." };
  const monto = num(r.monto);
  if (!Number.isFinite(monto) || monto <= 0) return { ok: false, error: "El monto debe ser mayor a 0." };
  if (monto > MAX_MONTO) return { ok: false, error: "Monto demasiado alto." };
  return {
    ok: true,
    datos: {
      fecha: r.fecha,
      concepto: limpiar(r.concepto, 120) || "Abono",
      metodo: limpiar(r.metodo, 60) || null,
      monto: Math.round(monto * 100) / 100,
    },
  };
}

export function validarAjustes(raw: unknown): R<AjustesCobros> {
  const r = (raw ?? {}) as Record<string, unknown>;
  const banco = bancoDe(r.banco);
  if (banco.clabe && banco.clabe.length !== 18) return { ok: false, error: "La CLABE debe tener 18 dígitos." };
  const iva = r.iva_porcentaje === undefined ? 16 : num(r.iva_porcentaje);
  if (!Number.isFinite(iva) || iva < 0 || iva > 100) return { ok: false, error: "IVA inválido." };
  const dias = r.vence_dias === undefined ? 0 : num(r.vence_dias);
  if (!Number.isFinite(dias) || dias < 0 || dias > 365) return { ok: false, error: "Los días de plazo van de 0 a 365." };
  return {
    ok: true,
    datos: {
      emisor: emisorDe(r.emisor),
      banco,
      iva_activo: r.iva_activo === true,
      iva_porcentaje: iva,
      metodo_pago: limpiar(r.metodo_pago, 60) || "Transferencia bancaria",
      notas: limpiar(r.notas, 1000, true),
      vence_dias: Math.round(dias),
    },
  };
}
