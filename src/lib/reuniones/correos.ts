// ── Correos del sistema de reuniones — firmados por Aurora IA ────────────────
// Cada plantilla devuelve asunto, HTML (tablas + estilos en línea: es lo único
// que funciona parejo en Gmail, Outlook y Apple Mail) y versión de texto plano.
// TODO dato dinámico pasa por esc(): el cliente escribe nombre, empresa y notas.

import { MARCA, SITE_URL, ZONA_OFICINA } from "./config";
import { enlaceGoogleCalendar, enlaceMicrosoft365, enlaceOutlook } from "./ics";
import { enlaceMaps, enlaceWhatsapp, eventoDe, ubicacion, urlGestion, urlIcs, urlReagendar } from "./evento";
import { etiquetaZona, formatoFecha, formatoHora } from "./tz";
import type { Anfitrion, Oficina, Reunion } from "./types";

export interface ContextoCorreo {
  reunion: Reunion;
  anfitrion: Anfitrion;
  oficina: Oficina;
  productoSlug?: string;
}

export interface CorreoListo {
  asunto: string;
  html: string;
  texto: string;
}

const C = {
  navy: "#034058",
  azul: "#09AFF2",
  naranja: "#F2874C",
  tinta: "#101820",
  gris: "#626D76",
  linea: "#E3E8E6",
  fondo: "#F4F6F5",
};

export function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Piezas ──────────────────────────────────────────────────────────────────

function boton(href: string, texto: string, estilo: "primario" | "secundario" = "primario"): string {
  const bg = estilo === "primario" ? C.navy : "#FFFFFF";
  const color = estilo === "primario" ? "#FFFFFF" : C.navy;
  const borde = estilo === "primario" ? C.navy : C.navy;
  return `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${color};border:1.5px solid ${borde};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;padding:13px 24px;border-radius:6px;">${esc(texto)}</a>`;
}

function filaDato(etiqueta: string, valorHtml: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.gris};width:112px;vertical-align:top;">${esc(etiqueta)}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${C.tinta};vertical-align:top;">${valorHtml}</td>
  </tr>`;
}

function botonesCalendario(ctx: ContextoCorreo): string {
  const ev = eventoDe(ctx.reunion, ctx.anfitrion, ctx.oficina);
  const link = (href: string, t: string) =>
    `<a href="${esc(href)}" style="color:${C.navy};font-weight:700;text-decoration:underline;">${esc(t)}</a>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;background:${C.fondo};border-radius:8px;">
    <tr><td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.gris};margin-bottom:10px;">Agrégala a tu calendario</div>
      <div style="font-size:14px;line-height:2;color:${C.tinta};">
        ${link(enlaceGoogleCalendar(ev), "Google Calendar")} &nbsp;·&nbsp;
        ${link(enlaceOutlook(ev), "Outlook")} &nbsp;·&nbsp;
        ${link(enlaceMicrosoft365(ev), "Microsoft 365")} &nbsp;·&nbsp;
        ${link(urlIcs(ctx.reunion.token), "Apple y otros (.ics)")}
      </div>
      <div style="font-size:12px;color:${C.gris};margin-top:6px;">También va adjunto el archivo .ics: ábrelo y se agrega solo.</div>
    </td></tr></table>`;
}

function plantilla(opts: { preheader: string; titulo: string; subtitulo?: string; cuerpo: string }): string {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(opts.titulo)}</title></head>
<body style="margin:0;padding:0;background:${C.fondo};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.fondo};"><tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#FFFFFF;border-radius:10px;overflow:hidden;border:1px solid ${C.linea};">
    <tr><td style="background:${C.navy};padding:22px 32px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.38em;color:#FFFFFF;">ALLITRON</td></tr>
    <tr><td style="height:3px;background:${C.azul};font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="padding:34px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
      <h1 style="margin:0;font-size:26px;line-height:1.2;color:${C.tinta};font-weight:800;">${esc(opts.titulo)}</h1>
      ${opts.subtitulo ? `<p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:${C.gris};">${opts.subtitulo}</p>` : ""}
    </td></tr>
    <tr><td style="padding:18px 32px 34px;font-family:Arial,Helvetica,sans-serif;">${opts.cuerpo}</td></tr>
    <tr><td style="padding:22px 32px;background:${C.fondo};border-top:1px solid ${C.linea};font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:15px;font-weight:800;color:${C.tinta};">${esc(MARCA.asistente)}</div>
      <div style="font-size:13px;color:${C.gris};margin-top:2px;">${esc(MARCA.rolAsistente)}</div>
      <div style="font-size:12px;line-height:1.6;color:${C.gris};margin-top:12px;">Este mensaje lo envió ${esc(MARCA.asistente)}. Si respondes a este correo, lo lee el equipo de Allitron.<br>${esc(MARCA.nombre)} · ${esc(MARCA.ciudad)} · <a href="${SITE_URL}/aviso-de-privacidad" style="color:${C.gris};">Aviso de privacidad</a></div>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

/** Hora para el cliente en su zona; si difiere de Tepic, agrega la equivalencia. */
function textoHorario(r: Reunion): { fecha: string; hora: string; extra: string | null } {
  const ini = new Date(r.inicio);
  const tz = r.modalidad === "presencial" ? ZONA_OFICINA : r.zona_cliente;
  const fecha = formatoFecha(ini, tz);
  const hora = `${formatoHora(ini, tz)} (${etiquetaZona(tz, ini)})`;
  const horaTepic = formatoHora(ini, ZONA_OFICINA);
  const extra =
    tz !== ZONA_OFICINA && formatoHora(ini, tz) !== horaTepic ? `Equivale a ${horaTepic}, hora de Tepic.` : null;
  return { fecha, hora, extra };
}

function bloqueDetalle(ctx: ContextoCorreo): { html: string; texto: string[] } {
  const { reunion: r, anfitrion: a, oficina: o } = ctx;
  const h = textoHorario(r);
  const lugarHtml =
    r.modalidad === "presencial"
      ? `${esc(o.direccion)}<br><a href="${esc(enlaceMaps(o))}" style="color:${C.navy};font-weight:700;">Ver cómo llegar</a>`
      : a.enlace_video
        ? `<a href="${esc(a.enlace_video)}" style="color:${C.navy};font-weight:700;word-break:break-all;">${esc(a.enlace_video)}</a>`
        : "Te compartiremos el enlace antes de la reunión.";
  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.linea};">
    ${filaDato("Tema", `<strong>${esc(r.producto_nombre)}</strong>`)}
    ${filaDato("Fecha", esc(h.fecha))}
    ${filaDato("Hora", `${esc(h.hora)}${h.extra ? `<br><span style="font-size:13px;color:${C.gris};">${esc(h.extra)}</span>` : ""}`)}
    ${filaDato("Modalidad", r.modalidad === "presencial" ? "Presencial" : "Videollamada")}
    ${filaDato(r.modalidad === "presencial" ? "Lugar" : "Enlace", lugarHtml)}
    ${filaDato("Te atiende", esc(a.nombre))}
  </table>`;
  const texto = [
    `Tema: ${r.producto_nombre}`,
    `Fecha: ${h.fecha}`,
    `Hora: ${h.hora}${h.extra ? ` — ${h.extra}` : ""}`,
    `Modalidad: ${r.modalidad === "presencial" ? "Presencial" : "Videollamada"}`,
    `${r.modalidad === "presencial" ? "Lugar" : "Enlace"}: ${ubicacion(r, a, o)}`,
    `Te atiende: ${a.nombre}`,
  ];
  return { html, texto };
}

const PIE_TEXTO = `\n—\n${MARCA.asistente} · ${MARCA.rolAsistente}\n${MARCA.nombre} · ${MARCA.ciudad}`;

// ── 1. Confirmación al cliente (nueva o reprogramada) ───────────────────────

export function correoConfirmacionCliente(ctx: ContextoCorreo, reprogramada = false): CorreoListo {
  const r = ctx.reunion;
  const nombre = r.cliente_nombre.split(" ")[0];
  const d = bloqueDetalle(ctx);
  const cta =
    r.modalidad === "video" && ctx.anfitrion.enlace_video
      ? boton(ctx.anfitrion.enlace_video, "Entrar a la videollamada")
      : r.modalidad === "presencial"
        ? boton(enlaceMaps(ctx.oficina), "Ver cómo llegar")
        : "";
  const cuerpo = `
    ${d.html}
    ${cta ? `<div style="margin:26px 0 0;">${cta}</div>` : ""}
    ${botonesCalendario(ctx)}
    <p style="margin:26px 0 0;font-size:14px;line-height:1.7;color:${C.gris};">¿Cambió algo? Puedes <a href="${esc(urlGestion(r.token))}" style="color:${C.navy};font-weight:700;">reprogramar o cancelar aquí</a>, sin llamadas ni mensajes de por medio.</p>`;
  const titulo = reprogramada ? "Tu reunión cambió de horario" : "Tu reunión está confirmada";
  return {
    asunto: `${reprogramada ? "Reprogramada" : "Confirmada"}: ${r.producto_nombre} — ${formatoFecha(new Date(r.inicio), r.modalidad === "presencial" ? ZONA_OFICINA : r.zona_cliente)}`,
    html: plantilla({
      preheader: `${r.producto_nombre} · ${textoHorario(r).fecha} · ${textoHorario(r).hora}`,
      titulo,
      subtitulo: `Hola ${esc(nombre)}, ${reprogramada ? "este es tu nuevo horario" : "ya quedó agendada. Aquí están los detalles"}.`,
      cuerpo,
    }),
    texto: [
      `Hola ${nombre},`,
      "",
      `${titulo}.`,
      "",
      ...d.texto,
      "",
      `Agregar a Google Calendar: ${enlaceGoogleCalendar(eventoDe(r, ctx.anfitrion, ctx.oficina))}`,
      `Archivo de calendario (.ics): ${urlIcs(r.token)}`,
      `Reprogramar o cancelar: ${urlGestion(r.token)}`,
      PIE_TEXTO,
    ].join("\n"),
  };
}

// ── 2. Aviso interno (copia para Lups y Alejandro) ──────────────────────────

export function correoAvisoInterno(ctx: ContextoCorreo, accion: "nueva" | "reprogramada" | "cancelada"): CorreoListo {
  const r = ctx.reunion;
  const horaTepic = `${formatoFecha(new Date(r.inicio), ZONA_OFICINA)}, ${formatoHora(new Date(r.inicio), ZONA_OFICINA)}`;
  const wa = enlaceWhatsapp(
    r.cliente_whatsapp,
    `Hola ${r.cliente_nombre.split(" ")[0]}, te escribimos de Allitron sobre tu reunión de ${r.producto_nombre}.`
  );
  const titulo = { nueva: "Nueva reunión agendada", reprogramada: "Reunión reprogramada", cancelada: "Reunión cancelada" }[accion];
  const mod = r.modalidad === "presencial" ? "Presencial" : "Videollamada";

  const filasCliente = [
    filaDato("Cliente", `<strong>${esc(r.cliente_nombre)}</strong>${r.cliente_empresa ? `<br>${esc(r.cliente_empresa)}` : ""}`),
    filaDato("Correo", `<a href="mailto:${esc(r.cliente_email)}" style="color:${C.navy};">${esc(r.cliente_email)}</a>`),
    r.cliente_whatsapp ? filaDato("WhatsApp", esc(r.cliente_whatsapp)) : "",
    r.notas ? filaDato("Notas", esc(r.notas).replace(/\n/g, "<br>")) : "",
    filaDato("Origen", r.origen === "interno" ? "Agendada por el equipo" : "Agendada por el cliente"),
  ].join("");

  const cuerpo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.linea};">
      ${filaDato("Tema", `<strong>${esc(r.producto_nombre)}</strong>`)}
      ${filaDato("Cuándo", `${esc(horaTepic)}<br><span style="font-size:13px;color:${C.gris};">Hora de Tepic · ${esc(mod)}</span>`)}
      ${filaDato("Atiende", `<strong>${esc(ctx.anfitrion.nombre)}</strong>`)}
      ${filasCliente}
    </table>
    <div style="margin:24px 0 0;">
      ${wa ? boton(wa, "Escribirle por WhatsApp") + "&nbsp; " : ""}${boton(`${SITE_URL}/interno/reuniones`, "Abrir panel", "secundario")}
    </div>
    ${accion === "cancelada" ? `<p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:${C.gris};">El archivo adjunto retira el evento de tu calendario si ya lo habías agregado.</p>` : `<p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:${C.gris};">Regístrala en tu calendario con los botones de abajo o con el .ics adjunto.</p>${botonesCalendario(ctx)}`}`;

  const accionTxt = accion === "nueva" ? "Nueva" : accion === "reprogramada" ? "Reprogramada" : "Cancelada";
  return {
    asunto: `${accionTxt} · ${r.producto_nombre} · ${r.cliente_nombre} · ${horaTepic}`,
    html: plantilla({
      preheader: `${r.cliente_nombre} · ${r.producto_nombre} · ${horaTepic} · atiende ${ctx.anfitrion.nombre}`,
      titulo,
      subtitulo: `Aviso de ${esc(MARCA.asistente)}. Atiende ${esc(ctx.anfitrion.nombre)}.`,
      cuerpo,
    }),
    texto: [
      `${titulo} — atiende ${ctx.anfitrion.nombre}`,
      "",
      `Tema: ${r.producto_nombre}`,
      `Cuándo: ${horaTepic} (hora de Tepic) · ${mod}`,
      `Cliente: ${r.cliente_nombre}${r.cliente_empresa ? ` (${r.cliente_empresa})` : ""}`,
      `Correo: ${r.cliente_email}`,
      r.cliente_whatsapp ? `WhatsApp: ${r.cliente_whatsapp}` : "",
      r.notas ? `Notas: ${r.notas}` : "",
      "",
      `Panel: ${SITE_URL}/interno/reuniones`,
      PIE_TEXTO,
    ]
      .filter((l) => l !== "")
      .join("\n"),
  };
}

// ── 3. Cancelación al cliente ───────────────────────────────────────────────

export function correoCancelacionCliente(ctx: ContextoCorreo): CorreoListo {
  const r = ctx.reunion;
  const nombre = r.cliente_nombre.split(" ")[0];
  const h = textoHorario(r);
  const cuerpo = `
    <p style="margin:0;font-size:15px;line-height:1.7;color:${C.tinta};">Se canceló la reunión de <strong>${esc(r.producto_nombre)}</strong> programada para el ${esc(h.fecha.toLowerCase())}, ${esc(h.hora)}.</p>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:${C.gris};">Si quieres retomarla, elige un nuevo horario cuando te acomode.</p>
    <div style="margin:26px 0 0;">${boton(urlReagendar(ctx.productoSlug), "Agendar otro horario")}</div>
    <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:${C.gris};">El archivo adjunto retira el evento de tu calendario si ya lo habías agregado.</p>`;
  return {
    asunto: `Cancelada: ${r.producto_nombre}`,
    html: plantilla({ preheader: `Se canceló tu reunión de ${r.producto_nombre}`, titulo: "Tu reunión fue cancelada", subtitulo: `Hola ${esc(nombre)}, confirmamos la cancelación.`, cuerpo }),
    texto: [
      `Hola ${nombre},`,
      "",
      `Se canceló la reunión de ${r.producto_nombre} del ${h.fecha}, ${h.hora}.`,
      `Para elegir otro horario: ${urlReagendar(ctx.productoSlug)}`,
      PIE_TEXTO,
    ].join("\n"),
  };
}
