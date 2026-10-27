"use client";

import { useMemo, useState } from "react";
import { Link2, Search } from "lucide-react";
import { ETIQUETA_ESTADO, pesos, type EstadoPago } from "@/lib/cobros/calculos";
import { Aviso, fechaYmd, Insignia, P, type DatosCobros } from "./comun";

type Filtro = "todos" | EstadoPago;
const FILTROS: { id: Filtro; t: string }[] = [
  { id: "todos", t: "Todos" },
  { id: "pendiente", t: "Pendientes" },
  { id: "parcial", t: "Parciales" },
  { id: "vencido", t: "Vencidos" },
  { id: "pagado", t: "Pagados" },
  { id: "borrador", t: "Borradores" },
  { id: "cancelado", t: "Cancelados" },
];

const PAGINA = 25;

export default function ListaCobros({ datos, abrir, nuevo }: { datos: DatosCobros; abrir: (id: string) => void; nuevo: () => void }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [q, setQ] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [visibles, setVisibles] = useState(PAGINA);

  const vivos = datos.cobros.filter((c) => c.estado === "emitido");
  const porCobrar = vivos.reduce((s, c) => s + c.saldo, 0);
  const vencido = vivos.filter((c) => c.estado_pago === "vencido").reduce((s, c) => s + c.saldo, 0);
  const cobrado = datos.cobros.filter((c) => c.estado !== "cancelado").reduce((s, c) => s + c.abonado, 0);

  const citas = useMemo(() => new Map(datos.reuniones.map((r) => [r.id, r])), [datos.reuniones]);
  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return datos.cobros.filter(
      (c) =>
        (filtro === "todos" || c.estado_pago === filtro) &&
        (!desde || c.fecha_emision >= desde) &&
        (!hasta || c.fecha_emision <= hasta) &&
        (!t || c.cliente_nombre.toLowerCase().includes(t) || c.folio.toLowerCase().includes(t) || (c.concepto ?? "").toLowerCase().includes(t))
    );
  }, [datos.cobros, filtro, q, desde, hasta]);

  const tarjeta = (t: string, v: number, tono: string) => (
    <div className={`${P.card} !p-4`}>
      <p className="font-display text-[0.75rem] font-bold uppercase tracking-wider text-secondary">{t}</p>
      <p className={`mt-1 font-display text-[1.6rem] font-black ${tono}`}>{pesos(v)}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {tarjeta("Por cobrar", porCobrar, "text-[#101820]")}
        {tarjeta("Vencido", vencido, vencido > 0 ? "text-[#B4541B]" : "text-[#101820]")}
        {tarjeta("Cobrado", cobrado, "text-emerald-700")}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
          <input className={`${P.input} !pl-10`} placeholder="Buscar por cliente, folio o concepto" value={q} onChange={(e) => { setQ(e.target.value); setVisibles(PAGINA); }} aria-label="Buscar cobros" />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
          {FILTROS.map((f) => (
            <button key={f.id} onClick={() => { setFiltro(f.id); setVisibles(PAGINA); }} aria-pressed={filtro === f.id} className={`min-h-[40px] rounded-full border-2 px-4 font-display text-[0.8rem] font-bold ${filtro === f.id ? "border-allitron-blue bg-allitron-blue text-white" : "border-[#101820]/12 bg-white text-[#101820] hover:border-allitron-blue"}`}>
              {f.t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3" role="group" aria-label="Filtrar por fecha de emisión">
        <div><label className={P.label} htmlFor="l-desde">Emitidos desde</label><input id="l-desde" type="date" className={`${P.input} !w-[170px]`} value={desde} max={hasta || undefined} onChange={(e) => { setDesde(e.target.value); setVisibles(PAGINA); }} /></div>
        <div><label className={P.label} htmlFor="l-hasta">hasta</label><input id="l-hasta" type="date" className={`${P.input} !w-[170px]`} value={hasta} min={desde || undefined} onChange={(e) => { setHasta(e.target.value); setVisibles(PAGINA); }} /></div>
        {(desde || hasta) && <button type="button" className={P.btnGhost} onClick={() => { setDesde(""); setHasta(""); setVisibles(PAGINA); }}>Quitar fechas</button>}
        <p className="font-body text-[0.85rem] text-secondary sm:ml-auto">{lista.length} {lista.length === 1 ? "cobro" : "cobros"}</p>
      </div>

      {datos.cobros.length === 0 ? (
        <div className={`${P.card} text-center`}>
          <p className="font-body text-[1rem] text-secondary">Aún no hay cobros. Crea el primero y lígalo a la cita del cliente.</p>
          <button className={`${P.btn} mt-4`} onClick={nuevo}>Nuevo cobro</button>
        </div>
      ) : lista.length === 0 ? (
        <Aviso tipo="info">Ningún cobro coincide con ese filtro.</Aviso>
      ) : (
        <ul className="flex flex-col gap-3">
          {lista.slice(0, visibles).map((c) => {
            const cita = c.reunion_id ? citas.get(c.reunion_id) : null;
            return (
              <li key={c.id}>
                <button onClick={() => abrir(c.id)} className={`${P.card} neu-hover grid w-full gap-3 text-left sm:grid-cols-[1fr_auto] sm:items-center`}>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-display text-[1rem] font-bold text-[#101820]">
                      <span className="font-mono text-[0.85rem] text-secondary">{c.folio}</span>
                      <span className="truncate">{c.cliente_nombre}</span>
                      {c.reunion_id && <span title={cita ? `Cita: ${cita.producto_nombre}` : "Ligado a una cita"} className="inline-flex items-center gap-1 rounded-full bg-allitron-blue/10 px-2 py-0.5 text-[0.7rem] text-allitron-navy"><Link2 className="h-3 w-3" /> Cita{cita ? ` · ${cita.producto_nombre}` : ""}</span>}
                    </p>
                    <p className="mt-0.5 truncate font-body text-[0.9rem] text-secondary">{c.concepto || "Sin concepto"} · emitido {fechaYmd(c.fecha_emision)}{c.fecha_vencimiento && c.estado === "emitido" ? ` · vence ${fechaYmd(c.fecha_vencimiento)}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                    <Insignia estado={c.estado_pago} etiqueta={ETIQUETA_ESTADO[c.estado_pago]} />
                    {c.estado === "emitido" && c.cliente_email && (c.ultimo_envio ? (c.ultimo_envio.estado === "error" ? <span className="font-body text-[0.75rem] font-semibold text-[#B4541B]">Correo falló</span> : <span className="font-body text-[0.75rem] text-secondary">Correo enviado</span>) : <span className="font-body text-[0.75rem] text-secondary">Sin enviar</span>)}
                    <p className="font-display text-[1rem] font-black text-[#101820]">{pesos(c.total)}{c.estado === "emitido" && c.saldo > 0 && c.abonado > 0 && <span className="ml-2 text-[0.8rem] font-bold text-secondary">resta {pesos(c.saldo)}</span>}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {lista.length > visibles && <button type="button" className={`${P.btnGhost} self-center`} onClick={() => setVisibles(visibles + PAGINA)}>Mostrar {Math.min(PAGINA, lista.length - visibles)} más ({lista.length - visibles} restantes)</button>}
    </div>
  );
}
