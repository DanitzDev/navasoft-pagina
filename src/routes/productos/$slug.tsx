import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProductDetailPage } from '@/components/sections/products/detail/ProductDetailPage'
import { products } from '@/data/products'
import { pageMeta } from '@/lib/page-meta'

export const Route = createFileRoute('/productos/$slug')({
  // El mismo catálogo alimenta los enlaces y valida los productos existentes.
  // La página recibe datos validados y no necesita repetir la búsqueda.
  loader: ({ params }) => {
    const product = products.find((item) => item.slug === params.slug)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData: product }) => {
    if (!product) return {}
    return pageMeta({
      title: `${product.name} · Navasoft Soluciones`,
      description: product.detail ?? product.tagline,
      path: `/productos/${product.slug}`,
      image: product.image,
    })
  },
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  return <ProductDetailPage product={product} />
}
