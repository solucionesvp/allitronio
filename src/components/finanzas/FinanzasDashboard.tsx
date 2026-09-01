"use client";

import { useMemo, useState } from "react";
import { Download, Plus, RefreshCcw, X, Trash2, Settings, Archive } from "lucide-react";

// ── Tipos ────────────────────────────────────────────────────────────────
export interface Proyecto {
  id: string;
  slug: string;
  nombre: string;
  tipo: "producto" | "evento" | "activo_socio";
  propietario_inversion: "Lups" | "Alejandro" | "Allitron" | "Miki" | "Mixto";
  descripcion: string | null;
  recurrente_mensual_mxn: number | null;
  activo: boolean;
  orden: number;
}

export interface Servicio {
  id: string;
  proyecto_id: string | null;
  nombre: string;
  valor: number;
  moneda: "USD" | "MXN";
  periodicidad: "mensual" | "anual" | "unico";
  clientes_activos: number;
  notas: string | null;
}

export interface Movimiento {
  id: string;
  orden: number;
  proyecto_id: string;
  concepto: string;
  fecha: string;
  monto: number;
  moneda: "USD" | "MXN";
  quien_pago: "Lups" | "Alejandro" | "Miki";
  estado: "Pagado" | "Recurrente activo" | "Proyectado";
  notas: string | null;
}

const PERSONAS = ["Lups", "Alejandro", "Miki"] as const;
const ESTADOS = ["Pagado", "Recurrente activo", "Proyectado"] as const;
const TIPOS = ["producto", "evento", "activo_socio"] as const;
const PROPIETARIOS = ["Lups", "Alejandro", "Allitron", "Miki", "Mixto"] as const;
const HORIZONTES = [3, 6, 12] as const;

function fmtMXN(n: number) {
  return "$" + Math.round(n).toLocaleString("es-MX") + " MXN";
}
function fmtOriginal(monto: number, moneda: string) {
  return "$" + Number(monto).toLocaleString("es-MX", { maximumFractionDigits: 2 }) + " " + moneda;
}
function tipoLabel(t: string) {
  if (t === "producto") return "Producto";
  if (t === "evento") return "Evento";
  return "Activo de socio";
}

type MovForm = {
  id?: string;
  proyecto_id: string;
  concepto: string;
  fecha: string;
  monto: string;
  moneda: "USD" | "MXN";
  quien_pago: (typeof PERSONAS)[number];
  estado: (typeof ESTADOS)[number];
  notas: string;
};

type ProyForm = {
  id?: string;
  nombre: string;
  tipo: (typeof TIPOS)[number];
  propietario_inversion: (typeof PROPIETARIOS)[number];
  descripcion: string;
  recurrente_mensual_mxn: string;
};

type ServForm = {
  id?: string;
  proyecto_id: string;
  nombre: string;
  valor: string;
  moneda: "USD" | "MXN";
  periodicidad: "mensual" | "anual" | "unico";
  clientes_activos: string;
  notas: string;
};

const EMPTY_PROY_FORM: ProyForm = {
  nombre: "",
  tipo: "producto",
  propietario_inversion: "Lups",
  descripcion: "",
  recurrente_mensual_mxn: "0",
};

const EMPTY_SERV_FORM: ServForm = {
  proyecto_id: "",
  nombre: "",
  valor: "",
  moneda: "MXN",
  periodicidad: "mensual",
  clientes_activos: "0",
  notas: "",
};

// ── Estilos base (tema claro) ───────────────────────────────────────────
const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
const inputCls =
  "mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-body text-[0.85rem] text-slate-900 focus:border-allitron-blue focus:bg-white focus:outline-none";
const labelCls = "font-body text-[0.72rem] font-bold text-slate-500";
const btnGhost =
  "flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 font-body text-[0.78rem] text-slate-700 hover:bg-slate-50";
const btnPrimary =
  "flex items-center gap-1.5 rounded-xl bg-allitron-blue px-3.5 py-2 font-display text-[0.78rem] font-bold text-white hover:brightness-95";

export default function FinanzasDashboard({
  role,
  initialMovimientos,
  initialProyectos,
  initialServicios,
  initialTipoCambio,
  configurado,
}: {
  role: "admin" | "viewer";
  initialMovimientos: Movimiento[];
  initialProyectos: Proyecto[];
  initialServicios: Servicio[];
  initialTipoCambio: number;
  configurado: boolean;
}) {
  const [movimientos, setMovimientos] = useState<Movimiento[]>(initialMovimientos);
  const [proyectos, setProyectos] = useState<Proyecto[]>(initialProyectos);
  const [servicios, setServicios] = useState<Servicio[]>(initialServicios);
  const [tipoCambio, setTipoCambio] = useState(initialTipoCambio);

  const [fProyecto, setFProyecto] = useState("");
  const [fQuien, setFQuien] = useState("");
  const [fEstado, setFEstado] = useState("");

  const [movModalOpen, setMovModalOpen] = useState(false);
  const [catalogoOpen, setCatalogoOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [fxOpen, setFxOpen] = useState(false);
  const [fxDraft, setFxDraft] = useState(String(initialTipoCambio));
  const [horizonte, setHorizonte] = useState<(typeof HORIZONTES)[number]>(6);

  const [movForm, setMovForm] = useState<MovForm>({
    proyecto_id: initialProyectos.find((p) => p.tipo !== "activo_socio")?.id || "",
    concepto: "",
    fecha: "",
    monto: "",
    moneda: "MXN",
    quien_pago: "Lups",
    estado: "Pagado",
    notas: "",
  });
  const [proyForm, setProyForm] = useState<ProyForm>(EMPTY_PROY_FORM);
  const [servForm, setServForm] = useState<ServForm>(EMPTY_SERV_FORM);

  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const isAdmin = role === "admin";

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  const proyectosById = useMemo(() => {
    const map: Record<string, Proyecto> = {};
    proyectos.forEach((p) => (map[p.id] = p));
    return map;
  }, [proyectos]);

  // Catálogo separado por tipo — los activos de socio NUNCA se mezclan con
  // el gasto de productos/eventos de Allitron.
  const catalogoProductos = useMemo(
    () => proyectos.filter((p) => p.tipo !== "activo_socio" && p.activo),
    [proyectos]
  );
  const catalogoActivosSocios = useMemo(
    () => proyectos.filter((p) => p.tipo === "activo_socio"),
    [proyectos]
  );

  function toMXN(m: { monto: number; moneda: string }) {
    return m.moneda === "USD" ? m.monto * tipoCambio : m.monto;
  }

  const movimientosProductos = useMemo(
    () => movimientos.filter((m) => proyectosById[m.proyecto_id]?.tipo !== "activo_socio"),
    [movimientos, proyectosById]
  );
  const movimientosActivosSocios = useMemo(
    () => movimientos.filter((m) => proyectosById[m.proyecto_id]?.tipo === "activo_socio"),
    [movimientos, proyectosById]
  );

  const filtered = useMemo(() => {
    return movimientosProductos.filter((m) => {
      if (fProyecto && m.proyecto_id !== fProyecto) return false;
      if (fQuien && m.quien_pago !== fQuien) return false;
      if (fEstado && m.estado !== fEstado) return false;
      return true;
    });
  }, [movimientosProductos, fProyecto, fQuien, fEstado]);

  // Resumen de productos/eventos (lo que Lups aporta a Allitron)
  const summary = useMemo(() => {
    let gastado = 0;
    let proyectado = 0;
    const porProyecto: Record<string, { gastado: number; proyectado: number }> = {};
    const porPersona: Record<string, number> = { Lups: 0, Alejandro: 0, Miki: 0 };
    catalogoProductos.forEach((p) => (porProyecto[p.id] = { gastado: 0, proyectado: 0 }));

    movimientosProductos.forEach((m) => {
      const mxn = toMXN(m);
      if (!porProyecto[m.proyecto_id]) porProyecto[m.proyecto_id] = { gastado: 0, proyectado: 0 };
      if (m.estado === "Proyectado") {
        proyectado += mxn;
        porProyecto[m.proyecto_id].proyectado += mxn;
      } else {
        gastado += mxn;
        porProyecto[m.proyecto_id].gastado += mxn;
        porPersona[m.quien_pago] = (porPersona[m.quien_pago] || 0) + mxn;
      }
    });
    return { gastado, proyectado, porProyecto, porPersona };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movimientosProductos, catalogoProductos, tipoCambio]);

  // Resumen de activos de socios — completamente aparte, nunca sumado arriba
  const summaryActivos = useMemo(() => {
    let total = 0;
    const porActivo: Record<string, number> = {};
    catalogoActivosSocios.forEach((p) => (porActivo[p.id] = 0));
    movimientosActivosSocios.forEach((m) => {
      const mxn = toMXN(m);
      total += mxn;
      porActivo[m.proyecto_id] = (porActivo[m.proyecto_id] || 0) + mxn;
    });
    return { total, porActivo };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movimientosActivosSocios, catalogoActivosSocios, tipoCambio]);

  // Proyecciones: recurrente_mensual_mxn (estimado manual por proyecto) x
  // horizonte + lo ya marcado como "Proyectado" en movimientos (dato real
  // capturado, no inventado).
  const proyecciones = useMemo(() => {
    return catalogoProductos
      .map((p) => {
        const recurrente = (p.recurrente_mensual_mxn || 0) * horizonte;
        const proyectadoManual = summary.porProyecto[p.id]?.proyectado || 0;
        return { proyecto: p, recurrente, proyectadoManual, total: recurrente + proyectadoManual };
      })
      .filter((r) => r.total > 0);
  }, [catalogoProductos, horizonte, summary]);
  const proyeccionTotal = proyecciones.reduce((acc, r) => acc + r.total, 0);

  // ── Movimientos: CRUD ─────────────────────────────────────────────────
  function openAddMov() {
    setMovForm({
      proyecto_id: catalogoProductos[0]?.id || "",
      concepto: "",
      fecha: "",
      monto: "",
      moneda: "MXN",
      quien_pago: "Lups",
      estado: "Pagado",
      notas: "",
    });
    setMovModalOpen(true);
  }
  function openEditMov(m: Movimiento) {
    setMovForm({
      id: m.id,
      proyecto_id: m.proyecto_id,
      concepto: m.concepto,
      fecha: m.fecha,
      monto: String(m.monto),
      moneda: m.moneda,
      quien_pago: m.quien_pago,
      estado: m.estado,
      notas: m.notas || "",
    });
    setMovModalOpen(true);
  }

  async function handleSubmitMov(e: React.FormEvent) {
    e.preventDefault();
    if (!movForm.proyecto_id || !movForm.concepto.trim() || !movForm.fecha.trim() || isNaN(parseFloat(movForm.monto))) return;
    setBusy(true);
    const payload = {
      proyecto_id: movForm.proyecto_id,
      concepto: movForm.concepto.trim(),
      fecha: movForm.fecha.trim(),
      monto: parseFloat(movForm.monto),
      moneda: movForm.moneda,
      quien_pago: movForm.quien_pago,
      estado: movForm.estado,
      notas: movForm.notas.trim(),
    };
    try {
      if (movForm.id) {
        const res = await fetch(`/api/finanzas/movimientos/${movForm.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setMovimientos((prev) => prev.map((m) => (m.id === movForm.id ? json.movimiento : m)));
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
      setMovModalOpen(false);
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteMov() {
    if (!movForm.id) return;
    if (!window.confirm("¿Eliminar este movimiento? No se puede deshacer.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/finanzas/movimientos/${movForm.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        setMovimientos((prev) => prev.filter((m) => m.id !== movForm.id));
        setMovModalOpen(false);
        showToast("Movimiento eliminado.");
      } else {
        showToast("No se pudo eliminar (" + json.error + ").");
      }
    } finally {
      setBusy(false);
    }
  }

  // ── Catálogo de proyectos: CRUD ───────────────────────────────────────
  function openEditProy(p: Proyecto) {
    setProyForm({
      id: p.id,
      nombre: p.nombre,
      tipo: p.tipo,
      propietario_inversion: p.propietario_inversion,
      descripcion: p.descripcion || "",
      recurrente_mensual_mxn: String(p.recurrente_mensual_mxn || 0),
    });
  }
  function resetProyForm() {
    setProyForm(EMPTY_PROY_FORM);
  }

  async function handleSubmitProy(e: React.FormEvent) {
    e.preventDefault();
    if (!proyForm.nombre.trim()) return;
    setBusy(true);
    const payload = {
      nombre: proyForm.nombre.trim(),
      tipo: proyForm.tipo,
      propietario_inversion: proyForm.propietario_inversion,
      descripcion: proyForm.descripcion.trim(),
      recurrente_mensual_mxn: parseFloat(proyForm.recurrente_mensual_mxn) || 0,
    };
    try {
      if (proyForm.id) {
        const res = await fetch(`/api/finanzas/proyectos/${proyForm.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setProyectos((prev) => prev.map((p) => (p.id === proyForm.id ? json.proyecto : p)));
          showToast("Entrada del catálogo actualizada.");
          resetProyForm();
        } else {
          showToast("No se pudo guardar (" + json.error + ").");
        }
      } else {
        const res = await fetch("/api/finanzas/proyectos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setProyectos((prev) => [...prev, json.proyecto]);
          showToast("Entrada agregada al catálogo.");
          resetProyForm();
        } else {
          showToast("No se pudo guardar (" + json.error + ").");
        }
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleArchiveProy(p: Proyecto) {
    if (!window.confirm(`¿Archivar "${p.nombre}"? Deja de aparecer para agregar movimientos nuevos, pero conserva el histórico.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/finanzas/proyectos/${p.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        if (json.archivado) {
          setProyectos((prev) => prev.map((x) => (x.id === p.id ? { ...x, activo: false } : x)));
          showToast("Archivado (tiene movimientos ligados, se conserva el histórico).");
        } else {
          setProyectos((prev) => prev.filter((x) => x.id !== p.id));
          showToast("Eliminado del catálogo.");
        }
      } else {
        showToast("No se pudo archivar (" + json.error + ").");
      }
    } finally {
      setBusy(false);
    }
  }

  // ── Catálogo de servicios: CRUD ───────────────────────────────────────
  async function handleSubmitServ(e: React.FormEvent) {
    e.preventDefault();
    if (!servForm.nombre.trim() || isNaN(parseFloat(servForm.valor))) return;
    setBusy(true);
    const payload = {
      proyecto_id: servForm.proyecto_id || null,
      nombre: servForm.nombre.trim(),
      valor: parseFloat(servForm.valor),
      moneda: servForm.moneda,
      periodicidad: servForm.periodicidad,
      clientes_activos: parseInt(servForm.clientes_activos, 10) || 0,
      notas: servForm.notas.trim(),
    };
    try {
      if (servForm.id) {
        const res = await fetch(`/api/finanzas/servicios/${servForm.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setServicios((prev) => prev.map((s) => (s.id === servForm.id ? json.servicio : s)));
          showToast("Servicio actualizado.");
          setServForm(EMPTY_SERV_FORM);
        } else {
          showToast("No se pudo guardar (" + json.error + ").");
        }
      } else {
        const res = await fetch("/api/finanzas/servicios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.ok) {
          setServicios((prev) => [...prev, json.servicio]);
          showToast("Servicio agregado.");
          setServForm(EMPTY_SERV_FORM);
        } else {
          showToast("No se pudo guardar (" + json.error + ").");
        }
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteServ(id: string) {
    if (!window.confirm("¿Eliminar este servicio del catálogo?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/finanzas/servicios/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        setServicios((prev) => prev.filter((s) => s.id !== id));
        showToast("Servicio eliminado.");
      } else {
        showToast("No se pudo eliminar.");
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
    movimientosProductos.forEach((m) => {
      const row = [
        m.fecha,
        proyectosById[m.proyecto_id]?.nombre || "—",
        m.concepto,
        m.monto,
        m.moneda,
        Math.round(toMXN(m)),
        m.quien_pago,
        m.estado,
        m.notas || "",
      ];
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
    <main className="min-h-svh bg-slate-50 px-4 pb-24 pt-8 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[1.35rem] font-bold text-slate-900">Allitron — Control Financiero</h1>
            <p className="font-body text-[0.8rem] text-slate-500">
              Sesión: <span className="font-semibold text-allitron-blue">{isAdmin ? "administrador" : "solo consulta"}</span>
              {!configurado && (
                <span className="ml-2 font-semibold text-allitron-orange">· Supabase no configurado todavía en este entorno</span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button onClick={() => setCatalogoOpen(true)} className={btnGhost}>
                <Settings size={14} /> Catálogo
              </button>
            )}
            {isAdmin && (
              <button onClick={() => setServiciosOpen(true)} className={btnGhost}>
                <Settings size={14} /> Servicios
              </button>
            )}
            {isAdmin && (
              <button onClick={() => setFxOpen(true)} className={btnGhost}>
                <RefreshCcw size={14} /> Tipo de cambio ({tipoCambio})
              </button>
            )}
            <button onClick={exportCsv} className={btnGhost}>
              <Download size={14} /> Exportar CSV
            </button>
            {isAdmin && (
              <button onClick={openAddMov} className={btnPrimary}>
                <Plus size={15} /> Agregar movimiento
              </button>
            )}
          </div>
        </header>

        {/* ── Resumen productos/eventos Allitron ── */}
        <h2 className="mb-3 font-display text-[0.85rem] font-bold uppercase tracking-wide text-slate-500">
          Productos, servicios y eventos — inversión de Lups aportada a Allitron
        </h2>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className={`${card} col-span-2 lg:col-span-3`}>
            <p className="font-body text-[0.68rem] uppercase tracking-wider text-slate-500">Total gastado / comprometido</p>
            <p className="mt-2 font-display text-[1.6rem] font-bold text-slate-900">{fmtMXN(summary.gastado)}</p>
          </div>
          <div className={`${card} col-span-2 lg:col-span-3`}>
            <p className="font-body text-[0.68rem] uppercase tracking-wider text-slate-500">Proyectado (no gastado aún)</p>
            <p className="mt-2 font-display text-[1.6rem] font-bold text-allitron-orange">{fmtMXN(summary.proyectado)}</p>
          </div>
          {PERSONAS.map((p) => (
            <div key={p} className={`${card} sm:col-span-1`}>
              <p className="font-body text-[0.65rem] uppercase tracking-wider text-slate-500">Aportado por {p}</p>
              <p className="mt-1.5 font-display text-[1.05rem] font-bold text-slate-900">{fmtMXN(summary.porPersona[p] || 0)}</p>
            </div>
          ))}
          {catalogoProductos.map((p) => (
            <div key={p.id} className={`${card} sm:col-span-1`}>
              <p className="font-body text-[0.65rem] uppercase tracking-wider text-slate-500">{p.nombre}</p>
              <p className="mt-1.5 font-display text-[1.05rem] font-bold text-slate-900">{fmtMXN(summary.porProyecto[p.id]?.gastado || 0)}</p>
              {(summary.porProyecto[p.id]?.proyectado || 0) > 0 && (
                <p className="mt-0.5 font-body text-[0.68rem] font-semibold text-allitron-orange">
                  + {fmtMXN(summary.porProyecto[p.id].proyectado)} proyectado
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Proyecciones ── */}
        <section className={`${card} mb-8`}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-[0.95rem] font-bold text-slate-900">Proyección de gasto</h2>
            <div className="flex gap-1.5">
              {HORIZONTES.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizonte(h)}
                  className={`rounded-lg px-3 py-1.5 font-body text-[0.75rem] font-bold ${
                    horizonte === h ? "bg-allitron-blue text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {h} meses
                </button>
              ))}
            </div>
          </div>
          {proyecciones.length === 0 ? (
            <p className="font-body text-[0.8rem] text-slate-500">
              Sin proyección todavía. Define un &quot;gasto recurrente mensual estimado&quot; por proyecto desde Catálogo, o marca
              movimientos futuros con estado &quot;Proyectado&quot;.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {proyecciones.map((r) => (
                  <div key={r.proyecto.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                    <p className="font-body text-[0.7rem] font-bold text-slate-600">{r.proyecto.nombre}</p>
                    <p className="mt-1 font-display text-[1.05rem] font-bold text-slate-900">{fmtMXN(r.total)}</p>
                    <p className="font-body text-[0.66rem] text-slate-500">
                      {r.recurrente > 0 && `${fmtMXN(r.recurrente)} recurrente`}
                      {r.recurrente > 0 && r.proyectadoManual > 0 && " + "}
                      {r.proyectadoManual > 0 && `${fmtMXN(r.proyectadoManual)} marcado`}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-body text-[0.78rem] font-bold text-slate-700">
                Total proyectado a {horizonte} meses: <span className="text-allitron-blue">{fmtMXN(proyeccionTotal)}</span>
              </p>
            </>
          )}
          <p className="mt-3 font-body text-[0.68rem] leading-relaxed text-slate-400">
            El &quot;recurrente mensual estimado&quot; es un dato que captura el admin a criterio por proyecto (Catálogo → editar) —
            no se infiere automáticamente del histórico, que no viene desglosado mes a mes.
          </p>
        </section>

        {/* ── Filtros + tabla de movimientos ── */}
        <section className={`${card} mb-8`}>
          <div className="mb-4 flex flex-wrap gap-2">
            <select value={fProyecto} onChange={(e) => setFProyecto(e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-body text-[0.78rem] text-slate-900">
              <option value="">Todos los proyectos</option>
              {catalogoProductos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
            <select value={fQuien} onChange={(e) => setFQuien(e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-body text-[0.78rem] text-slate-900">
              <option value="">Todos (Lups / Alejandro / Miki)</option>
              {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={fEstado} onChange={(e) => setFEstado(e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-body text-[0.78rem] text-slate-900">
              <option value="">Todos los estados</option>
              {ESTADOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse font-body text-[0.8rem]">
              <thead>
                <tr className="border-b border-slate-200 text-left text-[0.68rem] uppercase tracking-wide text-slate-500">
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
                  <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 pr-3 whitespace-nowrap">{m.fecha}</td>
                    <td className="py-2.5 pr-3">{proyectosById[m.proyecto_id]?.nombre || "—"}</td>
                    <td className="py-2.5 pr-3">{m.concepto}</td>
                    <td className="py-2.5 pr-3 text-right whitespace-nowrap">{fmtOriginal(m.monto, m.moneda)}</td>
                    <td className="py-2.5 pr-3 text-right whitespace-nowrap">{fmtMXN(toMXN(m))}</td>
                    <td className="py-2.5 pr-3">{m.quien_pago}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${
                          m.estado === "Pagado"
                            ? "bg-emerald-50 text-emerald-600"
                            : m.estado === "Proyectado"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-orange-50 text-allitron-orange"
                        }`}
                      >
                        {m.estado}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 max-w-[220px] text-slate-500">{m.notas}</td>
                    {isAdmin && (
                      <td className="py-2.5 pr-3">
                        <button onClick={() => openEditMov(m)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[0.72rem] text-slate-700 hover:bg-slate-100">
                          Editar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={isAdmin ? 9 : 8} className="py-8 text-center text-slate-400">
                      No hay movimientos con este filtro todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Servicios activos (valor + clientes en bruto, sin nombres) ── */}
        {servicios.length > 0 && (
          <section className={`${card} mb-8`}>
            <h2 className="mb-3 font-display text-[0.95rem] font-bold text-slate-900">Servicios activos</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse font-body text-[0.8rem]">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-[0.68rem] uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-3">Servicio</th>
                    <th className="py-2 pr-3">Proyecto</th>
                    <th className="py-2 pr-3 text-right">Valor</th>
                    <th className="py-2 pr-3">Periodicidad</th>
                    <th className="py-2 pr-3 text-right">Clientes activos</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((s) => (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="py-2.5 pr-3">{s.nombre}</td>
                      <td className="py-2.5 pr-3">{s.proyecto_id ? proyectosById[s.proyecto_id]?.nombre || "—" : "—"}</td>
                      <td className="py-2.5 pr-3 text-right whitespace-nowrap">{fmtOriginal(s.valor, s.moneda)}</td>
                      <td className="py-2.5 pr-3 capitalize">{s.periodicidad}</td>
                      <td className="py-2.5 pr-3 text-right">{s.clientes_activos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Activos de socios — completamente separado ── */}
        {catalogoActivosSocios.length > 0 && (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Archive size={16} className="text-slate-500" />
              <h2 className="font-display text-[0.95rem] font-bold text-slate-700">Activos de socios (independiente de Allitron-productos)</h2>
            </div>
            <p className="mb-4 font-body text-[0.75rem] leading-relaxed text-slate-500">
              Inversión física de cada socio (p. ej. el edificio/hub de Alejandro), separada por completo de lo que Lups aporta en
              productos. No se suma a los totales de arriba. El acuerdo entre ambas inversiones queda pendiente entre Lups y
              Alejandro.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {catalogoActivosSocios.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-body text-[0.72rem] font-bold text-slate-600">{p.nombre}</p>
                  <p className="mt-1 font-display text-[1.15rem] font-bold text-slate-900">{fmtMXN(summaryActivos.porActivo[p.id] || 0)}</p>
                  <p className="mt-1 font-body text-[0.68rem] text-slate-400">Inversión de: {p.propietario_inversion}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-body text-[0.78rem] font-bold text-slate-700">
              Total activos de socios: <span className="text-slate-900">{fmtMXN(summaryActivos.total)}</span>
            </p>
          </section>
        )}

        <p className="mt-6 text-center font-body text-[0.7rem] leading-relaxed text-slate-400">
          Los montos en USD se convierten a MXN con el tipo de cambio configurado arriba (no es histórico mes a mes, es una
          simplificación deliberada). Sistema interno de Allitron, no enlazado desde el sitio público.
        </p>
      </div>

      {/* ── Modal agregar/editar movimiento ── */}
      {movModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-6" onClick={(e) => e.target === e.currentTarget && setMovModalOpen(false)}>
          <div className="w-full max-w-[560px] rounded-t-[24px] bg-white p-6 shadow-xl sm:rounded-[24px]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] font-bold text-slate-900">{movForm.id ? "Editar movimiento" : "Agregar movimiento"}</h3>
              <button onClick={() => setMovModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmitMov} className="grid grid-cols-2 gap-3">
              <label className={`col-span-2 ${labelCls}`}>
                Proyecto
                <select value={movForm.proyecto_id} onChange={(e) => setMovForm({ ...movForm, proyecto_id: e.target.value })} className={inputCls}>
                  {proyectos.map((p) => <option key={p.id} value={p.id}>{p.nombre}{p.tipo === "activo_socio" ? " (activo de socio)" : ""}</option>)}
                </select>
              </label>
              <label className={`col-span-2 ${labelCls}`}>
                Concepto
                <input required value={movForm.concepto} onChange={(e) => setMovForm({ ...movForm, concepto: e.target.value })} placeholder="Ej. Pago mensual programador Colombia" className={inputCls} />
              </label>
              <label className={labelCls}>
                Fecha (aprox.)
                <input required value={movForm.fecha} onChange={(e) => setMovForm({ ...movForm, fecha: e.target.value })} placeholder="Ej. sep-2026" className={inputCls} />
              </label>
              <label className={labelCls}>
                Monto
                <input required type="number" step="0.01" min="0" value={movForm.monto} onChange={(e) => setMovForm({ ...movForm, monto: e.target.value })} className={inputCls} />
              </label>
              <label className={labelCls}>
                Moneda
                <select value={movForm.moneda} onChange={(e) => setMovForm({ ...movForm, moneda: e.target.value as "USD" | "MXN" })} className={inputCls}>
                  <option value="MXN">MXN</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className={labelCls}>
                Quién pagó
                <select value={movForm.quien_pago} onChange={(e) => setMovForm({ ...movForm, quien_pago: e.target.value as MovForm["quien_pago"] })} className={inputCls}>
                  {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className={`col-span-2 ${labelCls}`}>
                Estado
                <select value={movForm.estado} onChange={(e) => setMovForm({ ...movForm, estado: e.target.value as MovForm["estado"] })} className={inputCls}>
                  {ESTADOS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className={`col-span-2 ${labelCls}`}>
                Notas (opcional)
                <textarea value={movForm.notas} onChange={(e) => setMovForm({ ...movForm, notas: e.target.value })} className={`${inputCls} min-h-[60px]`} />
              </label>
              <div className="col-span-2 mt-2 flex items-center justify-end gap-2">
                {movForm.id && (
                  <button type="button" onClick={handleDeleteMov} disabled={busy} className="mr-auto flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 font-body text-[0.78rem] text-red-500 hover:bg-red-50">
                    <Trash2 size={13} /> Eliminar
                  </button>
                )}
                <button type="button" onClick={() => setMovModalOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 font-body text-[0.78rem] text-slate-700 hover:bg-slate-50">
                  Cancelar
                </button>
                <button type="submit" disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-white disabled:opacity-60">
                  {movForm.id ? "Guardar cambios" : "Guardar movimiento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal catálogo de proyectos ── */}
      {catalogoOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={(e) => e.target === e.currentTarget && (setCatalogoOpen(false), resetProyForm())}>
          <div className="max-h-[85vh] w-full max-w-[680px] overflow-y-auto rounded-[24px] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] font-bold text-slate-900">Catálogo de proyectos / productos / activos</h3>
              <button onClick={() => { setCatalogoOpen(false); resetProyForm(); }} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
            </div>

            <div className="mb-5 space-y-2">
              {proyectos.map((p) => (
                <div key={p.id} className={`flex items-center justify-between rounded-xl border p-3 ${p.activo ? "border-slate-200" : "border-slate-100 bg-slate-50 opacity-60"}`}>
                  <div>
                    <p className="font-body text-[0.8rem] font-bold text-slate-800">
                      {p.nombre} <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase text-slate-500">{tipoLabel(p.tipo)}</span>
                    </p>
                    <p className="font-body text-[0.68rem] text-slate-400">Inversión de: {p.propietario_inversion}{!p.activo && " · archivado"}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditProy(p)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[0.72rem] text-slate-700 hover:bg-slate-100">Editar</button>
                    {p.activo && (
                      <button onClick={() => handleArchiveProy(p)} className="rounded-lg border border-red-200 px-2.5 py-1 text-[0.72rem] text-red-500 hover:bg-red-50">Archivar</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitProy} className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <h4 className="col-span-2 font-body text-[0.78rem] font-bold text-slate-700">{proyForm.id ? "Editar entrada" : "Agregar nueva entrada al catálogo"}</h4>
              <label className={`col-span-2 ${labelCls}`}>
                Nombre
                <input required value={proyForm.nombre} onChange={(e) => setProyForm({ ...proyForm, nombre: e.target.value })} className={inputCls} />
              </label>
              <label className={labelCls}>
                Tipo
                <select value={proyForm.tipo} onChange={(e) => setProyForm({ ...proyForm, tipo: e.target.value as ProyForm["tipo"] })} className={inputCls}>
                  {TIPOS.map((t) => <option key={t} value={t}>{tipoLabel(t)}</option>)}
                </select>
              </label>
              <label className={labelCls}>
                Inversión de
                <select value={proyForm.propietario_inversion} onChange={(e) => setProyForm({ ...proyForm, propietario_inversion: e.target.value as ProyForm["propietario_inversion"] })} className={inputCls}>
                  {PROPIETARIOS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className={`col-span-2 ${labelCls}`}>
                Descripción (opcional)
                <input value={proyForm.descripcion} onChange={(e) => setProyForm({ ...proyForm, descripcion: e.target.value })} className={inputCls} />
              </label>
              <label className={`col-span-2 ${labelCls}`}>
                Gasto recurrente mensual estimado (MXN, para proyecciones — 0 si no aplica)
                <input type="number" step="0.01" min="0" value={proyForm.recurrente_mensual_mxn} onChange={(e) => setProyForm({ ...proyForm, recurrente_mensual_mxn: e.target.value })} className={inputCls} />
              </label>
              <div className="col-span-2 flex justify-end gap-2">
                {proyForm.id && (
                  <button type="button" onClick={resetProyForm} className="rounded-lg border border-slate-200 px-4 py-2 font-body text-[0.78rem] text-slate-700 hover:bg-slate-50">Cancelar edición</button>
                )}
                <button type="submit" disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-white disabled:opacity-60">
                  {proyForm.id ? "Guardar cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal catálogo de servicios ── */}
      {serviciosOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={(e) => e.target === e.currentTarget && setServiciosOpen(false)}>
          <div className="max-h-[85vh] w-full max-w-[680px] overflow-y-auto rounded-[24px] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] font-bold text-slate-900">Catálogo de servicios activos</h3>
              <button onClick={() => setServiciosOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
            </div>

            <div className="mb-5 space-y-2">
              {servicios.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-body text-[0.8rem] font-bold text-slate-800">{s.nombre}</p>
                    <p className="font-body text-[0.68rem] text-slate-400">
                      {fmtOriginal(s.valor, s.moneda)} / {s.periodicidad} · {s.clientes_activos} clientes activos
                      {s.proyecto_id && ` · ${proyectosById[s.proyecto_id]?.nombre || ""}`}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteServ(s.id)} className="rounded-lg border border-red-200 px-2.5 py-1 text-[0.72rem] text-red-500 hover:bg-red-50">Eliminar</button>
                </div>
              ))}
              {servicios.length === 0 && <p className="font-body text-[0.78rem] text-slate-400">Sin servicios cargados todavía.</p>}
            </div>

            <form onSubmit={handleSubmitServ} className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <h4 className="col-span-2 font-body text-[0.78rem] font-bold text-slate-700">Agregar servicio</h4>
              <label className={`col-span-2 ${labelCls}`}>
                Nombre
                <input required value={servForm.nombre} onChange={(e) => setServForm({ ...servForm, nombre: e.target.value })} className={inputCls} />
              </label>
              <label className={labelCls}>
                Proyecto asociado (opcional)
                <select value={servForm.proyecto_id} onChange={(e) => setServForm({ ...servForm, proyecto_id: e.target.value })} className={inputCls}>
                  <option value="">Sin asociar</option>
                  {proyectos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                </select>
              </label>
              <label className={labelCls}>
                Valor
                <input required type="number" step="0.01" min="0" value={servForm.valor} onChange={(e) => setServForm({ ...servForm, valor: e.target.value })} className={inputCls} />
              </label>
              <label className={labelCls}>
                Moneda
                <select value={servForm.moneda} onChange={(e) => setServForm({ ...servForm, moneda: e.target.value as "USD" | "MXN" })} className={inputCls}>
                  <option value="MXN">MXN</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className={labelCls}>
                Periodicidad
                <select value={servForm.periodicidad} onChange={(e) => setServForm({ ...servForm, periodicidad: e.target.value as ServForm["periodicidad"] })} className={inputCls}>
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                  <option value="unico">Único</option>
                </select>
              </label>
              <label className={labelCls}>
                Clientes activos (número, sin nombres)
                <input type="number" min="0" value={servForm.clientes_activos} onChange={(e) => setServForm({ ...servForm, clientes_activos: e.target.value })} className={inputCls} />
              </label>
              <div className="col-span-2 flex justify-end">
                <button type="submit" disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-white disabled:opacity-60">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal tipo de cambio ── */}
      {fxOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6" onClick={(e) => e.target === e.currentTarget && setFxOpen(false)}>
          <div className="w-full max-w-[340px] rounded-[24px] bg-white p-6 shadow-xl">
            <h3 className="mb-3 font-display text-[1rem] font-bold text-slate-900">Tipo de cambio USD → MXN</h3>
            <input type="number" step="0.01" min="0" value={fxDraft} onChange={(e) => setFxDraft(e.target.value)} className={inputCls} />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setFxOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 font-body text-[0.78rem] text-slate-700 hover:bg-slate-50">Cancelar</button>
              <button onClick={handleSaveFx} disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-white">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 font-body text-[0.8rem] text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
