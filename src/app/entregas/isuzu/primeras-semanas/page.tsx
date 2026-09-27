"use client";

import { KeyRound, MapPin, Hammer, FlaskConical, Rocket, TrendingUp, Flag } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";
import { DocHero, BigText, SectionTitle, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

// Supuesto: firma y anticipo a más tardar el viernes 2 de octubre de 2026.
const SEMANAS = [
  {
    n: 1,
    fechas: "5 al 9 de octubre",
    icon: KeyRound,
    titulo: "Arranque y llaves",
    puntos: [
      "Reunión de arranque con usted, Alfonso y la persona que aprobará los cambios.",
      "Lista de todas las cuentas: quién es dueño y quién tiene la contraseña.",
      "Datos oficiales de cada agencia: dirección, teléfono y horario.",
    ],
  },
  {
    n: 2,
    fechas: "12 al 16 de octubre",
    icon: MapPin,
    titulo: "Google en orden",
    puntos: [
      "Las cuatro fichas de Google Maps corregidas y a nombre de la empresa.",
      "Respuesta a todas las opiniones que hoy están sin contestar.",
      "Medimos el punto de partida: así sabremos cuánto crecemos.",
    ],
  },
  {
    n: 3,
    fechas: "19 al 23 de octubre",
    icon: Hammer,
    titulo: "Construcción",
    puntos: [
      "La web con una página para cada ciudad.",
      "El tablero donde llegan todos los prospectos.",
      "Fotos y video reales en la agencia de Tepic.",
    ],
  },
  {
    n: 4,
    fechas: "26 al 30 de octubre",
    icon: FlaskConical,
    titulo: "Pruebas",
    puntos: [
      "Probamos todo como si fuéramos un cliente, en las cuatro ciudades.",
      "Una hora de capacitación para Alfonso y los asesores.",
      "Usted aprueba anuncios y web antes de salir.",
    ],
  },
  {
    n: 5,
    fechas: "2 al 6 de noviembre",
    icon: Rocket,
    titulo: "Arranca la temporada",
    puntos: [
      "Anuncios encendidos en Tepic, Culiacán, Mazatlán y La Paz.",
      "La web publicada y conectada a Google y a las redes.",
      "Volvemos a contactar a quienes ya habían preguntado.",
    ],
  },
  {
    n: 6,
    fechas: "9 al 13 de noviembre",
    icon: TrendingUp,
    titulo: "Primer ajuste",
    puntos: [
      "Apagamos lo que no trae buenos prospectos y subimos lo que sí.",
      "Revisamos qué tan rápido responde cada agencia.",
      "Le entregamos el primer reporte, en una sola hoja.",
    ],
  },
];

export default function PrimerasSemanasIsuzuPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <Breadcrumbs hubHref="/entregas/isuzu" hubLabel="Inicio" current="Las primeras 6 semanas" />

      <DocHero
        eyebrow="PARTE 5 DE 6"
        title={<>Las primeras 6 semanas.</>}
        subtitle="Semana por semana, lo que va a pasar desde que empezamos hasta el primer reporte."
        logo={
          <OptionalImage
            src={BRAND_LOGO.light}
            alt="Allitron"
            style={{ height: 26, width: "auto" }}
            fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>}
          />
        }
      />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La meta de este arranque">Anuncios encendidos el 2 de noviembre.</SectionTitle>
        <BigText className="mb-10">Cuatro semanas para ordenar y construir. A partir de la quinta, a vender.</BigText>

        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-4 left-[31px] top-4 w-[3px] rounded-full bg-[#101820]/10 sm:left-[35px]" />
          <div className="flex flex-col gap-6">
            {SEMANAS.map((s, i) => {
              const Icon = s.icon;
              const venta = s.n >= 5;
              return (
                <Reveal key={s.n} delay={0.05 * i}>
                  <div className="relative flex gap-5 sm:gap-6">
                    <div
                      className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_20px_rgba(3,64,88,0.2)] sm:h-[72px] sm:w-[72px] ${
                        venta ? "bg-allitron-orange" : "bg-allitron-blue"
                      }`}
                    >
                      <Icon size={30} />
                    </div>
                    <div className="neu min-w-0 flex-1 rounded-[22px] p-6 sm:p-7">
                      <p className="font-display text-[0.85rem] font-bold uppercase tracking-[0.12em] text-allitron-navy">
                        Semana {s.n} · {s.fechas}
                      </p>
                      <h3 className="mt-1 font-display text-[1.4rem] font-black text-[#101820] sm:text-[1.6rem]">{s.titulo}</h3>
                      <ul className="mt-4 space-y-3">
                        {s.puntos.map((p) => (
                          <li key={p} className="flex items-start gap-3 font-body text-[1.08rem] leading-[1.6] text-[#101820] sm:text-[1.12rem]">
                            <span className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-allitron-blue" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-12">
          <div className="flex items-start gap-4 rounded-[22px] bg-allitron-navy p-7 sm:p-9">
            <Flag size={30} className="mt-1 shrink-0 text-allitron-blue" />
            <div>
              <p className="font-display text-[1.3rem] font-black text-white">Para cumplir estas fechas necesitamos de su lado:</p>
              <p className="mt-3 font-body text-[1.1rem] leading-[1.75] text-white/90">
                Las contraseñas o saber quién las tiene, los lineamientos de Isuzu México, una persona que apruebe en uno o dos días, y el dinero de anuncios listo antes del 2 de noviembre.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <Highlight>Las fechas cuentan desde que se firma. Si empezamos una semana después, todo se recorre una semana.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/isuzu" nextHref="/entregas/isuzu/cotizacion" nextLabel="Siguiente: Cuánto cuesta" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
