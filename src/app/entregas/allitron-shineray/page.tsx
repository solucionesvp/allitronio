"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO, ICONS_CONTENIDO } from "@/config/assets";
import AlliGuide from "@/components/brand/AlliGuide";
import { EASE, SectionShell, LangToggle, type Lang } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";

const T = {
  es: {
    eyebrow: "ALLITRON · SHINERAY MÉXICO · 3 DE SEPTIEMBRE 2026",
    title: (
      <>
        Nos preguntaron por el CRM.
        <br />
        Aquí está Allitron para platicarlo.
      </>
    ),
    subtitle: "Una conversación aparte de la del grupo IBS: aquí Allitron se presenta directamente. Cinco documentos, en orden de lectura.",
    tile0Title: "Resumen de la reunión",
    tile0Subtitle: "Cómo se dio la reunión con Tang, y lo que quedó de ella.",
    tile1Title: "CRM y seguimiento comercial",
    tile1Subtitle: "El CRM (LAZUP) que vieron en vivo: mapeo a su Key Report y los módulos que platicamos.",
    tile2Title: "Posicionamiento digital — MAPS 2.0",
    tile2Subtitle: "Presencia y SEO local por plaza, dentro de una sola identidad Shineray.",
    tile3Title: "Motor de Captación",
    tile3Subtitle: "Pauta y captación de leads por ciudad, coordinada desde el corporativo.",
    tile4Title: "Gobernanza y próximos pasos",
    tile4Subtitle: "Quién opera qué, y lo que sigue después de esta entrega.",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    eyebrow: "ALLITRON · SHINERAY 墨西哥 · 2026 年 9 月 3 日",
    title: (
      <>
        贵方询问了 CRM，
        <br />
        Allitron 在此与您详谈。
      </>
    ),
    subtitle: "这是一次独立于 IBS 集团会议的对话：由 Allitron 直接介绍自己。共五份文档，按阅读顺序排列。",
    tile0Title: "会议摘要",
    tile0Subtitle: "与唐先生的会议经过，以及会议成果。",
    tile1Title: "CRM 与商务跟进",
    tile1Subtitle: "您现场看到的 CRM（LAZUP）：与贵方 Key Report 的对应关系，以及我们探讨过的模块。",
    tile2Title: "数字化定位 — MAPS 2.0",
    tile2Subtitle: "按区域的网站呈现与本地 SEO，统一在 Shineray 单一品牌之下。",
    tile3Title: "获客引擎",
    tile3Subtitle: "按城市协调、由集团统筹的广告投放与线索获取。",
    tile4Title: "治理架构与后续步骤",
    tile4Subtitle: "谁负责操作什么，以及这次交付之后的后续安排。",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function HubAllitronShinerayPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = T[lang];

  return (
    <main className="relative bg-[var(--color-light)]" lang={lang}>
      <section className="relative flex min-h-[56svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 85% 15%, rgba(9,175,242,0.12) 0%, transparent 60%)",
          }}
        />
        <AlliGuide side="right" size={96} className="top-24" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center"
          >
            <OptionalImage
              src={BRAND_LOGO.dark}
              alt="Allitron"
              style={{ height: 24, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-[#101820]">ALLITRON</span>}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mb-6"
          >
            <LangToggle lang={lang} onChange={setLang} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.2] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)" }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[600px] font-body text-[0.95rem] leading-[1.85] text-secondary"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <SectionShell>
        <div className="grid auto-rows-[minmax(176px,auto)] gap-5 sm:grid-cols-2">
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title={t.tile0Title}
            subtitle={t.tile0Subtitle}
            kind="documento"
            href="/entregas/allitron-shineray/resumen"
          />
          <BentoTile
            icon={ICONS_CONTENIDO.presentacion}
            title={t.tile1Title}
            subtitle={t.tile1Subtitle}
            kind="documento"
            href="/entregas/allitron-shineray/crm"
            delay={0.05}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title={t.tile2Title}
            subtitle={t.tile2Subtitle}
            kind="documento"
            href="/entregas/allitron-shineray/maps"
            delay={0.1}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title={t.tile3Title}
            subtitle={t.tile3Subtitle}
            kind="documento"
            href="/entregas/allitron-shineray/captacion"
            delay={0.15}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title={t.tile4Title}
            subtitle={t.tile4Subtitle}
            kind="documento"
            href="/entregas/allitron-shineray/siguientes-pasos"
            delay={0.2}
          />
        </div>
      </SectionShell>

      <footer className="border-t border-[#101820]/10 px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-secondary">
          {t.footer}
        </p>
      </footer>
    </main>
  );
}
