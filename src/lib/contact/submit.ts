import { submitContact } from '../server/end-contact'
import type { ContactData } from '../validation/contact'
import type { ContactResult } from './result'

export async function deliverContact(
  data: ContactData & { website: string },
): Promise<ContactResult> {
  return submitContact({ data })
}
