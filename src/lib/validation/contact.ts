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
}
export type ContactField = keyof ContactData
export type ContactErrors = Partial<Record<ContactField, string>>
export const contactLimits = {
  name: 100,
  email: 254,
  organization: 150,
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
  const data: ContactData = {
    name: read('name'),
    email: read('email'),
    organization: read('organization'),
    phone: read('phone'),
    reason: read('reason'),
    message: read('message'),
  }
  const errors: ContactErrors = {}
  // Los controles se buscan explícitamente para rechazar entradas malformadas.
  /* eslint-disable no-control-regex */
  const singleLineControls = /[\u0000-\u001f\u007f]/
  const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
  /* eslint-enable no-control-regex */
  if (
    data.name.length < 2 ||
    data.name.length > contactLimits.name ||
    singleLineControls.test(data.name)
  )
    errors.name = 'Escribe tu nombre, entre 2 y 100 caracteres.'
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
    errors.organization = 'Usa un máximo de 150 caracteres en una sola línea.'
  if (
    data.phone &&
    (data.phone.length > contactLimits.phone ||
      !/^\+?[\d ().-]+$/.test(data.phone) ||
      data.phone.replace(/\D/g, '').length < 7 ||
      data.phone.replace(/\D/g, '').length > 15)
  )
    errors.phone =
      'Escribe un teléfono válido, con código de país si corresponde.'
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
    if (source[field] !== undefined && typeof source[field] !== 'string')
      errors[field] = 'Introduce un valor de texto válido.'
  }
  return { data, errors }
}
