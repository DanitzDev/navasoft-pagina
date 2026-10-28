import { caseStudies, casesIntroduction } from '../../../data/cases'
import { Container } from '../../ui/Container'
import { SectionTitle } from '../../ui/SectionTitle'
import { ButtonLink } from '../../ui/Button'
import CaseCard from '../cases/CaseCard'
import '../cases/Cases.css'

// Inicio y catálogo comparten los mismos datos para evitar diferencias de contenido.
export default function CasesSection() {
  return (
    <section
      id="casos-de-exito"
      className="success-cases"
      aria-label="Casos de éxito"
    >
      <Container>
        <div className="success-cases-header">
          <SectionTitle
            {...casesIntroduction}
            className="success-cases-heading"
          />
          <ButtonLink
            to="/casos-de-exito"
            variant="primary"
            className="success-cases-all"
          >
            Ver todos los casos
          </ButtonLink>
        </div>
        <ul className="success-cases-grid">
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.id}>
              <CaseCard caseStudy={caseStudy} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
