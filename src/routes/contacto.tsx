import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/ui/Container'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactInfo from '@/components/sections/contact/ContactInfo'
import '@/components/sections/contact/Contact.css'

export const Route = createFileRoute('/contacto')({
  validateSearch: (
    search: Record<string, unknown>,
  ): { motivo: 'reunion' | 'demo' | undefined } => ({
    motivo:
      search.motivo === 'reunion' || search.motivo === 'demo'
        ? search.motivo
        : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: 'Contacto · Navasoft Soluciones',
      },
      {
        name: 'description',
        content:
          'Conversemos sobre tu próximo proyecto. Contacta con Navasoft Soluciones o solicita una reunión o una demo.',
      },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const { motivo } = Route.useSearch()
  const title =
    motivo === 'reunion'
      ? 'Solicitar reunión'
      : motivo === 'demo'
        ? 'Pedir una demo'
        : 'El próximo paso empieza conversando.'
  return (
    <section className="contact-page" aria-labelledby="contact-page-title">
      <div className="contact-hero">
        <img
          className="contact-hero-image"
          src="/images/area-empresarial.jpeg"
          alt=""
          width="1536"
          height="1024"
        />
        <Container>
          <div className="contact-hero-copy">
            <p className="contact-hero-label">Conversemos</p>
            <h1 id="contact-page-title">{title}</h1>
            <p>
              Cuéntanos qué necesita tu organización. Demos forma a una solución
              que acompañe su operación.
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="contact-layout">
          <ContactInfo />
          <ContactForm key={motivo ?? 'consulta'} initialReason={motivo} />
        </div>
      </Container>
    </section>
  )
}
