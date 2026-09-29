import { Suspense } from "react";
import type { Metadata } from "next";
import AccesoForm from "./AccesoForm";

// Al compartir cualquier link de /entregas, WhatsApp sigue la redirección a
// esta página: título neutro (no revela el contenido privado) + imagen de
// opengraph-image.jpg de esta carpeta (un openGraph propio no hereda la del padre).
export const metadata: Metadata = {
  title: { absolute: "Tu espacio con Allitron" },
  description: "Propuestas y entregables preparados por el equipo de Allitron. Acceso privado.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Allitron",
    title: "Tu espacio con Allitron",
    description: "Propuestas y entregables preparados por el equipo de Allitron. Acceso privado.",
  },
};

export default function AccesoPage() {
  return (
    <Suspense fallback={null}>
      <AccesoForm />
    </Suspense>
  );
}
