import { NextRequest, NextResponse } from "next/server";

// ── Candado de /entregas — protección real, del lado del servidor ──────────
// No es un truco de JS en el cliente: si no hay cookie válida, el servidor
// nunca manda el HTML de la página protegida, redirige a /entregas/acceso.

type Scope = "entregas_familia" | "entregas_shineray" | "entregas_fundadores" | "entregas_nayarit";

const PROTECTED: { prefix: string; scope: Scope }[] = [
  { prefix: "/entregas/valdes-menchaca-talavera", scope: "entregas_familia" },
  { prefix: "/entregas/shineray", scope: "entregas_shineray" },
  { prefix: "/entregas/fundadores-agosto26", scope: "entregas_fundadores" },
  { prefix: "/entregas/nayarit-innovador", scope: "entregas_nayarit" },
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/entregas/acceso")) {
    return NextResponse.next();
  }

  const match = PROTECTED.find((p) => pathname.startsWith(p.prefix));
  if (!match) return NextResponse.next();

  const authed = req.cookies.get(match.scope)?.value === "ok";
  if (authed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/entregas/acceso";
  url.search = "";
  url.searchParams.set("next", pathname);
  url.searchParams.set("scope", match.scope);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/entregas/:path*"],
};
