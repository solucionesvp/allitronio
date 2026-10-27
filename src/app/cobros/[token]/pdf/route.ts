import { generarPdfCobro } from "@/lib/cobros/pdf";
import { cargarCobroPorToken, urlPublica } from "@/lib/cobros/service";
import { folioDe } from "@/lib/cobros/types";
import { getReunionesDb } from "@/lib/reuniones/db";
import { tokenValido } from "@/lib/reuniones/tokens";

// PDF del comprobante para el cliente. Mismo secreto que la página: el token.
// Siempre en vivo (el saldo cambia con cada abono) y sin indexar.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer" };

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const noDisponible = () => new Response("Comprobante no disponible", { status: 404, headers: CABECERAS });
  if (!tokenValido(token)) return noDisponible();
  const db = getReunionesDb();
  if (!db) return new Response("No disponible por ahora", { status: 503, headers: CABECERAS });
  const cobro = await cargarCobroPorToken(db, token);
  if (!cobro) return noDisponible();
  try {
    const pdf = await generarPdfCobro(cobro, urlPublica(cobro.token));
    return new Response(Buffer.from(pdf), {
      headers: { ...CABECERAS, "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${folioDe(cobro.folio_num)}.pdf"` },
    });
  } catch {
    return new Response("No se pudo generar el PDF", { status: 500, headers: CABECERAS });
  }
}
