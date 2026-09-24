import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Domina Google: durante el lanzamiento hay UNA sola página de venta.
  // La ruta de producto manda a la landing de lanzamiento (307 temporal:
  // cuando termine el lanzamiento se puede volver a publicar una evergreen).
  // Solo la ruta exacta; /recepcion y /politica-de-reembolso no se tocan.
  async redirects() {
    return [
      {
        source: "/productos/domina-google",
        destination: "/productos/domina-google/lanzamiento",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
