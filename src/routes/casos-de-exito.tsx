import { SectionTitle } from '../components/ui/SectionTitle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/casos-de-exito')({
  head: () => ({ meta: [{ title: 'Casos de éxito · Navasoft Soluciones' }] }),
  component: SuccessCasesPage,
})

function SuccessCasesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* TODO: incorporar el contenido aprobado de esta página. */}
      <SectionTitle as="h1" title="Casos de éxito" />
      <p className="mt-4 text-lg">
        El contenido de esta página estará disponible próximamente.
      </p>
    </section>
  )
}
