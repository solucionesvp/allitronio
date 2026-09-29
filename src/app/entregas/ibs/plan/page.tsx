"use client";

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import {
  KeyRound,
  MapPin,
  Globe,
  Megaphone,
  LayoutDashboard,
  UserRound,
  Truck,
  TrendingUp,
  Target,
  Star,
  Handshake,
  CalendarDays,
  CircleCheck,
  BadgeCheck,
  Building2,
  FileText,
} from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const LINEA = [
  { cuando: "Octubre · inicio de noviembre", que: "Cimientos", texto: "Nombre y cuentas en orden, Google, web, tablero y campaña lista.", tone: "bg-allitron-navy" },
  { cuando: "Noviembre · Diciembre · Enero", que: "Primera temporada de venta", texto: "Anuncios por plaza, pruebas de manejo y cada prospecto registrado.", tone: "bg-allitron-blue" },
  { cuando: "Febrero · Marzo", que: "Listos para el lanzamiento", texto: "Casos reales, opiniones y todo alineado al lanzamiento nacional de Shineray.", tone: "bg-allitron-orange" },
];

const FASE0 = [
  { icon: KeyRound, title: "Un solo nombre y las llaves", text: "Definir con ustedes el nombre de la agencia y usarlo igual en todos lados, como pide Shineray: “Shineray, distribuidor y plaza”. Todas las cuentas quedan a nombre de IBS." },
  { icon: MapPin, title: "Aparecer en Google", text: "Con nuestro servicio Domina Google damos de alta Shineray Tepic y Shineray Puerto Vallarta: dirección, teléfono, horario, fotos reales, botón de WhatsApp y respuesta a cada opinión." },
  { icon: Globe, title: "La web oficial de la agencia", text: "Con dominio de Shineray, como pide planta. Modelos, servicio, promociones, flotillas y nosotros, una página por plaza, aviso de privacidad y el WhatsApp correcto." },
  { icon: BadgeCheck, title: "Redes como pide Shineray", text: "Facebook, Instagram, TikTok y WhatsApp Business con el logo blanco sobre rojo, el nombre correcto, datos de contacto, catálogo y los legales en cada oferta." },
  { icon: Megaphone, title: "Campaña para quien trabaja", text: "Anuncios por plaza para quien vive de mover carga: reparto, construcción, abarrotes, agua, carpintería, instalaciones, hoteles y servicios. El objetivo es una cita o una prueba de manejo." },
  { icon: LayoutDashboard, title: "Un solo tablero de prospectos", text: "Cada mensaje de Google, la web, Facebook o Ricardo llega al mismo lugar y avisa al asesor. Se ve si se atendió, si hubo prueba de manejo, si el crédito va en trámite, si se vendió y, si no, por qué." },
  { icon: UserRound, title: "Ricardo al frente", text: "Lo ponemos en los videos de la marca, como sugiere Shineray: asesores explicando cada unidad. Su perfil sigue siendo suyo y sus prospectos entran al tablero para darles seguimiento." },
  { icon: Truck, title: "Que se suban a la unidad", text: "Pruebas de manejo y de carga, demostraciones y unidades en exhibición en lugares con mucha gente, si ustedes lo autorizan. La confianza en una marca nueva se gana en persona." },
];

const ENTREGABLES0 = [
  "Shineray Tepic y Shineray Puerto Vallarta en Google Maps, a nombre de IBS.",
  "Redes y WhatsApp con el nombre, el logo y los datos que pide Shineray.",
  "Web oficial con una página por plaza y botón directo a WhatsApp.",
  "Campaña de temporada corriendo y medida, plaza por plaza.",
  "Tablero de prospectos funcionando para todo el equipo de ventas.",
  "Primer reporte: cuántos prospectos, cuántas pruebas de manejo, cuántas ventas.",
];

const FASE1 = [
  { icon: TrendingUp, title: "Más de lo que vende", text: "Con los números de la temporada, subimos lo que trae ventas y apagamos lo que no." },
  { icon: Handshake, title: "Casos reales de clientes", text: "Videos con clientes que ya trabajan con su Shineray. Es la mejor respuesta a la duda de lo chino." },
  { icon: Star, title: "Más opiniones, más confianza", text: "Un sistema sencillo para pedir su opinión a cada cliente contento, en las dos plazas." },
  { icon: Target, title: "Listos para el lanzamiento nacional", text: "Cuando Shineray active su campaña en todo el país, los interesados de la región llegan a la agencia correcta y a un asesor que responde." },
  { icon: Building2, title: "Guadalajara, cuando esté confirmada", text: "Su ficha, su página y su campaña se suman al mismo sistema, sin empezar de cero." },
  { icon: CalendarDays, title: "Un reporte cada mes", text: "En una hoja: inversión, prospectos, pruebas de manejo, créditos y ventas por plaza. Útil también para los reportes que pide Shineray." },
];

const NECESITAMOS = [
  "Los accesos actuales, o saber quién los tiene.",
  "Los datos oficiales de cada plaza: dirección, teléfono, horario y responsable.",
  "El material de Shineray México (fotos, videos, fichas técnicas) y el contacto de su área de marketing.",
  "Una persona de su lado que apruebe, para avanzar rápido.",
  "El presupuesto de anuncios, que va aparte de nuestros honorarios.",
];

export default function PlanIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={3} titulo=<>El plan.</> escena="plan" mensaje="Así vamos a trabajar: vender desde noviembre y, al mismo tiempo, ordenar todo como pide Shineray." />

      {/* Objetivos */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Dos objetivos, al mismo tiempo">Vender. Y ser una sola Shineray.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Target} tone="orange" title="Objetivo 1 · Prospectos que sí compran" text="Llevar a los asesores clientes que usan un vehículo para trabajar, hasta una cita y una prueba de manejo." />
          <IconPoint icon={BadgeCheck} title="Objetivo 2 · Homologar como pide planta" text="Mismo nombre, misma imagen y mismos datos en Google, redes y web, dentro de los lineamientos de Shineray México." delay={0.05} />
        </div>
        <div className="mt-10">
          <Highlight>No vamos a ordenar primero y vender después. Las dos cosas arrancan juntas.</Highlight>
        </div>
      </SectionShell>

      {/* Línea de tiempo */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El calendario">Seis meses, en tres momentos.</SectionTitle>
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
        <p className="mt-5 font-body text-[1rem] text-secondary">Fase 0: octubre 2026 a enero 2027. Fase 1: febrero y marzo 2027.</p>
      </SectionShell>

      {/* Fase 0 */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Fase 0 · Octubre a enero">Ordenar y vender.</SectionTitle>
        <BigText className="mb-8">Ocho tareas que corren juntas. Todas apuntan a lo mismo: que el cliente los encuentre, les escriba, se suba a la unidad y reciba respuesta.</BigText>
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
        <SectionTitle kicker="Fase 1 · Febrero y marzo">Afinar y prepararse para crecer.</SectionTitle>
        <BigText className="mb-8">Con los números reales de la temporada, dejamos de adivinar. Y llegamos al lanzamiento nacional de Shineray con casos, opiniones y un equipo que responde.</BigText>
        <div className="grid gap-4 lg:grid-cols-2">
          {FASE1.map((f, i) => (
            <IconPoint key={f.title} icon={f.icon} tone="orange" title={f.title} text={f.text} delay={0.04 * i} />
          ))}
        </div>
      </SectionShell>

      {/* Reglas de Shineray */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Siempre dentro de las reglas">Lo que Shineray pide, lo cuidamos nosotros.</SectionTitle>
        <IconPoint
          icon={FileText}
          tone="navy"
          title="Lineamientos de Marketing Digital 2026"
          text="Solo modelos autorizados para México, logo arriba y completo, colores rojo, blanco y negro, legales en cada oferta, nombre correcto de la agencia y dominio con el nombre de Shineray. Lo que requiera autorización, como un rotulado, se envía antes al área de marketing de planta."
        />
      </SectionShell>

      {/* Necesitamos */}
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
        <BigPageNav backHref="/entregas/ibs" nextHref="/entregas/ibs/meta" nextLabel="Siguiente: A dónde queremos llegar" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
