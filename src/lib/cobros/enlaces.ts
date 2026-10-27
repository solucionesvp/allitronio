// Utilidades de enlaces sin dependencias de servidor (sirven en el navegador).

/** wa.me con el número normalizado: 10 dígitos → se antepone el 52 de México. */
export function enlaceWhatsapp(telefono: string | null | undefined, texto: string): string {
  let d = (telefono ?? "").replace(/\D/g, "");
  if (d.length === 10) d = `52${d}`;
  return `https://wa.me/${d}?text=${encodeURIComponent(texto)}`;
}
