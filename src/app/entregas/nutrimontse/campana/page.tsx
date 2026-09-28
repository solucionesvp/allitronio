"use client";

import { PASOS_NUTRIMONTSE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { Gift, MessagesSquare, MapPin, Megaphone, Star, ShieldCheck, Target } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/nutrimontse";

const PILARES = [
  { icon: Gift, title: "Una oferta clara", text: "Un programa con nombre, qué incluye, cuánto dura y cómo se empieza. Lo definimos contigo en la primera semana: presencial y en línea." },
  { icon: MessagesSquare, title: "Un WhatsApp que sí contesta", text: "Número que funcione, mensaje de bienvenida, respuestas rápidas con precio y proceso, y un solo paso para agendar." },
  { icon: MapPin, title: "Google que te recomienda", text: "Tu ficha completa: fotos del consultorio, servicios, horario, enlace para agendar y un sistema para pedir opiniones a tus pacientes." },
  { icon: Megaphone, title: "Anuncios por etapa", text: "Primero te descubren por un dolor real, luego entienden cómo trabajas, y al final reciben la invitación a agendar. Cada anuncio tiene un trabajo." },
  { icon: Star, title: "Seguimiento y confianza", text: "Recordatorio de cita, seguimiento a quien preguntó y no agendó, y opiniones de pacientes reales cada mes." },
];

const CAMINO = [
  "Ve un anuncio que habla de lo que le pasa.",
  "Se identifica y te escribe por WhatsApp.",
  "Recibe respuesta rápida: cómo trabajas y cuánto cuesta.",
  "Agenda su primera consulta.",
  "Llega, vive la consulta y sigue en su programa.",
  "Deja su opinión en Google y te recomienda.",
];

const MESES = [
  { mes: "Octubre", foco: "Arranque", texto: "Oferta lista, WhatsApp y Google en orden, primeros anuncios: “haces todo bien y tu cuerpo no responde”.", seis: false },
  { mes: "Noviembre", foco: "Buen Fin", texto: "Una promoción de temporada para tu primera consulta o tu programa. Llegar a diciembre sin culpa.", seis: false },
  { mes: "Diciembre", foco: "Aparta enero", texto: "Preventa: quien aparta en diciembre asegura su lugar en enero. Y un regalo de salud para alguien que quieres.", seis: false },
  { mes: "Enero", foco: "Temporada alta", texto: "El mes en que más gente decide cuidarse. Anuncios con más fuerza, agenda llena y lista de espera.", seis: false },
  { mes: "Febrero", foco: "Autocuidado", texto: "Pacientes de enero que continúan, recomendaciones y opiniones. Anuncios para quien no alcanzó lugar.", seis: true },
  { mes: "Marzo", foco: "Rumbo a primavera", texto: "Afinamos lo que más vende y preparamos la siguiente temporada con números reales.", seis: true },
];

export default function CampanaNutriMontsePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_NUTRIMONTSE} paso={3} titulo=<>La campaña.</> escena="plan" mensaje="No es contenido por contenido: así se ve una campaña que vende." />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El objetivo comercial">Más pacientes nuevas cada mes, y un enero con agenda llena.</SectionTitle>
        <IconPoint icon={Target} tone="orange" title="Todo lo que hagamos responde a una pregunta" text="¿Esto trae citas? Si una pieza no ayuda a que alguien te conozca, confíe en ti o agende, no la hacemos." />
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo lo vamos a lograr">Cinco piezas que trabajan juntas.</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          {PILARES.map((p, i) => (
            <IconPoint key={p.title} icon={p.icon} title={`${i + 1}. ${p.title}`} text={p.text} delay={0.04 * i} />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El camino de tu paciente">De ver un anuncio a recomendarte.</SectionTitle>
        <div className="grid gap-3">
          {CAMINO.map((c, i) => (
            <Reveal key={c} delay={0.04 * i}>
              <div className="neu flex items-start gap-4 rounded-[18px] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-allitron-blue font-display text-[1rem] font-bold text-white">{i + 1}</span>
                <p className="font-body text-[1.1rem] leading-[1.6] text-[#101820]">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Highlight>Hoy ese camino se rompe en el paso 2. Lo primero que arreglamos es que quien te escribe, te encuentre.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El calendario comercial">Cada mes, una razón para agendar.</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {MESES.map((m, i) => (
            <Reveal key={m.mes} delay={0.04 * i}>
              <div className="neu h-full overflow-hidden rounded-[22px]">
                <div className={`flex flex-wrap items-center justify-between gap-2 px-6 py-4 ${m.seis ? "bg-allitron-orange" : "bg-allitron-blue"}`}>
                  <p className="font-display text-[1.3rem] font-black text-white">{m.mes}</p>
                  <p className="font-display text-[0.9rem] font-bold text-white/90">{m.foco}</p>
                </div>
                <p className="p-6 font-body text-[1.08rem] leading-[1.65] text-[#101820]">{m.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 font-body text-[1rem] text-secondary">En azul: campaña de octubre a enero. En naranja: los dos meses extra de la campaña de 6 meses.</p>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Las reglas que cuidamos">Anuncios de salud, hechos con responsabilidad.</SectionTitle>
        <IconPoint
          icon={ShieldCheck}
          tone="navy"
          title="Sin promesas de kilos ni fotos de antes y después"
          text="Facebook e Instagram no permiten anuncios que supongan la condición de salud de quien los ve. Hablamos de lo que “muchas mujeres viven”, con tu cédula profesional visible y sin prometer resultados."
        />
        <BigText className="mt-8">Tú apruebas cada anuncio antes de que salga.</BigText>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} nextHref={`${B}/objetivos`} nextLabel="Siguiente: Los objetivos" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
