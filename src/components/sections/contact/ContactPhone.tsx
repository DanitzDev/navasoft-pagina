import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { contactLimits } from '@/lib/validation/contact'
import {
  joinContactPhone,
  phoneCountries,
  splitContactPhone,
} from '@/lib/contact-phone'

type Props = {
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export default function ContactPhone({
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  const [country, setCountry] = useState('CR')
  const code = phoneCountries.find((item) => item.value === country)?.code ?? ''
  const number =
    code && value.startsWith(code)
      ? value.slice(code.length).trimStart()
      : value
  const hasFullNumber = number.trimStart().startsWith('+')

  function changeCountry(nextCountry: string) {
    const nextCode =
      phoneCountries.find((item) => item.value === nextCountry)?.code ?? ''
    setCountry(nextCountry)
    // En modo manual se conserva el número completo, incluido el prefijo actual.
    const nationalNumber = code ? number : splitContactPhone(value).number
    onChange(nextCode ? joinContactPhone(nextCode, nationalNumber) : value)
  }

  function changeNumber(nextNumber: string) {
    if (nextNumber.trimStart().startsWith('+')) {
      const parsed = splitContactPhone(nextNumber, country)
      setCountry(parsed.country)
      const nextCode =
        phoneCountries.find((item) => item.value === parsed.country)?.code ?? ''
      onChange(joinContactPhone(nextCode, parsed.number))
    } else {
      onChange(joinContactPhone(code, nextNumber))
    }
  }

  return (
    <div
      className="contact-phone"
      role="group"
      aria-labelledby="contact-phone-label"
    >
      <p id="contact-phone-label">
        Celular <span>(opcional)</span>
      </p>
      <div className="contact-phone-controls">
        <Select
          id="contact-phone-country"
          name="phoneCountry"
          label="País y código"
          value={country}
          onChange={(event) => changeCountry(event.target.value)}
          options={phoneCountries.map((item) => ({
            value: item.value,
            label: item.code ? `${item.label} (${item.code})` : item.label,
          }))}
        />
        <Input
          id="contact-phone"
          name="phone"
          label={
            code && !hasFullNumber
              ? 'Número de celular'
              : 'Número con código de país'
          }
          type="tel"
          inputMode="tel"
          autoComplete={code && !hasFullNumber ? 'tel-national' : 'tel'}
          value={number}
          onChange={(event) => changeNumber(event.target.value)}
          onBlur={onBlur}
          maxLength={contactLimits.phone}
          placeholder={
            country === 'CR'
              ? '8888 8888'
              : code
                ? 'Número de celular'
                : '+44 7700 900000'
          }
          error={error}
          hint={
            hasFullNumber && code
              ? 'El código incluido en el número tiene prioridad sobre el país seleccionado.'
              : code
                ? 'Sin el código de país. También puedes pegar el número completo con +.'
                : 'Incluye + y el código de tu país.'
          }
        />
      </div>
    </div>
  )
}
