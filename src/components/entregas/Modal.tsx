"use client";

// ── Modal de entrega ─────────────────────────────────────────────────────
// Para piezas de tipo "media" (video, imagen, extracto destacado) que abren
// SOBRE el mismo hub, sin navegar a otra URL — a diferencia de los
// documentos, que siempre viven en su propia sub-página.

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function Modal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="glass-strong fixed left-1/2 top-1/2 z-[61] flex max-h-[86svh] w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[28px] outline-none"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
                  <Dialog.Title className="font-display text-[0.85rem] font-bold tracking-[0.02em] text-foreground">
                    {title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Cerrar"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:bg-white/[0.12] hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="overflow-y-auto px-6 py-6">{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
