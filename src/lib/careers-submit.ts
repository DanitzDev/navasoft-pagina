import { submitOpportunity } from './server/submit-opportunity'
import type { ApplicationPayload, ApplicationResult } from './careers'

export async function deliverApplication(
  application: ApplicationPayload,
): Promise<ApplicationResult> {
  const bytes = new Uint8Array(await application.curriculum.arrayBuffer())
  // btoa evita depender de Buffer en el navegador; el Base64 se reconstruye en Node.
  let binary = ''
  // Convertir por bloques evita pasar millones de argumentos a String.fromCharCode de una vez.
  const chunkSize = 0x8000
  for (let offset = 0; offset < bytes.length; offset += chunkSize)
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
  const result = await submitOpportunity({
    data: {
      nombre: application.nombre,
      correo: application.correo,
      telefono: application.telefono,
      enlace: application.enlace,
      presentacion: application.presentacion,
      perfil: application.perfil,
      area: application.area,
      consentimiento: application.consentimiento,
      curriculumNombre: application.curriculum.name,
      curriculumMime: application.curriculum.type,
      curriculumBase64: btoa(binary),
    },
  })
  return result as ApplicationResult
}
