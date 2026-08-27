"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, ShieldCheck, TrendingUp, Award } from "lucide-react";
import { OptionalImage } from "@/components/media/OptionalAsset";
import { BRAND_LOGO } from "@/config/assets";
import { EASE, Eyebrow, SectionShell, Reveal, PageNav, LangToggle, type Lang } from "@/components/entregas/ui";
import { Breadcrumbs } from "@/components/entregas/Breadcrumbs";

const HITOS: Record<Lang, { icon: typeof Landmark; titulo: string; texto: string }[]> = {
  es: [
    {
      icon: Landmark,
      titulo: "Desde 1958",
      texto: "Más de seis décadas de trayectoria empresarial: maquinaria agrícola, energía, gasolineras, movilidad y expansión regional.",
    },
    {
      icon: TrendingUp,
      titulo: "Diversificación real",
      texto: "El grupo ha crecido hacia real estate y educación, con la misma disciplina operativa en cada nueva línea de negocio.",
    },
    {
      icon: ShieldCheck,
      titulo: "Infraestructura automotriz",
      texto: "Experiencia multimarca y capacidad de operación automotriz ya probada, con financiamiento institucional (Banorte) como respaldo.",
    },
    {
      icon: Award,
      titulo: "Liderazgo con trayectoria",
      texto: "José Talavera del Río encabeza el proyecto ante Shineray, con recorrido comercial que incluye marcas como Kyocera y Canon.",
    },
  ],
  zh: [
    {
      icon: Landmark,
      titulo: "始于 1958 年",
      texto: "六十余年的企业发展历程：农业机械、能源、加油站、出行服务及区域扩张。",
    },
    {
      icon: TrendingUp,
      titulo: "真实的多元化发展",
      texto: "集团已拓展至房地产与教育领域，每一项新业务都保持同样的运营纪律。",
    },
    {
      icon: ShieldCheck,
      titulo: "汽车行业基础设施",
      texto: "拥有经过验证的多品牌汽车运营经验，并有 Banorte 银行等机构融资作为支持。",
    },
    {
      icon: Award,
      titulo: "经验丰富的领导团队",
      texto: "José Talavera del Río 负责与 Shineray 的项目对接，其商业履历包括京瓷（Kyocera）和佳能（Canon）等品牌。",
    },
  ],
};

const T = {
  es: {
    hub: "Hub",
    current: "Quiénes somos",
    eyebrowHero: "FAMILIA VALDÉS MENCHACA · FAMILIA TALAVERA BÉJAR",
    title: "No somos un distribuidor improvisado.",
    subtitle:
      "Somos una plataforma empresarial respaldada por dos familias con experiencia operativa real, activos, red regional y capacidad automotriz — construida durante más de seis décadas, no desde cero para este proyecto.",
    importaEyebrow: "POR QUÉ ESTO IMPORTA PARA LA RELACIÓN",
    p1: "Crecer una red de vehículos comerciales ligeros en México requiere algo más que interés comercial: requiere un socio que ya sepa operar infraestructura, financiamiento y relaciones regionales. Eso es exactamente lo que este grupo aporta — trayectoria comprobable, no una promesa.",
    p2: "Aspiramos a que, con el tiempo, esta relación crezca más allá de lo comercial: que Shineray confíe en este grupo no solo para vender, sino como socio de largo plazo en México.",
    navBack: "Volver al menú principal",
    footer: "Allitron · Connecting the Future — Tepic, Nayarit.",
  },
  zh: {
    hub: "主菜单",
    current: "关于我们",
    eyebrowHero: "瓦尔德斯·门查卡家族 · 塔拉维拉·贝哈尔家族",
    title: "我们不是临时拼凑的经销商。",
    subtitle:
      "我们是一个由两个家族共同支持的企业平台，拥有真实的运营经验、资产、区域网络和汽车行业能力——这是历经六十余年积累的成果，而非为此项目临时组建。",
    importaEyebrow: "这对双方合作关系的意义",
    p1: "在墨西哥发展轻型商用车网络，需要的不仅是商业意愿，更需要一个懂得运营基础设施、融资和区域关系的合作伙伴。这正是本集团所能提供的——是经过验证的实绩，而非空泛的承诺。",
    p2: "我们希望随着时间推移，这段合作关系能超越单纯的商业往来：希望 Shineray 不仅将本集团视为销售伙伴，更视为在墨西哥的长期合作伙伴。",
    navBack: "返回主菜单",
    footer: "Allitron · Connecting the Future — 纳亚里特州蒂皮克市",
  },
} as const;

export default function QuienesSomosPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = T[lang];

  return (
    <main className="bg-allitron-base" lang={lang}>
      <Breadcrumbs hubHref="/entregas/shineray" hubLabel={t.hub} current={t.current} />
      {/* ── Hero (oscuro, deliberado) ────────────────────────────────── */}
      <section className="relative flex min-h-[50svh] flex-col justify-center overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 15% 15%, rgba(9,175,242,0.10) 0%, transparent 60%)",
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
              style={{ height: 22, width: "auto" }}
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
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)" }}
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

      {/* ── Hitos (claro — presentación, no alerta) ───────────────────── */}
      <SectionShell className="bg-[var(--color-light)]">
        <div className="grid gap-5 sm:grid-cols-2">
          {HITOS[lang].map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.titulo} delay={0.05 * i}>
                <div className="neu flex h-full flex-col gap-4 rounded-[22px] p-6">
                  <div className="neu-inset flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon size={20} className="text-allitron-blue" />
                  </div>
                  <h3 className="font-display text-[1rem] font-bold text-[#101820]">
                    {h.titulo}
                  </h3>
                  <p className="font-body text-[0.92rem] leading-[1.7] text-secondary">
                    {h.texto}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionShell>

      {/* ── Por qué importa (claro) ────────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)]">
        <Eyebrow tone="light">{t.importaEyebrow}</Eyebrow>
        <Reveal delay={0.05}>
          <div className="max-w-[720px] space-y-5">
            <p className="font-body text-[1.02rem] leading-[1.9] text-[#101820]">{t.p1}</p>
            <p className="font-body text-[1.02rem] leading-[1.9] text-[#101820]">{t.p2}</p>
          </div>
        </Reveal>
      </SectionShell>

      {/* ── Navegación para el lector ──────────────────────────────────*/}
      <SectionShell className="bg-[var(--color-light)] !py-10">
        <PageNav backHref="/entregas/shineray" backLabel={t.navBack} />
      </SectionShell>

      <footer className="border-t border-white/[0.06] bg-allitron-base px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-muted">
          {t.footer}
        </p>
      </footer>
    </main>
  );
}
