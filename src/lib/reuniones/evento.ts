import { SITE_URL, ZONA_OFICINA } from "./config";
import type { EventoCalendario } from "./ics";
import { formatoFecha, formatoHora } from "./tz";
import type { Anfitrion, Oficina, Reunion } from "./types";

export function normalizarWhatsapp(v: string | null | undefined): string | null {
  if (!v) return null;
  const d = v.replace(/\D/g, "");
  if (d.length === 10) return `52${d}`;
  if (d.length === 12 && d.startsWith("52")) return d;
  if (d.length === 13 && d.startsWith("521")) return `52${d.slice(3)}`;
  return d.length >= 10 && d.length <= 15 ? d : null;
}

export function enlaceWhatsapp(numero: string | null | undefined, mensaje?: string): string | null {
  const n = normalizarWhatsapp(numero);
  if (!n) return null;
  return `https://wa.me/${n}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ""}`;
}

export function enlaceMaps(o: Oficina): string {
  return o.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.direccion)}`;
}

export function urlGestion(token: string): string {
  return `${SITE_URL}/reuniones/${token}`;
}

export function urlIcs(token: string): string {
  return `${SITE_URL}/api/reuniones/ics/${token}`;
}

export function urlReagendar(slug?: string): string {
  return `${SITE_URL}/reuniones${slug ? `?producto=${encodeURIComponent(slug)}` : ""}`;
}

/** Lugar de la reunión: dirección (presencial) o enlace (videollamada). */
export function ubicacion(r: Reunion, a: Anfitrion, o: Oficina): string {
  return r.modalidad === "presencial" ? o.direccion : a.enlace_video || "Enlace de videollamada por confirmar";
}

export function eventoDe(r: Reunion, a: Anfitrion, o: Oficina): EventoCalendario {
  const tz = r.modalidad === "presencial" ? ZONA_OFICINA : r.zona_cliente;
  const lineas = [
    `${r.producto_nombre} · Reunión con Allitron`,
    `${formatoFecha(new Date(r.inicio), tz)}, ${formatoHora(new Date(r.inicio), tz)}`,
    r.modalidad === "presencial" ? `Presencial: ${o.direccion}` : `Videollamada: ${a.enlace_video ?? "enlace por confirmar"}`,
    `Atiende: ${a.nombre}`,
    "",
    `Reprogramar o cancelar: ${urlGestion(r.token)}`,
  ];
  return {
    uid: `${r.id}@allitron.io`,
    titulo: `${r.producto_nombre} · Allitron`,
    descripcion: lineas.join("\n"),
    ubicacion: ubicacion(r, a, o),
    inicio: new Date(r.inicio),
    fin: new Date(r.fin),
    secuencia: r.secuencia,
    url: urlGestion(r.token),
  };
}
