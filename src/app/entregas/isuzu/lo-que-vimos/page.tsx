"use client";

import { PASOS_ISUZU } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { Search, MessageCircle, Mail, Sheet, PhoneOff, TrendingUp, TrendingDown, Tag, ShieldAlert, Unplug, Truck } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import {
  BigText,
  SectionTitle,
  IconPoint,
  Highlight,
  CityCard,
  BigPageNav,
} from "@/components/entregas/LecturaUI";

const RECORRIDO = [
  { icon: Search, title: "Busca en Google", text: "Encuentra direcciones y teléfonos distintos para la misma agencia." },
  { icon: MessageCircle, title: "Escribe por Facebook", text: "Lo primero que pregunta es el precio. Muchas veces no hay respuesta rápida." },
  { icon: Mail, title: "Su dato llega por correo", text: "Planta o Facebook lo envían; se copia a mano en un Excel." },
  { icon: Sheet, title: "Se reparte a un asesor", text: "Una sola persona filtra y reparte los prospectos de las cuatro agencias." },
  { icon: PhoneOff, title: "Nadie sabe cómo terminó", text: "Para saber si se atendió, hay que preguntar uno por uno." },
];

const CIUDADES = [
  {
    ciudad: "Tepic",
    estado: "Nayarit",
    isuzu: "4.3 estrellas con 52 opiniones. Al buscar “concesionario de camiones Tepic”, Isuzu sale primero.",
    alerta: "La ficha no está reclamada por la agencia, y la dirección cambia: 3669 en un sitio, 3969 en otro.",
    rivales: [
      { nombre: "FOTON Nayarit (china)", dato: "4.8 · 5 opiniones · mismo libramiento" },
      { nombre: "JAC Tepic (china)", dato: "4.5 · 51 opiniones" },
      { nombre: "HINO Camiones Selectos", dato: "4.2 · 17 opiniones" },
    ],
    contexto: "Hay opiniones de clientes que dicen que llamaron o escribieron por WhatsApp y no les contestaron.",
    oportunidad: "Ser el primer resultado ya es suyo. Falta que quien llega encuentre una respuesta rápida.",
  },
  {
    ciudad: "Culiacán",
    estado: "Sinaloa",
    isuzu: "4.3 estrellas con 84 opiniones. Es la ficha con más movimiento de las cuatro.",
    alerta: "Una opinión visible dice que no contestan ni dan seguimiento a la cotización.",
    rivales: [
      { nombre: "CAPASA International", dato: "4.5 · 272 opiniones" },
      { nombre: "Velocity", dato: "4.5 · 161 opiniones" },
      { nombre: "Camiones HINO", dato: "4.7 · 45 opiniones" },
      { nombre: "FOTON Culiacán (china)", dato: "5.0 · 14 opiniones" },
      { nombre: "Norden (VW camiones)", dato: "paga anuncio en Google Maps" },
    ],
    contexto: "Es la plaza más competida. La inseguridad ha pegado a la economía: según prensa local, 192 negocios cerraron en Culiacán en 2026. A favor: arranca el ciclo agrícola otoño-invierno, con más de 800 mil hectáreas proyectadas para siembra en Sinaloa.",
    oportunidad: "Competir por confianza y por respuesta, no por precio. El productor y el repartidor necesitan camión esta temporada.",
  },
  {
    ciudad: "Mazatlán",
    estado: "Sinaloa",
    isuzu: "4.5 estrellas, pero solo 8 opiniones.",
    alerta: "Google la tiene como “agencia de alquiler de camiones”. Al buscar “concesionario de camiones Mazatlán”, Isuzu aparece hasta el lugar 10.",
    rivales: [
      { nombre: "CAPASA International", dato: "4.5 · 65 opiniones" },
      { nombre: "Mercedes-Benz Carga", dato: "4.3 · 65 opiniones" },
      { nombre: "Kenworth Sinaloense", dato: "4.4 · 49 opiniones" },
      { nombre: "Velocity", dato: "4.6 · 11 opiniones" },
    ],
    contexto: "Según opiniones de sus propios clientes en Google, JAC cerró su agencia en Mazatlán y los dejó sin servicio.",
    oportunidad: "Hay dueños de camión ligero buscando a quién comprarle y quién les dé servicio. Con la ficha corregida, Isuzu puede ser esa respuesta.",
  },
  {
    ciudad: "La Paz",
    estado: "Baja California Sur",
    isuzu: "4.8 estrellas con 16 opiniones: la mejor calificación de las cuatro.",
    alerta: "La ficha se llama solo “ISUZU” y Google la clasifica como concesionario de automóviles, no de camiones.",
    rivales: [
      { nombre: "Kenworth del Noroeste", dato: "4.7 · 30 opiniones" },
      { nombre: "CAPASA International", dato: "4.6 · 30 opiniones" },
      { nombre: "Foton La Paz (china)", dato: "5.0 · 5 opiniones" },
    ],
    contexto: "Su propio equipo ve aquí la mayor oportunidad. En Google aparece un solo rival directo de camión ligero: Foton.",
    oportunidad: "Buena reputación y poca visibilidad. Es la plaza donde se puede crecer más rápido.",
  },
];

const REDES = [
  { cuenta: "Facebook · Isuzu Nayarit", dato: "1.4 mil seguidores", nota: "“Aún sin calificación”" },
  { cuenta: "Facebook · Isuzu Sinaloa", dato: "1,852 seguidores", nota: "Una sola página para Culiacán y Mazatlán" },
  { cuenta: "Facebook · Isuzu Baja Sur", dato: "Más de 1.5 mil", nota: "Acceso por confirmar" },
  { cuenta: "Instagram · @isuzunayarit", dato: "49 seguidores", nota: "277 publicaciones" },
  { cuenta: "Instagram · @isuzusinaloa_", dato: "36 seguidores", nota: "Con actividad reciente" },
];

export default function LoQueVimosIsuzuPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_ISUZU} paso={2} titulo=<>Lo que vimos.</> escena="investigacion" mensaje="Buscamos sus agencias como lo haría un cliente. Esto fue lo que encontramos." />

      {/* 1. La marca está bien */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Primero, la buena noticia">La marca está bien. El reto está en casa.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={TrendingUp} title="Isuzu vende más en México" text="+18.7% en el primer semestre de 2026: 1,363 unidades en el país." />
          <IconPoint icon={TrendingDown} tone="navy" title="El mercado va hacia abajo" text="La venta de camiones pesados cayó 21.8% en el mismo periodo." delay={0.05} />
        </div>
        <div className="mt-10">
          <Highlight>Si la marca crece y las agencias no, el problema no es el camión. Es el camino entre el cliente y el vendedor.</Highlight>
        </div>
      </SectionShell>

      {/* 2. Recorrido del cliente */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Así llega hoy un cliente">Cinco pasos, y en cada uno se pierde alguien.</SectionTitle>
        <div className="grid gap-4">
          {RECORRIDO.map((r, i) => (
            <IconPoint key={r.title} icon={r.icon} title={`${i + 1}. ${r.title}`} text={r.text} tone={i === RECORRIDO.length - 1 ? "orange" : "blue"} delay={0.04 * i} />
          ))}
        </div>
        <div className="mt-8">
          <BigText>En la muestra que revisamos juntos en la reunión, los prospectos que llegaron por Facebook en agosto no terminaron en ninguna venta.</BigText>
        </div>
      </SectionShell>

      {/* 3. Ciudad por ciudad */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Ciudad por ciudad">Quién compite por sus clientes, a unos minutos de cada agencia.</SectionTitle>
        <div className="grid gap-6 lg:grid-cols-2">
          {CIUDADES.map((c, i) => (
            <CityCard key={c.ciudad} {...c} delay={0.05 * i} />
          ))}
        </div>
        <p className="mt-6 font-body text-[0.9rem] leading-[1.6] text-secondary/80">
          Calificaciones y número de opiniones tomados de Google Maps el 26 de septiembre de 2026. Pueden cambiar con el tiempo.
        </p>
      </SectionShell>

      {/* 4. Comunicación actual */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo se comunican hoy">Había un camino de marca. Faltaba un camino de venta.</SectionTitle>
        <BigText>
          Las redes sí tienen una línea: diseños rojo y blanco de Isuzu, fotos de producto y frases como “Rinde más y gasta menos”. Se publica con constancia. Pero casi no aparecen los clientes, las ciudades, el taller ni la gente de cada agencia. Y no queda claro a quién escribir.
        </BigText>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REDES.map((r, i) => (
            <Reveal key={r.cuenta} delay={0.04 * i}>
              <div className="neu h-full rounded-[18px] p-5">
                <p className="font-display text-[0.95rem] font-bold text-[#101820]">{r.cuenta}</p>
                <p className="mt-2 font-display text-[1.5rem] font-black text-allitron-navy">{r.dato}</p>
                <p className="mt-1 font-body text-[0.98rem] text-secondary">{r.nota}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Highlight>277 publicaciones y 49 seguidores en Instagram: se trabaja, pero no se está convirtiendo en clientes.</Highlight>
        </div>
      </SectionShell>

      {/* 5. Lo que frena la venta */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="En resumen">Lo que hoy frena la venta.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Tag} tone="orange" title="La pregunta del precio" text="Las marcas chinas llegaron con precios bajos. Hoy nadie le explica al cliente cuánto cuesta operar, cuánto dura y qué respaldo tiene un Isuzu." />
          <IconPoint icon={Unplug} tone="orange" title="Datos que no coinciden" text="Direcciones, teléfonos y nombres distintos en cada sitio. El cliente duda, y Google también." delay={0.05} />
          <IconPoint icon={PhoneOff} tone="orange" title="Respuesta lenta" text="Prospectos que preguntan y se quedan esperando. Ese cliente se va con el de enfrente." delay={0.1} />
          <IconPoint icon={ShieldAlert} tone="navy" title="Un entorno difícil" text="Mercado nacional a la baja y, en Sinaloa, una economía golpeada por la inseguridad." delay={0.15} />
        </div>
        <div className="mt-8">
          <IconPoint icon={Truck} title="Y una novedad a favor" text="En julio Isuzu lanzó en México su primera pickup, la D-MAX, pensada para trabajo. Si sus agencias la tienen, es un producto nuevo para anunciar esta temporada." />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/isuzu" nextHref="/entregas/isuzu/plan" nextLabel="Siguiente: El plan" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[720px] font-body text-[0.85rem] leading-[1.7] text-muted">
          Fuentes: ANPACT vía Revista TyT (julio 2026); Expansión (julio 2026); Google Maps, Facebook e Instagram públicos (26 sep 2026); prensa local de Sinaloa (2026); reunión de diagnóstico del 26 de septiembre de 2026.
        </p>
        <p className="mx-auto mt-3 max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
