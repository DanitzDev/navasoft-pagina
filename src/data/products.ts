import type { Product } from '@/types'

export const products: Product[] = [
  {
    slug: 'gridxia',
    name: 'Gridxia',
    category: 'Plataforma insignia',
    tagline: 'La operación comercial del servicio, de punta a punta.',
    image: '/images/eco-gridxia.jpg',
    features: [
      'Gestión de abonados',
      'Facturación electrónica',
      'Recaudación',
      'Órdenes de trabajo',
    ],
  },
  {
    slug: 'navastay',
    name: 'NavaStay',
    category: 'Comunidades',
    tagline:
      'Cuotas, amenidades y comunicación con residentes, en web y móvil.',
    image: '/images/eco-navastay.jpg',
    features: [
      'Gestión de condominios',
      'Cuotas y pagos',
      'Amenidades',
      'Portal web y móvil',
    ],
  },
  {
    slug: 'tracxia',
    name: 'Tracxia',
    category: 'Agroindustria',
    tagline:
      'Trazabilidad de productos para plantas, empaques y comercializadoras.',
    image: '/images/tracxia.jpg',
    features: [
      'Lotes de producción',
      'Origen y calidad',
      'Inventario',
      'Despacho',
    ],
  },
  {
    slug: 'ordexia',
    name: 'Ordexia',
    category: 'Preventas y cobros',
    tagline: 'La ruta, el pedido y el cobro, en la misma mano.',
    image: '/images/ordexia.jpg',
    features: ['Preventas', 'Pedidos en ruta', 'Cobros', 'App móvil'],
  },
  {
    slug: 'factxia',
    name: 'Factxia',
    category: 'Facturación',
    tagline: 'El comprobante y la cartera, en un expediente.',
    image: '/images/factxia.jpg',
    features: [
      'Facturación electrónica',
      'Cartera',
      'Estados de cuenta',
      'Cierre de mes',
    ],
  },
]
