// Presentación y capacidades basadas en el sitio original.
export const companyIntroduction = {
  source: 'https://www.navasoftsoluciones.com/nosotros/',
  metaDescription:
    'Conoce Navasoft Soluciones: software a la medida, misión, visión y valores que orientan nuestro trabajo.',
  text: 'Desarrollamos software a la medida para mejorar los procesos de las empresas y acompañarlas en sus necesidades tecnológicas.',
  capabilities:
    'Trabajamos desde el análisis y el diseño hasta el desarrollo y la implementación de sistemas. Ofrecemos servicios de outsourcing y outtasking, además de migración, optimización y control de calidad de software.',
}

export const aboutAreaDescriptions: Record<string, string> = {
  '/areas/gobierno': 'Soluciones tecnológicas para instituciones públicas.',
  '/areas/privado': 'Software a la medida para los procesos de tu empresa.',
  '/productos': 'Conoce las plataformas del ecosistema Navasoft.',
  '/areas/navalav': 'Explora nuestra área de innovación tecnológica.',
}

// Misión, visión y valores corresponden al material recibido de la empresa.
export const companyPurpose = [
  {
    id: 'mission',
    title: 'Misión',
    description:
      'Desarrollar soluciones tecnológicas innovadoras que optimicen y transformen los procesos de nuestros clientes, impulsando su crecimiento, eficiencia y competitividad en el mercado.',
  },
  {
    id: 'vision',
    title: 'Visión',
    description:
      'Ser una empresa líder en soluciones tecnológicas innovadoras, reconocida como un aliado estratégico en la transformación digital de las organizaciones, generando valor sostenible, eficiencia y competitividad.',
  },
] as const

// Compartir estos tipos evita aceptar identificadores que no existen en el catálogo.
export type CompanyPurposeItem = (typeof companyPurpose)[number]
export type CompanyPurposeId = CompanyPurposeItem['id']

// Descripciones propuestas para revisión; los nombres son los valores institucionales.
export const companyValues = [
  {
    id: 'commitment-innovation',
    title: 'Compromiso e innovación',
    description:
      'Buscamos nuevas formas de resolver cada reto y acompañamos su puesta en práctica.',
  },
  {
    id: 'teamwork',
    title: 'Trabajo en equipo',
    description:
      'Compartimos conocimientos y coordinamos esfuerzos con el equipo y nuestros clientes.',
  },
  {
    id: 'process-excellence',
    title: 'Excelencia en los procesos',
    description:
      'Cuidamos cada etapa del trabajo, desde el análisis hasta la entrega de la solución.',
  },
  {
    id: 'transparency',
    title: 'Transparencia',
    description:
      'Comunicamos con claridad los avances, las decisiones y los aspectos que requieren atención.',
  },
  {
    id: 'efficiency',
    title: 'Eficiencia',
    description:
      'Optimizamos tiempo y recursos para simplificar procesos y facilitar el trabajo diario.',
  },
] as const

export type CompanyValueId = (typeof companyValues)[number]['id']

// Eslogan incluido en el material institucional recibido.
export const institutionalPhrase =
  'Tecnología que innova, soluciones que transforman.'
