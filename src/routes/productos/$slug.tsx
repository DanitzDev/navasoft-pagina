import { SectionTitle } from '../../components/ui/SectionTitle'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { footerEcosystem } from '../../data/site'

export const Route = createFileRoute('/productos/$slug')({
  // El mismo catálogo alimenta los enlaces y valida los productos existentes.
  // La página recibe datos validados y no necesita repetir la búsqueda.
  loader: ({ params }) => {
    const product = footerEcosystem.find(
      (item) => item.href === `/productos/${params.slug}`,
    )
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.label ?? 'Producto'} · Navasoft Soluciones` },
    ],
  }),
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* TODO: incorporar la ficha de producto definitiva. */}
      <SectionTitle as="h1" title={product.label} />
      <p className="mt-4 text-lg">{product.description}</p>
      <p className="mt-4">La ficha completa estará disponible próximamente.</p>
    </section>
  )
}
