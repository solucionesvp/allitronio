"use client";

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { Trophy, Video, MessageCircleHeart, Star, Shuffle, Globe, NotebookPen, ShieldCheck, Crown } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/viesaine";

const HOY = [
  { cuenta: "Facebook · Elizabeth Montero", dato: "1.4 mil seguidores", nota: "Activo otra vez · 4 opiniones" },
  { cuenta: "Google · Centro Vie Saine", dato: "5.0 · 4 opiniones", nota: "La más reciente, de hace 5 años" },
  { cuenta: "Instagram · @centro_vie_saine", dato: "39 seguidores", nota: "Sin publicar desde junio de 2023" },
];

const COLEGAS = [
  { nombre: "Ángeles del Valle Clínica de Rehabilitación", dato: "4.7 · 193 opiniones" },
  { nombre: "Fisioterapia en Tepic · Volaré", dato: "4.9 · 63 opiniones" },
  { nombre: "Kinesio Sport Tepic", dato: "5.0 · 29 opiniones" },
  { nombre: "Fisioterapia Salud y Bienestar", dato: "5.0 · 7 opiniones" },
  { nombre: "Fisioterapia Centro Vie Saine (ustedes)", dato: "5.0 · 4 opiniones" },
  { nombre: "FLUSS Fisioterapia", dato: "5.0 · 4 opiniones" },
  { nombre: "Rehabi-Fi", dato: "5.0 · 3 opiniones" },
];

export default function LoQueVimosVieSainePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_VIESAINE} paso={2} titulo=<>Lo que vimos.</> escena="investigacion" mensaje="Las buscamos como lo haría un paciente nuevo. Esto fue lo que encontramos." />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Primero, lo que ya tienen">Una ventaja que casi nadie tiene.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Trophy} title="Primer lugar en Google" text="Al buscar “fisioterapia Tepic Nayarit”, Centro Vie Saine sale primero. En “rehabilitación física Tepic”, segundo." />
          <IconPoint icon={Video} title="Redes que volvieron a moverse" text="Clase de yoga en silla para adultos mayores, el testimonio en video de una paciente y explicaciones de magnetoterapia." delay={0.05} />
          <IconPoint icon={MessageCircleHeart} title="Gente que ya pregunta" text="En los comentarios hay personas escribiendo “Quiero” y “Ubicación”. Cada comentario así es una cita posible." delay={0.1} />
          <IconPoint icon={Star} title="Pacientes que las recomiendan" text="Las opiniones que tienen son de 5 estrellas: profesionalismo, limpieza y buen trato." delay={0.15} />
        </div>
        <div className="mt-10">
          <Highlight>Tienen el primer lugar con solo 4 opiniones de hace 5 años. Con opiniones nuevas y constantes, ese lugar se vuelve muy difícil de quitar.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Lo que hoy les cuesta pacientes">Cuatro cosas por resolver.</SectionTitle>
        <div className="grid gap-4">
          <IconPoint icon={Shuffle} tone="orange" title="1. Dos nombres distintos" text="En Google son “Centro Vie Saine”; en Facebook, “Elizabeth Montero - Rehabilitación Física”; en Instagram, otra vez Vie Saine. El paciente duda si es el mismo lugar." />
          <IconPoint icon={Globe} tone="orange" title="2. La página no abre" text="Su Facebook enlaza a fisioelizabethmontero.com, pero al revisarla el 27 de septiembre no cargaba. Google tampoco tiene una página a dónde mandar a la gente." delay={0.04} />
          <IconPoint icon={NotebookPen} tone="orange" title="3. Todo a mano" text="Llamadas, mensajes para confirmar, agenda en papel y en Google Calendar. Eso es tiempo de ustedes, y citas que se olvidan." delay={0.08} />
          <IconPoint icon={Star} tone="orange" title="4. Opiniones congeladas" text="Tienen pacientes contentos, pero la última opinión en Google es de hace 5 años. Nadie se las está pidiendo." delay={0.12} />
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

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El tema COFEPRIS">Se puede anunciar, con el trámite correcto.</SectionTitle>
        <IconPoint
          icon={ShieldCheck}
          tone="navy"
          title="Clínica y profesional no piden lo mismo"
          text="Anunciar una clínica o establecimiento de salud pide un permiso de publicidad, que tiene costo. Anunciar a una profesional de la salud pide un aviso de publicidad, que se presenta antes de publicar e incluye su cédula profesional. Por eso tuvo sentido mover las redes al nombre de Elizabeth."
        />
        <BigText className="mt-8">
          Nuestra recomendación: seguir anunciando a nombre de Elizabeth, con su aviso de publicidad presentado y su cédula visible en cada anuncio. Les ayudamos a preparar el trámite; lo confirman con su asesor antes de publicar.
        </BigText>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Con quién compiten en Google">Las clínicas que aparecen junto a ustedes.</SectionTitle>
        <Reveal>
          <div className="neu overflow-hidden rounded-[24px]">
            <div className="flex items-center gap-3 bg-allitron-navy px-6 py-4">
              <Star size={22} className="shrink-0 text-allitron-blue" />
              <p className="font-display text-[1.05rem] font-bold text-white">Búsquedas: “fisioterapia” y “rehabilitación física” en Tepic</p>
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
        <div className="mt-10">
          <IconPoint icon={Crown} title="La oportunidad" text="Casi todas tienen pocas opiniones. Quien junte más opiniones reales y tenga una página propia se queda con los primeros lugares. Ustedes ya van adelante." />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} nextHref={`${B}/plan`} nextLabel="Siguiente: El plan" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[720px] font-body text-[0.85rem] leading-[1.7] text-muted">
          Fuentes: Facebook, Instagram y Google Maps públicos, revisados el 27 de septiembre de 2026. La información sobre COFEPRIS es orientativa; confírmenla con su asesor.
        </p>
        <p className="mx-auto mt-3 max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
