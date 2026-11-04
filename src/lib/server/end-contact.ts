import { createServerFn } from '@tanstack/react-start'
import { handleContactSubmission } from './contact/endpoint.server'

export const submitContact = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input)
  .handler(({ data }) => handleContactSubmission(data))
