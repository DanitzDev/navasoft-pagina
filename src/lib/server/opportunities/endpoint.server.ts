import { consumeContactAttempt } from '../contact/shared-limiter.server'
import { sendOpportunityToOrds } from './ords.server'
import { getClientIp } from '../request-ip.server'

export async function handleOpportunitySubmission(input: unknown) {
  const ip = getClientIp()
  // Sin una IP confiable no se puede enviar la postulación a ORDS ni aplicar un límite por IP.
  if (!ip) return { status: 'unavailable' as const }

  const allowance = consumeContactAttempt(ip)
  if (!allowance.allowed)
    return {
      status: 'rate_limited' as const,
      retryAfterSeconds: allowance.retryAfterSeconds,
    }
  return sendOpportunityToOrds(input, ip)
}
