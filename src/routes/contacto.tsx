import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contacto')({
  // Los parámetros de URL son entrada externa: solo se admiten reunion y demo.
  // Un valor desconocido muestra Contacto sin condicionar el futuro formulario.
  validateSearch: (search: Record<string, unknown>) => ({
    motivo:
      search.motivo === 'reunion' || search.motivo === 'demo'
        ? search.motivo
        : undefined,
  }),
  head: () => ({ meta: [{ title: 'Contacto · Navasoft Soluciones' }] }),
  component: ContactPage,
})

function ContactPage() {
  const { motivo } = Route.useSearch()
  const title =
    motivo === 'reunion'
      ? 'Solicitar reunión'
      : motivo === 'demo'
        ? 'Pedir una demo'
        : 'Contacto'

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* TODO: integrar SectionTitle y el formulario de contacto compartidos. */}
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg">
        El formulario de contacto estará disponible próximamente.
      </p>
    </section>
  )
}
