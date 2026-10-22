"use client";

import { CalendarPlus } from "lucide-react";
import { enlaceGoogleCalendar, enlaceMicrosoft365, enlaceOutlook, type EventoCalendario } from "@/lib/reuniones/ics";

// Agregar al calendario de cada quien: el visitante elige el suyo.
export default function BotonesCalendario({ evento, token }: { evento: EventoCalendario; token: string }) {
  const item =
    "flex min-h-[56px] items-center justify-center rounded-[16px] border-2 border-[#101820]/12 bg-white px-3 text-center font-display text-[0.98rem] font-bold text-[#101820] transition-colors hover:border-allitron-blue hover:text-allitron-navy focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange";
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-display text-[1.05rem] font-bold text-[#101820]">
        <CalendarPlus className="h-5 w-5 text-allitron-blue" strokeWidth={2.4} /> Agrégala a tu calendario
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <a className={item} href={enlaceGoogleCalendar(evento)} target="_blank" rel="noopener noreferrer">Google</a>
        <a className={item} href={enlaceOutlook(evento)} target="_blank" rel="noopener noreferrer">Outlook</a>
        <a className={item} href={enlaceMicrosoft365(evento)} target="_blank" rel="noopener noreferrer">Microsoft 365</a>
        <a className={item} href={`/api/reuniones/ics/${token}`}>Apple y otros</a>
      </div>
    </div>
  );
}
