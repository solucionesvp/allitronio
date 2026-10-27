"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { Anfitrion, Oficina, ProductoReunion } from "@/lib/reuniones/types";
import { accion, Aviso, DIAS, P, type DatosPanel } from "./comun";

type Msg = { tipo: "ok" | "error"; t: string } | null;

// ── Productos ───────────────────────────────────────────────────────────────
function EditorProducto({ p, datos, alGuardar }: { p: ProductoReunion | null; datos: DatosPanel; alGuardar: () => Promise<void> }) {
  const enlaces = p ? datos.enlaces.filter((e) => e.producto_id === p.id) : [];
  const [abierto, setAbierto] = useState(!p);
  const [f, setF] = useState({
    slug: p?.slug ?? "",
    nombre: p?.nombre ?? "",
    descripcion: p?.descripcion ?? "",
    duracion_min: String(p?.duracion_min ?? 30),
    buffer_min: String(p?.buffer_min ?? 0),
    costo_mxn: p?.costo_mxn != null ? String(p.costo_mxn) : "",
    mostrar_costo: p?.mostrar_costo ?? false,
    permite_presencial: p?.permite_presencial ?? true,
    permite_video: p?.permite_video ?? true,
    activo: p?.activo ?? false,
    orden: String(p?.orden ?? 0),
  });
  const [anfs, setAnfs] = useState<Set<string>>(new Set(enlaces.map((e) => e.anfitrion_id)));
  const [msg, setMsg] = useState<Msg>(null);
  const [guardando, setGuardando] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setMsg(null);
    const r = await accion({
      accion: "guardar_producto",
      id: p?.id,
      ...f,
      costo_mxn: f.costo_mxn === "" ? null : Number(f.costo_mxn),
      duracion_min: Number(f.duracion_min),
      buffer_min: Number(f.buffer_min),
      orden: Number(f.orden),
      anfitriones: [...anfs].map((id) => ({ id, prioridad: enlaces.find((x) => x.anfitrion_id === id)?.prioridad ?? 0 })),
    });
    setGuardando(false);
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo guardar." });
    setMsg({ tipo: "ok", t: "Guardado." });
    if (!p) setAbierto(false);
    await alGuardar();
  }

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));

  return (
    <article className={P.card}>
      <button type="button" className="flex w-full items-center justify-between gap-3 text-left" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
        <span className="font-display text-[0.95rem] font-black text-[#101820]">{p ? p.nombre : "Nuevo producto"}</span>
        {p && <span className={`rounded-full px-2.5 py-1 font-display text-[0.8rem] font-bold ${p.activo ? "bg-allitron-blue/15 text-allitron-navy" : "bg-[#101820]/[0.07] text-secondary"}`}>{p.activo ? `Activo · ${p.duracion_min} min` : "Inactivo"}</span>}
        {!p && <Plus className="h-4 w-4 text-allitron-navy" />}
      </button>
      {abierto && (
        <form onSubmit={guardar} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><label className={P.label}>Nombre</label><input className={P.input} required value={f.nombre} onChange={(e) => set("nombre", e.target.value)} /></div>
          <div><label className={P.label}>Identificador (URL: /reuniones?producto=…)</label><input className={P.input} required disabled={Boolean(p)} value={f.slug} onChange={(e) => set("slug", e.target.value.toLowerCase())} /></div>
          <div className="sm:col-span-2"><label className={P.label}>Descripción corta (se muestra al cliente)</label><input className={P.input} maxLength={400} value={f.descripcion} onChange={(e) => set("descripcion", e.target.value)} /></div>
          <div><label className={P.label}>Duración (min)</label><input type="number" min={10} max={240} step={1} className={P.input} value={f.duracion_min} onChange={(e) => set("duracion_min", e.target.value)} /></div>
          <div><label className={P.label}>Margen entre reuniones (min)</label><input type="number" min={0} max={120} step={1} className={P.input} value={f.buffer_min} onChange={(e) => set("buffer_min", e.target.value)} /></div>
          <div><label className={P.label}>Costo (MXN, vacío = sin costo definido)</label><input type="number" min={0} step="0.01" className={P.input} value={f.costo_mxn} onChange={(e) => set("costo_mxn", e.target.value)} /></div>
          <div><label className={P.label}>Orden en la lista</label><input type="number" className={P.input} value={f.orden} onChange={(e) => set("orden", e.target.value)} /></div>
          <fieldset className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-2 font-body text-[0.84rem] text-[#101820]">
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.permite_video} onChange={(e) => set("permite_video", e.target.checked)} /> Videollamada</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.permite_presencial} onChange={(e) => set("permite_presencial", e.target.checked)} /> Presencial (Tepic)</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.mostrar_costo} onChange={(e) => set("mostrar_costo", e.target.checked)} /> Mostrar costo al cliente</label>
          </fieldset>
          <fieldset className="sm:col-span-2">
            <legend className={P.label}>Quién la atiende</legend>
            <div className="flex flex-wrap gap-4 font-body text-[0.86rem] text-[#101820]">
              {datos.anfitriones.map((a: Anfitrion) => (
                <label key={a.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={anfs.has(a.id)} onChange={(e) => { const n = new Set(anfs); if (e.target.checked) n.add(a.id); else n.delete(a.id); setAnfs(n); }} />
                  {a.nombre} {!a.activo && <span className="text-secondary">(inactivo)</span>}
                </label>
              ))}
            </div>
            <p className="mt-2 font-body text-[0.85rem] text-secondary">Si atienden varios, la reserva se asigna a quien tenga menos reuniones.</p>
          </fieldset>
          <label className="sm:col-span-2 flex items-center gap-2 font-body text-[0.9rem] font-semibold text-[#101820]"><input type="checkbox" checked={f.activo} onChange={(e) => set("activo", e.target.checked)} /> Activo (visible y reservable en /reuniones)</label>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button className={P.btn} disabled={guardando}>{guardando && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Guardar producto</button>
            {msg && <span className={`font-body text-[0.84rem] ${msg.tipo === "ok" ? "text-allitron-navy" : "text-[#B4541B]"}`} role="status">{msg.t}</span>}
          </div>
        </form>
      )}
    </article>
  );
}

// ── Equipo y horarios ───────────────────────────────────────────────────────
type Rango = { ini: string; fin: string };

function EditorAnfitrion({ a, datos, alGuardar }: { a: Anfitrion | null; datos: DatosPanel; alGuardar: () => Promise<void> }) {
  const reglasIniciales = a ? datos.reglas.filter((r) => r.anfitrion_id === a.id) : [];
  const [abierto, setAbierto] = useState(!a);
  const [f, setF] = useState({
    nombre: a?.nombre ?? "",
    email: a?.email ?? "",
    whatsapp: a?.whatsapp ?? "",
    enlace_video: a?.enlace_video ?? "",
    zona_horaria: a?.zona_horaria ?? "America/Mazatlan",
    activo: a?.activo ?? false,
  });
  const [horario, setHorario] = useState<Record<number, Rango[]>>(() => {
    const m: Record<number, Rango[]> = {};
    for (const r of reglasIniciales) (m[r.dia_semana] ??= []).push({ ini: r.hora_inicio.slice(0, 5), fin: r.hora_fin.slice(0, 5) });
    return m;
  });
  const [msg, setMsg] = useState<Msg>(null);
  const [guardando, setGuardando] = useState(false);

  const semana = (dias: number[], rangos: Rango[]) => Object.fromEntries(dias.map((d) => [d, rangos.map((r) => ({ ...r }))])) as Record<number, Rango[]>;
  const presetOficina = () => setHorario(semana([1, 2, 3, 4, 5], [{ ini: "09:00", fin: "18:00" }]));
  const presetDomina = () => setHorario(semana([1, 2, 3, 4, 5, 6], [{ ini: "09:00", fin: "11:00" }, { ini: "17:00", fin: "20:00" }]));
  const limpiarTodo = () => {
    setHorario({});
    setMsg({ tipo: "ok", t: "Horario vacío. Arma el que quieras y toca Guardar (no se guarda hasta entonces)." });
  };
  /** Copia lo del primer día con horario a todos los días de lunes a sábado. */
  const copiarATodos = () =>
    setHorario((h) => {
      const base = [1, 2, 3, 4, 5, 6, 0].map((d) => h[d]).find((x) => x && x.length > 0);
      return base ? semana([1, 2, 3, 4, 5, 6], base) : h;
    });
  const copiarDia = (d: number) => setHorario((h) => ({ ...h, ...semana([1, 2, 3, 4, 5, 6].filter((x) => x !== d), h[d] ?? []) }));
  const cambiar = (d: number, i: number, k: keyof Rango, v: string) =>
    setHorario((h) => ({ ...h, [d]: (h[d] ?? []).map((r, j) => (j === i ? { ...r, [k]: v } : r)) }));

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setMsg(null);
    const reglas = Object.entries(horario).flatMap(([d, rs]) => rs.map((r) => ({ dia_semana: Number(d), hora_inicio: r.ini, hora_fin: r.fin })));
    for (const x of reglas) {
      if (!x.hora_inicio || !x.hora_fin || x.hora_fin <= x.hora_inicio) {
        const nom = DIAS.find((d) => d.n === x.dia_semana)?.nombre ?? "";
        setGuardando(false);
        return setMsg({ tipo: "error", t: `${nom}: la hora de fin debe ser posterior a la de inicio (cada rango va dentro del mismo día).` });
      }
    }
    // Sin horario no puede estar activo: se guarda inactivo en vez de rechazar el cambio.
    const sinHorario = reglas.length === 0 && f.activo;
    if (sinHorario) setF((x) => ({ ...x, activo: false }));
    const r = await accion({ accion: "guardar_anfitrion", id: a?.id, ...f, activo: sinHorario ? false : f.activo, reglas });
    setGuardando(false);
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo guardar." });
    setMsg({ tipo: "ok", t: sinHorario ? "Guardado sin horario: quedó inactivo hasta que agregues uno." : "Guardado." });
    await alGuardar();
  }

  return (
    <article className={P.card}>
      <button type="button" className="flex w-full items-center justify-between gap-3 text-left" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
        <span className="font-display text-[0.95rem] font-black text-[#101820]">{a ? a.nombre : "Nuevo anfitrión"}</span>
        {a && <span className={`rounded-full px-2.5 py-1 font-display text-[0.8rem] font-bold ${a.activo ? "bg-allitron-blue/15 text-allitron-navy" : "bg-allitron-orange/15 text-[#B4541B]"}`}>{a.activo ? "Activo" : "Falta completar / inactivo"}</span>}
      </button>
      {abierto && (
        <form onSubmit={guardar} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><label className={P.label}>Nombre</label><input className={P.input} required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} /></div>
          <div><label className={P.label}>Correo (recibe los avisos)</label><input type="email" className={P.input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div><label className={P.label}>WhatsApp</label><input className={P.input} value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} /></div>
          <div><label className={P.label}>Zona horaria</label><input className={P.input} value={f.zona_horaria} onChange={(e) => setF({ ...f, zona_horaria: e.target.value })} /></div>
          <div className="sm:col-span-2"><label className={P.label}>Enlace fijo de videollamada (Meet/Zoom, https://…)</label><input className={P.input} placeholder="https://meet.google.com/…" value={f.enlace_video} onChange={(e) => setF({ ...f, enlace_video: e.target.value })} /></div>

          <fieldset className="sm:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <legend className={`${P.label} !mb-0`}>Horario semanal en que se puede agendar</legend>
            </div>
            <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Atajos de horario">
              <button type="button" className={P.btnDanger} onClick={limpiarTodo}><Trash2 className="h-3.5 w-3.5" /> Borrar todo el horario</button>
              <button type="button" className={P.btnGhost} onClick={presetDomina}>Lun–Sáb 9–11 y 17–20</button>
              <button type="button" className={P.btnGhost} onClick={presetOficina}>Lun–Vie 9–18</button>
              <button type="button" className={P.btnGhost} onClick={copiarATodos}>Copiar a Lun–Sáb</button>
            </div>
            <div className="flex flex-col gap-2">
              {DIAS.map((d) => (
                <div key={d.n} className="grid items-start gap-2 sm:grid-cols-[110px_1fr]">
                  <span className="pt-2 font-body text-[0.86rem] text-[#101820]">{d.nombre}</span>
                  <div className="flex flex-col gap-2">
                    {(horario[d.n] ?? []).length === 0 && <span className="pt-2 font-body text-[0.8rem] text-secondary">No disponible</span>}
                    {(horario[d.n] ?? []).map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="time" step={60} aria-label={`${d.nombre} desde`} className={`${P.input} !w-auto`} value={r.ini} onChange={(e) => cambiar(d.n, i, "ini", e.target.value)} />
                        <span className="text-secondary">a</span>
                        <input type="time" step={60} aria-label={`${d.nombre} hasta`} className={`${P.input} !w-auto`} value={r.fin} onChange={(e) => cambiar(d.n, i, "fin", e.target.value)} />
                        <button type="button" className={P.btnDanger} aria-label="Quitar rango" onClick={() => setHorario((h) => ({ ...h, [d.n]: (h[d.n] ?? []).filter((_, j) => j !== i) }))}><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className={`${P.btnGhost} !w-fit`} onClick={() => setHorario((h) => ({ ...h, [d.n]: [...(h[d.n] ?? []), { ini: "09:00", fin: "13:00" }] }))}><Plus className="h-3.5 w-3.5" /> Añadir rango</button>
                      {(horario[d.n] ?? []).length > 0 && <button type="button" className={`${P.btnGhost} !w-fit`} onClick={() => copiarDia(d.n)}>Copiar a Lun–Sáb</button>}
                      {(horario[d.n] ?? []).length > 0 && <button type="button" className={`${P.btnGhost} !w-fit`} onClick={() => setHorario((h) => ({ ...h, [d.n]: [] }))}>Vaciar día</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <label className="sm:col-span-2 flex items-center gap-2 font-body text-[0.9rem] font-semibold text-[#101820]"><input type="checkbox" checked={f.activo} onChange={(e) => setF({ ...f, activo: e.target.checked })} /> Activo (recibe reuniones y avisos). Requiere correo y al menos un horario.</label>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button className={P.btn} disabled={guardando}>{guardando && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Guardar</button>
            {msg && <span className={`font-body text-[0.84rem] ${msg.tipo === "ok" ? "text-allitron-navy" : "text-[#B4541B]"}`} role="status">{msg.t}</span>}
          </div>
        </form>
      )}
    </article>
  );
}

// ── Oficina ─────────────────────────────────────────────────────────────────
function EditorOficina({ oficina, alGuardar }: { oficina: Oficina; alGuardar: () => Promise<void> }) {
  const [f, setF] = useState({ direccion: oficina.direccion, maps_url: oficina.maps_url ?? "" });
  const [msg, setMsg] = useState<Msg>(null);
  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    const r = await accion({ accion: "guardar_oficina", ...f });
    setMsg(r.ok ? { tipo: "ok", t: "Guardado." } : { tipo: "error", t: r.mensaje ?? "No se pudo guardar." });
    if (r.ok) await alGuardar();
  }
  return (
    <form onSubmit={guardar} className={`${P.card} grid gap-4`}>
      <div><label className={P.label}>Dirección donde se reciben las reuniones presenciales</label><input className={P.input} required value={f.direccion} onChange={(e) => setF({ ...f, direccion: e.target.value })} /></div>
      <div><label className={P.label}>Enlace de Google Maps (opcional; si lo dejas vacío se genera por dirección)</label><input className={P.input} placeholder="https://maps.app.goo.gl/…" value={f.maps_url} onChange={(e) => setF({ ...f, maps_url: e.target.value })} /></div>
      <div className="flex items-center gap-4"><button className={P.btn}>Guardar oficina</button>{msg && <span className={`font-body text-[0.84rem] ${msg.tipo === "ok" ? "text-allitron-navy" : "text-[#B4541B]"}`} role="status">{msg.t}</span>}</div>
    </form>
  );
}

export default function TabCatalogo({ datos, recargar }: { datos: DatosPanel; recargar: () => Promise<void> }) {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className={P.h2}>Equipo y horarios</h2>
        <Aviso tipo="info">Cada anfitrión necesita correo, un horario semanal y (para videollamada) su enlace fijo. Sin eso no aparece en la agenda pública.</Aviso>
        {datos.anfitriones.map((a) => <EditorAnfitrion key={`${a.id}-${a.activo}`} a={a} datos={datos} alGuardar={recargar} />)}
        <EditorAnfitrion key="nuevo-anf" a={null} datos={datos} alGuardar={recargar} />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className={P.h2}>Productos y reuniones</h2>
        <Aviso tipo="info">Las duraciones iniciales son provisionales (30 min). Ajusta, asigna quién atiende y actívalos cuando estén listos.</Aviso>
        {datos.productos.map((p) => <EditorProducto key={`${p.id}-${p.activo}`} p={p} datos={datos} alGuardar={recargar} />)}
        <EditorProducto key="nuevo-prod" p={null} datos={datos} alGuardar={recargar} />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className={P.h2}>Oficina</h2>
        <EditorOficina oficina={datos.oficina} alGuardar={recargar} />
      </section>
    </div>
  );
}
