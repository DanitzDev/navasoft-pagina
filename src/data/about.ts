// Presentación y capacidades basadas en el sitio original.
export const companyIntroduction = {
  source: 'https://www.navasoftsoluciones.com/nosotros/',
  metaDescription:
    'Conoce Navasoft Soluciones, empresa de tecnología costarricense especializada en transformar operaciones críticas mediante software, plataformas e integración tecnológica.',
  text: 'Navasoft Soluciones es una empresa de tecnología costarricense especializada en transformar operaciones críticas. Diseñamos, desarrollamos e integramos soluciones alrededor de los procesos que sostienen a cada organización.',
  capabilities:
    'Acompañamos a las organizaciones desde el análisis de sus procesos hasta el diseño, desarrollo e implementación de soluciones. Integramos plataformas y sistemas para mejorar la continuidad, eficiencia y capacidad de evolución de sus operaciones.',
}

export const aboutBusinessAreas = [
  {
    label: 'Sector Público',
    href: '/areas/soluciones',
    hash: 'gobierno',
    description:
      'Modernizamos procesos, servicios y operaciones para instituciones que impactan a miles de ciudadanos.',
  },
  {
    label: 'Sector empresarial',
    href: '/areas/soluciones',
    hash: 'empresas',
    description:
      'Ayudamos a organizaciones privadas a optimizar operaciones, integrar sistemas y acelerar su crecimiento.',
  },
  {
    label: 'Ecosistema SaaS',
    href: '/productos',
    description: 'Conoce las plataformas del ecosistema Navasoft.',
  },
  {
    label: 'InnovationLab',
    href: '/areas/innovationlab',
    description: 'Explora InnovationLab, nuestra área de tecnologías emergentes.',
  },
] as const

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
