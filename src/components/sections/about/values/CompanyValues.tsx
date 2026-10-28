import { companyValues } from '../../../../data/about'
import { Card, CardContent } from '../../../ui/Card'
import { SectionTitle } from '../../../ui/SectionTitle'
import ValueIcon from './ValueIcon'

type CompanyValue = (typeof companyValues)[number]

// Cada valor conserva el icono alineado desde arriba aunque el título ocupe más líneas.
function ValueItem({ value }: { value: CompanyValue }) {
  return (
    <li>
      <Card className="about-value-card">
        <CardContent className="about-value-content items-center text-center">
          <span className="about-value-icon" aria-hidden="true">
            <ValueIcon value={value.id} />
          </span>
          <h3>{value.title}</h3>
          <p className="about-value-description">{value.description}</p>
        </CardContent>
      </Card>
    </li>
  )
}

// Las frases de apoyo son propuestas editoriales, sin atribuciones a clientes.
export default function CompanyValues() {
  return (
    <section
      className="about-values"
      aria-label="Valores de Navasoft Soluciones"
    >
      <SectionTitle title="Valores" className="about-values-title" />
      <ul className="about-values-list">
        {companyValues.map((value) => (
          <ValueItem key={value.id} value={value} />
        ))}
      </ul>
    </section>
  )
}
