import type { Metadata } from "next";

// Ninguna página bajo /entregas se indexa ni se sigue — son entregas
// privadas para un destinatario puntual, no contenido público del sitio.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function EntregasLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-allitron-base">{children}</div>;
}
