import { useState } from 'react'
import { formatHistoryPeriod } from './history-period'
import type { HistoryMilestone } from '../../../../data/history'

type MilestoneProps = { milestone?: HistoryMilestone }

// Tanto una imagen ausente como una fallida conservan el espacio del detalle.
export default function Milestone({ milestone }: MilestoneProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const image = milestone?.image
  const imageSource = image?.src.trim()
  // El error pertenece a esta URL: otra imagen puede cargar con normalidad.
  const imageFailed = Boolean(imageSource && failedSource === imageSource)

  return (
    <div
      className={
        milestone?.sections?.length
          ? 'history-detail history-detail-products'
          : 'history-detail'
      }
    >
      <div className="history-detail-copy">
        {milestone ? (
          <>
            <div className="history-detail-heading">
              <p className="history-year">{formatHistoryPeriod(milestone)}</p>
              <h3>{milestone.title}</h3>
            </div>
            {milestone.description && (
              <p className="history-description">{milestone.description}</p>
            )}
            {milestone.highlights && (
              <ul className="history-highlights">
                {milestone.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {milestone.sections && (
              <ul className="history-subsections">
                {milestone.sections.map((section) => (
                  <li key={section.title}>
                    <h4>{section.title}</h4>
                    <p className="history-description">{section.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <span className="sr-only">Texto del acontecimiento pendiente.</span>
            <div className="history-copy-placeholder" aria-hidden="true">
              <span className="history-placeholder history-placeholder-year" />
              <span className="history-placeholder history-placeholder-title" />
              <span className="history-placeholder history-placeholder-title-short" />
              <div className="history-placeholder-paragraph">
                <span className="history-placeholder" />
                <span className="history-placeholder" />
                <span className="history-placeholder" />
                <span className="history-placeholder history-placeholder-short" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="history-image">
        {image && imageSource && !imageFailed ? (
          <img
            src={imageSource}
            alt={image.alt}
            onError={() => setFailedSource(imageSource)}
            loading="lazy"
            width="640"
            height="400"
          />
        ) : (
          <div
            className="history-image-placeholder"
            role="img"
            aria-label={
              imageFailed
                ? 'Imagen del acontecimiento no disponible'
                : 'Espacio reservado para la imagen del acontecimiento'
            }
          >
            {imageFailed ? (
              <p className="history-image-error" aria-hidden="true">
                Imagen no disponible
              </p>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        )}
      </div>
      {milestone?.recognition && (
        <aside className="history-recognition" aria-label="Reconocimiento">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="m8 12-2 9 6-3 6 3-2-9" />
          </svg>
          <div>
            <h4>{milestone.recognition.title}</h4>
            <p className="history-description">
              {milestone.recognition.description}
            </p>
          </div>
        </aside>
      )}
    </div>
  )
}
