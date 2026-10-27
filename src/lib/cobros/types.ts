import type { DescuentoTipo, EstadoPago } from "./calculos";

export type EstadoCobro = "borrador" | "emitido" | "cancelado";
export type TipoDocumento = "nota" | "recibo" | "factura";
export type TipoEnlace = "pdf" | "imagen" | "otro";

export interface Emisor {
  nombre: string;
  logo_url: string;
  email: string;
  telefono: string;
  web: string;
  direccion: string;
}

export interface Banco {
  banco: string;
  beneficiario: string;
  cuenta: string;
  clabe: string;
}

export interface CobroItem {
  id?: string;
  descripcion: string;
  /** Qué incluye / qué se entrega (se muestra al cliente). */
  detalle?: string | null;
  cantidad: number;
  precio: number;
}

export interface CobroEnlace {
  id?: string;
  titulo: string;
  url: string;
  tipo: TipoEnlace;
}

export interface CobroAbono {
  id: string;
  cobro_id: string;
  fecha: string;
  concepto: string;
  metodo: string | null;
  monto: number;
  anulado_en: string | null;
  anulado_por: string | null;
  motivo_anulacion: string | null;
  creado_por: string | null;
  creado_en: string;
}

export interface CobroEvento {
  id: number;
  tipo: string;
  detalle: Record<string, unknown>;
  persona: string | null;
  creado_en: string;
}

/** Un intento de correo (de `email_log`). */
export interface EnvioCobro {
  id: string;
  tipo: string;
  destinatarios: string[];
  estado: "enviado" | "error";
  error: string | null;
  creado_en: string;
}

/** Fila de la tabla `cobros`. */
export interface Cobro {
  id: string;
  folio_num: number;
  cuenta_id: string;
  token: string;
  reunion_id: string | null;
  estado: EstadoCobro;
  tipo_documento: TipoDocumento;
  fecha_emision: string;
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
  subtotal: number;
  descuento_monto: number;
  iva_monto: number;
  total: number;
  emisor: Partial<Emisor>;
  banco: Partial<Banco>;
  mostrar_banco: boolean;
  creado_por: string | null;
  creado_en: string;
  actualizado_en: string;
}

export interface CobroCompleto extends Cobro {
  items: CobroItem[];
  enlaces: CobroEnlace[];
  abonos: CobroAbono[];
  eventos?: CobroEvento[];
  /** Historial de correos (solo en el panel). */
  envios?: EnvioCobro[];
  /** Derivados (nunca se guardan). */
  abonado: number;
  saldo: number;
  estado_pago: EstadoPago;
}

/** Renglón de la lista del panel. */
export interface ResumenCobro extends Cobro {
  /** Último correo del cobro (null = nunca se ha enviado). */
  ultimo_envio: { estado: "enviado" | "error"; creado_en: string } | null;
  abonado: number;
  saldo: number;
  estado_pago: EstadoPago;
  folio: string;
}

export interface AjustesCobros {
  emisor: Emisor;
  banco: Banco;
  iva_activo: boolean;
  iva_porcentaje: number;
  metodo_pago: string;
  notas: string;
  /** Días de plazo por defecto para la fecha de vencimiento (0 = sin vencimiento). */
  vence_dias: number;
}

export function folioDe(n: number): string {
  return `ALL-${String(n).padStart(4, "0")}`;
}
