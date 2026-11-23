export const contactReasons = [
  { value: 'consulta', label: 'Consulta general' },
  { value: 'reunion', label: 'Solicitar una reunión' },
  { value: 'demo', label: 'Solicitar una demo' },
] as const

export type ContactReason = (typeof contactReasons)[number]['value']
export type ContactData = {
  name: string
  email: string
  organization: string
  phone: string
  reason: string
  message: string
  consent: boolean
}
export type ContactField = keyof ContactData
export type ContactErrors = Partial<Record<ContactField, string>>
export const contactLimits = {
  name: 200,
  email: 254,
  organization: 200,
  phone: 30,
  message: 3000,
}

// El mismo contrato se comprueba en el navegador y nuevamente en el servidor.
// La entrada HTTP sigue siendo desconocida aunque el cliente use TypeScript.
export function validateContact(input: unknown): {
  data: ContactData
  errors: ContactErrors
} {
  const source =
    typeof input === 'object' && input !== null
      ? (input as Record<string, unknown>)
      : {}
  const read = (key: ContactField) =>
    typeof source[key] === 'string' ? source[key].trim() : ''
  const phoneCountryCode =
    typeof source.phoneCountryCode === 'string'
      ? source.phoneCountryCode.trim()
      : ''
  const data: ContactData = {
    name: read('name'),
    email: read('email'),
    organization: read('organization'),
    phone: read('phone'),
    reason: read('reason'),
    message: read('message'),
    // Aceptar solo el booleano real evita tratar cadenas como "false" como permiso.
    consent: source.consent === true,
  }
  const errors: ContactErrors = {}
  // Los controles se buscan explícitamente para rechazar entradas malformadas.
  /* eslint-disable no-control-regex */
  const singleLineControls = /[\u0000-\u001f\u007f]/
  const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
  /* eslint-enable no-control-regex */
  if (
    data.name.length < 1 ||
    data.name.length > contactLimits.name ||
    singleLineControls.test(data.name)
  )
    errors.name = 'Escribe tu nombre, entre 1 y 200 caracteres.'
  if (
    data.email.length > contactLimits.email ||
    singleLineControls.test(data.email) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    errors.email = 'Escribe un correo electrónico válido.'
  if (
    data.organization.length > contactLimits.organization ||
    singleLineControls.test(data.organization)
  )
    errors.organization = 'Usa un máximo de 200 caracteres en una sola línea.'
  if (data.phone) {
    // Se valida y cuenta el teléfono nacional junto con el código internacional.
    const number = data.phone.startsWith(phoneCountryCode)
      ? data.phone.slice(phoneCountryCode.length).trim()
      : ''
    const countryDigits = phoneCountryCode.replace(/\D/g, '')
    const numberDigits = number.replace(/\D/g, '')
    if (
      data.phone.length > contactLimits.phone ||
      !/^\+[1-9]\d{0,2}$/.test(phoneCountryCode) ||
      !number ||
      !/^[\d ().-]+$/.test(number) ||
      countryDigits.length + numberDigits.length < 7 ||
      countryDigits.length + numberDigits.length > 15
    )
      errors.phone = 'Escribe un teléfono válido, con código de país y número.'
  } else if (
    source.phoneCountryCode !== undefined &&
    typeof source.phoneCountryCode !== 'string'
  ) {
    errors.phone = 'Escribe un código de país válido.'
  }
  if (!contactReasons.some((reason) => reason.value === data.reason))
    errors.reason = 'Selecciona el motivo de tu consulta.'
  if (
    data.message.length < 10 ||
    data.message.length > contactLimits.message ||
    messageControls.test(data.message)
  )
    errors.message = 'Escribe un mensaje de entre 10 y 3000 caracteres.'
  // Los opcionales pueden omitirse, pero nunca convertirse silenciosamente
  // de objetos, números o listas a una cadena vacía.
  for (const field of Object.keys(data) as ContactField[]) {
    if (
      field !== 'consent' &&
      source[field] !== undefined &&
      typeof source[field] !== 'string'
    )
      errors[field] = 'Introduce un valor de texto válido.'
  }
  if (!data.consent)
    errors.consent = 'Autoriza el uso de tus datos para enviar la consulta.'
  return { data, errors }
}
