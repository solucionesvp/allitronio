import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { ETIQUETA_ESTADO, pesos } from "./calculos";
import { fechaYmd } from "./formato";
import { ALLI_CARTA_JPG, ALLI_CONFIRMADA_JPG } from "./alli-assets";
import { folioDe, type CobroCompleto } from "./types";

// PDF del comprobante generado en el servidor (pdf-lib, JS puro: sin navegador,
// sin binarios). Se usa en la descarga pública (/cobros/<token>/pdf) y como
// adjunto del correo, así pantalla, PDF y correo salen siempre de los mismos datos.

type Color = ReturnType<typeof rgb>;
const NAVY = rgb(0x03 / 255, 0x40 / 255, 0x58 / 255);
const AZUL = rgb(0x09 / 255, 0xaf / 255, 0xf2 / 255);
const NARANJA = rgb(0xb4 / 255, 0x54 / 255, 0x1b / 255);
const VERDE = rgb(0x04 / 255, 0x78 / 255, 0x57 / 255);
const TINTA = rgb(0x10 / 255, 0x18 / 255, 0x20 / 255);
const GRIS = rgb(0x4a / 255, 0x60 / 255, 0x70 / 255);
const LINEA = rgb(0.88, 0.9, 0.92);
const FONDO = rgb(0.95, 0.97, 0.98);
const NARANJA_MARCA = rgb(0xf2 / 255, 0x87 / 255, 0x4c / 255);

const A4 = { w: 595.28, h: 841.89 };
const M = 44;
const ANCHO = A4.w - M * 2;

/** Las fuentes estándar solo codifican WinAnsi: lo demás (emoji, etc.) se reemplaza. */
function limpiar(font: PDFFont, s: string): string {
  const set = new Set(font.getCharacterSet());
  let out = "";
  for (const ch of s.normalize("NFC").replace(/[\r\t]/g, " ")) {
    const cp = ch.codePointAt(0)!;
    if (ch === "\n") out += "\n";
    else if (set.has(cp)) out += ch;
    else out += cp === 0x2212 ? "-" : "?";
  }
  return out;
}

function partir(font: PDFFont, texto: string, size: number, ancho: number): string[] {
  const lineas: string[] = [];
  for (const parrafo of texto.split("\n")) {
    let actual = "";
    for (const palabra of parrafo.split(" ")) {
      let p = palabra;
      while (font.widthOfTextAtSize(p, size) > ancho) {
        let n = p.length;
        while (n > 1 && font.widthOfTextAtSize(p.slice(0, n), size) > ancho) n--;
        if (actual) { lineas.push(actual); actual = ""; }
        lineas.push(p.slice(0, n));
        p = p.slice(n);
      }
      const prueba = actual ? `${actual} ${p}` : p;
      if (font.widthOfTextAtSize(prueba, size) <= ancho) actual = prueba;
      else { lineas.push(actual); actual = p; }
    }
    lineas.push(actual);
  }
  return lineas;
}

export async function generarPdfCobro(c: CobroCompleto, urlPublica: string): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const neg = await pdf.embedFont(StandardFonts.HelveticaBold);
  const folio = folioDe(c.folio_num);
  const emisor = c.emisor.nombre || "Allitron";
  pdf.setTitle(`Comprobante ${folio}`);
  pdf.setAuthor(limpiar(reg, emisor));
  pdf.setCreator("Allitron");

  let page: PDFPage = pdf.addPage([A4.w, A4.h]);
  let y = A4.h;

  type Op = { size?: number; bold?: boolean; color?: Color; derecha?: boolean };
  const texto = (s: string, x: number, yy: number, o: Op = {}) => {
    const font = o.bold ? neg : reg;
    const size = o.size ?? 10;
    const str = limpiar(font, s);
    page.drawText(str, { x: o.derecha ? x - font.widthOfTextAtSize(str, size) : x, y: yy, size, font, color: o.color ?? TINTA });
  };
  const nuevaPagina = () => { page = pdf.addPage([A4.w, A4.h]); y = A4.h - M; };
  const asegurar = (alto: number) => { if (y - alto < M + 30) nuevaPagina(); };
  const parrafo = (s: string, x: number, ancho: number, o: Op & { lead?: number } = {}) => {
    const size = o.size ?? 10;
    const lead = o.lead ?? size * 1.45;
    const font = o.bold ? neg : reg;
    for (const l of partir(font, limpiar(font, s), size, ancho)) {
      asegurar(lead);
      texto(l, x, y - size, o);
      y -= lead;
    }
  };

  const alli = await pdf.embedJpg(Buffer.from(c.estado_pago === "pagado" ? ALLI_CONFIRMADA_JPG : ALLI_CARTA_JPG, "base64"));

  // ── Encabezado con identidad Allitron + Alli ──
  const altoCab = 128;
  page.drawRectangle({ x: 0, y: A4.h - altoCab, width: A4.w, height: altoCab, color: NAVY });
  page.drawRectangle({ x: 0, y: A4.h - altoCab - 4, width: A4.w, height: 4, color: NARANJA_MARCA });
  const altoImg = altoCab;
  const anchoImg = (alli.width / alli.height) * altoImg;
  page.drawImage(alli, { x: A4.w - anchoImg, y: A4.h - altoCab, width: anchoImg, height: altoImg });
  const tipo = c.tipo_documento === "recibo" ? "Recibo de pago" : c.tipo_documento === "factura" ? "Comprobante" : "Nota de cobro";
  texto("ALLITRON  ·  COMPROBANTE DE COBRO", M, A4.h - 30, { size: 8, bold: true, color: rgb(0.62, 0.85, 0.93) });
  texto(tipo, M, A4.h - 60, { size: 24, bold: true, color: rgb(1, 1, 1) });
  texto(`Emitido por ${emisor}`, M, A4.h - 80, { size: 10.5, color: rgb(0.85, 0.92, 0.95) });
  texto([c.emisor.email, c.emisor.telefono].filter(Boolean).join("  ·  "), M, A4.h - 95, { size: 9, color: rgb(0.7, 0.82, 0.88) });
  const xFolio = A4.w - anchoImg - 18;
  texto("FOLIO", xFolio, A4.h - 30, { size: 8, bold: true, color: rgb(0.62, 0.85, 0.93), derecha: true });
  texto(folio, xFolio, A4.h - 52, { size: 17, bold: true, color: rgb(1, 1, 1), derecha: true });
  texto(fechaYmd(c.fecha_emision), xFolio, A4.h - 70, { size: 9, color: rgb(0.85, 0.92, 0.95), derecha: true });
  y = A4.h - altoCab - 26;

  // ── Estado en una frase ──
  const cancelado = c.estado === "cancelado";
  const colorEstado = c.estado_pago === "pagado" ? VERDE : c.estado_pago === "vencido" ? NARANJA : c.estado_pago === "parcial" ? NAVY : GRIS;
  texto(ETIQUETA_ESTADO[c.estado_pago].toUpperCase(), M, y - 11, { size: 13, bold: true, color: colorEstado });
  const frase = cancelado
    ? "Este documento fue cancelado y ya no requiere pago."
    : c.saldo <= 0
      ? "Pagado en su totalidad. ¡Gracias por tu confianza!"
      : `Falta por pagar ${pesos(c.saldo)}${c.fecha_vencimiento ? ` · fecha límite ${fechaYmd(c.fecha_vencimiento)}` : ""}.`;
  texto(frase, A4.w - M, y - 11, { size: 10, color: GRIS, derecha: true });
  y -= 36;

  // Títulos de sección numerados: así se sabe qué es cada bloque.
  let nSec = 0;
  const seccion = (titulo: string, sub?: string) => {
    asegurar(54);
    nSec += 1;
    page.drawCircle({ x: M + 9, y: y - 9, size: 9, color: NARANJA_MARCA });
    texto(String(nSec), M + 9 - neg.widthOfTextAtSize(String(nSec), 9.5) / 2, y - 12.3, { size: 9.5, bold: true, color: rgb(1, 1, 1) });
    texto(titulo, M + 26, y - 13, { size: 12.5, bold: true, color: NAVY });
    y -= 24;
    if (sub) { parrafo(sub, M + 26, ANCHO - 26, { size: 9, color: GRIS }); y -= 2; }
    page.drawLine({ start: { x: M, y: y + 1 }, end: { x: M + ANCHO, y: y + 1 }, thickness: 0.6, color: LINEA });
    y -= 10;
  };

  // ── 1 · Para quién y por qué ──
  seccion("Para quién y por qué concepto");
  const colAncho = (ANCHO - 20) / 2;
  const yBloque = y;
  texto("CLIENTE", M, y - 8, { size: 8, bold: true, color: GRIS });
  y -= 18;
  parrafo(c.cliente_nombre, M, colAncho, { size: 13, bold: true });
  const sub1 = [c.cliente_email, c.cliente_telefono, c.cliente_rfc && `RFC ${c.cliente_rfc}`].filter(Boolean).join("  ·  ");
  if (sub1) parrafo(sub1, M, colAncho, { size: 9, color: GRIS });
  if (c.cliente_direccion) parrafo(c.cliente_direccion, M, colAncho, { size: 9, color: GRIS });
  const yIzq = y;
  if (c.concepto) {
    y = yBloque;
    texto("CONCEPTO GENERAL", M + colAncho + 20, y - 8, { size: 8, bold: true, color: GRIS });
    y -= 18;
    parrafo(c.concepto, M + colAncho + 20, colAncho, { size: 10 });
    if (c.metodo_pago) parrafo(`Método de pago: ${c.metodo_pago}`, M + colAncho + 20, colAncho, { size: 9, color: GRIS });
    y = Math.min(y, yIzq);
  }
  y -= 18;

  // ── 2 · Qué estás comprando ──
  seccion("Qué estás comprando", "Cada producto o servicio con lo que incluye y lo que se te entrega.");
  const cx = { cant: M + ANCHO - 170, precio: M + ANCHO - 90, total: M + ANCHO };
  const cabTabla = () => {
    asegurar(40);
    page.drawRectangle({ x: M, y: y - 22, width: ANCHO, height: 22, color: FONDO });
    texto("PRODUCTO O SERVICIO", M + 8, y - 15, { size: 8, bold: true, color: GRIS });
    texto("CANT.", cx.cant, y - 15, { size: 8, bold: true, color: GRIS, derecha: true });
    texto("PRECIO", cx.precio, y - 15, { size: 8, bold: true, color: GRIS, derecha: true });
    texto("IMPORTE", cx.total - 8, y - 15, { size: 8, bold: true, color: GRIS, derecha: true });
    y -= 22;
  };
  cabTabla();
  const anchoDesc = cx.cant - M - 60;
  for (const it of c.items) {
    const lineas = partir(neg, limpiar(neg, it.descripcion), 10.5, anchoDesc);
    const det = it.detalle ? partir(reg, limpiar(reg, `Qué incluye: ${it.detalle}`), 8.8, anchoDesc) : [];
    const alto = lineas.length * 14 + det.length * 12 + 14;
    if (y - alto < M + 30) { nuevaPagina(); cabTabla(); }
    lineas.forEach((l, i) => texto(l, M + 8, y - 16 - i * 14, { size: 10.5, bold: true }));
    det.forEach((l, i) => texto(l, M + 8, y - 16 - lineas.length * 14 - 1 - i * 12, { size: 8.8, color: GRIS }));
    texto(String(it.cantidad), cx.cant, y - 16, { size: 10, derecha: true });
    texto(pesos(it.precio), cx.precio, y - 16, { size: 10, derecha: true });
    texto(pesos(Math.round(it.cantidad * it.precio * 100) / 100), cx.total - 8, y - 16, { size: 10, bold: true, derecha: true });
    y -= alto;
    page.drawLine({ start: { x: M, y }, end: { x: M + ANCHO, y }, thickness: 0.5, color: LINEA });
  }
  y -= 20;

  // ── 3 · Resumen del cobro ──
  seccion("Resumen del cobro");
  const tx = M + ANCHO - 250;
  const fila = (k: string, v: string, o: { bold?: boolean; color?: Color; size?: number } = {}) => {
    asegurar(20);
    texto(k, tx, y - 12, { size: o.size ?? 10, bold: o.bold, color: o.bold ? TINTA : GRIS });
    texto(v, M + ANCHO, y - 12, { size: o.size ?? 10, bold: o.bold, color: o.color ?? TINTA, derecha: true });
    y -= 19;
  };
  fila("Subtotal", pesos(c.subtotal));
  if (c.descuento_monto > 0) fila("Descuento", `-${pesos(c.descuento_monto)}`);
  if (c.iva_monto > 0) fila(`IVA (${c.iva_porcentaje}%)`, `+${pesos(c.iva_monto)}`);
  page.drawLine({ start: { x: tx, y: y + 3 }, end: { x: M + ANCHO, y: y + 3 }, thickness: 0.8, color: LINEA });
  fila("Total del cobro", pesos(c.total), { bold: true, size: 12 });
  fila("Pagado a la fecha", pesos(c.abonado), { color: VERDE, bold: true });
  y -= 14;

  // ── 4 · Lo que ya pagaste ──
  const abonos = c.abonos.filter((a) => !a.anulado_en);
  seccion("Lo que ya pagaste", "Cada pago que hemos recibido y registrado.");
  if (abonos.length === 0) parrafo("Aún no hay pagos registrados.", M, ANCHO, { size: 10, color: GRIS });
  for (const a of abonos) {
    asegurar(20);
    texto(`${a.concepto}  ·  ${fechaYmd(a.fecha)}${a.metodo ? `  ·  ${a.metodo}` : ""}`, M, y - 11, { size: 10 });
    texto(pesos(a.monto), M + ANCHO, y - 11, { size: 10, bold: true, color: VERDE, derecha: true });
    y -= 18;
  }
  y -= 14;

  // ── 5 · Lo que falta y cómo pagarlo ──
  seccion(cancelado || c.saldo <= 0 ? "Estado de tu cuenta" : "Lo que falta y cómo pagarlo");
  const saldoMostrado = cancelado ? 0 : c.saldo;
  asegurar(40);
  page.drawRectangle({ x: M, y: y - 40, width: ANCHO, height: 40, color: saldoMostrado > 0 ? rgb(1, 0.96, 0.92) : rgb(0.93, 0.98, 0.95) });
  texto(saldoMostrado > 0 ? "SALDO POR PAGAR" : "SALDO", M + 14, y - 24, { size: 9, bold: true, color: GRIS });
  texto(pesos(saldoMostrado), M + ANCHO - 14, y - 27, { size: 18, bold: true, color: saldoMostrado > 0 ? NARANJA : VERDE, derecha: true });
  y -= 54;
  const mostrarBanco = c.mostrar_banco && !cancelado && c.saldo > 0 && Boolean(c.banco.clabe || c.banco.cuenta);
  if (mostrarBanco) {
    const filas: [string, string][] = [];
    if (c.banco.beneficiario) filas.push(["Beneficiario", c.banco.beneficiario]);
    if (c.banco.banco) filas.push(["Banco", c.banco.banco]);
    if (c.banco.clabe) filas.push(["CLABE interbancaria", c.banco.clabe]);
    if (c.banco.cuenta) filas.push(["Cuenta / tarjeta", c.banco.cuenta]);
    const alto = 40 + filas.length * 17 + 20;
    asegurar(alto);
    page.drawRectangle({ x: M, y: y - alto, width: ANCHO, height: alto, color: FONDO, borderColor: AZUL, borderWidth: 1 });
    texto("DATOS PARA TRANSFERIR", M + 14, y - 20, { size: 8, bold: true, color: NAVY });
    filas.forEach(([k, v], i) => {
      texto(k, M + 14, y - 38 - i * 17, { size: 9, color: GRIS });
      texto(v, M + 150, y - 38 - i * 17, { size: 10, bold: true });
    });
    texto(`Usa el folio ${folio} como referencia y avísanos cuando hagas tu pago.`, M + 14, y - alto + 12, { size: 8.5, color: GRIS });
    y -= alto + 14;
  }

  // ── Notas y documentos ──
  if (c.notas) {
    seccion("Notas");
    parrafo(c.notas, M, ANCHO, { size: 10 });
    y -= 8;
  }
  if (c.enlaces.length) {
    seccion("Documentos relacionados");
    for (const e of c.enlaces) {
      parrafo(e.titulo, M, ANCHO, { size: 10, bold: true });
      parrafo(e.url, M, ANCHO, { size: 8.5, color: AZUL });
      y -= 3;
    }
  }
  y -= 6;
  const contacto = [c.emisor.email, c.emisor.telefono].filter(Boolean).join(" o ");
  if (contacto) parrafo(`¿Dudas sobre este comprobante? Escríbenos a ${contacto}. — Alli y el equipo de ${emisor}`, M, ANCHO, { size: 9, color: GRIS });

  // Pie en cada página
  const pie = [emisor, c.emisor.direccion, c.emisor.web?.replace(/^https:\/\//, "")].filter(Boolean).join("  ·  ");
  const paginas = pdf.getPages();
  paginas.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: M + 14 }, end: { x: A4.w - M, y: M + 14 }, thickness: 0.5, color: LINEA });
    p.drawText(limpiar(reg, pie).slice(0, 110), { x: M, y: M, size: 8, font: reg, color: GRIS });
    const num = `${folio}  ·  ${i + 1}/${paginas.length}`;
    p.drawText(num, { x: A4.w - M - reg.widthOfTextAtSize(num, 8), y: M, size: 8, font: reg, color: GRIS });
    if (i === paginas.length - 1) p.drawText(limpiar(reg, `Comprobante en línea: ${urlPublica}`).slice(0, 120), { x: M, y: M - 12, size: 7.5, font: reg, color: GRIS });
  });

  return pdf.save();
}
