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
    eyebrow: "REUNIÓN SHINERAY · IBS · 25 DE AGOSTO 2026",
    title: (
      <>
        Gracias por la visita y por
        <br />
        compartir su visión de crecimiento.
      </>
    ),
    subtitle: "Aquí queda todo lo conversado, más quiénes somos como grupo.",
    tile1Title: "Resumen y hoja de ruta",
    tile1Subtitle: "Lo conversado en la reunión y las ocho líneas de trabajo acordadas.",
    tile2Title: "Quiénes somos",
    tile2Subtitle: "Historia, experiencia automotriz y por qué este grupo es un socio confiable.",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    eyebrow: "SHINERAY · IBS 会议 · 2026 年 8 月 25 日",
    title: (
      <>
        感谢您的到访，
        <br />
        也感谢您分享增长愿景。
      </>
    ),
    subtitle: "这里记录了此次会晤的全部内容，以及我们团队的介绍。",
    tile1Title: "会议纪要与路线图",
    tile1Subtitle: "本次会议的沟通内容，以及双方商定的八项工作方向。",
    tile2Title: "关于我们",
    tile2Subtitle: "我们的历史、汽车行业经验，以及值得信赖的合作伙伴理由。",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function HubShinerayPage() {
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
            title={t.tile1Title}
            subtitle={t.tile1Subtitle}
            size="protagonist"
            kind="documento"
            href="/entregas/shineray/reunion-25-agosto"
          />
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title={t.tile2Title}
            subtitle={t.tile2Subtitle}
            kind="documento"
            href="/entregas/shineray/quienes-somos"
            delay={0.05}
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
