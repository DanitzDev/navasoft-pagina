import { Container } from '../../../ui/Container'
import { SectionTitle } from '../../../ui/SectionTitle'
import { ButtonLink } from '../../../ui/Button'
import { products } from '../../../../data/navigation'
import { footerSolutions } from '../../../../data/site'
import { companyIntroduction } from '../../../../data/about'

// Cifras trazables a la historia y los catálogos; no se replican métricas sin validar.
const facts = [
  { value: '2011', label: 'Año de fundación' },
  { value: '15', label: 'Años de trayectoria en 2026' },
  { value: String(products.length), label: 'Productos en nuestro ecosistema' },
  { value: String(footerSolutions.length), label: 'Áreas de negocio' },
]

export default function AboutPresentation() {
  return (
    <>
      <Container className="about-page max-w-6xl lg:px-6">
        <section className="about-hero" aria-label="Quiénes somos">
          <div className="about-hero-copy">
            <SectionTitle
              as="h1"
              eyebrow="Quiénes somos"
              title="Somos soluciones a la medida."
              description="Navasoft Soluciones es una fábrica de software costarricense. Diseñamos soluciones alrededor de los procesos y las necesidades de cada organización."
              className="about-hero-heading"
            />
            <div className="about-hero-actions">
              <ButtonLink
                to="/contacto"
                search={{ motivo: 'reunion' }}
                variant="primary"
                size="lg"
              >
                Solicitar reunión
              </ButtonLink>
              <ButtonLink to="/casos-de-exito" variant="outline">
                Ver casos de éxito
              </ButtonLink>
            </div>
          </div>
          <figure className="about-hero-visual">
            <img
              className="about-hero-image"
              src="/images/hero-trust.jpeg"
              alt=""
              width="1792"
              height="1008"
            />
            <div className="about-hero-brand">
              <img
                src="/images/brand/navasoft-white.png"
                alt="Navasoft · Tecnología que innova"
                width="1200"
                height="558"
              />
            </div>
            <figcaption>
              Desde 2011, construyendo soluciones a la medida.
            </figcaption>
          </figure>
        </section>
        <div className="about-hero-facts" aria-label="Navasoft en cifras">
          <dl className="about-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <section
          className="about-confidence"
          aria-label="Experiencia de Navasoft"
        >
          <SectionTitle
            eyebrow="Confianza"
            title="La confianza se construye con resultados."
            description="Desde 2011 acompañamos a instituciones públicas y empresas en el desarrollo de soluciones tecnológicas, la integración de procesos y la transformación digital."
            className="about-confidence-heading"
          />
          <div className="about-confidence-body">
            <div className="about-profile-copy">
              <p>{companyIntroduction.capabilities}</p>
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}
