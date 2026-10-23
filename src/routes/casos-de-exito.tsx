import PageHeader from '../components/shared/page-header/PageHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/casos-de-exito')({
  head: () => ({ meta: [{ title: 'Casos de éxito · Navasoft Soluciones' }] }),
  component: SuccessCasesPage,
})

function SuccessCasesPage() {
  // TODO: incorporar el contenido aprobado de esta página.
  return (
    <PageHeader
      title="Casos de éxito"
      description="El contenido de esta página estará disponible próximamente."
    />
  )
}
