import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import SolutionsArea from '../components/sections/areas/SolutionsArea'
import InnovationPage from '../components/sections/innovation/InnovationPage'
import { pageMeta } from '@/lib/page-meta'

// Una página reúne ambos sectores; las direcciones anteriores redirigen por ancla.
const areas = [
  { slug: 'soluciones', title: 'Público y empresarial' },
  { slug: 'innovationlab', title: 'InnovationLab' },
]

export const Route = createFileRoute('/areas/$slug')({
  beforeLoad: ({ params, location }) => {
    if (
      params.slug === 'innovation-lab' ||
      params.slug === 'navalav' ||
      params.slug === 'innovationlav'
    ) {
      throw redirect({
        to: '/areas/$slug',
        params: { slug: 'innovationlab' },
        replace: true,
      })
    }
    if (params.slug === 'privado' || params.slug === 'gobierno') {
      throw redirect({
        to: '/areas/$slug',
        params: { slug: 'soluciones' },
        hash:
          params.slug === 'gobierno'
            ? 'gobierno'
            : location.hash === 'clientes'
              ? 'clientes'
              : 'empresas',
        replace: true,
      })
    }
  },
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

  if (area.slug === 'soluciones') return <SolutionsArea />

  return <InnovationPage />
}
