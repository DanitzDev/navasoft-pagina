import { useId } from 'react'
import { Link } from '@tanstack/react-router'
import type { CaseStudy } from '../../../data/cases'
import { Card, CardContent } from '../../ui/Card'
import './Cases.css'

// Resumen compartido por Inicio, catálogo y proyectos relacionados.
export default function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const titleId = useId()
  return (
    <article className="case-study" aria-labelledby={titleId}>
      <Link
        to="/casos-de-exito/$slug"
        params={{ slug: caseStudy.id }}
        className="case-card-link"
      >
        <Card className="case-card border-white/10 bg-transparent shadow-none">
          <div className="case-card-media">
            <img
              src={caseStudy.image}
              alt=""
              loading="lazy"
              width="1280"
              height="720"
            />
            <div className="case-card-identity">
              <p>
                {caseStudy.kind === 'product'
                  ? 'Producto propio'
                  : caseStudy.sector}
              </p>
              <h3 id={titleId}>{caseStudy.client}</h3>
            </div>
          </div>
          <CardContent className="case-card-content">
            <p className="case-card-title">{caseStudy.title}</p>
            <p className="case-card-summary">{caseStudy.summary}</p>
            <span className="case-card-read">
              <span className="case-card-read-label">
                {caseStudy.kind === 'product'
                  ? 'Explorar la solución'
                  : 'Ver caso completo'}
              </span>
              <span aria-hidden="true">↗</span>
            </span>
          </CardContent>
        </Card>
      </Link>
    </article>
  )
}
