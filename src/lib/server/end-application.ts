import { createServerFn } from '@tanstack/react-start'
import { handleApplicationSubmission } from './application/endpoint.server'

export const submitApplication = createServerFn({ method: 'POST' })
  .validator((input: FormData) => input)
  .handler(({ data }) => handleApplicationSubmission(data))
