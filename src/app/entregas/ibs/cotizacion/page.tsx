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
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

// ── Números de la cotización — único lugar donde se editan ──────────────
// Fuente y lógica: vault → 05 Clientes/Shineray/IBS/04 IBS — Cotización.
// Precio "primeros clientes Allitron" (mismo criterio que Isuzu), validado por Lups.
// Lista tachada = Domina Google ×2 ($14,999) + web multiplaza ($35,000)
//   + tablero de prospectos ($18,000) + Toma tu Mercado Empresarial ×2 ciclos ($49,000).
const LISTA_TOTAL = 181000;
const OP1_MENSUAL = 16500;
const OP1_MESES = 6;
const BLOQUES = [
  { fase: "Fase 0", nombre: "Bloque 1 · Nombre, llaves y Google", cuando: "Semanas 1 y 2", que: "Cuentas a nombre de IBS, Shineray Tepic y Puerto Vallarta en Google, redes homologadas.", pago: 15000, forma: "Pago único" },
  { fase: "Fase 0", nombre: "Bloque 2 · Web y tablero", cuando: "Semanas 3 y 4", que: "La web oficial con una página por plaza y el tablero de prospectos.", pago: 26000, forma: "Pago único" },
  { fase: "Fase 0", nombre: "Bloque 3 · Primera temporada de venta", cuando: "Noviembre, diciembre y enero", que: "Anuncios por plaza, contenido con Ricardo y las unidades, pruebas de manejo y seguimiento.", pago: 14000, meses: 3, forma: "Al mes" },
  { fase: "Fase 1", nombre: "Bloque 4 · Listos para el lanzamiento", cuando: "Febrero y marzo", que: "Casos reales, opiniones, más de lo que vende y reporte cada mes.", pago: 14000, meses: 2, forma: "Al mes" },
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
const OP1_TOTAL = OP1_MENSUAL * OP1_MESES;
const OP2_TOTAL = BLOQUES.reduce((s, b) => s + b.pago * (b.meses ?? 1), 0);

export default function CotizacionIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={6} titulo=<>Cuánto cuesta.</> escena="cierre" mensaje="Dos formas de trabajar juntos. Al final puede preguntarme lo que quiera." />

      {/* Precio de primeros clientes */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Precio de primeros clientes Allitron">Un precio justo para empezar juntos.</SectionTitle>
        <Reveal>
          <div className="neu flex flex-col gap-2 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="font-body text-[1.1rem] text-secondary">Valor normal de todo el trabajo, 6 meses:</p>
            <p className="font-display text-[1.8rem] font-black text-secondary/70 line-through decoration-allitron-orange decoration-[3px]">{fmt(LISTA_TOTAL)}</p>
          </div>
        </Reveal>
        <BigText className="mt-6">
          IBS es de los primeros clientes de Allitron. Por eso le damos un precio especial, que no se repetirá igual más adelante.
        </BigText>
      </SectionShell>

      {/* Opción 1 */}
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,24,32,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-allitron-blue px-7 py-5 sm:px-10">
              <div className="flex items-center gap-3">
                <Wallet size={30} className="shrink-0 text-white" />
                <p className="font-display text-[1.4rem] font-black text-white sm:text-[1.6rem]">Opción 1 · Todo junto</p>
              </div>
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-1.5 font-display text-[0.85rem] font-bold text-allitron-navy">
                <ThumbsUp size={16} /> Recomendada
              </span>
            </div>
            <div className="bg-white p-7 sm:p-10">
              <p className="font-display text-[3rem] font-black leading-none text-[#101820] sm:text-[3.6rem]">
                {fmt(OP1_MENSUAL)}
                <span className="ml-2 font-body text-[1.2rem] font-normal text-secondary">al mes</span>
              </p>
              <p className="mt-3 font-body text-[1.15rem] text-secondary">
                Durante {OP1_MESES} meses, de octubre a marzo. Total: <strong className="text-[#101820]">{fmt(OP1_TOTAL)}</strong>
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Incluye todo: las dos fases y las dos plazas, Tepic y Puerto Vallarta.",
                  `Al firmar se pagan los dos primeros meses (${fmt(OP1_MENSUAL * 2)}); después, un pago al inicio de cada mes.`,
                  "La campaña no se detiene y llegan listos al lanzamiento nacional de Shineray.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-body text-[1.1rem] leading-[1.6] text-[#101820]">
                    <span className="mt-[0.6em] h-2.5 w-2.5 shrink-0 rounded-full bg-allitron-blue" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* Opción 2 */}
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <Layers size={30} className="text-allitron-navy" />
            <p className="font-display text-[1.4rem] font-black text-[#101820] sm:text-[1.6rem]">Opción 2 · Por bloques</p>
          </div>
        </Reveal>
        <BigText className="mb-8">Se paga bloque por bloque. Al terminar cada uno, usted decide si seguimos.</BigText>
        <div className="grid gap-4">
          {BLOQUES.map((b, i) => (
            <Reveal key={b.nombre} delay={0.05 * i}>
              <div className="neu flex flex-col gap-4 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="min-w-0">
                  <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.14em] text-allitron-navy">
                    {b.fase} · {b.cuando}
                  </p>
                  <h3 className="mt-1 font-display text-[1.25rem] font-black text-[#101820]">{b.nombre}</h3>
                  <p className="mt-1 font-body text-[1.05rem] leading-[1.6] text-secondary">{b.que}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="font-display text-[1.8rem] font-black text-[#101820]">{fmt(b.pago)}</p>
                  <p className="font-body text-[0.98rem] text-secondary">
                    {b.forma}
                    {b.meses ? ` · ${b.meses} meses = ${fmt(b.pago * b.meses)}` : ""}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-right font-body text-[1.15rem] text-secondary">
            Total de los 4 bloques: <strong className="font-display text-[1.4rem] text-[#101820]">{fmt(OP2_TOTAL)}</strong>
          </p>
        </Reveal>
        <div className="mt-8">
          <Highlight>La Opción 1 cuesta {fmt(OP2_TOTAL - OP1_TOTAL)} menos que la Opción 2, y la campaña no se detiene entre bloques.</Highlight>
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
            "La plaza de Guadalajara: se suma como extensión cuando se confirme la ubicación.",
            "El costo del dominio y de los correos, que se contratan a nombre de IBS.",
            "Impresión de lonas, volantes o rotulados (diseñamos; la impresión se cotiza aparte y el rotulado requiere visto bueno de planta).",
            "Conectar con sistemas de Shineray México o su tienda en Mercado Libre (se cotiza cuando planta lo defina).",
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
          Precios en pesos. Si requiere factura, se agrega el IVA; la razón social a la que se factura la definimos juntos al firmar. Trabajamos con contrato firmado, y todas las cuentas quedan a nombre de IBS.
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
              Díganos qué opción prefiere y preparamos el contrato. Si firmamos antes del 9 de octubre, los anuncios estarán encendidos la semana del 9 de noviembre.
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
