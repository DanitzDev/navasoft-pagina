import type { ContactErrors } from '../validation/contact.ts'

export type DeliveryResult =
  | { status: 'sent' }
  | { status: 'unavailable' }
  | { status: 'failed' }
  | { status: 'uncertain' }

export type ContactResult =
  | DeliveryResult
  | { status: 'invalid'; errors: ContactErrors }
  | { status: 'rejected' }
  | { status: 'rate_limited'; retryAfterSeconds: number }
