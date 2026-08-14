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

export const metadata: Metadata = {
  title: "Allitron — Connecting the Future",
  description:
    "Tecnología, inteligencia artificial y estrategia para transformar empresas y conectar el futuro desde Nayarit.",
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