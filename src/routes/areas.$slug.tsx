import PageHeader from '../components/shared/page-header/PageHeader'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import SolutionsArea from '../components/sections/areas/SolutionsArea'

// Una página reúne ambos sectores; las direcciones anteriores redirigen por ancla.
const areas = [
  { slug: 'soluciones', title: 'Gobierno y Empresas' },
  { slug: 'navalav', title: 'Innovación' },
]

export const Route = createFileRoute('/areas/$slug')({
  beforeLoad: ({ params, location }) => {
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
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'Área'} · Navasoft Soluciones` },
      ...(loaderData?.slug === 'soluciones'
        ? [
            {
              name: 'description',
              content:
                'Soluciones a la medida para Gobierno y Empresas: modernización Oracle, integración de procesos, clientes y proyectos de Navasoft Soluciones.',
            },
          ]
        : []),
    ],
  }),
  component: AreaPage,
})

function AreaPage() {
  const area = Route.useLoaderData()

  if (area.slug === 'soluciones') return <SolutionsArea />

  // TODO: incorporar el contenido aprobado de esta área.
  return (
    <PageHeader
      title={area.title}
      description="La información de esta área estará disponible próximamente."
    />
  )
}
