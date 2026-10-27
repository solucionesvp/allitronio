import { Download, ExternalLink, FileText, Image as ImagenIcono, Link2 } from "lucide-react";
import { ETIQUETA_ESTADO, pesos } from "@/lib/cobros/calculos";
import { fechaYmd } from "@/lib/cobros/formato";
import { folioDe, type CobroCompleto } from "@/lib/cobros/types";
import BotonImprimir from "./BotonImprimir";

// Comprobante que ve el cliente en /cobros/<token>. Es un componente de servidor:
// solo recibe los datos que el cliente debe ver (nada de bitácora ni quién lo registró).

const TONO: Record<string, string> = {
  pagado: "bg-emerald-100 text-emerald-800",
  parcial: "bg-allitron-blue/15 text-allitron-navy",
  vencido: "bg-allitron-orange/20 text-[#B4541B]",
  pendiente: "bg-amber-100 text-amber-800",
  cancelado: "bg-[#101820]/10 text-[#4A6070]",
  borrador: "bg-[#101820]/10 text-[#4A6070]",
};

function Seccion({ n, titulo, sub }: { n: number; titulo: string; sub?: string }) {
  return (
    <div className="mb-3">
      <h2 className="flex items-center gap-3 border-b border-[#101820]/10 pb-2 font-display text-[1.1rem] font-black text-allitron-navy">
        <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-allitron-orange text-[0.8rem] text-white">{n}</span>
        {titulo}
      </h2>
      {sub && <p className="mt-1.5 pl-10 font-body text-[0.88rem] text-secondary">{sub}</p>}
    </div>
  );
}

export default function VistaPublica({ c }: { c: CobroCompleto }) {
  const folio = folioDe(c.folio_num);
  const abonos = c.abonos.filter((a) => !a.anulado_en);
  const progreso = c.total > 0 ? Math.min(100, (c.abonado / c.total) * 100) : 0;
  const cancelado = c.estado === "cancelado";
  const mostrarBanco = c.mostrar_banco && !cancelado && c.saldo > 0 && Boolean(c.banco.clabe || c.banco.cuenta);
  const emisor = c.emisor.nombre || "Allitron";
  const tipo = c.tipo_documento === "recibo" ? "Recibo" : c.tipo_documento === "factura" ? "Comprobante" : "Nota de cobro";

  return (
    <main className="min-h-svh bg-[var(--color-light)] px-4 py-8 print:bg-white print:p-0 sm:py-12">
      <div className="mx-auto w-full max-w-[860px]">
        <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(16,24,32,0.10)] print:rounded-none print:shadow-none">
          <header className="relative overflow-hidden border-b-4 border-allitron-orange bg-allitron-navy px-6 py-7 text-white sm:px-10 sm:py-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/cobros/${c.estado_pago === "pagado" ? "alli-confirmada" : "alli-carta"}.jpg`} alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto sm:block" />
            <div className="relative flex flex-wrap items-start justify-between gap-5 sm:pr-[200px]">
              <div className="flex items-center gap-4">
                {c.emisor.logo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.emisor.logo_url} alt="" className="h-14 w-14 rounded-[14px] bg-white object-contain p-1.5" />
                )}
                <div>
                  <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#9FD8EE]">Allitron · Comprobante de cobro</p>
                  <h1 className="mt-1 font-display text-[1.6rem] font-black leading-tight sm:text-[2rem]">{tipo}</h1>
                  <p className="mt-0.5 font-body text-[0.95rem] text-white/85">Emitido por {emisor}</p>
                  <p className="mt-1 font-body text-[0.85rem] text-white/75">{[c.emisor.email, c.emisor.telefono].filter(Boolean).join(" · ")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#9FD8EE]">Folio</p>
                <p className="font-mono text-[1.4rem] font-bold">{folio}</p>
                <p className="font-body text-[0.85rem] text-white/75">{fechaYmd(c.fecha_emision)}</p>
              </div>
            </div>
          </header>

          <div className="px-6 py-7 sm:px-10 sm:py-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`inline-flex rounded-full px-4 py-1.5 font-display text-[0.8rem] font-black uppercase tracking-wider ${TONO[c.estado_pago]}`}>{ETIQUETA_ESTADO[c.estado_pago]}</span>
              {c.fecha_vencimiento && !cancelado && c.saldo > 0 && <span className="font-body text-[0.9rem] text-secondary">Vence el {fechaYmd(c.fecha_vencimiento)}</span>}
            </div>
            {cancelado && <p role="status" className="mt-4 rounded-[14px] border-2 border-[#101820]/15 bg-[var(--color-light)] px-4 py-3 font-body text-[0.95rem] text-[#101820]">Este documento fue cancelado y ya no requiere pago.</p>}

            <section className="mt-8" aria-label="Datos"><Seccion n={1} titulo="Para quién y por qué concepto" /><div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-[0.72rem] font-bold uppercase tracking-[0.18em] text-secondary">Cliente</h3>
                <p className="mt-1 font-display text-[1.2rem] font-bold text-[#101820]">{c.cliente_nombre}</p>
                <p className="font-body text-[0.9rem] text-secondary">{[c.cliente_email, c.cliente_telefono, c.cliente_rfc && `RFC ${c.cliente_rfc}`].filter(Boolean).join(" · ")}</p>
                {c.cliente_direccion && <p className="font-body text-[0.9rem] text-secondary">{c.cliente_direccion}</p>}
              </div>
              {c.concepto && (
                <div>
                  <h3 className="font-display text-[0.72rem] font-bold uppercase tracking-[0.18em] text-secondary">Concepto general</h3>
                  <p className="mt-1 font-body text-[1rem] leading-[1.55] text-[#101820]">{c.concepto}</p>
                  {c.metodo_pago && <p className="mt-1 font-body text-[0.85rem] text-secondary">Método de pago: {c.metodo_pago}</p>}
                </div>
              )}
            </div></section>

            <section className="mt-8" aria-label="Detalle">
              <Seccion n={2} titulo="Qué estás comprando" sub="Cada producto o servicio con lo que incluye y lo que se te entrega." />
              <div className="overflow-x-auto rounded-[16px] border border-[#101820]/10">
                <table className="w-full min-w-[480px] text-left font-body text-[0.95rem]">
                  <thead className="bg-[var(--color-light)] text-[0.72rem] uppercase tracking-wider text-secondary"><tr><th className="px-4 py-3">Producto o servicio</th><th className="px-4 py-3 text-right">Cant.</th><th className="px-4 py-3 text-right">Precio</th><th className="px-4 py-3 text-right">Importe</th></tr></thead>
                  <tbody>
                    {c.items.map((i, idx) => (
                      <tr key={i.id ?? idx} className="border-t border-[#101820]/8"><td className="px-4 py-3"><span className="font-bold text-[#101820]">{i.descripcion}</span>{i.detalle && <span className="mt-1 block whitespace-pre-wrap text-[0.85rem] text-secondary"><strong>Qué incluye:</strong> {i.detalle}</span>}</td><td className="px-4 py-3 text-right">{i.cantidad}</td><td className="px-4 py-3 text-right">{pesos(i.precio)}</td><td className="px-4 py-3 text-right font-bold">{pesos(Math.round(i.cantidad * i.precio * 100) / 100)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8" aria-label="Resumen"><Seccion n={3} titulo="Resumen y pagos" sub="El total del cobro, lo que ya pagaste y lo que falta." />
            <div className="grid gap-6 sm:grid-cols-[1fr_320px]">
              <div>
                <h3 className="font-display text-[1rem] font-bold text-[#101820]">Lo que ya pagaste</h3>
                {abonos.length === 0 ? <p className="mt-2 font-body text-[0.92rem] text-secondary">Aún no hay pagos registrados.</p> : (
                  <ul className="mt-2 divide-y divide-[#101820]/8">
                    {abonos.map((a) => (
                      <li key={a.id} className="flex items-center justify-between gap-3 py-2.5 font-body text-[0.92rem]"><span><span className="font-semibold text-[#101820]">{a.concepto}</span> <span className="text-secondary">· {fechaYmd(a.fecha)}{a.metodo ? ` · ${a.metodo}` : ""}</span></span><span className="font-bold text-emerald-700">{pesos(a.monto)}</span></li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="rounded-[20px] bg-[var(--color-light)] p-5">
                <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 font-body text-[0.92rem]">
                  <dt className="text-secondary">Subtotal</dt><dd className="text-right">{pesos(c.subtotal)}</dd>
                  {c.descuento_monto > 0 && (<><dt className="text-secondary">Descuento</dt><dd className="text-right">−{pesos(c.descuento_monto)}</dd></>)}
                  {c.iva_monto > 0 && (<><dt className="text-secondary">IVA ({c.iva_porcentaje}%)</dt><dd className="text-right">+{pesos(c.iva_monto)}</dd></>)}
                  <dt className="border-t border-[#101820]/10 pt-2 font-display font-bold">Total del cobro</dt><dd className="border-t border-[#101820]/10 pt-2 text-right font-display text-[1.15rem] font-black">{pesos(c.total)}</dd>
                  <dt className="text-secondary">Pagado a la fecha</dt><dd className="text-right font-bold text-emerald-700">{pesos(c.abonado)}</dd>
                  <dt className="font-display font-bold">Saldo por pagar</dt><dd className={`text-right font-display text-[1.3rem] font-black ${c.saldo > 0 && !cancelado ? "text-[#B4541B]" : "text-emerald-700"}`}>{pesos(cancelado ? 0 : c.saldo)}</dd>
                </dl>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#101820]/10" role="progressbar" aria-valuenow={Math.round(progreso)} aria-valuemin={0} aria-valuemax={100} aria-label="Avance de pago"><div className="h-full rounded-full bg-allitron-blue" style={{ width: `${progreso}%` }} /></div>
                <p className="mt-1.5 text-right font-body text-[0.78rem] text-secondary">{Math.round(progreso)}% pagado</p>
              </div>
            </div></section>

            {mostrarBanco && (
              <section className="mt-8 rounded-[20px] border-2 border-allitron-blue/30 bg-allitron-blue/5 p-5" aria-label="Datos para transferir">
                <h2 className="font-display text-[1.05rem] font-black text-allitron-navy"><span aria-hidden className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-allitron-orange text-[0.8rem] text-white">4</span>Cómo pagar lo que falta</h2>
                <dl className="mt-3 grid gap-x-8 gap-y-3 font-body text-[0.95rem] sm:grid-cols-2">
                  {c.banco.beneficiario && <div><dt className="text-[0.78rem] text-secondary">Beneficiario</dt><dd className="font-bold text-[#101820]">{c.banco.beneficiario}</dd></div>}
                  {c.banco.banco && <div><dt className="text-[0.78rem] text-secondary">Banco</dt><dd className="font-bold text-[#101820]">{c.banco.banco}</dd></div>}
                  {c.banco.clabe && <div><dt className="text-[0.78rem] text-secondary">CLABE interbancaria</dt><dd className="select-all font-mono text-[1.05rem] font-bold tracking-wide text-[#101820]">{c.banco.clabe}</dd></div>}
                  {c.banco.cuenta && <div><dt className="text-[0.78rem] text-secondary">Cuenta / tarjeta</dt><dd className="select-all font-mono font-bold text-[#101820]">{c.banco.cuenta}</dd></div>}
                </dl>
                <p className="mt-3 font-body text-[0.82rem] text-secondary">Usa el folio <strong>{folio}</strong> como referencia y avísanos cuando hagas tu pago.</p>
              </section>
            )}

            {c.enlaces.length > 0 && (
              <section className="mt-8" aria-label="Documentos">
                <Seccion n={mostrarBanco ? 5 : 4} titulo="Documentos relacionados" />
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {c.enlaces.map((e, idx) => {
                    const Icono = e.tipo === "pdf" ? FileText : e.tipo === "imagen" ? ImagenIcono : Link2;
                    return (
                      <li key={e.id ?? idx}>
                        <a href={e.url} target="_blank" rel="noopener noreferrer nofollow" className="flex min-h-[56px] items-center gap-3 rounded-[16px] border-2 border-[#101820]/10 px-4 py-3 font-body text-[0.95rem] font-semibold text-[#101820] transition-colors hover:border-allitron-blue print:border-0">
                          <Icono className="h-5 w-5 shrink-0 text-allitron-blue" /><span className="min-w-0 flex-1 truncate">{e.titulo}</span><ExternalLink className="h-4 w-4 shrink-0 text-secondary print:hidden" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {c.notas && <p className="mt-8 whitespace-pre-wrap rounded-[16px] bg-[var(--color-light)] px-5 py-4 font-body text-[0.92rem] leading-[1.65] text-[#101820]">{c.notas}</p>}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#101820]/10 pt-6">
              <div className="flex flex-wrap items-center gap-3 print:hidden">
                <a href={`/cobros/${c.token}/pdf`} className="inline-flex min-h-[44px] items-center gap-2 rounded-[14px] bg-allitron-navy px-5 font-display text-[0.9rem] font-bold text-white hover:bg-[#02303f]"><Download className="h-4 w-4" /> Descargar PDF</a>
                <BotonImprimir />
              </div>
              <p className="font-body text-[0.78rem] text-secondary">{emisor}{c.emisor.direccion ? ` · ${c.emisor.direccion}` : ""}{c.emisor.web ? ` · ${c.emisor.web.replace(/^https:\/\//, "")}` : ""}</p>
            </div>
          </div>
        </article>
        <p className="mt-5 text-center font-body text-[0.75rem] text-secondary print:hidden">Documento privado: solo tú y {emisor} tienen este enlace.</p>
      </div>
    </main>
  );
}
