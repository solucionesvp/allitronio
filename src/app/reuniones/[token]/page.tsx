import type { Metadata } from "next";
import { Suspense } from "react";
import LegalFooter from "@/components/layout/LegalFooter";
import GestionReunion from "@/components/reuniones/GestionReunion";

// Página privada: el token de la URL es el secreto. No se indexa.
export const metadata: Metadata = {
  title: "Tu reunión",
  robots: { index: false, follow: false, nocache: true },
};

export default async function GestionPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <>
      <main className="min-h-svh bg-[var(--color-light)]">
        <Suspense fallback={null}>
          <GestionReunion token={token} />
        </Suspense>
      </main>
      <LegalFooter links={[{ label: "Aviso de privacidad", href: "/aviso-de-privacidad" }]} />
    </>
  );
}
