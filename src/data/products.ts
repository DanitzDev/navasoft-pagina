import type { Product } from '@/types'

export const products: Product[] = [
  {
    slug: 'gridxia',
    name: 'Gridxia',
    category: 'Plataforma insignia',
    tagline:
      'La tecnología que convierte su operación en una ventaja competitiva.',
    detail:
      'Órdenes de corte y reconexión, lectura de medidores, cuadrillas y rutas, con geolocalización y evidencia fotográfica.',
    image: '/images/eco-gridxia.jpeg',
    features: [
      'Órdenes de corte y reconexión',
      'Lectura de medidores',
      'Administración de cuadrillas',
      'Optimización de rutas',
      'Geolocalización en tiempo real',
    ],
  },
  {
    slug: 'navastay',
    name: 'NavaStay',
    category: 'Condominios',
    tagline: 'Todo su condominio en una sola plataforma.',
    detail:
      'Finanzas, reservas de áreas comunes, control de accesos, mantenimientos y comunicación con los residentes.',
    image: '/images/eco-navastay.jpeg',
    features: [
      'Cuotas de mantenimiento',
      'Estados de cuenta',
      'Facturación y pagos',
      'Reservas de áreas comunes',
      'Control de accesos',
    ],
  },
  {
    slug: 'tracxia',
    name: 'Tracxia',
    category: 'Agroindustria',
    tagline: 'Trazabilidad agroindustrial de principio a fin.',
    detail:
      'Plataforma SaaS para controlar todo el ciclo de vida de los productos, desde la finca hasta el consumidor final.',
    image: '/images/tracxia.jpeg',
    features: [
      'Producción (MES)',
      'Bodegas (WMS)',
      'Transporte (TMS)',
      'Códigos QR',
      'Firmas digitales',
    ],
  },
  {
    slug: 'ordexia',
    name: 'Ordexia',
    category: 'Preventas y cobros',
    tagline: 'La plataforma que impulsa a su equipo de ventas en cada visita.',
    detail:
      'Pedidos, cobros, clientes y rutas desde el móvil del vendedor, con la información disponible para la operación en tiempo real.',
    image: '/images/ordexia.jpeg',
    features: [
      'Pedidos digitales',
      'Cobros',
      'Clientes',
      'Rutas',
      'Resumen del día',
    ],
  },
  {
    slug: 'factxia',
    name: 'Factxia',
    category: 'Facturación',
    tagline: 'El comprobante y la cartera, en un expediente.',
    detail:
      'Facturación electrónica, cobros y estados de cuenta para la operación comercial.',
    image: '/images/factxia.jpeg',
    features: [
      'Facturación electrónica',
      'Cartera',
      'Estados de cuenta',
      'Cierre de mes',
      'Comprobantes',
    ],
  },
]
