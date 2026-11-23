import { createServerFn } from '@tanstack/react-start'
import { handleContactSubmission } from './contact/endpoint.server'

// Único punto de entrada del navegador; su implementación y credenciales quedan en servidor.
export const submitContact = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input)
  .handler(({ data }) => handleContactSubmission(data))
