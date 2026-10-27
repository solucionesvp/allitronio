// Pruebas de los cálculos de dinero. Correr:  node scripts/test-cobros.mjs
// (Node 22+: ejecuta TypeScript directo, sin dependencias.)
import test from "node:test";
import assert from "node:assert/strict";
import { calcularTotales, estadoPago, saldoDe, sumarAbonos } from "../src/lib/cobros/calculos.ts";

const base = { descuentoTipo: "porcentaje", descuentoValor: 0, ivaActivo: false, ivaPorcentaje: 16 };

test("suma simple y sin punto flotante (0.1 + 0.2)", () => {
  const t = calcularTotales({ ...base, items: [{ cantidad: 1, precio: 0.1 }, { cantidad: 1, precio: 0.2 }] });
  assert.equal(t.subtotal, 0.3);
  assert.equal(t.total, 0.3);
});

test("cantidad decimal y renglones", () => {
  const t = calcularTotales({ ...base, items: [{ cantidad: 2.5, precio: 100 }, { cantidad: 3, precio: 33.33 }] });
  assert.deepEqual(t.lineas, [250, 99.99]);
  assert.equal(t.subtotal, 349.99);
});

test("descuento por porcentaje + IVA 16%", () => {
  const t = calcularTotales({ items: [{ cantidad: 1, precio: 1000 }], descuentoTipo: "porcentaje", descuentoValor: 10, ivaActivo: true, ivaPorcentaje: 16 });
  assert.equal(t.descuentoMonto, 100);
  assert.equal(t.baseGravable, 900);
  assert.equal(t.ivaMonto, 144);
  assert.equal(t.total, 1044);
});

test("descuento en monto fijo y nunca mayor al subtotal", () => {
  const t = calcularTotales({ items: [{ cantidad: 1, precio: 500 }], descuentoTipo: "monto", descuentoValor: 800, ivaActivo: true, ivaPorcentaje: 16 });
  assert.equal(t.descuentoMonto, 500);
  assert.equal(t.total, 0);
});

test("porcentaje de descuento fuera de rango se acota a 0–100", () => {
  const a = calcularTotales({ items: [{ cantidad: 1, precio: 200 }], descuentoTipo: "porcentaje", descuentoValor: 150, ivaActivo: false, ivaPorcentaje: 0 });
  assert.equal(a.total, 0);
  const b = calcularTotales({ items: [{ cantidad: 1, precio: 200 }], descuentoTipo: "porcentaje", descuentoValor: -10, ivaActivo: false, ivaPorcentaje: 0 });
  assert.equal(b.total, 200);
});

test("redondeo al centavo del IVA", () => {
  const t = calcularTotales({ items: [{ cantidad: 1, precio: 99.99 }], descuentoTipo: "porcentaje", descuentoValor: 0, ivaActivo: true, ivaPorcentaje: 16 });
  assert.equal(t.ivaMonto, 16);
  assert.equal(t.total, 115.99);
});

test("entradas basura no rompen (NaN, infinito)", () => {
  const t = calcularTotales({ items: [{ cantidad: NaN, precio: 10 }, { cantidad: 1, precio: Infinity }], descuentoTipo: "monto", descuentoValor: NaN, ivaActivo: false, ivaPorcentaje: NaN });
  assert.equal(t.total, 0);
});

test("abonos: los anulados no cuentan y el saldo nunca es negativo", () => {
  const abonado = sumarAbonos([{ monto: 500 }, { monto: 250.5 }, { monto: 999, anulado: true }]);
  assert.equal(abonado, 750.5);
  assert.equal(saldoDe(1000, abonado), 249.5);
  assert.equal(saldoDe(100, 150), 0);
});

test("estado de pago se deriva del dinero", () => {
  const hoy = "2026-10-24";
  const e = (o) => estadoPago({ hoy, estado: "emitido", total: 1000, abonado: 0, ...o });
  assert.equal(e({}), "pendiente");
  assert.equal(e({ abonado: 400 }), "parcial");
  assert.equal(e({ abonado: 1000 }), "pagado");
  assert.equal(e({ vencimiento: "2026-10-20" }), "vencido");
  assert.equal(e({ vencimiento: "2026-10-20", abonado: 1000 }), "pagado"); // pagado gana a vencido
  assert.equal(e({ vencimiento: "2026-10-24" }), "pendiente"); // vence hoy: aún no vencido
  assert.equal(e({ estado: "borrador" }), "borrador");
  assert.equal(e({ estado: "cancelado" }), "cancelado");
  assert.equal(e({ total: 0 }), "pendiente"); // total 0 nunca cuenta como pagado
});
