import { useEffect, useState } from 'react'
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
  countryCode: string
  error?: string
  onChange: (value: string, countryCode: string) => void
  onBlur: () => void
}

export default function ContactPhone({
  value,
  countryCode,
  error,
  onChange,
  onBlur,
}: Props) {
  const [country, setCountry] = useState('CR')
  const selectedCountry = phoneCountries.find((item) => item.value === country)
  const code = country === 'other' ? countryCode : (selectedCountry?.code ?? '')
  const number =
    code && value.startsWith(code)
      ? value.slice(code.length).trimStart()
      : value

  useEffect(() => {
    // Sincroniza el selector cuando el formulario cambia el código (por ejemplo, al reiniciar).
    const selected = phoneCountries.find((item) => item.value === country)
    if (selected?.code === countryCode) return
    const matchingCountry = phoneCountries.find(
      (item) => item.code === countryCode,
    )
    const nextCountry = matchingCountry?.value ?? 'other'
    if (nextCountry !== country) setCountry(nextCountry)
  }, [countryCode, country])

  function changeCountry(nextCountry: string) {
    const nextCode =
      phoneCountries.find((item) => item.value === nextCountry)?.code ?? ''
    setCountry(nextCountry)
    // Cambiar el país conserva el número nacional y solo reemplaza su prefijo.
    const nationalNumber = code
      ? number
      : splitContactPhone(value, country).number
    onChange(
      nextCode ? joinContactPhone(nextCode, nationalNumber) : nationalNumber,
      nextCode,
    )
  }

  function changeNumber(nextNumber: string) {
    // Si se pega un número internacional completo, inferir país y separar prefijo.
    if (nextNumber.trimStart().startsWith('+')) {
      const parsed = splitContactPhone(nextNumber, country)
      setCountry(parsed.country)
      const nextCode =
        phoneCountries.find((item) => item.value === parsed.country)?.code ?? ''
      onChange(joinContactPhone(nextCode, parsed.number), nextCode)
    } else {
      onChange(joinContactPhone(code, nextNumber), code)
    }
  }

  function changeCountryCode(nextCode: string) {
    // En países fuera del catálogo, el usuario puede editar el prefijo manualmente.
    const normalizedCode = nextCode.trim().replace(/\s/g, '')
    const currentNumber = code && value.startsWith(code) ? number : value
    const nationalNumber = currentNumber.startsWith(normalizedCode)
      ? currentNumber.slice(normalizedCode.length).trimStart()
      : currentNumber
    onChange(joinContactPhone(normalizedCode, nationalNumber), normalizedCode)
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
        {country === 'other' && (
          <Input
            label="Código de país"
            name="phoneCountryCode"
            type="tel"
            inputMode="tel"
            value={countryCode}
            onChange={(event) => changeCountryCode(event.target.value)}
            onBlur={onBlur}
            maxLength={4}
            placeholder="+44"
            hint="Incluye + y de 1 a 3 dígitos."
          />
        )}
        <Input
          id="contact-phone"
          name="phone"
          label="Número de celular"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
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
            code ? 'Sin el código de país.' : 'Incluye + y el código de país.'
          }
        />
      </div>
    </div>
  )
}
