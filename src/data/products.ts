import type { Product } from '@/types'

// Las imágenes se añadirán cuando estén disponibles los archivos de cada producto.
export const products: Product[] = [
  {
    slug: 'gridxia',
    name: 'Gridxia',
    category: 'Plataforma insignia',
    tagline: 'La operación comercial del servicio, de punta a punta.',
    detail:
      'Abonados, facturación, recaudación y órdenes de trabajo para ASADAS, cooperativas y empresas de servicios.',
    features: [
      'Gestión de abonados',
      'Facturación electrónica',
      'Recaudación',
      'Órdenes de trabajo',
      'Servicios públicos',
    ],
  },
  {
    slug: 'navastay',
    name: 'NavaStay',
    category: 'Comunidades',
    tagline: 'Cuotas, amenidades y comunicación con residentes — web y móvil.',
    features: [
      'Gestión de condominios',
      'Cuotas y pagos',
      'Amenidades',
      'Comunicación con residentes',
      'Portal web y móvil',
    ],
  },
  {
    slug: 'tracxia',
    name: 'Tracxia',
    category: 'Agroindustria',
    tagline:
      'Trazabilidad de productos para plantas, empaques y comercializadoras agroindustriales.',
    features: [
      'Lotes de producción',
      'Origen y calidad',
      'Inventario',
      'Despacho',
      'Trazabilidad',
    ],
  },
  {
    slug: 'ordexia',
    name: 'Ordexia',
    category: 'Preventas y cobros',
    tagline: 'La ruta, el pedido y el cobro, en la misma mano.',
    detail: 'App móvil para control de preventas, pedidos y recaudo en campo.',
    features: [
      'Preventas',
      'Pedidos en ruta',
      'Cobros',
      'Cartera',
      'App móvil',
    ],
  },
  {
    slug: 'factxia',
    name: 'Factxia',
    category: 'Facturación',
    tagline: 'El comprobante y la cartera, en un expediente.',
    detail:
      'Facturación electrónica, cobros y estados de cuenta para la operación comercial.',
    features: [
      'Facturación electrónica',
      'Cartera',
      'Estados de cuenta',
      'Cierre de mes',
      'Comprobantes',
    ],
  },
]
