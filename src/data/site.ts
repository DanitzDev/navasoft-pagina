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
