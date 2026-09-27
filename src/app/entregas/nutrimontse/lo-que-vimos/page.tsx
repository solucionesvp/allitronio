"use client";

import { Sprout, Heart, PhoneOff, MapPinOff, CalendarX, Tag, Phone, Star, Crown } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";
import { DocHero, BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/nutrimontse";

const HOY = [
  { cuenta: "Instagram · @nutrimontse.mx", dato: "342 seguidores", nota: "8 publicaciones en año y medio" },
  { cuenta: "Facebook · Nutrióloga Montse Ibarra", dato: "107 seguidores", nota: "“Aún sin calificación”" },
  { cuenta: "Google Maps", dato: "0 opiniones", nota: "Sin fotos ni sitio web" },
];

const COLEGAS = [
  { nombre: "Nutrióloga Ana Zúñiga", dato: "5.0 · 159 opiniones" },
  { nombre: "Nutriólogo Oscar Rivera", dato: "5.0 · 159 opiniones" },
  { nombre: "Nutrióloga Vanessa Hernández", dato: "4.9 · 34 opiniones" },
  { nombre: "Pamela Navarro Nutrición", dato: "5.0 · 24 opiniones" },
  { nombre: "Nutrióloga Materno-Infantil Nayely Lara", dato: "4.8 · 18 opiniones" },
  { nombre: "Body & Grace Nutrition Care", dato: "5.0 · 12 opiniones" },
  { nombre: "Nutrición Bariátrica y Diabetes · Melissa Jaime", dato: "5.0 · 9 opiniones" },
];

export default function LoQueVimosNutriMontsePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <Breadcrumbs hubHref={B} hubLabel="Inicio" current="Lo que vimos" />
      <DocHero
        eyebrow="PARTE 2 DE 6"
        title={<>Lo que vimos.</>}
        subtitle="Te buscamos como lo haría una paciente nueva en Tepic. Esto fue lo que encontramos."
        logo={<OptionalImage src={BRAND_LOGO.light} alt="Allitron" style={{ height: 26, width: "auto" }} fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>} />}
      />

      {/* Lo bueno */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Primero, lo que ya tienes">Un mensaje distinto, que ya conecta.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Sprout} title="Nutrición funcional, desde la raíz" text="Hormonas, digestión, sueño y estrés. Sin dietas extremas ni culpa. Casi nadie en Tepic lo dice así." />
          <IconPoint icon={Heart} title="Tu mejor publicación lo demuestra" text="“¿Has probado mil dietas y no logras tus objetivos?”: 41 reacciones, 6 comentarios y 5 veces compartida, con botón directo a WhatsApp." delay={0.05} />
        </div>
        <div className="mt-10">
          <Highlight>Cuando hay un mensaje claro y un botón para agendar, la gente responde. Eso es lo que vamos a multiplicar.</Highlight>
        </div>
      </SectionShell>

      {/* Fugas */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Por dónde se van las pacientes">Cuatro fugas que hoy te cuestan citas.</SectionTitle>
        <div className="grid gap-4">
          <IconPoint icon={PhoneOff} tone="orange" title="1. El WhatsApp no conecta" text="En tu publicación más vista, una persona escribió que no lograba comunicarse a tu WhatsApp y preguntó si había otro número. Esa persona quería agendar." />
          <IconPoint icon={MapPinOff} tone="orange" title="2. Google no te recomienda" text="Tu ficha existe, pero sin opiniones, fotos ni sitio web. Al buscar “nutriólogo Tepic”, no apareces entre los primeros ocho resultados." delay={0.04} />
          <IconPoint icon={CalendarX} tone="orange" title="3. Presencia intermitente" text="Ocho publicaciones desde abril de 2025, con meses sin publicar. Quien te descubre no ve actividad reciente." delay={0.08} />
          <IconPoint icon={Tag} tone="orange" title="4. No se ve qué ofreces ni cómo empezar" text="No hay un programa con nombre, qué incluye, cuánto dura ni el paso siguiente. La paciente tiene que preguntar todo." delay={0.12} />
          <IconPoint icon={Phone} tone="navy" title="Un detalle a revisar" text="Tu número es lada 33 (Guadalajara) y tu consultorio está en Tepic. Hay que confirmar que funcione bien para llamadas y WhatsApp locales." delay={0.16} />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {HOY.map((r, i) => (
            <Reveal key={r.cuenta} delay={0.04 * i}>
              <div className="neu h-full rounded-[18px] p-5">
                <p className="font-display text-[0.95rem] font-bold text-[#101820]">{r.cuenta}</p>
                <p className="mt-2 font-display text-[1.5rem] font-black text-allitron-navy">{r.dato}</p>
                <p className="mt-1 font-body text-[0.98rem] text-secondary">{r.nota}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* Competencia */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Con quién compites en Google">Las colegas que hoy aparecen cuando alguien busca en Tepic.</SectionTitle>
        <Reveal>
          <div className="neu overflow-hidden rounded-[24px]">
            <div className="flex items-center gap-3 bg-allitron-navy px-6 py-4">
              <Star size={22} className="shrink-0 text-allitron-blue" />
              <p className="font-display text-[1.05rem] font-bold text-white">Búsqueda: “nutriólogo Tepic Nayarit”</p>
            </div>
            <ul className="divide-y divide-[#101820]/[0.07] px-6">
              {COLEGAS.map((c) => (
                <li key={c.nombre} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 font-body text-[1.05rem]">
                  <span className="font-semibold text-[#101820]">{c.nombre}</span>
                  <span className="text-secondary">{c.dato}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <BigText className="mt-8">
          En Tepic, la primera consulta cuesta alrededor de $350 a $400. Casi todas compiten por lo mismo: control de peso y dieta personalizada. Cuando alguien busca “nutrióloga funcional Tepic”, aparecen las mismas nutriólogas generales. Nadie ocupa ese lugar todavía.
        </BigText>
        <div className="mt-10">
          <IconPoint icon={Crown} title="La oportunidad" text="Ser la nutrióloga de Tepic para mujeres que “hacen todo bien y su cuerpo no responde”: hormonas, digestión e inflamación. No competir por la dieta más barata, sino por ser la que sí va a la raíz." />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} nextHref={`${B}/campana`} nextLabel="Siguiente: La campaña" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[720px] font-body text-[0.85rem] leading-[1.7] text-muted">
          Fuentes: Instagram y Facebook públicos, Google Maps y Doctoralia, revisados el 26 de septiembre de 2026.
        </p>
        <p className="mx-auto mt-3 max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
