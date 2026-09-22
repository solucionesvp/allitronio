import ComingSoonProduct from "@/components/product/ComingSoonProduct";
import { PRODUCT_ACCENTS, PRODUCT_NAMES } from "@/config/productTheme";

export default function SegundoCerebroPage() {
  return (
    <ComingSoonProduct
      name={PRODUCT_NAMES["second-brain"]}
      keyword="CEREBRO"
      accent={PRODUCT_ACCENTS["second-brain"]}
      tagline="Tu memoria operativa, siempre lista: procesos, decisiones y conocimiento del negocio en un solo sistema."
    />
  );
}
