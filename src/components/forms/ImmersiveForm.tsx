"use client";

// ── ImmersiveForm — motor genérico de flujo pregunta por pregunta ───────────
// Un solo componente para los 3 caminos del Hub (público, empresas,
// productos digitales) — cada uno lo configura con sus propios campos, copy
// y acento, sin triplicar la UI. Estilo Typeform, fondo inmersivo.

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
import { submitFlow } from "@/lib/submitFlow";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export type FieldType = "text" | "textarea" | "email" | "tel" | "select" | "boolean";

export interface FieldConfig {
  key: string;
  type: FieldType;
  question: string;
  placeholder?: string;
  options?: string[];
  booleanOptions?: [{ label: string; value: true }, { label: string; value: false }];
  required?: boolean;
}

export interface ImmersiveFormConfig {
  fields: FieldConfig[];
  accent: string;
  subjectPrefix: string;
  successTitle: string;
  successMessage: string;
}

type Values = Record<string, string | boolean | undefined>;

export default function ImmersiveForm({ config }: { config: ImmersiveFormConfig }) {
  const { fields, accent, subjectPrefix, successTitle, successMessage } = config;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [status, setStatus] = useState<"editing" | "done">("editing");
  const [copied, setCopied] = useState(false);

  const accentVar = { ["--accent" as string]: accent } as CSSProperties;
  const field = fields[step];
  const isLast = step === fields.length - 1;

  const canAdvance = !field.required || !!values[field.key];

  const update = (key: string, v: string | boolean) => setValues((prev) => ({ ...prev, [key]: v }));
  const next = () => setStep((s) => Math.min(s + 1, fields.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const buildSubmission = () => ({
    subjectPrefix,
    fieldLabels: fields.map((f) => [f.key, f.question] as [string, string]),
    values,
  });

  const handleSubmit = () => {
    const { mailtoUrl } = submitFlow(buildSubmission());
    window.location.href = mailtoUrl;
    setStatus("done");
  };

  const copyFallback = async () => {
    const { body } = submitFlow(buildSubmission());
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full border-b-2 border-white/15 bg-transparent pb-3 font-display text-[1.3rem] text-foreground placeholder:text-muted/40 focus:outline-none sm:text-[1.6rem]";

  if (status === "done") {
    const nameValue = values["nombre"];
    return (
      <div style={accentVar} className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: `${accent}22` }}>
          <Check className="h-6 w-6" style={{ color: accent }} strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-[1.4rem] font-black text-foreground">
          {typeof nameValue === "string" && nameValue ? `${successTitle}, ${nameValue}.` : `${successTitle}.`}
        </h3>
        <p className="max-w-sm font-body text-[0.88rem] leading-[1.8] text-muted">{successMessage}</p>
        <button
          onClick={copyFallback}
          className="inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 font-display text-[0.6rem] font-bold tracking-[0.2em] text-muted transition-colors hover:border-white/30 hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "COPIADO" : "COPIAR MENSAJE"}
        </button>
      </div>
    );
  }

  return (
    <div style={accentVar} className="mx-auto w-full max-w-[560px]">
      <div className="mb-10 flex items-center gap-2" aria-hidden="true">
        {fields.map((f, i) => (
          <div
            key={f.key}
            className="h-[3px] flex-1 rounded-full transition-colors duration-300"
            style={{ background: i <= step ? accent : "rgba(255,255,255,0.12)" }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={field.key}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <h3 className="mb-8 font-display text-[1.15rem] font-bold leading-[1.3] text-foreground sm:text-[1.45rem]">
            {field.question}
          </h3>

          {(field.type === "text" || field.type === "email" || field.type === "tel") && (
            <input
              autoFocus
              type={field.type}
              value={(values[field.key] as string) ?? ""}
              onChange={(e) => update(field.key, e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canAdvance && !isLast && next()}
              placeholder={field.placeholder}
              className={inputClass}
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
            />
          )}

          {field.type === "textarea" && (
            <textarea
              autoFocus
              rows={3}
              value={(values[field.key] as string) ?? ""}
              onChange={(e) => update(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full resize-none border-b-2 border-white/15 bg-transparent pb-3 font-body text-[1rem] leading-[1.7] text-foreground placeholder:text-muted/40 focus:outline-none"
            />
          )}

          {field.type === "select" && field.options && (
            <div className="flex flex-col gap-3">
              {field.options.map((opt) => {
                const active = values[field.key] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => update(field.key, opt)}
                    className="flex items-center justify-between border px-5 py-4 text-left font-display text-[0.85rem] font-semibold tracking-[0.02em] transition-all"
                    style={{
                      borderColor: active ? accent : "rgba(255,255,255,0.12)",
                      background: active ? `${accent}1a` : "transparent",
                      color: active ? "var(--color-foreground)" : "var(--color-muted)",
                    }}
                  >
                    {opt}
                    {active && <Check className="h-4 w-4" style={{ color: accent }} />}
                  </button>
                );
              })}
            </div>
          )}

          {field.type === "boolean" && field.booleanOptions && (
            <div className="flex gap-4">
              {field.booleanOptions.map((opt) => {
                const active = values[field.key] === opt.value;
                return (
                  <button
                    key={opt.label}
                    onClick={() => update(field.key, opt.value)}
                    className="flex-1 border px-5 py-4 text-left font-display text-[0.78rem] font-semibold transition-all"
                    style={{
                      borderColor: active ? accent : "rgba(255,255,255,0.12)",
                      background: active ? `${accent}1a` : "transparent",
                      color: active ? "var(--color-foreground)" : "var(--color-muted)",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center gap-4">
        {step > 0 && (
          <button onClick={back} className="font-display text-[0.62rem] font-bold tracking-[0.2em] text-muted transition-colors hover:text-foreground">
            ATRÁS
          </button>
        )}
        <button
          onClick={isLast ? handleSubmit : next}
          disabled={!canAdvance}
          className="ml-auto inline-flex items-center gap-2 px-6 py-3 font-display text-[0.62rem] font-bold tracking-[0.2em] text-allitron-base transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          style={{ background: accent }}
        >
          {isLast ? "ENVIAR" : "SIGUIENTE"}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
