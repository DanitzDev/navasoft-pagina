import { clients } from './clients'
import type { OrganizationLogo } from '../types/trust'

// Directorio de clientes. Solo `clients.ts` alimenta el carrusel de Inicio.
type ClientLogo = Omit<OrganizationLogo, 'image'> & { image?: string }

export const clientDirectory: readonly ClientLogo[] = [
  ...clients,
  {
    id: 'ferji',
    name: 'Ferji',
    image: '/images/clientes/ferji-mark.webp',
  },
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
  {
    id: 'argri-carnes',
    name: 'Argri Carnes',
    image: '/images/clientes/Argri-logo-png.png',
  },
  {
    id: 'fapre',
    name: 'FAPRE',
    image: '/images/clientes/logo-fapre.png',
  },
  {
    id: 'habitat-condominios',
    name: 'Hábitat Administración de Condominios',
    image: '/images/clientes/logo-habitat.png',
  },
  {
    id: 'unidad-fraternidad-proteccion',
    name: 'Unidad Fraternidad Protección',
    image: '/images/clientes/logo-cliente-unidad.jpeg',
  },
  {
    id: 'ganaderia-elida',
    name: 'Ganadería Elida',
    image: '/images/clientes/logo-Elida.jpeg',
  },
  {
    id: 'carnes-la-unica',
    name: 'Carnes La Única',
    image: '/images/clientes/logo-carnesLaUnica.jpeg',
  },
]

const publicClientIds = new Set([
  'conape',
  'tecnologico-costa-rica',
  'jasec',
  'cosevi',
  'municipalidad-la-union',
  'banco-nacional',
  'ina',
])

export const businessClients = clientDirectory.filter(
  (client) => !publicClientIds.has(client.id),
)
export const publicClients = clientDirectory.filter((client) =>
  publicClientIds.has(client.id),
)
