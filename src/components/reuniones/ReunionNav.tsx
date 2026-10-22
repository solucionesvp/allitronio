"use client";

// ── ReunionNav — barra de pasos, igual que la de las propuestas de Alli ──────
// Casita al inicio, círculos numerados (hechos en azul con palomita, actual en
// naranja, pendientes en gris) y una línea que se llena conforme se avanza.

import Link from "next/link";
import { Check, Home } from "lucide-react";

export interface PasoNav {
  id: string;
  label: string;
}

export default function ReunionNav({ pasos, actual }: { pasos: PasoNav[]; actual: number }) {
  // actual = índice del paso en curso; si todos están hechos llega como pasos.length
  const progreso = pasos.length === 0 ? 0 : Math.min(1, Math.max(0, actual) / pasos.length);
  return (
    <div className="sticky top-0 z-40 w-full bg-[var(--color-light)]/90 backdrop-blur-md">
      <nav aria-label="Pasos para agendar" className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 py-3 sm:px-10">
        <Link href="/" aria-label="Volver al inicio de Allitron" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101820]/[0.06] text-[#101820] transition-colors hover:bg-allitron-blue hover:text-white">
          <Home size={18} />
        </Link>
        {pasos.length > 0 && (
          <ol className="flex items-center gap-2 sm:gap-3">
            {pasos.map((p, i) => {
              const hecho = i < actual;
              const enCurso = i === actual;
              return (
                <li key={p.id} className="flex items-center gap-2">
                  <span
                    aria-label={`${i + 1}. ${p.label}${enCurso ? " (estás aquí)" : hecho ? " (listo)" : ""}`}
                    aria-current={enCurso ? "step" : undefined}
                    className={`flex items-center justify-center rounded-full font-display font-bold transition-all ${
                      enCurso
                        ? "h-10 w-10 bg-allitron-orange text-[1rem] text-white shadow-[0_6px_16px_rgba(242,135,76,0.35)]"
                        : hecho
                          ? "h-8 w-8 bg-allitron-blue text-[0.85rem] text-white"
                          : "h-8 w-8 border-2 border-[#101820]/15 bg-white text-[0.85rem] text-[#101820]/60"
                    }`}
                  >
                    {hecho ? <Check size={15} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={`hidden font-body text-[0.9rem] sm:inline ${enCurso ? "font-bold text-[#101820]" : "text-secondary"}`}>{p.label}</span>
                </li>
              );
            })}
          </ol>
        )}
        <span className="w-10 shrink-0" aria-hidden="true" />
      </nav>
      <div className="h-[4px] w-full bg-[#101820]/[0.06]">
        <div className="h-full origin-left bg-allitron-blue transition-transform duration-500 ease-out" style={{ transform: `scaleX(${progreso})` }} />
      </div>
    </div>
  );
}
