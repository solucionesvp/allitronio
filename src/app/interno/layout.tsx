import type { Metadata } from "next";

// Nada bajo /interno se indexa ni se sigue — son herramientas internas de
// Allitron, no contenido del sitio.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function InternoLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-allitron-base">{children}</div>;
}
