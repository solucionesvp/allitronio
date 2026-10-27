"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { ZONA_OFICINA } from "@/lib/reuniones/config";
import { formatoHora, ymdEnZona } from "@/lib/reuniones/tz";
import type { Modalidad } from "@/lib/reuniones/types";
import { accion, Aviso, localAUtc, P, type DatosPanel } from "./comun";

// Agendar POR el cliente (cuando escribe por WhatsApp o ya está contigo).
// Usa los mismos horarios libres que la página pública; «horario manual»
// permite salirse de ellos, pero el candado de traslape siempre aplica.
export default function TabNueva({ datos, recargar }: { datos: DatosPanel; recargar: () => Promise<void> }) {
  const activos = datos.productos.filter((p) => p.activo);
  const [slug, setSlug] = useState("");
  const [modalidad, setModalidad] = useState<Modalidad>("video");
  const [anfitrion, setAnfitrion] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [inicio, setInicio] = useState("");
  const [manual, setManual] = useState(false);
  const [manualValor, setManualValor] = useState("");
  const [c, setC] = useState({ nombre: "", email: "", whatsapp: "", empresa: "", notas: "" });
  const [enviando, setEnviando] = useState(false);
  const [msg, setMsg] = useState<{ tipo: "ok" | "error"; t: string } | null>(null);

  const producto = activos.find((p) => p.slug === slug);
  const idsProducto = new Set(producto ? datos.enlaces.filter((e) => e.producto_id === producto.id).map((e) => e.anfitrion_id) : []);
  const hostsProducto = datos.anfitriones.filter((a) => idsProducto.has(a.id) && a.activo);

  useEffect(() => {
    if (!slug || manual) return;
    let vivo = true;
    fetch(`/api/reuniones/disponibilidad?producto=${encodeURIComponent(slug)}&modalidad=${modalidad}`)
      .then((r) => r.json())
      .then((j) => {
        if (!vivo) return;
        setSlots(j.ok ? j.slots : []);
        setInicio("");
      })
      .catch(() => vivo && setSlots([]));
    return () => {
      vivo = false;
    };
  }, [slug, modalidad, manual]);

  const etiqueta = (iso: string) => {
    const d = new Date(iso);
    const dia = new Intl.DateTimeFormat("es-MX", { timeZone: ZONA_OFICINA, weekday: "short", day: "numeric", month: "short" }).format(d).replace(/\./g, "");
    return `${dia} · ${formatoHora(d, ZONA_OFICINA)}`;
  };
  const porDia = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of slots) m.set(ymdEnZona(new Date(s), ZONA_OFICINA), [...(m.get(ymdEnZona(new Date(s), ZONA_OFICINA)) ?? []), s]);
    return [...m.values()];
  }, [slots]);

  async function crear(e: React.FormEvent) {
    e.preventDefault();
    const iso = manual ? (manualValor ? localAUtc(manualValor) : "") : inicio;
    if (!iso) return setMsg({ tipo: "error", t: "Elige el horario." });
    setEnviando(true);
    setMsg(null);
    const r = await accion({ accion: "crear_reunion", producto: slug, inicio: iso, modalidad, anfitrion_id: anfitrion || undefined, forzar: manual, ...c });
    setEnviando(false);
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo agendar." });
    setMsg({ tipo: "ok", t: `Reunión agendada.${r.correos?.cliente && r.correos.equipo ? " Se enviaron los correos al cliente y al equipo." : " Atención: algún correo no salió; revisa la agenda."}` });
    setC({ nombre: "", email: "", whatsapp: "", empresa: "", notas: "" });
    setInicio("");
    await recargar();
  }

  if (activos.length === 0) return <Aviso tipo="info">Aún no hay productos activos. Actívalos en la pestaña «Catálogo».</Aviso>;

  return (
    <form onSubmit={crear} className={`${P.card} grid gap-5 sm:grid-cols-2`}>
      <div>
        <label className={P.label} htmlFor="n-prod">Producto</label>
        <select id="n-prod" className={P.input} required value={slug} onChange={(e) => { setSlug(e.target.value); setAnfitrion(""); }}>
          <option value="">Elige…</option>
          {activos.map((p) => <option key={p.id} value={p.slug}>{p.nombre} · {p.duracion_min} min</option>)}
        </select>
      </div>
      <div>
        <label className={P.label} htmlFor="n-mod">Modalidad</label>
        <select id="n-mod" className={P.input} value={modalidad} onChange={(e) => setModalidad(e.target.value as Modalidad)}>
          {(!producto || producto.permite_video) && <option value="video">Videollamada</option>}
          {(!producto || producto.permite_presencial) && <option value="presencial">Presencial</option>}
        </select>
      </div>
      <div>
        <label className={P.label} htmlFor="n-anf">Atiende</label>
        <select id="n-anf" className={P.input} value={anfitrion} onChange={(e) => setAnfitrion(e.target.value)}>
          <option value="">Automático (quien esté libre)</option>
          {hostsProducto.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </select>
      </div>
      <div>
        <label className={P.label} htmlFor="n-hora">Horario (hora de Tepic)</label>
        {manual ? (
          <input id="n-hora" type="datetime-local" step={60} className={P.input} value={manualValor} onChange={(e) => setManualValor(e.target.value)} />
        ) : (
          <select id="n-hora" className={P.input} value={inicio} onChange={(e) => setInicio(e.target.value)} disabled={!slug}>
            <option value="">{slug ? (slots.length ? "Elige…" : "Sin horarios libres") : "Primero elige producto"}</option>
            {porDia.map((hs) => (
              <optgroup key={hs[0]} label={etiqueta(hs[0]).split(" · ")[0]}>
                {hs.map((s) => <option key={s} value={s}>{etiqueta(s)}</option>)}
              </optgroup>
            ))}
          </select>
        )}
        <label className="mt-2 flex items-center gap-2 font-body text-[0.8rem] text-secondary"><input type="checkbox" checked={manual} onChange={(e) => setManual(e.target.checked)} /> Horario manual (ignora horarios y bloqueos)</label>
      </div>
      <div><label className={P.label} htmlFor="n-nom">Nombre del cliente</label><input id="n-nom" className={P.input} required value={c.nombre} onChange={(e) => setC({ ...c, nombre: e.target.value })} /></div>
      <div><label className={P.label} htmlFor="n-mail">Correo</label><input id="n-mail" type="email" className={P.input} required value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></div>
      <div><label className={P.label} htmlFor="n-wa">WhatsApp</label><input id="n-wa" className={P.input} value={c.whatsapp} onChange={(e) => setC({ ...c, whatsapp: e.target.value })} /></div>
      <div><label className={P.label} htmlFor="n-emp">Empresa</label><input id="n-emp" className={P.input} value={c.empresa} onChange={(e) => setC({ ...c, empresa: e.target.value })} /></div>
      <div className="sm:col-span-2"><label className={P.label} htmlFor="n-notas">Notas</label><textarea id="n-notas" rows={2} className={`${P.input} resize-none`} maxLength={500} value={c.notas} onChange={(e) => setC({ ...c, notas: e.target.value })} /></div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button className={P.btn} disabled={enviando || !slug}>{enviando && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Agendar y avisar</button>
        <p className="font-body text-[0.85rem] text-secondary">Se envía confirmación al cliente y copia a Lups y Alejandro, igual que una reserva en línea.</p>
      </div>
      {msg && <div className="sm:col-span-2"><Aviso tipo={msg.tipo}>{msg.t}</Aviso></div>}
    </form>
  );
}
