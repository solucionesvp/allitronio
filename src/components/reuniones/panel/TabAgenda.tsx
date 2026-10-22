"use client";

import { useMemo, useState } from "react";
import { Check, Loader2, MessageCircle, Send, TriangleAlert, Video, MapPin, X } from "lucide-react";
import { enlaceWhatsapp, urlGestion } from "@/lib/reuniones/evento";
import type { Reunion } from "@/lib/reuniones/types";
import { accion, Aviso, fechaCorta, localAUtc, P, utcALocal, type DatosPanel } from "./comun";

type Filtro = "proximas" | "por_marcar" | "canceladas" | "todas";

const ESTADO: Record<Reunion["estado"], { t: string; c: string }> = {
  confirmada: { t: "Confirmada", c: "bg-allitron-blue/15 text-allitron-navy" },
  realizada: { t: "Realizada", c: "bg-emerald-500/15 text-emerald-800" },
  no_asistio: { t: "No asistió", c: "bg-allitron-orange/15 text-[#B4541B]" },
  cancelada: { t: "Cancelada", c: "bg-[#101820]/[0.07] text-secondary" },
};

export default function TabAgenda({ datos, ahora, recargar }: { datos: DatosPanel; ahora: number; recargar: () => Promise<void> }) {
  const [filtro, setFiltro] = useState<Filtro>("proximas");
  const [msg, setMsg] = useState<{ tipo: "ok" | "error"; t: string } | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [abierto, setAbierto] = useState<{ id: string; modo: "reprogramar" | "cancelar" } | null>(null);
  const [nuevoInicio, setNuevoInicio] = useState("");
  const [forzar, setForzar] = useState(false);
  const [motivo, setMotivo] = useState("");

  const nombreAnf = useMemo(() => new Map(datos.anfitriones.map((a) => [a.id, a.nombre])), [datos.anfitriones]);
  const fallidos = useMemo(() => new Set(datos.correoFallido), [datos.correoFallido]);

  const grupos = useMemo(() => {
    const todas = datos.reuniones;
    const proximas = todas.filter((r) => r.estado === "confirmada" && Date.parse(r.fin) > ahora);
    const porMarcar = todas.filter((r) => r.estado === "confirmada" && Date.parse(r.fin) <= ahora);
    const canceladas = todas.filter((r) => r.estado === "cancelada");
    return { proximas, porMarcar, canceladas, todas };
  }, [datos.reuniones, ahora]);

  const lista = useMemo(() => {
    const m = { proximas: grupos.proximas, por_marcar: grupos.porMarcar, canceladas: grupos.canceladas, todas: grupos.todas }[filtro];
    return [...m].sort((a, b) => (filtro === "proximas" ? Date.parse(a.inicio) - Date.parse(b.inicio) : Date.parse(b.inicio) - Date.parse(a.inicio)));
  }, [grupos, filtro]);

  async function ejecutar(id: string, cuerpo: Record<string, unknown>, exito: string) {
    setOcupado(id);
    setMsg(null);
    const r = await accion(cuerpo);
    setOcupado(null);
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo completar." });
    const correo = r.correos ? (r.correos.cliente && r.correos.equipo ? " Correos enviados." : " Atención: algún correo no salió; revisa el aviso de la reunión.") : "";
    setMsg({ tipo: "ok", t: exito + correo });
    setAbierto(null);
    setMotivo("");
    setForzar(false);
    await recargar();
  }

  const tabs: { id: Filtro; t: string; n: number }[] = [
    { id: "proximas", t: "Próximas", n: grupos.proximas.length },
    { id: "por_marcar", t: "Por marcar", n: grupos.porMarcar.length },
    { id: "canceladas", t: "Canceladas", n: grupos.canceladas.length },
    { id: "todas", t: "Todas", n: grupos.todas.length },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtro de agenda">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={filtro === t.id} onClick={() => setFiltro(t.id)} className={`min-h-[44px] rounded-full border-2 px-5 py-2 font-display text-[0.9rem] font-bold transition-colors ${filtro === t.id ? "border-allitron-blue bg-allitron-blue/15 text-allitron-navy" : "border-[#101820]/15 text-secondary hover:text-[#101820]"}`}>
            {t.t} <span className="ml-1 opacity-70">{t.n}</span>
            {t.id === "por_marcar" && t.n > 0 && <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-allitron-orange align-middle" />}
          </button>
        ))}
      </div>

      {filtro === "por_marcar" && grupos.porMarcar.length > 0 && <Aviso tipo="info">Estas reuniones ya pasaron. Márcalas como realizadas o sin asistencia: así el seguimiento sabe a quién dar las gracias y a quién ofrecerle reagendar.</Aviso>}
      {msg && <Aviso tipo={msg.tipo}>{msg.t}</Aviso>}

      {lista.length === 0 && <div className={`${P.card} text-center font-body text-[0.9rem] text-secondary`}>No hay reuniones en esta vista.</div>}

      {lista.map((r) => {
        const wa = enlaceWhatsapp(r.cliente_whatsapp, `Hola ${r.cliente_nombre.split(" ")[0]}, te escribimos de Allitron sobre tu reunión de ${r.producto_nombre}.`);
        const futura = r.estado === "confirmada" && Date.parse(r.fin) > ahora;
        const pasada = r.estado === "confirmada" && Date.parse(r.fin) <= ahora;
        const bloqueado = ocupado === r.id;
        return (
          <article key={r.id} className={P.card}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-[1.5rem] font-bold leading-none text-[#101820]">{fechaCorta(r.inicio).split(" · ")[1]} <span className="text-[1rem] font-semibold text-allitron-navy">{fechaCorta(r.inicio).split(" · ")[0]}</span></p>
                <p className="mt-2 font-body text-[1rem] font-semibold text-[#101820]">{r.producto_nombre} · <span className="text-secondary">atiende {nombreAnf.get(r.anfitrion_id) ?? "—"}</span></p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {fallidos.has(r.id) && <span className="inline-flex items-center gap-1 rounded-full bg-allitron-orange/15 px-2.5 py-1 font-display text-[0.8rem] font-bold text-[#B4541B]"><TriangleAlert className="h-3 w-3" /> Correo falló</span>}
                <span className="inline-flex items-center gap-1 rounded-full bg-[#101820]/[0.07] px-2.5 py-1 font-display text-[0.8rem] font-bold text-secondary">{r.modalidad === "video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}{r.modalidad === "video" ? "Video" : "Presencial"}</span>
                <span className={`rounded-full px-2.5 py-1 font-display text-[0.8rem] font-bold ${ESTADO[r.estado].c}`}>{ESTADO[r.estado].t}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-1 font-body text-[0.84rem] text-secondary sm:grid-cols-2">
              <p><span className="text-[#101820]">{r.cliente_nombre}</span>{r.cliente_empresa ? ` · ${r.cliente_empresa}` : ""}</p>
              <p><a className="underline underline-offset-2" href={`mailto:${r.cliente_email}`}>{r.cliente_email}</a>{r.cliente_whatsapp ? ` · ${r.cliente_whatsapp}` : ""}</p>
              {r.notas && <p className="sm:col-span-2">“{r.notas}”</p>}
              {r.estado === "cancelada" && <p className="sm:col-span-2">Cancelada por {r.cancelada_por ?? "—"}{r.motivo_cancelacion ? `: ${r.motivo_cancelacion}` : ""}</p>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {wa && <a className={P.btnGhost} href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>}
              {pasada && (
                <>
                  <button className={P.btn} disabled={bloqueado} onClick={() => ejecutar(r.id, { accion: "estado", id: r.id, estado: "realizada" }, "Marcada como realizada.")}><Check className="h-3.5 w-3.5" /> Realizada</button>
                  <button className={P.btnDanger} disabled={bloqueado} onClick={() => ejecutar(r.id, { accion: "estado", id: r.id, estado: "no_asistio" }, "Marcada como sin asistencia.")}><X className="h-3.5 w-3.5" /> No asistió</button>
                </>
              )}
              {futura && (
                <>
                  <button className={P.btnGhost} onClick={() => { setAbierto({ id: r.id, modo: "reprogramar" }); setNuevoInicio(utcALocal(r.inicio)); }}>Reprogramar</button>
                  <button className={P.btnDanger} onClick={() => { setAbierto({ id: r.id, modo: "cancelar" }); }}>Cancelar</button>
                </>
              )}
              {r.estado !== "realizada" && r.estado !== "no_asistio" && (
                <button className={P.btnGhost} disabled={bloqueado} onClick={() => ejecutar(r.id, { accion: "reenviar", id: r.id }, "Correos reenviados.")}>
                  {bloqueado ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />} Reenviar correos
                </button>
              )}
              <button className={P.btnGhost} onClick={() => navigator.clipboard?.writeText(urlGestion(r.token)).then(() => setMsg({ tipo: "ok", t: "Enlace de gestión copiado." }))}>Copiar enlace del cliente</button>
            </div>

            {abierto?.id === r.id && abierto.modo === "reprogramar" && (
              <div className="mt-4 grid gap-3 border-t border-[#101820]/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <label className={P.label} htmlFor={`rp-${r.id}`}>Nuevo horario (hora de Tepic)</label>
                  <input id={`rp-${r.id}`} type="datetime-local" step={1800} className={P.input} value={nuevoInicio} onChange={(e) => setNuevoInicio(e.target.value)} />
                  <label className="mt-2 flex items-center gap-2 font-body text-[0.8rem] text-secondary"><input type="checkbox" checked={forzar} onChange={(e) => setForzar(e.target.checked)} /> Horario manual: ignorar horarios y bloqueos (nunca traslapa con otra reunión)</label>
                </div>
                <div className="flex gap-2">
                  <button className={P.btn} disabled={bloqueado || !nuevoInicio} onClick={() => ejecutar(r.id, { accion: "reprogramar", id: r.id, inicio: localAUtc(nuevoInicio), forzar }, "Reunión reprogramada.")}>Guardar</button>
                  <button className={P.btnGhost} onClick={() => setAbierto(null)}>Cerrar</button>
                </div>
              </div>
            )}
            {abierto?.id === r.id && abierto.modo === "cancelar" && (
              <div className="mt-4 grid gap-3 border-t border-[#101820]/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <label className={P.label} htmlFor={`cn-${r.id}`}>Motivo (opcional)</label>
                  <input id={`cn-${r.id}`} className={P.input} maxLength={300} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <button className={P.btnDanger} disabled={bloqueado} onClick={() => ejecutar(r.id, { accion: "cancelar", id: r.id, motivo }, "Reunión cancelada y cliente avisado.")}>Confirmar cancelación</button>
                  <button className={P.btnGhost} onClick={() => setAbierto(null)}>Cerrar</button>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
