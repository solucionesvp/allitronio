"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OptionalImage, OptionalVideo } from "@/components/media/OptionalAsset";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import { BRAND_LOGO, ICONS_CONTENIDO, ENTREGAS } from "@/config/assets";
import AlliGuide from "@/components/brand/AlliGuide";
import { EASE, SectionShell } from "@/components/entregas/ui";
import { BentoTile } from "@/components/entregas/BentoTile";
import { Modal } from "@/components/entregas/Modal";

export default function HubFamiliaPage() {
  const [modal, setModal] = useState<"mandarin" | "videos" | null>(null);

  return (
    <main className="relative bg-[var(--color-light)]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
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
            className="mb-8"
          >
            <OptionalImage
              src={BRAND_LOGO.dark}
              alt="Allitron"
              style={{ height: 22, width: "auto" }}
              fallback={<span className="font-display text-xs tracking-[0.35em] text-[#101820]">ALLITRON</span>}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-[0.62rem] font-semibold tracking-[0.4em] text-allitron-blue"
          >
            REUNIÓN SHINERAY · IBS · 25 DE AGOSTO 2026
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
            className="mt-2 font-body text-[0.7rem] font-medium tracking-[0.1em] text-secondary/70"
          >
            Uso interno · confidencial — no reenviar fuera del grupo familiar
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="mt-4 font-display font-black leading-[1.02] tracking-tight text-[#101820]"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)" }}
          >
            Todo lo de la reunión, en un solo lugar.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
            className="mt-6 max-w-[600px] font-body text-[0.95rem] leading-[1.85] text-secondary"
          >
            Elige qué quieres ver. El resumen completo y el plan de equipo
            abren su propia página; los videos y el extracto en mandarín se
            abren aquí mismo.
          </motion.p>
        </div>
      </section>

      {/* ── Bento grid ───────────────────────────────────────────────── */}
      <SectionShell>
        <div className="grid auto-rows-[minmax(176px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title="Resumen interno completo"
            subtitle="Los 8 frentes, riesgos y dudas abiertas — lectura completa de la reunión."
            size="protagonist"
            kind="documento"
            href="/entregas/valdes-menchaca-talavera/reunion-shineray-25-agosto"
          />
          <BentoTile
            icon={ICONS_CONTENIDO.documento}
            title="Plan de equipo"
            subtitle="Cómo nos organizamos desde el día 1 — propuesta de Allitron."
            kind="documento"
            href="/entregas/valdes-menchaca-talavera/plan-de-equipo"
            delay={0.05}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.video}
            title="Videos mostrados en la reunión"
            subtitle="Historia empresarial y por qué confiar en nosotros."
            kind="media"
            onClick={() => setModal("videos")}
            delay={0.1}
          />
          <BentoTile
            icon={ICONS_CONTENIDO.imagen}
            title="Lo que se habló en mandarín"
            subtitle="Extracto y traducción de la conversación interna de Shineray."
            kind="media"
            onClick={() => setModal("mandarin")}
            delay={0.15}
          />
        </div>
      </SectionShell>

      <footer className="border-t border-[#101820]/10 px-6 py-12 text-center sm:px-10">
        <p className="mx-auto max-w-[520px] font-body text-[0.78rem] leading-[1.7] text-secondary">
          Generado a partir de la grabación de la reunión del 25 de agosto de
          2026. Uso interno — no reenviar fuera del grupo familiar sin
          revisión de Allitron.
        </p>
      </footer>

      {/* ── Modal: videos ────────────────────────────────────────────── */}
      <Modal open={modal === "videos"} onOpenChange={(o) => setModal(o ? "videos" : null)} title="Videos mostrados en la reunión">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl bg-black/30">
              <OptionalVideo
                src={ENTREGAS.valdesMenchacaTalavera.videoHistoria}
                className="aspect-video w-full object-cover"
                fallback={
                  <PhotoFrame
                    src={ENTREGAS.valdesMenchacaTalavera.videoHistoriaPoster}
                    alt="Video 1 — Historia empresarial (pendiente de subir)"
                    aspect="aspect-video"
                    theme="city"
                    className="rounded-2xl opacity-80"
                  />
                }
              />
            </div>
            <p className="mt-2 font-display text-[0.78rem] font-bold text-foreground">Video 1 — Historia empresarial</p>
            <p className="font-body text-[0.78rem] text-muted">
              Desde 1958: maquinaria agrícola, energía, gasolineras, movilidad,
              expansión regional, real estate y educación.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl bg-black/30">
              <OptionalVideo
                src={ENTREGAS.valdesMenchacaTalavera.videoConfianza}
                className="aspect-video w-full object-cover"
                fallback={
                  <PhotoFrame
                    src={ENTREGAS.valdesMenchacaTalavera.videoConfianzaPoster}
                    alt="Video 2 — Por qué confiar en nosotros (pendiente de subir)"
                    aspect="aspect-video"
                    theme="spaceExterior"
                    className="rounded-2xl opacity-80"
                  />
                }
              />
            </div>
            <p className="mt-2 font-display text-[0.78rem] font-bold text-foreground">Video 2 — Por qué confiar en nosotros</p>
            <p className="font-body text-[0.78rem] text-muted">
              Experiencia multimarca, infraestructura automotriz, financiamiento
              Banorte, liderazgo de José Talavera y trayectoria Kyocera/Canon.
            </p>
          </div>
        </div>
        <p className="mt-5 font-body text-[0.74rem] leading-[1.6] text-muted">
          Los archivos de video reales todavía no están cargados en el sitio —
          este espacio se activa solo en cuanto se suban a{" "}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5">
            public/assets/entregas/valdes-menchaca-talavera/
          </code>
          .
        </p>
      </Modal>

      {/* ── Modal: mandarín ──────────────────────────────────────────── */}
      <Modal open={modal === "mandarin"} onOpenChange={(o) => setModal(o ? "mandarin" : null)} title="Conversación en mandarín — 00:49:15 a 00:50:16">
        <div className="space-y-5">
          <p className="font-body text-[0.85rem] leading-[1.7] text-muted">
            Audio lejano y parcialmente solapado. Solo se conserva lo
            recuperable; hay huecos marcados como inaudibles. No se escucha un
            acuerdo secreto ni una aprobación cerrada — es una consulta interna
            breve sobre viabilidad de financiamiento.
          </p>

          <div className="glass rounded-2xl p-5">
            <p className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-allitron-blue">
              Mandarín (recuperable, con reservas)
            </p>
            <p className="font-body text-[0.92rem] leading-[2] text-foreground" lang="zh">
              “OK，那个这几个银行的这个……你知道吗？”
              <br />
              “不知道。他们这是现在他们唯一能够做的那个……但是它那个利率相对比较高一点。”
              <br />
              “[inaudible / términos financieros]……因为它这个地方太小了。”
              <br />
              “那这样它是不是后面，比如说我们的财务会进……？”
              <br />
              “之后聊一下本地这个……我觉得可以这样。你的那个材料做完之后，我们就有个时间……过来，到这里或者小康……过来一起聊，对吧？”
            </p>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-allitron-orange">
              Traducción de lo inteligible
            </p>
            <p className="font-body text-[0.9rem] leading-[1.9] text-foreground">
              “OK, sobre estos bancos / esta entidad… ¿la conoces?”
              <br />
              “No. En este momento eso es lo único que pueden hacer… pero su
              tasa de interés es relativamente más alta.”
              <br />
              “[inaudible: se comparan otras opciones/entidades financieras]…
              porque este mercado/lugar es demasiado pequeño.”
              <br />
              “Entonces, ¿más adelante podría intervenir nuestro equipo
              financiero…?”
              <br />
              “Después podemos hablar de la parte local. Creo que se puede
              hacer así: cuando termines tus materiales, buscamos un momento
              para venir y hablarlo juntos aquí o con Xiaokang/Shineray, ¿de
              acuerdo?”
            </p>
          </div>

          <p className="font-body text-[0.8rem] leading-[1.7] text-muted">
            <strong className="text-foreground">Lectura:</strong> reconocen que
            una opción disponible cobra una tasa más alta, dudan de la
            capacidad de otras entidades en un mercado pequeño, y sugieren
            retomar el tema cuando el material local esté preparado. &ldquo;Xiaokang&rdquo;
            puede ser un nombre corporativo relacionado con Shineray o un
            nombre propio — el audio no permite fijarlo con certeza.
          </p>
        </div>
      </Modal>
    </main>
  );
}
