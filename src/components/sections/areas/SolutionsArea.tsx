import { Link } from '@tanstack/react-router'
import { Container } from '../../ui/Container'
import { SectionTitle } from '../../ui/SectionTitle'
import { ButtonLink } from '../../ui/Button'
import InstitutionalBanner from '../../shared/institutional-banner/InstitutionalBanner'
import { clientDirectory } from '../../../data/client-directory'
import { sectorPages } from '../../../data/sector-pages'
import { products } from '../../../data/products'
import { contactBanner } from '../../../data/site'
import './SolutionsArea.css'

const sectors = [
  { ...sectorPages.privado, id: 'empresas' },
  { ...sectorPages.gobierno, id: 'gobierno' },
]
const relatedProducts = products.filter((product) =>
  sectors.some((sector) => sector.products.includes(product.slug)),
)

function ClientList({ clients }: { clients: typeof clientDirectory }) {
  return (
    <ul className="business-client-list">
      {clients.map((client) => (
        <li key={client.id}>
          {client.image && (
            <div className="business-client-logo">
              <img
                src={client.image}
                alt=""
                width="160"
                height="72"
                loading="lazy"
              />
            </div>
          )}
          <span>{client.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function SolutionsArea() {
  return (
    <>
      <section className="business-hero" aria-labelledby="solutions-title">
        <Container className="business-hero-layout">
          <div>
            <p className="business-kicker">Para Gobierno y Empresas</p>
            <h1 id="solutions-title">
              Desarrollamos software e integramos sus procesos.
            </h1>
            <p className="business-lead">
              De la planta y la bodega a los trámites institucionales.
            </p>
            <p className="business-hero-description">
              Conectamos inventarios, facturación, expedientes y finanzas con
              sus sistemas actuales para reducir tareas manuales y facilitar el
              seguimiento de cada proceso.
            </p>
            <div className="business-actions">
              <ButtonLink
                to="/contacto"
                search={{ motivo: 'reunion' }}
                variant="primary"
              >
                Solicitar reunión
              </ButtonLink>
              <a href="#productos-relacionados" className="business-text-link">
                Ver productos <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <nav
            className="solutions-hero-images"
            aria-label="Explorar Gobierno y Empresas"
          >
            <a href="#gobierno" className="solutions-sector-access">
              <img
                src={sectorPages.gobierno.image}
                alt=""
                width="896"
                height="1008"
              />
              <span className="solutions-access-caption">
                Gobierno <span aria-hidden="true">↓</span>
              </span>
            </a>
            <a href="#empresas" className="solutions-sector-access">
              <img
                src={sectorPages.privado.image}
                alt=""
                width="896"
                height="1008"
              />
              <span className="solutions-access-caption">
                Empresas <span aria-hidden="true">↓</span>
              </span>
            </a>
          </nav>
        </Container>
      </section>

      <div id="clientes" className="solutions-content">
        <Container>
          <nav
            className="solutions-navigation"
            aria-label="Explorar soluciones por sector"
          >
            <a href="#empresas">
              Empresas <span aria-hidden="true">↓</span>
            </a>
            <a href="#gobierno">
              Gobierno <span aria-hidden="true">↓</span>
            </a>
            <a href="#productos-relacionados">
              Productos relacionados <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </Container>
        {sectors.map((sector) => (
          <section
            key={sector.id}
            id={sector.id}
            className="business-experience solutions-sector"
            aria-labelledby={`${sector.id}-title`}
            tabIndex={-1}
          >
            <Container className="business-experience-layout">
              <div className="business-operation">
                <p className="business-kicker">{sector.title}</p>
                <SectionTitle
                  title={
                    <span id={`${sector.id}-title`}>{sector.heading}</span>
                  }
                  description={sector.introduction}
                />
                <div className="business-capabilities">
                  {sector.capabilities.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
                <div className="business-projects">
                  <h3>Así lo hemos abordado</h3>
                  <ul>
                    {sector.projects.map((project) => (
                      <li key={project.id}>
                        <Link
                          to="/casos-de-exito/$slug"
                          params={{ slug: project.id }}
                        >
                          {project.label}
                          <span aria-hidden="true">↗</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <aside
                className="business-clients"
                aria-labelledby={`${sector.id}-clients-title`}
              >
                <h3 id={`${sector.id}-clients-title`}>
                  Con quiénes hemos trabajado
                </h3>
                <p>{sector.clientsDescription}</p>
                <ClientList clients={sector.clients} />
              </aside>
            </Container>
          </section>
        ))}
      </div>

      <section
        id="productos-relacionados"
        className="business-products"
        aria-labelledby="solutions-products-title"
      >
        <Container>
          <h2 id="solutions-products-title">Productos para su operación</h2>
          <div className="business-product-grid">
            {relatedProducts.map((product) => (
              <Link
                key={product.slug}
                to="/productos/$slug"
                params={{ slug: product.slug }}
                className="business-product"
              >
                <img
                  src={product.image}
                  alt=""
                  width="480"
                  height="360"
                  loading="lazy"
                />
                <div>
                  <p className="business-product-category">
                    {product.category}
                  </p>
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                  <span className="business-text-link">
                    Conocer {product.name} <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <InstitutionalBanner {...contactBanner} showDemo={false} />
    </>
  )
}
