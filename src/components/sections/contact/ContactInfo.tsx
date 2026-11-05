import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { siteContacts } from '@/data/site'

const icons = {
  phone: Phone,
  message: MessageCircle,
  email: Mail,
  location: MapPin,
}
const labels = {
  phone: 'Teléfono',
  message: 'WhatsApp',
  email: 'Correo comercial',
  location: 'Ubicación',
}

type ContactInfoProps = {
  showForm: boolean
  reason?: 'reunion' | 'demo'
}

export default function ContactInfo({ showForm, reason }: ContactInfoProps) {
  const subject =
    reason === 'reunion'
      ? 'Solicitar una reunión'
      : reason === 'demo'
        ? 'Solicitar una demostración'
        : undefined

  return (
    <aside className="contact-info" aria-labelledby="contact-info-title">
      <h2 id="contact-info-title">
        Una conversación, distintas formas de empezar.
      </h2>
      <p>
        {showForm
          ? 'Completa el formulario o elige el canal que te resulte más cómodo.'
          : 'Escríbenos por correo o WhatsApp, o llámanos para conversar.'}
      </p>
      <address>
        {siteContacts.map((contact) => {
          const Icon = icons[contact.kind]
          return (
            <div className="contact-channel" key={contact.kind}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <span>{labels[contact.kind]}</span>
                <a
                  href={
                    subject && contact.kind === 'email' && contact.href
                      ? `${contact.href}?subject=${encodeURIComponent(subject)}`
                      : contact.href
                  }
                  target={contact.openInNewTab ? '_blank' : undefined}
                  rel={contact.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  {contact.label}
                  {contact.openInNewTab && (
                    <span className="sr-only">
                      {' '}
                      (abre en una pestaña nueva)
                    </span>
                  )}
                </a>
              </div>
            </div>
          )
        })}
      </address>
    </aside>
  )
}
