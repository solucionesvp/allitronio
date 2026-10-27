"use client";

import { Printer } from "lucide-react";

export default function BotonImprimir() {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[16px] border-2 border-[#101820]/15 bg-white px-6 font-display text-[0.95rem] font-bold text-[#101820] transition-colors hover:border-allitron-blue print:hidden">
      <Printer className="h-4 w-4" /> Descargar PDF / imprimir
    </button>
  );
}
