// ── Cálculos de dinero del sistema de cobros ────────────────────────────────
// Función pura y SIN dependencias (se prueba con `node scripts/test-cobros.mjs`).
// Todo se calcula en centavos enteros para que nunca haya errores de punto
// flotante (0.1 + 0.2). El servidor es la única fuente de verdad: lo que mande
// el navegador solo se usa como entrada, nunca como total.

export type DescuentoTipo = "porcentaje" | "monto";

export interface LineaEntrada {
  cantidad: number;
  precio: number;
}

export interface EntradaTotales {
  items: LineaEntrada[];
  descuentoTipo: DescuentoTipo;
  descuentoValor: number;
  ivaActivo: boolean;
  ivaPorcentaje: number;
}

export interface Totales {
  /** Total de cada renglón, en pesos. */
  lineas: number[];
  subtotal: number;
  descuentoMonto: number;
  baseGravable: number;
  ivaMonto: number;
  total: number;
}

const aCent = (n: number): number => Math.round((Number.isFinite(n) ? n : 0) * 100);
const aPesos = (c: number): number => c / 100;

export function redondear(n: number): number {
  return aPesos(aCent(n));
}

export function calcularTotales(e: EntradaTotales): Totales {
  const lineasC = e.items.map((i) => {
    const cantC = aCent(i.cantidad); // cantidad con 2 decimales, ×100
    const precioC = aCent(i.precio);
    return Math.round((cantC * precioC) / 100);
  });
  const subtotalC = lineasC.reduce((a, b) => a + b, 0);

  let descuentoC = 0;
  if (e.descuentoTipo === "porcentaje") {
    const pct = Math.min(10000, Math.max(0, aCent(e.descuentoValor))); // porcentaje ×100
    descuentoC = Math.round((subtotalC * pct) / 10000);
  } else {
    descuentoC = Math.max(0, aCent(e.descuentoValor));
  }
  descuentoC = Math.min(descuentoC, subtotalC); // nunca más que el subtotal

  const baseC = subtotalC - descuentoC;
  const ivaPct = Math.min(10000, Math.max(0, aCent(e.ivaPorcentaje)));
  const ivaC = e.ivaActivo ? Math.round((baseC * ivaPct) / 10000) : 0;

  return {
    lineas: lineasC.map(aPesos),
    subtotal: aPesos(subtotalC),
    descuentoMonto: aPesos(descuentoC),
    baseGravable: aPesos(baseC),
    ivaMonto: aPesos(ivaC),
    total: aPesos(baseC + ivaC),
  };
}

/** Suma de abonos vigentes (los anulados no cuentan). */
export function sumarAbonos(abonos: { monto: number; anulado?: boolean }[]): number {
  return aPesos(abonos.filter((a) => !a.anulado).reduce((s, a) => s + aCent(a.monto), 0));
}

export function saldoDe(total: number, abonado: number): number {
  return aPesos(Math.max(0, aCent(total) - aCent(abonado)));
}

export type EstadoPago = "borrador" | "cancelado" | "pagado" | "parcial" | "vencido" | "pendiente";

/**
 * Estado de cobro que ve el equipo y el cliente. Se DERIVA de los abonos; nadie
 * lo marca a mano, así no puede quedar "pagado" sin que el dinero cuadre.
 * `hoy` y `vencimiento` son fechas YYYY-MM-DD (hora de Tepic).
 */
export function estadoPago(p: {
  estado: "borrador" | "emitido" | "cancelado";
  total: number;
  abonado: number;
  vencimiento?: string | null;
  hoy: string;
}): EstadoPago {
  if (p.estado === "borrador") return "borrador";
  if (p.estado === "cancelado") return "cancelado";
  const total = aCent(p.total);
  const abonado = aCent(p.abonado);
  if (total > 0 && abonado >= total) return "pagado";
  if (p.vencimiento && p.vencimiento < p.hoy) return "vencido";
  if (abonado > 0) return "parcial";
  return "pendiente";
}

export const ETIQUETA_ESTADO: Record<EstadoPago, string> = {
  borrador: "Borrador",
  cancelado: "Cancelado",
  pagado: "Pagado",
  parcial: "Pago parcial",
  vencido: "Vencido",
  pendiente: "Pendiente de pago",
};

export function pesos(n: number): string {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(Number.isFinite(n) ? n : 0);
}
