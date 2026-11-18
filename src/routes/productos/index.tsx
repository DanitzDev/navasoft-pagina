import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { Container } from '../../components/ui/Container'
import { products } from '../../data/products'
import '../../components/sections/products/ProductsIndex.css'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute('/productos/')({
  head: () =>
    pageHead({
      title: "Ecosistema SaaS",
      description:
        "Gridxia, Tracxia, Ordexia, Factxia, NavaStay y Acadxia: plataformas SaaS de Navasoft para transformar sectores específicos con soluciones modernas, escalables y orientadas a resultados.",
      path: "/productos",
    }),
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <Container as="section" className="products-index">
      <SectionTitle
        as="h1"
        title="Ecosistema SaaS para su operación"
        description="Explore las plataformas de Navasoft y conozca qué procesos puede gestionar con cada una."
      />
      <ul className="products-index-grid">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              to="/productos/$slug"
              params={{ slug: product.slug }}
              className="products-index-card"
            >
              <ResponsiveImage
                src={product.image ?? ''}
                alt=""
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
              <div className="products-index-copy">
                <p className="products-index-category">{product.category}</p>
                <h2>{product.name}</h2>
                <p>{product.detail}</p>
                <span className="products-index-action">
                  <span>Conocer {product.name}</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
