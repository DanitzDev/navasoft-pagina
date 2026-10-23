import PageHeader from '../components/shared/page-header/PageHeader'
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

  // TODO: integrar el formulario de contacto cuando esté disponible.
  return (
    <PageHeader
      title={title}
      description="El formulario de contacto estará disponible próximamente."
    />
  )
}
