// Formato de fechas SIN dependencias de navegador ni de servidor (sirve en ambos).

/** "2026-10-24" → "24 oct 2026" (se interpreta como fecha pura: sin desfase de zona). */
export function fechaYmd(ymd: string | null | undefined): string {
  if (!ymd) return "—";
  return new Intl.DateTimeFormat("es-MX", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" })
    .format(new Date(`${ymd}T12:00:00Z`))
    .replace(/\./g, "");
}
