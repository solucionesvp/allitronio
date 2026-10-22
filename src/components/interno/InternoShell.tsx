"use client";

// ── InternoShell — marco común de todos los módulos internos ─────────────────
// Misma cara que Alli: fondo claro, tipografía grande, botones altos.
// Cada módulo (Reuniones hoy; Finanzas, Entregas, Newsletter después) se
// monta dentro de este marco para que el equipo siempre sepa dónde está.

import Link from "next/link";
import { Home, LogOut } from "lucide-react";

export default function InternoShell({
  titulo,
  icono,
  persona,
  onSalir,
  acciones,
  children,
  ancho = 980,
}: {
  titulo: string;
  icono?: React.ReactNode;
  persona?: string;
  onSalir?: () => void;
  acciones?: React.ReactNode;
  children: React.ReactNode;
  ancho?: number;
}) {
  const btn =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] border-2 border-[#101820]/15 bg-white px-4 py-2 font-display text-[0.85rem] font-bold text-[#101820] transition-colors hover:border-allitron-blue";
  return (
    <div className="min-h-svh bg-[var(--color-light)]">
      <div className="sticky top-0 z-40 border-b border-[#101820]/8 bg-[var(--color-light)]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-8" style={{ maxWidth: ancho }}>
          <Link href="/interno" className={btn} aria-label="Ir al inicio interno">
            <Home className="h-4 w-4" /> <span className="hidden sm:inline">Inicio</span>
          </Link>
          <div className="flex items-center gap-2">
            {persona && <span className="hidden font-body text-[0.9rem] text-secondary sm:inline">Hola, {persona}</span>}
            {acciones}
            {onSalir && (
              <button type="button" className={btn} onClick={onSalir}>
                <LogOut className="h-4 w-4" /> Salir
              </button>
            )}
          </div>
        </div>
      </div>
      <main className="mx-auto w-full px-4 pb-24 pt-8 sm:px-8" style={{ maxWidth: ancho }}>
        <h1 className="mb-8 flex items-center gap-3 font-display text-[2rem] font-black leading-tight tracking-tight text-[#101820] sm:text-[2.6rem]">
          {icono && <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-allitron-blue/10 text-allitron-blue">{icono}</span>}
          {titulo}
        </h1>
        {children}
      </main>
    </div>
  );
}
