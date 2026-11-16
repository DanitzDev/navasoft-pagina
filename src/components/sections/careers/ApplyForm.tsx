import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { areas, careersCopy, profiles } from '@/data/opportunities'
import type { AreaId, ProfileId } from '@/data/opportunities'
import {
  APPLICATION_TEXT_LIMITS,
  validateApplication,
} from '@/lib/careers'
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
    submitted || touched[key] ? errors[key] : undefined

  const bind = (key: keyof typeof initialValues) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [key]: event.target.value })),
    onBlur: () => touch(key),
    error: errorOf(key),
  })

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return

    if (!file) return

    setStatus('sending')
    try {
      const result = await deliverApplication({ ...fields, curriculum: file })
      if (result.status === 'sent' || result.status === 'unavailable') {
        setStatus(result.status)
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
              onClick={() => onProfileChange(item.id)}
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
        onChange={(event) => onAreaChange(event.target.value as AreaId)}
        onBlur={() => touch('area')}
        error={errorOf('area')}
        options={areas.map((item) => ({ value: item.id, label: item.label }))}
      />

      <ResumeUpload
        file={file}
        error={errorOf('curriculum')}
        onFileChange={(next) => {
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
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked)
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
