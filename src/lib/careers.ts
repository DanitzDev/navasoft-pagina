import type { AreaId, ProfileId } from '@/data/opportunities'

export const MAX_FILE_MB = 5
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024
export const APPLICATION_TEXT_LIMITS = {
  nombre: 200,
  correo: 254,
  telefono: 30,
  enlace: 500,
  presentacion: 600,
} as const
export const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'] as const
export const ACCEPT_ATTR =
  '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export type ApplicationFields = {
  nombre: string
  correo: string
  telefono: string
  enlace: string
  presentacion: string
  perfil: ProfileId | ''
  area: AreaId | ''
  curriculum: File | null
  consentimiento: boolean
}

export type ApplicationErrors = Partial<Record<keyof ApplicationFields, string>>

// Contrato estable para la integración; el archivo se enviará como multipart.
export type ApplicationPayload = Omit<ApplicationFields, 'curriculum'> & {
  curriculum: File
}

export type ApplicationResult =
  | { status: 'sent' }
  | { status: 'unavailable' }
  | { status: 'failed' }
  | { status: 'uncertain' }
  | { status: 'invalid'; errors: ApplicationErrors }

export function validateResume(file: File | null): string | undefined {
  if (!file) return 'Adjunte su currículum.'
  if (file.size === 0) return 'El archivo está vacío.'
  const name = file.name.toLowerCase()
  if (!ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension))) {
    return 'El archivo debe ser PDF o Word.'
  }
  if (file.size > MAX_FILE_BYTES)
    return `El archivo supera los ${MAX_FILE_MB} MB.`
  return undefined
}

// Obligatorios: todos menos LinkedIn (la maqueta lo marca "opcional") y la presentación
export function validateApplication(
  data: ApplicationFields,
): ApplicationErrors {
  const errors: ApplicationErrors = {}

  const limits = APPLICATION_TEXT_LIMITS
  if (
    data.nombre.trim().length < 3 ||
    data.nombre.trim().length > limits.nombre
  )
    errors.nombre = `Escriba su nombre, entre 3 y ${limits.nombre} caracteres.`
  if (
    data.correo.trim().length > limits.correo ||
    !/^\S+@\S+\.\S+$/.test(data.correo.trim())
  )
    errors.correo = 'Escriba un correo válido.'
  if (
    data.telefono.trim().length > limits.telefono ||
    data.telefono.replace(/\D/g, '').length < 8
  )
    errors.telefono = 'Escriba un teléfono válido.'
  if (data.enlace.trim().length > limits.enlace)
    errors.enlace = `Use un máximo de ${limits.enlace} caracteres.`
  if (data.presentacion.length > limits.presentacion)
    errors.presentacion = `Use un máximo de ${limits.presentacion} caracteres.`
  if (!data.perfil) errors.perfil = 'Seleccione un perfil.'
  if (!data.area) errors.area = 'Seleccione un área.'

  const resumeError = validateResume(data.curriculum)
  if (resumeError) errors.curriculum = resumeError

  if (!data.consentimiento)
    errors.consentimiento = 'Debe autorizar la revisión del currículum.'

  return errors
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
