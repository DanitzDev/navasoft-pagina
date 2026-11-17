import { consumeContactAttempt } from '../contact/shared-limiter.server'
import { sendOpportunityToOrds } from './ords.server'
import { getClientIp } from '../request-ip.server'

export async function handleOpportunitySubmission(input: unknown) {
  const ip = getClientIp()
  // Sin IP confiable agrupamos las solicitudes y no enviamos un encabezado inválido a ORDS.
  const identity = ip ?? 'shared-unknown-peer'
  const allowance = consumeContactAttempt(identity)
  if (!allowance.allowed)
    return {
      status: 'rate_limited' as const,
      retryAfterSeconds: allowance.retryAfterSeconds,
    }
  return sendOpportunityToOrds(input, ip)
}
