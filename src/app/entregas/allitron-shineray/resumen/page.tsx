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
    current: "Resumen de la reunión",
    eyebrowHero: "SEGUIMIENTO · REUNIÓN CON SHINERAY",
    title: (
      <>
        Gracias por su tiempo.
        <br />
        Esto es lo que vimos juntos.
      </>
    ),
    subtitle: "Un resumen completo de cómo se dio la reunión, lo que se platicó y lo que quedó de ella, antes de entrar a cada documento.",
    ctxEyebrow: "CÓMO LLEGAMOS AQUÍ",
    ctxLead:
      "Tang Yajin nos escribió, a petición de Ms. Chen, para conocer el sistema de gestión que usa el grupo. En la reunión mostramos LAZUP en vivo —no solo en diapositivas— y platicamos cómo tropicalizarlo a la operación de Shineray.",
    ctxHighlight:
      "“Un muy buen sistema” — así lo describió Tang al cierre de la demostración.",
    ctxPointsHeading: "En corto",
    ctxPoints: [
      { label: "Preguntas resueltas en vivo", text: "Transferencia entre departamentos, resultado por vendedor, reportes automáticos, sugerencias de IA y uso en celular — todas con respuesta concreta, no genérica." },
      { label: "Lo que sigue", text: "Compartir este enlace con Tang —reúne todo lo que pidió ver— y una posible visita a Tepic para ver el sistema en operación." },
    ],
    temasEyebrow: "TEMAS TRATADOS EN LA REUNIÓN",
    temasHeading: "Con el detalle de lo que se platicó, punto por punto.",
    temas: [
      { titulo: "Encuadre de la reunión", texto: "No veníamos a vender algo cerrado: mostramos el estado real del CRM y exploramos con ustedes ser su proveedor de tecnología y marketing." },
      { titulo: "LAZUP como desarrollo propio", texto: "Cerca de dos años de desarrollo y seis meses de pruebas con empresas reales — no es un producto de terceros ni una demo armada para la ocasión." },
      { titulo: "Demostración en vivo", texto: "Cerca de 20 minutos mostrando ficha única de contacto, WhatsApp centralizado, pipelines tipo Kanban, citas, agentes de IA por departamento, campañas, reportes descargables, operación multiagencia y vista móvil." },
      { titulo: "Mapeo contra su Key Report y Stand Up Report", texto: "Revisamos juntos leads gestionables, citas agendadas, tasa de cierre, presupuesto por canal y el envío del reporte — indicador por indicador, sin generalizar." },
      { titulo: "Sus preguntas, respondidas en vivo", texto: "Transferencia entre departamentos, resultado por vendedor, reportes automáticos, sugerencias de IA al vendedor y uso en iPhone/celular — cada una con la demo como evidencia, no como promesa." },
      { titulo: "Módulos propuestos", texto: "Postventa (garantía y mantenimiento) y multiagencia/multiplaza — ambos construidos sobre lo que ya existe en LAZUP, no desde cero." },
      { titulo: "Posicionamiento digital", texto: "Presentamos MAPS 2.0 como estrategia de posicionamiento regional; Tang confirmó la aspiración de ser el número uno en dealers y mini trucks de México." },
      { titulo: "Un límite claro", texto: "Dejamos claro que LAZUP es un sistema comercial —de contacto, conversación y seguimiento— no de facturación ni de inventario." },
    ],
    acuerdosEyebrow: "ACUERDOS Y SIGUIENTES DEFINICIONES",
    acuerdosHeading: "Separado por lo que ya quedó claro, lo que es intención de ambas partes, y lo que definiremos juntos más adelante.",
    confirmadoLabel: "Confirmado",
    confirmado: [
      { titulo: "Compartir este enlace con Tang", texto: "Reúne la presentación completa que pidió ver al cierre de la reunión — así es como entregamos nosotros, sin PDF por separado." },
    ],
    intencionesLabel: "Intenciones — no acuerdos cerrados",
    intenciones: [
      { titulo: "Visita de Tang a Tepic", texto: "Para ver el sistema en operación y seguir platicando sugerencias — sin fecha confirmada." },
      { titulo: "Tropicalizar LAZUP a sus procesos", texto: "Pendiente de una sesión de descubrimiento antes de estimar tiempos o alcance." },
      { titulo: "Colaborar como aliado tecnológico y de marketing", texto: "Propuesta exploratoria de nuestra parte — sin nombramiento todavía." },
    ],
    pendienteLabel: "Por definir en conjunto",
    pendiente: [
      { titulo: "Precio, licenciamiento y forma de pago", texto: "Se define una vez que conozcamos el alcance real." },
      { titulo: "Alcance de un piloto", texto: "Dealer de prueba, volumen y usuarios — a decidir con su equipo." },
      { titulo: "Fecha de arranque y entregables", texto: "Depende de la sesión de descubrimiento y de sus prioridades." },
      { titulo: "Seguridad, datos e integraciones", texto: "Alojamiento, privacidad y conexión con sus sistemas corporativos — se revisa con su área técnica." },
    ],
    navBack: "Volver al menú principal",
    navNext: "Siguiente: CRM y seguimiento comercial",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "会议摘要",
    eyebrowHero: "后续跟进 · 与 SHINERAY 的会议",
    title: (
      <>
        感谢您的时间，
        <br />
        以下是我们共同回顾的内容。
      </>
    ),
    subtitle: "在进入每份文档之前，先完整回顾会议的经过、探讨的内容与会议成果。",
    ctxEyebrow: "会议缘起",
    ctxLead:
      "唐亚金根据陈女士的要求联系我们，希望了解本集团使用的管理系统。会议中我们现场演示了 LAZUP——不仅是幻灯片——并探讨了如何将其本地化定制以适配 Shineray 的运营。",
    ctxHighlight: "“一个非常好的系统”——这是唐先生在演示结束时给出的评价。",
    ctxPointsHeading: "简要回顾",
    ctxPoints: [
      { label: "现场解答的问题", text: "部门间转接、按销售员查看结果、自动报告、AI 建议以及手机使用——每个问题都给出了具体而非泛泛的回答。" },
      { label: "后续安排", text: "与唐先生分享此链接——涵盖他要求查看的全部内容——并可能安排前往蒂皮克实地考察系统运行情况。" },
    ],
    temasEyebrow: "会议中探讨的内容",
    temasHeading: "以下是逐项探讨的详细内容。",
    temas: [
      { titulo: "会议定位", texto: "我们并非来推销既定方案：而是展示 CRM 的真实现状，并与贵方探讨成为技术与营销供应商的可能性。" },
      { titulo: "LAZUP 是自主研发产品", texto: "历时近两年开发，并已与真实企业进行了六个月测试——并非第三方产品，也不是临时搭建的演示。" },
      { titulo: "现场演示", texto: "约 20 分钟，展示了统一联系人档案、集中化 WhatsApp、看板式销售管道、预约、各部门 AI 助手、营销活动、可下载报告、多网点运营与移动端界面。" },
      { titulo: "与 Key Report 及 Stand Up Report 的对应", texto: "我们逐项回顾了可管理的潜在客户、已安排的预约、签约率、分渠道预算与报告提交——逐条对应，不做笼统概括。" },
      { titulo: "现场解答的问题", texto: "部门间转接、按销售员查看结果、自动生成报告、向销售员提供 AI 建议，以及在 iPhone/手机上的使用——每一项都以演示作为佐证，而非承诺。" },
      { titulo: "提出的模块", texto: "售后（质保与保养）以及多网点/多区域管理——均建立在 LAZUP 已有功能之上，而非从零开始。" },
      { titulo: "数字化定位", texto: "我们介绍了 MAPS 2.0 作为区域定位策略；唐先生确认了成为墨西哥经销商与迷你卡车市场第一的目标。" },
      { titulo: "明确的边界", texto: "我们明确说明 LAZUP 是一套商务系统——用于联系人、对话与跟进——而非财务或库存系统。" },
    ],
    acuerdosEyebrow: "会议成果与后续待定事项",
    acuerdosHeading: "分为已明确的事项、双方的意向，以及需要后续共同确定的部分。",
    confirmadoLabel: "已确认",
    confirmado: [
      { titulo: "与唐先生分享此链接", texto: "涵盖他在会议结束时要求查看的完整演示内容——这正是我们的交付方式，无需另外提供 PDF。" },
    ],
    intencionesLabel: "意向 — 尚未达成正式约定",
    intenciones: [
      { titulo: "唐先生前往蒂皮克考察", texto: "实地查看系统运行情况并继续交流建议——尚未确定具体日期。" },
      { titulo: "将 LAZUP 本地化定制以适配贵方流程", texto: "需先进行深入了解会议，才能估算时间或范围。" },
      { titulo: "作为技术与营销合作伙伴", texto: "这是我们提出的探索性提案——尚未正式确立。" },
    ],
    pendienteLabel: "需共同确定",
    pendiente: [
      { titulo: "价格、许可与付款方式", texto: "待了解真实范围后再确定。" },
      { titulo: "试点范围", texto: "试点经销商、数量与用户——由贵方团队决定。" },
      { titulo: "启动日期与交付物", texto: "取决于深入了解会议的结果与贵方的优先事项。" },
      { titulo: "安全、数据与系统集成", texto: "托管、隐私与贵方企业系统的连接——需与贵方技术团队一同评估。" },
    ],
    navBack: "返回主菜单",
    navNext: "下一步：CRM 与商务跟进",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function ResumenAllitronShinerayPage() {
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

      {/* Contexto */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.ctxEyebrow}</Eyebrow>
        <SummaryBlock
          lead={t.ctxLead}
          highlight={t.ctxHighlight}
          pointsHeading={t.ctxPointsHeading}
          points={[...t.ctxPoints]}
        />
      </SectionShell>

      {/* Temas tratados */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.temasEyebrow}</Eyebrow>
        <p className="mb-8 max-w-[680px] font-display text-[1.35rem] font-bold leading-[1.4] text-[#101820] sm:text-[1.6rem]">
          {t.temasHeading}
        </p>
        <StepList items={[...t.temas]} />
      </SectionShell>

      {/* Acuerdos */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.acuerdosEyebrow}</Eyebrow>
        <p className="mb-8 max-w-[680px] font-display text-[1.35rem] font-bold leading-[1.4] text-[#101820] sm:text-[1.6rem]">
          {t.acuerdosHeading}
        </p>
        <p className="mb-3 font-display text-[0.95rem] font-bold text-[#101820]">{t.confirmadoLabel}</p>
        <StepList items={[...t.confirmado]} />
        <p className="mb-3 mt-8 font-display text-[0.95rem] font-bold text-[#101820]">{t.intencionesLabel}</p>
        <StepList items={[...t.intenciones]} />
        <p className="mb-3 mt-8 font-display text-[0.95rem] font-bold text-[#101820]">{t.pendienteLabel}</p>
        <StepList items={[...t.pendiente]} />
      </SectionShell>

      {/* Navegacion */}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/allitron-shineray"
          backLabel={t.navBack}
          nextHref="/entregas/allitron-shineray/crm"
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
