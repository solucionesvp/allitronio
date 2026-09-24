import type { Metadata } from "next";

// Página solo para clientes que ya pagaron el anticipo: no se indexa.
export const metadata: Metadata = {
  title: "Recepción de cliente — Domina Google",
  robots: { index: false, follow: false },
};

export default function RecepcionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
