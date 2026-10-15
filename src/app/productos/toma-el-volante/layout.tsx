import type { Metadata } from "next";
import { VOLANTE_PRICES_APPROVED } from "@/data/tomaElVolanteContent";

// Metadatos propios de la landing (la página es client component).
const TITLE = "Toma el Volante — Leads a cierre para agencias automotrices de Nayarit";
const DESCRIPTION =
  "Campaña, embudo, tablero y capacitación para tus asesores. Ciclo de 90 días para agencias y grupos automotrices de Nayarit. Por Toma tu Mercado, de Allitron.";
const URL_PATH = "/productos/toma-el-volante";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  // No indexar hasta que Lups apruebe precios (ver VOLANTE_PRICES_APPROVED).
  robots: VOLANTE_PRICES_APPROVED ? undefined : { index: false, follow: false },
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

export default function TomaElVolanteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
