import { useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { OrganizationLogo } from '../../types/trust'
import './LogoCarousel.css'

type LogoCarouselProps = {
  logos: readonly OrganizationLogo[]
  label: string
  showPlaceholders?: boolean
}

export function LogoCarousel({
  logos,
  label,
  showPlaceholders = false,
}: LogoCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const resumeAt = useRef(0)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const hintId = useId()
  const count = logos.length || (showPlaceholders ? 6 : 0)

  const isCarousel = count >= 6

  useEffect(() => {
    const rail = railRef.current
    if (!rail || !isCarousel) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = 0
    let offset = rail.scrollLeft
    let visible = false
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(rail)
    function tick(now: number) {
      if (!rail) return
      const elapsed = Math.min(now - last, 50)
      last = now
      if (
        visible &&
        !document.hidden &&
        !motion.matches &&
        !paused &&
        !drag.current &&
        now >= resumeAt.current &&
        !rail.contains(document.activeElement) &&
        !(window.matchMedia('(hover: hover)').matches && rail.matches(':hover'))
      ) {
        const length =
          rail.firstElementChild?.getBoundingClientRect().width ?? 0
        if (length) {
          offset = (offset + (elapsed * length) / 36000) % length
          rail.scrollLeft = offset
        }
      } else {
        offset = rail.scrollLeft
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [count, isCarousel, paused])

  function move(direction: number) {
    const rail = railRef.current
    const group = rail?.firstElementChild
    if (!rail || !group) return
    setPaused(true)
    const step = group.querySelector('li')?.getBoundingClientRect().width ?? 184
    const gap = parseFloat(getComputedStyle(group).columnGap) || 0
    rail.scrollBy({
      left: direction * (step + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  if (!count) return null
  return (
    <div
      className={`logo-carousel${isCarousel ? '' : ' logo-carousel--static'}`}
      role="region"
      aria-label={label}
    >
      {isCarousel && (
        <p id={hintId} className="sr-only">
          Usa los botones anterior y siguiente o las flechas del teclado para
          recorrer los logos. Espacio permite pausar o reanudar el movimiento
          automático.
        </p>
      )}
      <div
        ref={railRef}
        id={`${hintId}-rail`}
        className="logo-carousel-rail"
        tabIndex={isCarousel ? 0 : undefined}
        aria-label={label}
        aria-describedby={isCarousel ? hintId : undefined}
        onPointerDown={(event) => {
          if (!isCarousel || event.button !== 0) return
          resumeAt.current = Infinity
          if (event.pointerType === 'mouse') {
            event.preventDefault()
            drag.current = {
              x: event.clientX,
              left: event.currentTarget.scrollLeft,
            }
            event.currentTarget.setPointerCapture(event.pointerId)
            event.currentTarget.dataset.dragging = 'true'
          }
        }}
        onPointerMove={(event) => {
          if (drag.current)
            event.currentTarget.scrollLeft =
              drag.current.left + drag.current.x - event.clientX
        }}
        onPointerUp={(event) => {
          drag.current = null
          delete event.currentTarget.dataset.dragging
          resumeAt.current = performance.now() + 3000
        }}
        onPointerCancel={(event) => {
          drag.current = null
          delete event.currentTarget.dataset.dragging
          resumeAt.current = performance.now() + 3000
        }}
        onLostPointerCapture={(event) => {
          drag.current = null
          delete event.currentTarget.dataset.dragging
        }}
        onTouchEnd={() => {
          resumeAt.current = performance.now() + 3000
        }}
        onWheel={() => {
          resumeAt.current = performance.now() + 3000
        }}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return
          if (event.key === ' ') {
            event.preventDefault()
            setPaused((current) => !current)
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            move(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
      >
        {(isCarousel ? [0, 1] : [0]).map((copy) => (
          <ul
            key={copy}
            className="logo-carousel-group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {logos.length
              ? logos.map((logo) => (
                  <li
                    key={logo.id}
                    className="logo-carousel-item"
                    data-surface={logo.surface}
                    data-logo={logo.id}
                  >
                    <img
                      src={logo.image}
                      alt={copy ? '' : `Logo de ${logo.name}`}
                      width="160"
                      height="80"
                      loading="lazy"
                      draggable={false}
                    />
                    <span
                      aria-hidden={
                        !logo.relationship || logo.relationship === 'Partner'
                          ? true
                          : undefined
                      }
                    >
                      {logo.relationship !== 'Partner' ? logo.relationship : ''}
                    </span>
                  </li>
                ))
              : Array.from({ length: count }, (_, index) => (
                  <li key={index} className="logo-carousel-placeholder">
                    Espacio para logo aprobado
                  </li>
                ))}
          </ul>
        ))}
      </div>
      {isCarousel && (
        <div
          className="logo-carousel-controls"
          role="group"
          aria-label={`Controles de ${label.toLowerCase()}`}
        >
          <button
            className="logo-carousel-toggle"
            type="button"
            aria-controls={`${hintId}-rail`}
            aria-label={`${paused ? 'Reanudar' : 'Pausar'} ${label.toLowerCase()}`}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
          <button
            type="button"
            aria-label={`Anterior en ${label.toLowerCase()}`}
            aria-controls={`${hintId}-rail`}
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Siguiente en ${label.toLowerCase()}`}
            aria-controls={`${hintId}-rail`}
            onClick={() => move(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
