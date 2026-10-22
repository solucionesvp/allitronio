// ── Configuración del sistema de reuniones ───────────────────────────────────
// Reglas de negocio en un solo lugar. Los datos que Lups y Alejandro cambian
// seguido (productos, duraciones, horarios, costos, bloqueos) viven en la base
// de datos y se editan desde /interno/reuniones — aquí solo van las reglas fijas.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://allitron.io").replace(/\/$/, "");

/** Zona de la oficina (Tepic). Las reuniones presenciales siempre se muestran en esta zona. */
export const ZONA_OFICINA = "America/Mazatlan";

/** Anticipación mínima para reservar. */
export const ANTICIPACION_MIN_HORAS = 4;
/** Hasta cuántos días hacia adelante se puede reservar. */
export const HORIZONTE_DIAS = 30;
/** Cada cuántos minutos arranca un horario ofrecido. */
export const PASO_SLOTS_MIN = 30;
/** El cliente puede cancelar/reprogramar solo hasta N horas antes; después, por WhatsApp. */
export const CAMBIOS_LIMITE_HORAS = 2;
/** Reservas máximas por IP por hora (anti-abuso del formulario público). */
export const RESERVAS_MAX_POR_IP_HORA = 5;
/** Intentos fallidos de login del panel antes de bloquear. */
export const LOGIN_MAX_FALLIDOS = 5;
export const LOGIN_VENTANA_MIN = 15;

export const MARCA = {
  nombre: "Allitron",
  asistente: "Aurora IA",
  rolAsistente: "Asistente de Allitron",
  ciudad: "Tepic, Nayarit",
} as const;

export const COOKIE_SESION = "reuniones_session";
export const SESION_DURACION_DIAS = 30;
