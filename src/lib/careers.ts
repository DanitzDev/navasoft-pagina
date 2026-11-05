import type { AreaId, ProfileId } from '@/data/opportunities'

export const MAX_FILE_MB = 5 // MAQUETA
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

  if (data.nombre.trim().length < 3) errors.nombre = 'Escriba su nombre.'
  if (!/^\S+@\S+\.\S+$/.test(data.correo.trim()))
    errors.correo = 'Escriba un correo válido.'
  if (data.telefono.replace(/\D/g, '').length < 8)
    errors.telefono = 'Escriba un teléfono válido.'
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

export async function simulateApplication(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900))
}
