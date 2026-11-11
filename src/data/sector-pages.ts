import { businessClients, publicClients } from './client-directory'

// Contenido por sector; el diseño y el directorio comparten componentes.
export const sectorPages = {
  privado: {
    title: 'Sector empresarial',
    kicker: 'Sector empresarial',
    lead: 'Software que se adapta a su operación.',
    description:
      'Conectamos los procesos de su empresa con soluciones a la medida: desde la planta y la bodega hasta la gestión administrativa.',
    image: '/images/area-empresarial.jpeg',
    heading: 'Partimos de cómo trabaja su empresa.',
    introduction:
      'Cada operación tiene sus particularidades: lotes, rutas, controles de calidad o atención a asociados. Diseñamos e integramos el sistema alrededor de esos procesos.',
    clientsDescription:
      'Organizaciones del sector empresarial que forman parte de nuestra trayectoria.',
    clients: businessClients,
    capabilities: [
      {
        title: 'Producción y planta',
        text: 'Pesaje, inventarios, calidad y trazabilidad conectados con la operación comercial.',
      },
      {
        title: 'Fondos y asociaciones',
        text: 'Expedientes, atención al asociado, seguimiento de gestiones y administración de la información.',
      },
      {
        title: 'Logística y distribución',
        text: 'Alisto de pedidos, lectura de códigos de barras y control del producto despachado.',
      },
      {
        title: 'Administración y finanzas',
        text: 'Compras, cuentas por cobrar y pagar, facturación e integración con sus sistemas actuales.',
      },
    ],
    projects: [
      { id: 'produccion-carnica', label: 'Pesaje y trazabilidad en planta' },
      { id: 'distribucion', label: 'Pedidos y distribución alimentaria' },
      { id: 'sigea', label: 'Expedientes y atención al asociado' },
    ],
    products: ['tracxia', 'factxia', 'ordexia'],
  },
  gobierno: {
    title: 'Sector público',
    kicker: 'Sector público',
    lead: 'Sistemas que respaldan la operación institucional.',
    description:
      'Desarrollamos y modernizamos sistemas para conectar la gestión administrativa, los trámites y la información de las instituciones públicas.',
    image: '/images/area-publico.jpeg',
    heading: 'Tecnología para los procesos del sector público.',
    introduction:
      'Acompañamos a instituciones que operan sobre Oracle y necesitan evolucionar sus sistemas. Integramos nuevos requerimientos, organizamos la información y apoyamos la continuidad de los procesos.',
    clientsDescription:
      'Instituciones y entidades públicas que forman parte de nuestra trayectoria.',
    clients: publicClients,
    capabilities: [
      {
        title: 'Desarrollo a la medida en Oracle',
        text: 'Oracle APEX, Forms y Reports para ampliar y modernizar los sistemas que sostienen la operación institucional.',
      },
      {
        title: 'Trámites y gestión documental',
        text: 'Expedientes, oficios, consecutivos y flujos de aprobación, con historial de movimientos y seguimiento de pendientes.',
      },
      {
        title: 'Gestión financiera y administrativa',
        text: 'Evolución de módulos de presupuesto, tesorería, activos fijos, inventarios y recursos humanos.',
      },
      {
        title: 'Integración y mantenimiento evolutivo',
        text: 'Migración de versiones, conexión entre sistemas y atención de nuevos requerimientos institucionales.',
      },
    ],
    projects: [
      { id: 'erp-municipal', label: 'Modernización del ERP municipal' },
      { id: 'gestor-documental', label: 'Trazabilidad y gestión documental' },
      { id: 'siaf', label: 'Evolución del sistema financiero SIAF' },
    ],
    products: ['gridxia'],
  },
}

export type SectorPageSlug = keyof typeof sectorPages
