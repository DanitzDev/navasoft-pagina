import type { ContactErrors } from '../validation/contact.ts'

export type DeliveryResult =
  | { status: 'sent' }
  | { status: 'unavailable' }
  | { status: 'failed' }
  | { status: 'uncertain' }
  | { status: 'rate_limited'; retryAfterSeconds: number }
  | { status: 'remote_invalid' }

export type ContactResult =
  | DeliveryResult
  | { status: 'invalid'; errors: ContactErrors }
  | { status: 'rejected' }
