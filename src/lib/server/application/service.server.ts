import { validateApplication } from '../../careers'
import type { ApplicationFields } from '../../careers'
import type { ApplicationResult } from '../../application/result'
import type { ApplicationTransport } from './transport.server'

type Dependencies = {
  consume: () => { allowed: boolean; retryAfterSeconds: number }
  transport: ApplicationTransport
  timeoutMs?: number
}

function readString(data: FormData, key: string) {
  const value = data.get(key)
  return typeof value === 'string' ? value : ''
}

function readResume(data: FormData) {
  const value = data.get('curriculum')
  return typeof File !== 'undefined' && value instanceof File && value.size > 0
    ? value
    : null
}

export async function processApplication(
  input: unknown,
  deps: Dependencies,
): Promise<ApplicationResult> {
  const allowance = deps.consume()
  if (!allowance.allowed)
    return {
      status: 'rate_limited',
      retryAfterSeconds: allowance.retryAfterSeconds,
    }
  if (!(input instanceof FormData)) return { status: 'rejected' }

  const profileValue = readString(input, 'perfil')
  const areaValue = readString(input, 'area')
  const fields: ApplicationFields = {
    nombre: readString(input, 'nombre'),
    correo: readString(input, 'correo'),
    telefono: readString(input, 'telefono'),
    enlace: readString(input, 'enlace'),
    presentacion: readString(input, 'presentacion'),
    perfil:
      profileValue === 'profesional' || profileValue === 'practicante'
        ? profileValue
        : '',
    area:
      areaValue === 'desarrollo' ||
      areaValue === 'calidad' ||
      areaValue === 'infraestructura' ||
      areaValue === 'innovation' ||
      areaValue === 'comercial' ||
      areaValue === 'administracion'
        ? areaValue
        : '',
    curriculum: readResume(input),
    consentimiento: readString(input, 'consentimiento') === 'true',
  }
  const errors = validateApplication(fields)
  if (Object.keys(errors).length) return { status: 'invalid', errors }

  const resume = fields.curriculum
  if (!resume)
    return {
      status: 'invalid',
      errors: { curriculum: 'Adjunte su currículum.' },
    }

  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      deps.transport.send({ ...fields, curriculum: resume }, controller.signal),
      new Promise<ApplicationResult>((resolve) => {
        timer = setTimeout(() => {
          controller.abort()
          resolve({ status: 'uncertain' })
        }, deps.timeoutMs ?? 10000)
      }),
    ])
  } catch {
    return { status: 'uncertain' }
  } finally {
    clearTimeout(timer)
  }
}
