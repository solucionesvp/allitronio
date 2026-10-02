"use client";

// Parte 4 · La marca del grupo. Propuesta de nombre comercial (no manual).
// VALTA es propuesta de Alejandro Valdés; el Ing. Talavera aún no la conoce:
// se presenta como opciones para que ellos elijan, nunca como decisión tomada.
// Pendiente antes de firmar: búsqueda en IMPI y disponibilidad de dominios.

import { PASOS_IBS } from "@/content/propuestas/pasos";
import { PropuestaTop } from "@/components/propuestas/PropuestaTop";
import { Building2, FileX, MapPinned, Eye, ShieldCheck, Layers, Repeat, Coins, BadgeCheck, Mail, Shirt, Store, MessageCircle, ThumbsUp } from "lucide-react";
import { Reveal, SectionShell } from "@/components/entregas/ui";
import { BigText, SectionTitle, IconPoint, Highlight, BigPageNav } from "@/components/entregas/LecturaUI";

const OPCIONES = [
  {
    nombre: "VALTA MOTORS",
    tag: "Propuesta de Alejandro · recomendada",
    texto: "Corto, fuerte y fácil de decir. “Motors” habla de movilidad y de agencia de vehículos desde la primera palabra.",
    pro: "Más punch comercial.",
    recomendada: true,
  },
  {
    nombre: "VALTA MOVILIDAD",
    tag: "Opción 2",
    texto: "En español y más amplia: sirve hoy para vehículos de trabajo y mañana para motos, maquinaria u otro tipo de transporte.",
    pro: "Crece sin cambiar de nombre.",
  },
  {
    nombre: "GRUPO VALTA",
    tag: "Opción 3 · como paraguas",
    texto: "El grupo como marca madre, al estilo de los grandes grupos automotrices de la región, y debajo cada agencia con su marca.",
    pro: "Ideal si llegan más marcas o más plazas.",
  },
];

const IMPORTA = [
  { icon: Eye, title: "Se reconoce de lejos", text: "Mismo logo, mismos colores, misma placa en cada agencia. El cliente sabe que es el mismo grupo en Tepic, en Vallarta y en Guadalajara." },
  { icon: ShieldCheck, title: "Da confianza a una marca nueva", text: "Shineray es nueva en México y muchos clientes dudan de lo chino. Un grupo con nombre, imagen seria y respaldo de dos familias empresarias es la respuesta." },
  { icon: Repeat, title: "Cada agencia nueva arranca lista", text: "Con un manual, abrir Guadalajara u otra plaza es aplicar lo que ya existe: fachada, papelería, correos y redes, sin empezar de cero." },
  { icon: Coins, title: "Ahorra dinero y errores", text: "Sin manual, cada proveedor hace el logo “a su manera”: lonas distintas, colores distintos, reimpresiones. Un buen manual evita pagar dos veces." },
  { icon: BadgeCheck, title: "Cumple con planta", text: "La propia Shineray tiene su manual de identidad y sus lineamientos para distribuidores. La marca del grupo se diseña para convivir con ellos, sin chocar." },
  { icon: Layers, title: "Ordena correos, dominios y cuentas", text: "Un solo nombre comercial permite correos como ventas.tepic@…, un dominio del grupo y cuentas a nombre de la empresa, fáciles de administrar cuando cambia el personal." },
];

const INCLUYE = [
  "Nombre comercial final, elegido con ustedes, y revisión de que esté libre (IMPI y dominios).",
  "Logotipo con sus versiones: completa, corta, en blanco y negro, y junto al logo de Shineray.",
  "Colores y tipografías compatibles con los de Shineray México.",
  "Aplicaciones: placa de agencia, papelería, tarjetas, firma de correo, perfiles de redes, uniformes y plantillas.",
  "Manual de marca e identidad: cómo usar todo, qué sí y qué no, para cualquier proveedor.",
];

export default function MarcaIbsPage() {
  return (
    <main className="overflow-x-clip bg-allitron-base">

      <PropuestaTop pasos={PASOS_IBS} paso={4} titulo=<>La marca del grupo.</> escena="meta" mensaje="Un nombre que hable del grupo, no solo de la marca que vende. Le explico por qué." />

      {/* 1. El problema */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="El punto de partida">Hoy el cliente solo puede llamarlos de dos formas. Ninguna ayuda.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={FileX} tone="orange" title="“IBS”" text="Es la razón social. Funciona para facturar, pero no se pronuncia fácil, no se recuerda y no transmite nada al cliente." />
          <IconPoint icon={MapPinned} tone="orange" title="“Shineray Tepic”" text="Es la marca que venden más la ciudad. Así se llaman todos los distribuidores del país. No dice quién está detrás ni la experiencia del grupo." delay={0.05} />
        </div>
        <div className="mt-10">
          <Highlight>Si el cliente no los distingue de cualquier otro distribuidor, el grupo pierde su mayor ventaja: la historia y el respaldo de quienes lo forman.</Highlight>
        </div>
      </SectionShell>

      {/* 2. Ejemplos */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Así lo hacen los grupos fuertes">La marca de agencia es del fabricante. La marca del grupo es de ustedes.</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <IconPoint icon={Building2} title="Grupo Flosol" text="Su nombre une dos apellidos: FLOres y SOLana. Con él firman sus agencias, en placas, papelería y redes. El cliente compra la marca del vehículo, pero sabe que detrás está Flosol." />
          <IconPoint icon={Building2} tone="navy" title="Grupo Plasencia" text="Un nombre de grupo que respalda varias agencias y marcas. La marca del vehículo puede cambiar; la confianza en el grupo se queda." delay={0.05} />
        </div>
        <div className="mt-8">
          <BigText>Ustedes empiezan de cero con Shineray. Es el momento más barato y más fácil para nacer con una marca propia, antes de tener lonas, fachadas y tarjetas que luego habría que cambiar.</BigText>
        </div>
      </SectionShell>

      {/* 3. Mapa del nombre */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="De dónde sale el nombre">VAL + TA: dos familias, una sola marca.</SectionTitle>
        <Reveal>
          <div className="neu rounded-[28px] p-6 sm:p-10">
            <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-[20px] bg-allitron-navy p-6 text-white">
                <p className="font-display text-[2.6rem] font-black leading-none">VAL</p>
                <p className="mt-2 font-display text-[1.1rem] font-bold">Valdés</p>
                <p className="mt-3 font-body text-[1rem] leading-[1.6] text-white/85">Desde 1958: maquinaria agrícola, combustibles, agencias automotrices y camiones.</p>
              </div>
              <div className="flex items-center justify-center font-display text-[2.4rem] font-black text-allitron-orange">+</div>
              <div className="rounded-[20px] bg-allitron-navy p-6 text-white">
                <p className="font-display text-[2.6rem] font-black leading-none">TA</p>
                <p className="mt-2 font-display text-[1.1rem] font-bold">Talavera</p>
                <p className="mt-3 font-body text-[1rem] leading-[1.6] text-white/85">Distribución de grandes marcas, liderazgo empresarial y presencia en Nayarit y Puerto Vallarta.</p>
              </div>
            </div>
            <div className="mx-auto my-5 h-8 w-[3px] rounded-full bg-allitron-orange" aria-hidden="true" />
            <div className="rounded-[22px] bg-[#101820] p-7 text-center">
              <p className="font-display text-[2.4rem] font-black tracking-[0.08em] text-white sm:text-[3rem]">VALTA</p>
              <p className="mt-1 font-body text-[1.05rem] text-white/80">+ MOTORS · movilidad</p>
            </div>
            <div className="mx-auto my-5 h-8 w-[3px] rounded-full bg-allitron-orange" aria-hidden="true" />
            <div className="grid gap-3 sm:grid-cols-3">
              {["Shineray Valta · Tepic", "Shineray Valta · Puerto Vallarta", "Shineray Valta · Guadalajara"].map((a) => (
                <div key={a} className="rounded-[16px] border-2 border-[#F32735]/70 bg-white p-4 text-center font-display text-[1.02rem] font-bold text-[#101820]">{a}</div>
              ))}
            </div>
            <p className="mt-5 text-center font-body text-[1rem] leading-[1.6] text-secondary">
              Así cumple justo la regla de Shineray: primero la marca, luego el distribuidor y la plaza.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* 4. Tres opciones */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Tres caminos, ustedes eligen">Tres nombres sobre la misma idea.</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-3">
          {OPCIONES.map((o, i) => (
            <Reveal key={o.nombre} delay={0.05 * i}>
              <div className={`h-full overflow-hidden rounded-[24px] ${o.recomendada ? "shadow-[0_24px_60px_rgba(16,24,32,0.14)]" : "neu"}`}>
                <div className={`px-6 py-6 ${o.recomendada ? "bg-[#101820]" : "bg-allitron-navy"}`}>
                  <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-allitron-blue">{o.tag}</p>
                  <p className="mt-2 font-display text-[1.8rem] font-black tracking-[0.04em] text-white">{o.nombre}</p>
                </div>
                <div className="bg-white p-6">
                  <p className="font-body text-[1.08rem] leading-[1.65] text-[#101820]">{o.texto}</p>
                  <p className="mt-4 flex items-center gap-2 font-display text-[1rem] font-bold text-allitron-navy">
                    {o.recomendada && <ThumbsUp size={18} />} {o.pro}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 font-body text-[0.95rem] leading-[1.6] text-secondary">
          Antes de usar cualquier nombre revisamos que esté libre en el IMPI y en dominios de internet. En una búsqueda rápida aparece una empresa en Perú con un nombre parecido (Volta Motors); es parte de lo que se revisa.
        </p>
      </SectionShell>

      {/* 5. Cómo se vería */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Cómo se vería">Una idea rápida, no el diseño final.</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[22px] bg-[#101820] p-7">
              <div className="flex items-center gap-2 text-white/60"><Store size={18} /><span className="font-body text-[0.9rem]">Placa de agencia</span></div>
              <p className="mt-5 font-display text-[2.2rem] font-black tracking-[0.1em] text-white">VALTA</p>
              <p className="font-display text-[0.9rem] font-semibold tracking-[0.3em] text-white/70">MOTORS</p>
              <div className="mt-5 inline-block rounded-md bg-[#F32735] px-3 py-1.5 font-display text-[0.95rem] font-bold text-white">Shineray · Tepic</div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="neu h-full rounded-[22px] p-7">
              <div className="flex items-center gap-2 text-secondary"><Mail size={18} /><span className="font-body text-[0.9rem]">Correo y firma</span></div>
              <p className="mt-5 break-all font-display text-[1.15rem] font-bold text-[#101820]">ventas.tepic@valtamotors.mx</p>
              <div className="mt-4 border-t border-[#101820]/10 pt-4">
                <p className="font-display text-[1rem] font-bold text-[#101820]">Asesor de ventas</p>
                <p className="font-body text-[0.95rem] text-secondary">VALTA MOTORS · Distribuidor Shineray</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="neu h-full rounded-[22px] p-7">
              <div className="flex items-center gap-2 text-secondary"><MessageCircle size={18} /><span className="font-body text-[0.9rem]">Redes y WhatsApp</span></div>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F32735] font-display text-[0.58rem] font-black tracking-tight text-white">SHINERAY</div>
                <div className="min-w-0">
                  <p className="font-display text-[1.1rem] font-bold text-[#101820]">Shineray Valta Tepic</p>
                  <p className="font-body text-[0.95rem] text-secondary">Distribuidor autorizado · Vehículos de trabajo</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="neu h-full rounded-[22px] p-7">
              <div className="flex items-center gap-2 text-secondary"><Shirt size={18} /><span className="font-body text-[0.9rem]">Uniforme y unidades de demostración</span></div>
              <p className="mt-5 font-body text-[1.05rem] leading-[1.6] text-[#101820]">VALTA bordado en el pecho; Shineray donde planta lo indique. El rotulado de unidades siempre con autorización de Shineray México.</p>
            </div>
          </Reveal>
        </div>
        <p className="mt-5 font-body text-[0.95rem] text-secondary">Correo y dominio de ejemplo: se definen al confirmar el nombre.</p>
      </SectionShell>

      {/* 6. Manual */}
      <SectionShell className="bg-[var(--color-light)]">
        <SectionTitle kicker="Por qué un manual bien hecho">Una marca sin manual se deshace en seis meses.</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          {IMPORTA.map((m, i) => (
            <IconPoint key={m.title} icon={m.icon} tone={i % 2 ? "navy" : "blue"} title={m.title} text={m.text} delay={0.04 * i} />
          ))}
        </div>
        <Reveal className="mt-12">
          <div className="rounded-[26px] bg-allitron-navy p-7 sm:p-10">
            <p className="font-display text-[1.35rem] font-black text-white sm:text-[1.6rem]">La identidad corporativa incluye:</p>
            <ul className="mt-6 space-y-4">
              {INCLUYE.map((e) => (
                <li key={e} className="flex items-start gap-4 font-body text-[1.1rem] leading-[1.6] text-white">
                  <BadgeCheck size={26} className="mt-0.5 shrink-0 text-allitron-blue" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="mt-10">
          <Highlight>IBS sigue siendo la razón social para facturar. La marca es la cara que ve el cliente.</Highlight>
        </div>
      </SectionShell>

      <SectionShell className="bg-[var(--color-light)] !py-10">
        <BigPageNav backHref="/entregas/ibs" nextHref="/entregas/ibs/primeras-semanas" nextLabel="Siguiente: Las primeras 6 semanas" />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.95rem] leading-[1.7] text-muted">
          Allitron · Connecting the Future — Tepic, Nayarit.
        </p>
      </footer>
    </main>
  );
}
