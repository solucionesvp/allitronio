"use client";

// ── DiagnosisForm — formulario breve del diagnóstico comercial ───────────────
// Mismo contrato que WhatsAppLeadForm: arma el mensaje con el contexto y abre
// WhatsApp (no hay API propia que romper). Mejoras sobre el compartido, sin
// tocarlo: etiquetas visibles, errores por campo, estado de envío, bloqueo de
// doble envío, aviso si el navegador bloquea la ventana, confirmación con enlace
// de respaldo y aceptación del aviso de privacidad. Sin datos personales en
// analítica: solo se registra que hubo inicio, éxito o error.

import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackLandingEvent, trackLandingEventOnce } from "@/lib/landingEvents";
import { GRADIENT } from "./ui";

interface Props {
  buildLink: (message: string) => string;
  baseMessage: string;
  /** Sección donde vive el formulario (para analítica). */
  section: string;
  /** "dark" para el cierre cinematográfico, "light" para el modal claro. */
  tone?: "dark" | "light";
}

type Status = "idle" | "submitting" | "success" | "blocked" | "error";
interface Errors {
  nombre?: string;
  agencia?: string;
  ciudad?: string;
  privacidad?: string;
}

export default function DiagnosisForm({ buildLink, baseMessage, section, tone = "dark" }: Props) {
  const uid = useId();
  const [nombre, setNombre] = useState("");
  const [agencia, setAgencia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [privacidad, setPrivacidad] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [link, setLink] = useState("");
  const lock = useRef(false);

  const dark = tone === "dark";
  const input = dark
    ? "border-white/20 bg-white/[0.06] text-foreground placeholder:text-foreground/40 focus-visible:border-[#F5A300]"
    : "border-[var(--tm-line,rgba(0,0,0,.15))] bg-white text-[#16130C] placeholder:text-black/40 focus-visible:border-[#8A5200]";
  const label = dark ? "text-foreground/85" : "text-[#16130C]";
  const err = dark ? "text-[#FFB4A8]" : "text-[#9B2C1F]";
  const muted = dark ? "text-foreground/65" : "text-[#5A5444]";

  const started = () => trackLandingEventOnce("diagnosis_form_start", { section });

  const validate = (): Errors => {
    const e: Errors = {};
    if (nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
    if (agencia.trim().length < 2) e.agencia = "Escribe el nombre de tu agencia o grupo.";
    if (ciudad.trim().length < 2) e.ciudad = "Escribe tu ciudad.";
    if (!privacidad) e.privacidad = "Acepta el aviso de privacidad para continuar.";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (lock.current || status === "submitting") return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      trackLandingEvent("diagnosis_form_submit_error", { section, reason: "validacion" });
      return;
    }
    lock.current = true;
    setStatus("submitting");
    try {
      const message = `Soy ${nombre.trim()}, de ${agencia.trim()} en ${ciudad.trim()}. ${baseMessage}`;
      const url = buildLink(message);
      setLink(url);
      trackMetaEvent("Lead");
      const win = window.open(url, "_blank", "noopener,noreferrer");
      setStatus(win ? "success" : "blocked");
      trackLandingEvent("diagnosis_form_submit_success", { section, popup: win ? "abierto" : "bloqueado" });
    } catch {
      setStatus("error");
      lock.current = false;
      trackLandingEvent("diagnosis_form_submit_error", { section, reason: "excepcion" });
    }
  };

  if (status === "success" || status === "blocked") {
    return (
      <div role="status" className="flex flex-col gap-4">
        <CheckCircle2 className="h-8 w-8" style={{ color: dark ? "#F5A300" : "#8A5200" }} strokeWidth={2} aria-hidden="true" />
        <p className={`font-display text-[1.15rem] font-black ${label}`}>
          {status === "success" ? "Se abrió WhatsApp con tu mensaje." : "Tu mensaje está listo."}
        </p>
        <p className={`font-body text-[0.9rem] leading-[1.7] ${muted}`}>
          {status === "success"
            ? "Envíalo desde ahí y te respondemos para agendar el diagnóstico. Si no se abrió, usa el botón."
            : "Tu navegador bloqueó la ventana. Ábrela con el botón para enviarlo y agendar el diagnóstico."}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-display text-[0.66rem] font-bold tracking-[0.18em] text-white"
          style={{ background: GRADIENT }}
        >
          ABRIR WHATSAPP
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    );
  }

  const field = (key: keyof Errors, id: string, text: string, value: string, set: (v: string) => void, autoComplete: string, placeholder: string) => (
    <div>
      <label htmlFor={id} className={`mb-1.5 block font-display text-[0.64rem] font-bold tracking-[0.14em] ${label}`}>
        {text.toUpperCase()}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${id}-err` : undefined}
        onFocus={started}
        onChange={(e) => {
          started();
          set(e.target.value);
          if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
        }}
        className={`min-h-[48px] w-full rounded-sm border px-4 font-body text-[0.95rem] outline-none transition-colors focus-visible:ring-0 ${input}`}
      />
      {errors[key] && (
        <p id={`${id}-err`} className={`mt-1.5 font-body text-[0.78rem] ${err}`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-label="Solicitar diagnóstico comercial">
      {field("nombre", `${uid}-n`, "Tu nombre", nombre, setNombre, "name", "Nombre y apellido")}
      {field("agencia", `${uid}-a`, "Agencia o grupo", agencia, setAgencia, "organization", "Nombre de la agencia o del grupo")}
      {field("ciudad", `${uid}-c`, "Ciudad", ciudad, setCiudad, "address-level2", "Tepic, Bahía de Banderas…")}

      <div>
        <label className={`flex min-h-[44px] cursor-pointer items-start gap-3 font-body text-[0.82rem] leading-[1.55] ${muted}`}>
          <input
            type="checkbox"
            checked={privacidad}
            aria-invalid={Boolean(errors.privacidad)}
            aria-describedby={errors.privacidad ? `${uid}-p-err` : undefined}
            onChange={(e) => {
              started();
              setPrivacidad(e.target.checked);
              if (errors.privacidad) setErrors((p) => ({ ...p, privacidad: undefined }));
            }}
            className="mt-1 h-5 w-5 shrink-0 accent-[#F5A300]"
          />
          <span>
            He leído el{" "}
            <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              aviso de privacidad
            </a>{" "}
            y acepto que se use mi información para contactarme sobre el diagnóstico.
          </span>
        </label>
        {errors.privacidad && (
          <p id={`${uid}-p-err`} className={`mt-1 font-body text-[0.78rem] ${err}`}>
            {errors.privacidad}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className={`font-body text-[0.84rem] ${err}`}>
          No pudimos preparar tu mensaje. Inténtalo de nuevo.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm px-7 py-4 font-display text-[0.68rem] font-bold tracking-[0.2em] text-white transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60"
        style={{ background: GRADIENT }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            PREPARANDO…
          </>
        ) : (
          <>
            CONTINUAR A WHATSAPP
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
