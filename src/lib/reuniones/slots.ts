import { zonaAUtc, ymdEnZona, sumarDias, diaSemana } from "./tz";
import type { SlotDisponible } from "./types";

// ── Cálculo de horarios disponibles ─────────────────────────────────────────
// Lógica pura (sin base de datos): recibe las reglas semanales, las reuniones
// confirmadas y los bloqueos de cada anfitrión, y devuelve los horarios libres.
// Un horario se ofrece si AL MENOS un anfitrión del producto está libre.

export interface Intervalo {
  inicio: Date;
  fin: Date;
}

export interface AnfitrionEntrada {
  id: string;
  zona: string;
  reglas: { dia_semana: number; hora_inicio: string; hora_fin: string }[];
  /** Reuniones confirmadas (se les aplica el buffer del producto). */
  reuniones: Intervalo[];
  /** Bloqueos puntuales (sin buffer). */
  bloqueos: Intervalo[];
}

export interface ParametrosSlots {
  anfitriones: AnfitrionEntrada[];
  duracionMin: number;
  bufferMin: number;
  pasoMin: number;
  ahora: Date;
  anticipacionHoras: number;
  horizonteDias: number;
  /** Zona usada para decidir qué es "hoy" al recorrer los días. */
  zonaReferencia: string;
}

const MIN = 60_000;

function solapa(aIni: number, aFin: number, bIni: number, bFin: number): boolean {
  return aIni < bFin && aFin > bIni;
}

function hm(t: string): string {
  return t.slice(0, 5);
}

export function generarSlots(p: ParametrosSlots): SlotDisponible[] {
  const minInicio = p.ahora.getTime() + p.anticipacionHoras * 60 * MIN;
  const maxInicio = p.ahora.getTime() + p.horizonteDias * 24 * 60 * MIN;
  const dur = p.duracionMin * MIN;
  const buf = p.bufferMin * MIN;
  const paso = p.pasoMin * MIN;

  const hoy = ymdEnZona(p.ahora, p.zonaReferencia);
  const mapa = new Map<number, Set<string>>();

  for (const a of p.anfitriones) {
    // Se recorre un día extra por lado: la zona del anfitrión puede ir
    // adelantada/atrasada respecto a la de referencia.
    for (let i = -1; i <= p.horizonteDias + 1; i++) {
      const dia = sumarDias(hoy, i);
      const dow = diaSemana(dia);
      for (const r of a.reglas) {
        if (r.dia_semana !== dow) continue;
        const ini = zonaAUtc(dia, hm(r.hora_inicio), a.zona).getTime();
        const fin = zonaAUtc(dia, hm(r.hora_fin), a.zona).getTime();
        for (let t = ini; t + dur <= fin; t += paso) {
          if (t < minInicio || t >= maxInicio) continue;
          const tFin = t + dur;
          const chocaReunion = a.reuniones.some((m) =>
            solapa(t, tFin, m.inicio.getTime() - buf, m.fin.getTime() + buf)
          );
          if (chocaReunion) continue;
          const chocaBloqueo = a.bloqueos.some((b) => solapa(t, tFin, b.inicio.getTime(), b.fin.getTime()));
          if (chocaBloqueo) continue;
          let set = mapa.get(t);
          if (!set) mapa.set(t, (set = new Set()));
          set.add(a.id);
        }
      }
    }
  }

  return [...mapa.entries()]
    .sort((x, y) => x[0] - y[0])
    .map(([t, ids]) => ({ inicio: new Date(t).toISOString(), anfitriones: [...ids] }));
}
