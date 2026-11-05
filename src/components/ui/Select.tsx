import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { fieldStyles } from '@/components/ui/Input'

type SelectOption = { value: string; label: string }

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      hint,
      error,
      id,
      required,
      className,
      options,
      placeholder,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const hintId = `${selectId}-hint`
    const errorId = `${selectId}-error`
    const describedBy = error ? errorId : hint ? hintId : undefined

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-white">
            {label}
            {required && (
              <span aria-hidden="true" className="ml-0.5 text-accent">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            value={value}
            defaultValue={
              value === undefined
                ? (defaultValue ?? (placeholder ? '' : undefined))
                : undefined
            }
            className={fieldStyles(
              !!error,
              `cursor-pointer appearance-none pr-10 ${className ?? ''}`,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-panel text-white">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-panel text-white"
              >
                {option.label}
              </option>
            ))}
          </select>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80"
          >
            <path d="m5 7.5 5 5 5-5" />
          </svg>
        </div>

        {error ? (
          <p id={errorId} aria-live="polite" className="text-xs text-red-300">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-white/70">
            {hint}
          </p>
        ) : null}
      </div>
    )
  },
)
