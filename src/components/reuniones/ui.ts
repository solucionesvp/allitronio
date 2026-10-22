// Sistema visual de /reuniones — mismo lenguaje que las entregas de Alli:
// fondo claro (#F4F6F5), superficies neumórficas (.neu), esquinas muy redondas,
// letra grande y botones altos pensados para leerse sin esfuerzo.
export const LIGHT_VARS = {} as const;

export const PAGE = "min-h-svh bg-[var(--color-light)]";
export const CARD = "neu rounded-[28px] p-6 sm:p-8";
export const LABEL = "mb-2 block font-display text-[0.98rem] font-bold text-[#101820]";
export const HINT = "font-body text-[0.95rem] leading-[1.6] text-secondary";
export const INPUT =
  "w-full min-h-[56px] rounded-[16px] border-2 border-[#101820]/10 bg-white px-4 font-body text-[1.05rem] text-[#101820] outline-none transition-colors placeholder:text-[#101820]/35 focus:border-allitron-blue focus-visible:ring-4 focus-visible:ring-allitron-blue/20";
export const BTN_PRIMARY =
  "inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[18px] bg-allitron-blue px-8 py-4 font-display text-[1.1rem] font-bold text-white shadow-[0_12px_28px_rgba(9,175,242,0.32)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:w-auto sm:min-w-[320px] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange";
export const BTN_GHOST =
  "inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[16px] border-2 border-[#101820]/15 bg-white px-6 py-3 font-display text-[1rem] font-bold text-[#101820] transition-colors hover:border-allitron-blue focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange";
export const BTN_TEXT =
  "font-body text-[0.95rem] font-semibold text-allitron-navy underline underline-offset-4 hover:text-allitron-blue";

export function zonaDelNavegador(fallback: string): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || fallback;
  } catch {
    return fallback;
  }
}
