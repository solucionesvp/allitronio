"use client";

import { useMemo, useState } from "react";
import { Download, Plus, RefreshCcw, X, Trash2, Settings, Archive, Calculator } from "lucide-react";

// ── Tipos ────────────────────────────────────────────────────────────────
export interface Proyecto {
  id: string;
  slug: string;
  nombre: string;
  tipo: "producto" | "evento" | "activo_socio";
  propietario_inversion: "Lups" | "Alejandro" | "Allitron" | "Miki" | "Mixto";
  descripcion: string | null;
  recurrente_mensual_mxn: number | null;
  precio_recuperacion_mensual: number | null;
  meta_clientes_recuperacion: number | null;
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

export interface AuditoriaEntry {
  id: string;
  momento: string;
  persona: string;
  accion: "crear" | "editar" | "eliminar" | "archivar" | "cambiar_fx";
  entidad: "movimiento" | "proyecto" | "servicio" | "config";
  entidad_id: string | null;
  detalle: string | null;
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
const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "movimientos", label: "Movimientos" },
  { id: "recuperacion", label: "Recuperación" },
  { id: "servicios", label: "Servicios" },
  { id: "socios", label: "Activos de socios" },
  { id: "actividad", label: "Actividad" },
] as const;
type TabId = (typeof TABS)[number]["id"];

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
  precio_recuperacion_mensual: string;
  meta_clientes_recuperacion: string;
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
  precio_recuperacion_mensual: "0",
  meta_clientes_recuperacion: "0",
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
  initialAuditoria,
  initialTipoCambio,
  configurado,
}: {
  role: "admin" | "viewer";
  initialMovimientos: Movimiento[];
  initialProyectos: Proyecto[];
  initialServicios: Servicio[];
  initialAuditoria: AuditoriaEntry[];
  initialTipoCambio: number;
  configurado: boolean;
}) {
  const [movimientos, setMovimientos] = useState<Movimiento[]>(initialMovimientos);
  const [proyectos, setProyectos] = useState<Proyecto[]>(initialProyectos);
  const [servicios, setServicios] = useState<Servicio[]>(initialServicios);
  const [auditoria] = useState<AuditoriaEntry[]>(initialAuditoria);
  const [tipoCambio, setTipoCambio] = useState(initialTipoCambio);

  const [tab, setTab] = useState<TabId>("resumen");

  const [fProyecto, setFProyecto] = useState("");
  const [fQuien, setFQuien] = useState("");
  const [fEstado, setFEstado] = useState("");

  const [movModalOpen, setMovModalOpen] = useState(false);
  const [movModalLocked, setMovModalLocked] = useState(false);
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

  // Recuperación: producto seleccionado + simulador de clientes (no se
  // guarda, es solo para "jugar" con escenarios)
  const [recuperaProyId, setRecuperaProyId] = useState<string>("");
  const [simClientes, setSimClientes] = useState<string>("");
  const [recuperaEditOpen, setRecuperaEditOpen] = useState(false);
  const [recuperaDraft, setRecuperaDraft] = useState({ precio: "0", meta: "0" });

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

  // Proyección de gasto: recurrente_mensual_mxn (estimado manual) x
  // horizonte + lo ya marcado como "Proyectado" en movimientos.
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

  // Servicios activos reales por proyecto (clientes en bruto, sin nombres)
  const clientesRealesPorProyecto = useMemo(() => {
    const map: Record<string, number> = {};
    servicios.forEach((s) => {
      if (!s.proyecto_id) return;
      map[s.proyecto_id] = (map[s.proyecto_id] || 0) + s.clientes_activos;
    });
    return map;
  }, [servicios]);

  // ── Recuperación de inversión: selección de producto → cálculo en vivo ──
  const recuperaProy = recuperaProyId ? proyectosById[recuperaProyId] : catalogoProductos[0];
  const recuperaTotalInvertido = recuperaProy ? summary.porProyecto[recuperaProy.id]?.gastado || 0 : 0;
  const recuperaClientesReales = recuperaProy ? clientesRealesPorProyecto[recuperaProy.id] || 0 : 0;
  const recuperaClientesSim =
    simClientes !== "" ? parseFloat(simClientes) || 0 : recuperaProy?.meta_clientes_recuperacion || recuperaClientesReales || 0;
  const recuperaPrecio = recuperaProy?.precio_recuperacion_mensual || 0;
  const recuperaIngresoMensual = recuperaPrecio * recuperaClientesSim;
  const recuperaMeses = recuperaIngresoMensual > 0 ? recuperaTotalInvertido / recuperaIngresoMensual : null;
  const recuperaAnos = recuperaMeses !== null ? recuperaMeses / 12 : null;

  // ── Movimientos: CRUD ─────────────────────────────────────────────────
  // defaultProyectoId: si viene de "Activos de socios", se fija ese
  // proyecto y no se puede cambiar (para que Alejandro no tenga que
  // buscarlo entre los productos).
  function openAddMov(defaultProyectoId?: string) {
    if (defaultProyectoId) {
      if (!proyectosById[defaultProyectoId]) {
        showToast("Ese activo todavía no existe en el catálogo — créalo primero desde Catálogo.");
        return;
      }
      setMovModalLocked(true);
    } else {
      if (catalogoProductos.length === 0) {
        showToast("No hay productos en el catálogo todavía. Agrega uno primero desde Catálogo (o corre las migraciones pendientes en Supabase si esperabas verlos aquí).");
        return;
      }
      setMovModalLocked(false);
    }
    setMovForm({
      proyecto_id: defaultProyectoId || catalogoProductos[0]?.id || "",
      concepto: "",
      fecha: "",
      monto: "",
      moneda: "MXN",
      quien_pago: defaultProyectoId && proyectosById[defaultProyectoId]?.tipo === "activo_socio" ? "Alejandro" : "Lups",
      estado: "Pagado",
      notas: "",
    });
    setMovModalOpen(true);
  }
  function openEditMov(m: Movimiento) {
    setMovModalLocked(false);
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
    if (!movForm.proyecto_id) {
      showToast("Falta elegir a qué proyecto/activo pertenece.");
      return;
    }
    if (!movForm.concepto.trim()) {
      showToast("Falta el concepto (en qué se gastó/invirtió).");
      return;
    }
    if (!movForm.fecha.trim()) {
      showToast("Falta la fecha aproximada.");
      return;
    }
    if (isNaN(parseFloat(movForm.monto)) || parseFloat(movForm.monto) <= 0) {
      showToast("El monto debe ser un número mayor a 0.");
      return;
    }
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
      precio_recuperacion_mensual: String(p.precio_recuperacion_mensual || 0),
      meta_clientes_recuperacion: String(p.meta_clientes_recuperacion || 0),
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
      precio_recuperacion_mensual: parseFloat(proyForm.precio_recuperacion_mensual) || 0,
      meta_clientes_recuperacion: parseInt(proyForm.meta_clientes_recuperacion, 10) || 0,
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

  // Guardado rápido de los supuestos de recuperación desde la pestaña
  // Recuperación (sin pasar por el modal completo de catálogo).
  function openRecuperaEdit() {
    if (!recuperaProy) return;
    setRecuperaDraft({
      precio: String(recuperaProy.precio_recuperacion_mensual || 0),
      meta: String(recuperaProy.meta_clientes_recuperacion || 0),
    });
    setRecuperaEditOpen(true);
  }
  async function handleSaveRecupera() {
    if (!recuperaProy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/finanzas/proyectos/${recuperaProy.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          precio_recuperacion_mensual: parseFloat(recuperaDraft.precio) || 0,
          meta_clientes_recuperacion: parseInt(recuperaDraft.meta, 10) || 0,
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setProyectos((prev) => prev.map((p) => (p.id === recuperaProy.id ? json.proyecto : p)));
        setRecuperaEditOpen(false);
        showToast("Supuestos de recuperación guardados.");
      } else {
        showToast("No se pudo guardar.");
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
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[1.3rem] font-bold text-slate-900">Allitron — Control Financiero</h1>
            <p className="font-body text-[0.78rem] text-slate-500">
              Sesión: <span className="font-semibold text-allitron-blue">{isAdmin ? "administrador" : "solo consulta"}</span>
              {!configurado && (
                <span className="ml-2 font-semibold text-allitron-orange">· Supabase no configurado todavía</span>
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
              <button onClick={() => setFxOpen(true)} className={btnGhost}>
                <RefreshCcw size={14} /> Tipo de cambio ({tipoCambio})
              </button>
            )}
            <button onClick={exportCsv} className={btnGhost}>
              <Download size={14} /> CSV
            </button>
            {isAdmin && (
              <button onClick={() => openAddMov()} className={btnPrimary}>
                <Plus size={15} /> Agregar movimiento
              </button>
            )}
          </div>
        </header>

        {/* ── Navegación por pestañas ── */}
        <nav className="mb-6 flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
          {TABS.filter((t) => t.id !== "actividad" || isAdmin).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3.5 py-1.5 font-body text-[0.8rem] font-bold transition ${
                tab === t.id ? "bg-allitron-blue text-white" : "text-slate-500 hover:bg-white hover:text-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {isAdmin && catalogoProductos.length === 0 && (
          <div className="mb-5 rounded-xl border border-allitron-orange/30 bg-orange-50 px-4 py-3 font-body text-[0.8rem] text-slate-700">
            Todavía no hay productos en el catálogo{!configurado && " (y Supabase no está configurado en este entorno)"} — por eso
            no se puede agregar un movimiento. Ábrelo desde &quot;Catálogo&quot; arriba y agrega o revisa las entradas; si esto es
            inesperado, probablemente falta correr las migraciones SQL en Supabase.
          </div>
        )}

        {/* ═══════════════ RESUMEN ═══════════════ */}
        {tab === "resumen" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={card}>
                <p className="font-body text-[0.68rem] uppercase tracking-wider text-slate-500">Total gastado / comprometido</p>
                <p className="mt-2 font-display text-[1.5rem] font-bold text-slate-900">{fmtMXN(summary.gastado)}</p>
                <p className="mt-1 font-body text-[0.7rem] text-slate-400">Productos, servicios y eventos — no incluye activos de socios</p>
              </div>
              <div className={card}>
                <p className="font-body text-[0.68rem] uppercase tracking-wider text-slate-500">Proyectado (no gastado aún)</p>
                <p className="mt-2 font-display text-[1.5rem] font-bold text-allitron-orange">{fmtMXN(summary.proyectado)}</p>
              </div>
            </div>

            <div className={card}>
              <p className="mb-2.5 font-body text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">Aportado por</p>
              <div className="flex flex-wrap gap-4">
                {PERSONAS.map((p) => (
                  <div key={p}>
                    <p className="font-body text-[0.7rem] text-slate-500">{p}</p>
                    <p className="font-display text-[1rem] font-bold text-slate-900">{fmtMXN(summary.porPersona[p] || 0)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={card}>
              <p className="mb-3 font-body text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">Por proyecto</p>
              <div className="divide-y divide-slate-100">
                {catalogoProductos.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2.5">
                    <span className="font-body text-[0.82rem] text-slate-700">{p.nombre}</span>
                    <span className="text-right">
                      <span className="font-body text-[0.85rem] font-bold text-slate-900">{fmtMXN(summary.porProyecto[p.id]?.gastado || 0)}</span>
                      {(summary.porProyecto[p.id]?.proyectado || 0) > 0 && (
                        <span className="ml-2 font-body text-[0.7rem] font-semibold text-allitron-orange">
                          +{fmtMXN(summary.porProyecto[p.id].proyectado)}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ MOVIMIENTOS ═══════════════ */}
        {tab === "movimientos" && (
          <section className={card}>
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
                      <td colSpan={isAdmin ? 8 : 7} className="py-8 text-center text-slate-400">
                        No hay movimientos con este filtro todavía.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ═══════════════ RECUPERACIÓN (interconectado por producto) ═══════════════ */}
        {tab === "recuperacion" && (
          <div className="space-y-4">
            <div className={card}>
              <label className={labelCls}>
                Elegir producto / servicio
                <select
                  value={recuperaProy?.id || ""}
                  onChange={(e) => { setRecuperaProyId(e.target.value); setSimClientes(""); }}
                  className={inputCls}
                >
                  {catalogoProductos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                </select>
              </label>
            </div>

            {recuperaProy && (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className={card}>
                    <p className="font-body text-[0.66rem] uppercase tracking-wide text-slate-500">Invertido</p>
                    <p className="mt-1 font-display text-[1.1rem] font-bold text-slate-900">{fmtMXN(recuperaTotalInvertido)}</p>
                  </div>
                  <div className={card}>
                    <p className="font-body text-[0.66rem] uppercase tracking-wide text-slate-500">Precio / cliente / mes</p>
                    <p className="mt-1 font-display text-[1.1rem] font-bold text-slate-900">{fmtMXN(recuperaPrecio)}</p>
                  </div>
                  <div className={card}>
                    <p className="font-body text-[0.66rem] uppercase tracking-wide text-slate-500">Clientes activos hoy</p>
                    <p className="mt-1 font-display text-[1.1rem] font-bold text-slate-900">{recuperaClientesReales}</p>
                  </div>
                  {isAdmin && (
                    <button onClick={openRecuperaEdit} className={`${btnGhost} h-full justify-center`}>
                      <Settings size={14} /> Ajustar precio / meta
                    </button>
                  )}
                </div>

                <div className={card}>
                  <div className="mb-3 flex items-center gap-2">
                    <Calculator size={16} className="text-allitron-blue" />
                    <p className="font-body text-[0.82rem] font-bold text-slate-800">Simulador de recuperación</p>
                  </div>
                  <label className={labelCls}>
                    ¿Con cuántos clientes quieres simular?
                    <input
                      type="number"
                      min="0"
                      placeholder={String(recuperaProy.meta_clientes_recuperacion || recuperaClientesReales || 0)}
                      value={simClientes}
                      onChange={(e) => setSimClientes(e.target.value)}
                      className={inputCls}
                    />
                  </label>

                  {recuperaPrecio <= 0 ? (
                    <p className="mt-4 font-body text-[0.8rem] text-slate-500">
                      Falta definir el precio mensual por cliente de este producto (botón &quot;Ajustar precio / meta&quot;) para poder calcular la recuperación.
                    </p>
                  ) : (
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="font-body text-[0.66rem] uppercase text-slate-500">Ingreso mensual</p>
                        <p className="mt-1 font-display text-[1.05rem] font-bold text-slate-900">{fmtMXN(recuperaIngresoMensual)}</p>
                      </div>
                      <div>
                        <p className="font-body text-[0.66rem] uppercase text-slate-500">Meses para recuperar</p>
                        <p className="mt-1 font-display text-[1.05rem] font-bold text-allitron-blue">
                          {recuperaMeses !== null ? recuperaMeses.toFixed(1) : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="font-body text-[0.66rem] uppercase text-slate-500">Años para recuperar</p>
                        <p className="mt-1 font-display text-[1.05rem] font-bold text-slate-900">
                          {recuperaAnos !== null ? recuperaAnos.toFixed(1) : "—"}
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="mt-4 font-body text-[0.68rem] leading-relaxed text-slate-400">
                    Cálculo: (invertido) ÷ (precio por cliente × clientes simulados). El precio y la meta de clientes los defines tú
                    por producto; el número de clientes de la simulación es libre, solo para explorar escenarios.
                  </p>
                </div>
              </>
            )}

            {/* ── Proyección de gasto futuro (horizonte) ── */}
            <div className={card}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="font-body text-[0.82rem] font-bold text-slate-800">Proyección de gasto futuro</p>
                <div className="flex gap-1.5">
                  {HORIZONTES.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHorizonte(h)}
                      className={`rounded-lg px-3 py-1.5 font-body text-[0.75rem] font-bold ${
                        horizonte === h ? "bg-allitron-blue text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {h}m
                    </button>
                  ))}
                </div>
              </div>
              {proyecciones.length === 0 ? (
                <p className="font-body text-[0.8rem] text-slate-500">
                  Sin proyección definida. Ajusta el &quot;gasto recurrente mensual&quot; de un proyecto desde Catálogo.
                </p>
              ) : (
                <>
                  <div className="divide-y divide-slate-100">
                    {proyecciones.map((r) => (
                      <div key={r.proyecto.id} className="flex items-center justify-between py-2">
                        <span className="font-body text-[0.8rem] text-slate-700">{r.proyecto.nombre}</span>
                        <span className="font-body text-[0.85rem] font-bold text-slate-900">{fmtMXN(r.total)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 font-body text-[0.78rem] font-bold text-slate-700">
                    Total a {horizonte} meses: <span className="text-allitron-blue">{fmtMXN(proyeccionTotal)}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════ SERVICIOS ═══════════════ */}
        {tab === "servicios" && (
          <section className={card}>
            <div className="mb-1 flex items-center justify-between">
              <p className="font-body text-[0.82rem] font-bold text-slate-800">Servicios activos</p>
              {isAdmin && (
                <button onClick={() => setServiciosOpen(true)} className={btnGhost}>
                  <Plus size={14} /> Gestionar
                </button>
              )}
            </div>
            <p className="mb-3 font-body text-[0.7rem] text-slate-400">
              Esto es lo que vendes al mercado (precio, cuántos clientes lo tienen activo) — distinto del catálogo de Proyectos,
              que es dónde registras lo que gastas/inviertes.
            </p>
            {servicios.length === 0 ? (
              <p className="font-body text-[0.8rem] text-slate-500">Sin servicios cargados todavía.</p>
            ) : (
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
            )}
          </section>
        )}

        {/* ═══════════════ ACTIVOS DE SOCIOS — separado por completo ═══════════════ */}
        {tab === "socios" && (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Archive size={16} className="text-slate-500" />
              <h2 className="font-display text-[0.9rem] font-bold text-slate-700">Independiente del gasto de productos Allitron</h2>
            </div>
            <p className="mb-4 font-body text-[0.75rem] leading-relaxed text-slate-500">
              Inversión física de cada socio (p. ej. el edificio/hub de Alejandro). No se suma a los totales de productos. El
              acuerdo entre ambas inversiones queda pendiente entre Lups y Alejandro.
            </p>
            <div className="space-y-3">
              {catalogoActivosSocios.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="font-body text-[0.78rem] font-bold text-slate-700">{p.nombre}</p>
                    <p className="font-body text-[0.68rem] text-slate-400">Inversión de: {p.propietario_inversion}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-display text-[1.1rem] font-bold text-slate-900">{fmtMXN(summaryActivos.porActivo[p.id] || 0)}</p>
                    {isAdmin && (
                      <button onClick={() => openAddMov(p.id)} className={btnGhost}>
                        <Plus size={14} /> Agregar
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {catalogoActivosSocios.length === 0 && (
                <p className="font-body text-[0.8rem] text-slate-500">
                  Sin activos de socios en el catálogo todavía. Agrega uno desde &quot;Catálogo&quot; (tipo: activo de socio).
                </p>
              )}
            </div>
            {catalogoActivosSocios.length > 0 && (
              <p className="mt-4 font-body text-[0.78rem] font-bold text-slate-700">
                Total activos de socios: <span className="text-slate-900">{fmtMXN(summaryActivos.total)}</span>
              </p>
            )}
          </section>
        )}

        {/* ═══════════════ ACTIVIDAD (auditoría, solo admin) ═══════════════ */}
        {tab === "actividad" && isAdmin && (
          <section className={card}>
            <p className="mb-1 font-body text-[0.82rem] font-bold text-slate-800">Registro de actividad</p>
            <p className="mb-3 font-body text-[0.7rem] text-slate-400">
              Quién agregó, editó o eliminó cada cosa — últimos 200 movimientos del registro.
            </p>
            {auditoria.length === 0 ? (
              <p className="font-body text-[0.8rem] text-slate-500">Sin actividad registrada todavía.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse font-body text-[0.78rem]">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[0.66rem] uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-3">Cuándo</th>
                      <th className="py-2 pr-3">Quién</th>
                      <th className="py-2 pr-3">Acción</th>
                      <th className="py-2 pr-3">En</th>
                      <th className="py-2 pr-3">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditoria.map((a) => (
                      <tr key={a.id} className="border-b border-slate-100">
                        <td className="py-2 pr-3 whitespace-nowrap text-slate-500">
                          {new Date(a.momento).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
                        </td>
                        <td className="py-2 pr-3 font-semibold text-slate-700">{a.persona}</td>
                        <td className="py-2 pr-3 capitalize">{a.accion.replace("_", " ")}</td>
                        <td className="py-2 pr-3 capitalize">{a.entidad}</td>
                        <td className="py-2 pr-3 max-w-[280px] text-slate-500">{a.detalle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <p className="mt-8 text-center font-body text-[0.68rem] leading-relaxed text-slate-400">
          Montos en USD convertidos a MXN con el tipo de cambio configurado (no histórico mes a mes). Sistema interno de
          Allitron, no enlazado desde el sitio público.
        </p>
      </div>

      {/* ── Modal agregar/editar movimiento ── */}
      {movModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-6" onClick={(e) => e.target === e.currentTarget && setMovModalOpen(false)}>
          <div className="w-full max-w-[560px] rounded-t-[24px] bg-white p-6 shadow-xl sm:rounded-[24px]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] font-bold text-slate-900">
                {movForm.id
                  ? "Editar movimiento"
                  : movModalLocked
                  ? `Agregar inversión — ${proyectosById[movForm.proyecto_id]?.nombre || ""}`
                  : "Agregar movimiento"}
              </h3>
              <button onClick={() => setMovModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmitMov} className="grid grid-cols-2 gap-3">
              {movModalLocked ? (
                <p className={`col-span-2 ${labelCls}`}>
                  Proyecto / activo
                  <span className="mt-1 block rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 font-body text-[0.85rem] font-bold text-slate-700">
                    {proyectosById[movForm.proyecto_id]?.nombre}
                  </span>
                </p>
              ) : (
                <label className={`col-span-2 ${labelCls}`}>
                  Proyecto
                  <select value={movForm.proyecto_id} onChange={(e) => setMovForm({ ...movForm, proyecto_id: e.target.value })} className={inputCls}>
                    {proyectos.map((p) => <option key={p.id} value={p.id}>{p.nombre}{p.tipo === "activo_socio" ? " (activo de socio)" : ""}</option>)}
                  </select>
                </label>
              )}
              <label className={`col-span-2 ${labelCls}`}>
                Concepto
                <input required value={movForm.concepto} onChange={(e) => setMovForm({ ...movForm, concepto: e.target.value })} placeholder={movModalLocked ? "Ej. Renta de septiembre, pintura, remodelación" : "Ej. Pago mensual programador Colombia"} className={inputCls} />
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
            <p className="mb-4 font-body text-[0.72rem] text-slate-400">
              Cada entrada aquí es un lugar donde registrar gasto/inversión (un producto, un evento, o un activo de socio como el
              edificio). No es tu oferta comercial — eso va en &quot;Servicios&quot;.
            </p>

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
              <label className={labelCls}>
                Gasto recurrente mensual (proyección, MXN)
                <input type="number" step="0.01" min="0" value={proyForm.recurrente_mensual_mxn} onChange={(e) => setProyForm({ ...proyForm, recurrente_mensual_mxn: e.target.value })} className={inputCls} />
              </label>
              <label className={labelCls}>
                Precio por cliente/mes (recuperación, MXN)
                <input type="number" step="0.01" min="0" value={proyForm.precio_recuperacion_mensual} onChange={(e) => setProyForm({ ...proyForm, precio_recuperacion_mensual: e.target.value })} className={inputCls} />
              </label>
              <label className={`col-span-2 ${labelCls}`}>
                Meta de clientes (para el cálculo de recuperación por defecto)
                <input type="number" min="0" value={proyForm.meta_clientes_recuperacion} onChange={(e) => setProyForm({ ...proyForm, meta_clientes_recuperacion: e.target.value })} className={inputCls} />
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

      {/* ── Modal ajuste rápido de recuperación ── */}
      {recuperaEditOpen && isAdmin && recuperaProy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6" onClick={(e) => e.target === e.currentTarget && setRecuperaEditOpen(false)}>
          <div className="w-full max-w-[360px] rounded-[24px] bg-white p-6 shadow-xl">
            <h3 className="mb-3 font-display text-[1rem] font-bold text-slate-900">{recuperaProy.nombre} — supuestos de recuperación</h3>
            <label className={labelCls}>
              Precio por cliente al mes (MXN)
              <input type="number" step="0.01" min="0" value={recuperaDraft.precio} onChange={(e) => setRecuperaDraft({ ...recuperaDraft, precio: e.target.value })} className={inputCls} />
            </label>
            <label className={`mt-3 block ${labelCls}`}>
              Meta de clientes por defecto
              <input type="number" min="0" value={recuperaDraft.meta} onChange={(e) => setRecuperaDraft({ ...recuperaDraft, meta: e.target.value })} className={inputCls} />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setRecuperaEditOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 font-body text-[0.78rem] text-slate-700 hover:bg-slate-50">Cancelar</button>
              <button onClick={handleSaveRecupera} disabled={busy} className="rounded-lg bg-allitron-blue px-4 py-2 font-display text-[0.78rem] font-bold text-white">Guardar</button>
            </div>
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
