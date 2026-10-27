import { NextRequest } from "next/server";
import {
  anularAbono,
  cambiarEstado,
  cargarCobro,
  duplicarCobro,
  enviarCobro,
  guardarAjustes,
  guardarCobro,
  registrarAbono,
} from "@/lib/cobros/service";
import { esUuid, validarAbono, validarAjustes, validarCobro } from "@/lib/cobros/validar";
import { personaAdmin } from "@/lib/reuniones/admin";
import { getReunionesDb } from "@/lib/reuniones/db";
import { json, NO_CONFIG } from "../../../reuniones/_http";

// POST /api/cobros/admin/accion — todas las escrituras del módulo, un solo punto
// de entrada con sesión obligatoria y validación por acción (mismo patrón que Reuniones).
type Body = Record<string, unknown> & { accion?: string };

const bad = (mensaje: string, status = 400) => json({ ok: false, error: "invalid", mensaje }, status);
const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  const persona = await personaAdmin(req);
  if (!persona) return json({ ok: false, error: "unauthorized" }, 401);
  const db = getReunionesDb();
  if (!db) return json(NO_CONFIG, 503);

  let b: Body;
  try {
    b = await req.json();
  } catch {
    return bad("Petición inválida.");
  }

  switch (b.accion) {
    // ── Crear / editar ─────────────────────────────────────────────────────
    case "guardar": {
      const id = b.id === undefined || b.id === null || b.id === "" ? null : esUuid(b.id) ? b.id : undefined;
      if (id === undefined) return bad("Cobro inválido.");
      const emitir = b.emitir === true;
      // Un cobro que ya salió (emitido) siempre se valida con reglas estrictas:
      // solo un borrador puede guardarse incompleto.
      let estricto = emitir;
      if (id) {
        const { data: actual } = await db.from("cobros").select("estado").eq("id", id).maybeSingle();
        if (!actual) return bad("No encontramos ese cobro.", 404);
        if (actual.estado !== "borrador") estricto = true;
      }
      const v = validarCobro(b, estricto);
      if (!v.ok) return bad(v.error);
      const r = await guardarCobro(db, persona, id, v.datos);
      if (!r.ok) return bad(r.mensaje, 409);
      if (emitir) {
        const e = await cambiarEstado(db, persona, r.id, "emitido");
        if (!e.ok) return json({ ok: false, error: "guardado_sin_emitir", id: r.id, mensaje: `Se guardó como borrador, pero no se pudo emitir: ${e.mensaje}` }, 409);
      }
      return json({ ok: true, id: r.id });
    }

    // ── Emitir un borrador existente / cancelar ────────────────────────────
    case "estado": {
      if (!esUuid(b.id)) return bad("Cobro inválido.");
      if (b.estado !== "emitido" && b.estado !== "cancelado") return bad("Estado inválido.");
      const r = await cambiarEstado(db, persona, b.id, b.estado, txt(b.motivo, 300));
      return r.ok ? json({ ok: true }) : bad(r.mensaje, 409);
    }

    // ── Abonos ─────────────────────────────────────────────────────────────
    case "abono": {
      if (!esUuid(b.id)) return bad("Cobro inválido.");
      const v = validarAbono(b);
      if (!v.ok) return bad(v.error);
      const r = await registrarAbono(db, persona, b.id, v.datos);
      if (!r.ok) return bad(r.mensaje, 409);
      let correo: { ok: boolean; mensaje?: string } | null = null;
      if (b.avisar === true) {
        const c = await cargarCobro(db, b.id);
        correo = c ? await enviarCobro(db, c, "abono", persona) : null;
      }
      return json({ ok: true, correo });
    }

    case "anular_abono": {
      if (!esUuid(b.abono_id)) return bad("Abono inválido.");
      const r = await anularAbono(db, persona, b.abono_id, txt(b.motivo, 300));
      return r.ok ? json({ ok: true }) : bad(r.mensaje, 409);
    }

    // ── Correo al cliente ──────────────────────────────────────────────────
    case "enviar": {
      if (!esUuid(b.id)) return bad("Cobro inválido.");
      const c = await cargarCobro(db, b.id);
      if (!c) return bad("No encontramos ese cobro.", 404);
      const r = await enviarCobro(db, c, b.tipo === "abono" ? "abono" : "comprobante", persona);
      return r.ok ? json({ ok: true }) : bad(r.mensaje ?? "No se pudo enviar.", 502);
    }

    case "duplicar": {
      if (!esUuid(b.id)) return bad("Cobro inválido.");
      const r = await duplicarCobro(db, persona, b.id);
      return r.ok ? json({ ok: true, id: r.id }) : bad(r.mensaje, 409);
    }

    // ── Ajustes del emisor ─────────────────────────────────────────────────
    case "guardar_ajustes": {
      const v = validarAjustes(b);
      if (!v.ok) return bad(v.error);
      return (await guardarAjustes(db, v.datos)) ? json({ ok: true }) : bad("No se pudieron guardar los ajustes.", 500);
    }

    default:
      return bad("Acción desconocida.");
  }
}
