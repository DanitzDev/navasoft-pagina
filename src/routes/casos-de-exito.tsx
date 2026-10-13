import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/casos-de-exito')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/casos-de-exito"!</div>
}