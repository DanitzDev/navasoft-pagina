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

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* TODO: integrar SectionTitle compartido y el contenido de esta área. */}
      <h1 className="text-3xl font-bold sm:text-4xl">{area.title}</h1>
      <p className="mt-4 text-lg">
        La información de esta área estará disponible próximamente.
      </p>
    </section>
  )
}
