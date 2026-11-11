import type { ContactData } from '../../validation/contact.ts'
import type { DeliveryResult } from '../../contact/result.ts'
import { randomUUID } from 'node:crypto'

export type ContactTransportMetadata = {
  // La IP va a ORDS en el encabezado requerido por la integración.
  clientIp?: string
  // Se conserva aparte porque el número se envía sin prefijo internacional.
  phoneCountryCode: string
}

export interface CrmTransport {
  // Los transportes respetan la cancelación por timeout del servicio.
  send: (
    data: ContactData,
    signal: AbortSignal,
    metadata?: ContactTransportMetadata,
  ) => Promise<DeliveryResult>
}

export const unconfiguredCrmTransport: CrmTransport = {
  async send() {
    return { status: 'unavailable' }
  },
}

type OrdsConfig = {
  baseUrl: string
  clientId: string
  clientSecret: string
}

type TokenCache = {
  baseUrl: string
  clientId: string
  accessToken: string
  expiresAt: number
}

// CONSULTA_GENERAL sale en el ejemplo de ORDS; los otros códigos siguen las
// opciones locales y deben confirmarse en la aceptación con el equipo ORDS.
const ORDS_MOTIVES = {
  consulta: 'CONSULTA_GENERAL',
  reunion: 'SOLICITAR_REUNION',
  demo: 'SOLICITAR_DEMO',
} as const

let tokenCache: TokenCache | undefined

function getConfig(): OrdsConfig | undefined {
  // Las credenciales solo se leen del entorno del proceso Node; nunca del cliente.
  const baseUrl = process.env.ORDS_BASE_URL?.trim().replace(/\/+$/, '')
  const clientId = process.env.ORDS_CLIENT_ID?.trim()
  const clientSecret = process.env.ORDS_CLIENT_SECRET
  if (!baseUrl || !clientId || !clientSecret) return undefined
  try {
    const parsed = new URL(baseUrl)
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password)
      return undefined
  } catch {
    return undefined
  }
  return { baseUrl, clientId, clientSecret }
}

function requestId(response: Response) {
  return (
    response.headers.get('opc-request-id') ??
    response.headers.get('x-request-id') ??
    response.headers.get('x-correlation-id') ??
    undefined
  )
}

function logFailure(stage: string, response?: Response, error?: unknown) {
  // Mantener los registros útiles para soporte sin guardar mensajes ni secretos.
  console.error(
    JSON.stringify({
      event: 'ords_contact_failure',
      trackingId: response
        ? (requestId(response) ?? randomUUID())
        : randomUUID(),
      stage,
      httpStatus: response?.status,
      requestId: response ? requestId(response) : undefined,
      errorName: error instanceof Error ? error.name : undefined,
    }),
  )
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return undefined
  }
}

async function fetchToken(
  config: OrdsConfig,
  signal: AbortSignal,
): Promise<{ token?: string; result?: DeliveryResult }> {
  const authorization = Buffer.from(
    `${config.clientId}:${config.clientSecret}`,
    'utf8',
  ).toString('base64')
  let response: Response
  try {
    response = await fetch(`${config.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authorization}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      signal,
    })
  } catch (error) {
    logFailure('token_request', undefined, error)
    return { result: { status: 'failed' } }
  }

  if (!response.ok) {
    logFailure('token_response', response)
    return { result: { status: 'failed' } }
  }
  const body = await readJson(response)
  const tokenType =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>).token_type
      : undefined
  const accessToken =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>).access_token
      : undefined
  const expiresIn =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>).expires_in
      : undefined
  if (
    typeof accessToken !== 'string' ||
    typeof tokenType !== 'string' ||
    tokenType.toLowerCase() !== 'bearer' ||
    typeof expiresIn !== 'number' ||
    expiresIn <= 0
  ) {
    logFailure('token_payload', response)
    return { result: { status: 'failed' } }
  }

  tokenCache = {
    baseUrl: config.baseUrl,
    clientId: config.clientId,
    accessToken,
    // Renovar con 30 s de margen para evitar usar un token al borde del vencimiento.
    expiresAt: Date.now() + Math.max(1000, expiresIn * 1000 - 30_000),
  }
  return { token: accessToken }
}

async function getToken(
  config: OrdsConfig,
  signal: AbortSignal,
  forceRefresh = false,
): Promise<{ token?: string; result?: DeliveryResult }> {
  // El token se comparte solo para el mismo endpoint y cliente; 401 fuerza renovación.
  if (
    !forceRefresh &&
    tokenCache &&
    tokenCache.baseUrl === config.baseUrl &&
    tokenCache.clientId === config.clientId &&
    tokenCache.expiresAt > Date.now()
  )
    return { token: tokenCache.accessToken }
  return fetchToken(config, signal)
}

function retryAfterSeconds(response: Response) {
  const value = Number(response.headers.get('retry-after'))
  return Number.isFinite(value) && value > 0 ? Math.ceil(value) : 60
}

function phoneParts(data: ContactData, countryCode: string) {
  if (!data.phone) return undefined
  // ORDS recibe el código y el número nacional en campos distintos.
  const national = data.phone.startsWith(countryCode)
    ? data.phone.slice(countryCode.length).trim()
    : ''
  return {
    codigo_pais_celular: countryCode,
    numero_celular: national.replace(/\D/g, ''),
  }
}

async function sendMessage(
  config: OrdsConfig,
  accessToken: string,
  data: ContactData,
  signal: AbortSignal,
  metadata: ContactTransportMetadata & { clientIp: string },
): Promise<Response> {
  const phone = phoneParts(data, metadata.phoneCountryCode)
  const reason = ORDS_MOTIVES[data.reason as keyof typeof ORDS_MOTIVES]
  // Este objeto adapta los nombres del formulario al contrato JSON de ORDS.
  // Los campos opcionales se omiten cuando el usuario no los proporcionó.
  const payload = {
    nombre_completo: data.name,
    correo_electronico: data.email,
    ...(data.organization ? { organizacion: data.organization } : {}),
    ...(phone ?? {}),
    motivo_contacto: reason,
    mensaje: data.message,
    autoriza_contacto: data.consent,
  }
  return fetch(`${config.baseUrl}/contacto/mensajes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Navasoft-Client-IP': metadata.clientIp,
    },
    body: JSON.stringify(payload),
    signal,
  })
}

export const ordsContactTransport: CrmTransport = {
  async send(data, signal, metadata) {
    const config = getConfig()
    const clientIp = metadata?.clientIp
    if (!config || !metadata || !clientIp) return { status: 'unavailable' }
    const requestMetadata = { ...metadata, clientIp }

    let token = await getToken(config, signal)
    if (!token.token) return token.result ?? { status: 'failed' }

    let response: Response
    try {
      response = await sendMessage(
        config,
        token.token,
        data,
        signal,
        requestMetadata,
      )
    } catch (error) {
      logFailure('message_request', undefined, error)
      return { status: 'uncertain' }
    }

    if (response.status === 401) {
      // El token pudo expirar entre la validación local y la llamada a ORDS.
      // Se renueva y reintenta una sola vez; otros fallos no se reenvían a ciegas.
      if (tokenCache?.accessToken === token.token) tokenCache = undefined
      token = await getToken(config, signal, true)
      if (!token.token) return token.result ?? { status: 'failed' }
      try {
        response = await sendMessage(
          config,
          token.token,
          data,
          signal,
          requestMetadata,
        )
      } catch (error) {
        logFailure('message_retry', undefined, error)
        return { status: 'uncertain' }
      }
    }

    if (response.status === 201 || response.status === 200) {
      const body = await readJson(response)
      const result =
        typeof body === 'object' && body !== null
          ? (body as Record<string, unknown>).resultado
          : undefined
      if (
        (response.status === 201 && result === 'creado') ||
        (response.status === 200 && result === 'ya_recibido')
      )
        return { status: 'sent' }
      // El código HTTP por sí solo no confirma que ORDS registró el mensaje.
      logFailure('message_payload', response)
      return { status: 'failed' }
    }
    if (response.status === 422) {
      // ORDS rechazó los campos aunque la validación local los hubiera aceptado.
      logFailure('message_validation', response)
      return { status: 'remote_invalid' }
    }
    if (response.status === 429) {
      // Propagar la espera indicada por ORDS para que la interfaz pueda mostrarla.
      return {
        status: 'rate_limited',
        retryAfterSeconds: retryAfterSeconds(response),
      }
    }
    logFailure('message_response', response)
    return { status: 'failed' }
  },
}
