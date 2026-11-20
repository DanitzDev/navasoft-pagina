import { inflateRawSync } from 'node:zlib'
import { areas } from '../../../data/opportunities.ts'

/* eslint-disable no-control-regex */
const unsafeFileName = /[\\/\x00-\x1f]/
const singleLineControls = /[\u0000-\u001f\u007f]/
const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
/* eslint-enable no-control-regex */

const MAX_BYTES = 5 * 1024 * 1024
const MAX_BASE64_CHARS = Math.ceil(MAX_BYTES / 3) * 4
// El Base64 añade cerca de un tercio al archivo; el límite también cubre el resto del JSON.
const MAX_BODY_CHARS = 8_388_608
// Estos códigos adaptan las opciones visuales a ORDS; confirmar el catálogo con el equipo API.
const areaCodes: Record<string, string> = {
  desarrollo: 'DESARROLLO',
  calidad: 'CALIDAD',
  infraestructura: 'INFRAESTRUCTURA',
  innovation: 'INNOVATION',
  comercial: 'COMERCIAL',
  administracion: 'ADMINISTRACION',
}
const profileCodes = {
  profesional: 'PROFESIONAL',
  practicante: 'PRACTICANTE',
} as const
const mimeByExtension: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx':
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

type Fields = {
  nombre: string
  correo: string
  telefono: string
  enlace: string
  presentacion: string
  perfil: string
  area: string
  consentimiento: boolean
  curriculumNombre: string
  curriculumMime: string
  curriculumBase64: string
}
type Result = {
  status:
    'sent' | 'unavailable' | 'failed' | 'uncertain' | 'invalid' | 'rate_limited'
  errors?: Record<string, string>
  retryAfterSeconds?: number
}
type Cache = {
  baseUrl: string
  clientId: string
  token: string
  expiresAt: number
}
type OrdsConfig = {
  baseUrl: string
  clientId: string
  secret: string
}
let tokenCache: Cache | undefined

function getOrdsConfig(): OrdsConfig | undefined {
  const baseUrl = process.env.ORDS_BASE_URL?.trim().replace(/\/+$/, '')
  const clientId = process.env.ORDS_CLIENT_ID?.trim()
  const secret = process.env.ORDS_CLIENT_SECRET
  if (!baseUrl || !clientId || !secret?.trim()) return undefined
  try {
    const parsedBaseUrl = new URL(baseUrl)
    // Nunca enviar ID, secreto o Bearer token a un endpoint sin TLS o con credenciales embebidas.
    if (
      parsedBaseUrl.protocol !== 'https:' ||
      parsedBaseUrl.username ||
      parsedBaseUrl.password ||
      parsedBaseUrl.search ||
      parsedBaseUrl.hash
    )
      return undefined
  } catch {
    return undefined
  }
  return { baseUrl, clientId, secret }
}

function parseZipHasDocument(bytes: Buffer) {
  // DOCX es ZIP. Acotar tamaños y rangos evita descompresiones o lecturas arbitrarias.
  try {
    const start = Math.max(0, bytes.length - 65_557)
    let eocd = -1
    for (let i = bytes.length - 22; i >= start; i--)
      if (bytes.readUInt32LE(i) === 0x06054b50) {
        eocd = i
        break
      }
    if (eocd < 0 || eocd + 22 > bytes.length) return false
    const count = bytes.readUInt16LE(eocd + 10)
    let offset = bytes.readUInt32LE(eocd + 16)
    for (let i = 0; i < count; i++) {
      if (offset < 0 || offset + 46 > bytes.length) return false
      if (bytes.readUInt32LE(offset) !== 0x02014b50) return false
      const method = bytes.readUInt16LE(offset + 10)
      const compressedSize = bytes.readUInt32LE(offset + 20)
      const uncompressedSize = bytes.readUInt32LE(offset + 24)
      const nameLength = bytes.readUInt16LE(offset + 28)
      const extraLength = bytes.readUInt16LE(offset + 30)
      const commentLength = bytes.readUInt16LE(offset + 32)
      const localOffset = bytes.readUInt32LE(offset + 42)
      const entryEnd = offset + 46 + nameLength + extraLength + commentLength
      if (entryEnd > bytes.length) return false
      const name = bytes
        .subarray(offset + 46, offset + 46 + nameLength)
        .toString('utf8')
      if (name === 'word/document.xml') {
        if (
          uncompressedSize < 1 ||
          uncompressedSize > MAX_BYTES ||
          localOffset + 30 > bytes.length ||
          bytes.readUInt32LE(localOffset) !== 0x04034b50
        )
          return false
        const localName = bytes.readUInt16LE(localOffset + 26)
        const localExtra = bytes.readUInt16LE(localOffset + 28)
        const dataStart = localOffset + 30 + localName + localExtra
        if (dataStart + compressedSize > bytes.length) return false
        const compressed = bytes.subarray(dataStart, dataStart + compressedSize)
        const content =
          method === 0
            ? compressed
            : method === 8
              ? inflateRawSync(compressed, { maxOutputLength: MAX_BYTES })
              : undefined
        return Boolean(
          content &&
          content.length === uncompressedSize &&
          content.subarray(0, 256).toString('utf8').includes('<'),
        )
      }
      offset = entryEnd
    }
    return false
  } catch {
    return false
  }
}

function looksLikePdf(bytes: Buffer) {
  if (bytes.subarray(0, 5).toString() !== '%PDF-') return false
  // El marcador de cierre detecta archivos truncados o renombrados con solo un encabezado PDF.
  return bytes.subarray(Math.max(0, bytes.length - 1024)).includes('%%EOF')
}

function hasValidBase64Shape(value: string) {
  if (!value || value.length % 4 !== 0) return false
  const paddingLength = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0
  const contentLength = value.length - paddingLength

  // Iterar evita que una regex con grupos repetidos desborde la pila en archivos grandes.
  for (let index = 0; index < contentLength; index++) {
    const code = value.charCodeAt(index)
    const isAlphabet =
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      (code >= 48 && code <= 57) ||
      code === 43 ||
      code === 47
    if (!isAlphabet) return false
  }

  return true
}

export function validateOpportunitySubmission(input: unknown): {
  fields?: Fields
  bytes?: Buffer
  errors: Record<string, string>
} {
  // La Server Function también puede recibir llamadas fabricadas; validar aquí es obligatorio.
  const s =
    typeof input === 'object' && input !== null
      ? (input as Record<string, unknown>)
      : {}
  if (JSON.stringify(s).length > MAX_BODY_CHARS)
    return {
      errors: { curriculum: 'La solicitud excede el tamaño permitido.' },
    }
  const str = (key: keyof Fields) =>
    typeof s[key] === 'string' ? s[key].trim() : ''
  const fields: Fields = {
    nombre: str('nombre'),
    correo: str('correo').toLowerCase(),
    telefono: str('telefono'),
    enlace: str('enlace'),
    presentacion: str('presentacion'),
    perfil: str('perfil'),
    area: str('area'),
    consentimiento: s.consentimiento === true,
    curriculumNombre: str('curriculumNombre'),
    curriculumMime: str('curriculumMime'),
    curriculumBase64: str('curriculumBase64'),
  }
  const errors: Record<string, string> = {}
  if (
    fields.nombre.length < 1 ||
    fields.nombre.length > 200 ||
    singleLineControls.test(fields.nombre)
  )
    errors.nombre = 'Escriba su nombre, entre 1 y 200 caracteres.'
  if (
    fields.correo.length > 254 ||
    singleLineControls.test(fields.correo) ||
    !/^\S+@\S+\.\S+$/.test(fields.correo)
  )
    errors.correo = 'Escriba un correo válido.'
  const phoneDigits = fields.telefono.replace(/\D/g, '')
  if (
    fields.telefono.length > 30 ||
    !/^[\d ().-]+$/.test(fields.telefono) ||
    !/^\d{8}$/.test(phoneDigits)
  )
    errors.telefono = 'Escriba un teléfono válido de 8 dígitos.'
  let validProfileLink = true
  if (fields.enlace) {
    try {
      const parsedLink = new URL(fields.enlace)
      validProfileLink =
        (parsedLink.protocol === 'https:' || parsedLink.protocol === 'http:') &&
        Boolean(parsedLink.hostname) &&
        !parsedLink.username &&
        !parsedLink.password
    } catch {
      validProfileLink = false
    }
  }
  if (
    fields.enlace.length > 2000 ||
    singleLineControls.test(fields.enlace) ||
    !validProfileLink
  )
    errors.enlace = 'Escriba un enlace web válido (máximo 2000 caracteres).'
  if (
    fields.presentacion.length > 600 ||
    messageControls.test(fields.presentacion)
  )
    errors.presentacion = 'Use un máximo de 600 caracteres.'
  if (!Object.hasOwn(profileCodes, fields.perfil))
    errors.perfil = 'Seleccione un perfil.'
  if (
    !areas.some((a) => a.id === fields.area) ||
    !Object.hasOwn(areaCodes, fields.area)
  )
    errors.area = 'Seleccione un área.'
  if (!fields.consentimiento)
    errors.consentimiento = 'Debe autorizar la revisión del currículum.'
  const extension = fields.curriculumNombre
    .toLowerCase()
    .match(/\.(pdf|docx?|)$/)?.[0]
  const expectedMime = extension ? mimeByExtension[extension] : undefined
  if (
    !expectedMime ||
    fields.curriculumNombre.length > 255 ||
    unsafeFileName.test(fields.curriculumNombre)
  )
    errors.curriculum = 'Seleccione un archivo PDF o Word válido.'
  else if (fields.curriculumMime !== expectedMime)
    errors.curriculum = 'El formato del archivo no coincide con su extensión.'
  if (
    !fields.curriculumBase64 ||
    fields.curriculumBase64.length > MAX_BASE64_CHARS ||
    !hasValidBase64Shape(fields.curriculumBase64)
  )
    errors.curriculum =
      'No se pudo leer el currículum. Selecciónelo nuevamente.'
  let bytes: Buffer | undefined
  if (!errors.curriculum) {
    bytes = Buffer.from(fields.curriculumBase64, 'base64')
    if (bytes.length < 1 || bytes.length > MAX_BYTES)
      errors.curriculum = 'El archivo debe pesar entre 1 byte y 5 MB.'
    else {
      const valid =
        // La extensión y el MIME no prueban el contenido; comprobar firmas básicas antes de ORDS.
        extension === '.pdf'
          ? looksLikePdf(bytes)
          : extension === '.doc'
            ? bytes
                .subarray(0, 8)
                .equals(Buffer.from('d0cf11e0a1b11ae1', 'hex'))
            : parseZipHasDocument(bytes)
      if (!valid)
        errors.curriculum =
          'El archivo no parece ser un documento válido del formato seleccionado.'
    }
  }
  if (Object.keys(errors).length) return { errors }
  return { fields, bytes, errors }
}

async function getToken(
  baseUrl: string,
  clientId: string,
  secret: string,
  signal: AbortSignal,
  refresh = false,
) {
  if (
    !refresh &&
    tokenCache?.baseUrl === baseUrl &&
    tokenCache.clientId === clientId &&
    tokenCache.expiresAt > Date.now()
  )
    return tokenCache.token
  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    redirect: 'error',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    signal,
  })
  if (!response.ok) throw new Error(`oauth_${response.status}`)
  const data = (await response.json()) as {
    access_token?: unknown
    token_type?: unknown
    expires_in?: unknown
  }
  if (
    typeof data.access_token !== 'string' ||
    data.access_token.length === 0 ||
    typeof data.token_type !== 'string' ||
    data.token_type.toLowerCase() !== 'bearer' ||
    typeof data.expires_in !== 'number' ||
    !Number.isFinite(data.expires_in) ||
    data.expires_in <= 0
  )
    throw new Error('oauth_payload')
  tokenCache = {
    baseUrl,
    clientId,
    token: data.access_token,
    // Renovar con margen evita usar un token que expire entre esta consulta y el envío.
    expiresAt: Date.now() + Math.max(1000, data.expires_in * 1000 - 30_000),
  }
  return data.access_token
}

export async function sendOpportunityToOrds(
  input: unknown,
  ip?: string,
): Promise<Result> {
  let timer: ReturnType<typeof setTimeout> | undefined
  let controller: AbortController | undefined

  try {
    const { fields, bytes, errors } = validateOpportunitySubmission(input)
    if (!fields || !bytes) return { status: 'invalid', errors }

    const config = getOrdsConfig()
    if (!config || !ip) return { status: 'unavailable' }
    const { baseUrl, clientId, secret } = config
    controller = new AbortController()
    timer = setTimeout(() => controller?.abort(), 30_000)

    let token = await getToken(baseUrl, clientId, secret, controller.signal)

    const payload = {
      nombre_completo: fields.nombre,
      correo_electronico: fields.correo,
      codigo_pais_celular: '+506',
      numero_celular: fields.telefono.replace(/\D/g, ''),
      ...(fields.enlace ? { url_perfil: fields.enlace } : {}),
      perfil_candidato:
        profileCodes[fields.perfil as keyof typeof profileCodes],
      area_interes: areaCodes[fields.area],
      presentacion: fields.presentacion,
      curriculum_nombre: fields.curriculumNombre,
      curriculum_mime: fields.curriculumMime,
      curriculum_base64: fields.curriculumBase64,
      autoriza_reclutamiento: true,
    }
    const body = JSON.stringify(payload)

    let response = await fetch(`${baseUrl}/contacto/oportunidades`, {
      method: 'POST',
      redirect: 'error',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Navasoft-Client-IP': ip,
      },
      body,
      signal: controller.signal,
    })
    if (response.status === 401) {
      // ORDS rechazó el token; renovar y repetir solo una vez para evitar ciclos de reintentos.
      tokenCache = undefined
      token = await getToken(baseUrl, clientId, secret, controller.signal, true)
      response = await fetch(`${baseUrl}/contacto/oportunidades`, {
        method: 'POST',
        redirect: 'error',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Navasoft-Client-IP': ip,
        },
        body,
        signal: controller.signal,
      })
    }
    if (response.status === 201 || response.status === 200) {
      const data = (await response.json().catch(() => null)) as {
        resultado?: string
      } | null
      if (
        // Un HTTP exitoso sin el resultado esperado no confirma que la postulación quedó guardada.
        (response.status === 201 && data?.resultado === 'creado') ||
        (response.status === 200 && data?.resultado === 'ya_recibido')
      )
        return { status: 'sent' }
    }
    if (response.status === 429) {
      const retryAfterSeconds = Number(response.headers.get('retry-after')) || 60
      return {
        status: 'rate_limited',
        retryAfterSeconds,
      }
    }
    return { status: 'failed' }
  } catch (error) {
    return {
      status:
        error instanceof Error && error.name === 'AbortError'
          ? 'uncertain'
          : 'failed',
    }
  } finally {
    if (timer) clearTimeout(timer)
  }
}
