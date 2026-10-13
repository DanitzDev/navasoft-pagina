import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold">Navasoft Soluciones</h1>
      <p className="mt-4 text-lg">Tecnología que innova.</p>
    </section>
  )
}
