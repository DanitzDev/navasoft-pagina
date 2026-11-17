import { createHash, randomBytes } from 'node:crypto'
import { createContactLimiter } from './limiter.server.ts'

// Contacto y oportunidades comparten el cupo definido por ORDS.
export const CONTACT_ATTEMPT_LIMIT = 5
export const CONTACT_ATTEMPT_WINDOW_MS = 60_000
const limiter = createContactLimiter(
  CONTACT_ATTEMPT_LIMIT,
  CONTACT_ATTEMPT_WINDOW_MS,
)
const salt = randomBytes(32)

export function consumeContactAttempt(identity: string) {
  // El hash permite limitar por la misma IP sin conservarla como clave del mapa en memoria.
  const key = createHash('sha256').update(salt).update(identity).digest('hex')
  return limiter.consume(key)
}
