import { useEffect } from 'react'
import { Link, createFileRoute, useLocation } from '@tanstack/react-router'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SectionTitle } from '../components/ui/SectionTitle'
import CaseCard from '../components/sections/cases/CaseCard'
import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import { caseStudies, casesIntroduction } from '../data/cases'
import { contactBanner } from '../data/site'

export const Route = createFileRoute('/casos-de-exito')({
  head: () => ({
    meta: [
      { title: 'Casos de éxito · Navasoft Soluciones' },
      {
        name: 'description',
        content:
          'Conoce los casos de JASEC y COSEVI: servicios públicos, procesos institucionales y transformación digital.',
      },
    ],
  }),
  component: SuccessCasesPage,
})

function SuccessCasesPage() {
  const hash = useLocation({ select: (location) => location.hash })
  const selectedCase = caseStudies.find((caseStudy) => caseStudy.id === hash)

  // El enlace posiciona el recorrido y el foco permite continuar con el teclado.
  useEffect(() => {
    if (selectedCase) {
      document.getElementById(selectedCase.id)?.focus({ preventScroll: true })
    }
  }, [selectedCase])

  return (
    <>
      <section
        className="cases-page"
        aria-label="Casos de éxito de Navasoft Soluciones"
      >
        <Container>
          <SectionTitle
            as="h1"
            title="Casos de éxito"
            eyebrow={casesIntroduction.eyebrow}
            description={casesIntroduction.description}
            className="cases-page-heading"
          />
          <div className="cases-page-navigation">
            <nav aria-label="Explorar proyectos">
              <ul className="cases-project-links">
                {caseStudies.map((caseStudy) => (
                  <li key={caseStudy.id}>
                    <Link
                      to="/casos-de-exito"
                      hash={caseStudy.id}
                      className="cases-project-link"
                      activeOptions={{ exact: true, includeHash: true }}
                    >
                      {caseStudy.client}
                      <span aria-hidden="true">↓</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ButtonLink
              to="/"
              hash="casos-de-exito"
              variant="outline"
              size="sm"
              className="cases-page-return"
            >
              Volver a los casos de Inicio
            </ButtonLink>
          </div>
          <ul className="success-cases-grid">
            {caseStudies.map((caseStudy) => (
              <li key={caseStudy.id}>
                <CaseCard caseStudy={caseStudy} expanded />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <InstitutionalBanner {...contactBanner} showDemo={false} />
    </>
  )
}
