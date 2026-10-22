"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { accion, Aviso, fechaCorta, localAUtc, P, type DatosPanel } from "./comun";

// Bloqueos: vacaciones, juntas, citas médicas… lo que no es una reunión de
// Allitron pero ocupa el tiempo. Quitan esos horarios de la agenda pública.
export default function TabBloqueos({ datos, recargar }: { datos: DatosPanel; recargar: () => Promise<void> }) {
  const [f, setF] = useState({ anfitrion: "", inicio: "", fin: "", motivo: "" });
  const [msg, setMsg] = useState<{ tipo: "ok" | "error"; t: string } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const nombre = (id: string | null) => (id ? datos.anfitriones.find((a) => a.id === id)?.nombre ?? "—" : "Todo el equipo");

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!f.inicio || !f.fin) return setMsg({ tipo: "error", t: "Indica inicio y fin." });
    setEnviando(true);
    const r = await accion({ accion: "agregar_bloqueo", anfitrion_id: f.anfitrion || null, inicio: localAUtc(f.inicio), fin: localAUtc(f.fin), motivo: f.motivo });
    setEnviando(false);
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo guardar." });
    setMsg({ tipo: "ok", t: "Bloqueo agregado." });
    setF({ anfitrion: "", inicio: "", fin: "", motivo: "" });
    await recargar();
  }

  async function borrar(id: string) {
    const r = await accion({ accion: "borrar_bloqueo", id });
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo borrar." });
    await recargar();
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={agregar} className={`${P.card} grid gap-4 sm:grid-cols-4`}>
        <div><label className={P.label} htmlFor="b-anf">Quién</label>
          <select id="b-anf" className={P.input} value={f.anfitrion} onChange={(e) => setF({ ...f, anfitrion: e.target.value })}>
            <option value="">Todo el equipo</option>
            {datos.anfitriones.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select></div>
        <div><label className={P.label} htmlFor="b-ini">Desde (hora de Tepic)</label><input id="b-ini" type="datetime-local" step={1800} className={P.input} value={f.inicio} onChange={(e) => setF({ ...f, inicio: e.target.value })} /></div>
        <div><label className={P.label} htmlFor="b-fin">Hasta</label><input id="b-fin" type="datetime-local" step={1800} className={P.input} value={f.fin} onChange={(e) => setF({ ...f, fin: e.target.value })} /></div>
        <div><label className={P.label} htmlFor="b-mot">Motivo</label><input id="b-mot" className={P.input} maxLength={120} value={f.motivo} onChange={(e) => setF({ ...f, motivo: e.target.value })} /></div>
        <div className="sm:col-span-4"><button className={P.btn} disabled={enviando}>Agregar bloqueo</button></div>
      </form>
      {msg && <Aviso tipo={msg.tipo}>{msg.t}</Aviso>}
      {datos.bloqueos.length === 0 ? (
        <div className={`${P.card} text-center font-body text-[0.9rem] text-secondary`}>No hay bloqueos próximos.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {datos.bloqueos.map((b) => (
            <li key={b.id} className={`${P.card} flex items-center justify-between gap-3 !py-3`}>
              <div className="font-body text-[0.86rem] text-[#101820]">
                <strong>{nombre(b.anfitrion_id)}</strong> · {fechaCorta(b.inicio)} → {fechaCorta(b.fin)}
                {b.motivo && <span className="text-secondary"> · {b.motivo}</span>}
              </div>
              <button className={P.btnDanger} aria-label="Borrar bloqueo" onClick={() => borrar(b.id)}><Trash2 className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
