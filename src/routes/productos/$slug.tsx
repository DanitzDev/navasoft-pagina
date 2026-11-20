import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProductDetailPage } from '@/components/sections/products/detail/ProductDetailPage'
import { products } from '@/data/products'
import { pageHead } from '@/lib/seo'
import manifest from '@/data/image-manifest.json'

type Entry = { width: number; height: number; widths: number[] }
const entries = manifest as Record<string, Entry>

// Debe ser IDÉNTICO al `sizes` del <ResponsiveImage priority> del hero.
const HERO_SIZES = '(min-width: 960px) 50vw, 100vw'

function heroPreload(src: string | undefined, sizes: string) {
  if (!src) return []
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const entry = entries[base]

  if (!entry) {
    return [{ rel: 'preload', as: 'image', href: src, fetchPriority: 'high' }]
  }
  return [
    {
      rel: 'preload',
      as: 'image',
      type: 'image/webp',
      imageSrcSet: entry.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
      imageSizes: sizes,
      fetchPriority: 'high',
    },
  ]
}

export const Route = createFileRoute('/productos/$slug')({
  loader: ({ params }) => {
    const product = products.find((item) => item.slug === params.slug)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const seo = pageHead({
      title: loaderData.name,
      description: [loaderData.tagline, loaderData.detail].filter(Boolean).join(' '),
      path: `/productos/${loaderData.slug}`,
    })
    return {
      ...seo,
      links: [...seo.links, ...heroPreload(loaderData.image, HERO_SIZES)],
    }
  },
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  return <ProductDetailPage product={product} />
}