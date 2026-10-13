import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/areas/$area')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/areas/$area"!</div>
}
