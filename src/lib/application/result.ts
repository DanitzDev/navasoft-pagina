import type { ApplicationErrors } from '../careers'
import type { DeliveryResult } from '../contact/result'

export type ApplicationResult =
  | DeliveryResult
  | { status: 'invalid'; errors: ApplicationErrors }
  | { status: 'rejected' }
  | { status: 'rate_limited'; retryAfterSeconds: number }
