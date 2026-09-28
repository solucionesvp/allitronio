"use client";

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { FAQ_VIESAINE } from "@/content/propuestas/faq";
import { AlliFAQ } from "@/components/propuestas/AlliFAQ";
import { CalendarRange, CalendarHeart, Megaphone, CircleX, ThumbsUp, CircleCheck, MessageCircleQuestionMark, Globe } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";
import { buildWhatsAppLink, WHATSAPP_DISPLAY } from "@/config/contact";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/viesaine";

// ── Números de la cotización — único lugar donde se editan ──────────────
// Base: Motor de Captación (ficha: $8,500 activación + $4,000/mes, fundador),
// Sistemas setup básico (mínimo $10,000) y Domina Google (fundador $5,999).
// Vault → 03 Vie Saine — Cotización.
const ACTIVACION = 8500;
const AGENDA = 10000;
const OP1_MENSUAL = 4000;
const OP1_MESES = 3; // nov, dic, ene
const OP2_MENSUAL = 3600;
const OP2_MESES = 5; // nov a mar
const DOMINA = 5999;
const PAUTA_SUGERIDA = "$3,000 al mes de octubre a diciembre y $4,000 en enero";

const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`;
const OP1_TOTAL = ACTIVACION + AGENDA + OP1_MENSUAL * OP1_MESES;
const OP2_TOTAL = ACTIVACION + AGENDA + OP2_MENSUAL * OP2_MESES + DOMINA;
const OP2_SEPARADO = ACTIVACION + AGENDA + OP1_MENSUAL * OP2_MESES + DOMINA;

const WA_ACEPTO = buildWhatsAppLink("Hola, somos Patricia y Elizabeth, de Vie Saine. Revisamos la propuesta de Allitron y la aceptamos. Quedamos en espera del contrato para iniciar.");
const WA_DUDA = buildWhatsAppLink("Hola, somos Patricia y Elizabeth, de Vie Saine. Revisamos la propuesta de Allitron y tenemos una duda: ");

function Linea({ concepto, monto, nota }: { concepto: string; monto: string; nota?: string }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[#101820]/[0.07] py-3">
      <span className="font-body text-[1.05rem] text-[#101820]">
        {concepto}
        {nota && <span className="block text-[0.92rem] text-secondary">{nota}</span>}
      </span>
      <span className="font-display text-[1.15rem] font-black text-[#101820]">{monto}</span>
    </li>
  );
}

export default function CotizacionVieSainePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_VIESAINE} paso={6} titulo=<>Cuánto cuesta.</> escena="cierre" mensaje="Dos opciones claras. Y abajo respondo sus dudas." />

      {/* Qué incluye siempre */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Incluido en las dos opciones">Lo que hacemos por ustedes.</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Diagnóstico y un solo nombre en Google, Facebook e Instagram.",
            "Acompañamiento para preparar el aviso de publicidad COFEPRIS.",
            "Agenda con recordatorios y confirmación automática por WhatsApp.",
            "Ficha de Google en orden y sistema para pedir opiniones.",
            "Una sesión de foto y video en la clínica para arrancar.",
            "Anuncios por dolor y por tipo de paciente, hasta 4 piezas nuevas al mes, optimización semanal y reporte mensual.",
          ].map((t, i) => (
            <Reveal key={t} delay={0.03 * i}>
              <div className="neu flex h-full items-start gap-4 rounded-[18px] p-5">
                <CircleCheck size={24} className="mt-0.5 shrink-0 text-allitron-blue" />
                <p className="font-body text-[1.05rem] leading-[1.6] text-[#101820]">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* Opción 1 */}
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,24,32,0.12)]">
            <div className="flex flex-wrap items-center gap-3 bg-allitron-blue px-7 py-5 sm:px-10">
              <CalendarRange size={30} className="shrink-0 text-white" />
              <p className="font-display text-[1.4rem] font-black text-white sm:text-[1.6rem]">Opción 1 · Campaña de temporada</p>
            </div>
            <div className="bg-white p-7 sm:p-10">
              <p className="font-body text-[1.1rem] text-secondary">Octubre a enero · 4 meses</p>
              <ul className="mt-4">
                <Linea concepto="Octubre · Arranque de campaña" nota="Mitad al firmar, mitad antes de lanzar" monto={fmt(ACTIVACION)} />
                <Linea concepto="Agenda automática" nota="Pago único · mitad al firmar, mitad al entregarla funcionando" monto={fmt(AGENDA)} />
                <Linea concepto={`Noviembre, diciembre y enero · ${fmt(OP1_MENSUAL)} al mes`} nota="Cada mes se paga al inicio" monto={fmt(OP1_MENSUAL * OP1_MESES)} />
              </ul>
              <p className="mt-6 flex flex-wrap items-baseline justify-between gap-2 font-body text-[1.15rem] text-secondary">
                Total de la campaña
                <strong className="font-display text-[2.2rem] font-black text-[#101820]">{fmt(OP1_TOTAL)}</strong>
              </p>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* Opción 2 */}
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,24,32,0.12)] ring-2 ring-allitron-orange">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-allitron-orange px-7 py-5 sm:px-10">
              <div className="flex items-center gap-3">
                <CalendarHeart size={30} className="shrink-0 text-white" />
                <p className="font-display text-[1.4rem] font-black text-white sm:text-[1.6rem]">Opción 2 · Campaña de 6 meses</p>
              </div>
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-1.5 font-display text-[0.85rem] font-bold text-allitron-navy">
                <ThumbsUp size={16} /> Recomendada
              </span>
            </div>
            <div className="bg-white p-7 sm:p-10">
              <p className="font-body text-[1.1rem] text-secondary">Octubre a marzo · 6 meses · incluye su página web</p>
              <ul className="mt-4">
                <Linea concepto="Octubre · Arranque de campaña" nota="Mitad al firmar, mitad antes de lanzar" monto={fmt(ACTIVACION)} />
                <Linea concepto="Agenda automática" nota="Pago único · mitad al firmar, mitad al entregarla funcionando" monto={fmt(AGENDA)} />
                <Linea concepto={`Noviembre a marzo · ${fmt(OP2_MENSUAL)} al mes`} nota={`Mensualidad más baja por quedarse 6 meses (en vez de ${fmt(OP1_MENSUAL)})`} monto={fmt(OP2_MENSUAL * OP2_MESES)} />
                <Linea concepto="Su página web con Domina Google" nota="Página propia + ficha de Google + botón de WhatsApp, cuidando las reglas de COFEPRIS. Se entrega en noviembre" monto={fmt(DOMINA)} />
              </ul>
              <p className="mt-6 flex flex-wrap items-baseline justify-between gap-2 font-body text-[1.15rem] text-secondary">
                Total de la campaña
                <span className="text-right">
                  <span className="block font-display text-[1.1rem] font-bold text-secondary/70 line-through decoration-allitron-orange decoration-2">{fmt(OP2_SEPARADO)}</span>
                  <strong className="font-display text-[2.2rem] font-black text-[#101820]">{fmt(OP2_TOTAL)}</strong>
                </span>
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4">
          <IconPoint icon={Globe} tone="orange" title="Por qué recomendamos 6 meses" text="Un tratamiento de rehabilitación toma semanas: febrero y marzo son los meses en que los pacientes de enero terminan, recomiendan y dejan su opinión. Y con su propia página, el primer lugar en Google queda mucho mejor protegido." />
        </div>
      </SectionShell>

      {/* Anuncios */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Muy importante">El dinero de los anuncios va aparte.</SectionTitle>
        <IconPoint
          icon={Megaphone}
          tone="orange"
          title={`Recomendamos ${PAUTA_SUGERIDA}`}
          text="Se paga directo a Facebook e Instagram con su tarjeta. Ese dinero nunca pasa por nosotros, y ven cada peso. Con menos, la campaña llega a muy poca gente."
        />
      </SectionShell>

      {/* No incluye */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Para que no haya sorpresas">Lo que no incluye.</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "El dinero de los anuncios.",
            "Lo que cobra Meta por cada mensaje automático de WhatsApp (son centavos por mensaje).",
            "Los trámites ante COFEPRIS los presentan ustedes; nosotros les ayudamos a prepararlos.",
            "Contestar mensajes o atender pacientes: les dejamos todo listo para hacerlo rápido.",
            "Mantener la agenda automática después de terminar la campaña (se cotiza aparte).",
            "Garantía de número de pacientes: depende también de su agenda y su atención.",
          ].map((t, i) => (
            <Reveal key={t} delay={0.04 * i}>
              <div className="neu flex h-full items-start gap-4 rounded-[18px] p-5">
                <CircleX size={24} className="mt-0.5 shrink-0 text-allitron-orange" />
                <p className="font-body text-[1.05rem] leading-[1.6] text-[#101820]">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <BigText className="mt-8">Precios en pesos. Si requieren factura, se agrega el IVA. Trabajamos con contrato firmado y todas sus cuentas quedan a su nombre.</BigText>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <AlliFAQ items={FAQ_VIESAINE} titulo="Pregúntenle a Alli" subtitulo="Toquen una pregunta y les respondo." />
      </SectionShell>

      {/* Cierre + WhatsApp */}
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <div className="neu flex flex-col items-center gap-6 rounded-[28px] p-8 text-center sm:p-14">
            <OptionalImage src={BRAND_ALLI.primary} alt="" style={{ height: 88, width: "auto" }} fallback={null} />
            <p className="max-w-[600px] font-display text-[1.5rem] font-black leading-[1.35] text-[#101820] sm:text-[1.8rem]">Gracias por leer hasta aquí.</p>
            <p className="max-w-[600px] font-body text-[1.15rem] leading-[1.8] text-secondary">
              Díganos qué opción prefieren y preparamos el contrato. Si firmamos antes del 2 de octubre, anuncios y agenda estarán funcionando a finales de octubre.
            </p>
            <div className="mt-2 flex w-full max-w-[560px] flex-col gap-4">
              <a href={WA_ACEPTO} target="_blank" rel="noopener noreferrer" className="flex min-h-[68px] items-center justify-center gap-3 rounded-[18px] bg-[#1FA855] px-8 py-4 font-display text-[1.15rem] font-bold text-white shadow-[0_10px_24px_rgba(31,168,85,0.3)] transition-transform active:scale-[0.98]">
                <CircleCheck size={26} />
                Aceptamos la propuesta
              </a>
              <a href={WA_DUDA} target="_blank" rel="noopener noreferrer" className="neu neu-hover flex min-h-[68px] items-center justify-center gap-3 rounded-[18px] px-8 py-4 font-display text-[1.15rem] font-bold text-[#101820] transition-transform active:scale-[0.98]">
                <MessageCircleQuestionMark size={26} />
                Tenemos una duda
              </a>
              <p className="font-body text-[1rem] text-secondary">Los dos botones abren WhatsApp con Allitron · {WHATSAPP_DISPLAY}</p>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} backLabel="Volver al inicio" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
