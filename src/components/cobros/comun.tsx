"use client";

import type { EstadoPago } from "@/lib/cobros/calculos";
import type { AjustesCobros, CobroCompleto, ResumenCobro } from "@/lib/cobros/types";
import { ZONA_OFICINA } from "@/lib/reuniones/config";
import { ymdEnZona } from "@/lib/reuniones/tz";

export { Aviso, P } from "@/components/reuniones/panel/comun";

export interface CitaLigable {
  id: string;
  producto_nombre: string;
  inicio: string;
  estado: string;
  cliente_nombre: string;
  cliente_email: string;
  cliente_whatsapp: string | null;
  cliente_empresa: string | null;
}

export interface DatosCobros {
  persona: "Lups" | "Alejandro";
  cobros: ResumenCobro[];
  reuniones: CitaLigable[];
  ajustes: AjustesCobros;
  entorno: { resend: boolean; remitente: boolean };
}

export interface RespuestaAccion {
  ok: boolean;
  mensaje?: string;
  id?: string;
  correo?: { ok: boolean; mensaje?: string } | null;
}

export async function accion(body: Record<string, unknown>): Promise<RespuestaAccion> {
  try {
    const res = await fetch("/api/cobros/admin/accion", {
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

export async function cargarDetalle(id: string): Promise<CobroCompleto | null> {
  try {
    const res = await fetch(`/api/cobros/admin/datos?id=${encodeURIComponent(id)}`, { cache: "no-store" });
    if (res.status === 401) {
      window.dispatchEvent(new Event("reuniones:sesion-vencida"));
      return null;
    }
    const j = await res.json();
    return j.ok ? (j.cobro as CobroCompleto) : null;
  } catch {
    return null;
  }
}

export const hoyYmd = (): string => ymdEnZona(new Date(), ZONA_OFICINA);

export { fechaYmd } from "@/lib/cobros/formato";

export function fechaHora(iso: string): string {
  return new Intl.DateTimeFormat("es-MX", { timeZone: ZONA_OFICINA, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
    .format(new Date(iso))
    .replace(/\./g, "");
}

export const COLOR_ESTADO: Record<EstadoPago, string> = {
  borrador: "bg-[#101820]/8 text-[#101820]",
  cancelado: "bg-[#101820]/8 text-[#4A6070] line-through",
  pagado: "bg-emerald-100 text-emerald-800",
  parcial: "bg-allitron-blue/15 text-allitron-navy",
  vencido: "bg-allitron-orange/20 text-[#B4541B]",
  pendiente: "bg-amber-100 text-amber-800",
};

export function Insignia({ estado, etiqueta }: { estado: EstadoPago; etiqueta: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 font-display text-[0.75rem] font-bold ${COLOR_ESTADO[estado]}`}>{etiqueta}</span>;
}
