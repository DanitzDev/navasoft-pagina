import { processContact } from './service.server'
import { consumeContactAttempt } from './shared-limiter.server'
import { ordsContactTransport, unconfiguredCrmTransport } from './crm.server'
import { developmentContactSimulation } from './simulation.server'
import { getClientIp } from '../request-ip.server'

// Límite por proceso: si el hosting ejecuta varias instancias, hace falta un almacén compartido.
export function handleContactSubmission(data: unknown) {
  const clientIp = getClientIp()
  const identity = clientIp ?? 'shared-unknown-peer'
  // El limitador usa un identificador opaco en vez de conservar la IP en sus claves.
  const mode = process.env.CONTACT_DELIVERY_MODE
  const developmentTransport = developmentContactSimulation(
    process.env.NODE_ENV,
    mode,
  )
  return processContact(data, {
    consume: () => consumeContactAttempt(identity),
    clientIp,
    transport:
      // La simulación nunca se habilita en producción, aunque la variable exista.
      developmentTransport ??
      (process.env.NODE_ENV === 'development' && mode === 'disabled'
        ? unconfiguredCrmTransport
        : ordsContactTransport),
  })
}
