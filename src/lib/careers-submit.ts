import type { ApplicationPayload, ApplicationResult } from './careers'

/** Adaptador temporal de envío, aislado del formulario hasta recibir el contrato de API. */
export async function deliverApplication(
  _application: ApplicationPayload,
): Promise<ApplicationResult> {
  if (import.meta.env.PROD) return { status: 'unavailable' }

  // En desarrollo conserva la vista de éxito de la maqueta sin enviar datos.
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { status: 'sent' }
}
