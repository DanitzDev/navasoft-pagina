// Los menús de escritorio y móvil consumen las mismas etiquetas y destinos.
// href es opcional para admitir elementos informativos aún sin página.
export type DropdownItem = { label: string; href?: string; hash?: string }
export type NavigationItem = DropdownItem & { href: string }

export const companyLinks: NavigationItem[] = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Clientes', href: '/areas/soluciones', hash: 'clientes' },
  { label: 'Oportunidades', href: '/oportunidades' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Soporte', href: '/soporte' },
  { label: 'Casos de éxito', href: '/casos-de-exito' },
]

// Clientes se consulta dentro de Soluciones; el acceso secundario queda en el pie.
export const navbarCompanyLinks = companyLinks.filter(
  (link) => link.hash !== 'clientes',
)
export const primaryLinks: NavigationItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Público y empresarial', href: '/areas/soluciones' },
]
export const products: NavigationItem[] = [
  { label: 'Gridxia', href: '/productos/gridxia' },
  { label: 'Tracxia', href: '/productos/tracxia' },
  { label: 'Ordexia', href: '/productos/ordexia' },
  { label: 'Factxia', href: '/productos/factxia' },
  { label: 'Navastay', href: '/productos/navastay' },
  { label: 'Acadxia', href: '/productos/acadxia' },
]
// Cada sector tiene un destino atendido por la ruta dinámica de TanStack.
export const sectors: (NavigationItem & { description: string })[] = [
  {
    label: 'Fondos de Pensiones',
    href: '/sectores/fondos-de-pensiones',
    description:
      'Explora cómo centralizar expedientes de afiliados, ordenar el seguimiento de solicitudes y conectar esos procesos con tus sistemas administrativos.',
  },
  {
    label: 'Asociaciones',
    href: '/sectores/asociaciones',
    description:
      'Organiza los expedientes, el historial de atención y los acuerdos de tu asociación para dar seguimiento a cada gestión desde un solo lugar.',
  },
  {
    label: 'Construcción',
    href: '/sectores/construccion',
    description:
      'Conecta órdenes de trabajo, materiales y avances de obra para que el equipo de campo y el administrativo puedan consultar el mismo estado del proyecto.',
  },
  {
    label: 'Fondos de Ahorro y Préstamo',
    href: '/sectores/fondos-de-ahorro-y-prestamo',
    description:
      'Digitaliza expedientes y organiza el seguimiento de solicitudes de ahorro y crédito, desde la recepción de documentos hasta la resolución.',
  },
  {
    label: 'Servicios',
    href: '/sectores/servicios',
    description:
      'Coordina solicitudes, asignaciones y órdenes de trabajo con un historial de atención que permita consultar qué se hizo y qué sigue pendiente.',
  },
  {
    label: 'Agroindustria',
    href: '/sectores/agroindustria',
    description:
      'Da seguimiento a lotes, pesajes, inventarios y controles de calidad desde la recepción de materia prima hasta el despacho.',
  },
  {
    label: 'Préstamos para la Educación',
    href: '/sectores/prestamos-para-la-educacion',
    description:
      'Reúne solicitudes, documentos y aprobaciones para que el equipo pueda seguir cada expediente de financiamiento educativo a lo largo del proceso.',
  },
  {
    label: 'Electricidad',
    href: '/sectores/electricidad',
    description:
      'Conecta la información de abonados y servicios con las órdenes de trabajo para coordinar la atención y consultar el estado de las gestiones.',
  },
  {
    label: 'Telecomunicaciones',
    href: '/sectores/telecomunicaciones',
    description:
      'Organiza las altas de servicio, instalaciones e incidencias para que atención al cliente y operación de campo compartan el historial de cada gestión.',
  },
  {
    label: 'Producción y Manufactura',
    href: '/sectores/produccion-y-manufactura',
    description:
      'Integra órdenes de producción, inventario, trazabilidad por lote y controles de calidad para consultar lo que sucede desde la planta hasta el despacho.',
  },
]
