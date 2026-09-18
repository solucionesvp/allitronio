import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://allitron.io";
const SITE_TITLE = "Allitron — Tecnología, IA y Estrategia en Nayarit";
const SITE_DESCRIPTION =
  "Allitron es el hub de tecnología, inteligencia artificial y estrategia de Nayarit: Allitron 90, Domina Google, Segundo Cerebro y LAZUP — construidos y operados desde Tepic para transformar negocios reales.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Allitron",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Allitron",
    "tecnología Nayarit",
    "inteligencia artificial Tepic",
    "Allitron 90",
    "Domina Google",
    "Segundo Cerebro",
    "LAZUP CRM",
    "Aurora IA",
    "hub tecnológico Nayarit",
  ],
  authors: [{ name: "Allitron" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Allitron",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/assets/hero/hero-visual.png",
        width: 1200,
        height: 630,
        alt: "Allitron — hub de tecnología, IA y estrategia en Nayarit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/hero/hero-visual.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${roboto.variable} bg-allitron-base text-foreground font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
