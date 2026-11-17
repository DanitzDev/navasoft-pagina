import { isIP } from 'node:net'
import { getRequestHeader, getRequestIP } from '@tanstack/react-start/server'

export function canonicalizeIp(value: string | undefined) {
  if (!value) return undefined
  if (value.includes('%')) return undefined
  // Una IP debe tener una sola representación para que no eluda el limitador.
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

  // IPv4 puede llegar como IPv4-mapped IPv6; contarla igual evita eludir el límite.
  if (
    groups.length === 8 &&
    groups.slice(0, 5).every((part) => part === '0') &&
    groups[5] === 'ffff'
  ) {
    const high = Number.parseInt(groups[6], 16)
    const low = Number.parseInt(groups[7], 16)
    return [high >> 8, high & 255, low >> 8, low & 255].join('.')
  }

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

function getIisNodeClientIp() {
  // IISNode agrega al final la IP del peer con su puerto; no aceptar entradas anteriores.
  const forwardedFor = getRequestHeader('x-forwarded-for')
  const lastEntry = forwardedFor?.split(',').at(-1)?.trim()
  if (!lastEntry) return undefined

  const bracketedIpv6 = lastEntry.match(/^\[([^\]]+)\](?::\d+)?$/)
  if (bracketedIpv6?.[1]) return canonicalizeIp(bracketedIpv6[1])

  const ipv4WithPort = lastEntry.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/)
  return canonicalizeIp(ipv4WithPort?.[1] ?? lastEntry)
}

export function getClientIp() {
  // Solo confiar en X-Forwarded-For cuando el proxy lo reemplaza y está autorizado.
  const value =
    process.env.ORDS_TRUST_X_FORWARDED_FOR === 'true'
      ? getIisNodeClientIp()
      : getRequestIP()
  return canonicalizeIp(value)
}
