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
  RoadmapTimeline,
  SummaryBlock,
  StepList,
  PullQuote,
  PageNav,
  LangToggle,
  type RoadmapItem,
  type Lang,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const FRENTES: Record<Lang, RoadmapItem[]> = {
  es: [
    {
      titulo: "Centro de marca y refacciones — CDMX",
      compromiso:
        "Centro de marca y almacén de refacciones de al menos 1,500 m², con decoración avanzando en octubre y obra terminada en diciembre.",
      responsable: "Shineray México",
      fecha: "Objetivo: octubre–diciembre 2026",
    },
    {
      titulo: "Apertura oficial del centro",
      compromiso: "Apertura formal del centro de marca en Ciudad de México.",
      responsable: "Shineray México",
      fecha: "Enero 2027",
    },
    {
      titulo: "Refacciones e inventario",
      compromiso:
        "Mínimo un contenedor mensual; seis meses de stock en mantenimiento/colisión y 2–3 meses en piezas poco frecuentes.",
      responsable: "Shineray",
      fecha: "Continuo",
    },
    {
      titulo: "Capacitación técnica",
      compromiso:
        "Centro técnico y capacitación semestral con instructores especializados y apoyo de traducción en México.",
      responsable: "Shineray",
      fecha: "Cada semestre",
    },
    {
      titulo: "Financiamiento",
      compromiso:
        "Banorte como colocación de referencia; se sigue trabajando en ampliar opciones de crédito, seguro y arrendamiento para distribuidores.",
      responsable: "Shineray + IBS",
      fecha: "En proceso",
    },
    {
      titulo: "Permisos y homologación",
      compromiso: "Avanzar los trámites y permisos necesarios para no afectar entregas a clientes.",
      responsable: "Shineray",
      fecha: "Próximas semanas",
    },
    {
      titulo: "Ensamble local",
      compromiso:
        "Contrato y primer pedido en marcha; meta de 3,000 unidades en 2027 y evaluación de planta propia al alcanzar mayor escala.",
      responsable: "Shineray + ensamblador",
      fecha: "Primera producción nov. · ventas dic. 2026",
    },
    {
      titulo: "E-commerce y marketing",
      compromiso:
        "Tienda oficial en Mercado Libre con inventario y logística central; lanzamiento de marca en enero con despliegue nacional marzo–mayo.",
      responsable: "Shineray + operación local",
      fecha: "Objetivo: enero 2027",
    },
  ],
  zh: [
    {
      titulo: "品牌与配件中心 — 墨西哥城",
      compromiso: "建立至少 1,500 平方米的品牌与配件仓库中心，装修工程于 10 月推进，工程于 12 月完工。",
      responsable: "Shineray 墨西哥",
      fecha: "目标：2026 年 10 月–12 月",
    },
    {
      titulo: "中心正式开业",
      compromiso: "在墨西哥城正式开业品牌中心。",
      responsable: "Shineray 墨西哥",
      fecha: "2027 年 1 月",
    },
    {
      titulo: "配件与库存",
      compromiso: "每月至少一个集装箱；维保/碰撞类配件保持六个月库存，非常用配件保持 2–3 个月库存。",
      responsable: "Shineray",
      fecha: "持续进行",
    },
    {
      titulo: "技术培训",
      compromiso: "设立技术中心，每半年由专业讲师提供培训，并在墨西哥提供翻译支持。",
      responsable: "Shineray",
      fecha: "每半年一次",
    },
    {
      titulo: "融资",
      compromiso: "以 Banorte 银行作为参考融资渠道；双方将继续拓展面向经销商的信贷、保险及租赁方案。",
      responsable: "Shineray + IBS",
      fecha: "进行中",
    },
    {
      titulo: "许可与认证",
      compromiso: "推进必要的手续与许可，以避免影响客户交付。",
      responsable: "Shineray",
      fecha: "未来几周内",
    },
    {
      titulo: "本地组装",
      compromiso: "合同已签署，首批订单正在进行；2027 年目标为 3,000 台，达到更大规模后将评估自建工厂。",
      responsable: "Shineray + 组装合作方",
      fecha: "首批生产：11 月 · 销售：2026 年 12 月",
    },
    {
      titulo: "电商与市场推广",
      compromiso: "在 Mercado Libre 平台开设官方店铺，实行集中库存与物流；品牌于 1 月上线，3 至 5 月在全国范围推广。",
      responsable: "Shineray + 本地运营团队",
      fecha: "目标：2027 年 1 月",
    },
  ],
};

const PASOS: Record<Lang, string[]> = {
  es: [
    "Convertir cada línea de trabajo en un plan mensual conjunto, con responsable y evidencia de avance.",
    "Dar seguimiento mensual documentado a infraestructura, refacciones, capacitación, permisos, financiamiento, aperturas, e-commerce y marketing.",
    "Confirmar por escrito fechas, cifras y responsables de cada frente, para que ambas partes trabajen sobre la misma información.",
    "Explorar en conjunto el desarrollo de un sistema digital compartido (inventario, catálogo, pedidos y seguimiento) para los distribuidores.",
  ],
  zh: [
    "将每项工作方向转化为双方共同的月度计划，明确负责人并留存进展证明。",
    "对基础设施、配件、培训、许可、融资、开业、电商及市场推广进行每月书面跟进。",
    "以书面形式确认各工作方向的日期、数字和负责人，确保双方基于同一信息推进工作。",
    "共同探讨为经销商开发共享数字系统（库存、产品目录、订单及跟踪）。",
  ],
};

const T = {
  es: {
    hub: "Hub",
    current: "Resumen y hoja de ruta",
    eyebrowHero: "REUNIÓN SHINERAY · IBS · 25 DE AGOSTO 2026",
    title: (
      <>
        Gracias por la visita y por
        <br />
        compartir la visión de crecimiento.
      </>
    ),
    subtitle:
      "IBS y las familias Valdés Menchaca–Talavera Béjar agradecen la apertura para compartir la estrategia de crecimiento de Shineray en México. Este documento resume lo conversado y los siguientes pasos propuestos.",
    resumenEyebrow: "RESUMEN DE LA REUNIÓN",
    lead: "La reunión permitió alinear una visión común: construir una red de vehículos comerciales ligeros con respaldo real en ventas, posventa, refacciones, financiamiento, marketing y expansión territorial.",
    highlight:
      "El objetivo es que el crecimiento sea medible, que cada distribuidor tenga mejores herramientas para vender y que el cliente final reciba una experiencia consistente de compra y posventa.",
    pointsHeading: "Lo que aporta cada parte",
    points: [
      { label: "Grupo local", text: "Experiencia empresarial y automotriz, conocimiento regional y capacidad para desarrollar plazas de forma ordenada." },
      { label: "Shineray", text: "Centro de marca y refacciones en CDMX, inventario suficiente, capacitación técnica semestral, avance del ensamble local, portafolio y lanzamiento nacional coordinado." },
    ],
    frentesEyebrow: "LÍNEAS DE TRABAJO ACORDADAS",
    frentesHeading: "Ocho frentes, cada uno con responsable y fecha objetivo.",
    pasosEyebrow: "PRÓXIMOS PASOS PROPUESTOS",
    cierre:
      "Quedamos atentos para avanzar juntos en cada uno de estos frentes y seguir construyendo una relación de largo plazo entre Shineray e IBS.",
    navBack: "Volver al menú principal",
    navNext: "Siguiente: quiénes somos",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "会议纪要与路线图",
    eyebrowHero: "SHINERAY · IBS 会议 · 2026 年 8 月 25 日",
    title: (
      <>
        感谢您的到访，
        <br />
        也感谢您分享增长愿景。
      </>
    ),
    subtitle:
      "IBS 及瓦尔德斯·门查卡与塔拉维拉·贝哈尔两个家族，感谢贵方坦诚分享 Shineray 在墨西哥的增长战略。本文件总结了会议内容及后续建议步骤。",
    resumenEyebrow: "会议摘要",
    lead: "本次会议使双方在共同愿景上达成一致：建立一个在销售、售后、配件、融资、市场推广及区域拓展方面均有切实支持的轻型商用车网络。",
    highlight:
      "目标是让增长可衡量，让每一位经销商都拥有更好的销售工具，并让最终客户获得始终如一的购买与售后体验。",
    pointsHeading: "双方各自的贡献",
    points: [
      { label: "本地集团", text: "拥有企业与汽车行业经验、区域市场知识，以及有序开发各区域市场的能力。" },
      { label: "Shineray", text: "在墨西哥城设立品牌与配件中心，保持充足库存，每半年一次技术培训，推进本地组装，完善产品系列，并统筹全国范围的上市推广。" },
    ],
    frentesEyebrow: "商定的工作方向",
    frentesHeading: "八项工作方向，均有负责人和目标日期。",
    pasosEyebrow: "建议的后续步骤",
    cierre:
      "我们期待与贵方共同推进上述各项工作，并持续构建 Shineray 与 IBS 之间的长期合作关系。",
    navBack: "返回主菜单",
    navNext: "下一页：关于我们",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function ResumenShinerayPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = T[lang];

  return (
    <main className="bg-allitron-base" lang={lang}>
      <Breadcrumbs hubHref="/entregas/shineray" hubLabel={t.hub} current={t.current} />
      {/* ── Hero (oscuro, deliberado) ────────────────────────────────── */}
      <section className="relative flex min-h-[65svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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

      {/* ── Resumen (claro) ────────────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.resumenEyebrow}</Eyebrow>
        <SummaryBlock
          lead={t.lead}
          highlight={t.highlight}
          pointsHeading={t.pointsHeading}
          points={[...t.points]}
        />
      </SectionShell>

      {/* ── Frentes de trabajo (claro — hoja de ruta) ─────────────────── */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.frentesEyebrow}</Eyebrow>
        <p className="mb-10 max-w-[640px] font-display text-[1.5rem] font-bold text-[#101820] sm:text-[1.8rem]">
          {t.frentesHeading}
        </p>
        <RoadmapTimeline items={FRENTES[lang]} />
      </SectionShell>

      {/* ── Próximos pasos (claro) ─────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.pasosEyebrow}</Eyebrow>
        <div className="mt-8">
          <StepList items={PASOS[lang].map((texto) => ({ texto }))} />
        </div>
      </SectionShell>

      {/* ── Cierre (claro) ─────────────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <PullQuote icon={Handshake}>{t.cierre}</PullQuote>
      </SectionShell>

      {/* ── Navegación para el lector ──────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/shineray"
          backLabel={t.navBack}
          nextHref="/entregas/shineray/quienes-somos"
          nextLabel={t.navNext}
        />
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
