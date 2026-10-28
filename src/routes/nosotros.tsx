import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import { companyIntroduction } from '../data/about'
import { contactBanner } from '../data/site'
import BusinessAreas from '../components/sections/about/business/BusinessAreas'
import Timeline from '../components/sections/about/timeline/Timeline'
import CompanyPurpose from '../components/sections/about/purpose/CompanyPurpose'
import CompanyValues from '../components/sections/about/values/CompanyValues'
import { Container } from '../components/ui/Container'
import '../components/sections/about/styles/About.css'
import AboutPresentation from '../components/sections/about/presentation/AboutPresentation'
import { ButtonLink } from '../components/ui/Button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nosotros')({
  head: () => ({
    meta: [
      { title: 'Nosotros · Navasoft Soluciones' },
      { name: 'description', content: companyIntroduction.metaDescription },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <div className="about-content">
        <AboutPresentation />
        <Container className="about-page max-w-6xl lg:px-6">
          <CompanyPurpose />
        </Container>
        <Container className="about-page-values max-w-6xl lg:px-6">
          <CompanyValues />
        </Container>
        {/* La trayectoria sigue a los valores; sus imágenes permanecen como referencia. */}
        <Timeline />
        <Container className="about-page-bottom max-w-6xl lg:px-6">
          <BusinessAreas />
          <section
            className="about-careers"
            aria-label="Oportunidades en Navasoft"
          >
            <div>
              <h2>¿Quieres construir con nosotros?</h2>
              <p>
                Conoce las oportunidades para formar parte de nuestro equipo.
              </p>
            </div>
            <div className="about-hero-actions">
              <ButtonLink to="/oportunidades" variant="primary" size="lg">
                Ver oportunidades
              </ButtonLink>
              <ButtonLink
                to="/contacto"
                search={{ motivo: 'reunion' }}
                variant="outline"
                size="lg"
              >
                Contacto comercial
              </ButtonLink>
            </div>
          </section>
        </Container>
      </div>
      <InstitutionalBanner {...contactBanner} />
    </>
  )
}
