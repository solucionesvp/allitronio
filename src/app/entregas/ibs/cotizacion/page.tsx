"use client";

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { FAQ_IBS } from "@/content/propuestas/faq";
import { AlliFAQ } from "@/components/propuestas/AlliFAQ";
import { Layers, Wallet, Megaphone, CircleX, Receipt, ThumbsUp, CircleCheck, MessageCircleQuestionMark } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_DISPLAY } from "@/config/contact";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, BigPageNav } from "@/components/entregas/LecturaUI";

// ── Números de la cotización — único lugar donde se editan ──────────────
// Fuente: vault → 05 Clientes/Shineray/IBS/04 IBS — Cotización (v2, 1-oct-2026).
// Precios dados por Lups/Alejandro. Nunca llamar "manejo de redes" al concepto 1.
const MESES = 6;
const OPERACION_MES = 8000; // Operación digital y campaña · Tepic y Vallarta
const IDENTIDAD_TOTAL = 30000; // Identidad corporativa
const IDENTIDAD_MES = 5000; // en 6 pagos
const CONCEPTOS = [
  { nombre: "Operación digital y campaña comercial", detalle: "Tepic y Puerto Vallarta: web oficial, fichas de Google, campaña por plaza y contenido de campaña con las unidades.", mes: OPERACION_MES, total: OPERACION_MES * MESES },
  { nombre: "Identidad corporativa del grupo", detalle: "Nombre, logotipo, colores, aplicaciones y manual de marca e identidad.", mes: IDENTIDAD_MES, total: IDENTIDAD_TOTAL },
  { nombre: "Arquitectura digital", detalle: "Correos institucionales, dominios, cuentas a nombre de la empresa y soporte de TI durante los 6 meses.", mes: 0, total: 0 },
];
const PAUTA_PLAZA = "$4,000 a $5,000";

// Botones finales → WhatsApp de Allitron (número único en src/config/contact.ts).
const WA_ACEPTO = buildWhatsAppLink(
  "Hola, soy José Talavera, de IBS · Shineray. Revisé la propuesta de Allitron y la acepto. Quedo en espera del contrato para iniciar."
);
const WA_DUDA = buildWhatsAppLink(
  "Hola, soy José Talavera, de IBS · Shineray. Revisé la propuesta de Allitron y tengo una duda: "
);

const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`;
const TOTAL = CONCEPTOS.reduce((t, c) => t + c.total, 0);
const MES_TOTAL = OPERACION_MES + IDENTIDAD_MES;

export default function CotizacionIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={6} titulo=<>Cuánto cuesta.</> escena="cierre" mensaje="Seis meses de trabajo, en un pago mensual. Al final puede preguntarme lo que quiera." />

      {/* La propuesta */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Seis meses de trabajo">Una sola propuesta, clara.</SectionTitle>
        <Reveal>
          <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,24,32,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-allitron-blue px-7 py-5 sm:px-10">
              <div className="flex items-center gap-3">
                <Wallet size={30} className="shrink-0 text-white" />
                <p className="font-display text-[1.4rem] font-black text-white sm:text-[1.6rem]">Octubre a marzo</p>
              </div>
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-1.5 font-display text-[0.85rem] font-bold text-allitron-navy">
                <Layers size={16} /> Tepic y Puerto Vallarta
              </span>
            </div>
            <div className="bg-white p-7 sm:p-10">
              <div className="space-y-5">
                {CONCEPTOS.map((c) => (
                  <div key={c.nombre} className="flex flex-col gap-2 border-b border-[#101820]/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-display text-[1.2rem] font-black text-[#101820]">{c.nombre}</p>
                      <p className="mt-1 font-body text-[1.02rem] leading-[1.6] text-secondary">{c.detalle}</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      {c.total > 0 ? (
                        <>
                          <p className="font-display text-[1.5rem] font-black text-[#101820]">{fmt(c.total)}</p>
                          <p className="font-body text-[0.95rem] text-secondary">{fmt(c.mes)} al mes × {MESES}</p>
                        </>
                      ) : (
                        <p className="font-display text-[1.2rem] font-black text-allitron-navy">Incluida</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <p className="font-body text-[1.15rem] text-secondary">Total por 6 meses</p>
                <p className="font-display text-[2.6rem] font-black leading-none text-[#101820] sm:text-[3rem]">{fmt(TOTAL)}</p>
              </div>
              <p className="mt-4 rounded-[16px] bg-allitron-blue/10 p-4 font-body text-[1.1rem] leading-[1.6] text-[#101820]">
                Son <strong>{fmt(MES_TOTAL)} al mes</strong> durante {MESES} meses, pagados al inicio de cada mes.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <IconPoint icon={ThumbsUp} title="No es manejo de redes" text="No cobramos por publicar. Cobramos por una campaña con objetivo comercial: que los encuentren, les escriban y se suban a la unidad." />
          <IconPoint icon={Layers} tone="navy" title="Cuando entre Guadalajara" text="Se suma la tercera plaza y se ajusta la tarifa mensual de operación. La identidad ya estará lista para usarse ahí." delay={0.05} />
        </div>
      </SectionShell>

      {/* Anuncios */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Muy importante">El dinero de los anuncios va aparte.</SectionTitle>
        <div className="grid gap-5">
          <IconPoint
            icon={Megaphone}
            tone="orange"
            title={`Recomendamos ${PAUTA_PLAZA} por plaza, cada mes`}
            text="Se paga directo a Facebook y Google, con la tarjeta de la empresa. Ese dinero nunca pasa por nosotros, y usted ve cada peso."
          />
          <IconPoint
            icon={Receipt}
            tone="navy"
            title="Por qué esta cantidad"
            text="En su propia minuta de estrategia se propuso probar con no más de $10,000 al mes para todos los canales. Esto es exactamente eso, repartido en dos plazas. Y si Shineray confirma su apoyo publicitario para distribuidores, lo usamos primero ahí."
            delay={0.05}
          />
        </div>
      </SectionShell>

      {/* No incluye + condiciones */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Para que no haya sorpresas">Lo que no incluye.</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "El dinero de los anuncios.",
            "La plaza de Guadalajara: se suma cuando se confirme la ubicación y se ajusta la tarifa.",
            "El costo anual del dominio y de las licencias de correo, que se contratan a nombre de la empresa.",
            "El registro de la marca ante el IMPI (sus derechos oficiales); nosotros hacemos la búsqueda previa.",
            "Impresión de lonas, volantes o rotulados (diseñamos; la impresión se cotiza aparte y el rotulado requiere visto bueno de planta).",
            "Sistemas de ventas o CRM, y conexión con sistemas de Shineray México (se cotizan aparte si se necesitan).",
            "Atender los mensajes de los clientes o cerrar ventas: eso lo hacen sus asesores.",
          ].map((t, i) => (
            <Reveal key={t} delay={0.04 * i}>
              <div className="neu flex h-full items-start gap-4 rounded-[18px] p-5">
                <CircleX size={24} className="mt-0.5 shrink-0 text-allitron-orange" />
                <p className="font-body text-[1.08rem] leading-[1.6] text-[#101820]">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <BigText className="mt-8">
          Precios en pesos. Si requiere factura, se agrega el IVA; la razón social a la que se factura la definimos juntos al firmar. Trabajamos con contrato firmado, y todas las cuentas y la marca quedan a nombre de la empresa.
        </BigText>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <AlliFAQ items={FAQ_IBS} titulo="Pregúntele a Alli" subtitulo="Toque una pregunta y le respondo." />
      </SectionShell>

      {/* Cierre */}
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <div className="neu flex flex-col items-center gap-6 rounded-[28px] p-10 text-center sm:p-14">
            <OptionalImage src={BRAND_ALLI.primary} alt="" style={{ height: 88, width: "auto" }} fallback={null} />
            <p className="max-w-[600px] font-display text-[1.5rem] font-black leading-[1.35] text-[#101820] sm:text-[1.8rem]">
              Gracias por leer hasta aquí.
            </p>
            <p className="max-w-[600px] font-body text-[1.15rem] leading-[1.8] text-secondary">
              Si está de acuerdo, preparamos el contrato. Si firmamos antes del 9 de octubre, los anuncios estarán encendidos la semana del 9 de noviembre.
            </p>
            <div className="mt-2 flex w-full max-w-[560px] flex-col gap-4">
              <a
                href={WA_ACEPTO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[68px] items-center justify-center gap-3 rounded-[18px] bg-[#1FA855] px-8 py-4 font-display text-[1.15rem] font-bold text-white shadow-[0_10px_24px_rgba(31,168,85,0.3)] transition-transform active:scale-[0.98]"
              >
                <CircleCheck size={26} />
                Acepto la propuesta
              </a>
              <a
                href={WA_DUDA}
                target="_blank"
                rel="noopener noreferrer"
                className="neu neu-hover flex min-h-[68px] items-center justify-center gap-3 rounded-[18px] px-8 py-4 font-display text-[1.15rem] font-bold text-[#101820] transition-transform active:scale-[0.98]"
              >
                <MessageCircleQuestionMark size={26} />
                Tengo una duda
              </a>
              <p className="font-body text-[1rem] text-secondary">
                Los dos botones abren WhatsApp con Allitron · {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/ibs" backLabel="Volver al inicio" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
