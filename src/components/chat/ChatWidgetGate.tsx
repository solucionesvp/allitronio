"use client";

// Decide en qué rutas se monta el chat de Alli. NO va en las landings de
// producto (Domina Google, Toma tu Mercado y Toma el Volante: cada una tiene su
// propio CTA y flujo a WhatsApp, y el widget compite con él), ni en /entregas ni
// /interno (material privado de clientes y socios).

import { usePathname } from "next/navigation";
import WhatsAppChatWidget from "./WhatsAppChatWidget";

const EXCLUDED_PREFIXES = ["/productos/domina-google", "/productos/toma-tu-mercado", "/productos/toma-el-volante", "/entregas", "/interno", "/api"];

export default function ChatWidgetGate() {
  const pathname = usePathname() || "/";
  if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <WhatsAppChatWidget />;
}
