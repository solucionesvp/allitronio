import type { Metadata } from "next";
import VistaPublica from "@/components/cobros/VistaPublica";
import { cargarCobroPorToken } from "@/lib/cobros/service";
import { getReunionesDb } from "@/lib/reuniones/db";
import { tokenValido } from "@/lib/reuniones/tokens";

// Comprobante del cliente. El token de la URL (192 bits) es el secreto: no hay
// listados ni búsquedas. Siempre se lee en vivo (el saldo cambia con cada abono)
// y no se indexa ni filtra el token por Referer a los enlaces externos.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tu comprobante",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

function NoDisponible({ texto }: { texto: string }) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[var(--color-light)] px-5">
      <div className="neu w-full max-w-[440px] rounded-[28px] px-8 py-10 text-center">
        <h1 className="font-display text-[1.6rem] font-black text-[#101820]">Enlace no disponible</h1>
        <p className="mt-3 font-body text-[1rem] leading-[1.65] text-secondary">{texto}</p>
      </div>
    </main>
  );
}

export default async function CobroPublicoPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!tokenValido(token)) return <NoDisponible texto="Este enlace no es válido. Pídenos que te lo enviemos de nuevo." />;
  const db = getReunionesDb();
  if (!db) return <NoDisponible texto="El comprobante no está disponible por ahora. Intenta de nuevo en unos minutos." />;
  const cobro = await cargarCobroPorToken(db, token);
  if (!cobro) return <NoDisponible texto="No encontramos este comprobante. Pídenos que te lo enviemos de nuevo." />;
  return <VistaPublica c={cobro} />;
}
