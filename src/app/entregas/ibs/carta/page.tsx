"use client";

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigPageNav } from "@/components/entregas/LecturaUI";

const PARRAFOS = [
  "Gracias por la confianza de recibir esta propuesta, y por todo lo que han construido para traer Shineray a Tepic y a Puerto Vallarta.",
  "Lo difícil ya se hizo: las plazas otorgadas, los locales abiertos, la empresa dada de alta y un crédito Banorte colocado en la venta de un vehículo Shineray. Eso no lo tiene cualquier distribuidor.",
  "Estos días buscamos a Shineray como lo haría un cliente. En Google Maps, Shineray Tepic y Shineray Puerto Vallarta todavía no aparecen. Mientras tanto, en las dos plazas JAC está a unos metros, y en la misma avenida de Tepic están Nissan, Renault, Chevrolet, Ford y Toyota, con cientos de opiniones cada una.",
  "El cliente ya está dispuesto a comprar una marca china: casi tres de cada diez autos nuevos que se venden en México ya lo son. Lo que necesita es encontrarlos, confiar y subirse a la unidad.",
  "Shineray va a lanzar su marca en todo el país de enero a mayo. Nuestra propuesta es que IBS llegue a ese momento lista: fácil de encontrar, igual en todos lados, como pide planta, y con cada prospecto registrado hasta la venta.",
];

const DATOS = [
  { valor: "0 de 2", texto: "Plazas de IBS que aparecen hoy en Google Maps" },
  { valor: "≈ 3 de 10", texto: "Autos nuevos vendidos en México que ya son de marca china" },
  { valor: "Ene–May", texto: "Lanzamiento nacional de la marca anunciado por Shineray" },
];

export default function CartaIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={1} titulo=<>Una carta para usted.</> escena="carta" mensaje="Antes de los números, una carta. Empiece aquí, Ingeniero." />

      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <article className="mx-auto max-w-[760px] rounded-[28px] bg-white p-8 shadow-[0_24px_60px_rgba(16,24,32,0.10)] sm:p-14">
            <p className="font-body text-[1rem] text-secondary">Tepic, Nayarit · septiembre de 2026</p>
            <p className="mt-8 font-display text-[1.45rem] font-bold text-[#101820] sm:text-[1.6rem]">
              Ing. José Talavera del Río:
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
          Google Maps revisado el 28 de septiembre de 2026. Participación china: MotorManía con datos de INEGI, enero a agosto de 2026. Lanzamiento nacional: lo expuesto por Shineray en la reunión del 25 de agosto de 2026.
        </p>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/ibs" nextHref="/entregas/ibs/lo-que-vimos" nextLabel="Siguiente: Lo que vimos" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
