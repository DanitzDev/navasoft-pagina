import { companyPurpose } from '../../../../data/about'
import type { CompanyPurposeItem } from '../../../../data/about'
import { SectionTitle } from '../../../ui/SectionTitle'
import PurposeIcon from './PurposeIcon'

// La tarjeta organiza el contenido; PurposeIcon conserva los trazos del símbolo.
function PurposeBlock({ purpose }: { purpose: CompanyPurposeItem }) {
  return (
    <article className="about-purpose-panel" data-purpose={purpose.id}>
      <div className="about-purpose-header">
        <span className="about-purpose-symbol" aria-hidden="true">
          <PurposeIcon purpose={purpose.id} />
        </span>
        <SectionTitle title={purpose.title} className="about-purpose-title" />
      </div>
      <div className="about-purpose-copy">
        <p className="about-purpose-description">{purpose.description}</p>
      </div>
    </article>
  )
}

// Misión y visión conservan su contenido en dos bloques sencillos.
export default function CompanyPurpose() {
  return (
    <section className="about-purpose-flow" aria-label="Misión y visión">
      {companyPurpose.map((purpose) => (
        <PurposeBlock key={purpose.id} purpose={purpose} />
      ))}
    </section>
  )
}
