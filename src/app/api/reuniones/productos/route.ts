import { getReunionesDb } from "@/lib/reuniones/db";
import { cargarOficina } from "@/lib/reuniones/service";
import { json, NO_CONFIG } from "../_http";

// GET /api/reuniones/productos — catálogo público: solo productos activos con
// al menos un anfitrión activo. No expone correos, enlaces ni ids de anfitriones.
export const dynamic = "force-dynamic";

export async function GET() {
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  const [{ data: productos }, { data: links }, oficina] = await Promise.all([
    db.from("productos_reunion").select("*").eq("activo", true).order("orden"),
    db.from("producto_anfitriones").select("producto_id, anfitriones(activo, enlace_video)"),
    cargarOficina(db),
  ]);

  const porProducto = new Map<string, { activo: boolean; enlace_video: string | null }[]>();
  for (const l of (links ?? []) as unknown as { producto_id: string; anfitriones: { activo: boolean; enlace_video: string | null } | null }[]) {
    if (!l.anfitriones?.activo) continue;
    porProducto.set(l.producto_id, [...(porProducto.get(l.producto_id) ?? []), l.anfitriones]);
  }

  const lista = (productos ?? [])
    .filter((p) => (porProducto.get(p.id) ?? []).length > 0)
    .map((p) => {
      const hosts = porProducto.get(p.id) ?? [];
      return {
        slug: p.slug,
        nombre: p.nombre,
        descripcion: p.descripcion,
        duracion_min: p.duracion_min,
        costo_mxn: p.mostrar_costo ? p.costo_mxn : null,
        presencial: p.permite_presencial,
        video: p.permite_video && hosts.some((h) => h.enlace_video),
      };
    });

  return json({ ok: true, productos: lista, oficina: { direccion: oficina.direccion } });
}
