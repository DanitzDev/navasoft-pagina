import type { Testimonial } from '../../../types/trust'

type TestimonialsProps = {
  items: readonly Testimonial[]
  showPlaceholder?: boolean
}

export function Testimonials({
  items,
  showPlaceholder = false,
}: TestimonialsProps) {
  if (!items.length && !showPlaceholder) return null

  return (
    <ul className="trust-testimonials">
      {items.length
        ? items.map((item) => (
            <li key={item.id}>
              <figure className="trust-testimonial">
                <blockquote className="trust-testimonial-bubble">
                  <span className="trust-testimonial-quote" aria-hidden="true">
                    “
                  </span>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="trust-testimonial-author">
                    {item.author}
                  </span>
                  {item.role && <span>{item.role}</span>}
                  <span>{item.organization}</span>
                </figcaption>
              </figure>
            </li>
          ))
        : [0, 1].map((index) => (
            <li key={index}>
              {/* Vista de desarrollo: no atribuye recomendaciones a personas reales. */}
              <div className="trust-testimonial">
                <div className="trust-testimonial-bubble">
                  <span className="trust-testimonial-quote" aria-hidden="true">
                    “
                  </span>
                  <p className="trust-testimonial-draft">Texto provisional</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="trust-testimonial-caption">
                  <span className="trust-testimonial-author">
                    Nombre por confirmar
                  </span>
                  <span>Cargo y empresa por confirmar</span>
                </div>
              </div>
            </li>
          ))}
    </ul>
  )
}
