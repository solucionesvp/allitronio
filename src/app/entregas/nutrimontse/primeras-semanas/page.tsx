"use client";

import { ClipboardCheck, MapPin, Camera, Rocket, Flag } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";
import { DocHero, BigText, SectionTitle, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/nutrimontse";

// Supuesto: firma y anticipo a más tardar el viernes 2 de octubre de 2026.
const SEMANAS = [
  {
    n: 1, fechas: "5 al 9 de octubre", icon: ClipboardCheck, titulo: "Diagnóstico y oferta",
    puntos: [
      "Sesión contigo: cuántas citas tienes hoy, cuántas puedes atender y qué paciente quieres.",
      "Definimos tu programa: nombre, qué incluye, duración y precio, presencial y en línea.",
      "Revisamos y arreglamos tu WhatsApp: número, bienvenida, respuestas rápidas y cómo agendar.",
    ],
  },
  {
    n: 2, fechas: "12 al 16 de octubre", icon: MapPin, titulo: "Confianza en orden",
    puntos: [
      "Tu ficha de Google completa: fotos, servicios, horario y enlace para agendar.",
      "Empezamos a pedir opiniones a tus pacientes actuales.",
      "Instagram y Facebook con la misma imagen, bio clara y botón directo a WhatsApp.",
    ],
  },
  {
    n: 3, fechas: "19 al 23 de octubre", icon: Camera, titulo: "Producción",
    puntos: [
      "Sesión de foto y video en tu consultorio.",
      "Guiones cortos sobre los dolores reales de tus pacientes.",
      "Anuncios listos para tu aprobación.",
    ],
  },
  {
    n: 4, fechas: "26 al 30 de octubre", icon: Rocket, titulo: "Lanzamiento",
    puntos: [
      "Anuncios encendidos en Tepic.",
      "Revisamos cada día las conversaciones que llegan.",
      "Primer ajuste y primer reporte corto: cuántas escribieron y cuántas agendaron.",
    ],
  },
];

export default function PrimerasSemanasNutriMontsePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <Breadcrumbs hubHref={B} hubLabel="Inicio" current="Las primeras 4 semanas" />
      <DocHero
        eyebrow="PARTE 5 DE 6"
        title={<>Las primeras 4 semanas.</>}
        subtitle="Semana por semana, del primer día a los anuncios encendidos."
        logo={<OptionalImage src={BRAND_LOGO.light} alt="Allitron" style={{ height: 26, width: "auto" }} fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>} />}
      />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La meta de este arranque">Anuncios encendidos a finales de octubre, listos para el Buen Fin.</SectionTitle>
        <BigText className="mb-10">Tres semanas para ordenar y producir. En la cuarta, a vender.</BigText>
        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-4 left-[31px] top-4 w-[3px] rounded-full bg-[#101820]/10 sm:left-[35px]" />
          <div className="flex flex-col gap-6">
            {SEMANAS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.n} delay={0.05 * i}>
                  <div className="relative flex gap-5 sm:gap-6">
                    <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_20px_rgba(3,64,88,0.2)] sm:h-[72px] sm:w-[72px] ${s.n === 4 ? "bg-allitron-orange" : "bg-allitron-blue"}`}>
                      <Icon size={30} />
                    </div>
                    <div className="neu min-w-0 flex-1 rounded-[22px] p-6 sm:p-7">
                      <p className="font-display text-[0.85rem] font-bold uppercase tracking-[0.12em] text-allitron-navy">Semana {s.n} · {s.fechas}</p>
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
              <p className="font-display text-[1.3rem] font-black text-white">Para cumplir estas fechas necesitamos de ti:</p>
              <p className="mt-3 font-body text-[1.1rem] leading-[1.75] text-white/90">
                Acceso a tu Instagram, Facebook y Google; una hora para la sesión de la semana 1 y otra para grabar; tu cédula profesional; y el dinero de anuncios listo antes del lanzamiento.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-10">
          <Highlight>Las fechas cuentan desde que se firma. Si empezamos una semana después, todo se recorre una semana.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref={B} nextHref={`${B}/cotizacion`} nextLabel="Siguiente: Cuánto cuesta" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">Allitron · Connecting the Future — Tepic, Nayarit.</p>
      </footer>
    </main>
  );
}
