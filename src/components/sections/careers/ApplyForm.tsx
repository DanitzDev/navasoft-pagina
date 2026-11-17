import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check, LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { areas, careersCopy, profiles } from '@/data/opportunities'
import type { AreaId, ProfileId } from '@/data/opportunities'
import { APPLICATION_TEXT_LIMITS, validateApplication } from '@/lib/careers'
import type { ApplicationFields } from '@/lib/careers'
import { cn } from '@/lib/cn'
import { deliverApplication } from '@/lib/careers-submit'
import { ResumeUpload } from '@/components/sections/careers/ResumeUpload'

type ApplyFormProps = {
  profile: ProfileId | ''
  area: AreaId | ''
  onProfileChange: (profile: ProfileId) => void
  onAreaChange: (area: AreaId | '') => void
}

const MESSAGE_MAX = APPLICATION_TEXT_LIMITS.presentacion
const initialValues = {
  nombre: '',
  correo: '',
  telefono: '',
  enlace: '',
  presentacion: '',
}

export function ApplyForm({
  profile,
  area,
  onProfileChange,
  onAreaChange,
}: ApplyFormProps) {
  const copy = careersCopy.apply
  const formRef = useRef<HTMLFormElement>(null)

  const [values, setValues] = useState(initialValues)
  const [file, setFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof ApplicationFields, string>>
  >({})
  const [touched, setTouched] = useState<
    Partial<Record<keyof ApplicationFields, boolean>>
  >({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<
    | 'idle'
    | 'sending'
    | 'sent'
    | 'error'
    | 'uncertain'
    | 'unavailable'
    | 'rate_limited'
  >('idle')
  const [retryAfter, setRetryAfter] = useState(60)

  const fields: ApplicationFields = {
    ...values,
    perfil: profile,
    area,
    curriculum: file,
    consentimiento: consent,
  }
  // Los errores de servidor se combinan con la validación local y se limpian cuando la persona edita.
  const errors = { ...validateApplication(fields), ...serverErrors }

  const touch = (key: keyof ApplicationFields) =>
    setTouched((current) => ({ ...current, [key]: true }))
  // Los errores se muestran al salir del campo o al intentar enviar
  const errorOf = (key: keyof ApplicationFields) =>
    submitted || touched[key] ? errors[key] : undefined

  const bind = (key: keyof typeof initialValues) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setServerErrors({})
      setValues((current) => ({ ...current, [key]: event.target.value }))
    },
    onBlur: () => touch(key),
    error: errorOf(key),
  })

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) {
      // Tras mostrar los errores, llevar el foco al primero para que teclado y lector
      // de pantalla encuentren el campo que necesita atención.
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }

    if (!file) return

    setStatus('sending')
    try {
      const result = await deliverApplication({ ...fields, curriculum: file })
      if (result.status === 'sent' || result.status === 'unavailable') {
        setStatus(result.status)
      } else if (result.status === 'uncertain') {
        setStatus('uncertain')
      } else if (result.status === 'rate_limited') {
        setRetryAfter(result.retryAfterSeconds)
        setStatus('rate_limited')
      } else if (result.status === 'invalid') {
        setServerErrors(result.errors)
        setStatus('idle')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setValues(initialValues)
    setFile(null)
    setConsent(false)
    setServerErrors({})
    setTouched({})
    setSubmitted(false)
    setStatus('idle')
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl bg-panel p-10 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check aria-hidden="true" className="size-7" />
        </span>
        <h3 className="text-2xl font-bold">{copy.successTitle}</h3>
        <p className="text-white/70">{copy.successText}</p>
        <Button variant="secondary" onClick={reset}>
          Enviar otro currículum
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      method="post"
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl bg-panel p-8"
    >
      <Input
        label="Nombre"
        name="nombre"
        maxLength={APPLICATION_TEXT_LIMITS.nombre}
        autoComplete="name"
        required
        {...bind('nombre')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Correo"
          type="email"
          name="correo"
          maxLength={APPLICATION_TEXT_LIMITS.correo}
          autoComplete="email"
          required
          {...bind('correo')}
        />
        <Input
          label="Teléfono"
          type="tel"
          name="telefono"
          maxLength={APPLICATION_TEXT_LIMITS.telefono}
          autoComplete="tel"
          required
          {...bind('telefono')}
        />
      </div>

      <Input
        label="LinkedIn u otro perfil (opcional)"
        name="enlace"
        maxLength={APPLICATION_TEXT_LIMITS.enlace}
        {...bind('enlace')}
      />

      <fieldset>
        <legend className="text-sm font-medium text-white">
          Perfil{' '}
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {profiles.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={profile === item.id}
              onClick={() => {
                setServerErrors({})
                onProfileChange(item.id)
              }}
              onBlur={() => touch('perfil')}
              className={cn(
                'rounded-xl border px-4 py-3 text-sm font-semibold transition-colors',
                profile === item.id
                  ? 'border-accent bg-accent/15 text-white'
                  : 'border-white/10 bg-field text-white/75 hover:border-white/30',
              )}
            >
              {item.formLabel}
            </button>
          ))}
        </div>
        {errorOf('perfil') && (
          <p className="mt-1.5 text-xs text-red-300">{errorOf('perfil')}</p>
        )}
      </fieldset>

      <Select
        label="Área de interés"
        name="area"
        required
        placeholder="Seleccione"
        value={area}
        onChange={(event) => {
          setServerErrors({})
          onAreaChange(event.target.value as AreaId)
        }}
        onBlur={() => touch('area')}
        error={errorOf('area')}
        options={areas.map((item) => ({ value: item.id, label: item.label }))}
      />

      <ResumeUpload
        file={file}
        error={errorOf('curriculum')}
        onFileChange={(next) => {
          setServerErrors({})
          setFile(next)
          touch('curriculum')
        }}
      />

      <Textarea
        label="Presentación"
        name="presentacion"
        maxLength={MESSAGE_MAX}
        hint={`${values.presentacion.length}/${MESSAGE_MAX}`}
        {...bind('presentacion')}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-white/80">
          <input
            id="consentimiento"
            type="checkbox"
            checked={consent}
            aria-invalid={errorOf('consentimiento') ? true : undefined}
            aria-describedby={
              errorOf('consentimiento') ? 'consentimiento-error' : undefined
            }
            onChange={(event) => {
              setServerErrors({})
              setConsent(event.target.checked)
              touch('consentimiento')
            }}
            className="mt-0.5 size-4 shrink-0 accent-accent"
          />
          <span>{copy.consent}</span>
        </label>
        {errorOf('consentimiento') && (
          <p
            id="consentimiento-error"
            role="alert"
            className="mt-1.5 text-xs text-red-300"
          >
            {errorOf('consentimiento')}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {copy.errorText}
        </p>
      )}

      {status === 'unavailable' && (
        <p
          role="alert"
          className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-white"
        >
          La recepción en línea aún no está habilitada. Su currículum no se
          envió; puede compartirlo por{' '}
          <a
            href={careersCopy.apply.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent underline underline-offset-2"
          >
            WhatsApp
          </a>
          .
        </p>
      )}

      {status === 'rate_limited' && (
        <p
          role="alert"
          className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-white"
        >
          Recibimos varias solicitudes desde su conexión. Espere {retryAfter}{' '}
          segundos antes de intentarlo de nuevo.
        </p>
      )}

      {status === 'uncertain' && (
        <p
          role="alert"
          className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-white"
        >
          No pudimos confirmar si recibimos su postulación. Antes de volver a
          enviarla, confirme la recepción con el equipo de selección por{' '}
          <a
            href={careersCopy.apply.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent underline underline-offset-2"
          >
            WhatsApp
          </a>
          .
        </p>
      )}

      {status === 'sending' && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-4 text-sm text-white/85"
        >
          <LoaderCircle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 animate-spin text-accent motion-reduce:animate-none"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">
              Enviando su postulación y currículum…
            </p>
            <p className="mt-1 text-white/65">
              Puede tardar unos segundos. Mantenga esta página abierta; le
              avisaremos cuando recibamos la confirmación.
            </p>
            <div
              aria-hidden="true"
              className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"
            >
              <div className="h-full w-1/3 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar currículum'}
      </Button>
    </form>
  )
}
