import PageHeader from '../components/shared/page-header/PageHeader'
import { ButtonLink } from '../components/ui/Button'
import { createFileRoute, notFound } from '@tanstack/react-router'
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
    meta: [
      { title: `${loaderData?.label ?? 'Sector'} · Navasoft Soluciones` },
      ...(loaderData
        ? [{ name: 'description', content: loaderData.description }]
        : []),
    ],
  }),
  component: SectorPage,
})

function SectorPage() {
  const sector = Route.useLoaderData()

  return (
    <PageHeader title={sector.label} description={sector.description}>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink to="/contacto" search={{ motivo: 'reunion' }}>
          Solicitar una reunión
        </ButtonLink>
        <ButtonLink to="/casos-de-exito" variant="outline">
          Ver casos de éxito
        </ButtonLink>
      </div>
    </PageHeader>
  )
}
