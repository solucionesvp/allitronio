"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { AlliEscena } from "@/components/propuestas/AlliEscena";
import { waLink } from "@/config/contact";
import { etiquetaZona, formatoFecha, formatoHora } from "@/lib/reuniones/tz";
import BotonesCalendario from "./BotonesCalendario";
import ReunionNav from "./ReunionNav";
import { eventoDesdeGestion, zonaDeVista, type DatosGestion } from "./tipos";
import { BTN_GHOST, BTN_PRIMARY, CARD, HINT, INPUT, LABEL } from "./ui";

function Marco({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReunionNav pasos={[]} actual={0} />
      <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-8 sm:px-10">{children}</div>
    </>
  );
}

// Gestión de SU reunión por enlace privado: ver, agregar al calendario,
// reprogramar o cancelar — sin llamadas ni mensajes de por medio.
export default function GestionReunion({ token }: { token: string }) {
  const params = useSearchParams();
  const aviso = params.get("ok") === "reprogramada" ? "Listo, tu reunión cambió de horario. Te enviamos la confirmación actualizada." : null;

  const [d, setD] = useState<DatosGestion | null | "no">(null);
  const [confirmando, setConfirmando] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    fetch(`/api/reuniones/gestionar/${token}`)
      .then((r) => r.json())
      .then((j) => vivo && setD(j.ok ? j.reunion : "no"))
      .catch(() => vivo && setD("no"));
    return () => {
      vivo = false;
    };
  }, [token]);

  async function cancelar() {
    setEnviando(true);
    setError(null);
    try {
      const j = await (
        await fetch(`/api/reuniones/gestionar/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accion: "cancelar", motivo }),
        })
      ).json();
      if (!j.ok) return setError(j.mensaje ?? "No pudimos cancelar. Intenta de nuevo.");
      setD((prev) => (prev && prev !== "no" ? { ...prev, estado: "cancelada", puede_cambiar: false } : prev));
      setConfirmando(false);
    } catch {
      setError("Sin conexión. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  if (d === null) {
    return <Marco><div className="flex items-center justify-center gap-3 py-24 text-secondary" role="status"><Loader2 className="h-6 w-6 animate-spin" /><span className="font-body text-[1rem]">Cargando tu reunión…</span></div></Marco>;
  }
  if (d === "no") {
    return (
      <Marco>
        <div className={`${CARD} mx-auto max-w-[620px] text-center`}>
          <h1 className="font-display text-[1.8rem] font-bold text-[#101820]">No encontramos esta reunión</h1>
          <p className={`${HINT} mt-3`}>Revisa que el enlace esté completo o agenda una nueva.</p>
          <Link className={`${BTN_PRIMARY} mt-8`} href="/reuniones">Agendar reunión</Link>
        </div>
      </Marco>
    );
  }

  const tz = zonaDeVista(d);
  const ini = new Date(d.inicio);
  const cancelada = d.estado === "cancelada";
  const dato = "font-body text-[1.1rem] font-semibold text-[#101820]";
  const etiquetaEstado = { confirmada: "Confirmada", cancelada: "Cancelada", realizada: "Realizada", no_asistio: "Sin asistencia" }[d.estado];
  const mensajeAlli = cancelada
    ? "Quedó cancelada. Cuando quieras retomarla, elige otro horario y listo."
    : d.estado !== "confirmada"
      ? "Esta reunión ya pasó. Gracias por tu tiempo."
      : "Aquí tienes tu reunión. Puedes guardarla en tu calendario, cambiarla de horario o cancelarla.";

  return (
    <Marco>
      <header className="mb-6">
        <span className={`mb-3 flex items-center gap-2 font-display text-[0.8rem] font-bold uppercase tracking-[0.3em] ${cancelada ? "text-allitron-orange" : "text-allitron-blue"}`}>
          {cancelada ? <X className="h-4 w-4" strokeWidth={3} /> : <Check className="h-4 w-4" strokeWidth={3} />} {etiquetaEstado}
        </span>
        <h1 className="font-display text-[2.2rem] font-black leading-[1.08] tracking-tight text-[#101820] sm:text-[3rem]">{d.producto}</h1>
      </header>
      <div className="mb-8">
        <AlliEscena escena={cancelada ? "calendario" : "confirmada"} mensaje={mensajeAlli} prioridad compacta />
      </div>

      <div className="mx-auto flex max-w-[860px] flex-col gap-6">
        {aviso && <p role="status" className="flex items-start gap-3 rounded-[18px] border-2 border-allitron-blue/40 bg-allitron-blue/[0.07] px-5 py-4 font-body text-[1rem] text-[#101820]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-allitron-blue" strokeWidth={3} />{aviso}</p>}

        <section className={CARD}>
          <dl className="grid gap-6 sm:grid-cols-2">
            <div><dt className={LABEL}>Fecha</dt><dd className={dato}>{formatoFecha(ini, tz)}</dd></div>
            <div><dt className={LABEL}>Hora</dt><dd className={dato}>{formatoHora(ini, tz)} <span className="font-normal text-secondary">({etiquetaZona(tz)})</span></dd></div>
            <div><dt className={LABEL}>Modalidad</dt><dd className={dato}>{d.modalidad === "presencial" ? "Presencial en Tepic" : "Videollamada"}</dd></div>
            <div><dt className={LABEL}>Te atiende</dt><dd className={dato}>{d.anfitrion}</dd></div>
            {d.estado === "confirmada" && (
              <div className="sm:col-span-2">
                <dt className={LABEL}>{d.modalidad === "presencial" ? "Lugar" : "Enlace de la videollamada"}</dt>
                <dd className={`${dato} break-words`}>
                  {d.modalidad === "presencial" ? d.direccion : d.enlace_video ? <a className="text-allitron-navy underline underline-offset-4" href={d.enlace_video}>{d.enlace_video}</a> : "Te lo compartiremos antes de la reunión."}
                </dd>
              </div>
            )}
          </dl>
          {d.estado === "confirmada" && d.modalidad === "video" && d.enlace_video && (
            <a className={`${BTN_PRIMARY} mt-8`} href={d.enlace_video}>Entrar a la videollamada</a>
          )}
        </section>

        {d.estado === "confirmada" && (
          <section className={CARD}>
            <BotonesCalendario evento={eventoDesdeGestion(d, token)} token={token} />
          </section>
        )}

        <section className={CARD}>
          {cancelada ? (
            <>
              <p className="font-body text-[1.05rem] leading-[1.7] text-[#101820]">Esta reunión está cancelada. Si quieres retomarla, elige un nuevo horario.</p>
              <Link className={`${BTN_PRIMARY} mt-6`} href={`/reuniones${d.producto_slug ? `?producto=${encodeURIComponent(d.producto_slug)}` : ""}`}>Agendar otro horario</Link>
            </>
          ) : d.estado !== "confirmada" ? (
            <p className={HINT}>Esta reunión ya pasó.</p>
          ) : d.puede_cambiar ? (
            <>
              <h2 className="font-display text-[1.45rem] font-bold text-[#101820]">¿Necesitas cambiar algo?</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link className={BTN_GHOST} href={`/reuniones?reprogramar=${encodeURIComponent(token)}`}>Reprogramar</Link>
                {!confirmando && <button type="button" className={BTN_GHOST} onClick={() => setConfirmando(true)}>Cancelar reunión</button>}
              </div>
              {confirmando && (
                <div className="mt-6 border-t border-[#101820]/10 pt-6">
                  <label className={LABEL} htmlFor="g-motivo">¿Quieres contarnos el motivo? (opcional)</label>
                  <textarea id="g-motivo" rows={2} maxLength={300} className={`${INPUT} resize-none py-3`} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                  {error && <p role="alert" className="mt-3 font-body text-[0.95rem] font-semibold text-allitron-orange">{error}</p>}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" className={`${BTN_PRIMARY} sm:min-w-0`} onClick={cancelar} disabled={enviando}>
                      {enviando && <Loader2 className="h-5 w-5 animate-spin" />} Sí, cancelar
                    </button>
                    <button type="button" className={BTN_GHOST} onClick={() => setConfirmando(false)} disabled={enviando}>Mantener reunión</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="font-body text-[1.05rem] leading-[1.7] text-[#101820]">Los cambios en línea se permiten hasta {d.limite_horas} horas antes de la reunión. Escríbenos por WhatsApp y lo resolvemos.</p>
              <a className={`${BTN_GHOST} mt-6`} href={waLink("REUNION", `Hola, necesito ajustar mi reunión de ${d.producto}.`, "gestion-reunion")}>Escribir por WhatsApp</a>
            </>
          )}
        </section>
        <p className={HINT}>Hora de la reunión mostrada en {etiquetaZona(tz)}.</p>
      </div>
    </Marco>
  );
}
