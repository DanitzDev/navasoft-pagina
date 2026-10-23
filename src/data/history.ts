// Contenido de la trayectoria compartido por la empresa. Las imágenes siguen siendo de referencia.
export type HistoryMilestone = {
  // Mantener el id aunque cambie el texto: identifica la selección del hito.
  id: string
  year: number
  // Los períodos conservan su año inicial para ordenar y su año final para mostrarse completos.
  endYear?: number
  title: string
  description?: string
  highlights?: string[]
  // Productos o subapartados de un acontecimiento; los reconocimientos se muestran aparte.
  sections?: { title: string; description: string }[]
  recognition?: { title: string; description: string }
  image?: { src: string; alt: string }
}

// Sustituir por la imagen correspondiente a cada hito cuando llegue el material definitivo.
const referenceImage = {
  src: '/images/demo/imagen-referencia.jpg',
  alt: 'Imagen de referencia: equipo trabajando frente a monitores en un entorno tecnológico.',
}

export const history: HistoryMilestone[] = [
  {
    id: 'foundation',
    year: 2011,
    title: 'Fundación de Navasoft Soluciones',
    highlights: [
      'Inicio de operaciones.',
      'Desarrollo de soluciones empresariales a la medida.',
      'Primeros clientes en los sectores comercial e industrial.',
    ],
    image: referenceImage,
  },
  {
    id: 'evolution-crm',
    year: 2012,
    title: 'Primer producto corporativo',
    highlights: [
      'Desarrollo de Evolution CRM para la gestión de clientes, ventas y seguimiento comercial.',
    ],
    image: referenceImage,
  },
  {
    id: 'manufacturing-production',
    year: 2013,
    endYear: 2016,
    title: 'Incursión en manufactura y producción',
    highlights: [
      'Implementación de sistemas de matadero, pesaje, inventarios y distribución.',
      'Desarrollo de soluciones para empresas de alimentos y agroindustria.',
      'Consolidación de la plataforma CAPRES.',
    ],
    image: referenceImage,
  },
  {
    id: 'business-maturity',
    year: 2017,
    endYear: 2019,
    title: 'Madurez empresarial',
    highlights: [
      'Implementación de ERP, cuentas por cobrar e integración de procesos.',
      'Adaptación de clientes al modelo de factura electrónica.',
      'Desarrollo de plataformas documentales y de gestión empresarial.',
    ],
    image: referenceImage,
  },
  {
    id: 'digital-transformation',
    year: 2020,
    title: 'Transformación Digital',
    highlights: [
      'Automatización de procesos empresariales.',
      'Sistemas de aprobación electrónica.',
      'Gestión documental e integración de plataformas.',
    ],
    image: referenceImage,
  },
  {
    id: 'banking-government',
    year: 2021,
    endYear: 2022,
    title: 'Ingreso a banca y gobierno',
    highlights: [
      'Participación en proyectos para Banco Nacional.',
      'Proyectos para INA.',
      'Desarrollo de soluciones para instituciones públicas.',
      'Expansión de la experiencia en Oracle, integración y gobierno digital.',
    ],
    image: referenceImage,
  },
  {
    id: 'navastay-launch',
    year: 2023,
    title: 'Nacimiento de Navastay',
    highlights: [
      'Lanzamiento de Navastay, plataforma orientada al sector de habitacional.',
      'Primer paso formal hacia un ecosistema de productos propios de Navasoft Soluciones.',
    ],
    image: referenceImage,
  },
  {
    id: 'public-sector-consolidation',
    year: 2024,
    title: 'Consolidación del sector público',
    highlights: [
      'Proyectos estratégicos para municipalidades e instituciones gubernamentales.',
      'Participación en iniciativas de modernización digital.',
    ],
    image: referenceImage,
  },
  {
    id: 'innovation-mobility',
    year: 2025,
    title: 'Innovación y movilidad',
    highlights: [
      'Aplicaciones móviles.',
      'Nuevas soluciones de gestión operativa.',
      'Crecimiento de la cartera de clientes públicos y privados.',
    ],
    image: referenceImage,
  },
  {
    id: 'fifteen-years-ecosystem',
    year: 2026,
    title: 'Lanzamiento del Ecosistema Navasoft Soluciones',
    sections: [
      {
        title: 'Gridxia',
        description:
          'Plataforma para gestión y digitalización de procesos empresariales.',
      },
      {
        title: 'Tracxia',
        description:
          'Solución especializada en trazabilidad y control operativo.',
      },
      {
        title: 'Ordexia',
        description:
          'Plataforma para administración de órdenes y flujos de trabajo.',
      },
      {
        title: 'Factxia',
        description:
          'Solución para facturación electrónica y gestión tributaria.',
      },
    ],
    recognition: {
      title: 'Certificación Libre de Efectivo',
      description:
        'Reconocimiento otorgado por el Banco Central de Costa Rica.',
    },
    image: referenceImage,
  },
]
