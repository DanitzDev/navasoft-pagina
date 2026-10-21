// Los menús de escritorio y móvil consumen las mismas etiquetas y destinos.
// href es opcional para admitir elementos informativos aún sin página.
export type DropdownItem = { label: string; href?: string }
export type NavigationItem = DropdownItem & { href: string }

export const companyLinks: NavigationItem[] = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Oportunidades', href: '/oportunidades' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Soporte', href: '/soporte' },
  { label: 'Casos de éxito', href: '/casos-de-exito' },
]
export const primaryLinks: NavigationItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Gobierno', href: '/areas/gobierno' },
  { label: 'Empresas', href: '/areas/privado' },
]
export const products: NavigationItem[] = [
  { label: 'Gridxia', href: '/productos/gridxia' },
  { label: 'Tracxia', href: '/productos/tracxia' },
  { label: 'Ordexia', href: '/productos/ordexia' },
  { label: 'Factxia', href: '/productos/factxia' },
  { label: 'Navastay', href: '/productos/navastay' },
]
// Cada sector tiene un destino atendido por la ruta dinámica de TanStack.
export const sectors: NavigationItem[] = [
  { label: 'Fondos de Pensiones', href: '/sectores/fondos-de-pensiones' },
  { label: 'Asociaciones', href: '/sectores/asociaciones' },
  { label: 'Construcción', href: '/sectores/construccion' },
  {
    label: 'Fondos de Ahorro y Préstamo',
    href: '/sectores/fondos-de-ahorro-y-prestamo',
  },
  { label: 'Servicios', href: '/sectores/servicios' },
  { label: 'Agroindustria', href: '/sectores/agroindustria' },
  {
    label: 'Préstamos para la Educación',
    href: '/sectores/prestamos-para-la-educacion',
  },
  { label: 'Electricidad', href: '/sectores/electricidad' },
  { label: 'Telecomunicaciones', href: '/sectores/telecomunicaciones' },
  {
    label: 'Producción y Manufactura',
    href: '/sectores/produccion-y-manufactura',
  },
]
