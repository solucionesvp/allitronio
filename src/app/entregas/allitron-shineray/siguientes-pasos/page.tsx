"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import {
  EASE,
  Eyebrow,
  SectionShell,
  SummaryBlock,
  StepList,
  PullQuote,
  PageNav,
  LangToggle,
  type Lang,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const T = {
  es: {
    hub: "Hub",
    current: "Gobernanza y próximos pasos",
    eyebrowHero: "PARA CERRAR",
    title: (
      <>
        Quién opera qué,
        <br />
        y lo que sigue.
      </>
    ),
    subtitle: "Cómo se reparte el control entre Shineray, sus dealers y Allitron — y los pasos concretos que siguen después de esta entrega.",
    gobernanzaEyebrow: "GOBERNANZA: QUIÉN VE QUÉ, QUIÉN OPERA QUÉ",
    gobernanzaLead: "Toda cuenta, redes sociales, Google Business, plataformas de pauta, queda a nombre de Shineray, con acceso permanente para el corporativo. Los dealers y plantas trabajan el día a día con el acceso operativo que necesitan. Allitron supervisa pauta publicitaria, captación y SEO, siempre dentro de los procesos y lineamientos que Shineray defina, no por fuera de ellos.",
    gobernanzaPointsHeading: "Cómo se reparte el control",
    gobernanzaPoints: [
      { label: "Propiedad, no dependencia", text: "Las cuentas y plataformas quedan siempre a nombre de Shineray, nunca atadas a un proveedor externo." },
      { label: "Operación distribuida, vista consolidada", text: "Cada dealer opera su plaza; el corporativo ve todo junto, sin tener que pedir el dato a cada uno." },
    ],
    pasosEyebrow: "PRÓXIMOS PASOS",
    pasos: [
      { titulo: "Confirmar con Tang que este enlace es el material completo", texto: "Así entregamos nosotros: reúne todo lo que pidió revisar, sin necesidad de un PDF aparte." },
      { titulo: "Sesión de descubrimiento", texto: "Conocer a fondo sus procesos, catálogo de campos del Key Report, periodicidad y usuarios reales — antes de estimar tiempos o alcance." },
      { titulo: "Visita a Tepic", texto: "Para ver el sistema en operación y seguir platicando sugerencias, si les es útil coordinarla." },
    ],
    cierre: "Nos encantaría ser su aliado de tecnología y marketing en México — siempre dentro de sus procesos y lineamientos, no por fuera de ellos. Quedamos atentos a sus tiempos.",
    navBack: "Volver al menú principal",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "治理架构与后续步骤",
    eyebrowHero: "结语",
    title: (
      <>
        谁负责操作什么，
        <br />
        以及后续安排。
      </>
    ),
    subtitle: "Shineray、经销商与 Allitron 之间的控制权如何分配——以及这次交付之后的具体后续步骤。",
    gobernanzaEyebrow: "治理架构：谁能看到什么，谁负责操作什么",
    gobernanzaLead: "所有账户，社交媒体、Google 商家资料、广告投放平台，始终归属 Shineray，集团拥有永久访问权限。经销商与工厂拥有日常运营所需的操作权限。Allitron 负责监督广告投放、客户获取与 SEO，始终在 Shineray 制定的流程与规范之内进行，而非之外。",
    gobernanzaPointsHeading: "控制权如何分配",
    gobernanzaPoints: [
      { label: "拥有权，而非依赖", text: "账户与平台始终归属 Shineray，绝不依附于外部供应商。" },
      { label: "分布式运营，统一视图", text: "每个经销商运营自己的区域；集团可查看整体情况，无需逐一索取数据。" },
    ],
    pasosEyebrow: "下一步计划",
    pasos: [
      { titulo: "向唐先生确认此链接即为完整材料", texto: "这正是我们的交付方式：涵盖他要求查看的全部内容，无需另外提供 PDF。" },
      { titulo: "深入了解会议", texto: "在估算时间或范围之前，先深入了解贵方的流程、Key Report 字段目录、周期安排和实际用户。" },
      { titulo: "前往蒂皮克实地考察", texto: "如对贵方有帮助，可安排实地查看系统运行情况，并继续交流建议。" },
    ],
    cierre: "我们非常希望能成为贵方在墨西哥的技术与市场推广合作伙伴——始终在贵方的流程与规范之内，而非之外。期待贵方的安排。",
    navBack: "返回主菜单",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function SiguientesPasosAllitronShinerayPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = T[lang];

  return (
    <main className="bg-allitron-base" lang={lang}>
      <Breadcrumbs hubHref="/entregas/allitron-shineray" hubLabel={t.hub} current={t.current} />

      {/* Hero */}
      <section className="relative flex min-h-[50svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 85% 15%, rgba(9,175,242,0.10) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 flex items-center justify-between"
          >
            <OptionalImage
              src={BRAND_LOGO.light}
              alt="Allitron"
              style={{ height: 24, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-foreground">ALLITRON</span>}
            />
            <LangToggle lang={lang} onChange={setLang} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            {t.eyebrowHero}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.2] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[640px] font-body text-[0.95rem] leading-[1.85] text-muted"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Gobernanza */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.gobernanzaEyebrow}</Eyebrow>
        <SummaryBlock
          lead={t.gobernanzaLead}
          pointsHeading={t.gobernanzaPointsHeading}
          points={[...t.gobernanzaPoints]}
        />
      </SectionShell>

      {/* Proximos pasos */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.pasosEyebrow}</Eyebrow>
        <div className="mt-8">
          <StepList items={[...t.pasos]} />
        </div>
      </SectionShell>

      {/* Cierre */}
      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Handshake}>{t.cierre}</PullQuote>
      </SectionShell>

      {/* Navegacion */}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav backHref="/entregas/allitron-shineray" backLabel={t.navBack} />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <OptionalImage
          src={BRAND_ALLI.primary}
          alt="Alli"
          style={{ height: 48, width: "auto", margin: "0 auto 16px" }}
          fallback={null}
        />
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          {t.footer}
        </p>
      </footer>
    </main>
  );
}
