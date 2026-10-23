import PageHeader from '../components/shared/page-header/PageHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/soporte')({
  head: () => ({ meta: [{ title: 'Soporte · Navasoft Soluciones' }] }),
  component: SupportPage,
})

function SupportPage() {
  // TODO: incorporar el contenido aprobado de esta página.
  return (
    <PageHeader
      title="Soporte"
      description="El contenido de esta página estará disponible próximamente."
    />
  )
}
