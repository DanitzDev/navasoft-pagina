import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { caseStudies, caseGroups } from '../../data/cases'
import { Container } from '../../components/ui/Container'
import { ButtonLink } from '../../components/ui/Button'
import CaseCard from '../../components/sections/cases/CaseCard'
import { pageMeta } from '@/lib/page-meta'
import '../../components/sections/cases/CaseDetail.css'

export const Route = createFileRoute('/casos-de-exito/$slug')({
  loader: ({ params }) => {
    const caseStudy = caseStudies.find((item) => item.id === params.slug)
    if (!caseStudy) throw notFound()
    return caseStudy
  },
  head: ({ loaderData: caseStudy }) => {
    if (!caseStudy) return {}
    return pageMeta({
      title: `${caseStudy.client} · Navasoft Soluciones`,
      description: caseStudy.summary,
      path: `/casos-de-exito/${caseStudy.id}`,
      image: caseStudy.image,
    })
  },
  component: CaseDetailPage,
})

function CaseDetailPage() {
  const caseStudy = Route.useLoaderData()
  const group = caseGroups.find((item) =>
    item.cases.some((entry) => entry.id === caseStudy.id),
  )!
  const isInnovationCase = caseStudy.id === 'pesaje-industrial-iot'
  const isGovernmentCase = group.id === 'gobierno'
  const solutionLink = isInnovationCase
    ? { slug: 'navalav', label: 'Conocer Innovation Lab' }
    : {
        slug: 'soluciones',
        hash: isGovernmentCase ? 'gobierno' : 'empresas',
        label: isGovernmentCase
          ? 'Ver soluciones para Gobierno'
          : 'Ver soluciones para Empresas',
      }
  const related = [
    ...group.cases.filter((item) => item.id !== caseStudy.id),
    ...caseStudies.filter(
      (item) =>
        item.kind === 'project' &&
        !group.cases.some((entry) => entry.id === item.id),
    ),
  ].slice(0, 2)

  return (
    <div className="case-detail">
      <Container>
        <nav className="case-detail-breadcrumb" aria-label="Ruta de navegación">
          <Link to="/casos-de-exito">Casos de éxito</Link>
          <span aria-hidden="true">/</span>
          <Link to="/casos-de-exito" hash={group.id}>
            {group.title}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{caseStudy.client}</span>
        </nav>
        <article>
          <header className="case-detail-hero">
            <div>
              <p className="case-detail-kicker">
                {caseStudy.kind === 'product'
                  ? 'Producto propio'
                  : caseStudy.client}
              </p>
              <h1>{caseStudy.title}</h1>
              <p className="case-detail-summary">{caseStudy.summary}</p>
            </div>
            <img src={caseStudy.image} alt="" width="1280" height="720" />
          </header>
          <div className="case-detail-layout">
            <div className="case-detail-story">
              {caseStudy.focus.map((item, index) => (
                <section
                  key={item.title}
                  aria-labelledby={`case-section-${index}`}
                >
                  <h2 id={`case-section-${index}`}>{item.title}</h2>
                  <p>{item.description}</p>
                </section>
              ))}
            </div>
            <aside
              className="case-detail-facts"
              aria-labelledby="case-facts-title"
            >
              <h2 id="case-facts-title">
                {caseStudy.kind === 'product'
                  ? 'Sobre la solución'
                  : 'Sobre el proyecto'}
              </h2>
              <dl>
                <div>
                  <dt>Sector</dt>
                  <dd>{caseStudy.sector}</dd>
                </div>
                <div>
                  <dt>Tecnologías</dt>
                  <dd>{caseStudy.technologies}</dd>
                </div>
              </dl>
              <p>¿Busca una solución para un proceso similar?</p>
              <ButtonLink to="/contacto" search={{ motivo: 'reunion' }}>
                Conversemos
              </ButtonLink>
              {caseStudy.kind === 'product' ? (
                <Link
                  to="/productos/$slug"
                  params={{ slug: 'navastay' }}
                  className="case-detail-product-link"
                >
                  Conocer NavaStay <span aria-hidden="true">↗</span>
                </Link>
              ) : (
                <Link
                  to="/areas/$slug"
                  params={{ slug: solutionLink.slug }}
                  hash={solutionLink.hash}
                  className="case-detail-product-link"
                >
                  {solutionLink.label} <span aria-hidden="true">↗</span>
                </Link>
              )}
            </aside>
          </div>
        </article>
        <section
          className="case-detail-related"
          aria-labelledby="related-cases-title"
        >
          <div className="case-detail-related-heading">
            <h2 id="related-cases-title">Otros proyectos de Navasoft</h2>
            <Link to="/casos-de-exito">
              Ver todos los casos <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ul className="success-cases-grid">
            {related.map((item) => (
              <li key={item.id}>
                <CaseCard caseStudy={item} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  )
}
