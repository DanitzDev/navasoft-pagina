// Límite por proceso. En despliegues con varias instancias debe sustituirse por uno compartido.
export function createContactLimiter(
  limit = 5,
  windowMs = 10 * 60 * 1000,
  maxKeys = 1000,
) {
  const buckets = new Map<string, { count: number; expires: number }>()
  return {
    consume(key: string, now = Date.now()) {
      for (const [id, bucket] of buckets)
        if (bucket.expires <= now) buckets.delete(id)
      let bucket = buckets.get(key)
      if (!bucket) {
        if (buckets.size >= maxKeys)
          return {
            allowed: false,
            retryAfterSeconds: Math.ceil(windowMs / 1000),
          }
        bucket = { count: 0, expires: now + windowMs }
        buckets.set(key, bucket)
      }
      bucket.count++
      return {
        allowed: bucket.count <= limit,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((bucket.expires - now) / 1000),
        ),
      }
    },
  }
}
