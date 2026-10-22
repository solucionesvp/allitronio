// ── Archivos .ics y enlaces "agregar a mi calendario" ───────────────────────

export interface EventoCalendario {
  uid: string;
  titulo: string;
  descripcion: string;
  ubicacion?: string;
  inicio: Date;
  fin: Date;
  secuencia: number;
  url?: string;
}

function fmtUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapar(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Pliega líneas a 75 octetos (RFC 5545) respetando caracteres multibyte. */
function plegar(linea: string): string {
  const enc = new TextEncoder();
  if (enc.encode(linea).length <= 75) return linea;
  const partes: string[] = [];
  let actual = "";
  let bytes = 0;
  let limite = 75;
  for (const ch of linea) {
    const b = enc.encode(ch).length;
    if (bytes + b > limite) {
      partes.push(actual);
      actual = ch;
      bytes = b;
      limite = 74; // los renglones siguientes empiezan con un espacio
    } else {
      actual += ch;
      bytes += b;
    }
  }
  partes.push(actual);
  return partes.join("\r\n ");
}

/**
 * METHOD:PUBLISH agrega el evento al calendario sin pedir RSVP.
 * METHOD:CANCEL (misma UID, secuencia mayor) lo retira de calendarios que lo importaron.
 */
export function generarIcs(ev: EventoCalendario, metodo: "PUBLISH" | "CANCEL" = "PUBLISH"): string {
  const cancelado = metodo === "CANCEL";
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Allitron//Reuniones//ES",
    "CALSCALE:GREGORIAN",
    `METHOD:${metodo}`,
    "BEGIN:VEVENT",
    `UID:${ev.uid}`,
    `DTSTAMP:${fmtUtc(new Date())}`,
    `DTSTART:${fmtUtc(ev.inicio)}`,
    `DTEND:${fmtUtc(ev.fin)}`,
    `SEQUENCE:${ev.secuencia}`,
    `STATUS:${cancelado ? "CANCELLED" : "CONFIRMED"}`,
    `SUMMARY:${escapar(ev.titulo)}`,
    `DESCRIPTION:${escapar(ev.descripcion)}`,
  ];
  if (ev.ubicacion) lineas.push(`LOCATION:${escapar(ev.ubicacion)}`);
  if (ev.url) lineas.push(`URL:${ev.url}`);
  if (!cancelado) {
    lineas.push(
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapar(ev.titulo)}`,
      "TRIGGER:-PT60M",
      "END:VALARM"
    );
  }
  lineas.push("END:VEVENT", "END:VCALENDAR");
  return lineas.map(plegar).join("\r\n") + "\r\n";
}

export function enlaceGoogleCalendar(ev: EventoCalendario): string {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.titulo,
    dates: `${fmtUtc(ev.inicio)}/${fmtUtc(ev.fin)}`,
    details: ev.descripcion,
  });
  if (ev.ubicacion) q.set("location", ev.ubicacion);
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

function enlaceOutlookBase(host: string, ev: EventoCalendario): string {
  const q = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: ev.titulo,
    startdt: ev.inicio.toISOString(),
    enddt: ev.fin.toISOString(),
    body: ev.descripcion,
  });
  if (ev.ubicacion) q.set("location", ev.ubicacion);
  return `https://${host}/calendar/0/deeplink/compose?${q.toString()}`;
}

/** Outlook.com / Hotmail / Live. */
export const enlaceOutlook = (ev: EventoCalendario) => enlaceOutlookBase("outlook.live.com", ev);
/** Microsoft 365 (cuentas de trabajo). */
export const enlaceMicrosoft365 = (ev: EventoCalendario) => enlaceOutlookBase("outlook.office.com", ev);
