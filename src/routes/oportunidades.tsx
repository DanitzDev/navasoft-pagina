import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/oportunidades')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/oportunidades"!</div>
}
