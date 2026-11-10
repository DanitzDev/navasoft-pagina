import type { AreaId, ProfileId } from '@/data/opportunities'
import { areas, profiles } from '@/data/opportunities'

export const MAX_FILE_MB = 5
export const APPLICATION_MESSAGE_MAX = 600
export const APPLICATION_NAME_MAX = 100
export const APPLICATION_EMAIL_MAX = 254
export const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']
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

export function validateResume(file: File | null): string | undefined {
  if (!file) return 'Adjunte su currículum.'
  if (file.size === 0) return 'El archivo está vacío.'
  const name = file.name.toLowerCase()
  if (!ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension))) {
    return 'El archivo debe ser PDF o Word.'
  }
  if (file.size > MAX_FILE_MB * 1024 * 1024)
    return `El archivo supera los ${MAX_FILE_MB} MB.`
  return undefined
}

// Obligatorios: todos menos LinkedIn (la maqueta lo marca "opcional") y la presentación
export function validateApplication(
  data: ApplicationFields,
): ApplicationErrors {
  const errors: ApplicationErrors = {}
  /* eslint-disable no-control-regex */
  const singleLineControls = /[\u0000-\u001f\u007f]/
  const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
  /* eslint-enable no-control-regex */
  const nombre = data.nombre.trim()
  const correo = data.correo.trim()
  const telefono = data.telefono.trim()

  if (
    nombre.length < 3 ||
    nombre.length > APPLICATION_NAME_MAX ||
    singleLineControls.test(nombre)
  )
    errors.nombre = `Escriba su nombre (de 3 a ${APPLICATION_NAME_MAX} caracteres).`
  if (
    correo.length > APPLICATION_EMAIL_MAX ||
    singleLineControls.test(correo) ||
    !/^\S+@\S+\.\S+$/.test(correo)
  )
    errors.correo = 'Escriba un correo válido.'
  if (
    telefono.length > 30 ||
    !/^\+?[\d ().-]+$/.test(telefono) ||
    telefono.replace(/\D/g, '').length < 8 ||
    telefono.replace(/\D/g, '').length > 15
  )
    errors.telefono = 'Escriba un teléfono válido.'
  if (!profiles.some((profile) => profile.id === data.perfil))
    errors.perfil = 'Seleccione un perfil.'
  if (!areas.some((area) => area.id === data.area))
    errors.area = 'Seleccione un área.'
  if (data.enlace.length > 2048 || singleLineControls.test(data.enlace)) {
    errors.enlace = 'Revise el enlace e inténtelo de nuevo.'
  } else if (data.enlace) {
    try {
      const url = new URL(data.enlace)
      if (url.protocol !== 'http:' && url.protocol !== 'https:')
        errors.enlace = 'Use un enlace web válido.'
    } catch {
      errors.enlace = 'Use un enlace web válido.'
    }
  }
  if (
    data.presentacion.length > APPLICATION_MESSAGE_MAX ||
    messageControls.test(data.presentacion)
  )
    errors.presentacion = `Use un máximo de ${APPLICATION_MESSAGE_MAX} caracteres.`

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
