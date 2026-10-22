"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarCheck, Check, Clock, Loader2, MapPin, Video } from "lucide-react";
import { AlliEscena } from "@/components/propuestas/AlliEscena";
import { waLink } from "@/config/contact";
import { ZONA_OFICINA } from "@/lib/reuniones/config";
import { etiquetaZona, formatoFecha, formatoHora, partesEnZona, ymdEnZona } from "@/lib/reuniones/tz";
import BotonesCalendario from "./BotonesCalendario";
import ReunionNav, { type PasoNav } from "./ReunionNav";
import { eventoDesdeGestion, type DatosGestion } from "./tipos";
import { BTN_GHOST, BTN_PRIMARY, CARD, HINT, INPUT, LABEL, zonaDelNavegador } from "./ui";

// ── Flujo público de reservas (y de reprogramación con ?reprogramar=TOKEN) ───
// Un solo camino: tema → modalidad (si aplica) → horario → datos → listo.
// Cada elección lleva sola al siguiente paso; la barra de arriba muestra dónde vas.

interface ProductoPublico {
  slug: string;
  nombre: string;
  descripcion: string | null;
  duracion_min: number;
  costo_mxn: number | null;
  presencial: boolean;
  video: boolean;
}
type Modalidad = "presencial" | "video";

interface Props {
  productoInicial?: string;
  reprogramarToken?: string;
}

const MXN = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

/** Lleva suavemente al siguiente paso (sin animación si la persona prefiere menos movimiento). */
function irA(id: string) {
  if (typeof window === "undefined") return;
  window.setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
  }, 80);
}

function Paso({ id, n, titulo, ayuda, children }: { id: string; n: number; titulo: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${CARD} scroll-mt-24`} aria-labelledby={`${id}-t`}>
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-allitron-orange font-display text-[1.1rem] font-bold text-white shadow-[0_6px_16px_rgba(242,135,76,0.35)]">{n}</span>
        <div>
          <h2 id={`${id}-t`} className="font-display text-[1.45rem] font-bold leading-tight tracking-tight text-[#101820] sm:text-[1.75rem]">{titulo}</h2>
          {ayuda && <p className={`${HINT} mt-1`}>{ayuda}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Cargando({ texto }: { texto: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-secondary" role="status">
      <Loader2 className="h-6 w-6 animate-spin" /> <span className="font-body text-[1rem]">{texto}</span>
    </div>
  );
}

function Mensaje({ texto, wa }: { texto: string; wa?: { msg: string; origen: string } }) {
  return (
    <div className={`${CARD} text-center`}>
      <p className="mx-auto max-w-[520px] font-body text-[1.05rem] leading-[1.7] text-[#101820]">{texto}</p>
      <a className={`${BTN_GHOST} mt-6`} href={waLink("REUNION", wa?.msg ?? "Hola, quiero agendar una reunión con Allitron.", wa?.origen ?? "reuniones")}>
        Escribir por WhatsApp
      </a>
    </div>
  );
}

export default function ReservaFlow({ productoInicial, reprogramarToken }: Props) {
  const router = useRouter();
  const reprogramando = Boolean(reprogramarToken);

  const [productos, setProductos] = useState<ProductoPublico[] | null>(null);
  const [direccion, setDireccion] = useState("");
  const [errorCatalogo, setErrorCatalogo] = useState<string | null>(null);

  const [slug, setSlug] = useState<string | null>(productoInicial ?? null);
  const [modalidadElegida, setModalidad] = useState<Modalidad | null>(null);
  const [gestion, setGestion] = useState<DatosGestion | null>(null);

  const [cargados, setCargados] = useState<{ clave: string; slots: string[] } | null>(null);
  const [version, setVersion] = useState(0);
  const [dia, setDia] = useState<string | null>(null);
  const [inicio, setInicio] = useState<string | null>(null);

  const [f, setF] = useState({ nombre: "", email: "", whatsapp: "", empresa: "", notas: "", novedades: false, hp: "" });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<{ token: string; correoEnviado: boolean } | null>(null);

  const zonaCliente = useMemo(() => zonaDelNavegador(ZONA_OFICINA), []);

  const producto = productos?.find((p) => p.slug === slug) ?? null;
  // Si el producto solo admite una modalidad, se elige sola (sin efecto ni estado extra).
  const unica: Modalidad | null = producto && producto.presencial !== producto.video ? (producto.video ? "video" : "presencial") : null;
  const modalidad = modalidadElegida ?? unica;
  const tzVista = modalidad === "presencial" ? ZONA_OFICINA : zonaCliente;

  // Catálogo (solo al reservar; al reprogramar el producto ya está fijado)
  useEffect(() => {
    if (reprogramando) return;
    let vivo = true;
    fetch("/api/reuniones/productos")
      .then((r) => r.json())
      .then((j) => {
        if (!vivo) return;
        if (!j.ok) return setErrorCatalogo("El sistema de reuniones aún no está disponible. Escríbenos por WhatsApp y coordinamos tu reunión.");
        setProductos(j.productos);
        setDireccion(j.oficina?.direccion ?? "");
      })
      .catch(() => vivo && setErrorCatalogo("No pudimos cargar las opciones. Revisa tu conexión e intenta de nuevo."));
    return () => {
      vivo = false;
    };
  }, [reprogramando]);

  // Reprogramar: cargar la reunión existente
  useEffect(() => {
    if (!reprogramarToken) return;
    let vivo = true;
    fetch(`/api/reuniones/gestionar/${reprogramarToken}`)
      .then((r) => r.json())
      .then((j) => {
        if (!vivo) return;
        if (!j.ok || j.reunion.estado !== "confirmada") return setErrorCatalogo("No encontramos una reunión activa con este enlace.");
        if (!j.reunion.puede_cambiar) return setErrorCatalogo(`Los cambios en línea se permiten hasta ${j.reunion.limite_horas} horas antes. Escríbenos por WhatsApp y lo resolvemos.`);
        setGestion(j.reunion);
        setModalidad(j.reunion.modalidad);
      })
      .catch(() => vivo && setErrorCatalogo("No pudimos cargar tu reunión. Intenta de nuevo."));
    return () => {
      vivo = false;
    };
  }, [reprogramarToken]);

  // Horarios: se piden al elegir tema/modalidad (o con ?reprogramar). Solo se
  // actualiza estado cuando llega la respuesta; "cargando" se deriva de la clave.
  const clave = modalidad && (reprogramarToken ?? slug) ? `${reprogramarToken ?? slug}|${modalidad}` : null;
  useEffect(() => {
    if (!clave || !modalidad) return;
    let vivo = true;
    const qs = reprogramarToken
      ? `reprogramar=${encodeURIComponent(reprogramarToken)}`
      : `producto=${encodeURIComponent(slug as string)}&modalidad=${modalidad}`;
    fetch(`/api/reuniones/disponibilidad?${qs}`)
      .then((r) => r.json())
      .then((j) => vivo && setCargados({ clave, slots: j.ok ? j.slots : [] }))
      .catch(() => vivo && setCargados({ clave, slots: [] }));
    return () => {
      vivo = false;
    };
  }, [clave, modalidad, reprogramarToken, slug, version]);

  const slots = cargados && cargados.clave === clave ? cargados.slots : null;

  // Slots agrupados por día en la zona de vista
  const dias = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of slots ?? []) {
      const k = ymdEnZona(new Date(s), tzVista);
      m.set(k, [...(m.get(k) ?? []), s]);
    }
    return [...m.entries()];
  }, [slots, tzVista]);

  // Si el día o la hora elegidos ya no existen (recarga de horarios), se descartan solos.
  const diaActivo = dia && dias.some(([k]) => k === dia) ? dia : null;
  const inicioValido = inicio && slots?.includes(inicio) ? inicio : null;
  const grupos = useMemo(() => {
    const horas = dias.find(([k]) => k === diaActivo)?.[1] ?? [];
    const g = { Mañana: [] as string[], Tarde: [] as string[], Noche: [] as string[] };
    for (const s of horas) {
      const h = partesEnZona(new Date(s), tzVista).hour;
      (h < 12 ? g.Mañana : h < 18 ? g.Tarde : g.Noche).push(s);
    }
    return Object.entries(g).filter(([, v]) => v.length > 0);
  }, [dias, diaActivo, tzVista]);

  const nombreProducto = reprogramando ? gestion?.producto : producto?.nombre;
  const hayModalidades = Boolean(producto && producto.presencial && producto.video);

  // ── Pasos visibles y paso actual (para la barra de arriba) ───────────────
  const conTema = !productoInicial || (productos !== null && !producto);
  const pasos: PasoNav[] = reprogramando
    ? [{ id: "horario", label: "Horario" }, { id: "confirmar", label: "Confirmar" }]
    : [
        ...(conTema ? [{ id: "tema", label: "Tema" }] : []),
        ...(hayModalidades ? [{ id: "modalidad", label: "Modalidad" }] : []),
        { id: "horario", label: "Horario" },
        { id: "datos", label: "Tus datos" },
      ];
  const idActual = reprogramando
    ? inicioValido ? "confirmar" : "horario"
    : !producto ? "tema"
    : hayModalidades && !modalidad ? "modalidad"
    : !inicioValido ? "horario"
    : "datos";
  const actual = Math.max(0, pasos.findIndex((p) => p.id === idActual));
  const numPaso = (id: string) => pasos.findIndex((p) => p.id === id) + 1;

  async function confirmar(e: React.FormEvent) {
    e.preventDefault();
    if (!inicioValido || !modalidad) return;
    setEnviando(true);
    setError(null);
    try {
      if (reprogramando) {
        const res = await fetch(`/api/reuniones/gestionar/${reprogramarToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accion: "reprogramar", inicio: inicioValido }),
        });
        const j = await res.json();
        if (!j.ok) {
          setError(j.mensaje ?? "No pudimos reprogramar.");
          if (res.status === 409) setVersion((v) => v + 1);
          return;
        }
        router.push(`/reuniones/${reprogramarToken}?ok=reprogramada`);
        return;
      }
      const res = await fetch("/api/reuniones/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: slug,
          inicio: inicioValido,
          modalidad,
          nombre: f.nombre,
          email: f.email,
          whatsapp: f.whatsapp,
          empresa: f.empresa,
          notas: f.notas,
          zona: zonaCliente,
          acepta_comunicaciones: f.novedades,
          sitio_web: f.hp,
        }),
      });
      const j = await res.json();
      if (!j.ok) {
        setError(j.mensaje ?? "No pudimos completar tu reserva.");
        if (res.status === 409) {
          setInicio(null);
          setVersion((v) => v + 1);
          irA("horario");
        }
        return;
      }
      setExito({ token: j.token, correoEnviado: j.correoEnviado !== false });
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    } catch {
      setError("Sin conexión. Revisa tu internet e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  // ── Pantalla de éxito ────────────────────────────────────────────────────
  if (exito) return <Exito token={exito.token} correoEnviado={exito.correoEnviado} email={f.email} />;

  const mensajeAlli = reprogramando
    ? "Sin problema, elige el nuevo día y hora. Te llega la confirmación actualizada por correo."
    : !producto
      ? "Hola, soy Alli. Dime de qué quieres platicar y te busco el mejor horario. La confirmación te llega por correo."
      : !inicioValido
        ? "Elige el día y la hora que mejor te acomoden. Yo me encargo del resto."
        : "Último paso: tus datos para enviarte la confirmación y el enlace para guardarla en tu calendario.";

  // ── Estados de error global ──────────────────────────────────────────────
  let cuerpo: React.ReactNode;
  if (errorCatalogo) {
    cuerpo = <Mensaje texto={errorCatalogo} />;
  } else if (!reprogramando && productos === null) {
    cuerpo = <Cargando texto="Cargando opciones…" />;
  } else if (!reprogramando && productos && productos.length === 0) {
    cuerpo = <Mensaje texto="Estamos abriendo la agenda en línea. Mientras tanto, escríbenos y coordinamos tu reunión." />;
  } else {
    const opcionesModalidad: { id: Modalidad; titulo: string; texto: string; icono: React.ReactNode }[] = [];
    if (producto?.video) opcionesModalidad.push({ id: "video", titulo: "Videollamada", texto: "Desde donde estés. Te llega el enlace por correo.", icono: <Video className="h-7 w-7" strokeWidth={2} /> });
    if (producto?.presencial) opcionesModalidad.push({ id: "presencial", titulo: "Presencial en Tepic", texto: direccion || "En nuestra oficina, en Tepic.", icono: <MapPin className="h-7 w-7" strokeWidth={2} /> });

    const duracion = reprogramando && gestion ? Math.round((Date.parse(gestion.fin) - Date.parse(gestion.inicio)) / 60000) : producto?.duracion_min;
    const formularioListo = reprogramando || (f.nombre.trim().length >= 2 && f.email.trim().length >= 5);

    cuerpo = (
      <form onSubmit={confirmar} className="flex flex-col gap-6">
        {/* Resumen vivo: siempre sabes qué estás agendando */}
        {nombreProducto && (
          <div className="neu flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[22px] px-6 py-4 font-body text-[1rem] text-[#101820]">
            <span className="font-display text-[1.15rem] font-bold">{nombreProducto}</span>
            {duracion ? <span className="flex items-center gap-2 text-secondary"><Clock className="h-4 w-4" /> {duracion} min</span> : null}
            {modalidad && (
              <span className="flex items-center gap-2 text-secondary">
                {modalidad === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {modalidad === "video" ? "Videollamada" : "Presencial en Tepic"}
              </span>
            )}
            {producto?.costo_mxn != null && <span className="text-secondary">{producto.costo_mxn === 0 ? "Sin costo" : MXN.format(producto.costo_mxn)}</span>}
            {inicioValido && (
              <span className="flex items-center gap-2 font-semibold text-allitron-navy">
                <CalendarCheck className="h-4 w-4" /> {formatoFecha(new Date(inicioValido), tzVista)} · {formatoHora(new Date(inicioValido), tzVista)}
              </span>
            )}
            {!reprogramando && slug && !productoInicial && (
              <button type="button" onClick={() => { setSlug(null); setModalidad(null); setInicio(null); setDia(null); irA("tema"); }} className="ml-auto font-body text-[0.9rem] font-semibold text-allitron-navy underline underline-offset-4 hover:text-allitron-blue">
                Cambiar tema
              </button>
            )}
          </div>
        )}

        {/* 1 · Tema */}
        {!reprogramando && !producto && productos && (
          <Paso id="tema" n={numPaso("tema") || 1} titulo="¿Sobre qué quieres platicar?" ayuda="Toca el tema y seguimos con el horario.">
            {slug && <p className={`${HINT} mb-4`}>Esa reunión no está disponible por ahora. Elige otra opción:</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              {productos.map((p) => (
                <button key={p.slug} type="button" onClick={() => { setSlug(p.slug); setModalidad(null); setInicio(null); setDia(null); irA(p.presencial && p.video ? "modalidad" : "horario"); }} className="neu neu-hover group flex min-h-[96px] flex-col items-start rounded-[22px] p-5 text-left transition-transform active:scale-[0.98] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange">
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="font-display text-[1.2rem] font-bold leading-tight text-[#101820]">{p.nombre}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-allitron-blue/10 text-allitron-blue transition-colors group-hover:bg-allitron-blue group-hover:text-white"><ArrowRight size={18} /></span>
                  </span>
                  {p.descripcion && <span className={`${HINT} mt-2 line-clamp-2`}>{p.descripcion}</span>}
                  <span className="mt-3 font-body text-[0.9rem] font-semibold text-allitron-navy">{p.duracion_min} min{p.costo_mxn != null ? ` · ${p.costo_mxn === 0 ? "Sin costo" : MXN.format(p.costo_mxn)}` : ""}</span>
                </button>
              ))}
            </div>
          </Paso>
        )}

        {/* 2 · Modalidad (solo si hay las dos) */}
        {!reprogramando && producto && opcionesModalidad.length > 1 && (
          <Paso id="modalidad" n={numPaso("modalidad") || 1} titulo="¿Cómo prefieres reunirte?">
            <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Modalidad">
              {opcionesModalidad.map((o) => {
                const sel = modalidad === o.id;
                return (
                  <button key={o.id} type="button" role="radio" aria-checked={sel} onClick={() => { setModalidad(o.id); setInicio(null); setDia(null); irA("horario"); }} className={`flex min-h-[110px] items-start gap-4 rounded-[22px] border-2 p-5 text-left transition-all active:scale-[0.98] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange ${sel ? "border-allitron-blue bg-allitron-blue/[0.07]" : "neu border-transparent"}`}>
                    <span className={sel ? "text-allitron-blue" : "text-allitron-navy"}>{o.icono}</span>
                    <span>
                      <span className="block font-display text-[1.2rem] font-bold text-[#101820]">{o.titulo}</span>
                      <span className={`${HINT} mt-1 block`}>{o.texto}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Paso>
        )}

        {/* 3 · Día y hora */}
        {modalidad && (reprogramando ? gestion : producto) && (
          <Paso id="horario" n={numPaso("horario") || 1} titulo="Elige día y hora" ayuda={`Horarios en ${etiquetaZona(tzVista)}${modalidad === "video" && tzVista !== ZONA_OFICINA ? " (según tu dispositivo)" : ""}.`}>
            {slots === null ? (
              <Cargando texto="Buscando horarios…" />
            ) : dias.length === 0 ? (
              <div className="py-2">
                <p className="font-body text-[1.05rem] leading-[1.7] text-[#101820]">Por ahora no hay horarios disponibles en los próximos días.</p>
                <a className={`${BTN_GHOST} mt-5`} href={waLink("REUNION", `Hola, quiero agendar una reunión de ${nombreProducto ?? "Allitron"}.`, "reuniones")}>Coordinar por WhatsApp</a>
              </div>
            ) : (
              <>
                <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-4 pt-1" role="group" aria-label="Días disponibles">
                  {dias.map(([k, hs]) => {
                    const d = new Date(hs[0]);
                    const activo = diaActivo === k;
                    const sem = new Intl.DateTimeFormat("es-MX", { timeZone: tzVista, weekday: "short" }).format(d).replace(".", "");
                    const mes = new Intl.DateTimeFormat("es-MX", { timeZone: tzVista, month: "short" }).format(d).replace(".", "");
                    return (
                      <button key={k} type="button" aria-pressed={activo} onClick={() => { setDia(k); setInicio(null); irA("horas"); }} className={`flex min-h-[96px] min-w-[76px] shrink-0 flex-col items-center justify-center rounded-[20px] border-2 px-3 py-3 transition-all active:scale-[0.97] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange ${activo ? "border-allitron-blue bg-allitron-blue text-white shadow-[0_10px_22px_rgba(9,175,242,0.32)]" : "border-[#101820]/10 bg-white text-[#101820] hover:border-allitron-blue"}`}>
                        <span className="font-body text-[0.85rem] font-bold uppercase tracking-[0.1em] opacity-80">{sem}</span>
                        <span className="font-display text-[1.9rem] font-bold leading-none">{partesEnZona(d, tzVista).day}</span>
                        <span className="font-body text-[0.8rem] font-bold uppercase tracking-[0.08em] opacity-80">{mes}</span>
                      </button>
                    );
                  })}
                </div>
                <div id="horas" className="scroll-mt-24">
                  {diaActivo ? (
                    <div className="mt-2 flex flex-col gap-6" aria-live="polite">
                      {grupos.map(([nombre, hs]) => (
                        <div key={nombre}>
                          <p className={LABEL}>{nombre}</p>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {hs.map((s) => {
                              const sel = inicioValido === s;
                              return (
                                <button key={s} type="button" aria-pressed={sel} onClick={() => { setInicio(s); irA(reprogramando ? "confirmar" : "datos"); }} className={`min-h-[60px] rounded-[16px] border-2 px-2 py-3 font-display text-[1.1rem] font-bold transition-all active:scale-[0.97] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-allitron-orange ${sel ? "border-allitron-orange bg-allitron-orange text-white shadow-[0_8px_18px_rgba(242,135,76,0.35)]" : "border-[#101820]/10 bg-white text-[#101820] hover:border-allitron-blue"}`}>
                                  {sel && <Check className="mr-1.5 inline h-4 w-4" strokeWidth={3} />}
                                  {formatoHora(new Date(s), tzVista)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`${HINT} mt-2`}>👆 Toca un día para ver las horas disponibles.</p>
                  )}
                </div>
              </>
            )}
          </Paso>
        )}

        {/* 4 · Datos */}
        {inicioValido && !reprogramando && (
          <Paso id="datos" n={numPaso("datos") || 1} titulo="¿A quién le mandamos la confirmación?" ayuda="Solo lo necesario. Usamos tus datos únicamente para esta reunión.">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor="r-nombre">Tu nombre *</label>
                <input id="r-nombre" className={INPUT} required minLength={2} maxLength={100} autoComplete="name" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />
              </div>
              <div>
                <label className={LABEL} htmlFor="r-email">Tu correo *</label>
                <input id="r-email" type="email" className={INPUT} required maxLength={254} autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
              </div>
              <div>
                <label className={LABEL} htmlFor="r-wa">WhatsApp (opcional)</label>
                <input id="r-wa" type="tel" inputMode="tel" className={INPUT} maxLength={30} autoComplete="tel" placeholder="10 dígitos" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} />
              </div>
              <div>
                <label className={LABEL} htmlFor="r-empresa">Empresa o negocio (opcional)</label>
                <input id="r-empresa" className={INPUT} maxLength={120} autoComplete="organization" value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor="r-notas">¿Algo que debamos saber antes? (opcional)</label>
                <textarea id="r-notas" rows={3} maxLength={500} className={`${INPUT} resize-none py-3`} value={f.notas} onChange={(e) => setF({ ...f, notas: e.target.value })} />
              </div>
            </div>
            {/* Honeypot: invisible para personas */}
            <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" value={f.hp} onChange={(e) => setF({ ...f, hp: e.target.value })} />
            <label className="mt-6 flex cursor-pointer items-start gap-3 font-body text-[0.95rem] leading-[1.6] text-secondary">
              <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#09AFF2]" checked={f.novedades} onChange={(e) => setF({ ...f, novedades: e.target.checked })} />
              <span>Quiero recibir novedades y contenido de Allitron (opcional). Los correos de esta reunión se envían siempre.</span>
            </label>
          </Paso>
        )}

        {/* Confirmar */}
        {inicioValido && (
          <div id="confirmar" className="scroll-mt-24 text-center sm:text-left">
            {error && <p role="alert" className="mb-5 rounded-[16px] border-2 border-allitron-orange/50 bg-allitron-orange/10 px-5 py-4 text-left font-body text-[1rem] text-[#101820]">{error}</p>}
            <button type="submit" className={BTN_PRIMARY} disabled={enviando || !formularioListo}>
              {enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" strokeWidth={3} />}
              {reprogramando ? "Confirmar nuevo horario" : "Confirmar mi reunión"}
            </button>
            {!reprogramando && (
              <p className={`${HINT} mt-4`}>
                Al confirmar aceptas el <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" className="font-semibold text-allitron-navy underline underline-offset-4">Aviso de Privacidad</a>. Recibirás la confirmación por correo de parte de Aurora IA, asistente de Allitron.
              </p>
            )}
          </div>
        )}
        {!inicioValido && error && <p role="alert" className="rounded-[16px] border-2 border-allitron-orange/50 bg-allitron-orange/10 px-5 py-4 font-body text-[1rem] text-[#101820]">{error}</p>}
      </form>
    );
  }

  return (
    <>
      <ReunionNav pasos={pasos} actual={errorCatalogo ? 0 : actual} />
      <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-8 sm:px-10">
        <header className="mb-6">
          <span className="mb-3 block font-display text-[0.8rem] font-bold uppercase tracking-[0.3em] text-allitron-blue">{reprogramando ? "Reprogramar reunión" : "Agenda tu reunión"}</span>
          <h1 className="max-w-[860px] font-display text-[2.2rem] font-black leading-[1.08] tracking-tight text-[#101820] sm:text-[3rem]">
            {reprogramando ? "Elige tu nuevo horario" : "Agenda en menos de un minuto"}
          </h1>
        </header>
        <div className="mb-8">
          <AlliEscena escena="agenda" mensaje={mensajeAlli} prioridad compacta />
        </div>
        <div className="mx-auto max-w-[860px]">{cuerpo}</div>
      </div>
    </>
  );
}

// ── Éxito: Alli, resumen y botones de calendario ─────────────────────────────
function Exito({ token, correoEnviado, email }: { token: string; correoEnviado: boolean; email: string }) {
  const [d, setD] = useState<DatosGestion | null>(null);
  useEffect(() => {
    let vivo = true;
    fetch(`/api/reuniones/gestionar/${token}`)
      .then((r) => r.json())
      .then((j) => vivo && j.ok && setD(j.reunion))
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [token]);

  const tz = d ? (d.modalidad === "presencial" ? ZONA_OFICINA : d.zona_cliente) : ZONA_OFICINA;
  const dato = "font-body text-[1.1rem] font-semibold text-[#101820]";
  return (
    <>
      <ReunionNav pasos={[{ id: "ok", label: "Listo" }]} actual={1} />
      <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-8 sm:px-10">
        <header className="mb-6">
          <span className="mb-3 flex items-center gap-2 font-display text-[0.8rem] font-bold uppercase tracking-[0.3em] text-allitron-blue"><Check className="h-4 w-4" strokeWidth={3} /> Confirmada</span>
          <h1 className="font-display text-[2.2rem] font-black leading-[1.08] tracking-tight text-[#101820] sm:text-[3rem]">Tu reunión quedó agendada</h1>
        </header>
        <div className="mb-8">
          <AlliEscena escena="confirmada" mensaje="¡Listo! Ya quedó. Te mando todo por correo y aquí abajo puedes guardarla en tu calendario." prioridad compacta />
        </div>
        <div className="mx-auto max-w-[860px]" role="status" aria-live="polite">
          <div className={CARD}>
            {d ? (
              <dl className="grid gap-6 sm:grid-cols-2">
                <div><dt className={LABEL}>Tema</dt><dd className={dato}>{d.producto}</dd></div>
                <div><dt className={LABEL}>Te atiende</dt><dd className={dato}>{d.anfitrion}</dd></div>
                <div><dt className={LABEL}>Fecha</dt><dd className={dato}>{formatoFecha(new Date(d.inicio), tz)}</dd></div>
                <div><dt className={LABEL}>Hora</dt><dd className={dato}>{formatoHora(new Date(d.inicio), tz)} <span className="font-normal text-secondary">({etiquetaZona(tz)})</span></dd></div>
                <div className="sm:col-span-2"><dt className={LABEL}>{d.modalidad === "presencial" ? "Lugar" : "Videollamada"}</dt><dd className={`${dato} break-words`}>{d.modalidad === "presencial" ? d.direccion : d.enlace_video ?? "Te enviaremos el enlace por correo."}</dd></div>
              </dl>
            ) : (
              <div className="flex items-center gap-3 text-secondary"><Loader2 className="h-5 w-5 animate-spin" /> Cargando tu reunión…</div>
            )}
            <p className={`${HINT} mt-6 border-t border-[#101820]/10 pt-6`}>
              {correoEnviado ? <>Te enviamos la confirmación a <strong className="text-[#101820]">{email}</strong>, con los datos y el archivo de calendario. Si no la ves, revisa spam o promociones.</> : <>Tu reunión está guardada, pero el correo de confirmación tardará un poco. Si no lo recibes pronto, escríbenos por WhatsApp.</>}
            </p>
          </div>
          {d && <div className={`${CARD} mt-6`}><BotonesCalendario evento={eventoDesdeGestion(d, token)} token={token} /></div>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className={BTN_GHOST} href={`/reuniones/${token}`}>Reprogramar o cancelar</Link>
            <Link className={BTN_GHOST} href="/">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </>
  );
}
