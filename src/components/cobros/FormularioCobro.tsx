"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { calcularTotales, pesos } from "@/lib/cobros/calculos";
import type { Banco, CobroCompleto, Emisor, TipoDocumento, TipoEnlace } from "@/lib/cobros/types";
import { sumarDias } from "@/lib/reuniones/tz";
import { accion, Aviso, fechaHora, hoyYmd, P, type DatosCobros } from "./comun";

interface Renglon { k: number; descripcion: string; detalle: string; cantidad: string; precio: string }
interface EnlaceF { k: number; titulo: string; url: string; tipo: TipoEnlace }

let seq = 1;
const nk = () => seq++;
const n = (v: string): number => {
  const x = Number(v.replace(/,/g, ""));
  return Number.isFinite(x) ? x : 0;
};

export default function FormularioCobro({
  datos,
  inicial,
  agregar = false,
  alTerminar,
  alCancelar,
}: {
  datos: DatosCobros;
  inicial: CobroCompleto | null;
  /** Abre el formulario con un renglón nuevo al final (para sumar productos a un cobro ya emitido). */
  agregar?: boolean;
  alTerminar: (id: string) => Promise<void> | void;
  alCancelar: () => void;
}) {
  const aj = datos.ajustes;
  const emitido = inicial?.estado === "emitido";
  const hoy = hoyYmd();

  const [reunionId, setReunionId] = useState(inicial?.reunion_id ?? "");
  const [cliente, setCliente] = useState({
    nombre: inicial?.cliente_nombre ?? "",
    email: inicial?.cliente_email ?? "",
    telefono: inicial?.cliente_telefono ?? "",
    direccion: inicial?.cliente_direccion ?? "",
    rfc: inicial?.cliente_rfc ?? "",
  });
  const [tipo, setTipo] = useState<TipoDocumento>(inicial?.tipo_documento ?? "nota");
  const [emision, setEmision] = useState(inicial?.fecha_emision ?? hoy);
  const [vence, setVence] = useState(inicial ? inicial.fecha_vencimiento ?? "" : aj.vence_dias > 0 ? sumarDias(hoy, aj.vence_dias) : "");
  const [concepto, setConcepto] = useState(inicial?.concepto ?? "");
  const [notas, setNotas] = useState(inicial?.notas ?? aj.notas);
  const [metodo, setMetodo] = useState(inicial?.metodo_pago ?? aj.metodo_pago);
  const [items, setItems] = useState<Renglon[]>(() => {
    const base: Renglon[] = (inicial?.items ?? []).map((i) => ({ k: nk(), descripcion: i.descripcion, detalle: i.detalle ?? "", cantidad: String(i.cantidad), precio: String(i.precio) }));
    if (base.length === 0 || agregar) base.push({ k: nk(), descripcion: "", detalle: "", cantidad: "1", precio: "" });
    return base;
  });
  const [descTipo, setDescTipo] = useState<"porcentaje" | "monto">(inicial?.descuento_tipo ?? "porcentaje");
  const [descValor, setDescValor] = useState(inicial ? String(inicial.descuento_valor || "") : "");
  const [iva, setIva] = useState(inicial?.iva_activo ?? aj.iva_activo);
  const [ivaPct, setIvaPct] = useState(String(inicial?.iva_porcentaje ?? aj.iva_porcentaje));
  const [enlaces, setEnlaces] = useState<EnlaceF[]>((inicial?.enlaces ?? []).map((e) => ({ k: nk(), titulo: e.titulo, url: e.url, tipo: e.tipo })));
  const [emisor, setEmisor] = useState<Emisor>({ ...aj.emisor, ...(inicial?.emisor ?? {}) });
  const [banco, setBanco] = useState<Banco>({ ...aj.banco, ...(inicial?.banco ?? {}) });
  const [mostrarBanco, setMostrarBanco] = useState(inicial?.mostrar_banco ?? true);

  const [enviando, setEnviando] = useState<null | "borrador" | "emitir">(null);
  const [msg, setMsg] = useState<string | null>(null);

  // ── Autoguardado local: si se cierra la pestaña a la mitad, se puede recuperar ──
  // Vive solo en este navegador (localStorage) y se borra al guardar o cancelar.
  const llave = `cobros:form:${inicial?.id ?? "nuevo"}`;
  const snap = { reunionId, cliente, tipo, emision, vence, concepto, notas, metodo, items, descTipo, descValor, iva, ivaPct, enlaces, emisor, banco, mostrarBanco };
  const base = useRef<string | null>(null);
  const [recuperable, setRecuperable] = useState<{ datos: typeof snap; en: number } | null>(null);
  const limpiarLocal = () => { try { localStorage.removeItem(llave); } catch { /* sin almacenamiento */ } };
  useEffect(() => {
    if (base.current === null) {
      base.current = JSON.stringify(snap);
      try {
        const guardado = JSON.parse(localStorage.getItem(llave) ?? "null") as { datos: typeof snap; en: number } | null;
        if (guardado?.datos && JSON.stringify(guardado.datos) !== base.current) queueMicrotask(() => setRecuperable(guardado));
      } catch { /* sin almacenamiento */ }
      return;
    }
    const cambio = JSON.stringify(snap);
    if (cambio === base.current || recuperable) return;
    const timer = setTimeout(() => {
      try { localStorage.setItem(llave, JSON.stringify({ datos: snap, en: Date.now() })); } catch { /* sin almacenamiento */ }
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(snap), recuperable]);
  function recuperar() {
    if (!recuperable) return;
    const d = recuperable.datos;
    setReunionId(d.reunionId); setCliente(d.cliente); setTipo(d.tipo); setEmision(d.emision); setVence(d.vence); setConcepto(d.concepto);
    setNotas(d.notas); setMetodo(d.metodo); setItems(d.items.map((i) => ({ ...i, k: nk() }))); setDescTipo(d.descTipo); setDescValor(d.descValor);
    setIva(d.iva); setIvaPct(d.ivaPct); setEnlaces(d.enlaces.map((e) => ({ ...e, k: nk() }))); setEmisor(d.emisor); setBanco(d.banco); setMostrarBanco(d.mostrarBanco);
    setRecuperable(null);
  }
  function descartar() { limpiarLocal(); setRecuperable(null); }

  const t = useMemo(
    () => calcularTotales({ items: items.map((i) => ({ cantidad: n(i.cantidad), precio: n(i.precio) })), descuentoTipo: descTipo, descuentoValor: n(descValor), ivaActivo: iva, ivaPorcentaje: n(ivaPct) }),
    [items, descTipo, descValor, iva, ivaPct]
  );

  const citas = datos.reuniones;
  const cobrosDeLaCita = reunionId ? datos.cobros.filter((c) => c.reunion_id === reunionId && c.id !== inicial?.id && c.estado !== "cancelado") : [];

  function elegirCita(id: string) {
    setReunionId(id);
    const c = citas.find((x) => x.id === id);
    if (!c) return;
    setCliente((p) => ({ ...p, nombre: c.cliente_nombre, email: c.cliente_email, telefono: c.cliente_whatsapp ?? "" }));
    setConcepto((p) => p || c.producto_nombre);
  }

  async function guardar(emitir: boolean) {
    setMsg(null);
    setEnviando(emitir ? "emitir" : "borrador");
    const r = await accion({
      accion: "guardar",
      id: inicial?.id ?? null,
      emitir,
      reunion_id: reunionId || null,
      cliente_nombre: cliente.nombre,
      cliente_email: cliente.email,
      cliente_telefono: cliente.telefono,
      cliente_direccion: cliente.direccion,
      cliente_rfc: cliente.rfc,
      tipo_documento: tipo,
      fecha_emision: emision,
      fecha_vencimiento: vence,
      concepto,
      notas,
      metodo_pago: metodo,
      descuento_tipo: descTipo,
      descuento_valor: n(descValor),
      iva_activo: iva,
      iva_porcentaje: n(ivaPct),
      items: items.map((i) => ({ descripcion: i.descripcion, detalle: i.detalle, cantidad: n(i.cantidad), precio: n(i.precio) })),
      enlaces: enlaces.map((e) => ({ titulo: e.titulo, url: e.url, tipo: e.tipo })),
      emisor,
      banco,
      mostrar_banco: mostrarBanco,
    });
    setEnviando(null);
    if (r.ok || r.id) limpiarLocal();
    if (!r.ok) {
      setMsg(r.mensaje ?? "No se pudo guardar.");
      if (r.id) await alTerminar(r.id); // se guardó como borrador
      return;
    }
    await alTerminar(r.id as string);
  }

  const sec = "grid gap-4 sm:grid-cols-2";
  const campo = (id: string, etiqueta: string, el: React.ReactNode, ancho = false) => (
    <div className={ancho ? "sm:col-span-2" : ""}>
      <label className={P.label} htmlFor={id}>{etiqueta}</label>
      {el}
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); void guardar(false); }} className="flex flex-col gap-6">
      {recuperable && (
        <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border-2 border-allitron-blue/40 bg-allitron-blue/10 px-5 py-4 font-body text-[0.95rem] text-[#101820]">
          <span>Encontramos cambios sin guardar de {fechaHora(new Date(recuperable.en).toISOString())}.</span>
          <span className="flex gap-2"><button type="button" className={P.btn} onClick={recuperar}>Recuperar</button><button type="button" className={P.btnGhost} onClick={descartar}>Descartar</button></span>
        </div>
      )}
      {emitido && <Aviso tipo="info">Este cobro ya fue emitido: el cliente verá los cambios en su enlace. Lo ya abonado se conserva.</Aviso>}

      <section className={`${P.card} ${sec}`} aria-label="Cliente">
        <h2 className={`${P.h2} sm:col-span-2`}>Cliente</h2>
        {campo("f-cita", "Ligar a una cita (opcional)", (
          <select id="f-cita" className={P.input} value={reunionId} onChange={(e) => elegirCita(e.target.value)}>
            <option value="">Sin cita</option>
            {citas.map((c) => <option key={c.id} value={c.id}>{c.cliente_nombre} · {c.producto_nombre} · {fechaHora(c.inicio)}</option>)}
          </select>
        ), true)}
        {cobrosDeLaCita.length > 0 && <div className="sm:col-span-2"><Aviso tipo="info">Esta cita ya tiene {cobrosDeLaCita.length === 1 ? "un cobro" : `${cobrosDeLaCita.length} cobros`} ({cobrosDeLaCita.map((c) => c.folio).join(", ")}). Verifica que no sea duplicado.</Aviso></div>}
        {campo("f-nom", "Nombre del cliente", <input id="f-nom" className={P.input} required value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />)}
        {campo("f-mail", "Correo", <input id="f-mail" type="email" className={P.input} value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />)}
        {campo("f-tel", "WhatsApp / teléfono", <input id="f-tel" className={P.input} value={cliente.telefono} onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })} />)}
        {campo("f-rfc", "RFC (opcional)", <input id="f-rfc" className={P.input} maxLength={13} value={cliente.rfc} onChange={(e) => setCliente({ ...cliente, rfc: e.target.value })} />)}
        {campo("f-dir", "Dirección (opcional)", <input id="f-dir" className={P.input} value={cliente.direccion} onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })} />, true)}
      </section>

      <section className={`${P.card} ${sec}`} aria-label="Documento">
        <h2 className={`${P.h2} sm:col-span-2`}>Documento</h2>
        {campo("f-tipo", "Tipo", (
          <select id="f-tipo" className={P.input} value={tipo} onChange={(e) => setTipo(e.target.value as TipoDocumento)}>
            <option value="nota">Nota de cobro</option>
            <option value="recibo">Recibo</option>
            <option value="factura">Factura (comprobante interno)</option>
          </select>
        ))}
        {campo("f-met", "Método de pago", <input id="f-met" className={P.input} value={metodo} onChange={(e) => setMetodo(e.target.value)} />)}
        {campo("f-em", "Fecha de emisión", <input id="f-em" type="date" className={P.input} value={emision} onChange={(e) => setEmision(e.target.value)} />)}
        {campo("f-ve", "Vence (opcional)", <input id="f-ve" type="date" className={P.input} value={vence} min={emision} onChange={(e) => setVence(e.target.value)} />)}
        {campo("f-con", "Concepto general", <input id="f-con" className={P.input} maxLength={400} value={concepto} onChange={(e) => setConcepto(e.target.value)} placeholder="Ej. Consultoría Domina Google" />, true)}
      </section>

      <section className={P.card} aria-label="Renglones">
        <h2 className={P.h2}>Productos y servicios</h2>
        <p className="mt-1 font-body text-[0.88rem] text-secondary">Cada renglón es un producto o servicio. En «Qué incluye» escribe qué recibe el cliente: aparece en su comprobante y en el PDF.</p>
        <div className="mt-4 flex flex-col gap-3">
          {items.map((i, idx) => (
            <div key={i.k} className="grid grid-cols-[1fr_88px_120px_auto] items-end gap-2 max-sm:grid-cols-2">
              <div className="max-sm:col-span-2"><label className={P.label} htmlFor={`i-d-${i.k}`}>{idx === 0 ? "Descripción" : <span className="sr-only">Descripción</span>}</label><input id={`i-d-${i.k}`} className={P.input} value={i.descripcion} onChange={(e) => setItems(items.map((x) => (x.k === i.k ? { ...x, descripcion: e.target.value } : x)))} /></div>
              <div><label className={P.label} htmlFor={`i-c-${i.k}`}>{idx === 0 ? "Cant." : <span className="sr-only">Cantidad</span>}</label><input id={`i-c-${i.k}`} inputMode="decimal" className={P.input} value={i.cantidad} onChange={(e) => setItems(items.map((x) => (x.k === i.k ? { ...x, cantidad: e.target.value } : x)))} /></div>
              <div><label className={P.label} htmlFor={`i-p-${i.k}`}>{idx === 0 ? "Precio" : <span className="sr-only">Precio</span>}</label><input id={`i-p-${i.k}`} inputMode="decimal" className={P.input} value={i.precio} onChange={(e) => setItems(items.map((x) => (x.k === i.k ? { ...x, precio: e.target.value } : x)))} placeholder="0.00" /></div>
              <div className="flex items-center gap-2 max-sm:col-span-2 max-sm:justify-between">
                <span className="min-w-[96px] text-right font-display text-[0.95rem] font-bold text-[#101820]">{pesos(t.lineas[idx] ?? 0)}</span>
                <button type="button" aria-label={`Quitar renglón ${idx + 1}`} className={P.btnGhost} disabled={items.length === 1} onClick={() => setItems(items.filter((x) => x.k !== i.k))}><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="col-span-full"><label className={P.label} htmlFor={`i-x-${i.k}`}>Qué incluye / qué se entrega (opcional)</label><textarea id={`i-x-${i.k}`} rows={2} maxLength={600} className={P.input} value={i.detalle} onChange={(e) => setItems(items.map((x) => (x.k === i.k ? { ...x, detalle: e.target.value } : x)))} placeholder="Ej. Configuración de ficha de Google, 3 reportes mensuales, soporte por WhatsApp" /></div>
            </div>
          ))}
        </div>
        <button type="button" className={`${P.btnGhost} mt-4`} onClick={() => setItems([...items, { k: nk(), descripcion: "", detalle: "", cantidad: "1", precio: "" }])}><Plus className="h-4 w-4" /> Agregar producto o servicio</button>

        <div className="mt-6 grid gap-4 border-t border-[#101820]/10 pt-5 sm:grid-cols-2">
          <div>
            <label className={P.label} htmlFor="f-dt">Descuento</label>
            <div className="flex gap-2">
              <select id="f-dt" className={`${P.input} !w-[130px]`} value={descTipo} onChange={(e) => setDescTipo(e.target.value as "porcentaje" | "monto")}>
                <option value="porcentaje">%</option>
                <option value="monto">$ monto</option>
              </select>
              <input aria-label="Valor del descuento" inputMode="decimal" className={P.input} value={descValor} onChange={(e) => setDescValor(e.target.value)} placeholder="0" />
            </div>
          </div>
          <div>
            <label className={P.label} htmlFor="f-iva">IVA</label>
            <div className="flex items-center gap-3">
              <label className="flex min-h-[48px] items-center gap-2 font-body text-[0.95rem]"><input id="f-iva" type="checkbox" checked={iva} onChange={(e) => setIva(e.target.checked)} /> Cobrar IVA</label>
              <input aria-label="Porcentaje de IVA" inputMode="decimal" className={`${P.input} !w-[90px]`} disabled={!iva} value={ivaPct} onChange={(e) => setIvaPct(e.target.value)} />
              <span className="font-body text-[0.9rem] text-secondary">%</span>
            </div>
          </div>
        </div>

        <dl className="mt-6 ml-auto grid max-w-[340px] grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 font-body text-[0.95rem]" aria-label="Totales">
          <dt className="text-secondary">Subtotal</dt><dd className="text-right">{pesos(t.subtotal)}</dd>
          {t.descuentoMonto > 0 && (<><dt className="text-secondary">Descuento</dt><dd className="text-right">−{pesos(t.descuentoMonto)}</dd></>)}
          {t.ivaMonto > 0 && (<><dt className="text-secondary">IVA ({n(ivaPct)}%)</dt><dd className="text-right">+{pesos(t.ivaMonto)}</dd></>)}
          <dt className="border-t border-[#101820]/10 pt-2 font-display font-bold">Total</dt><dd className="border-t border-[#101820]/10 pt-2 text-right font-display text-[1.2rem] font-black">{pesos(t.total)}</dd>
        </dl>
        <p className="mt-2 text-right font-body text-[0.8rem] text-secondary">El total final lo calcula el servidor al guardar.</p>
      </section>

      <section className={`${P.card} ${sec}`} aria-label="Pago">
        <h2 className={`${P.h2} sm:col-span-2`}>Cómo te paga el cliente</h2>
        <label className="flex items-center gap-2 font-body text-[0.95rem] sm:col-span-2"><input type="checkbox" checked={mostrarBanco} onChange={(e) => setMostrarBanco(e.target.checked)} /> Mostrar datos bancarios al cliente mientras haya saldo</label>
        {campo("b-ben", "Beneficiario", <input id="b-ben" className={P.input} value={banco.beneficiario} onChange={(e) => setBanco({ ...banco, beneficiario: e.target.value })} />)}
        {campo("b-ban", "Banco", <input id="b-ban" className={P.input} value={banco.banco} onChange={(e) => setBanco({ ...banco, banco: e.target.value })} />)}
        {campo("b-cla", "CLABE (18 dígitos)", <input id="b-cla" inputMode="numeric" className={P.input} maxLength={18} value={banco.clabe} onChange={(e) => setBanco({ ...banco, clabe: e.target.value.replace(/\D/g, "") })} />)}
        {campo("b-cue", "Cuenta / tarjeta (opcional)", <input id="b-cue" className={P.input} value={banco.cuenta} onChange={(e) => setBanco({ ...banco, cuenta: e.target.value })} />)}
      </section>

      <details className={P.card}>
        <summary className="cursor-pointer font-display text-[1rem] font-bold text-[#101820]">Quién emite (se toma de Ajustes)</summary>
        <div className={`${sec} mt-4`}>
          {campo("e-nom", "Nombre", <input id="e-nom" className={P.input} value={emisor.nombre} onChange={(e) => setEmisor({ ...emisor, nombre: e.target.value })} />)}
          {campo("e-mail", "Correo de contacto", <input id="e-mail" type="email" className={P.input} value={emisor.email} onChange={(e) => setEmisor({ ...emisor, email: e.target.value })} />)}
          {campo("e-tel", "Teléfono", <input id="e-tel" className={P.input} value={emisor.telefono} onChange={(e) => setEmisor({ ...emisor, telefono: e.target.value })} />)}
          {campo("e-web", "Sitio web (https://)", <input id="e-web" className={P.input} value={emisor.web} onChange={(e) => setEmisor({ ...emisor, web: e.target.value })} />)}
          {campo("e-logo", "Logo (URL https)", <input id="e-logo" className={P.input} value={emisor.logo_url} onChange={(e) => setEmisor({ ...emisor, logo_url: e.target.value })} />)}
          {campo("e-dir", "Dirección", <input id="e-dir" className={P.input} value={emisor.direccion} onChange={(e) => setEmisor({ ...emisor, direccion: e.target.value })} />)}
        </div>
      </details>

      <section className={P.card} aria-label="Enlaces y notas">
        <h2 className={P.h2}>Documentos y notas</h2>
        <div className="mt-4 flex flex-col gap-3">
          {enlaces.map((e) => (
            <div key={e.k} className="grid grid-cols-[1fr_2fr_110px_auto] items-end gap-2 max-sm:grid-cols-1">
              <div><label className={P.label} htmlFor={`l-t-${e.k}`}>Título</label><input id={`l-t-${e.k}`} className={P.input} value={e.titulo} onChange={(ev) => setEnlaces(enlaces.map((x) => (x.k === e.k ? { ...x, titulo: ev.target.value } : x)))} /></div>
              <div><label className={P.label} htmlFor={`l-u-${e.k}`}>Enlace (https://)</label><input id={`l-u-${e.k}`} className={P.input} value={e.url} onChange={(ev) => setEnlaces(enlaces.map((x) => (x.k === e.k ? { ...x, url: ev.target.value } : x)))} /></div>
              <div><label className={P.label} htmlFor={`l-y-${e.k}`}>Tipo</label><select id={`l-y-${e.k}`} className={P.input} value={e.tipo} onChange={(ev) => setEnlaces(enlaces.map((x) => (x.k === e.k ? { ...x, tipo: ev.target.value as TipoEnlace } : x)))}><option value="pdf">PDF</option><option value="imagen">Imagen</option><option value="otro">Otro</option></select></div>
              <button type="button" aria-label="Quitar enlace" className={P.btnGhost} onClick={() => setEnlaces(enlaces.filter((x) => x.k !== e.k))}><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        {enlaces.length < 10 && <button type="button" className={`${P.btnGhost} mt-4`} onClick={() => setEnlaces([...enlaces, { k: nk(), titulo: "", url: "", tipo: "pdf" }])}><Plus className="h-4 w-4" /> Agregar documento</button>}
        <label className={`${P.label} mt-6`} htmlFor="f-notas">Notas para el cliente</label>
        <textarea id="f-notas" rows={3} maxLength={1000} className={`${P.input} resize-none`} value={notas} onChange={(e) => setNotas(e.target.value)} />
      </section>

      {msg && <Aviso tipo="error">{msg}</Aviso>}

      <div className="flex flex-wrap items-center gap-3">
        {emitido ? (
          <button type="button" className={P.btn} disabled={enviando !== null} onClick={() => guardar(false)}>{enviando && <Loader2 className="h-4 w-4 animate-spin" />} Guardar cambios</button>
        ) : (
          <>
            <button type="button" className={P.btn} disabled={enviando !== null} onClick={() => guardar(true)}>{enviando === "emitir" && <Loader2 className="h-4 w-4 animate-spin" />} Emitir cobro</button>
            <button type="button" className={P.btnGhost} disabled={enviando !== null} onClick={() => guardar(false)}>{enviando === "borrador" && <Loader2 className="h-4 w-4 animate-spin" />} Guardar borrador</button>
          </>
        )}
        <button type="button" className={P.btnGhost} onClick={() => { limpiarLocal(); alCancelar(); }} disabled={enviando !== null}>Cancelar</button>
      </div>
    </form>
  );
}
