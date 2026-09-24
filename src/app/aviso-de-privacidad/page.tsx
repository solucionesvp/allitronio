"use client";

// ── /aviso-de-privacidad — página legal, sitio completo ──────────────────────
// Cubre todos los productos (Domina Google, LAZUP, Segundo Cerebro, Allitron
// 90): un solo aviso, no uno por producto — las finalidades y datos que se
// recaban son esencialmente los mismos en todos.
//
// Responsable declarado = la misma entidad que aparece en los contratos de
// servicio (confirmado por Lups, 23-sep-2026): Distribuidor, Promotor y
// Asesor del Noroeste, S.A. de C.V., operando bajo la marca comercial
// Allitron. Si el responsable legal correcto es otro, actualizar aquí y en
// los contratos por igual — deben coincidir.
//
// No se afirma el uso de cookies de rastreo, pixeles o analítica: al
// 23-sep-2026 no existen en el código de este sitio (revisado). Si se agrega
// Meta Pixel, Google Analytics u otro rastreo, esta página debe actualizarse
// ese mismo día.
//
// Este documento es una base operativa, no asesoría jurídica. Antes de
// depender de él frente a una autoridad o una disputa, debe revisarlo un
// abogado especializado en protección de datos (LFPDPPP).

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_DISPLAY, waLink } from "@/config/contact";

const LAST_UPDATED = "23 de septiembre de 2026";

const LIGHT_VARS = {
  "--pv-bg": "#F8F9F8",
  "--pv-ink": "#101820",
  "--pv-muted": "#626D76",
  "--pv-line": "rgba(16,24,32,0.09)",
  "--pv-accent": "#09AFF2",
} as const;

const H2 = "font-display font-black text-[1.4rem] leading-[1.15] tracking-tight text-[var(--pv-ink)] mt-14 mb-4";
const BODY = "font-body text-[0.92rem] leading-[1.8] text-[var(--pv-muted)]";
const LI = "font-body text-[0.92rem] leading-[1.8] text-[var(--pv-muted)] pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--pv-accent)]";

export default function AvisoDePrivacidadPage() {
  const contactLink = waLink(
    "PRIVACIDAD",
    "Hola, quiero ejercer un derecho ARCO sobre mis datos personales.",
    "aviso-de-privacidad"
  );

  return (
    <>
      <Navbar />
      <main style={LIGHT_VARS as React.CSSProperties} className="bg-[var(--pv-bg)]">
        <div className="mx-auto max-w-[720px] px-8 pb-28 pt-36 lg:px-0">
          <span className="mb-4 block font-display text-[0.52rem] font-bold tracking-[0.44em] text-[var(--pv-muted)]">
            LEGAL
          </span>
          <h1 className="font-display font-black text-[2rem] leading-[1.05] tracking-tight text-[var(--pv-ink)] lg:text-[2.6rem]">
            Aviso de Privacidad
          </h1>
          <p className={`${BODY} mt-4`}>Última actualización: {LAST_UPDATED}.</p>

          <p className={`${BODY} mt-10`}>
            Este aviso aplica a todos los productos y servicios ofrecidos a través de este sitio
            (Domina Google, LAZUP, Segundo Cerebro, Allitron 90 y cualquier otro que se agregue),
            en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares.
          </p>

          <h2 className={H2}>1. Responsable del tratamiento</h2>
          <p className={BODY}>
            El responsable de tus datos personales es Distribuidor, Promotor y Asesor del Noroeste,
            S.A. de C.V., con domicilio en Calle Durango Sur número 12, interior 1, colonia Centro,
            código postal 63000, Tepic, Nayarit, operando bajo la marca comercial Allitron.
          </p>

          <h2 className={H2}>2. Datos personales que recabamos</h2>
          <p className={BODY}>Dependiendo del producto o servicio que contrates, podemos recabar:</p>
          <ul className="mt-4 flex flex-col gap-2">
            <li className={LI}>Nombre y datos de contacto (WhatsApp, correo electrónico)</li>
            <li className={LI}>Nombre, dirección y horarios de tu negocio</li>
            <li className={LI}>Accesos a herramientas propias de tu negocio que nos compartas (ej. Google Business Profile), únicamente para prestar el servicio contratado</li>
            <li className={LI}>Logotipo, fotografías y textos que nos proporciones para tu proyecto</li>
            <li className={LI}>Para trámite de factura: tu Constancia de Situación Fiscal, correo de facturación, concepto y monto</li>
            <li className={LI}>Comprobantes de pago que nos envíes</li>
          </ul>

          <h2 className={H2}>3. Para qué usamos tus datos</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li className={LI}>Prestar el servicio o producto que contrataste</li>
            <li className={LI}>Contactarte para dar seguimiento a tu proyecto</li>
            <li className={LI}>Elaborar y enviar tu contrato de servicio</li>
            <li className={LI}>Tramitar tu factura cuando la solicitas</li>
            <li className={LI}>Darte soporte por WhatsApp o correo electrónico</li>
          </ul>

          <h2 className={H2}>4. Datos que no solicitamos</h2>
          <p className={BODY}>
            No solicitamos ni tratamos datos personales sensibles (origen étnico o racial, estado
            de salud, información genética, creencias religiosas, filosóficas o morales, afiliación
            sindical, opiniones políticas, preferencia sexual). Si alguna vez te los pidiéramos por
            error, no estás obligado a proporcionarlos.
          </p>

          <h2 className={H2}>5. Con quién compartimos tus datos</h2>
          <p className={BODY}>
            No vendemos tus datos personales. Los compartimos únicamente con los proveedores
            estrictamente necesarios para operar el servicio que contrataste — por ejemplo, Google
            (para configurar tu ficha de Google Business Profile), nuestro proveedor de hosting
            (Vercel) y, cuando aplique, la plataforma de firma electrónica que uses para firmar tu
            contrato. Ninguno de ellos puede usar tus datos para fines distintos a los aquí
            descritos.
          </p>

          <h2 className={H2}>6. Cookies y tecnologías de rastreo</h2>
          <p className={BODY}>
            Al día de esta actualización, este sitio no utiliza cookies de rastreo, píxeles
            publicitarios ni herramientas de analítica de terceros. Si eso cambia, actualizaremos
            este aviso antes de activarlas.
          </p>

          <h2 className={H2}>7. Tus derechos ARCO</h2>
          <p className={BODY}>
            Puedes Acceder a tus datos, Rectificarlos si están desactualizados o son inexactos,
            Cancelarlos, u Oponerte a su uso para fines específicos, escribiéndonos por WhatsApp al{" "}
            <a href={contactLink} target="_blank" rel="noopener noreferrer" className="text-[var(--pv-accent)] underline underline-offset-2">
              {WHATSAPP_DISPLAY}
            </a>. Responderemos tu solicitud en un plazo razonable.
          </p>

          <h2 className={H2}>8. Cambios a este aviso</h2>
          <p className={BODY}>
            Podemos actualizar este aviso cuando cambien nuestras prácticas de tratamiento de
            datos. La fecha al inicio de esta página siempre indica la versión vigente.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
