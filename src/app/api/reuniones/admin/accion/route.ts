import { NextRequest } from "next/server";
import { personaAdmin } from "@/lib/reuniones/admin";
import { getReunionesDb } from "@/lib/reuniones/db";
import {
  cancelarReunion,
  crearReunion,
  reenviarConfirmacion,
  reprogramarReunion,
} from "@/lib/reuniones/service";
import { esFechaIso, esUrlHttps, validarCliente, zonaCliente } from "@/lib/reuniones/validar";
import { esZonaValida } from "@/lib/reuniones/tz";
import type { Reunion } from "@/lib/reuniones/types";
import { json, NO_CONFIG } from "../../_http";

// POST /api/reuniones/admin/accion — todas las escrituras del panel, un solo
// punto de entrada con sesión obligatoria y validación por acción.
type Body = Record<string, unknown> & { accion?: string };

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;
const HORA_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : Number(v));
const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const bad = (mensaje: string, status = 400) => json({ ok: false, error: "invalid", mensaje }, status);

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

  const cargar = async (id: unknown): Promise<Reunion | null> => {
    if (typeof id !== "string") return null;
    const { data } = await db.from("reuniones").select("*").eq("id", id).maybeSingle();
    return (data as Reunion | null) ?? null;
  };

  switch (b.accion) {
    // ── Reuniones ──────────────────────────────────────────────────────────
    case "estado": {
      const r = await cargar(b.id);
      if (!r) return bad("Reunión no encontrada.", 404);
      if (b.estado !== "realizada" && b.estado !== "no_asistio" && b.estado !== "confirmada") return bad("Estado inválido.");
      const { error } = await db.from("reuniones").update({ estado: b.estado }).eq("id", r.id);
      return error ? bad(error.code === "23P01" ? "Ese horario ya fue tomado por otra reunión." : "No se pudo actualizar.", 409) : json({ ok: true });
    }

    case "cancelar": {
      const r = await cargar(b.id);
      if (!r) return bad("Reunión no encontrada.", 404);
      const res = await cancelarReunion(db, r, persona, txt(b.motivo, 300));
      return res.ok ? json({ ok: true, correos: res.correos }) : bad("No se pudo cancelar (¿ya estaba cancelada?).", 409);
    }

    case "reenviar": {
      const r = await cargar(b.id);
      if (!r) return bad("Reunión no encontrada.", 404);
      return json({ ok: true, correos: await reenviarConfirmacion(db, r) });
    }

    case "reprogramar": {
      const r = await cargar(b.id);
      if (!r) return bad("Reunión no encontrada.", 404);
      if (!esFechaIso(b.inicio)) return bad("Fecha inválida.");
      const res = await reprogramarReunion(db, r, new Date(b.inicio), { forzar: b.forzar === true });
      return res.ok ? json({ ok: true, correos: res.correos }) : bad("Ese horario no está disponible.", 409);
    }

    case "crear_reunion": {
      const v = validarCliente(b);
      if (!v.ok) return bad(v.error);
      if (typeof b.producto !== "string" || !esFechaIso(b.inicio)) return bad("Faltan producto u horario.");
      if (b.modalidad !== "presencial" && b.modalidad !== "video") return bad("Elige la modalidad.");
      const res = await crearReunion(db, {
        productoSlug: b.producto,
        inicio: new Date(b.inicio),
        modalidad: b.modalidad,
        cliente: v.datos,
        zonaCliente: zonaCliente(b.zona),
        aceptaComunicaciones: false,
        origen: "interno",
        anfitrionId: typeof b.anfitrion_id === "string" && b.anfitrion_id ? b.anfitrion_id : undefined,
        forzar: b.forzar === true,
      });
      if (!res.ok) {
        const m: Record<string, string> = {
          producto_invalido: "El producto no está activo.",
          modalidad_invalida: "Modalidad no permitida para este producto.",
          horario_no_disponible: "Horario fuera de disponibilidad (usa «forzar horario» si es intencional).",
          ocupado: "El anfitrión ya tiene una reunión en ese horario.",
          error_interno: "Error al guardar.",
        };
        return bad(m[res.error], 409);
      }
      return json({ ok: true, correos: res.correos });
    }

    // ── Catálogo ───────────────────────────────────────────────────────────
    case "guardar_producto": {
      const slug = txt(b.slug, 40).toLowerCase();
      const nombre = txt(b.nombre, 80);
      const dur = num(b.duracion_min);
      const buf = num(b.buffer_min ?? 0);
      const costo = b.costo_mxn === null || b.costo_mxn === "" || b.costo_mxn === undefined ? null : num(b.costo_mxn);
      if (!SLUG_RE.test(slug)) return bad("El identificador solo admite minúsculas, números y guiones.");
      if (nombre.length < 2) return bad("Escribe el nombre del producto.");
      if (!(dur >= 10 && dur <= 240)) return bad("La duración debe estar entre 10 y 240 minutos.");
      if (!(buf >= 0 && buf <= 120)) return bad("El margen entre reuniones debe estar entre 0 y 120 minutos.");
      if (costo !== null && !(costo >= 0)) return bad("Costo inválido.");

      const anfs = Array.isArray(b.anfitriones) ? (b.anfitriones as { id: string; prioridad?: number }[]) : [];
      if (b.activo === true && anfs.length === 0) return bad("Para activar un producto asigna al menos un anfitrión.");
      if (!b.permite_presencial && !b.permite_video) return bad("Permite al menos una modalidad.");

      const fila = {
        slug,
        nombre,
        descripcion: txt(b.descripcion, 400) || null,
        duracion_min: Math.round(dur),
        buffer_min: Math.round(buf),
        costo_mxn: costo,
        mostrar_costo: b.mostrar_costo === true && costo !== null,
        permite_presencial: b.permite_presencial === true,
        permite_video: b.permite_video === true,
        activo: b.activo === true,
        orden: Math.round(num(b.orden ?? 0)) || 0,
      };
      const q =
        typeof b.id === "string" && b.id
          ? db.from("productos_reunion").update(fila).eq("id", b.id).select("id").single()
          : db.from("productos_reunion").insert(fila).select("id").single();
      const { data, error } = await q;
      if (error || !data) return bad(error?.code === "23505" ? "Ya existe un producto con ese identificador." : "No se pudo guardar.", 409);

      await db.from("producto_anfitriones").delete().eq("producto_id", data.id);
      if (anfs.length) {
        await db.from("producto_anfitriones").insert(
          anfs.map((a, i) => ({ producto_id: data.id, anfitrion_id: a.id, prioridad: Number.isFinite(a.prioridad) ? a.prioridad : i }))
        );
      }
      return json({ ok: true, id: data.id });
    }

    case "guardar_anfitrion": {
      const nombre = txt(b.nombre, 80);
      const email = txt(b.email, 254).toLowerCase();
      const enlace = txt(b.enlace_video, 300);
      const zona = txt(b.zona_horaria, 64) || "America/Mazatlan";
      if (nombre.length < 2) return bad("Escribe el nombre.");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad("Correo inválido.");
      if (enlace && !esUrlHttps(enlace)) return bad("El enlace de videollamada debe empezar con https://");
      if (!esZonaValida(zona)) return bad("Zona horaria inválida.");

      const reglas = (Array.isArray(b.reglas) ? b.reglas : []) as { dia_semana: number; hora_inicio: string; hora_fin: string }[];
      for (const r of reglas) {
        if (!(r.dia_semana >= 0 && r.dia_semana <= 6) || !HORA_RE.test(r.hora_inicio) || !HORA_RE.test(r.hora_fin) || r.hora_fin <= r.hora_inicio) {
          return bad("Revisa los horarios: la hora de fin debe ser posterior a la de inicio.");
        }
      }
      if (b.activo === true && (!email || reglas.length === 0)) return bad("Para activar un anfitrión necesita correo y al menos un horario semanal.");

      const fila = { nombre, email: email || null, whatsapp: txt(b.whatsapp, 30) || null, enlace_video: enlace || null, zona_horaria: zona, activo: b.activo === true };
      let id = typeof b.id === "string" ? b.id : "";
      if (id) {
        const { error } = await db.from("anfitriones").update(fila).eq("id", id);
        if (error) return bad("No se pudo guardar.", 409);
      } else {
        const slug = txt(b.slug, 40).toLowerCase() || nombre.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        if (!SLUG_RE.test(slug)) return bad("Identificador inválido.");
        const { data, error } = await db.from("anfitriones").insert({ ...fila, slug }).select("id").single();
        if (error || !data) return bad("No se pudo crear (¿identificador repetido?).", 409);
        id = data.id;
      }
      await db.from("disponibilidad_semanal").delete().eq("anfitrion_id", id);
      if (reglas.length) {
        await db.from("disponibilidad_semanal").insert(reglas.map((r) => ({ anfitrion_id: id, dia_semana: r.dia_semana, hora_inicio: r.hora_inicio, hora_fin: r.hora_fin })));
      }
      return json({ ok: true, id });
    }

    // ── Bloqueos ───────────────────────────────────────────────────────────
    case "agregar_bloqueo": {
      if (!esFechaIso(b.inicio) || !esFechaIso(b.fin) || Date.parse(b.fin) <= Date.parse(b.inicio)) return bad("Revisa las fechas del bloqueo.");
      const { error } = await db.from("bloqueos").insert({
        anfitrion_id: typeof b.anfitrion_id === "string" && b.anfitrion_id ? b.anfitrion_id : null,
        inicio: b.inicio,
        fin: b.fin,
        motivo: txt(b.motivo, 120) || null,
      });
      return error ? bad("No se pudo guardar el bloqueo.", 409) : json({ ok: true });
    }

    case "borrar_bloqueo": {
      if (typeof b.id !== "string") return bad("Falta el bloqueo.");
      const { error } = await db.from("bloqueos").delete().eq("id", b.id);
      return error ? bad("No se pudo borrar.", 409) : json({ ok: true });
    }

    // ── Ajustes ────────────────────────────────────────────────────────────
    case "guardar_oficina": {
      const direccion = txt(b.direccion, 200);
      const maps = txt(b.maps_url, 400);
      if (direccion.length < 5) return bad("Escribe la dirección.");
      if (maps && !esUrlHttps(maps)) return bad("El enlace de mapa debe empezar con https://");
      const { error } = await db.from("ajustes").upsert({ clave: "oficina", valor: { direccion, maps_url: maps || null } });
      return error ? bad("No se pudo guardar.", 409) : json({ ok: true });
    }

    default:
      return bad("Acción desconocida.");
  }
}
