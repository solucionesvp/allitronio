import Link from "next/link";

// ── LegalFooter — pie mínimo para landings de campaña ────────────────────
// Sin menú de navegación (la landing tiene un solo camino), pero con los
// enlaces legales visibles: Meta y los clientes esperan encontrarlos.
export default function LegalFooter({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <footer className="w-full bg-allitron-base px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-center font-body text-[0.72rem] text-foreground/55 sm:flex-row sm:text-left">
        <span>© {new Date().getFullYear()} Allitron · Tepic, Nayarit</span>
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="underline-offset-4 hover:text-foreground hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
