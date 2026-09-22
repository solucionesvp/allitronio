import ComingSoonProduct from "@/components/product/ComingSoonProduct";
import { PRODUCT_ACCENTS, PRODUCT_NAMES } from "@/config/productTheme";

export default function Allitron90Page() {
  return (
    <ComingSoonProduct
      name={PRODUCT_NAMES["allitron-90"]}
      keyword="ALLITRON90"
      accent={PRODUCT_ACCENTS["allitron-90"]}
      tagline="Diagnóstico + roadmap de 90 días para ordenar y escalar tu negocio con criterio, no con moda."
    />
  );
}
