// Presentación literal del sitio original; la fuente permite revisar futuras correcciones.
export const companyIntroduction = {
  source: 'https://www.navasoftsoluciones.com/nosotros/',
  metaDescription:
    'Conoce Navasoft Soluciones: software a la medida, misión, visión y valores que orientan nuestro trabajo.',
  text: 'Somos una innovadora fábrica de software que se destaca por el desarrollo de sistemas informáticos y la oferta de servicios de outsourcing y outtasking',
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
]

export const companyValues = [
  { id: 'commitment-innovation', title: 'Compromiso e innovación' },
  { id: 'teamwork', title: 'Trabajo en equipo' },
  { id: 'process-excellence', title: 'Excelencia en los procesos' },
  { id: 'transparency', title: 'Transparencia' },
  { id: 'efficiency', title: 'Eficiencia' },
] as const

export type CompanyValueId = (typeof companyValues)[number]['id']
