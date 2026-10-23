import type { HistoryMilestone } from './history'

// Imagen compartida de referencia; sustituirla por la imagen oficial de cada hito cuando llegue.
const referenceImage = {
  src: '/images/demo/imagen-referencia.jpg',
  alt: 'Imagen de referencia: equipo trabajando frente a monitores en un entorno tecnológico.',
}

// Material de maquetación. El texto de fundación fue compartido por el usuario;
// los otros años, textos e imágenes todavía requieren confirmación de la empresa.
// Cada registro reúne sus datos para evitar cruzar títulos y años al editar.
export const historyPreview: HistoryMilestone[] = [
  {
    id: 'foundation',
    year: 2011,
    title: 'Fundación de Navasoft: El inicio de nuestra historia',
    description:
      'En 2011 nacimos con la visión de transformar el sector tecnológico mediante soluciones de software a la medida. Este año marcó el inicio de nuestro compromiso con la excelencia y la innovación.',
    image: referenceImage,
  },
  {
    id: 'pending-1',
    year: 2014,
    title: 'Consectetur adipiscing elit',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    image: referenceImage,
  },
  {
    id: 'pending-2',
    year: 2018,
    title: 'Sed do eiusmod tempor',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: referenceImage,
  },
  {
    id: 'pending-3',
    year: 2022,
    title: 'Ut enim ad minim veniam',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: referenceImage,
  },
  {
    id: 'pending-4',
    year: 2026,
    title: 'Duis aute irure dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: referenceImage,
  },
]
