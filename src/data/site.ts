import type { NavigationItem } from './navigation'

export type ContactKind = 'phone' | 'message' | 'email' | 'location'
type ContactItem = {
  // Relaciona este contacto con uno de los cuatro SVG de ContactIcon.
  kind: ContactKind
  label: string
  // Si falta el destino, Footer muestra el dato como texto sin simular un enlace.
  href?: string
  // Solo los destinos web que lo necesitan salen del sitio en otra pestaña.
  // tel: y mailto: se mantienen sin target para abrir su aplicación asociada.
  openInNewTab?: boolean
}

// Información de contacto mostrada en el prototipo de Navasoft.
export const siteContacts: ContactItem[] = [
  { kind: 'phone', label: '(506) 4070-0772', href: 'tel:+50640700772' },
  {
    kind: 'message',
    label: 'WhatsApp (506) 4070-0776',
    href: 'https://wa.me/50640700776',
    openInNewTab: true,
  },
  {
    kind: 'email',
    label: 'comercial@navasoftsoluciones.com',
    href: 'mailto:comercial@navasoftsoluciones.com',
  },
  {
    kind: 'location',
    label: 'Costa Rica',
    href: 'https://maps.app.goo.gl/ztdoY6kZ7C9PGNc79',
    openInNewTab: true,
  },
]

// Las rutas ya están habilitadas el contenido definitivo se completa después.
export const footerSolutions: NavigationItem[] = [
  { label: 'Sector Público', href: '/areas/gobierno' },
  { label: 'Sector Empresarial', href: '/areas/privado' },
  { label: 'Ecosistema SaaS', href: '/productos' },
  { label: 'Innovation Lab', href: '/areas/navalav' },
]

type FooterProduct = NavigationItem & { description: string }

// Catálogo compartido por el Footer, el índice de productos y sus rutas de detalle.
// Mantener aquí nombres y descripciones evita diferencias entre esas vistas.
export const footerEcosystem: FooterProduct[] = [
  {
    label: 'Gridxia',
    href: '/productos/gridxia',
    description: 'Gestión de abonados y servicios.',
  },
  {
    label: 'NavaStay',
    href: '/productos/navastay',
    description: 'Administración inteligente de comunidades.',
  },
  {
    label: 'Tracxia',
    href: '/productos/tracxia',
    description: 'Trazabilidad y operación.',
  },
  {
    label: 'Factxia',
    href: '/productos/factxia',
    description: 'Facturación electrónica.',
  },
  {
    label: 'ORDEXIA',
    href: '/productos/ordexia',
    description: 'Gestión operativa y órdenes de trabajo.',
  },
]

// Los enlaces de empresa mantienen los mismos destinos que el Navbar.
export const footerCompany: NavigationItem[] = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Casos de éxito', href: '/casos-de-exito' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Soporte', href: '/soporte' },
  { label: 'Oportunidades', href: '/oportunidades' },
]

export type SocialNetwork = 'linkedin' | 'facebook' | 'instagram'
type SocialLink = NavigationItem & { network: SocialNetwork }

// Perfiles de la empresa enlazados en el prototipo.
export const footerSocialLinks: SocialLink[] = [
  {
    network: 'linkedin',
    label: 'LinkedIn',
    href: 'https://cr.linkedin.com/company/navasoft-soluciones',
  },
  {
    network: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/NavasoftSoluciones/',
  },
  {
    network: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/navasoftsoluciones/',
  },
]
