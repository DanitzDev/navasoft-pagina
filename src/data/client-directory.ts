import { clients } from './clients'
import type { OrganizationLogo } from '../types/trust'

// Directorio de clientes, con los destacados y referencias adicionales.
// Los logos pendientes se incorporarán cuando el equipo facilite los archivos.
type ClientLogo = Omit<OrganizationLogo, 'image'> & { image?: string }

export const clientDirectory: readonly ClientLogo[] = [
  ...clients,
  { id: 'ferji', name: 'Ferji' },
  { id: 'diproa', name: 'Diproa', image: '/images/clientes/diproa.png' },
  {
    id: 'arcelormittal',
    name: 'ArcelorMittal',
    image: '/images/clientes/ArcelorMittal-Logo.png',
  },
  {
    id: 'banco-nacional',
    name: 'Banco Nacional',
    image: '/images/clientes/bn-logo.png',
  },
  { id: 'ina', name: 'INA', image: '/images/clientes/Logo-INA.webp' },
  { id: 'ficohsa', name: 'Ficohsa' },
]
