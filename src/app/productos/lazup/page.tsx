import ComingSoonProduct from "@/components/product/ComingSoonProduct";
import { PRODUCT_ACCENTS, PRODUCT_NAMES } from "@/config/productTheme";

export default function LazupPage() {
  return (
    <ComingSoonProduct
      name={PRODUCT_NAMES.lazup}
      keyword="LAZUP"
      accent={PRODUCT_ACCENTS.lazup}
      tagline="Tu negocio ordenado dentro de WhatsApp: conversaciones, seguimiento y ventas en un solo lugar."
    />
  );
}
