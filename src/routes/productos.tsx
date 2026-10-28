import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/productos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/productos"!</div>
}
