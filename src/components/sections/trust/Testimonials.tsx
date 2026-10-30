import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { Testimonial } from '../../../types/trust'

type TestimonialsProps = {
  items: readonly Testimonial[]
  showPlaceholder?: boolean
}

// Las muestras solo se solicitan en desarrollo; no se mezclan con citas aprobadas.
const previewItems: readonly Testimonial[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: 'preview-' + index,
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Nombre por confirmar',
    role: 'Cargo por confirmar',
    organization: 'Empresa por confirmar',
  }),
)

export function Testimonials({
  items,
  showPlaceholder = false,
}: TestimonialsProps) {
  const entries = items.length ? items : showPlaceholder ? previewItems : []
  const draft = !items.length
  const rail = useRef<HTMLUListElement>(null)
  const region = useRef<HTMLDivElement>(null)
  const resumeAt = useRef(0)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const railId = useId()
  const hintId = useId()
  const [position, setPosition] = useState({ index: 0, visible: 1 })
  const [paused, setPaused] = useState(false)
  const measure = useCallback(() => {
    const list = rail.current
    const first = list?.children.item(0)
    if (!list || !first) return
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0
    const step = first.getBoundingClientRect().width + gap
    if (!step) return
    const visible = 1
    const index = Math.min(
      Math.max(0, entries.length - visible),
      Math.max(0, Math.round(list.scrollLeft / step)),
    )
    setPosition((current) =>
      current.index === index && current.visible === visible
        ? current
        : { index, visible },
    )
  }, [entries.length])

  useEffect(() => {
    const list = rail.current
    if (!list) return
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [measure])

  // Cada burbuja aparece una vez al entrar en pantalla, también tras deslizar.
  useEffect(() => {
    const list = rail.current
    if (!list || typeof IntersectionObserver === 'undefined') return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    const cards = Array.from(list.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (changes) => {
        for (const change of changes) {
          if (!change.isIntersecting) continue
          const card = change.target as HTMLElement
          card.dataset.reveal = 'visible'
          observer.unobserve(card)
        }
      },
      { threshold: 0.18 },
    )
    for (const card of cards) {
      card.dataset.reveal = 'pending'
      observer.observe(card)
    }
    const revealAll = () => {
      if (!motion.matches) return
      observer.disconnect()
      for (const card of cards) delete card.dataset.reveal
    }
    motion.addEventListener('change', revealAll)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', revealAll)
      for (const card of cards) delete card.dataset.reveal
    }
  }, [entries.length])

  // Reservar tiempo de lectura y suspender el avance durante la interacción.
  useEffect(() => {
    const list = rail.current
    const area = region.current
    if (!list || !area || entries.length < 2) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.25 },
    )
    observer.observe(area)
    resumeAt.current = performance.now() + 8000
    const timer = window.setInterval(() => {
      const now = performance.now()
      if (
        !visible ||
        document.hidden ||
        motion.matches ||
        paused ||
        drag.current ||
        area.contains(document.activeElement) ||
        (window.matchMedia('(hover: hover)').matches && area.matches(':hover'))
      ) {
        resumeAt.current = now + 8000
        return
      }
      if (now < resumeAt.current) return
      const first = list.children.item(0) as HTMLElement | null
      if (!first) return
      const step =
        first.getBoundingClientRect().width +
        (parseFloat(getComputedStyle(list).columnGap) || 0)
      const index = Math.round(list.scrollLeft / step)
      const next = (index + 1) % entries.length
      const card = list.children.item(next) as HTMLElement | null
      if (card) {
        list.scrollTo({
          left: card.offsetLeft - first.offsetLeft,
          behavior: next === 0 ? 'auto' : 'smooth',
        })
      }
      resumeAt.current = now + 8000
    }, 500)
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
    }
  }, [entries.length, paused])

  function goTo(index: number) {
    resumeAt.current = performance.now() + 8000
    const list = rail.current
    if (!list) return
    const target = Math.max(
      0,
      Math.min(entries.length - position.visible, index),
    )
    const card = list.children.item(target) as HTMLElement | null
    const first = list.children.item(0) as HTMLElement | null
    if (!card || !first) return
    list.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  function finishDrag() {
    const list = rail.current
    if (!list || !drag.current) return
    drag.current = null
    delete list.dataset.dragging
    const first = list.children.item(0)
    if (!first) return
    const step =
      first.getBoundingClientRect().width +
      (parseFloat(getComputedStyle(list).columnGap) || 0)
    if (step) goTo(Math.round(list.scrollLeft / step))
  }

  if (!entries.length) return null
  const hasMore = entries.length > position.visible
  return (
    <div
      ref={region}
      className="trust-testimonial-carousel"
      role="region"
      aria-label="Testimonios de clientes"
      aria-roledescription="carrusel"
    >
      <div className="trust-testimonial-controls">
        <p aria-live={paused ? 'polite' : 'off'} aria-atomic="true">
          {position.index + 1}
          {position.visible > 1
            ? '–' + Math.min(entries.length, position.index + position.visible)
            : ''}{' '}
          de {entries.length}
          <span className="sr-only"> testimonios</span>
        </p>
        {hasMore && (
          <button
            className="trust-testimonial-toggle"
            type="button"
            aria-controls={railId}
            aria-label={paused ? 'Reanudar testimonios' : 'Pausar testimonios'}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
        )}
      </div>
      <p id={hintId} className="sr-only">
        Desliza para leer más testimonios. Usa las flechas del teclado, Inicio o
        Fin para recorrerlos.
      </p>
      <ul
        ref={rail}
        id={railId}
        className="trust-testimonials"
        tabIndex={hasMore ? 0 : undefined}
        aria-describedby={hintId}
        onScroll={measure}
        onTouchStart={() => {
          resumeAt.current = Infinity
        }}
        onTouchEnd={() => {
          resumeAt.current = performance.now() + 8000
        }}
        onTouchCancel={() => {
          resumeAt.current = performance.now() + 8000
        }}
        onPointerDown={(event) => {
          if (!hasMore || event.pointerType !== 'mouse' || event.button !== 0)
            return
          event.preventDefault()
          drag.current = {
            x: event.clientX,
            left: event.currentTarget.scrollLeft,
          }
          event.currentTarget.dataset.dragging = 'true'
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (drag.current)
            event.currentTarget.scrollLeft =
              drag.current.left + drag.current.x - event.clientX
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
          )
            return
          const next =
            event.key === 'ArrowRight'
              ? position.index + 1
              : event.key === 'ArrowLeft'
                ? position.index - 1
                : event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? entries.length - 1
                    : null
          if (next !== null) {
            event.preventDefault()
            goTo(next)
          }
        }}
      >
        {entries.map((item, index) => (
          <li
            key={item.id}
            data-active={index === position.index ? 'true' : undefined}
            aria-label={'Testimonio ' + (index + 1) + ' de ' + entries.length}
          >
            <figure className="trust-testimonial">
              <div className="trust-testimonial-body">
                <blockquote className="trust-testimonial-bubble">
                  <span className="trust-testimonial-quote" aria-hidden="true">
                    “
                  </span>
                  {draft && (
                    <p className="trust-testimonial-draft">
                      Texto provisional · {index + 1}
                    </p>
                  )}
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="trust-testimonial-author">
                    {item.author}
                  </span>
                  {item.role && <span>{item.role}</span>}
                  <span>{item.organization}</span>
                </figcaption>
              </div>
            </figure>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div
          className="trust-testimonial-pagination"
          role="group"
          aria-label="Elegir testimonio"
        >
          <button
            type="button"
            className="trust-testimonial-arrow"
            aria-label="Testimonio anterior"
            aria-controls={railId}
            onClick={() =>
              goTo((position.index - 1 + entries.length) % entries.length)
            }
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <div className="trust-testimonial-dots">
            {entries.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="trust-testimonial-dot"
                aria-label={'Ir al testimonio ' + (index + 1)}
                aria-pressed={index === position.index}
                aria-controls={railId}
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="trust-testimonial-arrow"
            aria-label="Testimonio siguiente"
            aria-controls={railId}
            onClick={() => goTo((position.index + 1) % entries.length)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
