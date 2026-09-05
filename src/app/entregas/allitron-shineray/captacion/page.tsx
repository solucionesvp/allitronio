"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, BRAND_ALLI } from "@/config/assets";
import {
  EASE,
  Eyebrow,
  SectionShell,
  SummaryBlock,
  StepList,
  PageNav,
  LangToggle,
  type Lang,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const T = {
  es: {
    hub: "Hub",
    current: "Motor de Captación",
    eyebrowHero: "PAUTA Y CAPTACIÓN DE LEADS",
    title: (
      <>
        Motor de Captación:
        <br />
        tráfico calificado, por ciudad.
      </>
    ),
    subtitle:
      "Nuestro servicio de pauta y generación de leads — separado del CRM y de MAPS 2.0, pensado para coordinarse por plaza desde el corporativo.",
    captacionEyebrow: "QUÉ ES EL MOTOR DE CAPTACIÓN",
    captacionLead: "Es nuestro servicio de pauta y generación de leads: diagnóstico comercial, análisis de competencia local, mensaje de campaña y configuración/optimización de anuncios en Meta Ads y Google Ads, con reporte de métricas por periodo.",
    captacionPointsHeading: "Cómo encajaría con una red de dealers",
    captacionPoints: [
      { label: "Pauta coordinada, no dispersa", text: "Cada plaza con su propia campaña y presupuesto, decidido y supervisado desde el corporativo — no cada dealer por su cuenta." },
      { label: "El lead no se pierde entre sistemas", text: "Se puede conectar al CRM que use cada dealer, LAZUP u otro, para que la captación y el seguimiento no queden separados." },
      { label: "Por etapas, con su equipo", text: "Es una pieza que se construye y conecta en conjunto, no de un día para otro — empezando por una plaza piloto antes de escalar." },
    ],
    incluyeEyebrow: "QUÉ INCLUYE, POR PLAZA",
    incluye: [
      { titulo: "Diagnóstico comercial y análisis de competencia local", texto: "Antes de proponer una campaña, entender qué está pasando en esa plaza." },
      { titulo: "Mensaje principal de campaña y estrategia de contenido", texto: "No genérico: adaptado a lo que busca el cliente de esa ciudad." },
      { titulo: "Banco de contenido, copies y piezas", texto: "Material listo para usar, no solo una idea suelta." },
      { titulo: "Configuración de campañas en Meta Ads y Google Ads", texto: "Montaje técnico correcto, no solo activar un botón de promoción." },
      { titulo: "Lanzamiento coordinado por plaza", texto: "Cada ciudad con su propio arranque, dentro del calendario que defina el corporativo." },
      { titulo: "Optimización continua y reporte de métricas", texto: "Ajuste de mensaje y segmentación según datos reales, no según intuición." },
    ],
    notaEyebrow: "PROPUESTA — A VALIDAR CON SU EQUIPO",
    nota: "Esto es una propuesta de cómo lo estructuraríamos. El alcance exacto y los tiempos se definen en una sesión de descubrimiento, igual que con el CRM.",
    navBack: "Volver al menú principal",
    navNext: "Siguiente: Gobernanza y próximos pasos",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "获客引擎",
    eyebrowHero: "广告投放与线索获取",
    title: (
      <>
        获客引擎：
        <br />
        按城市获取合格流量。
      </>
    ),
    subtitle: "我们独立于 CRM 与 MAPS 2.0 的广告投放与获客服务——按区域协调，由集团统筹。",
    captacionEyebrow: "什么是获客引擎",
    captacionLead: "这是我们的广告投放与线索获取服务：商务诊断、本地竞争分析、活动信息，以及 Meta Ads 与 Google Ads 的配置与优化，并按周期提供数据报告。",
    captacionPointsHeading: "如何适配经销商网络",
    captacionPoints: [
      { label: "统一协调，而非各自为政", text: "每个区域拥有各自的广告活动与预算，由集团统一决定与监督——而非每个经销商各行其是。" },
      { label: "线索不在系统间丢失", text: "可与各经销商所使用的 CRM 连接，无论是 LAZUP 还是其他系统，使获客与跟进不再割裂。" },
      { label: "与贵方团队分阶段推进", text: "这是与贵方共同构建并连接的一部分，不会一蹴而就——从一个试点区域开始，再逐步扩展。" },
    ],
    incluyeEyebrow: "按区域划分的具体内容",
    incluye: [
      { titulo: "商务诊断与本地竞争分析", texto: "在提出广告方案之前，先了解该区域的实际情况。" },
      { titulo: "核心活动信息与内容策略", texto: "并非千篇一律：针对该城市客户的真实需求量身定制。" },
      { titulo: "内容库、文案与素材", texto: "提供可直接使用的成品材料，而非一个笼统的想法。" },
      { titulo: "Meta Ads 与 Google Ads 的配置", texto: "正确的技术搭建，而不只是点击一个推广按钮。" },
      { titulo: "按区域协调上线", texto: "每个城市按集团制定的时间表各自启动。" },
      { titulo: "持续优化与数据报告", texto: "根据真实数据调整信息与人群定位，而非凭直觉。" },
    ],
    notaEyebrow: "提案 — 待贵方团队验证",
    nota: "这是我们建议的构建方式。具体范围与时间安排将在深入了解会议中确定，与 CRM 部分的方式相同。",
    navBack: "返回主菜单",
    navNext: "下一步：治理架构与后续步骤",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function CaptacionAllitronShinerayPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = T[lang];

  return (
    <main className="bg-allitron-base" lang={lang}>
      <Breadcrumbs hubHref="/entregas/allitron-shineray" hubLabel={t.hub} current={t.current} />

      {/* Hero */}
      <section className="relative flex min-h-[55svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
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

      {/* Motor de Captación */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.captacionEyebrow}</Eyebrow>
        <SummaryBlock
          lead={t.captacionLead}
          pointsHeading={t.captacionPointsHeading}
          points={[...t.captacionPoints]}
        />
      </SectionShell>

      {/* Que incluye */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.incluyeEyebrow}</Eyebrow>
        <StepList items={[...t.incluye]} />
      </SectionShell>

      {/* Nota de propuesta */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.notaEyebrow}</Eyebrow>
        <p className="max-w-[680px] font-body text-[0.95rem] italic leading-[1.85] text-secondary">
          {t.nota}
        </p>
      </SectionShell>

      {/* Navegacion */}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/allitron-shineray"
          backLabel={t.navBack}
          nextHref="/entregas/allitron-shineray/siguientes-pasos"
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
