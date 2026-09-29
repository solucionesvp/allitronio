import type { Metadata } from "next";

// Metadatos propios de la landing de campaña (la página es client component).
// Sin esto heredaba título, descripción e imagen del home de Allitron: al
// compartir el link en WhatsApp o en anuncios se veía el hub, no Domina Google.
const TITLE = "Domina Google — Que te encuentren en Google y te escriban por WhatsApp";
const DESCRIPTION =
  "Web, Google Maps y WhatsApp conectados en 7 días hábiles. Un solo pago, sin mensualidad. Desde Tepic, Nayarit.";
const URL_PATH = "/productos/domina-google/lanzamiento";
// Imagen al compartir: opengraph-image.jpg en esta misma carpeta
// (JPG 1200×630 del mismo hero; WhatsApp no siempre muestra .webp).

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: URL_PATH,
    siteName: "Allitron",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function DominaGoogleLanzamientoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
