import type { Metadata } from "next";
import PanelReuniones from "@/components/reuniones/panel/PanelReuniones";

export const metadata: Metadata = { title: "Reuniones · interno", robots: { index: false, follow: false, nocache: true } };

export default function InternoReunionesPage() {
  return <PanelReuniones />;
}
