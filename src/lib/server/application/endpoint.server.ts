import { createHash, randomBytes } from 'node:crypto'
import { getRequestIP } from '@tanstack/react-start/server'
import { createContactLimiter } from '../contact/limiter.server'
import { processApplication } from './service.server'
import {
  developmentApplicationSimulation,
  unconfiguredApplicationTransport,
} from './transport.server'

const limiter = createContactLimiter(3)
const salt = randomBytes(32)

export function handleApplicationSubmission(input: unknown) {
  const identity =
    getRequestIP({ xForwardedFor: false }) ?? 'shared-unknown-peer'
  const key = createHash('sha256').update(salt).update(identity).digest('hex')
  return processApplication(input, {
    consume: () => limiter.consume(key),
    transport:
      process.env.NODE_ENV === 'development'
        ? developmentApplicationSimulation
        : unconfiguredApplicationTransport,
  })
}
