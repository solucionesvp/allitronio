// ── Orden de lectura de cada propuesta (para la barra 1·2·3·4·5·6) ────────
// Para un cliente nuevo: copiar un bloque, cambiar el slug y las rutas.

export interface Paso {
  href: string;
  label: string;
}

export interface PasosPropuesta {
  hub: string;
  pasos: Paso[];
}

const armar = (slug: string, rutas: [string, string][]): PasosPropuesta => ({
  hub: `/entregas/${slug}`,
  pasos: rutas.map(([r, label]) => ({ href: `/entregas/${slug}/${r}`, label })),
});

export const PASOS_ISUZU = armar("isuzu", [
  ["carta", "Carta"],
  ["lo-que-vimos", "Lo que vimos"],
  ["plan", "El plan"],
  ["meta", "La meta"],
  ["primeras-semanas", "Primeras semanas"],
  ["cotizacion", "Cuánto cuesta"],
]);

export const PASOS_NUTRIMONTSE = armar("nutrimontse", [
  ["carta", "Carta"],
  ["lo-que-vimos", "Lo que vimos"],
  ["campana", "La campaña"],
  ["objetivos", "Los objetivos"],
  ["primeras-semanas", "Primeras semanas"],
  ["cotizacion", "Cuánto cuesta"],
]);

export const PASOS_VIESAINE = armar("viesaine", [
  ["carta", "Carta"],
  ["lo-que-vimos", "Lo que vimos"],
  ["plan", "El plan"],
  ["objetivos", "Los objetivos"],
  ["primeras-semanas", "Primeras semanas"],
  ["cotizacion", "Cuánto cuesta"],
]);

export const PASOS_IBS = armar("ibs", [
  ["carta", "Carta"],
  ["lo-que-vimos", "Lo que vimos"],
  ["plan", "El plan"],
  ["marca", "La marca"],
  ["primeras-semanas", "Primeras semanas"],
  ["cotizacion", "Cuánto cuesta"],
]);
