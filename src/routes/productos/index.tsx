import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { Container } from '../../components/ui/Container'
import { products } from '../../data/products'
import '../../components/sections/products/ProductsIndex.css'

export const Route = createFileRoute('/productos/')({
  head: () => ({
    meta: [
      { title: 'Productos · Navasoft Soluciones' },
      {
        name: 'description',
        content:
          'Conoce Gridxia, NavaStay, Tracxia, Ordexia y Factxia: plataformas de Navasoft para servicios públicos, condominios, agroindustria, ventas y facturación.',
      },
    ],
  }),
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <Container as="section" className="products-index">
      <SectionTitle
        as="h1"
        title="Productos para su operación"
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
              <img
                src={product.image}
                alt=""
                width="1280"
                height="720"
                loading="lazy"
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
