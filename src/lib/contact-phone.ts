// Prefijos E.164: https://www.itu.int/oth/T0202.aspx?lang=es&parent=T0202
// La opción manual permite usar países fuera de esta lista regional.
export const phoneCountries = [
  { value: 'CR', label: 'Costa Rica', code: '+506' },
  { value: 'AR', label: 'Argentina', code: '+54' },
  { value: 'BZ', label: 'Belice', code: '+501' },
  { value: 'BO', label: 'Bolivia', code: '+591' },
  { value: 'BR', label: 'Brasil', code: '+55' },
  { value: 'CA', label: 'Canadá', code: '+1' },
  { value: 'CL', label: 'Chile', code: '+56' },
  { value: 'CO', label: 'Colombia', code: '+57' },
  { value: 'CU', label: 'Cuba', code: '+53' },
  { value: 'EC', label: 'Ecuador', code: '+593' },
  { value: 'SV', label: 'El Salvador', code: '+503' },
  { value: 'ES', label: 'España', code: '+34' },
  { value: 'US', label: 'Estados Unidos', code: '+1' },
  { value: 'GT', label: 'Guatemala', code: '+502' },
  { value: 'HN', label: 'Honduras', code: '+504' },
  { value: 'MX', label: 'México', code: '+52' },
  { value: 'NI', label: 'Nicaragua', code: '+505' },
  { value: 'PA', label: 'Panamá', code: '+507' },
  { value: 'PY', label: 'Paraguay', code: '+595' },
  { value: 'PE', label: 'Perú', code: '+51' },
  { value: 'DO', label: 'República Dominicana', code: '+1' },
  { value: 'UY', label: 'Uruguay', code: '+598' },
  { value: 'VE', label: 'Venezuela', code: '+58' },
  { value: 'other', label: 'Otro país', code: '' },
]

export function joinContactPhone(code: string, number: string) {
  const trimmed = number.trim()
  if (!trimmed) return ''
  // Un número internacional pegado nunca recibe un segundo prefijo.
  if (trimmed.startsWith('+') || !code) return trimmed
  return `${code} ${trimmed}`
}

export function splitContactPhone(value: string, preferredCountry = 'CR') {
  const trimmed = value.trim()
  const preferred = phoneCountries.find(
    (item) => item.value === preferredCountry,
  )
  const match =
    (preferred?.code && trimmed.startsWith(preferred.code)
      ? preferred
      : undefined) ??
    phoneCountries.find((item) => item.code && trimmed.startsWith(item.code))
  return match
    ? {
        country: match.value,
        number: trimmed.slice(match.code.length).trimStart(),
      }
    : { country: 'other', number: trimmed }
}
