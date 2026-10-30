import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Container } from '../components/ui/Container'
import { SectionTitle } from '../components/ui/SectionTitle'
import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import { clientDirectory } from '../data/client-directory'
import { contactBanner } from '../data/site'
import '../components/sections/clients/Clients.css'

export const Route = createFileRoute('/clientes')({
  head: () => ({
    meta: [
      { title: 'Clientes · Navasoft Soluciones' },
      {
        name: 'description',
        content:
          'Conoce algunos de los clientes que forman parte de la trayectoria de Navasoft Soluciones.',
      },
    ],
  }),
  component: ClientsPage,
})

const sortedClients = [...clientDirectory].sort((a, b) =>
  a.name.localeCompare(b.name, 'es'),
)

function ClientsPage() {
  return (
    <>
      <Container
        as="section"
        className="clients-page"
        aria-label="Clientes de Navasoft"
      >
        <Link to="/" hash="clientes-destacados" className="clients-back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al inicio
        </Link>
        <div className="clients-page-heading">
          <SectionTitle
            as="h1"
            title="Nuestros clientes"
            description="Conoce las organizaciones que forman parte de la trayectoria de Navasoft Soluciones."
          />
        </div>
        <div className="clients-toolbar">
          <div className="clients-directory-heading">
            <h2 id="clients-directory-title">Directorio de clientes</h2>
            <p>{sortedClients.length} organizaciones</p>
          </div>
        </div>
        <ul
          className="clients-directory"
          id="clients-directory"
          aria-labelledby="clients-directory-title"
        >
          {sortedClients.map((client) => (
            <li key={client.id}>
              <article
                className={
                  client.image
                    ? 'client-reference'
                    : 'client-reference client-reference--text'
                }
              >
                {client.image && (
                  <div className="client-reference-logo">
                    <img
                      src={client.image}
                      alt=""
                      width="200"
                      height="120"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3>{client.name}</h3>
              </article>
            </li>
          ))}
        </ul>
      </Container>
      <InstitutionalBanner {...contactBanner} showDemo={false} />
    </>
  )
}
