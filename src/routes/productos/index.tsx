import { SectionTitle } from '../../components/ui/SectionTitle'
import { createFileRoute, Link } from '@tanstack/react-router'
import { footerEcosystem } from '../../data/site'

export const Route = createFileRoute('/productos/')({
  head: () => ({ meta: [{ title: 'Productos · Navasoft Soluciones' }] }),
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* TODO: incorporar la sección de productos definitiva. */}
      <SectionTitle as="h1" title="Productos" />
      <ul className="mt-6 grid gap-4">
        {footerEcosystem.map((product) => (
          <li key={product.href}>
            <Link
              to="/productos/$slug"
              params={{ slug: product.href.slice('/productos/'.length) }}
              className="underline underline-offset-4"
            >
              {product.label}
            </Link>
            <p className="mt-1">{product.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
