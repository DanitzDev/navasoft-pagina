import { createFileRoute, notFound } from '@tanstack/react-router'
import InnovationPage from '../components/sections/innovation/InnovationPage'
import SolutionsArea from '../components/sections/areas/SolutionsArea'
import { pageMeta } from '@/lib/page-meta'

// El catálogo define los únicos slugs públicos válidos para esta ruta.
const areas = [
  { slug: 'soluciones', title: 'Público y empresarial' },
  { slug: 'innovationlab', title: 'InnovationLab' },
]

export const Route = createFileRoute('/areas/$slug')({
  loader: ({ params }) => {
    const area = areas.find((item) => item.slug === params.slug)
    if (!area) throw notFound()
    return area
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug ?? 'soluciones'
    return pageMeta({
      title: `${loaderData?.title ?? 'Área'} · Navasoft Soluciones`,
      description:
        slug === 'soluciones'
          ? 'Soluciones a la medida para los sectores público y empresarial: modernización Oracle, integración de procesos, clientes y proyectos de Navasoft Soluciones.'
          : 'InnovationLab de Navasoft: exploramos IoT, inteligencia artificial y nube, desde una prueba de concepto hasta su integración con la operación.',
      path: `/areas/${slug}`,
    })
  },
  component: AreaPage,
})

function AreaPage() {
  const area = Route.useLoaderData()

  if (area.slug === 'soluciones') {
    return <SolutionsArea />
  }

  return <InnovationPage />
}
