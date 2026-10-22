export type Modalidad = "presencial" | "video";
export type EstadoReunion = "confirmada" | "cancelada" | "realizada" | "no_asistio";

export interface Anfitrion {
  id: string;
  slug: string;
  nombre: string;
  email: string | null;
  whatsapp: string | null;
  enlace_video: string | null;
  zona_horaria: string;
  activo: boolean;
}

export interface ProductoReunion {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  duracion_min: number;
  buffer_min: number;
  costo_mxn: number | null;
  mostrar_costo: boolean;
  permite_presencial: boolean;
  permite_video: boolean;
  activo: boolean;
  orden: number;
}

export interface ReglaSemanal {
  id?: string;
  anfitrion_id: string;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
}

export interface Bloqueo {
  id: string;
  anfitrion_id: string | null;
  inicio: string;
  fin: string;
  motivo: string | null;
}

export interface Reunion {
  id: string;
  producto_id: string;
  producto_nombre: string;
  anfitrion_id: string;
  inicio: string;
  fin: string;
  modalidad: Modalidad;
  estado: EstadoReunion;
  origen: "cliente" | "interno";
  cliente_nombre: string;
  cliente_email: string;
  cliente_whatsapp: string | null;
  cliente_empresa: string | null;
  notas: string | null;
  zona_cliente: string;
  token: string;
  secuencia: number;
  acepta_comunicaciones: boolean;
  cancelada_por: string | null;
  motivo_cancelacion: string | null;
  creado_en: string;
}

export interface Oficina {
  direccion: string;
  maps_url: string | null;
}

export interface SlotDisponible {
  /** ISO UTC del inicio */
  inicio: string;
  /** ids de anfitriones libres en ese horario */
  anfitriones: string[];
}
