// ── Utilidades de zona horaria sin dependencias (solo Intl) ──────────────────
// Todo se guarda en UTC; las zonas solo se usan para interpretar horarios de
// los anfitriones y para mostrar fechas al cliente.

interface Partes {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const fmtCache = new Map<string, Intl.DateTimeFormat>();

function fmtPartes(tz: string): Intl.DateTimeFormat {
  let f = fmtCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    fmtCache.set(tz, f);
  }
  return f;
}

export function partesEnZona(date: Date, tz: string): Partes {
  const out: Record<string, number> = {};
  for (const p of fmtPartes(tz).formatToParts(date)) {
    if (p.type !== "literal") out[p.type] = parseInt(p.value, 10);
  }
  return {
    year: out.year,
    month: out.month,
    day: out.day,
    hour: out.hour === 24 ? 0 : out.hour,
    minute: out.minute,
    second: out.second,
  };
}

/** Desfase (ms) de la zona respecto a UTC en un instante dado. */
function offsetMs(date: Date, tz: string): number {
  const p = partesEnZona(date, tz);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

export function esZonaValida(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** "2026-11-05" + "09:30" en `tz` → instante UTC. */
export function zonaAUtc(ymd: string, hm: string, tz: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hm.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm, 0);
  let t = guess - offsetMs(new Date(guess), tz);
  const off2 = offsetMs(new Date(t), tz);
  t = guess - off2;
  return new Date(t);
}

/** "YYYY-MM-DD" del instante visto desde `tz`. */
export function ymdEnZona(date: Date, tz: string): string {
  const p = partesEnZona(date, tz);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

export function sumarDias(ymd: string, n: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}

/** 0 = domingo … 6 = sábado, para una fecha calendario. */
export function diaSemana(ymd: string): number {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function formatoFecha(date: Date, tz: string): string {
  const s = new Intl.DateTimeFormat("es-MX", {
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatoHora(date: Date, tz: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(/\s?([ap])\.\s?m\./i, (_m, l: string) => ` ${l.toLowerCase()}. m.`);
}

const ZONAS_MX: Record<string, string> = {
  "America/Mazatlan": "hora de Tepic",
  "America/Mexico_City": "hora del centro de México",
  "America/Monterrey": "hora del centro de México",
  "America/Merida": "hora del centro de México",
  "America/Cancun": "hora de Cancún",
  "America/Chihuahua": "hora de Chihuahua",
  "America/Hermosillo": "hora de Sonora",
  "America/Tijuana": "hora del Pacífico (Tijuana)",
};

/** Nombre legible de la zona para mostrar junto a una hora, p. ej. "hora de Tepic" o "hora de Madrid (UTC+1)". */
export function etiquetaZona(tz: string, date: Date = new Date()): string {
  if (ZONAS_MX[tz]) return ZONAS_MX[tz];
  try {
    const off = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value; // "GMT-6", "GMT+5:30"
    const utc = off ? off.replace("GMT", "UTC").replace("-", "−") : "";
    const ciudad = (tz.split("/").pop() ?? tz).replace(/_/g, " ");
    return utc ? `hora de ${ciudad} (${utc === "UTC" ? "UTC" : utc})` : `hora de ${ciudad}`;
  } catch {
    return tz;
  }
}
