"use client";

import { PASOS_ISUZU } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import {
  KeyRound,
  MapPin,
  Globe,
  Megaphone,
  Camera,
  LayoutDashboard,
  RefreshCcw,
  TrendingUp,
  Target,
  Star,
  Handshake,
  Users,
  CalendarDays,
  CircleCheck,
  BadgeCheck,
} from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const LINEA = [
  { cuando: "Octubre", que: "Arranque", texto: "Llaves, fichas de Google, web base y campaña lista.", tone: "bg-allitron-navy" },
  { cuando: "Noviembre · Diciembre · Enero", que: "Temporada de venta", texto: "Campaña por ciudad activa, prospectos al tablero, seguimiento diario.", tone: "bg-allitron-blue" },
  { cuando: "Febrero · Marzo · Abril", que: "Afinar y crecer", texto: "Más de lo que vende, menos de lo que no.", tone: "bg-allitron-orange" },
];

const FASE0 = [
  { icon: KeyRound, title: "Recuperar las llaves", text: "Que Facebook, Instagram, Google Maps, la web y los números queden a nombre de la empresa. Sin borrar nada: primero inventario, luego traspaso ordenado." },
  { icon: MapPin, title: "Una sola cara en Google, en las 4 agencias", text: "Con nuestro servicio Domina Google: nombre, dirección, teléfono, horario y categoría correctos, fotos reales y respuesta a cada opinión." },
  { icon: Globe, title: "Una casa digital", text: "Una web de Isuzu con página para cada ciudad y cada modelo. El cliente elige “¿qué agencia le queda más cerca?” y le escribe al WhatsApp correcto." },
  { icon: Megaphone, title: "Campaña de temporada, por ciudad", text: "Anuncios para quien trabaja con camión: reparto, campo, construcción, turismo. Antes de llegar al asesor, el cliente contesta cuatro preguntas: ciudad, unidad, para cuándo compra y cómo pagaría." },
  { icon: Camera, title: "Redes con rumbo", text: "Mismo nombre y misma imagen en las cuatro. Contenido real de cada agencia: entregas, clientes, taller y asesores, siempre dentro de los lineamientos de Isuzu México." },
  { icon: LayoutDashboard, title: "Un solo tablero de prospectos", text: "Adiós al Excel. Cada prospecto llega a un tablero, avisa al asesor y queda registrado: si se atendió, si se cotizó, si se vendió y, si no, por qué." },
  { icon: RefreshCcw, title: "Recuperar lo que ya se pagó", text: "Volver a contactar a quienes ya preguntaron, cuidando su privacidad, y una encuesta corta para saber por qué no compraron." },
];

const ENTREGABLES0 = [
  "Las 4 fichas de Google a nombre de la empresa y corregidas.",
  "Redes de las 4 agencias con el mismo nombre, la misma imagen y datos correctos.",
  "Web con página por ciudad y botón directo al WhatsApp de cada agencia.",
  "Campaña de temporada corrida y medida, ciudad por ciudad.",
  "Tablero de prospectos funcionando para todo el equipo.",
  "Primer reporte: cuántos prospectos llegaron, cuántos eran buenos y cuántos compraron.",
];

const FASE1 = [
  { icon: TrendingUp, title: "Más de lo que vende", text: "Con los números de la temporada, subimos lo que trae ventas y apagamos lo que no." },
  { icon: Target, title: "Prospectos cada vez mejores", text: "Ajustamos preguntas y anuncios para que llegue gente con intención real de comprar." },
  { icon: Star, title: "Más opiniones, más confianza", text: "Un sistema sencillo para pedir su opinión a cada cliente contento, en las cuatro ciudades." },
  { icon: Handshake, title: "La respuesta a “el chino es más barato”", text: "Contenido con números: costo de operar, lo que dura, refacciones, taller y casos reales de sus clientes." },
  { icon: Users, title: "Seguimiento que no se olvida", text: "Recordatorios automáticos por etapa, y conexión con el nuevo sistema de Isuzu México cuando esté listo." },
  { icon: CalendarDays, title: "Un reporte cada mes", text: "En una hoja y fácil de leer: inversión, prospectos, citas, cotizaciones y ventas por agencia." },
];

const NECESITAMOS = [
  "Los accesos actuales, o saber quién los tiene.",
  "El manual y los lineamientos vigentes de Isuzu México.",
  "Los datos oficiales de cada agencia: dirección, teléfono, horario y responsable.",
  "Una persona de su lado que apruebe, para avanzar rápido.",
  "El presupuesto de anuncios, que va aparte de nuestros honorarios.",
];

export default function PlanIsuzuPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_ISUZU} paso={3} titulo=<>El plan: Fase 0 y Fase 1.</> escena="plan" mensaje="Así vamos a trabajar: primero vender y, al mismo tiempo, ordenar." />

      {/* Objetivos */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Dos objetivos, en este orden">Primero, vender. Al mismo tiempo, ordenar.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Target} tone="orange" title="Objetivo 1 · Prospectos que sí compran" text="Llevar a sus asesores clientes con intención real de compra, para vender en noviembre, diciembre y enero." />
          <IconPoint icon={BadgeCheck} title="Objetivo 2 · Una sola Isuzu en cuatro ciudades" text="Homologar Google, redes y web: mismos datos, misma imagen, y cada cliente llega a la agencia correcta." delay={0.05} />
        </div>
        <div className="mt-10">
          <Highlight>No vamos a ordenar primero y vender después. La temporada no espera: las dos cosas arrancan juntas.</Highlight>
        </div>
      </SectionShell>

      {/* Línea de tiempo */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El calendario">Siete meses, en tres momentos.</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {LINEA.map((l, i) => (
            <Reveal key={l.que} delay={0.08 * i}>
              <div className="neu h-full overflow-hidden rounded-[22px]">
                <div className={`${l.tone} px-6 py-4`}>
                  <p className="font-display text-[0.9rem] font-semibold text-white/85">{l.cuando}</p>
                  <p className="font-display text-[1.35rem] font-black text-white">{l.que}</p>
                </div>
                <p className="p-6 font-body text-[1.08rem] leading-[1.65] text-[#101820]">{l.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 font-body text-[1rem] text-secondary">Fase 0: octubre 2026 a enero 2027. Fase 1: febrero a abril 2027.</p>
      </SectionShell>

      {/* Fase 0 */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Fase 0 · Octubre a enero">Ordenar y vender.</SectionTitle>
        <BigText className="mb-8">Siete tareas que corren juntas. Todas apuntan a lo mismo: que el cliente los encuentre, les escriba y reciba respuesta.</BigText>
        <div className="grid gap-4 lg:grid-cols-2">
          {FASE0.map((f, i) => (
            <IconPoint key={f.title} icon={f.icon} title={`${i + 1}. ${f.title}`} text={f.text} delay={0.04 * i} />
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-[26px] bg-allitron-navy p-7 sm:p-10">
            <p className="font-display text-[1.35rem] font-black text-white sm:text-[1.6rem]">Al terminar la Fase 0, usted tendrá:</p>
            <ul className="mt-6 space-y-4">
              {ENTREGABLES0.map((e) => (
                <li key={e} className="flex items-start gap-4 font-body text-[1.1rem] leading-[1.6] text-white">
                  <CircleCheck size={26} className="mt-0.5 shrink-0 text-allitron-blue" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </SectionShell>

      {/* Fase 1 */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Fase 1 · Febrero a abril">Afinar y crecer.</SectionTitle>
        <BigText className="mb-8">Con los números reales de la temporada, dejamos de adivinar. Nos quedamos con lo que vende y lo hacemos crecer.</BigText>
        <div className="grid gap-4 lg:grid-cols-2">
          {FASE1.map((f, i) => (
            <IconPoint key={f.title} icon={f.icon} tone="orange" title={f.title} text={f.text} delay={0.04 * i} />
          ))}
        </div>
      </SectionShell>

      {/* Necesitamos + compromiso */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Para arrancar">Lo que necesitamos de ustedes.</SectionTitle>
        <div className="grid gap-3">
          {NECESITAMOS.map((n, i) => (
            <Reveal key={n} delay={0.04 * i}>
              <div className="neu flex items-start gap-4 rounded-[18px] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-allitron-blue font-display text-[1rem] font-bold text-white">{i + 1}</span>
                <p className="font-body text-[1.1rem] leading-[1.6] text-[#101820]">{n}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Highlight>No prometemos ventas exactas ni el primer lugar en Google. Sí prometemos orden, trabajo cada semana y números claros cada mes.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/isuzu" nextHref="/entregas/isuzu/meta" nextLabel="Siguiente: A dónde queremos llegar" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
