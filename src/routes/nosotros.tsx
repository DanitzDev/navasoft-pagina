import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import { companyIntroduction } from '../data/about'
import { contactBanner } from '../data/site'
import BusinessAreas from '../components/sections/about/business/BusinessAreas'
import Timeline from '../components/sections/about/timeline/Timeline'
import CompanyPurpose from '../components/sections/about/purpose/CompanyPurpose'
import CompanyValues from '../components/sections/about/values/CompanyValues'
import { Container } from '../components/ui/Container'
import '../components/sections/about/styles/About.css'
import { SectionTitle } from '../components/ui/SectionTitle'
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
        <Container className="about-page max-w-6xl lg:px-6">
          <div className="about-introduction">
            <SectionTitle
              as="h1"
              title="Nosotros"
              description={companyIntroduction.text}
              className="about-page-heading"
            />
            <p className="about-introduction-detail">
              {companyIntroduction.capabilities}
            </p>
          </div>
          <CompanyPurpose />
        </Container>
        <Container className="about-page-values max-w-6xl lg:px-6">
          <CompanyValues />
        </Container>
        {/* La trayectoria sigue a los valores; sus imágenes permanecen como referencia. */}
        <Timeline />
        <Container className="about-page-bottom max-w-6xl lg:px-6">
          <BusinessAreas />
        </Container>
      </div>
      <InstitutionalBanner {...contactBanner} />
    </>
  )
}
