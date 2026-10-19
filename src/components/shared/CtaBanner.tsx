import { Container } from '../ui/Container'
import './CtaBanner.css'

type CtaBannerProps = {
  phrase?: string
  preview?: boolean
}

// El banner es solo de frase: no agrega botones ni texto institucional inventado.
export default function CtaBanner({ phrase, preview = false }: CtaBannerProps) {
  const content = phrase?.trim()
  if (!content && !preview) return null

  return (
    <section className="quote-banner" aria-label="Mensaje institucional">
      <Container className="max-w-6xl lg:px-6">
        {content ? (
          <p className="quote-banner-phrase">{content}</p>
        ) : (
          <div className="quote-banner-placeholder">
            <span className="sr-only">Frase institucional pendiente.</span>
            <div aria-hidden="true">
              <span />
              <span />
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
