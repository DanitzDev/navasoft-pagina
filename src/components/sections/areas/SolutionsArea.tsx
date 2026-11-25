import { Link } from '@tanstack/react-router'
import { Container } from '../../ui/Container'
import { SectionTitle } from '../../ui/SectionTitle'
import { ButtonLink } from '../../ui/Button'
import InstitutionalBanner from '../../shared/institutional-banner/InstitutionalBanner'
import type { clientDirectory } from '../../../data/client-directory'
import { sectorPages } from '../../../data/sector-pages'
import { products } from '../../../data/products'
import { contactBanner } from '../../../data/site'
import SolutionsNavigation from './SolutionsNavigation'
import './SolutionsArea.css'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'

const sectors = [
  { ...sectorPages.privado, id: 'empresas' },
  { ...sectorPages.gobierno, id: 'gobierno' },
]
const relatedProducts = products.filter((product) =>
  sectors.some((sector) => sector.products.includes(product.slug)),
)
const optimizedClientLogos: Partial<
  Record<string, { src: string; width: number; height: number }>
> = {
  'municipalidad-la-union': {
    src: '/images/clientes/munilaunion-logo-320.webp',
    width: 320,
    height: 373,
  },
  ferji: {
    src: '/images/clientes/ferji-mark-320.webp',
    width: 320,
    height: 250,
  },
  ina: {
    src: '/images/clientes/Logo-INA-320.webp',
    width: 320,
    height: 137,
  },
  arcelormittal: {
    src: '/images/clientes/ArcelorMittal-Logo-240.webp',
    width: 240,
    height: 135,
  },
}

function ClientList({ clients }: { clients: typeof clientDirectory }) {
  return (
    <ul className="business-client-list">
      {clients.map((client) => {
        const optimized = optimizedClientLogos[client.id]
        return (
          <li
            key={client.id}
            className={client.image ? undefined : 'business-client-text-only'}
          >
            {client.image && (
              <div className="business-client-logo" data-client={client.id}>
                <ResponsiveImage
                  src={optimized ? optimized.src : client.image}
                  width={optimized ? optimized.width : undefined}
                  height={optimized ? optimized.height : undefined}
                  alt={client.name}
                  sizes="(max-width: 768px) 120px, 160px"
                />
              </div>
            )}
            {!client.image && <span>{client.name}</span>}
          </li>
        )
      })}
    </ul>
  )
}

export default function SolutionsArea() {
  return (
    <>
      <section className="business-hero" aria-labelledby="solutions-title">
        <Container className="business-hero-layout">
          <div>
            <p className="business-kicker">Público y empresarial</p>
            <h1 id="solutions-title">
              Software a la medida para su operación.
            </h1>
            <p className="business-hero-description">
              Desarrollamos y modernizamos sistemas para organizaciones del
              sector público y empresarial. Conectamos inventarios, facturación,
              expedientes y finanzas con sus herramientas actuales.
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
                <span>Explorar ecosistema SaaS</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <nav
            className="solutions-hero-images"
            aria-label="Explorar sectores público y empresarial"
          >
            <a href="#gobierno" className="solutions-sector-access">
              <ResponsiveImage
                src={sectorPages.gobierno.image}
                alt=""
                width={1792}
                height={1008}
                priority
                sizes="(min-width: 960px) calc((min(100vw, 1280px) - 120px) / 2), (min-width: 640px) calc((100vw - 68px) / 2), (min-width: 600px) calc((100vw - 52px) / 2), calc(100vw - 32px)"
              />
              <span className="solutions-access-caption">
                <span>
                  <strong>Sector público</strong>
                  <small>Trámites y gestión institucional</small>
                </span>
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path
                    d="M7 17 17 7M7 7h10v10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a href="#empresas" className="solutions-sector-access">
              <ResponsiveImage
                src={sectorPages.privado.image}
                alt=""
                width={1792}
                height={1008}
                sizes="(min-width: 960px) calc((min(100vw, 1280px) - 120px) / 2), (min-width: 640px) calc((100vw - 68px) / 2), (min-width: 600px) calc((100vw - 52px) / 2), calc(100vw - 32px)"
              />
              <span className="solutions-access-caption">
                <span>
                  <strong>Sector empresarial</strong>
                  <small>Producción, logística y administración</small>
                </span>
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path
                    d="M7 17 17 7M7 7h10v10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </nav>
        </Container>
      </section>

      <div id="clientes" className="solutions-content">
        <Container>
          <SolutionsNavigation />
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
        tabIndex={-1}
        className="business-products"
        aria-labelledby="solutions-products-title"
      >
        <Container>
          <h2 id="solutions-products-title">
            Ecosistema SaaS para su operación
          </h2>
          <div className="business-product-grid">
            {relatedProducts.map((product) => (
              <Link
                key={product.slug}
                to="/productos/$slug"
                params={{ slug: product.slug }}
                className="business-product"
              >
                <div className="business-product-media">
                  <ResponsiveImage
                    src={product.image ?? ''}
                    alt=""
                    sizes="(min-width: 1024px) 16vw, (max-width: 399px) 100vw, 33vw"
                  />
                </div>
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
