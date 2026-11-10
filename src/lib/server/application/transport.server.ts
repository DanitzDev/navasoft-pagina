import type { ApplicationFields } from '../../careers'
import type { DeliveryResult } from '../../contact/result'

export type SubmittedApplication = Omit<ApplicationFields, 'curriculum'> & {
  curriculum: File
}

// La URL, autenticación y formato externo se conectarán cuando llegue la API.
export interface ApplicationTransport {
  send: (
    application: SubmittedApplication,
    signal: AbortSignal,
  ) => Promise<DeliveryResult>
}

export const unconfiguredApplicationTransport: ApplicationTransport = {
  async send() {
    return { status: 'unavailable' }
  },
}

// Simulación exclusiva del servidor de desarrollo; no guarda ni envía datos.
export const developmentApplicationSimulation: ApplicationTransport = {
  async send() {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { status: 'sent' }
  },
}
