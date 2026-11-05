import { validateContact } from '../../validation/contact.ts'
import type { ContactResult } from '../../contact/result.ts'
import type { CrmTransport } from './crm.server.ts'

type Dependencies = {
  consume: () => { allowed: boolean; retryAfterSeconds: number }
  transport: CrmTransport
  timeoutMs?: number
}

export async function processContact(
  input: unknown,
  deps: Dependencies,
): Promise<ContactResult> {
  const allowance = deps.consume()
  if (!allowance.allowed)
    return {
      status: 'rate_limited',
      retryAfterSeconds: allowance.retryAfterSeconds,
    }
  if (typeof input !== 'object' || input === null || Array.isArray(input))
    return { status: 'rejected' }
  const website = (input as Record<string, unknown>).website
  if (website !== undefined && (typeof website !== 'string' || website !== ''))
    return { status: 'rejected' }
  const validation = validateContact(input)
  if (Object.keys(validation.errors).length)
    return { status: 'invalid', errors: validation.errors }
  // Solo campos reconocidos y normalizados; nunca URLs, tokens o destinatarios
  // procedentes del navegador. No se registran mensajes ni datos personales.
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      deps.transport.send(validation.data, controller.signal),
      new Promise<ContactResult>((resolve) => {
        timer = setTimeout(() => {
          controller.abort()
          resolve({ status: 'uncertain' })
        }, deps.timeoutMs ?? 10000)
      }),
    ])
  } catch {
    // El proveedor pudo aceptar la solicitud antes del fallo. Sin reintentos.
    return { status: 'uncertain' }
  } finally {
    clearTimeout(timer)
  }
}
