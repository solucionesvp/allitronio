import type { Metadata } from "next";
import ProductosClient from "./ProductosClient";

const TITLE = "Productos — Allitron";
const DESCRIPTION =
  "Domina Google y Toma tu Mercado: qué resuelve cada uno, para quién es y por dónde empezar. Desde Tepic, Nayarit.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/productos" },
  openGraph: { type: "website", locale: "es_MX", url: "/productos", siteName: "Allitron", title: TITLE, description: DESCRIPTION },
};

export default function ProductosPage() {
  return <ProductosClient />;
}
