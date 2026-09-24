// ── Contenido de la landing /productos/domina-google ─────────────
// Basado en "MAPS 2.0 — Ficha Comercial" (Obsidian, fuente única de precio y alcance).
// Nombre público: "Domina Google. Atrae Clientes." — nunca mostrar el nombre
// interno del servicio de cara al usuario.

export const DG_INCLUDES = [
  "Arquitectura web en Next.js de alta velocidad",
  "Página de inicio optimizada para conversión local",
  "Investigación y estructura SEO inicial para búsquedas de intención local",
  "Optimización de tu ficha de Google Business Profile",
  "Conexión entre tu web y Google Maps",
  "Homologación de tus datos clave en web y redes",
  "Botón de contacto directo a WhatsApp",
  "Carga inicial de los contenidos que nos compartas",
  "Validación técnica antes de la entrega",
] as const;

export const DG_EXCLUDES = [
  "Manejo mensual de redes ni publicaciones recurrentes",
  "Pauta publicitaria",
  "Diseño de logotipo desde cero",
  "Sesión profesional de fotografía",
  "Gestión de mensajes o atención a tus clientes",
  "Garantía de ventas",
  "Primer lugar absoluto garantizado",
  "Cambios ilimitados",
] as const;

export const DG_IDEAL_CLIENT = [
  "Clínicas dentales",
  "Estéticas de especialidad",
  "Talleres",
  "Restaurantes establecidos",
  "Despachos contables y legales",
  "Proveedores locales",
  "Ferreterías industriales",
  "Servicios profesionales",
] as const;

export const DG_REQUIREMENTS = [
  "WhatsApp Business activo",
  "Capacidad de responder rápido",
  "Fotos reales del negocio disponibles",
] as const;

// Plazo y condición de entrega — único lugar donde viven en el código.
// El PRECIO no vive aquí: solo en los niveles de lanzamiento
// (DG_LAUNCH_TIERS en dominaGoogleLaunchContent.ts), espejo de la
// "MAPS 2.0 — Ficha Comercial" de Obsidian. No agregar precios en otro archivo.
export const DG_DELIVERY = {
  delivery: "7 días hábiles",
  deliveryNote:
    "El reloj arranca cuando nos compartes el 100% de tu información, fotos y textos. Sin material completo, no corre el tiempo.",
} as const;
