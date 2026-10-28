import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProductDetailPage } from "@/components/sections/products/detail/ProductDetailPage";
import { products } from "@/data/products";

export const Route = createFileRoute('/productos/$slug')({
  // El mismo catálogo alimenta los enlaces y valida los productos existentes.
  // La página recibe datos validados y no necesita repetir la búsqueda.
loader: ({ params }) => {
  const product = products.find((item) => item.slug === params.slug)
  if (!product) throw notFound()
  return product
},
head: ({ loaderData }) => ({
  meta: [{ title: `${loaderData?.name ?? 'Producto'} · Navasoft Soluciones` }],
}),
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData();
  return <ProductDetailPage product={product} />;
}
