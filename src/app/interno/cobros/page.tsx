import type { Metadata } from "next";
import PanelCobros from "@/components/cobros/PanelCobros";
import { esUuid } from "@/lib/cobros/validar";

export const metadata: Metadata = { title: "Cobros · interno", robots: { index: false, follow: false, nocache: true } };

// ?id=<uuid> abre ese cobro y ?nuevo=1 abre el formulario (los usa el tablero /interno).
export default async function InternoCobrosPage({ searchParams }: { searchParams: Promise<{ id?: string; nuevo?: string }> }) {
  const { id, nuevo } = await searchParams;
  return <PanelCobros inicialId={id && esUuid(id) ? id : null} inicialNuevo={nuevo === "1"} />;
}
