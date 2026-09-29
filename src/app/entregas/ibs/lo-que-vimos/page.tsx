"use client";

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { Search, Globe, MessageCircle, UserRound, PhoneOff, TrendingUp, Landmark, ShieldAlert, CreditCard, FileWarning, MapPinOff, BadgePercent } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, CityCard, BigPageNav } from "@/components/entregas/LecturaUI";

const RECORRIDO = [
  { icon: Search, title: "Busca “Shineray Tepic” en Google", text: "Google Maps no lo encuentra. Aparecen JAC, Nissan y las demás agencias de la avenida." },
  { icon: Globe, title: "Entra a la web de Shineray México", text: "Tepic y Puerto Vallarta sí están en la lista de distribuidores, pero sin dirección, sin teléfono y sin WhatsApp." },
  { icon: MessageCircle, title: "Busca la página de Facebook", text: "Shineray SWM Tepic tiene 59 seguidores, cero opiniones y ningún dato de contacto en su información." },
  { icon: UserRound, title: "Llega con Ricardo", text: "Su perfil es hoy el que más gente alcanza: 1.9 mil seguidores. Ahí sí preguntan. Pero ese contacto no queda registrado a nombre de IBS." },
  { icon: PhoneOff, title: "Nadie sabe cómo terminó", text: "Sin un registro único, no se puede saber cuántos preguntaron, cuántos se subieron a una unidad y por qué no compraron." },
];

const CIUDADES = [
  {
    ciudad: "Tepic",
    estado: "Nayarit · Insurgentes 1032",
    isuzu: "Todavía no existe una ficha de Shineray Tepic. La liga que se comparte hoy es un punto de Street View, no una agencia: no tiene nombre, teléfono, horario ni opiniones.",
    alerta: "Quien busca “Shineray Tepic” en Google Maps no encuentra nada.",
    rivales: [
      { nombre: "JAC Tepic (china)", dato: "4.5 · 51 opiniones · Insurgentes 1025, enfrente" },
      { nombre: "Nissan Tepic", dato: "4.4 · 960 opiniones · paga anuncio en Maps" },
      { nombre: "Renault Tepic", dato: "4.9 · 889 opiniones" },
      { nombre: "Chevrolet Tepic", dato: "4.4 · 628 opiniones" },
      { nombre: "Ford Tepic", dato: "4.4 · 516 opiniones" },
      { nombre: "FOTON Nayarit (china)", dato: "4.8 · 5 opiniones · camión" },
    ],
    contexto: "Es la avenida de los autos en Tepic. El cliente que busca una camioneta de trabajo pasa frente a Shineray, pero en el celular solo ve a los demás.",
    oportunidad: "Aparecer en Google con fotos reales, opiniones y un botón de WhatsApp. Estar enfrente de JAC es una ventaja si el cliente puede comparar las dos en una sola vuelta.",
  },
  {
    ciudad: "Puerto Vallarta",
    estado: "Jalisco · Carretera a Tepic 5663A",
    isuzu: "Tampoco hay ficha. La liga que se comparte es la dirección de la carretera, no una agencia.",
    alerta: "Quien busca “Shineray Puerto Vallarta” en Google Maps no encuentra nada.",
    rivales: [
      { nombre: "JAC Puerto Vallarta (china)", dato: "3.3 · 74 opiniones · Carretera 5747, a unos metros" },
    ],
    contexto: "Vallarta vive del turismo y de los servicios: hoteles, restaurantes, lavanderías, agua, mantenimiento, reparto. Todos mueven carga todos los días. Y la promoción de Shineray de septiembre sí incluye Jalisco.",
    oportunidad: "JAC tiene una calificación baja. Hay clientes buscando una marca china con buena atención y servicio cerca. Shineray puede ser esa respuesta desde el primer día.",
  },
];

const REDES = [
  { cuenta: "Facebook · Shineray SWM Tepic", dato: "59 seguidores", nota: "Sin teléfono, dirección ni opiniones" },
  { cuenta: "Facebook · Ricardo Vivanco", dato: "1.9 mil seguidores", nota: "Perfil personal; promueve las unidades" },
  { cuenta: "Facebook · Shineray México (planta)", dato: "958 seguidores", nota: "La marca apenas empieza a crecer en redes" },
  { cuenta: "Web · ibluesky.ai", dato: "Provisional", nota: "Todavía sin modelos, contacto ni aviso de privacidad" },
  { cuenta: "Web · shineraymexico.mx", dato: "12 distribuidores", nota: "Tepic y Vallarta sin datos de contacto" },
  { cuenta: "Ojo · “Shineray SWM” (59 mil)", dato: "Es de Chile", nota: "No es la página de Shineray México" },
];

export default function LoQueVimosIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={2} titulo=<>Lo que vimos.</> escena="investigacion" mensaje="Buscamos a Shineray como lo haría un cliente. Esto fue lo que encontramos." />

      {/* 1. La buena noticia */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Primero, la buena noticia">El mercado ya está listo. Falta que los encuentre.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={TrendingUp} title="Las marcas chinas ya se venden" text="Casi tres de cada diez autos nuevos vendidos en México entre enero y agosto de 2026 son de marca china." />
          <IconPoint icon={Landmark} tone="navy" title="IBS tiene respaldo real" text="Experiencia automotriz, un crédito Banorte ya colocado en un Shineray y una marca que anunció centro de refacciones, capacitación y lanzamiento nacional." delay={0.05} />
        </div>
        <div className="mt-10">
          <Highlight>El problema no es la unidad ni el precio. Es el camino entre el cliente que la necesita y el asesor que la vende.</Highlight>
        </div>
      </SectionShell>

      {/* 2. Recorrido */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Así busca hoy un cliente">Cinco pasos, y en cada uno se pierde alguien.</SectionTitle>
        <div className="grid gap-4">
          {RECORRIDO.map((r, i) => (
            <IconPoint key={r.title} icon={r.icon} title={`${i + 1}. ${r.title}`} text={r.text} tone={i === RECORRIDO.length - 1 ? "orange" : "blue"} delay={0.04 * i} />
          ))}
        </div>
      </SectionShell>

      {/* 3. Plaza por plaza */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Plaza por plaza">Quién compite por sus clientes, a unos metros de cada agencia.</SectionTitle>
        <div className="grid gap-6 lg:grid-cols-2">
          {CIUDADES.map((c, i) => (
            <CityCard key={c.ciudad} marca="Shineray" {...c} delay={0.05 * i} />
          ))}
        </div>
        <Reveal className="mt-6">
          <div className="neu rounded-[22px] p-6 sm:p-7">
            <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.12em] text-allitron-navy">Guadalajara · entrada desde Tepic</p>
            <p className="mt-2 font-body text-[1.08rem] leading-[1.65] text-[#101820]">
              La ubicación está por confirmar. En la zona ya hay otros dos distribuidores de Shineray (Zapopan y López Mateos), y el de Zapopan tampoco tiene teléfono, horario ni opiniones en Google. Dejamos todo listo para sumar esta plaza cuando se confirme.
            </p>
          </div>
        </Reveal>
        <p className="mt-6 font-body text-[0.9rem] leading-[1.6] text-secondary/80">
          Calificaciones y opiniones tomadas de Google Maps el 28 de septiembre de 2026. Pueden cambiar con el tiempo.
        </p>
      </SectionShell>

      {/* 4. Redes y web */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo se comunican hoy">Hay ganas y hay producto. Falta una sola casa.</SectionTitle>
        <BigText>
          Hoy la voz más fuerte es la de Ricardo, y eso vale mucho. Pero la página de la agencia casi no tiene seguidores, la web es provisional y la marca en México apenas empieza en redes. El cliente no tiene un lugar oficial dónde ver modelos, pedir una prueba de manejo y escribirle a la agencia correcta.
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
      </SectionShell>

      {/* 5. Lo que frena */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="En resumen">Lo que hoy frena la venta.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={MapPinOff} tone="orange" title="No los encuentran" text="Sin ficha en Google y sin datos de contacto en la web de planta ni en Facebook. El cliente se va con quien sí aparece." />
          <IconPoint icon={ShieldAlert} tone="orange" title="La duda de lo chino" text="Muchos clientes desconfían por malas experiencias con otras marcas. Se vence subiéndolos a la unidad, con pruebas de carga, casos reales y servicio cerca." delay={0.05} />
          <IconPoint icon={CreditCard} tone="orange" title="El crédito se complica" text="Pagar por adelantado el seguro de tres años puede costar más que el enganche, y eso frena al cliente. Hay que explicar bien cada opción de pago." delay={0.1} />
          <IconPoint icon={FileWarning} tone="navy" title="Las reglas de Shineray" text="Planta pide nombre, logo, colores, legales y dominio específicos. Hoy la página de Tepic no cumple todo, y un error se puede leer como incumplimiento." delay={0.15} />
        </div>
        <div className="mt-8">
          <IconPoint icon={BadgePercent} title="Y una novedad a favor" text="La promoción de Shineray de septiembre (enganche desde 10% y tasa desde 13.49%) incluye Jalisco. Hay que confirmar con planta si Nayarit entra en las siguientes, para anunciarlas en las dos plazas." />
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/ibs" nextHref="/entregas/ibs/plan" nextLabel="Siguiente: El plan" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[720px] font-body text-[0.85rem] leading-[1.7] text-muted">
          Fuentes: Google Maps, Facebook y shineraymexico.mx públicos (28 sep 2026); MotorManía con datos de INEGI (ene–ago 2026); Lineamientos de Marketing Digital Shineray México 2026; promoción Shineray septiembre 2026; minuta de estrategia comercial IBS (31 jul 2026); reunión Shineray–IBS (25 ago 2026).
        </p>
        <p className="mx-auto mt-3 max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
