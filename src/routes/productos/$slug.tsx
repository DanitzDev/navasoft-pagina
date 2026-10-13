import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/productos/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/productos/slug"!</div>
}
