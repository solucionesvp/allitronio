// ── Los 3 caminos del Hub ──────────────────────────────────────────
// Cada uno es una experiencia inmersiva distinta (copy, preguntas y acento
// propios), no la misma forma repintada. "Primeros 100 gratis" es una
// política declarada, no un contador en vivo — no hay backend que cuente
// registros reales todavía.

import type { ImmersiveFormConfig } from "@/components/forms/ImmersiveForm";

export type HubPathId = "publico" | "empresa" | "creador";

export interface HubPath {
  id: HubPathId;
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  accent: string;
  form: ImmersiveFormConfig;
}

export const HUB_PATHS: HubPath[] = [
  {
    id: "publico",
    eyebrow: "PÚBLICO GENERAL",
    title: "Quiero ir a eventos, conocer gente y ver qué se construye aquí.",
    description: "Charlas, networking, demos de proyectos reales. Comunidad tech de Tepic y Nayarit.",
    badge: "Gratis para los primeros 100 registros",
    accent: "#09AFF2",
    form: {
      accent: "#09AFF2",
      subjectPrefix: "Hub Allitron — Registro público",
      successTitle: "Listo",
      successMessage:
        "Se abrió tu cliente de correo con tu registro. Si no se abrió, copia el mensaje y envíalo a auroraialazaro@gmail.com.",
      fields: [
        { key: "nombre", type: "text", question: "¿Cómo te llamas?", placeholder: "Tu nombre completo", required: true },
        { key: "contacto", type: "text", question: "¿Cómo te contactamos?", placeholder: "Email o WhatsApp", required: true },
        {
          key: "interes",
          type: "select",
          question: "¿Qué te interesa más?",
          options: ["Charlas y contenido", "Conocer gente / networking", "Ver proyectos y demos", "Todo lo anterior"],
          required: true,
        },
        { key: "comoTeEnteraste", type: "text", question: "¿Cómo te enteraste de Allitron? (opcional)", placeholder: "Redes, un amigo, un evento..." },
      ],
    },
  },
  {
    id: "empresa",
    eyebrow: "EMPRESAS · EMPRENDEDORES",
    title: "Tengo un negocio y quiero conectar con tecnología y talento real.",
    description: "Dueños de negocio, emprendedores y empresas buscando tecnología, talento o alianzas.",
    badge: "Gratis para los primeros 100 registros",
    accent: "#F2874C",
    form: {
      accent: "#F2874C",
      subjectPrefix: "Hub Allitron — Registro empresa",
      successTitle: "Listo",
      successMessage:
        "Se abrió tu cliente de correo con tu registro. Si no se abrió, copia el mensaje y envíalo a auroraialazaro@gmail.com.",
      fields: [
        { key: "nombre", type: "text", question: "¿Cómo te llamas?", placeholder: "Tu nombre completo", required: true },
        { key: "empresa", type: "text", question: "¿Cómo se llama tu negocio?", placeholder: "Nombre de la empresa", required: true },
        { key: "contacto", type: "text", question: "¿Cómo te contactamos?", placeholder: "Email o WhatsApp", required: true },
        {
          key: "buscando",
          type: "select",
          question: "¿Qué buscas principalmente?",
          options: ["Tecnología para mi negocio", "Conectar con talento/tecnólogos", "Patrocinar o colaborar", "Explorar, todavía no sé"],
          required: true,
        },
      ],
    },
  },
  {
    id: "creador",
    eyebrow: "PRODUCTOS DIGITALES",
    title: "Tengo un producto digital y quiero darlo a conocer.",
    description: "Tecnólogos y creadores con un producto — conecta con inversores, clientes o la comunidad.",
    accent: "#22D3EE",
    form: {
      accent: "#22D3EE",
      subjectPrefix: "Hub Allitron — Registro producto digital",
      successTitle: "Listo",
      successMessage:
        "Se abrió tu cliente de correo con tu registro. Si no se abrió, copia el mensaje y envíalo a auroraialazaro@gmail.com.",
      fields: [
        { key: "nombre", type: "text", question: "¿Cómo te llamas?", placeholder: "Tu nombre completo", required: true },
        { key: "proyecto", type: "text", question: "¿Cuál es tu proyecto o especialidad?", placeholder: "Nombre del proyecto o a qué te dedicas", required: true },
        { key: "descripcion", type: "textarea", question: "Cuéntanos brevemente de qué se trata", placeholder: "En pocas líneas — qué hace, en qué etapa está", required: true },
        {
          key: "buscando",
          type: "select",
          question: "¿Qué buscas?",
          options: ["Inversores", "Clientes", "Mentoría", "Conectar con la comunidad", "Otro"],
          required: true,
        },
        { key: "contacto", type: "email", question: "¿Cómo te contactamos?", placeholder: "tu@email.com", required: true },
        { key: "whatsapp", type: "tel", question: "WhatsApp (opcional)", placeholder: "10 dígitos" },
        {
          key: "postularEvento",
          type: "boolean",
          question: "¿Quieres postular tu proyecto para presentarlo en Revolución Tecnológica (20 sept)?",
          booleanOptions: [
            { label: "Sí, quiero postular", value: true },
            { label: "No, solo únanme al Hub", value: false },
          ],
        },
      ],
    },
  },
];
