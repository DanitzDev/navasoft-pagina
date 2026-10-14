import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/soporte')({
  head: () => ({ meta: [{ title: 'Soporte · Navasoft Soluciones' }] }),
  component: SupportPage,
})

function SupportPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* TODO: integrar SectionTitle compartido y el contenido aprobado. */}
      <h1 className="text-3xl font-bold sm:text-4xl">Soporte</h1>
      <p className="mt-4 text-lg">
        El contenido de esta página estará disponible próximamente.
      </p>
    </section>
  )
}
