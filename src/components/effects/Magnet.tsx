"use client";

// ── Magnet — efecto magnético que sigue el cursor ─────────────────────────
// Adaptado de una referencia visual (portafolio "Jack — 3D Creator"), pero
// implementado desde cero con nuestros propios tokens. No copia paleta ni
// contenido de esa referencia — solo la mecánica de interacción.
// Cuando el cursor entra en el radio `padding` alrededor del elemento, este
// se desplaza suavemente hacia él, dividido por `strength` (mayor strength =
// movimiento más sutil). Se desactiva por completo con prefers-reduced-motion.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  /** Radio en px alrededor del elemento donde el efecto se activa */
  padding?: number;
  /** Divisor de desplazamiento — mayor = más sutil */
  strength?: number;
  className?: string;
}

export default function Magnet({
  children,
  padding = 120,
  strength = 3,
  className = "",
}: MagnetProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const withinX = e.clientX > rect.left - padding && e.clientX < rect.right + padding;
      const withinY = e.clientY > rect.top - padding && e.clientY < rect.bottom + padding;

      if (withinX && withinY) {
        setActive(true);
        setPos({ x: dx / strength, y: dy / strength });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [padding, strength, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : {
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              transition: active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
              willChange: "transform",
            }
      }
    >
      {children}
    </div>
  );
}
