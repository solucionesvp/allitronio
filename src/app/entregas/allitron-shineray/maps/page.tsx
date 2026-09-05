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
    current: "Posicionamiento digital — MAPS 2.0",
    eyebrowHero: "POSICIONAMIENTO DIGITAL EN MÉXICO",
    title: (
      <>
        MAPS 2.0: presencia y SEO local,
        <br />
        plaza por plaza.
      </>
    ),
    subtitle:
      "Nuestro sistema de presencia digital local — separado del CRM, pensado para que cada punto de venta compita bien en su ciudad.",
    mapsLead: "MAPS 2.0 es nuestro sistema de presencia digital local: sitio optimizado para SEO, posicionamiento en Google Business Profile y Maps, homologación de redes sociales, con una metodología de diagnóstico y entrega documentada paso a paso.",
    mapsHighlight: "Tang confirmó la aspiración de ser el número uno en dealers y mini trucks de México — MAPS 2.0 es la pieza que trabaja esa ambición desde lo digital: SEO y posicionamiento local, plaza por plaza.",
    mapsPointsHeading: "Cómo lo operamos",
    mapsPoints: [
      { label: "Metodología", text: "Proceso documentado de calificación, diagnóstico, alta técnica, SEO local y entrega — no una promesa suelta." },
      { label: "Aplicado por punto de venta", text: "No es un sitio genérico: presencia local propia para cada dealer y cada plaza." },
      { label: "Una identidad, muchas plazas", text: "Mismo dominio, mismos colores y el mismo estándar Shineray — cada dealer con su propia optimización local, dentro de una sola marca." },
    ],
    incluyeEyebrow: "QUÉ CONSTRUIMOS EN CADA PLAZA",
    incluye: [
      { titulo: "Arquitectura web de alta velocidad", texto: "Construida en Next.js, pensada para carga rápida y buen desempeño en SEO." },
      { titulo: "Página de inicio optimizada para conversión local", texto: "No una plantilla genérica: enfocada en que el visitante de esa ciudad actúe." },
      { titulo: "Investigación y estructura SEO por intención de búsqueda local", texto: "Qué busca la gente en esa plaza, y cómo estructurar el sitio para responder a eso." },
      { titulo: "Google Business Profile conectado a Maps", texto: "Ficha optimizada y enlazada correctamente, no solo dada de alta." },
      { titulo: "Homologación de datos entre web y redes", texto: "Mismo nombre, dirección, teléfono y horario en todos lados — sin inconsistencias que confundan a Google o al cliente." },
      { titulo: "Botón de contacto directo a WhatsApp", texto: "Del sitio a la conversación, sin pasos de más." },
    ],
    navBack: "Volver al menú principal",
    navNext: "Siguiente: Motor de Captación",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "数字化定位 — MAPS 2.0",
    eyebrowHero: "墨西哥市场数字化定位",
    title: (
      <>
        MAPS 2.0：
        <br />
        按区域的网站呈现与本地 SEO。
      </>
    ),
    subtitle: "我们独立于 CRM 的本地数字化定位系统——让每个销售网点都能在所在城市脱颖而出。",
    mapsLead: "MAPS 2.0 是我们的本地数字化定位系统：基于 Next.js 的高速优化网站、Google 商家资料与地图定位、社交媒体统一管理，并配有完整记录的诊断与交付方法论。",
    mapsHighlight: "唐先生确认了成为墨西哥经销商与迷你卡车市场第一的目标——MAPS 2.0 正是从数字层面推动这一目标的工具：逐个区域进行 SEO 与本地化定位。",
    mapsPointsHeading: "运作方式",
    mapsPoints: [
      { label: "方法论", text: "涵盖资格审核、诊断、技术搭建、本地 SEO 与交付的完整记录流程——而非空泛的承诺。" },
      { label: "按网点定制", text: "并非通用网站：为每个经销商和每个区域提供独立的本地化呈现。" },
      { label: "统一身份，多个区域", text: "共用同一域名、同样的品牌色彩与 Shineray 标准——每个经销商拥有各自的本地优化，同属一个品牌。" },
    ],
    incluyeEyebrow: "每个区域的具体建设内容",
    incluye: [
      { titulo: "高速网站架构", texto: "基于 Next.js 构建，兼顾加载速度与 SEO 表现。" },
      { titulo: "为本地转化优化的首页", texto: "并非通用模板：专注于让该城市的访问者采取行动。" },
      { titulo: "按本地搜索意图设计的 SEO 结构", texto: "了解该区域用户的搜索需求，并据此构建网站结构。" },
      { titulo: "与地图关联的 Google 商家资料", texto: "经过优化并正确关联，而不仅仅是注册。" },
      { titulo: "网站与社交媒体数据统一", texto: "名称、地址、电话与营业时间在各平台保持一致——避免让 Google 或客户产生困惑。" },
      { titulo: "直达 WhatsApp 的联系按钮", texto: "从网站到对话，无需多余步骤。" },
    ],
    navBack: "返回主菜单",
    navNext: "下一步：获客引擎",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function MapsAllitronShinerayPage() {
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

      {/* MAPS 2.0 */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.eyebrowHero}</Eyebrow>
        <SummaryBlock
          lead={t.mapsLead}
          highlight={t.mapsHighlight}
          pointsHeading={t.mapsPointsHeading}
          points={[...t.mapsPoints]}
        />
      </SectionShell>

      {/* Que incluye */}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.incluyeEyebrow}</Eyebrow>
        <StepList items={[...t.incluye]} />
      </SectionShell>

      {/* Navegacion */}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav
          backHref="/entregas/allitron-shineray"
          backLabel={t.navBack}
          nextHref="/entregas/allitron-shineray/captacion"
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
