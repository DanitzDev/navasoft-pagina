import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { history } from '../../../../data/history'
import { historyPreview } from '../../../../data/history-preview'
import type { HistoryMilestone } from '../../../../data/history'
import { Container } from '../../../ui/Container'
import { SectionTitle } from '../../../ui/SectionTitle'
import Milestone from './Milestone'
import { formatHistoryPeriod } from './history-period'
import { createTimelinePath, getTimelineProgress } from './timeline-geometry'
import type { TimelineVariant } from './timeline-geometry'
import { centerTimelineStep } from './timeline-scroll'
import './Timeline.css'

type TimelineProps = {
  items?: readonly HistoryMilestone[]
  preview?: boolean
  variant?: TimelineVariant
  className?: string
}

export default function Timeline({
  items = history,
  preview = false,
  className = '',
  variant = 'straight',
}: TimelineProps) {
  const [hasOverflow, setHasOverflow] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [outgoing, setOutgoing] = useState<{
    id: string
    milestone?: HistoryMilestone
  } | null>(null)
  const selector = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const stepButtons = useRef<Array<HTMLButtonElement | null>>([])
  const instanceId = useId()
  // Priorizar el catálogo oficial. La muestra solo se usa si no hay datos y se pide preview.
  const milestones = items.length ? items : preview ? historyPreview : []
  // Ordenar una copia conserva el catálogo original y la selección por id.
  const steps = [...milestones].sort(
    (first, second) => first.year - second.year,
  )
  const selected = steps.find((step) => step.id === selectedId) ?? steps.at(0)

  // Medir el ancho real evita mostrar una instrucción innecesaria en tablet o escritorio.
  useEffect(() => {
    const panel = selector.current
    const track = rail.current
    if (!panel || !track) return
    let previousWidth = panel.clientWidth
    const measure = () => {
      // Medir el recorrido, no el desbordamiento visual del SVG y sus efectos.
      setHasOverflow(
        track.getBoundingClientRect().width > panel.clientWidth + 1,
      )
      // Al rotar o reducir la pantalla, mantener visible el año seleccionado.
      if (previousWidth !== panel.clientWidth) {
        const activeButton = panel.querySelector<HTMLButtonElement>(
          '[aria-pressed="true"]',
        )
        if (activeButton) centerTimelineStep(panel, activeButton, 'auto')
        previousWidth = panel.clientWidth
      }
    }
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    observer.observe(track)
    return () => observer.disconnect()
  }, [steps.length])

  // La vista provisional se activa explícitamente; no publicar una sección vacía.
  if (!selected) return null

  const activeId = selected.id
  // El registro seleccionado ya incluye texto e imagen; no volver a buscar en ambos catálogos.
  const milestone = selected
  const detailId = `${instanceId}-detail`
  const selectedIndex = steps.findIndex((step) => step.id === activeId)
  const { progress, clipWidth } = getTimelineProgress(
    selectedIndex,
    steps.length,
  )
  const path = createTimelinePath(steps.length, variant)
  const progressId = `${instanceId}-progress`
  const style = {
    '--history-count': steps.length,
    '--history-progress': progress,
  } as CSSProperties

  function selectStep(index: number, focusStep = false) {
    // Limitar los extremos: no saltar del último hito al primero.
    const targetIndex = Math.max(0, Math.min(steps.length - 1, index))
    const target = steps.at(targetIndex)
    if (!target) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (target.id !== activeId) {
      setDirection(targetIndex > selectedIndex ? 'forward' : 'backward')
      // Mantener una sola copia saliente, incluso con varias pulsaciones rápidas.
      setOutgoing(reduceMotion ? null : { id: activeId, milestone })
      setSelectedId(target.id)
    }

    const button = stepButtons.current[targetIndex]
    if (focusStep) button?.focus({ preventScroll: true })

    // Desplazar solo el selector horizontal, sin mover la página hacia arriba.
    const panel = selector.current
    if (panel && button) {
      centerTimelineStep(panel, button, reduceMotion ? 'auto' : 'smooth')
    }
  }

  function handleStepKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    // No interceptar atajos del navegador, como Alt + flecha para volver atrás.
    if (event.altKey || event.ctrlKey || event.metaKey) return

    let target: number
    switch (event.key) {
      case 'ArrowLeft':
        target = index - 1
        break
      case 'ArrowRight':
        target = index + 1
        break
      case 'Home':
        target = 0
        break
      case 'End':
        target = steps.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    selectStep(target, true)
  }

  return (
    <Container
      as="section"
      className={`history-section max-w-6xl lg:px-6 ${className}`}
      data-variant={variant}
      aria-label="Historia de Navasoft Soluciones"
    >
      <SectionTitle
        title="Nuestra historia"
        align="center"
        className="history-heading"
      />
      <p id={`${instanceId}-instructions`} className="history-instructions">
        Selecciona un año para conocer sus acontecimientos.
      </p>
      <div
        ref={selector}
        className="history-selector-scroll"
        aria-describedby={`${instanceId}-instructions${hasOverflow ? ` ${instanceId}-scroll-hint` : ''}`}
      >
        <div ref={rail} className="history-rail" style={style}>
          <div className="history-mobile-track" aria-hidden="true" />
          <svg
            className="history-wave"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              {/* El recorte sigue la posición del punto, sin depender del largo del trazo. */}
              <clipPath id={progressId} clipPathUnits="userSpaceOnUse">
                <rect
                  className="history-progress-clip"
                  x="0"
                  y="-40"
                  width={clipWidth}
                  height="180"
                />
              </clipPath>
            </defs>
            <path d={path} />
            <path
              className="history-wave-progress"
              d={path}
              clipPath={`url(#${progressId})`}
            />
          </svg>
          <ol
            className="history-steps"
            aria-label="Acontecimientos de Navasoft Soluciones"
          >
            {steps.map((step, index) => {
              const eventTitle = step.title
              const period = formatHistoryPeriod(step)
              return (
                <li key={step.id} className="history-step">
                  {/* Tab, Enter y Espacio siguen siendo nativos; las flechas son un atajo. */}
                  <button
                    ref={(button) => {
                      stepButtons.current[index] = button
                    }}
                    type="button"
                    className="history-step-button"
                    data-complete={index < selectedIndex || undefined}
                    aria-pressed={step.id === activeId}
                    aria-controls={detailId}
                    aria-label={`Ver acontecimiento de ${period}${eventTitle ? `: ${eventTitle}` : ''}`}
                    onClick={() => selectStep(index)}
                    onKeyDown={(event) => handleStepKeyDown(event, index)}
                  >
                    {/* El punto y su fecha forman una única zona de selección. */}
                    <span className="history-step-dot-area" aria-hidden="true">
                      <span className="history-step-dot" />
                    </span>
                    <span className="history-step-year">{period}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      {hasOverflow && (
        <p id={`${instanceId}-scroll-hint`} className="history-scroll-hint">
          Desliza para ver todos los años <span aria-hidden="true">↔</span>
        </p>
      )}
      <div
        id={detailId}
        className="history-detail-transition"
        data-direction={direction}
      >
        {/* La copia saliente solo anima: no duplica contenido para lectores de pantalla. */}
        {outgoing && (
          <div
            key={outgoing.id}
            className="history-detail-outgoing"
            aria-hidden="true"
            inert
            onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return
              const outgoingId = outgoing.id
              setOutgoing((current) =>
                current?.id === outgoingId ? null : current,
              )
            }}
          >
            <Milestone milestone={outgoing.milestone} />
          </div>
        )}
        {/* El foco permanece en el hito; solo se anuncia el nuevo detalle. */}
        <div aria-live="polite" aria-atomic="true">
          <div key={activeId} className="history-detail-current">
            <Milestone milestone={milestone} />
          </div>
        </div>
      </div>
    </Container>
  )
}
