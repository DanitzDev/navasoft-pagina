export type DropdownItem = { label: string; href?: string }
export type NavigationItem = DropdownItem & { href: string }

export const companyLinks: NavigationItem[] = [
  { label: 'Oportunidades', href: '/oportunidades' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Soporte', href: '/soporte' },
  { label: 'Nosotros', href: '/nosotros' },
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
  { label: 'NavaStay', href: '/productos/navastay' },
]
// Los destinos se agregarán cuando se definan las páginas de cada sector
export const sectors: DropdownItem[] = [
  { label: 'Fondos de Pensiones' },
  { label: 'Asociaciones' },
  { label: 'Construcción' },
  { label: 'Fondos de Ahorro y Préstamo' },
  { label: 'Servicios' },
  { label: 'Agroindustria' },
  { label: 'Préstamos para la Educación' },
  { label: 'Electricidad' },
  { label: 'Telecomunicaciones' },
  { label: 'Producción y Manufactura' },
]
