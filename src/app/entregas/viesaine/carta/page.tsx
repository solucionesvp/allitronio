"use client";

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_ALLI } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/viesaine";

const PARRAFOS = [
  "Gracias por abrirnos la puerta y por la confianza de recibir esta propuesta.",
  "Revisamos su Facebook, su Instagram, su ficha de Google y a las clínicas que hoy compiten con ustedes en Tepic. Encontramos algo que pocas tienen: cuando alguien busca “fisioterapia en Tepic”, Google las muestra en primer lugar. Y lo logran con solo cuatro opiniones, escritas hace cinco años. Imaginen lo que puede pasar con treinta.",
  "También vimos lo que les ha costado: tuvieron que borrar su página y pausar sus redes por el tema de COFEPRIS. Hoy su Facebook vuelve a moverse, con la clase de yoga en silla, el testimonio de una paciente y personas escribiendo “Quiero” en los comentarios. Pero la agenda, las llamadas y las confirmaciones siguen saliendo a mano, de su tiempo.",
  "Queremos ayudarles a dos cosas: que más pacientes las encuentren y agenden, cuidando las reglas de COFEPRIS, y que las citas se confirmen solas, para que ustedes se dediquen a lo que mejor hacen: rehabilitar.",
];

export default function CartaVieSainePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_VIESAINE} paso={1} titulo=<>Una carta para ustedes.</> escena="carta" mensaje="Antes de todo, una carta para ustedes." />
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <article className="mx-auto max-w-[760px] rounded-[28px] bg-white p-8 shadow-[0_24px_60px_rgba(16,24,32,0.10)] sm:p-14">
            <p className="font-body text-[1rem] text-secondary">Tepic, Nayarit · septiembre de 2026</p>
            <p className="mt-8 font-display text-[1.45rem] font-bold text-[#101820] sm:text-[1.6rem]">Patricia y Elizabeth:</p>
            <div className="mt-6 space-y-6">
              {PARRAFOS.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="font-body text-[1.15rem] leading-[1.9] text-[#101820] sm:text-[1.25rem]">{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-5 border-t border-[#101820]/10 pt-8">
              <OptionalImage src={BRAND_ALLI.primary} alt="" style={{ height: 64, width: "auto" }} fallback={null} />
              <div>
                <p className="font-body text-[1.1rem] text-secondary">Con gusto y compromiso,</p>
                <p className="mt-1 font-display text-[1.3rem] font-black text-[#101820]">Equipo Allitron</p>
              </div>
            </div>
          </article>
        </Reveal>
      </SectionShell>
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} nextHref={`${B}/lo-que-vimos`} nextLabel="Siguiente: Lo que vimos" />
      </SectionShell>
      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
