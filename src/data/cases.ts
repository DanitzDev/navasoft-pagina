export type CaseStudy = {
  id: 'jasec' | 'cosevi'
  client: string
  sector: string
  title: string
  summary: string
  image: string
  tags: readonly string[]
  focus: readonly { title: string; description: string }[]
}

// Texto de maquetación basado en la captura del prototipo, pendiente de validación institucional.
// Las imágenes son referencias visuales existentes, no fotografías de las instalaciones del cliente.
export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'jasec',
    client: 'JASEC',
    sector: 'Electrificación y servicios públicos',
    title: 'Garantizando la continuidad de servicios críticos.',
    summary:
      'Modernizamos procesos operativos y comerciales que respaldan la gestión de servicios esenciales para miles de usuarios.',
    image: '/images/area-publico.jpeg',
    tags: ['Operación continua', 'Gestión comercial', 'Procesos críticos'],
    focus: [
      {
        title: 'Operación continua',
        description:
          'Continuidad de los servicios esenciales y seguimiento de la operación.',
      },
      {
        title: 'Gestión comercial',
        description:
          'Información para respaldar los procesos comerciales de los servicios públicos.',
      },
      {
        title: 'Procesos críticos',
        description:
          'Organización de los procesos prioritarios para la gestión institucional.',
      },
    ],
  },
  {
    id: 'cosevi',
    client: 'COSEVI',
    sector: 'Instituciones públicas',
    title: 'Expedientes digitales con trazabilidad completa.',
    summary:
      'Transformamos procesos institucionales para que la información esté disponible cuando realmente importa.',
    image: '/images/hero-trust.jpeg',
    tags: ['Digitalización', 'Evidencia documental', 'Seguimiento de trámites'],
    focus: [
      {
        title: 'Digitalización',
        description: 'Información institucional disponible en formato digital.',
      },
      {
        title: 'Evidencia documental',
        description:
          'Organización de los documentos que respaldan cada expediente.',
      },
      {
        title: 'Seguimiento de trámites',
        description:
          'Trazabilidad de la información a lo largo del proceso institucional.',
      },
    ],
  },
]

export const casesIntroduction = {
  eyebrow: 'Experiencia comprobada',
  title: 'Tecnología que ya está generando resultados.',
  description:
    'Durante más de 15 años hemos desarrollado soluciones para instituciones, empresas y organizaciones que requieren tecnología confiable, escalable y preparada para crecer.',
}
