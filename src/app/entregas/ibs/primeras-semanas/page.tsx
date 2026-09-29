"use client";

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { KeyRound, MapPin, Hammer, FlaskConical, Rocket, TrendingUp, Flag } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

// Supuesto: firma y primer pago a más tardar el viernes 9 de octubre de 2026.
const SEMANAS = [
  {
    n: 1,
    fechas: "12 al 16 de octubre",
    icon: KeyRound,
    titulo: "Arranque y llaves",
    puntos: [
      "Reunión de arranque con usted, Ricardo y la persona que aprobará los cambios.",
      "Lista de todas las cuentas: quién es dueño y quién tiene la contraseña.",
      "Definimos juntos el nombre de la agencia y el dominio, según los lineamientos de Shineray.",
    ],
  },
  {
    n: 2,
    fechas: "19 al 23 de octubre",
    icon: MapPin,
    titulo: "Aparecer en Google",
    puntos: [
      "Alta de Shineray Tepic y Shineray Puerto Vallarta en Google Maps.",
      "Facebook, Instagram, TikTok y WhatsApp con el nombre, el logo y los datos correctos.",
      "Medimos el punto de partida: así sabremos cuánto crecemos.",
    ],
  },
  {
    n: 3,
    fechas: "26 al 30 de octubre",
    icon: Hammer,
    titulo: "Construcción",
    puntos: [
      "La web oficial, con una página para cada plaza.",
      "El tablero donde llegan todos los prospectos.",
      "Fotos y video reales en Tepic, con Ricardo y las unidades trabajando.",
    ],
  },
  {
    n: 4,
    fechas: "3 al 6 de noviembre",
    icon: FlaskConical,
    titulo: "Pruebas",
    puntos: [
      "Probamos todo como si fuéramos un cliente, en las dos plazas.",
      "Una hora de capacitación para los asesores en el tablero.",
      "Usted aprueba anuncios y web antes de salir.",
    ],
  },
  {
    n: 5,
    fechas: "9 al 13 de noviembre",
    icon: Rocket,
    titulo: "Arranca la venta",
    puntos: [
      "Anuncios encendidos en Tepic y en Puerto Vallarta.",
      "La web publicada y conectada a Google y a las redes.",
      "Invitación a pruebas de manejo para negocios de cada plaza.",
    ],
  },
  {
    n: 6,
    fechas: "16 al 20 de noviembre",
    icon: TrendingUp,
    titulo: "Primer ajuste",
    puntos: [
      "Apagamos lo que no trae buenos prospectos y subimos lo que sí.",
      "Revisamos qué tan rápido se responde en cada plaza.",
      "Le entregamos el primer reporte, en una sola hoja.",
    ],
  },
];

export default function PrimerasSemanasIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={5} titulo=<>Las primeras 6 semanas.</> escena="calendario" mensaje="Semana por semana, para que sepa qué pasa y cuándo." />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La meta de este arranque">Anuncios encendidos la semana del 9 de noviembre.</SectionTitle>
        <BigText className="mb-10">Cuatro semanas para ordenar y construir. A partir de la quinta, a vender, con tiempo antes de diciembre.</BigText>

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
                Las contraseñas o saber quién las tiene, los datos oficiales de cada plaza, el material de Shineray México, una persona que apruebe en uno o dos días y el dinero de anuncios listo antes del 9 de noviembre.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <Highlight>Las fechas cuentan desde que se firma. Google puede tardar algunos días en verificar una ficha nueva; si pasa, lo avisamos y seguimos con lo demás.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/ibs" nextHref="/entregas/ibs/cotizacion" nextLabel="Siguiente: Cuánto cuesta" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
