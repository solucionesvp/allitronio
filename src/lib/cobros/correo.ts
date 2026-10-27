// ── Correo del sistema de cobros — firmado por Aurora IA ────────────────────
// Mismo criterio que los correos de reuniones: tablas + estilos en línea, todo
// dato dinámico pasa por esc() y siempre hay versión de texto plano.

import { MARCA, SITE_URL } from "@/lib/reuniones/config";
import { esc } from "@/lib/reuniones/correos";
import { pesos, ETIQUETA_ESTADO } from "./calculos";
import { fechaYmd } from "./formato";
import { folioDe, type CobroCompleto } from "./types";

export type TipoCorreoCobro = "comprobante" | "abono";

const C = { navy: "#034058", azul: "#09AFF2", naranja: "#F2874C", tinta: "#101820", gris: "#626D76", linea: "#E3E8E6", fondo: "#F4F6F5" };

function fila(et: string, valor: string, fuerte = false): string {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.gris};width:130px;vertical-align:top;">${esc(et)}</td>
    <td style="padding:9px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:${fuerte ? 17 : 15}px;font-weight:${fuerte ? 800 : 400};line-height:1.5;color:${C.tinta};">${valor}</td>
  </tr>`;
}

export function correoCobro(c: CobroCompleto, tipo: TipoCorreoCobro, url: string): { asunto: string; html: string; texto: string } {
  const folio = folioDe(c.folio_num);
  const ultimo = c.abonos.filter((a) => !a.anulado_en).at(-1);
  const emisor = c.emisor.nombre || MARCA.nombre;
  const pagado = c.estado_pago === "pagado";

  const asunto =
    tipo === "abono"
      ? pagado
        ? `Pago completo recibido · ${folio} · ${emisor}`
        : `Recibimos tu pago · ${folio} · ${emisor}`
      : `Tu comprobante ${folio} · ${emisor}`;

  const titulo =
    tipo === "abono"
      ? pagado
        ? "Tu cuenta quedó liquidada"
        : "Recibimos tu pago"
      : "Aquí está tu comprobante";
  const intro =
    tipo === "abono" && ultimo
      ? `Registramos tu pago de ${pesos(ultimo.monto)}. Gracias.`
      : `Te compartimos el detalle de ${c.concepto ? `«${c.concepto}»` : "tu cobro"}. Puedes verlo, imprimirlo o guardarlo como PDF desde el botón.`;

  const mostrarBanco = c.mostrar_banco && c.saldo > 0 && (c.banco.clabe || c.banco.cuenta);
  const bancoHtml = mostrarBanco
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;background:${C.fondo};border-radius:8px;"><tr><td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${C.tinta};">
      ${c.banco.beneficiario ? `${esc(c.banco.beneficiario)}<br>` : ""}${c.banco.banco ? `${esc(c.banco.banco)}<br>` : ""}${c.banco.clabe ? `CLABE: <strong>${esc(c.banco.clabe)}</strong><br>` : ""}${c.banco.cuenta ? `Cuenta: ${esc(c.banco.cuenta)}` : ""}
    </td></tr></table>`
    : "";

  const imagen = `${SITE_URL}/assets/cobros/${pagado ? "alli-confirmada" : "alli-carta"}.jpg`;
  const abonosVivos = c.abonos.filter((a) => !a.anulado_en);
  const h = (t: string) => `<div style="margin:26px 0 8px;padding-bottom:6px;border-bottom:2px solid ${C.naranja};font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.navy};">${esc(t)}</div>`;

  const productosHtml = c.items
    .map(
      (i) => `<tr><td style="padding:10px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${C.tinta};"><strong>${esc(i.descripcion)}</strong>${i.cantidad !== 1 ? ` <span style="color:${C.gris};">× ${esc(String(i.cantidad))}</span>` : ""}${i.detalle ? `<div style="margin-top:3px;font-size:13px;color:${C.gris};white-space:pre-line;"><strong>Qué incluye:</strong> ${esc(i.detalle)}</div>` : ""}</td><td align="right" style="padding:10px 0 10px 12px;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${C.tinta};white-space:nowrap;vertical-align:top;">${esc(pesos(Math.round(i.cantidad * i.precio * 100) / 100))}</td></tr>`
    )
    .join("");
  const pagosHtml = abonosVivos.length
    ? abonosVivos
        .map((a) => `<tr><td style="padding:8px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${C.tinta};">${esc(a.concepto)} <span style="color:${C.gris};">· ${esc(fechaYmd(a.fecha))}</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#047857;">${esc(pesos(a.monto))}</td></tr>`)
        .join("")
    : `<tr><td style="padding:8px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${C.gris};">Aún no hay pagos registrados.</td></tr>`;

  const html = `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:${C.fondo};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.fondo};"><tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#FFFFFF;border-radius:14px;overflow:hidden;">
      <tr><td style="background:${C.navy};border-bottom:4px solid ${C.naranja};padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="padding:24px 8px 24px 28px;font-family:Arial,Helvetica,sans-serif;vertical-align:middle;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9FD8EE;">${esc(emisor)} · ${esc(folio)}</div>
            <div style="margin-top:8px;font-size:25px;line-height:1.15;font-weight:800;color:#FFFFFF;">${esc(titulo)}</div>
          </td>
          <td width="132" style="padding:0;vertical-align:bottom;"><img src="${esc(imagen)}" width="132" alt="Alli" style="display:block;width:132px;height:auto;border:0;"></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:26px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${C.tinta};">
        <p style="margin:0 0 14px;">Hola ${esc(c.cliente_nombre)},</p>
        <p style="margin:0;">${esc(intro)}</p>
        ${h("Qué estás comprando")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${productosHtml}</table>
        ${h("Tu cuenta")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${fila("Total", esc(pesos(c.total)))}
          ${fila("Pagado", esc(pesos(c.abonado)))}
          ${fila("Saldo", esc(pesos(c.saldo)), true)}
          ${fila("Estado", esc(ETIQUETA_ESTADO[c.estado_pago]))}
          ${c.fecha_vencimiento && c.saldo > 0 ? fila("Fecha límite", esc(fechaYmd(c.fecha_vencimiento))) : ""}
        </table>
        ${h("Lo que ya pagaste")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${pagosHtml}</table>
        ${mostrarBanco ? h("Cómo pagar") : ""}
        ${bancoHtml}
        <p style="margin:26px 0 0;text-align:center;"><a href="${esc(url)}" style="display:inline-block;background:${C.navy};color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:6px;">Ver mi comprobante</a></p>
        <p style="margin:14px 0 0;text-align:center;font-size:13px;color:${C.gris};">Va adjunto el PDF. También puedes descargarlo desde el enlace.</p>
        <p style="margin:22px 0 0;font-size:13px;color:${C.gris};">Si algo no coincide, responde este correo y lo revisamos.</p>
      </td></tr>
      <tr><td style="padding:16px 28px;background:${C.fondo};font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${C.gris};">${esc(MARCA.asistente)} · ${esc(MARCA.rolAsistente)} · ${esc(MARCA.ciudad)}</td></tr>
    </table>
  </td></tr></table></body></html>`;

  const texto = [
    `${titulo} — ${folio}`,
    "",
    `Hola ${c.cliente_nombre},`,
    intro,
    "",
    "QUÉ ESTÁS COMPRANDO",
    ...c.items.map((i) => `- ${i.descripcion}${i.cantidad !== 1 ? ` x${i.cantidad}` : ""}: ${pesos(Math.round(i.cantidad * i.precio * 100) / 100)}${i.detalle ? `\n  Qué incluye: ${i.detalle}` : ""}`),
    "",
    "TU CUENTA",
    `Total: ${pesos(c.total)}`,
    `Pagado: ${pesos(c.abonado)}`,
    `Saldo: ${pesos(c.saldo)}`,
    `Estado: ${ETIQUETA_ESTADO[c.estado_pago]}`,
    mostrarBanco ? `\nCÓMO PAGAR: ${[c.banco.beneficiario, c.banco.banco, c.banco.clabe && `CLABE ${c.banco.clabe}`, c.banco.cuenta && `Cuenta ${c.banco.cuenta}`].filter(Boolean).join(" · ")}` : "",
    "",
    `Ver comprobante: ${url}`,
    "",
    `${MARCA.asistente} · ${MARCA.rolAsistente}`,
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");

  return { asunto, html, texto };
}
