import { NextRequest, NextResponse } from "next/server";
import { getReunionesDb } from "@/lib/reuniones/db";
import { eventoDe } from "@/lib/reuniones/evento";
import { generarIcs } from "@/lib/reuniones/ics";
import { cargarReunionPorToken, contextoDe } from "@/lib/reuniones/service";
import { tokenValido } from "@/lib/reuniones/tokens";

// GET /api/reuniones/ics/[token] — archivo de calendario ("Apple y otros").
export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const db = getReunionesDb();
  if (!db) return new NextResponse("No disponible", { status: 503 });
  const { token } = await params;
  if (!tokenValido(token)) return new NextResponse("No encontrada", { status: 404 });

  const r = await cargarReunionPorToken(db, token);
  if (!r) return new NextResponse("No encontrada", { status: 404 });
  const ctx = await contextoDe(db, r);
  if (!ctx) return new NextResponse("No encontrada", { status: 404 });

  const cuerpo = generarIcs(eventoDe(r, ctx.anfitrion, ctx.oficina), r.estado === "cancelada" ? "CANCEL" : "PUBLISH");
  return new NextResponse(cuerpo, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="reunion-allitron.ics"',
      "Cache-Control": "no-store",
    },
  });
}
