import PageHeader from '../components/shared/page-header/PageHeader'
import { createFileRoute, notFound } from '@tanstack/react-router'

// Se mantienen los destinos que ya utilizan el Navbar y el Footer.
const areas = [
  { slug: 'gobierno', title: 'Gobierno' },
  { slug: 'privado', title: 'Empresas' },
  { slug: 'navalav', title: 'Innovación' },
]

export const Route = createFileRoute('/areas/$slug')({
  // El parámetro solo acepta las tres áreas definidas, no cualquier URL.
  loader: ({ params }) => {
    const area = areas.find((item) => item.slug === params.slug)
    if (!area) throw notFound()
    return area
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? 'Área'} · Navasoft Soluciones` }],
  }),
  component: AreaPage,
})

function AreaPage() {
  const area = Route.useLoaderData()

  // TODO: incorporar el contenido aprobado de esta área.
  return (
    <PageHeader
      title={area.title}
      description="La información de esta área estará disponible próximamente."
    />
  )
}
