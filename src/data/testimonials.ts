import type { Testimonial } from '../types/trust'

// Contenido ilustrativo para maquetación. Reemplazar por citas aprobadas antes
// de presentar estos testimonios como opiniones reales de clientes.
export const testimonials: readonly Testimonial[] = [
  {
    id: 'muestra-sector-publico',
    quote:
      'Aquí se podrá contar cómo una solución tecnológica acompaña los procesos y servicios de una institución.',
    author: 'Nombre por confirmar',
    role: 'Cargo por confirmar',
    organization: 'Institución por confirmar',
    isDraft: true,
  },
  {
    id: 'muestra-sector-empresarial',
    quote:
      'Este espacio puede destacar la experiencia de una empresa al adaptar sus herramientas a la operación diaria.',
    author: 'Nombre por confirmar',
    role: 'Cargo por confirmar',
    organization: 'Empresa por confirmar',
    isDraft: true,
  },
  {
    id: 'muestra-producto-saas',
    quote:
      'Cuando se confirme la información, aquí se mostrarán resultados y aprendizajes de una implementación.',
    author: 'Nombre por confirmar',
    role: 'Cargo por confirmar',
    organization: 'Organización por confirmar',
    isDraft: true,
  },
]
