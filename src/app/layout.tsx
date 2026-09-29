import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import ChatWidgetGate from "@/components/chat/ChatWidgetGate";
import MetaPixel from "@/components/analytics/MetaPixel";

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
  "Allitron es el hub de tecnología, inteligencia artificial y estrategia de Nayarit. Domina Google y Toma tu Mercado: que te encuentren, que te elijan y que te lleguen clientes. Desde Tepic.";

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
    "Toma tu Mercado",
    "Segundo Cerebro",
    "LAZUP CRM",
    "Aurora IA",
    "hub tecnológico Nayarit",
  ],
  authors: [{ name: "Allitron" }],
  // Sin canonical global: si se hereda "/" a todas las rutas, Google lee cada
  // página como duplicado del home. Cada página que lo necesite declara el suyo.
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
    // Imagen: archivos opengraph-image.jpg por sección (src/app/**).
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${roboto.variable} bg-allitron-base text-foreground font-body antialiased`}
      >
        {children}
        <ChatWidgetGate />
        <MetaPixel />
      </body>
    </html>
  );
}
