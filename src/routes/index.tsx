import Timeline from '../components/sections/about/Timeline'
import CtaBanner from '../components/shared/CtaBanner'
import { SectionTitle } from '../components/ui/SectionTitle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <SectionTitle as="h1" title="Navasoft Soluciones" />
        <p className="mt-4 text-lg">Tecnología que innova.</p>
      </section>
      {/* Vista de maquetación local; sin datos aprobados no se publica contenido. */}
      <Timeline preview={import.meta.env.DEV} />
      <CtaBanner preview={import.meta.env.DEV} />
    </>
  )
}
