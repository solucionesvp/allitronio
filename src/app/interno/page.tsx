import type { Metadata } from "next";
import HubInterno from "@/components/interno/HubInterno";

export const metadata: Metadata = { title: "Centro del negocio · interno", robots: { index: false, follow: false, nocache: true } };

// Protegida en el proxy/middleware con la sesión firmada del equipo.
export default function InternoPage() {
  return <HubInterno />;
}
