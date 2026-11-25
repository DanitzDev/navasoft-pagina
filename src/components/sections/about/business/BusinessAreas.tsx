import { Link } from '@tanstack/react-router'
import { aboutBusinessAreas } from '../../../../data/about'
import { SectionTitle } from '../../../ui/SectionTitle'

export default function BusinessAreas() {
  return (
    <section className="about-business" aria-label="Áreas de negocio">
      <SectionTitle
        eyebrow="Cómo nos organizamos"
        title="Cuatro áreas, un propósito compartido."
        className="about-business-title"
      />
      <ul className="about-business-list">
        {aboutBusinessAreas.map((area) => (
          <li key={`${area.label}-${area.href}`}>
            <Link
              to={area.href}
              hash={'hash' in area ? area.hash : undefined}
              className="about-business-link"
            >
              <span className="about-business-copy">
                <span className="about-business-name">{area.label}</span>
                <span className="about-business-description">{area.description}</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
