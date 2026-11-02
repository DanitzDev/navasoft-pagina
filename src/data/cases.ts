export type CaseStudy = {
  id: string
  client: string
  sector: string
  title: string
  summary: string
  image: string
  tags: readonly string[]
  focus: readonly { title: string; description: string }[]
  technologies: string
  kind: 'project' | 'product'
}

// Basado en el portafolio proporcionado. Se omiten métricas y garantías sin evidencia.
// Las imágenes son conceptuales; los clientes no identificados se describen por sector.
export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'produccion-carnica',
    client: 'Producción cárnica',
    sector: 'Agroindustria',
    title: 'Del pesaje a la facturación, con trazabilidad.',
    summary:
      'Integramos básculas y dispositivos de medición de masa magra con el control de producción, el cálculo de rendimientos y la liquidación a clientes.',
    image: '/images/cases/produccion-carnica.webp',
    tags: ['Agroindustria', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Conectar la captura de pesos y mediciones con los procesos de producción y facturación.',
      },
      {
        title: 'Solución',
        description:
          'Integración de equipos de planta, cálculo de rendimientos y generación de etiquetas de trazabilidad.',
      },
      {
        title: 'Resultado operativo',
        description:
          'La información capturada en planta respalda el seguimiento del producto y la liquidación por cliente.',
      },
    ],
    technologies: 'Oracle Forms · Oracle Reports · Oracle Database',
    kind: 'project',
  },
  {
    id: 'gestor-documental',
    client: 'Gestión documental',
    sector: 'Sector público',
    title: 'Documentos con historial y seguimiento.',
    summary:
      'Modernizamos un gestor documental institucional en Oracle APEX, integrando consecutivos, bitácoras, perfiles de acceso y firma digital.',
    image: '/images/cases/gestor-documental.webp',
    tags: ['Sector público', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Dar seguimiento a los oficios y ordenar su numeración, distribución y aprobación.',
      },
      {
        title: 'Solución',
        description:
          'Migración a Oracle APEX 24.2, integración LDAP y firma digital, con controles para la anulación de documentos.',
      },
      {
        title: 'Resultado operativo',
        description:
          'El historial de movimientos y los reportes de pendientes permiten consultar el estado de los documentos y dar continuidad a los trámites.',
      },
    ],
    technologies: 'Oracle APEX · Oracle Database · LDAP · AOP',
    kind: 'project',
  },
  {
    id: 'erp-municipal',
    client: 'ERP municipal',
    sector: 'Gobierno local',
    title: 'Evolución tecnológica para la gestión municipal.',
    summary:
      'Brindamos mantenimiento evolutivo y migración del sistema municipal SIM, con mejoras en inventarios, patentes, planillas y otros procesos institucionales.',
    image: '/images/cases/erp-municipal.webp',
    tags: ['Gobierno local', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Actualizar la plataforma y adaptar sus módulos a los requerimientos de la operación municipal.',
      },
      {
        title: 'Solución',
        description:
          'Migración de Oracle Forms y Reports 10g a 12c, valoración FIFO y desarrollo de requerimientos por módulo.',
      },
      {
        title: 'Resultado operativo',
        description:
          'El sistema incorpora nuevos controles de inventario y ajustes funcionales para acompañar la gestión municipal.',
      },
    ],
    technologies: 'Oracle Forms · Oracle Reports · Oracle Database',
    kind: 'project',
  },
  {
    id: 'sinpe-movil',
    client: 'Administración de SINPE Móvil',
    sector: 'Banca y finanzas',
    title: 'Configuración centralizada del canal de pago móvil.',
    summary:
      'En alianza con otros participantes, contribuimos al desarrollo de una consola administrativa para gestionar parámetros y vinculaciones de SINPE Móvil en una entidad bancaria.',
    image: '/images/cases/sinpe-movil.webp',
    tags: ['Banca y finanzas', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Administrar límites transaccionales y vinculaciones entre cuentas y teléfonos desde un entorno centralizado.',
      },
      {
        title: 'Solución',
        description:
          'Participación en el desarrollo de la consola Oracle APEX y su integración con los servicios de las aplicaciones bancarias.',
      },
      {
        title: 'Resultado operativo',
        description:
          'La consola permite ajustar parámetros y activar o inactivar vinculaciones para respaldar la operación del canal.',
      },
    ],
    technologies: 'Oracle APEX · Oracle Database · Servicios web',
    kind: 'project',
  },
  {
    id: 'distribucion',
    client: 'Despacho y distribución',
    sector: 'Logística alimentaria',
    title: 'Pedidos, pesaje e inventario conectados.',
    summary:
      'Desarrollamos una solución para el alisto de pedidos, la captura de peso en báscula y el control de existencias de productos frescos y terminados.',
    image: '/images/cases/distribucion.webp',
    tags: ['Logística alimentaria', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Relacionar el producto preparado para despacho con su peso, inventario y facturación.',
      },
      {
        title: 'Solución',
        description:
          'Lectura de códigos de barras, integración con básculas de salida y módulos de toma física de inventarios.',
      },
      {
        title: 'Resultado operativo',
        description:
          'Los datos de pesaje y lectura respaldan el registro de salidas y la emisión de comprobantes.',
      },
    ],
    technologies: 'Oracle Forms · Oracle Reports · Oracle Database',
    kind: 'project',
  },
  {
    id: 'calidad-alimentaria',
    client: 'Calidad y ERP alimentario',
    sector: 'Alimentos y consumo masivo',
    title: 'Control de calidad integrado a la operación.',
    summary:
      'Ampliamos un ERP alimentario con muestreo por pesaje de lotes y mejoras en procesos financieros, compras y recursos humanos.',
    image: '/images/cases/calidad-alimentaria.webp',
    tags: ['Alimentos y consumo masivo', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Registrar desviaciones de peso en las líneas de empaque y conectar los controles de planta con la administración.',
      },
      {
        title: 'Solución',
        description:
          'Módulo conectado a básculas para registrar muestras y no conformidades, junto con ajustes en módulos del ERP.',
      },
      {
        title: 'Resultado operativo',
        description:
          'El registro de muestras permite identificar desviaciones y conservar información para el seguimiento de calidad.',
      },
    ],
    technologies: 'Oracle Forms · Oracle Reports · Oracle Database',
    kind: 'project',
  },
  {
    id: 'facturacion-electronica',
    client: 'Facturación electrónica',
    sector: 'Gestión empresarial',
    title: 'Comprobantes electrónicos desde el sistema existente.',
    summary:
      'Implementamos una capa de integración entre Oracle Forms y servicios de facturación electrónica para gestionar comprobantes y sus estados.',
    image: '/images/cases/facturacion-electronica.webp',
    tags: ['Gestión empresarial', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Conectar el sistema de negocio con servicios externos de emisión y validación de comprobantes.',
      },
      {
        title: 'Solución',
        description:
          'Middleware en PHP, procesamiento en segundo plano, consulta de estados y distribución de documentos por correo.',
      },
      {
        title: 'Resultado operativo',
        description:
          'El flujo integra la emisión, el seguimiento y el envío de comprobantes, reduciendo tareas manuales de distribución.',
      },
    ],
    technologies: 'PHP · Oracle Forms · Servicios REST/SOAP · SMTP',
    kind: 'project',
  },
  {
    id: 'sigea',
    client: 'SIGEA',
    sector: 'Asociaciones y gestión jurídica',
    title: 'Expedientes y atención al asociado en un solo lugar.',
    summary:
      'Desarrollamos una plataforma web para centralizar información de asociados, gestiones jurídicas, atención y acuerdos institucionales.',
    image: '/images/cases/sigea.webp',
    tags: ['Asociaciones y gestión jurídica', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Reunir expedientes y dar seguimiento a solicitudes, procesos judiciales y acuerdos de junta directiva.',
      },
      {
        title: 'Solución',
        description:
          'Expediente digital en Oracle APEX, bitácora de atención, seguimiento legal y comunicación institucional.',
      },
      {
        title: 'Resultado operativo',
        description:
          'La plataforma reúne el historial del asociado y permite consultar el estado de las gestiones registradas.',
      },
    ],
    technologies: 'Oracle APEX · Oracle Database',
    kind: 'project',
  },
  {
    id: 'gestion-diplomatica',
    client: 'Gestión de sedes diplomáticas',
    sector: 'Sector público',
    title: 'Contratos y nombramientos con seguimiento centralizado.',
    summary:
      'En colaboración con otros participantes, desarrollamos una plataforma web para administrar arrendamientos, leasing vehicular y nombramientos en sedes diplomáticas.',
    image: '/images/cases/gestion-diplomatica.webp',
    tags: ['Sector público', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Organizar compromisos contractuales y vencimientos de sedes distribuidas en distintos países.',
      },
      {
        title: 'Solución',
        description:
          'Portal Oracle APEX con registro de condiciones contractuales, nombramientos y alertas de vencimiento.',
      },
      {
        title: 'Resultado operativo',
        description:
          'La información centralizada facilita la consulta de contratos y la planificación de sus renovaciones.',
      },
    ],
    technologies: 'Oracle APEX · Oracle Database',
    kind: 'project',
  },
  {
    id: 'siaf',
    client: 'Gestión financiera SIAF',
    sector: 'Sector público',
    title: 'Evolución del sistema financiero institucional.',
    summary:
      'Brindamos soporte especializado al sistema administrativo financiero SIAF, con ajustes en presupuesto, flujo de efectivo y activos fijos.',
    image: '/images/cases/siaf.webp',
    tags: ['Sector público', 'Desarrollo e integración'],
    focus: [
      {
        title: 'Reto',
        description:
          'Adaptar procesos y reportes a los requerimientos contables y presupuestarios de la institución.',
      },
      {
        title: 'Solución',
        description:
          'Mantenimiento evolutivo de módulos, controles de activos y ajustes en reportes financieros.',
      },
      {
        title: 'Resultado operativo',
        description:
          'Los controles y reportes apoyan la administración de bienes y la preparación de información para rendición de cuentas.',
      },
    ],
    technologies: 'Oracle · SIAF · Contabilidad y activos fijos',
    kind: 'project',
  },
  {
    id: 'navastay',
    client: 'NavaStay',
    sector: 'Producto propio · Gestión inmobiliaria',
    title: 'Administración de condominios en una plataforma.',
    summary:
      'Desarrollamos una solución web y móvil que reúne finanzas, reservas de áreas comunes, control de acceso y comunicación para la gestión de condominios.',
    image: '/images/cases/navastay.webp',
    tags: ['Producto propio · Gestión inmobiliaria', 'Producto propio'],
    focus: [
      {
        title: 'Reto',
        description:
          'Reunir la información administrativa y los servicios para residentes y personal de seguridad.',
      },
      {
        title: 'Solución',
        description:
          'Plataforma multi-condominio con presupuestos, cuentas por cobrar y pagar, reservas y registro de visitantes.',
      },
      {
        title: 'Capacidades habilitadas',
        description:
          'Permite consultar estados de cuenta, organizar reservas y mantener registros de acceso desde un entorno centralizado.',
      },
    ],
    technologies: 'Oracle APEX · Oracle Database · .NET MAUI · ORDS',
    kind: 'product',
  },
]

export const featuredCaseStudies = caseStudies.slice(0, 4)
export const casesIntroduction = {
  eyebrow: 'Experiencia en proyectos',
  title: 'Soluciones para retos reales.',
  description:
    'Conoce cómo abordamos la integración industrial, la modernización de sistemas y la gestión institucional, junto con nuestras soluciones propias.',
}

const governmentCaseIds = new Set([
  'gestor-documental',
  'erp-municipal',
  'gestion-diplomatica',
  'siaf',
])

export const caseGroups = [
  {
    id: 'empresas',
    title: 'Empresas',
    description:
      'Producción, distribución, finanzas y gestión de organizaciones.',
    cases: caseStudies.filter(
      (item) => item.kind === 'project' && !governmentCaseIds.has(item.id),
    ),
  },
  {
    id: 'gobierno',
    title: 'Gobierno',
    description: 'Modernización de sistemas y procesos institucionales.',
    cases: caseStudies.filter((item) => governmentCaseIds.has(item.id)),
  },
  {
    id: 'producto-propio',
    title: 'Producto propio',
    description:
      'Una solución desarrollada por Navasoft para la gestión de condominios.',
    cases: caseStudies.filter((item) => item.kind === 'product'),
  },
]
