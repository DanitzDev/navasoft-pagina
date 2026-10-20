import type { HistoryMilestone } from '../../../data/history'

type MilestoneProps = { milestone?: HistoryMilestone }

// Una imagen ausente conserva su espacio sin solicitar un archivo inexistente.
export default function Milestone({ milestone }: MilestoneProps) {
  const image = milestone?.image
  const imageSource = image?.src.trim()

  return (
    <div className="history-detail">
      <div className="history-detail-copy">
        {milestone ? (
          <>
            <p className="history-year">{milestone.year}</p>
            <h3>{milestone.title}</h3>
            <p className="history-description">{milestone.description}</p>
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
        {image && imageSource ? (
          <img
            src={imageSource}
            alt={image.alt}
            loading="lazy"
            width="640"
            height="400"
          />
        ) : (
          <div
            className="history-image-placeholder"
            role="img"
            aria-label="Espacio reservado para la imagen del acontecimiento"
          >
            <span aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}
