"use client";

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { ShieldCheck, BadgeCheck, Globe, Megaphone, CalendarCheck, Star, BellRing, HeartHandshake, Accessibility, Dumbbell, Bone, Target, Users } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/viesaine";

const PILARES = [
  { icon: ShieldCheck, title: "Anunciar tranquilas", text: "Todo a nombre de Elizabeth, con aviso de publicidad presentado y cédula visible. Cada anuncio se revisa antes de salir." },
  { icon: BadgeCheck, title: "Un solo nombre en todos lados", text: "Google, Facebook, Instagram y la web con el mismo nombre, teléfono, dirección y fotos. Que nadie dude si es el mismo lugar." },
  { icon: Globe, title: "Una página que sí abre", text: "Página propia con sus servicios, ubicación, opiniones y botón a WhatsApp. Si ya alguien la está haciendo, nos coordinamos para no duplicar." },
  { icon: Megaphone, title: "Anuncios por dolor, no por aparato", text: "La gente no busca “magnetoterapia”: busca que le deje de doler la espalda. Cada campaña habla de un problema real y termina en una cita." },
  { icon: CalendarCheck, title: "Una agenda que se confirma sola", text: "Las citas quedan en un calendario, el paciente recibe su recordatorio por WhatsApp un día antes y confirma con un botón." },
  { icon: Star, title: "Opiniones cada semana", text: "Al terminar su tratamiento, cada paciente recibe un mensaje para dejar su opinión en Google. Así se cuida el primer lugar." },
];

const AGENDA = [
  "El paciente escribe o llama y se agenda su cita.",
  "La cita queda en un solo calendario, visible para las dos.",
  "Un día antes le llega un recordatorio por WhatsApp.",
  "Confirma o cambia su cita con un botón.",
  "Al terminar su tratamiento, recibe la invitación a dejar su opinión.",
  "Si deja de venir, recibe un mensaje para retomar sus sesiones.",
];

const SEGMENTOS = [
  { icon: Bone, title: "Dolor de espalda, cuello y rodilla", text: "El dolor de todos los días que no deja trabajar ni dormir." },
  { icon: HeartHandshake, title: "Después de una operación", text: "Recuperarse bien después de una cirugía o una fractura." },
  { icon: Accessibility, title: "Adultos mayores", text: "Movilidad, equilibrio y yoga en silla. Muchas veces decide un hijo o una hija." },
  { icon: Dumbbell, title: "Lesiones deportivas", text: "Esguinces y lesiones de quien entrena o juega." },
];

const MESES = [
  { mes: "Octubre", foco: "Arranque", texto: "Nombre homologado, aviso de publicidad, agenda automática y primeros anuncios: dolor de espalda y rodilla.", seis: false },
  { mes: "Noviembre", foco: "Buen Fin", texto: "Paquete de sesiones de temporada. Recuperar a pacientes que dejaron su tratamiento a medias.", seis: false },
  { mes: "Diciembre", foco: "Regala movilidad", texto: "Tarjeta de regalo de sesiones para papás y abuelos. Clases especiales de yoga en silla.", seis: false },
  { mes: "Enero", foco: "Nuevo año, sin dolor", texto: "Temporada de propósitos y de volver al ejercicio: anuncios para lesiones y dolor.", seis: false },
  { mes: "Febrero", foco: "Continuidad", texto: "Paquetes para terminar el tratamiento completo. Opiniones y recomendaciones de pacientes.", seis: true },
  { mes: "Marzo", foco: "Afinar y crecer", texto: "Nos quedamos con lo que trajo más citas y preparamos la siguiente temporada con números reales.", seis: true },
];

export default function PlanVieSainePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_VIESAINE} paso={3} titulo=<>El plan.</> escena="plan" mensaje="Una campaña que trae pacientes y una agenda que se confirma sola." />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Dos objetivos">Más pacientes nuevos. Menos trabajo a mano.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Target} tone="orange" title="Objetivo 1 · Pacientes nuevos cada mes" text="Una campaña comercial con objetivo, calendario y medición: cada pieza tiene que traer citas." />
          <IconPoint icon={Users} title="Objetivo 2 · Recuperar su tiempo" text="Que confirmar, recordar y pedir opiniones deje de depender de que ustedes marquen una por una." delay={0.05} />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo lo vamos a lograr">Seis piezas que trabajan juntas.</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          {PILARES.map((p, i) => (
            <IconPoint key={p.title} icon={p.icon} title={`${i + 1}. ${p.title}`} text={p.text} delay={0.04 * i} />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La agenda que se confirma sola">Así funciona, sin que ustedes marquen.</SectionTitle>
        <div className="grid gap-3">
          {AGENDA.map((c, i) => (
            <Reveal key={c} delay={0.04 * i}>
              <div className="neu flex items-start gap-4 rounded-[18px] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-allitron-blue font-display text-[1rem] font-bold text-white">{i + 1}</span>
                <p className="font-body text-[1.1rem] leading-[1.6] text-[#101820]">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <IconPoint icon={BellRing} tone="navy" title="Menos citas olvidadas" text="Un recordatorio a tiempo evita huecos en la agenda. Y cada hueco que se llena es una sesión que sí se cobra." />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="A quién le hablamos">Cuatro tipos de paciente, cuatro campañas.</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {SEGMENTOS.map((s, i) => (
            <IconPoint key={s.title} icon={s.icon} tone="orange" title={s.title} text={s.text} delay={0.04 * i} />
          ))}
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
        <p className="mt-5 font-body text-[1rem] text-secondary">En azul: octubre a enero. En naranja: los dos meses extra de la opción de 6 meses.</p>
        <div className="mt-10">
          <Highlight>Ustedes aprueban cada anuncio antes de que salga, y nada se publica sin cumplir las reglas de COFEPRIS.</Highlight>
        </div>
        <BigText className="mt-8">Si hoy alguien más les lleva las redes, nos coordinamos: su trabajo de contenido puede seguir, y nosotros nos enfocamos en campaña, Google, página y agenda.</BigText>
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
