import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, CircleAlert, LoaderCircle, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import ContactPhone from './ContactPhone'
import { deliverContact } from '@/lib/contact/submit'
import {
  contactLimits,
  contactReasons,
  validateContact,
} from '@/lib/validation/contact'
import type {
  ContactData,
  ContactErrors,
  ContactField,
  ContactReason,
} from '@/lib/validation/contact'

type Props = { initialReason?: ContactReason }

export default function ContactForm({ initialReason = 'consulta' }: Props) {
  const [values, setValues] = useState<ContactData>({
    name: '',
    email: '',
    organization: '',
    phone: '',
    reason: initialReason,
    message: '',
  })
  const [touched, setTouched] = useState<
    Partial<Record<ContactField, boolean>>
  >({})
  const [errors, setErrors] = useState<ContactErrors>({})
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState('')
  const [sent, setSent] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [retryAt, setRetryAt] = useState(0)
  const [retrySeconds, setRetrySeconds] = useState(0)
  const website = useRef<HTMLInputElement>(null)
  const busy = useRef(false)
  const form = useRef<HTMLFormElement>(null)
  const status = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sent) status.current?.focus()
  }, [sent])

  useEffect(() => {
    if (!retryAt) return
    const update = () => {
      const remaining = Math.max(0, Math.ceil((retryAt - Date.now()) / 1000))
      setRetrySeconds(remaining)
      if (!remaining) setRetryAt(0)
    }
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [retryAt])

  function change(field: ContactField, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field])
      setErrors((current) => ({
        ...current,
        [field]: validateContact(next).errors[field],
      }))
    setNotice('')
    setSent(false)
  }

  function blur(field: ContactField) {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors((current) => ({
      ...current,
      [field]: validateContact(values).errors[field],
    }))
  }

  function focusError(next: ContactErrors) {
    const field = (Object.keys(values) as ContactField[]).find(
      (key) => next[key],
    )
    if (field)
      form.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current || Date.now() < retryAt) return
    setAttempted(true)
    setNotice('')
    setSent(false)
    const result = validateContact(values)
    setErrors(result.errors)
    setTouched({
      name: true,
      email: true,
      organization: true,
      phone: true,
      reason: true,
      message: true,
    })
    if (Object.keys(result.errors).length) {
      requestAnimationFrame(() => focusError(result.errors))
      return
    }
    busy.current = true
    setPending(true)
    try {
      const response = await deliverContact({
        ...result.data,
        website: website.current?.value ?? '',
      })
      if (response.status === 'invalid') {
        setErrors(response.errors)
        requestAnimationFrame(() => focusError(response.errors))
      } else {
        if (response.status === 'sent') {
          setSent(true)
          setNotice(
            'Tu mensaje se envió correctamente. Gracias por escribirnos; te responderemos al correo que indicaste.',
          )
          setValues({
            name: '',
            email: '',
            organization: '',
            phone: '',
            reason: initialReason,
            message: '',
          })
          setTouched({})
          setErrors({})
        } else if (response.status === 'uncertain') {
          setNotice(
            'No pudimos confirmar el envío. Tus datos siguen aquí. Espera un momento antes de volver a intentarlo o contáctanos por correo o WhatsApp.',
          )
        } else if (response.status === 'unavailable') {
          setNotice(
            'El envío desde el formulario no está disponible por el momento. Tus datos siguen aquí; puedes contactarnos por correo o WhatsApp.',
          )
        } else if (response.status === 'rate_limited') {
          const seconds = Math.max(1, Math.ceil(response.retryAfterSeconds))
          setRetryAt(Date.now() + seconds * 1000)
          setRetrySeconds(seconds)
          setNotice(
            'Has realizado varios intentos. Podrás volver a enviar cuando termine la espera. Tus datos siguen aquí.',
          )
        } else {
          setNotice(
            'No se pudo enviar el mensaje. Tus datos siguen en el formulario; puedes volver a intentarlo o escribirnos por correo o WhatsApp.',
          )
        }
        requestAnimationFrame(() => status.current?.focus())
      }
    } catch {
      setNotice(
        'No pudimos procesar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o utiliza los canales de contacto. Tus datos siguen en el formulario.',
      )
      requestAnimationFrame(() => status.current?.focus())
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  function fieldProps(name: ContactField) {
    return {
      name,
      id: `contact-${name}`,
      value: values[name],
      error: errors[name],
      onChange: (event: { target: { value: string } }) =>
        change(name, event.target.value),
      onBlur: () => blur(name),
    }
  }

  if (sent) {
    return (
      <div
        ref={status}
        className="contact-form contact-success"
        role="status"
        tabIndex={-1}
        aria-labelledby="contact-success-title"
      >
        <CheckCircle2 size={40} aria-hidden="true" />
        <h2 id="contact-success-title">Mensaje enviado</h2>
        <p>
          Gracias por escribirnos. Te responderemos al correo que indicaste.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSent(false)
            setNotice('')
            setAttempted(false)
            requestAnimationFrame(() =>
              form.current
                ?.querySelector<HTMLInputElement>('[name="name"]')
                ?.focus(),
            )
          }}
        >
          Enviar otra consulta
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={form}
      className="contact-form"
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      aria-busy={pending}
    >
      <div className="contact-form-heading">
        <h2 id="contact-form-title">Escríbenos</h2>
        <p>
          Los campos con <span aria-hidden="true">*</span>
          <span className="sr-only">asterisco</span> son obligatorios.
        </p>
      </div>
      {attempted && Object.values(errors).some(Boolean) && (
        <div className="contact-error-summary" role="alert">
          <CircleAlert size={20} aria-hidden="true" />
          <p>Revisa los campos señalados para continuar.</p>
        </div>
      )}
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Deja este campo vacío</label>
        <input
          ref={website}
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset disabled={pending}>
        <legend className="sr-only">Tus datos de contacto</legend>
        <div className="contact-fields contact-details">
          <Input
            {...fieldProps('name')}
            label="Nombre completo"
            required
            autoComplete="name"
            maxLength={contactLimits.name}
          />
          <Input
            {...fieldProps('email')}
            label="Correo electrónico"
            required
            type="email"
            autoComplete="email"
            maxLength={contactLimits.email}
            autoCapitalize="none"
            spellCheck={false}
          />
          <Input
            {...fieldProps('organization')}
            label="Organización (opcional)"
            autoComplete="organization"
            maxLength={contactLimits.organization}
          />
          <ContactPhone
            value={values.phone}
            error={errors.phone}
            onChange={(value) => change('phone', value)}
            onBlur={() => blur('phone')}
          />
        </div>
      </fieldset>
      <fieldset disabled={pending}>
        <legend className="sr-only">¿En qué podemos ayudarte?</legend>
        <div className="contact-fields">
          <div className="contact-field-wide">
            <Select
              {...fieldProps('reason')}
              label="Motivo de contacto"
              required
              options={[...contactReasons]}
            />
          </div>
          <div className="contact-field-wide">
            <Textarea
              {...fieldProps('message')}
              label="Mensaje"
              required
              maxLength={contactLimits.message}
              rows={4}
              hint="Mínimo 10 caracteres."
              placeholder="Cuéntanos qué necesitas resolver."
            />
            <p className="contact-character-count" aria-live="off">
              {values.message.length.toLocaleString('es-CR')} /{' '}
              {contactLimits.message.toLocaleString('es-CR')} caracteres
            </p>
          </div>
        </div>
      </fieldset>
      <div
        ref={status}
        className={notice ? 'contact-status' : undefined}
        role="status"
        tabIndex={-1}
      >
        {notice}
      </div>
      <noscript>
        <p>
          Activa JavaScript para usar el formulario o escríbenos al correo
          comercial.
        </p>
      </noscript>
      <div className="contact-submit">
        <p>Usaremos tus datos para responder a tu consulta.</p>
        <Button type="submit" size="lg" disabled={pending || retrySeconds > 0}>
          {pending
            ? 'Procesando…'
            : retrySeconds > 0
              ? `Espera ${Math.floor(retrySeconds / 60)}:${String(retrySeconds % 60).padStart(2, '0')}`
              : 'Enviar mensaje'}
          {pending ? (
            <LoaderCircle
              className="contact-spinner"
              size={17}
              aria-hidden="true"
            />
          ) : (
            <Send size={17} aria-hidden="true" />
          )}
        </Button>
      </div>
    </form>
  )
}
