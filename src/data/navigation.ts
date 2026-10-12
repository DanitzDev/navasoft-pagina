export type NavigationItem = { label: string; href: string }

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
export const sectors: NavigationItem[] = [
  { label: 'Sector Público', href: '/areas/gobierno' },
  { label: 'Sector Empresarial', href: '/areas/privado' },
  { label: 'Ecosistema SaaS', href: '/productos' },
  { label: 'Innovation Lab', href: '/areas/navalav' },
]
