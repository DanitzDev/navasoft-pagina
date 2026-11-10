import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check, FileText, Upload, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { areas, careersCopy, profiles } from '@/data/opportunities'
import type { AreaId, ProfileId } from '@/data/opportunities'
import {
  APPLICATION_MESSAGE_MAX,
  ACCEPT_ATTR,
  MAX_FILE_MB,
  formatFileSize,
  validateApplication,
} from '@/lib/careers'
import type { ApplicationErrors, ApplicationFields } from '@/lib/careers'
import { deliverApplication } from '@/lib/application/submit'
import { cn } from '@/lib/cn'

type ApplyFormProps = {
  profile: ProfileId | ''
  area: AreaId | ''
  onProfileChange: (profile: ProfileId) => void
  onAreaChange: (area: AreaId | '') => void
}

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

  const [values, setValues] = useState(initialValues)
  const [file, setFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [touched, setTouched] = useState<
    Partial<Record<keyof ApplicationFields, boolean>>
  >({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error' | 'unavailable'
  >('idle')
  const [serverErrors, setServerErrors] = useState<ApplicationErrors>({})
  const [notice, setNotice] = useState('')
  const [dragging, setDragging] = useState(false)

  const fields: ApplicationFields = {
    ...values,
    perfil: profile,
    area,
    curriculum: file,
    consentimiento: consent,
  }
  const errors = validateApplication(fields)

  const touch = (key: keyof ApplicationFields) =>
    setTouched((current) => ({ ...current, [key]: true }))
  // Los errores se muestran al salir del campo o al intentar enviar
  const errorOf = (key: keyof ApplicationFields) =>
    submitted || touched[key] ? (serverErrors[key] ?? errors[key]) : undefined

  const bind = (key: keyof typeof initialValues) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [key]: event.target.value }))
      setServerErrors((current) => ({ ...current, [key]: undefined }))
      setNotice('')
      setStatus('idle')
    },
    onBlur: () => touch(key),
    error: errorOf(key),
  })

  const pickFile = (next: File | undefined) => {
    if (!next) return
    setFile(next)
    setServerErrors((current) => ({ ...current, curriculum: undefined }))
    setStatus('idle')
    touch('curriculum')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return

    // No transmitir datos personales ni currículums hasta configurar el API.
    if (import.meta.env.PROD) {
      setStatus('unavailable')
      return
    }

    setServerErrors({})
    setNotice('')
    setStatus('sending')
    try {
      const result = await deliverApplication(fields)
      if (result.status === 'sent') {
        setStatus('sent')
      } else if (result.status === 'unavailable') {
        setStatus('unavailable')
      } else if (result.status === 'invalid') {
        setServerErrors(result.errors)
        setStatus('error')
      } else {
        setNotice(
          result.status === 'rate_limited'
            ? 'Se alcanzó el límite de envíos. Intente más tarde.'
            : copy.errorText,
        )
        setStatus('error')
      }
    } catch {
      setNotice(copy.errorText)
      setStatus('error')
    }
  }

  function reset() {
    setValues(initialValues)
    setFile(null)
    setConsent(false)
    setTouched({})
    setSubmitted(false)
    setServerErrors({})
    setNotice('')
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
      method="post"
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl bg-panel p-8"
    >
      <Input
        label="Nombre"
        name="nombre"
        autoComplete="name"
        required
        {...bind('nombre')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Correo"
          type="email"
          name="correo"
          autoComplete="email"
          required
          {...bind('correo')}
        />
        <Input
          label="Teléfono"
          type="tel"
          name="telefono"
          autoComplete="tel"
          required
          {...bind('telefono')}
        />
      </div>

      <Input
        label="LinkedIn u otro perfil (opcional)"
        name="enlace"
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
                onProfileChange(item.id)
                setServerErrors((current) => ({
                  ...current,
                  perfil: undefined,
                }))
                setStatus('idle')
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
          onAreaChange(event.target.value as AreaId)
          setServerErrors((current) => ({ ...current, area: undefined }))
          setStatus('idle')
        }}
        onBlur={() => touch('area')}
        error={errorOf('area')}
        options={areas.map((item) => ({ value: item.id, label: item.label }))}
      />

      <div>
        <p className="text-sm font-medium text-white">
          Currículum{' '}
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        </p>
        <label
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            pickFile(event.dataTransfer.files[0])
          }}
          className={cn(
            'mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors focus-within:ring-2 focus-within:ring-accent/40',
            dragging
              ? 'border-accent bg-accent/10'
              : 'border-white/25 bg-field/40 hover:border-accent',
            errorOf('curriculum') && 'border-red-400',
          )}
        >
          <input
            type="file"
            name="curriculum"
            accept={ACCEPT_ATTR}
            className="sr-only"
            onChange={(event) => pickFile(event.target.files?.[0])}
          />
          <Upload aria-hidden="true" className="size-6 text-accent" />
          <span className="text-sm text-white">
            Arrastre su archivo aquí o{' '}
            <span className="font-semibold text-accent underline underline-offset-2">
              búsquelo en su equipo
            </span>
          </span>
          <span className="text-xs text-white/60">
            PDF o Word, máximo {MAX_FILE_MB} MB
          </span>
        </label>

        {file && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-field px-4 py-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <FileText
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-white/60">
                {formatFileSize(file.size)}
              </span>
            </span>
            <button
              type="button"
              aria-label="Quitar archivo"
              onClick={() => {
                setFile(null)
                setServerErrors((current) => ({
                  ...current,
                  curriculum: undefined,
                }))
                setStatus('idle')
              }}
              className="shrink-0 rounded-md p-1 text-white/70 hover:text-white"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
        {errorOf('curriculum') && (
          <p className="mt-1.5 text-xs text-red-300">{errorOf('curriculum')}</p>
        )}
      </div>

      <Textarea
        label="Presentación"
        name="presentacion"
        maxLength={APPLICATION_MESSAGE_MAX}
        hint={`${values.presentacion.length}/${APPLICATION_MESSAGE_MAX}`}
        {...bind('presentacion')}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked)
              setServerErrors((current) => ({
                ...current,
                consentimiento: undefined,
              }))
              setStatus('idle')
              touch('consentimiento')
            }}
            className="mt-0.5 size-4 shrink-0 accent-accent"
          />
          <span>{copy.consent}</span>
        </label>
        {errorOf('consentimiento') && (
          <p className="mt-1.5 text-xs text-red-300">
            {errorOf('consentimiento')}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {notice || copy.errorText}
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
