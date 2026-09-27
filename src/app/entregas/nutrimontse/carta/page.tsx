"use client";

import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";
import { DocHero, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/nutrimontse";

const PARRAFOS = [
  "Gracias por dejarnos conocer tu trabajo y por la confianza de recibir esta propuesta.",
  "Revisamos tus redes, tu ficha de Google y a las nutriólogas que hoy compiten contigo en Tepic. Encontramos algo valioso: no hablas de dietas, hablas de ir a la raíz. Hormonas, digestión, sueño, estrés. Tu publicación “¿Has probado mil dietas y no logras tus objetivos?” es la que más respuesta ha tenido. El mensaje funciona.",
  "También encontramos por dónde se están yendo las pacientes. Hace unos días, una persona escribió en esa misma publicación que no lograba comunicarse a tu WhatsApp. Tu ficha de Google existe, pero no tiene opiniones ni fotos, y cuando alguien busca “nutrióloga en Tepic” aparecen otras colegas con más de 150 opiniones.",
  "Y vimos una oportunidad: en Tepic nadie se ha adueñado de la nutrición funcional y hormonal. Ese lugar puede ser tuyo.",
  "Enero es el mes en que más personas deciden cuidarse. Queremos que, cuando llegue, ya te conozcan, confíen en ti y tengan claro cómo agendar contigo.",
];

export default function CartaNutriMontsePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <Breadcrumbs hubHref={B} hubLabel="Inicio" current="Una carta para ti" />
      <DocHero
        eyebrow="PARTE 1 DE 6"
        title={<>Una carta para ti.</>}
        logo={<OptionalImage src={BRAND_LOGO.light} alt="Allitron" style={{ height: 26, width: "auto" }} fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>} />}
      />
      <SectionShell className="bg-[var(--color-light)]">
        <Reveal>
          <article className="mx-auto max-w-[760px] rounded-[28px] bg-white p-8 shadow-[0_24px_60px_rgba(16,24,32,0.10)] sm:p-14">
            <p className="font-body text-[1rem] text-secondary">Tepic, Nayarit · septiembre de 2026</p>
            <p className="mt-8 font-display text-[1.45rem] font-bold text-[#101820] sm:text-[1.6rem]">Montse:</p>
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
