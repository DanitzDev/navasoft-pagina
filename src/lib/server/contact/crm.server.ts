import type { ContactData } from '../../validation/contact.ts'
import type { DeliveryResult } from '../../contact/result.ts'

// Contrato INTERNO. La autenticación, URL y formato externo se implementarán
// únicamente cuando el equipo del CRM entregue su especificación.
export interface CrmTransport {
  send: (data: ContactData, signal: AbortSignal) => Promise<DeliveryResult>
}

export const unconfiguredCrmTransport: CrmTransport = {
  async send() {
    return { status: 'unavailable' }
  },
}
