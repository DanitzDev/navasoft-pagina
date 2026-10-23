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

export const companyValues = [
  { id: 'commitment-innovation', title: 'Compromiso e innovación' },
  { id: 'teamwork', title: 'Trabajo en equipo' },
  { id: 'process-excellence', title: 'Excelencia en los procesos' },
  { id: 'transparency', title: 'Transparencia' },
  { id: 'efficiency', title: 'Eficiencia' },
] as const

export type CompanyValueId = (typeof companyValues)[number]['id']

// Eslogan incluido en el material institucional recibido.
export const institutionalPhrase =
  'Tecnología que innova, soluciones que transforman.'
