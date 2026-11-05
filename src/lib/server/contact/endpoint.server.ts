import { getRequestIP } from '@tanstack/react-start/server'
import { createHash, randomBytes } from 'node:crypto'
import { processContact } from './service.server'
import { createContactLimiter } from './limiter.server'
import { unconfiguredCrmTransport } from './crm.server'
import { developmentContactSimulation } from './simulation.server'

const limiter = createContactLimiter()
const salt = randomBytes(32)

export function handleContactSubmission(data: unknown) {
  // No confiar en X-Forwarded-For hasta conocer la infraestructura de despliegue.
  const identity =
    getRequestIP({ xForwardedFor: false }) ?? 'shared-unknown-peer'
  const key = createHash('sha256').update(salt).update(identity).digest('hex')
  return processContact(data, {
    consume: () => limiter.consume(key),
    transport:
      developmentContactSimulation(
        process.env.NODE_ENV,
        process.env.CONTACT_DELIVERY_MODE,
      ) ?? unconfiguredCrmTransport,
  })
}
