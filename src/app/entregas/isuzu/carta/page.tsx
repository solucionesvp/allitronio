"use client";

import { PASOS_ISUZU } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigPageNav } from "@/components/entregas/LecturaUI";

const PARRAFOS = [
  "Gracias por abrirnos la puerta de Isuzu y por la confianza de recibir esta propuesta.",
  "Estos días buscamos sus cuatro agencias como lo haría un cliente: en Google, en Facebook, por WhatsApp. Encontramos una marca fuerte. En el primer semestre de 2026, Isuzu vendió 18.7% más en el país, mientras el mercado de camiones cayó casi 22%.",
  "También vimos lo que frena la venta en casa. La dirección de Tepic aparece distinta según dónde se busque. En Mazatlán, Google los presenta como “agencia de alquiler de camiones”. Hay clientes que escriben para preguntar un precio y se quedan esperando respuesta. Y las marcas chinas ya están a unos minutos de sus agencias en Tepic, Culiacán y La Paz.",
  "No falta producto, ni gente con ganas de vender. Falta un camino claro entre el cliente y el vendedor. Eso se puede arreglar.",
  "Noviembre, diciembre y enero son meses para vender. Queremos llegar a ellos juntos, con un plan sencillo, paso por paso.",
];

const DATOS = [
  { valor: "+18.7%", texto: "Isuzu en México, primer semestre 2026" },
  { valor: "−21.8%", texto: "Mercado de camiones pesados, mismo periodo" },
  { valor: "4 de 4", texto: "Agencias con datos distintos o incompletos en Google" },
];

export default function CartaIsuzuPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_ISUZU} paso={1} titulo=<>Una carta para usted.</> escena="carta" mensaje="Antes de los números, una carta. Empiece aquí." />

      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <article className="mx-auto max-w-[760px] rounded-[28px] bg-white p-8 shadow-[0_24px_60px_rgba(16,24,32,0.10)] sm:p-14">
            <p className="font-body text-[1rem] text-secondary">Tepic, Nayarit · septiembre de 2026</p>
            <p className="mt-8 font-display text-[1.45rem] font-bold text-[#101820] sm:text-[1.6rem]">
              Ing. Alejandro Valdés:
            </p>
            <div className="mt-6 space-y-6">
              {PARRAFOS.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="font-body text-[1.2rem] leading-[1.9] text-[#101820] sm:text-[1.3rem]">{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-5 border-t border-[#101820]/10 pt-8">
              <OptionalImage src={BRAND_ALLI.primary} alt="" style={{ height: 64, width: "auto" }} fallback={null} />
              <div>
                <p className="font-body text-[1.1rem] text-secondary">Con respeto y agradecimiento,</p>
                <p className="mt-1 font-display text-[1.3rem] font-black text-[#101820]">Equipo Allitron</p>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[760px] gap-4 sm:grid-cols-3">
          {DATOS.map((d, i) => (
            <Reveal key={d.valor} delay={0.08 * i}>
              <div className="neu h-full rounded-[20px] p-6 text-center">
                <p className="font-display text-[2rem] font-black text-allitron-navy">{d.valor}</p>
                <p className="mt-2 font-body text-[1rem] leading-[1.5] text-secondary">{d.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-[760px] text-center font-body text-[0.85rem] text-secondary/80">
          Cifras nacionales de ANPACT publicadas por Revista TyT (julio 2026). Datos de Google Maps revisados el 26 de septiembre de 2026.
        </p>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/isuzu" nextHref="/entregas/isuzu/lo-que-vimos" nextLabel="Siguiente: Lo que vimos" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
