import { ButtonLink } from '../../ui/Button'
import { Users, Handshake } from 'lucide-react'
import { Container } from '../../ui/Container'
import { SectionTitle } from '../../ui/SectionTitle'
import { LogoCarousel } from '../../shared/LogoCarousel'
import { Testimonials } from '../trust/Testimonials'
import { clients } from '../../../data/clients'
import { partners } from '../../../data/partners'
import { testimonials } from '../../../data/testimonials'
import '../trust/Trust.css'

export function TrustSection() {
  // Los marcadores sirven para revisar la estructura local, no para publicarlos.
  const showPlaceholders = import.meta.env.DEV
  const hasContent = clients.length || partners.length || testimonials.length
  if (!hasContent && !showPlaceholders) return null

  return (
    <section className="trust-section" aria-label="Clientes y partners">
      <Container>
        <div className="trust-layout">
          <SectionTitle
            eyebrow="Clientes y partners"
            title="Empresas que confían en nosotros"
            className="trust-heading"
            description="Trabajamos junto a aliados tecnológicos para ofrecer soluciones confiables y de alto impacto."
          />
          <div className="trust-groups">
            {(clients.length > 0 || showPlaceholders) && (
              <div
                className="trust-group trust-group--clients"
                id="clientes-destacados"
              >
                <div className="trust-group-heading">
                  <Users aria-hidden="true" />
                  <div>
                    <h3>Clientes destacados</h3>
                    <p>Organizaciones con las que colaboramos.</p>
                  </div>
                </div>
                <LogoCarousel
                  logos={clients}
                  label="Logos de clientes"
                  showPlaceholders={showPlaceholders}
                />
                <div className="trust-directory-link">
                  <ButtonLink to="/clientes" variant="outline">
                    Ver todos los clientes
                  </ButtonLink>
                </div>
              </div>
            )}
            {(partners.length > 0 || showPlaceholders) && (
              <div className="trust-group trust-group--partners">
                <div className="trust-group-heading">
                  <Handshake aria-hidden="true" />
                  <div>
                    <h3>Partners y afiliaciones</h3>
                    <p>
                      Alianzas que complementan nuestra experiencia tecnológica.
                    </p>
                  </div>
                </div>
                <LogoCarousel
                  logos={partners}
                  label="Logos de partners"
                  showPlaceholders={showPlaceholders}
                />
              </div>
            )}
          </div>
        </div>
        {(testimonials.length > 0 || showPlaceholders) && (
          <div className="trust-feedback">
            <h3>Testimonios</h3>
            <Testimonials
              items={testimonials}
              showPlaceholder={showPlaceholders}
            />
          </div>
        )}
      </Container>
    </section>
  )
}
