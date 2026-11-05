import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Clock3, Ticket } from 'lucide-react'
import { Container } from '../components/ui/Container'
import './soporte.css'

const ticketPortal = 'https://navasoftuno.com/ords/sarem/r/cliente-sarem/login'

const incidentSteps = [
  {
    title: 'Ten a mano tu acceso',
    description:
      'Usa las credenciales que recibió la persona autorizada por tu organización al contratar el servicio.',
  },
  {
    title: 'Describe lo que ocurrió',
    description:
      'Indica el sistema afectado, cuándo ocurrió, cómo reproducir el problema y qué parte de la operación afecta. Si adjuntas una captura, oculta los datos sensibles.',
  },
  {
    title: 'Da seguimiento al ticket',
    description:
      'Conserva el número del ticket para consultar el caso y aportar información adicional si el equipo de soporte la solicita.',
  },
]

export const Route = createFileRoute('/soporte')({
  head: () => ({
    meta: [
      { title: 'Soporte a clientes · Navasoft Soluciones' },
      {
        name: 'description',
        content:
          'Accede al portal de tickets de Navasoft, consulta el horario de soporte y prepara tu reporte de incidente.',
      },
    ],
  }),
  component: SupportPage,
})

function SupportPage() {
  return (
    <div className="support-page">
      <Container
        as="section"
        className="support-hero"
        aria-labelledby="support-title"
      >
        <div className="support-intro">
          <h1 id="support-title">Soporte a clientes</h1>
          <p>
            Reporta incidentes de tus soluciones Navasoft y da seguimiento a tus
            casos desde el portal de soporte.
          </p>
          <div className="support-hours">
            <Clock3 size={21} aria-hidden="true" />
            <div>
              <h2>Horario de atención</h2>
              <p>Lunes a viernes, de 8:00 a. m. a 5:00 p. m.</p>
              <p>Hora de Costa Rica (UTC−6)</p>
            </div>
          </div>
        </div>

        <section
          className="support-portal"
          aria-labelledby="support-portal-title"
        >
          <Ticket size={32} strokeWidth={1.6} aria-hidden="true" />
          <h2 id="support-portal-title">Portal de tickets</h2>
          <p>
            Si tu organización tiene un contrato de soporte vigente, ingresa con
            tu cuenta autorizada de SAREM para registrar un incidente.
          </p>
          <a
            href={ticketPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="support-portal-link"
          >
            Abrir portal de tickets
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (abre en una pestaña nueva)</span>
          </a>
          <p className="support-portal-note">
            Puedes registrar tickets fuera de horario. El equipo los atiende en
            el horario indicado.
          </p>
        </section>
      </Container>

      <Container
        as="section"
        className="support-guide"
        aria-labelledby="support-guide-title"
      >
        <h2 id="support-guide-title">Cómo reportar un incidente</h2>
        <ol className="support-steps" role="list">
          {incidentSteps.map(({ title, description }, index) => (
            <li key={title}>
              <span className="support-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <Container
        as="section"
        className="support-commercial"
        aria-labelledby="support-commercial-title"
      >
        <div>
          <h2 id="support-commercial-title">
            ¿Necesitas un contrato de soporte?
          </h2>
          <p>
            Consulta con nuestro equipo comercial las opciones para tu
            organización.
          </p>
        </div>
        <Link to="/contacto" search={{ motivo: undefined }}>
          Contactar al equipo comercial
        </Link>
      </Container>
    </div>
  )
}
