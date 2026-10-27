"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Check, CheckCircle2, Copy, Download, ExternalLink, FileText, Loader2, Mail, MessageCircle, Pencil, Plus, CopyPlus, Send, XCircle } from "lucide-react";
import { ETIQUETA_ESTADO, pesos } from "@/lib/cobros/calculos";
import { enlaceWhatsapp } from "@/lib/cobros/enlaces";
import { folioDe, type CobroCompleto } from "@/lib/cobros/types";
import { accion, Aviso, cargarDetalle, fechaHora, fechaYmd, hoyYmd, Insignia, P } from "./comun";

const EVENTOS: Record<string, string> = {
  creado: "Cobro creado",
  editado: "Cobro editado",
  emitido: "Cobro emitido",
  cancelado: "Cobro cancelado",
  abono: "Abono registrado",
  abono_anulado: "Abono anulado",
  correo_enviado: "Correo enviado al cliente",
  correo_fallo: "El correo no pudo enviarse",
};

export default function DetalleCobro({
  id,
  recargar,
  editar,
  abrir,
  volver,
}: {
  id: string;
  recargar: () => Promise<void>;
  editar: (c: CobroCompleto, agregar?: boolean) => void;
  abrir: (id: string) => void;
  volver: () => void;
}) {
  const [c, setC] = useState<CobroCompleto | null>(null);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState<{ tipo: "ok" | "error"; t: string } | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [ab, setAb] = useState({ fecha: hoyYmd(), monto: "", concepto: "Abono", metodo: "Transferencia", avisar: true });
  const [anulando, setAnulando] = useState<{ id: string; motivo: string } | null>(null);
  const [cancelando, setCancelando] = useState(false);
  const [reenviar, setReenviar] = useState(false);
  const [motivo, setMotivo] = useState("");

  const cargar = useCallback(async () => {
    const d = await cargarDetalle(id);
    if (!d) return setError(true);
    setError(false);
    setC(d);
  }, [id]);

  useEffect(() => {
    let vivo = true;
    (async () => {
      const d = await cargarDetalle(id);
      if (!vivo) return;
      if (!d) setError(true);
      else setC(d);
    })();
    return () => {
      vivo = false;
    };
  }, [id]);

  async function ejecutar(clave: string, cuerpo: Record<string, unknown>, ok: string) {
    setOcupado(clave);
    setMsg(null);
    const r = await accion(cuerpo);
    setOcupado(null);
    if (!r.ok) {
      setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo completar." });
      return r;
    }
    const extra = r.correo && !r.correo.ok ? ` Pero el correo no salió: ${r.correo.mensaje ?? "revisa la configuración"}.` : r.correo?.ok ? " Se avisó al cliente por correo." : "";
    setMsg({ tipo: r.correo && !r.correo.ok ? "error" : "ok", t: ok + extra });
    await Promise.all([cargar(), recargar()]);
    return r;
  }

  if (error) return <div className="flex flex-col gap-4"><Aviso tipo="error">No se pudo cargar el cobro.</Aviso><button className={P.btnGhost} onClick={volver}>Volver a la lista</button></div>;
  if (!c) return <div className="flex justify-center py-16 text-secondary"><Loader2 className="h-7 w-7 animate-spin" /></div>;

  const folio = folioDe(c.folio_num);
  const url = typeof window !== "undefined" ? `${window.location.origin}/cobros/${c.token}` : "";
  const progreso = c.total > 0 ? Math.min(100, (c.abonado / c.total) * 100) : 0;
  const puedeAbonar = c.estado === "emitido" && c.saldo > 0;
  const vivos = c.abonos.filter((a) => !a.anulado_en);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setMsg({ tipo: "error", t: "No se pudo copiar; selecciona el enlace a mano." });
    }
  }

  const wa = enlaceWhatsapp(c.cliente_telefono, `Hola ${c.cliente_nombre}, te comparto tu comprobante ${folio}${c.emisor.nombre ? ` de ${c.emisor.nombre}` : ""}: ${url}`);

  return (
    <div className="flex flex-col gap-6">
      <button className={`${P.btnGhost} self-start`} onClick={volver}>← Todos los cobros</button>

      <section className={P.card}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.85rem] text-secondary">{folio} · {c.tipo_documento === "nota" ? "Nota de cobro" : c.tipo_documento === "recibo" ? "Recibo" : "Factura (comprobante interno)"}</p>
            <h2 className="mt-1 font-display text-[1.7rem] font-black leading-tight text-[#101820]">{c.cliente_nombre}</h2>
            <p className="mt-1 font-body text-[0.95rem] text-secondary">{[c.cliente_email, c.cliente_telefono].filter(Boolean).join(" · ") || "Sin datos de contacto"}</p>
            {c.concepto && <p className="mt-2 font-body text-[1rem] text-[#101820]">{c.concepto}</p>}
            <p className="mt-1 font-body text-[0.85rem] text-secondary">Emitido {fechaYmd(c.fecha_emision)}{c.fecha_vencimiento ? ` · vence ${fechaYmd(c.fecha_vencimiento)}` : ""}</p>
          </div>
          <Insignia estado={c.estado_pago} etiqueta={ETIQUETA_ESTADO[c.estado_pago]} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[["Total", c.total, ""], ["Pagado", c.abonado, "text-emerald-700"], ["Saldo", c.saldo, c.saldo > 0 ? "text-[#B4541B]" : ""]].map(([t, v, col]) => (
            <div key={t as string} className="rounded-[16px] bg-[var(--color-light)] p-4">
              <p className="font-display text-[0.72rem] font-bold uppercase tracking-wider text-secondary">{t as string}</p>
              <p className={`mt-1 font-display text-[1.5rem] font-black text-[#101820] ${col}`}>{pesos(v as number)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#101820]/10" role="progressbar" aria-valuenow={Math.round(progreso)} aria-valuemin={0} aria-valuemax={100} aria-label="Avance de pago"><div className="h-full rounded-full bg-allitron-blue" style={{ width: `${progreso}%` }} /></div>

        <div className="mt-6 flex flex-wrap gap-2">
          {c.estado === "borrador" && <button className={P.btn} disabled={ocupado !== null} onClick={() => ejecutar("emitir", { accion: "estado", id: c.id, estado: "emitido" }, "Cobro emitido.")}>{ocupado === "emitir" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Emitir</button>}
          {c.estado !== "cancelado" && <button className={P.btnGhost} onClick={() => editar(c)}><Pencil className="h-4 w-4" /> Editar</button>}
          {c.estado !== "cancelado" && <button className={P.btnGhost} onClick={() => editar(c, true)}><Plus className="h-4 w-4" /> Agregar producto o servicio</button>}
          <button className={P.btnGhost} disabled={ocupado !== null} onClick={async () => { const r = await ejecutar("dup", { accion: "duplicar", id: c.id }, "Duplicado como borrador."); if (r?.ok && r.id) abrir(r.id); }}><CopyPlus className="h-4 w-4" /> Duplicar</button>
          {c.estado !== "cancelado" && c.abonado === 0 && <button className={P.btnDanger} onClick={() => setCancelando(true)}><XCircle className="h-4 w-4" /> Cancelar cobro</button>}
        </div>

        {cancelando && (
          <div className="mt-4 flex flex-wrap items-end gap-3 rounded-[16px] border-2 border-allitron-orange/50 bg-allitron-orange/10 p-4">
            <div className="min-w-[220px] flex-1"><label className={P.label} htmlFor="c-mot">Motivo (opcional)</label><input id="c-mot" className={P.input} value={motivo} onChange={(e) => setMotivo(e.target.value)} /></div>
            <button className={P.btnDanger} disabled={ocupado !== null} onClick={async () => { const r = await ejecutar("cancelar", { accion: "estado", id: c.id, estado: "cancelado", motivo }, "Cobro cancelado."); if (r?.ok) setCancelando(false); }}>Sí, cancelar</button>
            <button className={P.btnGhost} onClick={() => setCancelando(false)}>No</button>
          </div>
        )}
        {msg && <div className="mt-4"><Aviso tipo={msg.tipo}>{msg.t}</Aviso></div>}
        {c.estado === "emitido" && !c.cliente_email && <p className="mt-3 font-body text-[0.85rem] text-secondary">Sin correo del cliente: compártelo por WhatsApp o copiando el enlace.</p>}
      </section>

      {c.estado !== "borrador" && (
        <section className={P.card} aria-label="Compartir y entregar">
          <h3 className={P.h2}>Compartir y entregar</h3>
          {c.estado === "cancelado" && <p className="mt-2 font-body text-[0.88rem] text-secondary">Este cobro está cancelado: el cliente verá que ya no requiere pago.</p>}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[16px] bg-[var(--color-light)] p-4">
              <p className="font-display text-[0.72rem] font-bold uppercase tracking-wider text-secondary">Enlace público</p>
              <p className="mt-1.5 select-all break-all font-mono text-[0.82rem] text-[#101820]">{url}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className={P.btnGhost} onClick={copiar}>{copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copiado ? "Copiado" : "Copiar enlace"}</button>
                <a className={P.btnGhost} href={`/cobros/${c.token}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /> Ver como cliente</a>
              </div>
            </div>
            <div className="rounded-[16px] bg-[var(--color-light)] p-4">
              <p className="font-display text-[0.72rem] font-bold uppercase tracking-wider text-secondary">Archivo PDF</p>
              <p className="mt-1.5 flex items-center gap-2 font-body text-[0.92rem] text-[#101820]"><FileText className="h-4 w-4 text-allitron-blue" /> {folio}.pdf <span className="text-secondary">· siempre con el saldo al día</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a className={P.btnGhost} href={`/cobros/${c.token}/pdf`} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /> Abrir PDF</a>
                {c.estado === "emitido" && c.cliente_telefono && <a className={P.btnGhost} href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> Enviar por WhatsApp</a>}
              </div>
            </div>
          </div>

          {c.estado === "emitido" && (
            <div className="mt-4 rounded-[16px] border-2 border-[#101820]/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-[1rem] font-bold text-[#101820]">Correo al cliente</p>
                  <p className="font-body text-[0.85rem] text-secondary">{c.cliente_email ? `${c.cliente_email} · lleva el enlace y el PDF adjunto` : "Este cobro no tiene correo del cliente: edítalo para poder enviarlo."}</p>
                </div>
                {c.cliente_email && (reenviar ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-body text-[0.85rem] text-secondary">Ya se envió antes. ¿Enviar otra vez?</span>
                    <button className={P.btn} disabled={ocupado !== null} onClick={async () => { const r = await ejecutar("correo", { accion: "enviar", id: c.id }, "Correo enviado al cliente."); if (r?.ok) setReenviar(false); }}>{ocupado === "correo" && <Loader2 className="h-4 w-4 animate-spin" />} Sí, reenviar</button>
                    <button className={P.btnGhost} onClick={() => setReenviar(false)}>No</button>
                  </div>
                ) : (
                  <button className={P.btn} disabled={ocupado !== null} onClick={() => (c.envios?.some((e) => e.estado === "enviado") ? setReenviar(true) : ejecutar("correo", { accion: "enviar", id: c.id }, "Correo enviado al cliente."))}>
                    {ocupado === "correo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    {c.envios?.[0]?.estado === "error" ? "Reintentar envío" : c.envios?.some((e) => e.estado === "enviado") ? "Reenviar" : "Enviar por correo"}
                  </button>
                ))}
              </div>
              <ul className="mt-3 flex flex-col gap-1.5" aria-label="Historial de correos">
                {(c.envios ?? []).length === 0 ? <li className="font-body text-[0.85rem] text-secondary">Todavía no se ha enviado ningún correo de este cobro.</li> : (c.envios ?? []).map((e) => (
                  <li key={e.id} className="flex flex-wrap items-start gap-2 font-body text-[0.85rem]">
                    {e.estado === "enviado" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#B4541B]" />}
                    <span><span className="font-semibold text-[#101820]">{e.estado === "enviado" ? "Enviado" : "Falló"}</span> · {e.tipo === "cobro_abono" ? "aviso de abono" : "comprobante"} · {e.destinatarios.join(", ")} · {fechaHora(e.creado_en)}{e.error ? <span className="block text-[#B4541B]">{e.error}</span> : null}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className={P.card}>
        <h3 className={P.h2}>Productos y servicios</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[460px] text-left font-body text-[0.95rem]">
            <thead><tr className="border-b border-[#101820]/10 text-[0.75rem] uppercase tracking-wider text-secondary"><th className="py-2 pr-2">Descripción</th><th className="py-2 text-right">Cant.</th><th className="py-2 text-right">Precio</th><th className="py-2 text-right">Total</th></tr></thead>
            <tbody>{c.items.map((i, idx) => (<tr key={i.id ?? idx} className="border-b border-[#101820]/6"><td className="py-2 pr-2">{i.descripcion}{i.detalle && <span className="block whitespace-pre-wrap text-[0.82rem] text-secondary">{i.detalle}</span>}</td><td className="py-2 text-right">{i.cantidad}</td><td className="py-2 text-right">{pesos(i.precio)}</td><td className="py-2 text-right font-bold">{pesos(Math.round(i.cantidad * i.precio * 100) / 100)}</td></tr>))}</tbody>
          </table>
        </div>
        <dl className="mt-4 ml-auto grid max-w-[300px] grid-cols-[1fr_auto] gap-x-6 gap-y-1 font-body text-[0.92rem]">
          <dt className="text-secondary">Subtotal</dt><dd className="text-right">{pesos(c.subtotal)}</dd>
          {c.descuento_monto > 0 && (<><dt className="text-secondary">Descuento</dt><dd className="text-right">−{pesos(c.descuento_monto)}</dd></>)}
          {c.iva_monto > 0 && (<><dt className="text-secondary">IVA ({c.iva_porcentaje}%)</dt><dd className="text-right">+{pesos(c.iva_monto)}</dd></>)}
          <dt className="font-bold">Total</dt><dd className="text-right font-black">{pesos(c.total)}</dd>
        </dl>
      </section>

      <section className={P.card} aria-label="Abonos">
        <h3 className={P.h2}>Abonos</h3>
        {c.abonos.length === 0 ? <p className="mt-3 font-body text-[0.95rem] text-secondary">Aún no hay abonos.</p> : (
          <ul className="mt-3 flex flex-col divide-y divide-[#101820]/8">
            {c.abonos.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className={a.anulado_en ? "opacity-55" : ""}>
                  <p className={`font-display text-[1rem] font-bold text-[#101820] ${a.anulado_en ? "line-through" : ""}`}>{pesos(a.monto)} <span className="font-body text-[0.9rem] font-normal text-secondary">· {a.concepto}{a.metodo ? ` · ${a.metodo}` : ""}</span></p>
                  <p className="font-body text-[0.82rem] text-secondary">{fechaYmd(a.fecha)} · registró {a.creado_por ?? "—"}{a.anulado_en ? ` · ANULADO por ${a.anulado_por ?? "—"} el ${fechaHora(a.anulado_en)}${a.motivo_anulacion ? ` (${a.motivo_anulacion})` : ""}` : ""}</p>
                </div>
                {!a.anulado_en && c.estado !== "cancelado" && (anulando?.id === a.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input aria-label="Motivo de la anulación" className={`${P.input} !w-[200px]`} placeholder="Motivo" value={anulando.motivo} onChange={(e) => setAnulando({ id: a.id, motivo: e.target.value })} />
                    <button className={P.btnDanger} disabled={ocupado !== null} onClick={async () => { const r = await ejecutar("anular", { accion: "anular_abono", abono_id: a.id, motivo: anulando.motivo }, "Abono anulado."); if (r?.ok) setAnulando(null); }}>Anular</button>
                    <button className={P.btnGhost} onClick={() => setAnulando(null)}>No</button>
                  </div>
                ) : <button className={P.btnGhost} onClick={() => setAnulando({ id: a.id, motivo: "" })}>Anular</button>)}
              </li>
            ))}
          </ul>
        )}

        {puedeAbonar && (
          <form className="mt-5 grid gap-3 border-t border-[#101820]/10 pt-5 sm:grid-cols-4" onSubmit={async (e) => {
            e.preventDefault();
            const r = await ejecutar("abono", { accion: "abono", id: c.id, fecha: ab.fecha, monto: ab.monto, concepto: ab.concepto, metodo: ab.metodo, avisar: ab.avisar && Boolean(c.cliente_email) }, "Abono registrado.");
            if (r?.ok) setAb({ ...ab, monto: "", concepto: "Abono" });
          }}>
            <div><label className={P.label} htmlFor="a-f">Fecha</label><input id="a-f" type="date" className={P.input} required value={ab.fecha} max={hoyYmd()} onChange={(e) => setAb({ ...ab, fecha: e.target.value })} /></div>
            <div>
              <label className={P.label} htmlFor="a-m">Monto</label>
              <input id="a-m" inputMode="decimal" className={P.input} required value={ab.monto} onChange={(e) => setAb({ ...ab, monto: e.target.value })} placeholder="0.00" />
              <button type="button" className="mt-1 font-body text-[0.8rem] font-semibold text-allitron-navy underline underline-offset-4" onClick={() => setAb({ ...ab, monto: String(c.saldo) })}>Liquidar saldo ({pesos(c.saldo)})</button>
            </div>
            <div><label className={P.label} htmlFor="a-c">Concepto</label><input id="a-c" className={P.input} value={ab.concepto} onChange={(e) => setAb({ ...ab, concepto: e.target.value })} /></div>
            <div><label className={P.label} htmlFor="a-me">Método</label><input id="a-me" className={P.input} value={ab.metodo} onChange={(e) => setAb({ ...ab, metodo: e.target.value })} /></div>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-4">
              <button className={P.btn} disabled={ocupado !== null}>{ocupado === "abono" && <Loader2 className="h-4 w-4 animate-spin" />} Registrar abono</button>
              {c.cliente_email && <label className="flex items-center gap-2 font-body text-[0.9rem]"><input type="checkbox" checked={ab.avisar} onChange={(e) => setAb({ ...ab, avisar: e.target.checked })} /> Avisar al cliente por correo</label>}
              <p className="font-body text-[0.82rem] text-secondary">{vivos.length} {vivos.length === 1 ? "abono vigente" : "abonos vigentes"}. No se puede abonar más que el saldo.</p>
            </div>
          </form>
        )}
        {c.estado === "borrador" && <div className="mt-4"><Aviso tipo="info">Emite el cobro para poder registrar abonos y compartirlo.</Aviso></div>}
      </section>

      {c.eventos && c.eventos.length > 0 && (
        <details className={P.card}>
          <summary className="cursor-pointer font-display text-[1rem] font-bold text-[#101820]">Bitácora ({c.eventos.length})</summary>
          <ul className="mt-3 flex flex-col gap-1.5 font-body text-[0.88rem] text-secondary">
            {c.eventos.map((e) => <li key={e.id}><span className="font-semibold text-[#101820]">{EVENTOS[e.tipo] ?? e.tipo}</span> · {e.persona ?? "sistema"} · {fechaHora(e.creado_en)}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}
