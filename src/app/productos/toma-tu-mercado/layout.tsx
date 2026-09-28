import type { Metadata } from "next";
import { TTM_PRICES_APPROVED } from "@/data/tomaTuMercadoContent";

// Metadatos propios de la landing (la página es client component). Sin esto
// hereda título e imagen del home de Allitron al compartir el link.
// Nombre interno "Motor de Captación": nunca en metadatos públicos.
const TITLE = "Toma tu Mercado — Campañas con objetivo comercial para negocios de Nayarit";
const DESCRIPTION =
  "Estudiamos tu mercado, tu competencia y tus números. Después lanzamos la campaña para ir por tus clientes. Ciclo de 90 días. Desde Tepic, Nayarit.";
const URL_PATH = "/productos/toma-tu-mercado";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  // No indexar hasta que Lups apruebe precios (ver TTM_PRICES_APPROVED).
  robots: TTM_PRICES_APPROVED ? undefined : { index: false, follow: false },
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

export default function TomaTuMercadoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
