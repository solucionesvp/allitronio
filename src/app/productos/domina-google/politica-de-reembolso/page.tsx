"use client";

// ── /productos/domina-google/politica-de-reembolso ──────────────────────────
// Política de reembolso específica de Domina Google (MAPS 2.0) — cada
// producto tiene la suya porque los términos de entrega y anticipo son
// distintos por producto; esta NO aplica a LAZUP, Segundo Cerebro ni
// Allitron 90.
//
// Términos confirmados por Lups (23-sep-2026), los mismos ya integrados en
// Contrato_Domina_Google_PLANTILLA.docx — deben coincidir siempre; si uno
// cambia, cambia el otro.

import MinimalHeader from "@/components/layout/MinimalHeader";
import { DOMINA_GOOGLE_LIGHT, DOMINA_GOOGLE_TOKENS } from "@/config/productTheme";
import { DG_DELIVERY } from "@/data/dominaGoogleContent";
import { WHATSAPP_DISPLAY, waLink } from "@/config/contact";

const ACCENT = DOMINA_GOOGLE_TOKENS.accent;
const L = DOMINA_GOOGLE_LIGHT;
const LAST_UPDATED = "23 de septiembre de 2026";

const LIGHT_VARS = {
  "--dg-bg": L.bg,
  "--dg-ink": L.ink,
  "--dg-muted": L.muted,
  "--dg-line": L.line,
} as const;

const H2 = "font-display font-black text-[1.4rem] leading-[1.15] tracking-tight text-[var(--dg-ink)] mt-14 mb-4";
const BODY = "font-body text-[0.92rem] leading-[1.8] text-[var(--dg-muted)]";

export default function DominaGoogleReembolsoPage() {
  const contactLink = waLink(
    "GOOGLE",
    "Hola, tengo una pregunta sobre la política de reembolso de Domina Google.",
    "domina-google · política de reembolso"
  );

  return (
    <>
      <MinimalHeader />
      <main style={LIGHT_VARS as React.CSSProperties} className="bg-[var(--dg-bg)]">
        <div className="mx-auto max-w-[720px] px-8 pb-28 pt-36 lg:px-0">
          <span
            className="mb-4 block font-display text-[0.52rem] font-bold tracking-[0.44em]"
            style={{ color: ACCENT }}
          >
            DOMINA GOOGLE · LEGAL
          </span>
          <h1 className="font-display font-black text-[2rem] leading-[1.05] tracking-tight text-[var(--dg-ink)] lg:text-[2.6rem]">
            Política de reembolso
          </h1>
          <p className={`${BODY} mt-4`}>Última actualización: {LAST_UPDATED}.</p>

          <p className={`${BODY} mt-10`}>
            Esta política aplica al servicio Domina Google y complementa — nunca sustituye — el
            contrato de prestación de servicios que firmas antes de iniciar el proyecto. Si hay una
            diferencia entre esta página y tu contrato firmado, el contrato firmado es el que
            aplica.
          </p>

          <h2 className={H2}>Forma de pago</h2>
          <p className={BODY}>
            El servicio se paga en dos exhibiciones del 50% cada una: un anticipo para iniciar el
            proyecto y el saldo restante contra entrega. El monto exacto depende del nivel de
            lanzamiento vigente al momento de tu contrato.
          </p>

          <h2 className={H2}>Cancelación antes de recibir avances</h2>
          <p className={BODY}>
            Si cancelas el proyecto antes de que te compartamos cualquier avance, propuesta o
            entregable preliminar (incluyendo por WhatsApp), te reembolsamos el{" "}
            <strong style={{ color: ACCENT }}>25%</strong> del anticipo pagado.
          </p>

          <h2 className={H2}>Cancelación después de recibir avances</h2>
          <p className={BODY}>
            Una vez que te compartimos cualquier avance del proyecto, el anticipo{" "}
            <strong>no es reembolsable</strong>. El trabajo en proceso (avances del sitio,
            configuración de tu ficha, materiales entregados) tampoco puede usarse sin cubrir antes
            la parte correspondiente al avance realizado.
          </p>

          <h2 className={H2}>Plazo de entrega</h2>
          <p className={BODY}>
            El plazo de entrega es de {DG_DELIVERY.delivery}. {DG_DELIVERY.deliveryNote}
          </p>

          <h2 className={H2}>Dudas</h2>
          <p className={BODY}>
            Escríbenos por el mismo WhatsApp donde diste seguimiento a tu pago, o al{" "}
            <a href={contactLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: ACCENT }}>
              {WHATSAPP_DISPLAY}
            </a>.
          </p>
        </div>
      </main>
    </>
  );
}
