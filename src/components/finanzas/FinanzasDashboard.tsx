"use client";

import { useMemo, useState } from "react";
import { Download, Plus, RefreshCcw, X, Trash2 } from "lucide-react";

export interface Movimiento {
  id: string;
  orden: number;
  proyecto: string;
  concepto: string;
  fecha: string;
  monto: number;
  moneda: "USD" | "MXN";
  quien_pago: "Lups" | "Alejandro" | "Miki";
  estado: "Pagado" | "Recurrente activo" | "Proyectado";
  notas: string | null;
}

const PROYECTOS = ["Lazup CRM", "Segundo Cerebro", "MAPS 2.0", "Motor de Captación", "Allitron", "Evento Nayarit Innovador"];
const PERSONAS = ["Lups", "Alejandro", "Miki"] as const;
const ESTADOS = ["Pagado", "Recurrente activo", "Proyectado"] as const;

function fmtMXN(n: number) {
  return "$" + Math.round(n).toLocaleString("es-MX") + " MXN";
}
function fmtOriginal(monto: number, moneda: string) {
  return "$" + Number(monto).toLocaleString("es-MX", { maximumFractionDigits: 2 }) + " " + moneda;
}

type FormState = {
  id?: string;
  proyecto: string;
  concepto: string;
  fecha: string;
  monto: string;
  moneda: "USD" | "MXN";
  quien_pago: (typeof PERSONAS)[number];
  estado: (typeof ESTADOS)[number];
  notas: string;
};

const EMPTY_FORM: FormState = {
  proyecto: PROYECTOS[0],
  concepto: "",
  fecha: "",
  monto: "",
  moneda: "MXN",
  quien_pago: "Lups",
  estado: "Pagado",
  notas: "",
};

export default function FinanzasDashboard({
  role,
  initialMovimientos,
  initialTipoCambio,
  configurado,
}: {
  role: "admin" | "viewer";
  initialMovimientos: Movimiento[];
  initialTipoCambio: number;
  configurado: boolean;
}) {
  const [movimientos, setMovimientos] = useState<Movimiento[]>(initialMovimientos);
  const [tipoCambio, setTipoCambio] = useState(initialTipoCambio);
  const [fProyecto, setFProyecto] = useState("");
  const [fQuien, setFQuien] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [fxOpen, setFxOpen] = useState(false);
  const [fxDraft, setFxDraft] = useState(String(initialTipoCambio));
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const isAdmin = role === "admin";

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  function toMXN(m: { monto: number; moneda: string }) {
    return m.moneda === "USD" ? m.monto * tipoCambio : m.monto;
  }

  const filtered = useMemo(() => {
    return movimientos.filter((m) => {
      if (fProyecto && m.proyecto !== fProyecto) return false;
      if (fQuien && m.quien_pago !== fQuien) return false;
      if (fEstado && m.estado !== fEstado) return false;
      return true;
    });
  }, [movimientos, fProyecto, fQuien, fEstado]);

  const summary = useMemo(() => {
    let gastado = 0;
    let proyectado = 0;
    const porProyecto: Record<string, { gastado: number; proyectado: number }> = {};
    const porPersona: Record<string, number> = { Lups: 0, Alejandro: 0, Miki: 0 };
    PROYECTOS.forEach((p) => (porProyecto[p] = { gastado: 0, proyectado: 0 }));

    movimientos.forEach((m) => {
      const mxn = toMXN(m);
      if (!porProyecto[m.proyecto]) porProyecto[m.proyecto] = { gastado: 0, proyectado: 0 };
      if (m.estado === "Proyectado") {
        proyectado += mxn;
        porProyecto[m.proyecto].proyectado += mxn;
      } else {
        gastado += mxn;
        porProyecto[m.proyecto].gastado += mxn;
        porPersona[m.quien_pago] = (porPersona[m.quien_pago] || 0) + mxn;
      }
    });
    return { gastado, proyectado, porProyecto, porPersona };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movimientos, tipoCambio]);

  function openAdd() {
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }
  function openEdit(m: Movimiento) {
    setForm({
      id: m.id,
      proyecto: m.proyecto,
      concepto: m.concepto,
      fecha: m.fecha,
      monto: String(m.monto),
      moneda: m.moneda,
      quien_pago: m.quien_pago,
      estado: m.estado,
      notas: m.notas || "",
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.concepto.trim() || !form.fecha.trim() || isNaN(parseFloat(form.monto))) return;
    setBusy(true);
    const payload = {
      proyecto: form.proyecto,
      concepto: form.concepto.trim(),
      fecha: form.fecha.trim(),
      monto: parseFloat(form.monto),
      moneda: form.moneda,
      quien_pago: form.quien_pago,
      estado: form.estado,
      notas: form.notas.trim(),
    };
    try {
      if (form.id) {
        const res = await fetch(`/api/finanzas/movimientos/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setMovimientos((prev) => prev.map((m) => (m.id === form.id ? json.movimiento : m)));
          showToast("Movimiento actualizado.");
        } else {
          showToast("No se pudo guardar (" + json.error + ").");
        }
      } else {
        const res = await fetch("/api/finanzas/movimientos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setMovimientos((prev) => [...prev, json.movimiento]);
          showToast("Movimiento agregado.");
        } else {
          showToast("No se pudo guardar (" + json.error + ").");
        }
      }
      setModalOpen(false);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!window.confirm("¿Eliminar este movimiento? No se puede deshacer.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/finanzas/movimientos/${form.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        setMovimientos((prev) => prev.filter((m) => m.id !== form.id));
        setModalOpen(false);
        showToast("Movimiento eliminado.");
      } else {
        showToast("No se pudo eliminar (" + json.error + ").");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveFx() {
    const v = parseFloat(fxDraft);
    if (isNaN(v) || v <= 0) return;
    setBusy(true);
    try {
      const res = await fetch("/api/finanzas/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo_cambio: v }),
      });
      const json = await res.json();
      if (json.ok) {
        setTipoCambio(v);
        setFxOpen(false);
        showToast("Tipo de cambio actualizado.");
      } else {
        showToast("No se pudo guardar.");
      }
    } finally {
      setBusy(false);
    }
  }

  function exportCsv() {
    const header = ["Fecha", "Proyecto", "Concepto", "Monto original", "Moneda", "Monto MXN", "Quien pago", "Estado", "Notas"];
    const lines = [header.join(",")];
    movimientos.forEach((m) => {
      const row = [m.fecha, m.proyecto, m.concepto, m.monto, m.moneda, Math.round(toMXN(m)), m.quien_pago, m.estado, m.notas || ""];
      lines.push(
        row
          .map((v) => {
            const s = String(v).replace(/"/g, '""');
            return /[",\n]/.test(s) ? `"${s}"` : s;
          })
          .join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "allitron-control-financiero.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-svh bg-allitron-base px-4 pb-24 pt-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[1.35rem] font-bold">Allitron — Control Financiero</h1>
            <p className="font-body text-[0.8rem] text-muted">
              Sesión: <span className="text-allitron-blue">{isAdmin ? "administrador" : "solo consulta"}</span>
              {!configurado && (
                <span className="ml-2 text-allitron-orange">· Supabase no configurado todavía en este entorno</span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setFxOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.78rem] text-foreground hover:bg-white/[0.08]"
              >
                <RefreshCcw size={14} /> Tipo de cambio ({tipoCambio})
              </button>
            )}
            <button
              onClick={exportCsv}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.78rem] text-foreground hover:bg-white/[0.08]"
            >
              <Download size={14} /> Exportar CSV
            </button>
            {isAdmin && (
              <button
                onClick={openAdd}
                className="flex items-center gap-1.5 rounded-xl bg-allitron-blue px-3.5 py-2 font-display text-[0.78rem] font-bold text-allitron-base"
              >
                <Plus size={15} /> Agregar movimiento
              </button>
            )}
          </div>
        </header>

        {/* ── Resumen ── */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="glass-strong col-span-2 rounded-2xl p-5 lg:col-span-3">
            <p className="font-body text-[0.68rem] uppercase tracking-wider text-muted">Total gastado / comprometido</p>
            <p className="mt-2 font-display text-[1.6rem] font-bold text-foreground">{fmtMXN(summary.gastado)}</p>
          </div>
          <div className="glass-strong col-span-2 rounded-2xl p-5 lg:col-span-3">
            <p className="font-body text-[0.68rem] uppercase tracking-wider text-muted">Proyectado (no gastado aún)</p>
            <p className="mt-2 font-display text-[1.6rem] font-bold text-allitron-orange">{fmtMXN(summary.proyectado)}</p>
          </div>
          {PERSONAS.map((p) => (
            <div key={p} className="glass-strong rounded-2xl p-4 sm:col-span-1">
              <p className="font-body text-[0.65rem] uppercase tracking-wider text-muted">Aportado por {p}</p>
              <p className="mt-1.5 font-display text-[1.05rem] font-bold text-foreground">{fmtMXN(summary.porPersona[p] || 0)}</p>
            </div>
          ))}
          {PROYECTOS.map((p) => (
            <div key={p} className="glass-strong rounded-2xl p-4 sm:col-span-1">
              <p className="font-body text-[0.65rem] uppercase tracking-wider text-muted">{p}</p>
              <p className="mt-1.5 font-display text-[1.05rem] font-bold text-foreground">{fmtMXN(summary.porProyecto[p]?.gastado || 0)}</p>
              {summary.porProyecto[p]?.proyectado > 0 && (
                <p className="mt-0.5 font-body text-[0.68rem] text-allitron-orange">
                  + {fmtMXN(summary.porProyecto[p].proyectado)} proyectado
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Filtros + tabla ── */}
        <section className="glass-strong rounded-2xl p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <select value={fProyecto} onChange={(e) => setFProyecto(e.target.value)} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.78rem] text-foreground">
              <option value="">Todos los proyectos</option>
              {PROYECTOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={fQuien} onChange={(e) => setFQuien(e.target.value)} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.78rem] text-foreground">
              <option value="">Todos (Lups / Alejandro / Miki)</option>
              {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={fEstado} onChange={(e) => setFEstado(e.target.value)} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.78rem] text-foreground">
              <option value="">Todos los estados</option>
              {ESTADOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse font-body text-[0.8rem]">
              <thead>
                <tr className="border-b border-white/10 text-left text-[0.68rem] uppercase tracking-wide text-muted">
                  <th className="py-2 pr-3">Fecha</th>
                  <th className="py-2 pr-3">Proyecto</th>
                  <th className="py-2 pr-3">Concepto</th>
                  <th className="py-2 pr-3 text-right">Monto</th>
                  <th className="py-2 pr-3 text-right">MXN</th>
                  <th className="py-2 pr-3">Quién</th>
                  <th className="py-2 pr-3">Estado</th>
                  <th className="py-2 pr-3">Notas</th>
                  {isAdmin && <th className="py-2 pr-3"></th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="py-2.5 pr-3 whitespace-nowrap">{m.fecha}</td>
                    <td className="py-2.5 pr-3">{m.proyecto}</td>
                    <td className="py-2.5 pr-3">{m.concepto}</td>
                    <td className="py-2.5 pr-3 text-right whitespace-nowrap">{fmtOriginal(m.monto, m.moneda)}</td>
                    <td className="py-2.5 pr-3 text-right whitespace-nowrap">{fmtMXN(toMXN(m))}</td>
                    <td className="py-2.5 pr-3">{m.quien_pago}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${
                          m.estado === "Pagado"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : m.estado === "Proyectado"
                            ? "bg-amber-400/10 text-amber-400"
                            : "bg-allitron-orange/10 text-allitron-orange"
                        }`}
                      >
                        {m.estado}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 max-w-[220px] text-muted">{m.notas}</td>
                    {isAdmin && (
                      <td className="py-2.5 pr-3">
                        <button onClick={() => openEdit(m)} className="rounded-lg border border-white/10 px-2.5 py-1 text-[0.72rem] text-foreground hover:bg-white/[0.06]">
                          Editar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={isAdmin ? 9 : 8} className="py-8 text-center text-muted">
                      No hay movimientos con este filtro todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 text-center font-body text-[0.7rem] leading-relaxed text-muted/70">
          Los montos en USD se convierten a MXN con el tipo de cambio configurado arriba (no es histórico mes a mes, es una
          simplificación deliberada). Sistema interno de Allitron, no enlazado desde el sitio público.
        </p>
      </div>

      {/* ── Modal agregar/editar ── */}
      {modalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="glass-strong w-full max-w-[560px] rounded-t-[24px] p-6 sm:rounded-[24px]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] font-bold">{form.id ? "Editar movimiento" : "Agregar movimiento"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted hover:text-foreground"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
              <label className="col-span-2 font-body text-[0.72rem] font-bold text-muted">
                Proyecto
                <select value={form.proyecto} onChange={(e) => setForm({ ...form, proyecto: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground">
                  {PROYECTOS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="col-span-2 font-body text-[0.72rem] font-bold text-muted">
                Concepto
                <input required value={form.concepto} onChange={(e) => setForm({ ...form, concepto: e.target.value })} placeholder="Ej. Pago mensual programador Colombia" className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground" />
              </label>
              <label className="font-body text-[0.72rem] font-bold text-muted">
                Fecha (aprox.)
                <input required value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} placeholder="Ej. sep-2026" className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground" />
              </label>
              <label className="font-body text-[0.72rem] font-bold text-muted">
                Monto
                <input required type="number" step="0.01" min="0" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground" />
              </label>
              <label className="font-body text-[0.72rem] font-bold text-muted">
                Moneda
                <select value={form.moneda} onChange={(e) => setForm({ ...form, moneda: e.target.value as "USD" | "MXN" })} className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground">
                  <option value="MXN">MXN</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className="font-body text-[0.72rem] font-bold text-muted">
                Quién pagó
                <select value={form.quien_pago} onChange={(e) => setForm({ ...form, quien_pago: e.target.value as FormState["quien_pago"] })} className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground">
                  {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="col-span-2 font-body text-[0.72rem] font-bold text-muted">
                Estado
                <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as FormState["estado"] })} className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground">
                  {ESTADOS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="col-span-2 font-body text-[0.72rem] font-bold text-muted">
                Notas (opcional)
                <textarea value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} className="mt-1 min-h-[60px] w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.85rem] text-foreground" />
              </label>
              <div className="col-span-2 mt-2 flex items-center justify-end gap-2">
                {form.id && (
                  <button type="button" onClick={handleDelete} disabled={busy} className="mr-auto flex items-center gap-1 rounded-lg border border-red-400/30 px-3 py-2 font-body text-[0.78rem] text-red-400 hover:bg-red-400/10">
                    <Trash2 size={13} /> Eliminar
                  </button>
                )}
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 font-body text-[0.78rem] text-foreground hover:bg-white/[0.06]">
                  Cancelar
                </button>
                <button type="submit" disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-allitron-base disabled:opacity-60">
                  {form.id ? "Guardar cambios" : "Guardar movimiento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal tipo de cambio ── */}
      {fxOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={(e) => e.target === e.currentTarget && setFxOpen(false)}>
          <div className="glass-strong w-full max-w-[340px] rounded-[24px] p-6">
            <h3 className="mb-3 font-display text-[1rem] font-bold">Tipo de cambio USD → MXN</h3>
            <input type="number" step="0.01" min="0" value={fxDraft} onChange={(e) => setFxDraft(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-[0.9rem] text-foreground" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setFxOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 font-body text-[0.78rem] text-foreground hover:bg-white/[0.06]">Cancelar</button>
              <button onClick={handleSaveFx} disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-allitron-base">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-allitron-navy px-4 py-2.5 font-body text-[0.8rem] text-foreground shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
