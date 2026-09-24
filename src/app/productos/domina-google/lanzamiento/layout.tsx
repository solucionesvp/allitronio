import type { Metadata } from "next";

// Metadatos propios de la landing de campaña (la página es client component).
// Sin esto heredaba título, descripción e imagen del home de Allitron: al
// compartir el link en WhatsApp o en anuncios se veía el hub, no Domina Google.
const TITLE = "Domina Google — Que te encuentren en Google y te escriban por WhatsApp";
const DESCRIPTION =
  "Web, Google Maps y WhatsApp conectados en 7 días hábiles. Un solo pago, sin mensualidad. Desde Tepic, Nayarit.";
const URL_PATH = "/productos/domina-google/lanzamiento";
const IMAGE = "/assets/products/local/lanzamiento/hero-desktop.webp";

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
    images: [{ url: IMAGE, width: 1920, height: 1288, alt: "Domina Google — Allitron" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

export default function DominaGoogleLanzamientoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
