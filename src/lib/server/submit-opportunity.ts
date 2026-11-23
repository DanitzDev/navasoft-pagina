import { createServerFn } from '@tanstack/react-start'
import { handleOpportunitySubmission } from './opportunities/endpoint.server'

// El archivo viaja en Base64 desde el navegador; la validación y el envío ocurren en Node.
export const submitOpportunity = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input)
  .handler(({ data }) => handleOpportunitySubmission(data))
