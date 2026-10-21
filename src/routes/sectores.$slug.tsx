import { SectionTitle } from '../components/ui/SectionTitle'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { sectors } from '../data/navigation'

export const Route = createFileRoute('/sectores/$slug')({
  // Los destinos del menú son también la lista de sectores permitidos.
  loader: ({ params }) => {
    const sector = sectors.find(
      (item) => item.href === `/sectores/${params.slug}`,
    )
    // Una dirección desconocida debe mostrar la página 404 del layout.
    if (!sector) throw notFound()
    return sector
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.label ?? 'Sector'} · Navasoft Soluciones` }],
  }),
  component: SectorPage,
})

function SectorPage() {
  const sector = Route.useLoaderData()

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle as="h1" title={sector.label} />
      {/* TODO: incorporar el contenido aprobado para este sector. */}
      <p className="mt-4 text-lg">
        La información de este sector estará disponible próximamente.
      </p>
      <Link to="/" className="mt-6 inline-block underline underline-offset-4">
        Volver al inicio
      </Link>
    </section>
  )
}
