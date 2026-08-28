import { NextRequest, NextResponse } from "next/server";

// ── Candado de /entregas y /interno — protección real, del lado del servidor
// No es un truco de JS en el cliente: si no hay cookie válida, el servidor
// nunca manda el HTML de la página protegida, redirige a la pantalla de acceso.

type EntregasScope = "entregas_familia" | "entregas_shineray" | "entregas_fundadores" | "entregas_nayarit";

const ENTREGAS_PROTECTED: { prefix: string; scope: EntregasScope }[] = [
  { prefix: "/entregas/valdes-menchaca-talavera", scope: "entregas_familia" },
  { prefix: "/entregas/shineray", scope: "entregas_shineray" },
  { prefix: "/entregas/fundadores-agosto26", scope: "entregas_fundadores" },
  { prefix: "/entregas/nayarit-innovador", scope: "entregas_nayarit" },
];

// ── /interno/finanzas — control financiero (no público, no indexado) ──────
// La cookie "finanzas_session" guarda un ROL ("admin" | "viewer"), no solo
// "ok" como /entregas: admin puede cargar/editar/eliminar movimientos,
// viewer (Miki) solo puede consultar. La restricción de escritura real se
// aplica otra vez en cada API route — el middleware solo decide quién entra.
const FINANZAS_ROLES = new Set(["admin", "viewer"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/entregas/acceso")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/interno/finanzas/acceso")) {
    return NextResponse.next();
  }

  const entregasMatch = ENTREGAS_PROTECTED.find((p) => pathname.startsWith(p.prefix));
  if (entregasMatch) {
    const authed = req.cookies.get(entregasMatch.scope)?.value === "ok";
    if (authed) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/entregas/acceso";
    url.search = "";
    url.searchParams.set("next", pathname);
    url.searchParams.set("scope", entregasMatch.scope);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/interno/finanzas")) {
    const role = req.cookies.get("finanzas_session")?.value;
    if (role && FINANZAS_ROLES.has(role)) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/interno/finanzas/acceso";
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/entregas/:path*", "/interno/:path*"],
};
