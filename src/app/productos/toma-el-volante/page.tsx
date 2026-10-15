"use client";

// ── /productos/toma-el-volante — Landing de Toma el Volante (rediseño) ───────
// Vertical automotriz de Toma tu Mercado. Arco narrativo "Del caos al control":
//   Acto 1 hero → 2 la venta que se escapa → 3 del mensaje al cierre (+ tablero)
//   → 4 calculadora → 5 90 días (+ detalles) → 6 decisión → cierre con diagnóstico.
// Cada acto vive en su propio componente (misma carpeta). Copy, precios y
// fórmulas: src/data/tomaElVolanteContent.ts. Imágenes opcionales en
// public/assets/products/volante/ (PRODUCT_VOLANTE). Movimiento: framer-motion
// con <MotionConfig reducedMotion="user">. Sin cifras de resultados: aún no hay casos.

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import LegalFooter from "@/components/layout/LegalFooter";
import { Modal } from "@/components/entregas/Modal";
import { VOLANTE_AI_NOTE, VOLANTE_CTA_LABEL, VOLANTE_WHATSAPP_MESSAGE, buildWhatsAppLink } from "@/data/tomaElVolanteContent";
import { trackLandingEvent, trackLandingEventOnce } from "@/lib/landingEvents";
import AcquisitionCalculator from "./AcquisitionCalculator";
import CinematicHero from "./CinematicHero";
import DiagnosisCTA from "./DiagnosisCTA";
import DiagnosisForm from "./DiagnosisForm";
import ImplementationTimeline from "./ImplementationTimeline";
import LeadJourney from "./LeadJourney";
import PricingSection from "./PricingSection";
import ProblemSequence from "./ProblemSequence";
import { ACCENT, GRADIENT, LIGHT_VARS } from "./ui";

export default function TomaElVolantePage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("landing");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    trackLandingEventOnce("landing_view", { section: "pagina" });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLead = (source: string) => {
    setLeadSource(source);
    setLeadOpen(true);
  };
  const openFromCta = (source: string) => () => {
    if (source !== "hero") trackLandingEvent("diagnosis_cta_click", { section: source });
    openLead(source);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Modal open={leadOpen} onOpenChange={setLeadOpen} title="Solicitar diagnóstico comercial">
        <DiagnosisForm
          buildLink={buildWhatsAppLink}
          baseMessage={`${VOLANTE_WHATSAPP_MESSAGE}\n\n(Origen: Toma el Volante · ${leadSource})`}
          section={`modal-${leadSource}`}
          tone="dark"
        />
      </Modal>

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-allitron-base/80 px-6 py-3.5 backdrop-blur-sm lg:px-12">
        <span className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-foreground">
          ALLITRON <span style={{ color: ACCENT }}>· TOMA EL VOLANTE</span>
        </span>
        <button
          type="button"
          onClick={openFromCta("encabezado")}
          className="hidden min-h-[40px] items-center gap-2 rounded-sm px-4 py-2 font-display text-[0.58rem] font-bold tracking-[0.18em] text-white sm:inline-flex"
          style={{ background: GRADIENT }}
        >
          {VOLANTE_CTA_LABEL}
        </button>
      </header>

      <main style={LIGHT_VARS}>
        <CinematicHero onPrimary={() => openLead("hero")} />
        <ProblemSequence />
        <LeadJourney />
        <AcquisitionCalculator />
        <ImplementationTimeline />
        <PricingSection onCta={() => openLead("precio")} />
        <DiagnosisCTA />
      </main>

      <p className="bg-allitron-base px-6 pb-2 pt-6 text-center font-body text-[0.68rem] text-foreground/55">{VOLANTE_AI_NOTE}</p>
      <LegalFooter links={[{ label: "Aviso de privacidad", href: "/aviso-de-privacidad" }]} />

      {/* CTA fijo en móvil, con respeto por la safe area; se oculta mientras el cierre está a la vista. */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pt-6 transition-transform duration-300 md:hidden ${showSticky ? "translate-y-0" : "translate-y-full"}`}
        style={{ background: "linear-gradient(180deg, transparent, rgba(16,24,32,0.94) 45%)", paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={openFromCta("boton-fijo-movil")}
          tabIndex={showSticky ? 0 : -1}
          className="min-h-[52px] w-full rounded-sm px-6 py-4 font-display text-[0.66rem] font-bold tracking-[0.18em] text-white"
          style={{ background: GRADIENT }}
        >
          {VOLANTE_CTA_LABEL}
        </button>
      </div>
    </MotionConfig>
  );
}
