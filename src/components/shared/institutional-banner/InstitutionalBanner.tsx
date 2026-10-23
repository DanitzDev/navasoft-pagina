import { Container } from '../../ui/Container'
import { SectionTitle } from '../../ui/SectionTitle'
import { ButtonLink } from '../../ui/Button'
import './InstitutionalBanner.css'

type InstitutionalBannerProps = {
  title: string
  description?: string
  eyebrow?: string
  showDemo?: boolean
}

// Cierre institucional reutilizable. Las acciones conservan los motivos de Contacto.
export default function InstitutionalBanner({
  title,
  description,
  eyebrow,
  showDemo = true,
}: InstitutionalBannerProps) {
  const content = title.trim()
  if (!content) return null

  return (
    <section className="institutional-banner" aria-label={content}>
      <Container className="max-w-6xl lg:px-6">
        <SectionTitle
          title={content}
          eyebrow={eyebrow?.trim()}
          description={description?.trim()}
          align="center"
          className="institutional-banner-heading max-w-none"
        />
        <div className="institutional-banner-actions">
          <ButtonLink
            to="/contacto"
            search={{ motivo: 'reunion' }}
            variant="primary"
            size="lg"
            className="institutional-banner-action font-semibold shadow-none"
          >
            Solicitar reunión
          </ButtonLink>
          {showDemo && (
            <ButtonLink
              to="/contacto"
              search={{ motivo: 'demo' }}
              variant="secondary"
              size="lg"
              className="institutional-banner-action bg-primary/80 font-semibold shadow-none hover:bg-primary hover:text-white"
            >
              Pedir una demo
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  )
}
