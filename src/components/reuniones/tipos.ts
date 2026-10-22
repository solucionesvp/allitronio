import { SITE_URL, ZONA_OFICINA } from "@/lib/reuniones/config";
import type { EventoCalendario } from "@/lib/reuniones/ics";
import { formatoFecha, formatoHora } from "@/lib/reuniones/tz";

export interface DatosGestion {
  producto: string;
  producto_slug: string | null;
  inicio: string;
  fin: string;
  modalidad: "presencial" | "video";
  estado: "confirmada" | "cancelada" | "realizada" | "no_asistio";
  zona_cliente: string;
  cliente_nombre: string;
  anfitrion: string;
  enlace_video: string | null;
  direccion: string | null;
  puede_cambiar: boolean;
  limite_horas: number;
}

export function zonaDeVista(d: Pick<DatosGestion, "modalidad" | "zona_cliente">): string {
  return d.modalidad === "presencial" ? ZONA_OFICINA : d.zona_cliente;
}

/** Evento para los botones de Google/Outlook (el .ics real lo genera el servidor). */
export function eventoDesdeGestion(d: DatosGestion, token: string): EventoCalendario {
  const tz = zonaDeVista(d);
  const ini = new Date(d.inicio);
  const lugar = d.modalidad === "presencial" ? d.direccion : d.enlace_video;
  return {
    uid: token,
    titulo: `${d.producto} · Allitron`,
    descripcion: [
      `${formatoFecha(ini, tz)}, ${formatoHora(ini, tz)}`,
      d.modalidad === "presencial" ? `Presencial: ${d.direccion ?? ""}` : `Videollamada: ${d.enlace_video ?? "enlace por confirmar"}`,
      `Atiende: ${d.anfitrion}`,
      "",
      `Reprogramar o cancelar: ${SITE_URL}/reuniones/${token}`,
    ].join("\n"),
    ubicacion: lugar ?? undefined,
    inicio: ini,
    fin: new Date(d.fin),
    secuencia: 0,
    url: `${SITE_URL}/reuniones/${token}`,
  };
}
