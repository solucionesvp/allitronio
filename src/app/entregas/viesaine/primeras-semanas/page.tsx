"use client";

import { PASOS_VIESAINE } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { ClipboardCheck, MapPin, Camera, Rocket, Flag } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const B = "/entregas/viesaine";

// Supuesto: firma y anticipo a más tardar el viernes 2 de octubre de 2026.
const SEMANAS = [
  {
    n: 1, fechas: "5 al 9 de octubre", icon: ClipboardCheck, titulo: "Diagnóstico y orden",
    puntos: [
      "Sesión con ustedes: cuántos pacientes nuevos llegan hoy, cuántas citas se pierden y qué servicios quieren llenar primero.",
      "Decidimos el nombre único que se usará en Google, redes y página.",
      "Preparamos con ustedes el aviso de publicidad COFEPRIS a nombre de Elizabeth.",
    ],
  },
  {
    n: 2, fechas: "12 al 16 de octubre", icon: MapPin, titulo: "Google y agenda",
    puntos: [
      "Ficha de Google con el nombre correcto, fotos nuevas, servicios y horario.",
      "Montamos la agenda con recordatorios automáticos por WhatsApp y la probamos con citas reales.",
      "Empezamos a pedir opiniones a pacientes actuales.",
    ],
  },
  {
    n: 3, fechas: "19 al 23 de octubre", icon: Camera, titulo: "Producción",
    puntos: [
      "Sesión de foto y video en la clínica: instalaciones, equipo y testimonios con permiso.",
      "Anuncios por dolor: espalda, rodilla, recuperación y adultos mayores.",
      "Todo listo para su aprobación y revisado contra las reglas de COFEPRIS.",
    ],
  },
  {
    n: 4, fechas: "26 al 30 de octubre", icon: Rocket, titulo: "Lanzamiento",
    puntos: [
      "Anuncios encendidos en Tepic, con el aviso de publicidad ya presentado.",
      "Revisamos cada día mensajes, comentarios y citas agendadas.",
      "Primer reporte corto: cuántos escribieron, cuántos agendaron y cuántos confirmaron.",
    ],
  },
];

export default function PrimerasSemanasVieSainePage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">
      <PropuestaTop pasos={PASOS_VIESAINE} paso={5} titulo=<>Las primeras 4 semanas.</> escena="calendario" mensaje="Así serán sus primeras cuatro semanas." />

      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="La meta de este arranque">Anuncios y agenda automática funcionando a finales de octubre.</SectionTitle>
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
              <p className="font-display text-[1.3rem] font-black text-white">Para cumplir estas fechas necesitamos de ustedes:</p>
              <p className="mt-3 font-body text-[1.1rem] leading-[1.75] text-white/90">
                Acceso a Facebook, Instagram y Google; una hora para la sesión de la semana 1 y otra para grabar; la cédula profesional de Elizabeth; su agenda actual; y el dinero de anuncios listo antes del lanzamiento.
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
