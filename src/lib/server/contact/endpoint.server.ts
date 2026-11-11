import { isIP } from 'node:net'
import { getRequestIP } from '@tanstack/react-start/server'
import { createHash, randomBytes } from 'node:crypto'
import { processContact } from './service.server'
import { createContactLimiter } from './limiter.server'
import { ordsContactTransport, unconfiguredCrmTransport } from './crm.server'
import { developmentContactSimulation } from './simulation.server'

// Límite por proceso: si el hosting ejecuta varias instancias, hace falta un almacén compartido.
const limiter = createContactLimiter(5, 60_000)
const salt = randomBytes(32)

function canonicalizeIp(value: string | undefined) {
  if (!value) return undefined
  // Normalizar evita que una misma dirección cree claves de límite distintas.
  const version = isIP(value)
  if (version === 4)
    return value
      .split('.')
      .map((part) => String(Number(part)))
      .join('.')
  if (version !== 6) return undefined

  let address = value.toLowerCase()
  if (address.includes('.')) {
    // Convertir la parte IPv4 de una IPv6 mixta a sus dos grupos hexadecimales.
    const splitAt = address.lastIndexOf(':')
    const ipv4 = address.slice(splitAt + 1)
    const octets = ipv4.split('.').map(Number)
    const first = ((octets[0] ?? 0) << 8) | (octets[1] ?? 0)
    const second = ((octets[2] ?? 0) << 8) | (octets[3] ?? 0)
    address = `${address.slice(0, splitAt + 1)}${first.toString(16)}:${second.toString(16)}`
  }
  const [leftText = '', rightText = ''] = address.split('::')
  const left = leftText ? leftText.split(':') : []
  const right = rightText ? rightText.split(':') : []
  const groups = [
    ...left,
    ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'),
    ...right,
  ].map((part) => Number.parseInt(part, 16).toString(16))

  // Comprimir el tramo más largo de ceros para obtener una forma IPv6 estable.
  let bestStart = -1
  let bestLength = 1
  for (let index = 0; index < groups.length;) {
    if (groups[index] !== '0') {
      index++
      continue
    }
    let end = index
    while (end < groups.length && groups[end] === '0') end++
    if (end - index > bestLength) {
      bestStart = index
      bestLength = end - index
    }
    index = end
  }
  if (bestStart < 0) return groups.join(':')
  const head = groups.slice(0, bestStart).join(':')
  const tail = groups.slice(bestStart + bestLength).join(':')
  return `${head}::${tail}`
}

export function handleContactSubmission(data: unknown) {
  // Solo confiar en X-Forwarded-For si el proxy del hosting lo sobrescribe y está autorizado.
  const trustForwardedFor = process.env.ORDS_TRUST_X_FORWARDED_FOR === 'true'
  const clientIp = canonicalizeIp(
    getRequestIP({ xForwardedFor: trustForwardedFor }),
  )
  const identity = clientIp ?? 'shared-unknown-peer'
  // El limitador usa un identificador opaco en vez de conservar la IP en sus claves.
  const key = createHash('sha256').update(salt).update(identity).digest('hex')
  const mode = process.env.CONTACT_DELIVERY_MODE
  const developmentTransport = developmentContactSimulation(
    process.env.NODE_ENV,
    mode,
  )
  return processContact(data, {
    consume: () => limiter.consume(key),
    clientIp,
    transport:
      // La simulación nunca se habilita en producción, aunque la variable exista.
      developmentTransport ??
      (process.env.NODE_ENV === 'development' && mode === 'disabled'
        ? unconfiguredCrmTransport
        : ordsContactTransport),
  })
}
