import PageHeader from '../components/shared/page-header/PageHeader'
import { createFileRoute, Link } from '@tanstack/react-router'
import { footerSocialLinks } from '../data/site'

export const Route = createFileRoute('/oportunidades')({
  head: () => ({ meta: [{ title: 'Oportunidades · Navasoft Soluciones' }] }),
  component: OpportunitiesPage,
})

function OpportunitiesPage() {
  const linkedIn = footerSocialLinks.find(
    ({ network }) => network === 'linkedin',
  )

  return (
    <PageHeader
      title="Oportunidades"
      description="Conoce a Navasoft Soluciones y sigue las novedades de nuestro equipo."
    >
      <ul className="mt-6 space-y-3">
        {linkedIn && (
          <li>
            <a href={linkedIn.href} className="underline underline-offset-4">
              Seguir a Navasoft en LinkedIn
            </a>
          </li>
        )}
        <li>
          <Link to="/nosotros" className="underline underline-offset-4">
            Conocer nuestro equipo y trayectoria
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            search={{ motivo: undefined }}
            className="underline underline-offset-4"
          >
            Consultar por oportunidades
          </Link>
        </li>
      </ul>
    </PageHeader>
  )
}
