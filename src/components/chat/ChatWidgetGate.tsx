"use client";

// Decide en qué rutas se monta el chat de Alli. NO va en la landing de
// lanzamiento (tiene su propio flujo), ni en /entregas ni /interno (material
// privado de clientes y socios).

import { usePathname } from "next/navigation";
import WhatsAppChatWidget from "./WhatsAppChatWidget";

const EXCLUDED_PREFIXES = ["/productos/domina-google/lanzamiento", "/entregas", "/interno", "/api"];

export default function ChatWidgetGate() {
  const pathname = usePathname() || "/";
  if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <WhatsAppChatWidget />;
}
