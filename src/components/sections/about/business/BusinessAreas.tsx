import { Link } from '@tanstack/react-router'
import { footerSolutions } from '../../../../data/site'
import { SectionTitle } from '../../../ui/SectionTitle'

// Reutilizar los destinos existentes evita crear rutas o contenido comercial provisional.
export default function BusinessAreas() {
  return (
    <section className="about-business" aria-label="Áreas de negocio">
      <SectionTitle title="Áreas de negocio" className="about-business-title" />
      <ul className="about-business-list">
        {footerSolutions.map((area) => (
          <li key={area.href}>
            <Link to={area.href} className="about-business-link">
              <span>{area.label}</span>
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
