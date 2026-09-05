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
  FrenteCard,
  PageNav,
  LangToggle,
  type Lang,
} from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

// ── Mapeo: su Key Report / Stand Up Report actual → LAZUP ───────────────
// Se revisó en vivo durante la reunión (leads, citas, tasas, ventas por
// modelo, presupuesto por canal, envío del reporte).
const MAPEO: Record<Lang, { titulo: string; texto: string; etiqueta: string }[]> = {
  es: [
    {
      titulo: "Leads gestionables",
      texto: "Hoy se cuentan a mano para el Key Report. Con LAZUP, cada contacto entra al pipeline en tiempo real.",
      etiqueta: "Ya en la arquitectura",
    },
    {
      titulo: "Citas agendadas y concretadas",
      texto: "Hoy es registro manual. Con LAZUP, el motor de citas confirma y da seguimiento por WhatsApp.",
      etiqueta: "Ya en la arquitectura",
    },
    {
      titulo: "Tasa de cierre, seriedad e interés real",
      texto: "Hoy se calculan al armar el reporte mensual. Con LAZUP, se leen directo del embudo real, sin captura manual.",
      etiqueta: "Ya en la arquitectura",
    },
    {
      titulo: "Ventas digitales por modelo",
      texto: "Hoy es la hoja “Showroom”, llenada a mano por trimestre. Con LAZUP, se vincula al cierre de cada oportunidad.",
      etiqueta: "Ya en la arquitectura",
    },
    {
      titulo: "Presupuesto de marketing por canal (ATL / BTL / Digital / POP / OOH)",
      texto: "Hoy es la hoja “Comprobación”, captura manual mensual por canal. Lo estamos construyendo — todavía no es automático.",
      etiqueta: "En desarrollo",
    },
    {
      titulo: "Envío del Key Report / Stand Up Report",
      texto: "Hoy es subida manual a Drive antes de las 15:00, con aviso por WhatsApp. Es la pieza que más trabajo manual resolvería — la seguimos construyendo.",
      etiqueta: "En desarrollo",
    },
  ],
  zh: [
    {
      titulo: "可管理的潜在客户",
      texto: "目前需要为 Key Report 手动统计。使用 LAZUP 后，每个联系人都会实时进入销售管道。",
      etiqueta: "已在架构中",
    },
    {
      titulo: "已安排 / 已完成的客户预约",
      texto: "目前是人工登记。使用 LAZUP 后，预约引擎通过 WhatsApp 自动确认并跟进。",
      etiqueta: "已在架构中",
    },
    {
      titulo: "签约率 · 企业认真率 · 实际利息率",
      texto: "目前在编制月度报告时人工计算。使用 LAZUP 后，直接从真实销售漏斗读取，无需人工录入。",
      etiqueta: "已在架构中",
    },
    {
      titulo: "数字化销售（按车型）",
      texto: "目前是按季度手动填写的“Showroom”表格。使用 LAZUP 后，与每个商机的成交直接关联。",
      etiqueta: "已在架构中",
    },
    {
      titulo: "分渠道市场预算（传统 / 线下活动 / 数字 / 店内物料 / 户外）",
      texto: "目前是“Comprobación”表格，每月按渠道人工填写。我们正在开发这部分——目前尚未自动化。",
      etiqueta: "持续开发中",
    },
    {
      titulo: "Key Report / Stand Up Report 提交",
      texto: "目前是在下午 3 点前手动上传至 Drive，并通过 WhatsApp 通知。这是能节省最多人工的一项——我们正在持续开发。",
      etiqueta: "持续开发中",
    },
  ],
};

const T = {
  es: {
    hub: "Hub",
    current: "CRM y seguimiento comercial",
    eyebrowHero: "LAZUP · EL CRM QUE VIERON EN VIVO",
    title: (
      <>
        LAZUP: el CRM
        <br />
        que vieron en vivo.
      </>
    ),
    subtitle:
      "Cómo se adapta a su Key Report y su Stand Up Report, y los módulos a la medida que platicamos — construidos sobre lo que ya existe, no desde cero.",
    demoEyebrow: "LO QUE MOSTRAMOS EN VIVO",
    demoHeading: "Cerca de 20 minutos de demostración, no solo diapositivas.",
    demo: [
      { titulo: "Ficha única de contacto", texto: "Todo lo relevante de un cliente en un solo lugar — sin fichas duplicadas entre departamentos." },
      { titulo: "WhatsApp centralizado", texto: "Toda la conversación del cliente queda en un solo hilo, con historial completo." },
      { titulo: "Pipelines tipo Kanban", texto: "Cada oportunidad visible por etapa, sin depender de una hoja de cálculo aparte." },
      { titulo: "Citas", texto: "Agendado, confirmación y seguimiento por WhatsApp, integrado al mismo contacto." },
      { titulo: "Agentes de IA por departamento", texto: "Cada área con su propio asistente, sin mezclar el contexto de Ventas con el de Postventa." },
      { titulo: "Campañas", texto: "Mensajes segmentados con consentimiento y bajas, no envíos masivos sin control." },
      { titulo: "Reportes descargables", texto: "Por periodo, área y proceso de venta, sin armarlos a mano." },
      { titulo: "Operación multiagencia", texto: "Cada punto de venta con sus datos aislados." },
      { titulo: "Vista móvil", texto: "Pensada para el piso de venta, no solo para escritorio." },
    ],
    lazupEyebrow: "LAZUP, LO QUE VIERON EN VIVO",
    lazupLead:
      "LAZUP es el CRM propio de Allitron: cerca de dos años de desarrollo y seis meses de pruebas con empresas reales. Es un sistema comercial —de contacto, conversación y seguimiento— no un sistema de facturación ni de inventario. Esto es lo que ya mostramos funcionando:",
    lazupPointsHeading: "Respondiendo lo que preguntó Tang",
    lazupPoints: [
      { label: "¿Se transfiere entre departamentos?", text: "Sí: un contacto pasa de Ventas a Postventa (o al área que corresponda) sin perder el historial de la conversación." },
      { label: "¿Se ve el resultado por vendedor?", text: "Sí: cada oportunidad queda ligada a quién la atendió, con su avance visible en el pipeline." },
      { label: "¿Genera reportes automáticos?", text: "Ya genera reportes descargables por periodo, área y proceso de venta." },
      { label: "¿Da sugerencias al vendedor?", text: "El asistente de IA por departamento ayuda en la conversación y sugiere el siguiente paso — sin inventar disponibilidad, precio o promesas que el vendedor no confirmó." },
      { label: "¿Funciona en iPhone y celular?", text: "Sí, con vista móvil real — pensada para el piso de venta, no solo para escritorio." },
    ],
    honestyEyebrow: "EN DESARROLLO — A SU RITMO",
    honestyItems: [
      { titulo: "Personalización a la medida de Shineray", texto: "Con una sesión de descubrimiento sobre sus procesos y su catálogo de campos, podemos estimar tiempos reales de tropicalización — preferimos eso a prometer una fecha sin conocer el detalle." },
      { titulo: "Presupuesto de marketing por canal", texto: "Seguimos construyendo esta pieza. Es adaptable a la fecha en que decidan avanzar." },
      { titulo: "Envío automático del Key Report / Stand Up Report", texto: "También en desarrollo — es la pieza que resolvería más trabajo manual, y en la que seguimos avanzando." },
    ],
    mapeoEyebrow: "TROPICALIZADO PARA SHINERAY",
    mapeoHeading: "Revisamos juntos su Key Report y su Stand Up Report. Cada indicador que ya usan tiene un lugar en LAZUP — unos ya cubiertos, otros todavía en construcción.",
    modulosEyebrow: "MÓDULOS A LA MEDIDA",
    modulosHeading: "Tres piezas que platicamos, construidas sobre lo que ya existe, no desde cero.",
    modulo1Titulo: "Postventa: garantía y mantenimiento",
    modulo1Texto: "Recordatorio automático por WhatsApp según el calendario real de Shineray (cada 10,000 km o 6 meses) y control de garantía por VIN (3 años o 100,000 km), usando el motor de citas que ya existe en LAZUP.",
    modulo2Titulo: "Reporte automático a Shineray",
    modulo2Texto: "Generar el Key Report y el Stand Up Report desde datos reales del CRM, en el mismo formato bilingüe que ya manejan — la pieza que resolvería el mayor trabajo manual.",
    modulo3Titulo: "Multi-agencia, multi-plaza",
    modulo3Texto: "Cada punto de venta con sus datos aislados y una vista consolidada a nivel grupo o nacional — se construye sobre el aislamiento por empresa que ya está implementado en LAZUP.",
    moduloResponsable: "LAZUP (Allitron)",
    moduloFecha: "Por definir con Shineray",
    navBack: "Volver al menú principal",
    navNext: "Siguiente: Posicionamiento digital",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "CRM 与商务跟进",
    eyebrowHero: "LAZUP · 您现场看到的 CRM",
    title: (
      <>
        LAZUP：
        <br />
        您现场看到的 CRM。
      </>
    ),
    subtitle: "它如何对应贵方的 Key Report 与 Stand Up Report，以及我们探讨过的定制模块——均建立在已有功能之上，而非从零开始。",
    demoEyebrow: "我们现场展示的内容",
    demoHeading: "约 20 分钟的实机演示，而非仅仅是幻灯片。",
    demo: [
      { titulo: "统一联系人档案", texto: "客户的所有关键信息集中于一处——各部门之间不会出现重复档案。" },
      { titulo: "集中化 WhatsApp", texto: "客户的所有对话保留在同一条线索中，含完整历史记录。" },
      { titulo: "看板式销售管道", texto: "每个商机按阶段清晰可见，无需依赖单独的表格。" },
      { titulo: "预约管理", texto: "预约、确认与跟进均通过 WhatsApp 完成，并与同一联系人关联。" },
      { titulo: "各部门 AI 助手", texto: "每个部门拥有独立助手，销售与售后的上下文不会混淆。" },
      { titulo: "营销活动", texto: "分群发送并附带同意与退订机制，而非无节制的群发。" },
      { titulo: "可下载报告", texto: "按周期、区域和销售流程生成，无需人工整理。" },
      { titulo: "多网点运营", texto: "每个销售网点的数据相互隔离。" },
      { titulo: "移动端界面", texto: "专为销售现场设计，而非仅限于桌面端。" },
    ],
    lazupEyebrow: "LAZUP，您现场看到的内容",
    lazupLead: "LAZUP 是 Allitron 自主研发的 CRM：历时近两年开发，并已与真实企业进行了六个月的测试。它是一套商务管理系统——用于联系人、对话与跟进——而非财务或库存系统。以下是我们现场展示的实际功能：",
    lazupPointsHeading: "回应唐先生的问题",
    lazupPoints: [
      { label: "能否在部门间转接？", text: "可以：联系人可从销售转至售后（或相应部门），且不会丢失对话记录。" },
      { label: "能否查看每位销售员的业绩？", text: "可以：每个商机都会关联负责人，并在销售管道中显示进展。" },
      { label: "能否自动生成报告？", text: "已可按周期、区域和销售流程生成可下载的报告。" },
      { label: "能否为销售员提供建议？", text: "各部门的 AI 助手会协助对话并建议下一步——但不会编造库存、价格或销售员未确认的承诺。" },
      { label: "能否在 iPhone 和手机上使用？", text: "可以，配有真正的移动端界面——专为销售现场设计，而非仅限于桌面端。" },
    ],
    honestyEyebrow: "持续开发中 — 配合贵方节奏",
    honestyItems: [
      { titulo: "针对 Shineray 的定制", texto: "通过一次关于贵方流程与字段目录的深入了解会议，我们可以给出真实的定制时间估算——我们更愿意这样做，而不是在未了解细节前随意承诺日期。" },
      { titulo: "分渠道市场预算", texto: "这部分我们仍在开发中，可配合贵方决定推进的时间灵活调整。" },
      { titulo: "Key Report / Stand Up Report 自动提交", texto: "同样在开发中——这是能节省最多人工工作的一项，我们正持续推进。" },
    ],
    mapeoEyebrow: "针对 Shineray 的本地化定制",
    mapeoHeading: "我们一同回顾了贵方的 Key Report 与 Stand Up Report。其中每一项指标在 LAZUP 中都有对应位置——部分已实现，部分仍在开发中。",
    modulosEyebrow: "定制模块",
    modulosHeading: "以下三项是我们探讨过的内容，均建立在已有功能之上，而非从零开始。",
    modulo1Titulo: "售后：质保与保养",
    modulo1Texto: "根据 Shineray 的真实保养周期（每 10,000 公里或 6 个月）通过 WhatsApp 自动提醒，并按 VIN 码管理质保（3 年或 100,000 公里），基于 LAZUP 已有的预约引擎实现。",
    modulo2Titulo: "向 Shineray 自动生成报告",
    modulo2Texto: "基于 CRM 的真实数据，按贵方现有的双语格式自动生成 Key Report 与 Stand Up Report——是能节省最多人工工作的一项。",
    modulo3Titulo: "多网点、多区域管理",
    modulo3Texto: "每个销售网点数据独立，同时提供集团或全国层面的统一视图——基于 LAZUP 已实现的企业级数据隔离构建。",
    moduloResponsable: "LAZUP（Allitron）",
    moduloFecha: "待与 Shineray 共同确定",
    navBack: "返回主菜单",
    navNext: "下一步：数字化定位",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function CrmAllitronShinerayPage() {
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

      {/* Lo que mostramos en vivo */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.demoEyebrow}</Eyebrow>
        <p className="mb-8 max-w-[680px] font-display text-[1.35rem] font-bold leading-[1.4] text-[#101820] sm:text-[1.6rem]">
          {t.demoHeading}
        </p>
        <StepList items={[...t.demo]} />
      </SectionShell>

      {/* LAZUP: lo que vieron en vivo */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.lazupEyebrow}</Eyebrow>
        <SummaryBlock
          lead={t.lazupLead}
          pointsHeading={t.lazupPointsHeading}
          points={[...t.lazupPoints]}
        />
        <div className="mt-8">
          <StepList items={t.honestyItems.map((h) => ({ titulo: h.titulo, texto: h.texto }))} />
        </div>
      </SectionShell>

      {/* Mapeo Key Report -> LAZUP */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.mapeoEyebrow}</Eyebrow>
        <p className="mb-8 max-w-[680px] font-display text-[1.35rem] font-bold leading-[1.4] text-[#101820] sm:text-[1.6rem]">
          {t.mapeoHeading}
        </p>
        <StepList items={MAPEO[lang]} />
      </SectionShell>

      {/* Modulos a la medida */}
      <SectionShell className="bg-allitron-base">
        <Eyebrow>{t.modulosEyebrow}</Eyebrow>
        <p className="mb-8 max-w-[680px] font-display text-[1.35rem] font-bold leading-[1.4] text-foreground sm:text-[1.6rem]">
          {t.modulosHeading}
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <FrenteCard
            titulo={t.modulo1Titulo}
            compromiso={t.modulo1Texto}
            responsable={t.moduloResponsable}
            fecha={t.moduloFecha}
          />
          <FrenteCard
            titulo={t.modulo2Titulo}
            compromiso={t.modulo2Texto}
            responsable={t.moduloResponsable}
            fecha={t.moduloFecha}
            delay={0.05}
          />
          <FrenteCard
            titulo={t.modulo3Titulo}
            compromiso={t.modulo3Texto}
            responsable={t.moduloResponsable}
            fecha={t.moduloFecha}
            delay={0.1}
          />
        </div>
      </SectionShell>

      {/* Navegacion */}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/allitron-shineray"
          backLabel={t.navBack}
          nextHref="/entregas/allitron-shineray/maps"
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
