import { useId } from 'react'
import type { CaseStudy } from '../../../data/cases'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { ButtonLink } from '../../ui/Button'
import { ArrowLink } from '../../ui/ArrowLink'
import './Cases.css'

type CaseCardProps = {
  caseStudy: CaseStudy
  expanded?: boolean
}

// La misma tarjeta sirve en Inicio y en el catálogo; solo el catálogo amplía el enfoque.
// Los destacados enlazan a Gobierno para respetar el recorrido del prototipo.
export default function CaseCard({
  caseStudy,
  expanded = false,
}: CaseCardProps) {
  const titleId = useId()
  // En Inicio, el encabezado de la sección ya ocupa h2; el catálogo parte de h1.
  const ClientHeading = expanded ? 'h2' : 'h3'
  const ProjectHeading = expanded ? 'h3' : 'h4'

  return (
    <article
      id={expanded ? caseStudy.id : undefined}
      aria-labelledby={titleId}
      className="case-study"
      tabIndex={expanded ? -1 : undefined}
    >
      <Card className="case-card border-white/10 bg-transparent shadow-none">
        <div className="case-card-media">
          {/* Imagen conceptual: la institución se identifica por su nombre, no por la fotografía. */}
          <img
            src={caseStudy.image}
            alt=""
            loading="lazy"
            width="1792"
            height="1008"
          />
          <div className="case-card-identity">
            <ClientHeading id={titleId}>{caseStudy.client}</ClientHeading>
            <p>{caseStudy.sector}</p>
          </div>
        </div>
        <CardContent className="case-card-content">
          <ProjectHeading className="case-card-title">
            {caseStudy.title}
          </ProjectHeading>
          <p className="case-card-summary">{caseStudy.summary}</p>
          {!expanded && (
            <ul className="case-card-tags" aria-label="Ámbitos del proyecto">
              {caseStudy.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className="case-card-tag">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          {expanded && (
            <div className="case-card-focus">
              <h4>Enfoque del proyecto</h4>
              <dl>
                {caseStudy.focus.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="case-card-actions">
            <ButtonLink
              to="/contacto"
              search={{ motivo: 'reunion' }}
              variant="secondary"
              size="sm"
            >
              Solicitar reunión
              <span className="sr-only"> sobre {caseStudy.client}</span>
            </ButtonLink>
            {expanded ? (
              <ArrowLink
                to="/"
                hash="casos-de-exito"
                className="case-card-more"
              >
                <span className="case-card-more-label">Volver a Inicio</span>
              </ArrowLink>
            ) : (
              <ArrowLink
                to="/areas/$slug"
                params={{ slug: 'gobierno' }}
                className="case-card-more"
              >
                <span className="case-card-more-label">Conocer más</span>
                <span className="sr-only"> sobre {caseStudy.client}</span>
              </ArrowLink>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
