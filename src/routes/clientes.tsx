import { createFileRoute, redirect } from '@tanstack/react-router'

// Conserva enlaces anteriores sin mantener un directorio separado.
export const Route = createFileRoute('/clientes')({
  beforeLoad: () => {
    throw redirect({
      to: '/areas/$slug',
      params: { slug: 'soluciones' },
      hash: 'clientes',
      replace: true,
    })
  },
})
