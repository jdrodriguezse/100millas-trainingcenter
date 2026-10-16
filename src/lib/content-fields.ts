export type ContentFieldType = "text" | "textarea" | "url";

export type ContentField = {
  key: string;
  label: string;
  type: ContentFieldType;
  default: string;
  group: string;
  help?: string;
};

export const CONTENT_GROUPS = [
  "Sección principal",
  "Cifras destacadas",
  "Programas",
  "Sección Try Out",
  "Contacto y redes",
] as const;

export const CONTENT_FIELDS: ContentField[] = [
  // Hero
  {
    key: "hero.badge",
    label: "Etiqueta superior",
    type: "text",
    default: "Academia de Béisbol de Alto Rendimiento",
    group: "Sección principal",
  },
  {
    key: "hero.titlePrefix",
    label: "Título (parte normal)",
    type: "text",
    default: "Entrena como un",
    group: "Sección principal",
  },
  {
    key: "hero.titleHighlight",
    label: "Título (parte resaltada)",
    type: "text",
    default: "pitcher de MLB",
    group: "Sección principal",
  },
  {
    key: "hero.subtitle",
    label: "Descripción",
    type: "textarea",
    default:
      "Desarrollamos velocidad, mecánica y disciplina al más alto nivel. Lleva tu pitcheo a las 100 MPH con entrenamiento profesional.",
    group: "Sección principal",
  },
  {
    key: "hero.ctaText",
    label: "Texto del botón principal",
    type: "text",
    default: "Participa en nuestro Try Out",
    group: "Sección principal",
  },
  {
    key: "hero.ctaSecondary",
    label: "Texto del botón secundario",
    type: "text",
    default: "Conoce los programas",
    group: "Sección principal",
  },
  {
    key: "hero.note",
    label: "Nota inferior",
    type: "text",
    default: "Cupos limitados · Inscripciones abiertas",
    group: "Sección principal",
  },

  // Stats
  {
    key: "stat.1.value",
    label: "Cifra 1 - valor",
    type: "text",
    default: "100",
    group: "Cifras destacadas",
  },
  {
    key: "stat.1.label",
    label: "Cifra 1 - texto",
    type: "text",
    default: "MPH meta de velocidad",
    group: "Cifras destacadas",
  },
  {
    key: "stat.2.value",
    label: "Cifra 2 - valor",
    type: "text",
    default: "500+",
    group: "Cifras destacadas",
  },
  {
    key: "stat.2.label",
    label: "Cifra 2 - texto",
    type: "text",
    default: "Atletas entrenados",
    group: "Cifras destacadas",
  },
  {
    key: "stat.3.value",
    label: "Cifra 3 - valor",
    type: "text",
    default: "12",
    group: "Cifras destacadas",
  },
  {
    key: "stat.3.label",
    label: "Cifra 3 - texto",
    type: "text",
    default: "Años de experiencia",
    group: "Cifras destacadas",
  },
  {
    key: "stat.4.value",
    label: "Cifra 4 - valor",
    type: "text",
    default: "MLB",
    group: "Cifras destacadas",
  },
  {
    key: "stat.4.label",
    label: "Cifra 4 - texto",
    type: "text",
    default: "Nivel de entrenamiento",
    group: "Cifras destacadas",
  },

  // Programs heading
  {
    key: "programs.eyebrow",
    label: "Etiqueta de la sección",
    type: "text",
    default: "Nuestros programas",
    group: "Programas",
  },
  {
    key: "programs.title",
    label: "Título de la sección",
    type: "text",
    default: "Formación integral para pitchers",
    group: "Programas",
  },
  {
    key: "programs.subtitle",
    label: "Descripción de la sección",
    type: "textarea",
    default:
      "Combinamos tecnología, preparación física y experiencia de juego para formar jugadores completos.",
    group: "Programas",
  },
  {
    key: "program.1.title",
    label: "Programa 1 - título",
    type: "text",
    default: "Velocidad de Pitcheo",
    group: "Programas",
  },
  {
    key: "program.1.text",
    label: "Programa 1 - descripción",
    type: "textarea",
    default:
      "Programa de desarrollo de velocidad con medición de MPH, mecánica y fortalecimiento del brazo.",
    group: "Programas",
  },
  {
    key: "program.2.title",
    label: "Programa 2 - título",
    type: "text",
    default: "Control y Mecánica",
    group: "Programas",
  },
  {
    key: "program.2.text",
    label: "Programa 2 - descripción",
    type: "textarea",
    default:
      "Corrección de mecánica, comando del pitcheo y trabajo de precisión en el strike zone.",
    group: "Programas",
  },
  {
    key: "program.3.title",
    label: "Programa 3 - título",
    type: "text",
    default: "Fuerza y Acondicionamiento",
    group: "Programas",
  },
  {
    key: "program.3.text",
    label: "Programa 3 - descripción",
    type: "textarea",
    default:
      "Entrenamiento físico especializado para pitchers: core, piernas y prevención de lesiones.",
    group: "Programas",
  },
  {
    key: "program.4.title",
    label: "Programa 4 - título",
    type: "text",
    default: "Defensa y Fundamentos",
    group: "Programas",
  },
  {
    key: "program.4.text",
    label: "Programa 4 - descripción",
    type: "textarea",
    default: "Trabajo de defensa, fildeo de la posición y fundamentos del juego.",
    group: "Programas",
  },
  {
    key: "program.5.title",
    label: "Programa 5 - título",
    type: "text",
    default: "Bateo y Ofensiva",
    group: "Programas",
  },
  {
    key: "program.5.text",
    label: "Programa 5 - descripción",
    type: "textarea",
    default:
      "Desarrollo de swing, contacto y poder para complementar el perfil del jugador.",
    group: "Programas",
  },
  {
    key: "program.6.title",
    label: "Programa 6 - título",
    type: "text",
    default: "Exposición y Reclutamiento",
    group: "Programas",
  },
  {
    key: "program.6.text",
    label: "Programa 6 - descripción",
    type: "textarea",
    default:
      "Preparación y vitrina para scouts, universidades y organizaciones de MLB.",
    group: "Programas",
  },

  // Try Out section
  {
    key: "tryout.title",
    label: "Título",
    type: "text",
    default: "¿Listo para el reto?",
    group: "Sección Try Out",
  },
  {
    key: "tryout.subtitle",
    label: "Descripción",
    type: "textarea",
    default:
      "Demuestra tu talento en nuestro próximo Try Out. Evaluamos velocidad, mecánica, defensa y ofensiva frente a entrenadores especializados.",
    group: "Sección Try Out",
  },
  {
    key: "tryout.date",
    label: "Próxima fecha",
    type: "text",
    default: "Próxima fecha por confirmar",
    group: "Sección Try Out",
  },
  {
    key: "tryout.place",
    label: "Lugar",
    type: "text",
    default: "Nuestras instalaciones",
    group: "Sección Try Out",
  },
  {
    key: "tryout.slots",
    label: "Cupos",
    type: "text",
    default: "Cupos limitados",
    group: "Sección Try Out",
  },

  // Contact
  {
    key: "contact.phone",
    label: "Teléfono",
    type: "text",
    default: "(+000) 000-0000",
    group: "Contacto y redes",
  },
  {
    key: "contact.email",
    label: "Correo electrónico",
    type: "text",
    default: "info@100millas.com",
    group: "Contacto y redes",
  },
  {
    key: "contact.address",
    label: "Dirección",
    type: "text",
    default: "Dirección de la academia",
    group: "Contacto y redes",
  },
  {
    key: "social.instagram",
    label: "Enlace de Instagram",
    type: "url",
    default: "#",
    group: "Contacto y redes",
  },
  {
    key: "social.facebook",
    label: "Enlace de Facebook",
    type: "url",
    default: "#",
    group: "Contacto y redes",
  },
  {
    key: "footer.description",
    label: "Descripción del pie de página",
    type: "textarea",
    default:
      "Academia de béisbol enfocada en el desarrollo de pitchers y jugadores de alto rendimiento.",
    group: "Contacto y redes",
  },
  {
    key: "footer.copyright",
    label: "Nombre de derechos reservados",
    type: "text",
    default: "100 Millas Training Center",
    group: "Contacto y redes",
  },
];

export type SiteContentMap = Record<string, string>;

export const DEFAULT_CONTENT: SiteContentMap = CONTENT_FIELDS.reduce(
  (acc, field) => {
    acc[field.key] = field.default;
    return acc;
  },
  {} as SiteContentMap,
);
