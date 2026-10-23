import PageHeader from '../components/shared/page-header/PageHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/oportunidades')({
  head: () => ({ meta: [{ title: 'Oportunidades · Navasoft Soluciones' }] }),
  component: OpportunitiesPage,
})

function OpportunitiesPage() {
  // TODO: incorporar el contenido aprobado de esta página.
  return (
    <PageHeader
      title="Oportunidades"
      description="El contenido de esta página estará disponible próximamente."
    />
  )
}
