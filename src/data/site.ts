import type { NavigationItem } from './navigation'

export type ContactKind = 'phone' | 'message' | 'email' | 'location'
type ContactItem = { kind: ContactKind; label: string; href?: string }

// Información de contacto mostrada en el prototipo de Navasoft.
export const siteContacts: ContactItem[] = [
  { kind: 'phone', label: '(506) 4070-0772', href: 'tel:+50640700772' },
  {
    kind: 'message',
    label: 'WhatsApp (506) 4070-0776',
    href: 'https://wa.me/50640700776',
  },
  {
    kind: 'email',
    label: 'comercial@navasoftsoluciones.com',
    href: 'mailto:comercial@navasoftsoluciones.com',
  },
  { kind: 'location', label: 'Costa Rica' },
]

// Destinos del prototipo; las páginas se desarrollan en etapas posteriores.
export const footerSolutions: NavigationItem[] = [
  { label: 'Sector Público', href: '/areas/gobierno' },
  { label: 'Sector Empresarial', href: '/areas/privado' },
  { label: 'Ecosistema SaaS', href: '/productos' },
  { label: 'Innovation Lab', href: '/areas/navalav' },
]

type FooterProduct = NavigationItem & { description: string }

// Orden y descripciones de los productos mostrados en el footer del prototipo.
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
