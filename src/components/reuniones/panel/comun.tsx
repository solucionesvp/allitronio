"use client";

import { ZONA_OFICINA } from "@/lib/reuniones/config";
import { formatoHora, partesEnZona, zonaAUtc } from "@/lib/reuniones/tz";
import type { Anfitrion, Bloqueo, Oficina, ProductoReunion, ReglaSemanal, Reunion } from "@/lib/reuniones/types";

export interface DatosPanel {
  persona: "Lups" | "Alejandro";
  reuniones: Reunion[];
  productos: ProductoReunion[];
  anfitriones: Anfitrion[];
  enlaces: { producto_id: string; anfitrion_id: string; prioridad: number }[];
  reglas: ReglaSemanal[];
  bloqueos: Bloqueo[];
  correoFallido: string[];
  oficina: Oficina;
  entorno: { resend: boolean; remitente: boolean };
}

export interface RespuestaAccion {
  ok: boolean;
  mensaje?: string;
  id?: string;
  correos?: { cliente: boolean; equipo: boolean };
}

export async function accion(body: Record<string, unknown>): Promise<RespuestaAccion> {
  try {
    const res = await fetch("/api/reuniones/admin/accion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      window.dispatchEvent(new Event("reuniones:sesion-vencida"));
      return { ok: false, mensaje: "Sesión vencida." };
    }
    return await res.json();
  } catch {
    return { ok: false, mensaje: "Sin conexión con el servidor." };
  }
}

// ── Fechas: el equipo trabaja siempre en hora de Tepic ──────────────────────
export function fechaCorta(iso: string): string {
  const d = new Date(iso);
  const f = new Intl.DateTimeFormat("es-MX", { timeZone: ZONA_OFICINA, weekday: "short", day: "numeric", month: "short" }).format(d);
  return `${f.replace(/\./g, "")} · ${formatoHora(d, ZONA_OFICINA)}`;
}

/** "2026-11-05T09:30" (hora de Tepic) → ISO UTC. */
export function localAUtc(v: string): string {
  return zonaAUtc(v.slice(0, 10), v.slice(11, 16), ZONA_OFICINA).toISOString();
}

/** ISO UTC → valor para <input type="datetime-local"> en hora de Tepic. */
export function utcALocal(iso: string): string {
  const p = partesEnZona(new Date(iso), ZONA_OFICINA);
  const z = (n: number) => String(n).padStart(2, "0");
  return `${p.year}-${z(p.month)}-${z(p.day)}T${z(p.hour)}:${z(p.minute)}`;
}

export const DIAS = [
  { n: 1, nombre: "Lunes" },
  { n: 2, nombre: "Martes" },
  { n: 3, nombre: "Miércoles" },
  { n: 4, nombre: "Jueves" },
  { n: 5, nombre: "Viernes" },
  { n: 6, nombre: "Sábado" },
  { n: 0, nombre: "Domingo" },
] as const;

// ── Estilos (panel claro, mismo lenguaje que Alli y las entregas) ───────────
export const P = {
  card: "neu rounded-[22px] p-5 sm:p-6",
  input:
    "w-full min-h-[48px] rounded-[14px] border-2 border-[#101820]/10 bg-white px-3.5 py-2.5 font-body text-[0.95rem] text-[#101820] outline-none transition-colors placeholder:text-[#101820]/35 focus:border-allitron-blue focus-visible:ring-4 focus-visible:ring-allitron-blue/20",
  label: "mb-1.5 block font-display text-[0.8rem] font-bold text-[#101820]",
  btn: "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] bg-allitron-blue px-5 py-2.5 font-display text-[0.92rem] font-bold text-white shadow-[0_8px_20px_rgba(9,175,242,0.28)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
  btnGhost:
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] border-2 border-[#101820]/15 bg-white px-4 py-2 font-display text-[0.85rem] font-bold text-[#101820] transition-colors hover:border-allitron-blue disabled:opacity-40",
  btnDanger:
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] border-2 border-allitron-orange/60 bg-white px-4 py-2 font-display text-[0.85rem] font-bold text-[#B4541B] transition-colors hover:bg-allitron-orange/10 disabled:opacity-40",
  h2: "font-display text-[1.25rem] font-bold tracking-tight text-[#101820]",
} as const;

export function Aviso({ tipo, children }: { tipo: "ok" | "error" | "info"; children: React.ReactNode }) {
  const c = tipo === "ok" ? "border-allitron-blue/40 bg-allitron-blue/10" : tipo === "error" ? "border-allitron-orange/50 bg-allitron-orange/10" : "border-[#101820]/15 bg-white";
  return (
    <p role={tipo === "error" ? "alert" : "status"} className={`rounded-[14px] border-2 px-4 py-3 font-body text-[0.92rem] leading-[1.55] text-[#101820] ${c}`}>
      {children}
    </p>
  );
}
