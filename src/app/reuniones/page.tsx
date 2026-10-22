import type { Metadata } from "next";
import LegalFooter from "@/components/layout/LegalFooter";
import ReservaFlow from "@/components/reuniones/ReservaFlow";

export const metadata: Metadata = {
  title: "Agenda tu reunión",
  description: "Elige día y hora para tu reunión con Allitron. Presencial en Tepic o por videollamada, con confirmación al instante.",
  alternates: { canonical: "/reuniones" },
  robots: { index: false, follow: true },
};

// Next 16: searchParams llega como promesa.
export default async function ReunionesPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const producto = uno(sp.producto);
  const reprogramar = uno(sp.reprogramar);

  return (
    <>
      <main className="min-h-svh bg-[var(--color-light)]">
        <ReservaFlow productoInicial={producto} reprogramarToken={reprogramar} />
      </main>
      <LegalFooter links={[{ label: "Aviso de privacidad", href: "/aviso-de-privacidad" }]} />
    </>
  );
}
