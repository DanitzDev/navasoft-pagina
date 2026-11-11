import { submitContact } from '../server/end-contact'
import type { ContactData } from '../validation/contact'
import type { ContactResult } from './result'

// Mantiene a la interfaz desacoplada del proveedor que entrega los mensajes.
export async function deliverContact(
  data: ContactData & { website: string; phoneCountryCode: string },
): Promise<ContactResult> {
  return submitContact({ data })
}
