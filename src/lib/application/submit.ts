import { submitApplication } from '../server/end-application'
import type { ApplicationFields } from '../careers'
import type { ApplicationResult } from './result'

export async function deliverApplication(
  application: ApplicationFields,
): Promise<ApplicationResult> {
  const data = new FormData()
  data.set('nombre', application.nombre)
  data.set('correo', application.correo)
  data.set('telefono', application.telefono)
  data.set('enlace', application.enlace)
  data.set('presentacion', application.presentacion)
  data.set('perfil', application.perfil)
  data.set('area', application.area)
  data.set('consentimiento', String(application.consentimiento))
  if (application.curriculum) data.set('curriculum', application.curriculum)

  return submitApplication({ data })
}
