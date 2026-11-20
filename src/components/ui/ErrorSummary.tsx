import { forwardRef } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/cn'

export type ErrorSummaryItem = { field: string; label: string; message: string }

type Props = {
  items: ErrorSummaryItem[]
  onSelect: (field: string) => void
  className?: string
}

export const ErrorSummary = forwardRef<HTMLHeadingElement, Props>(
  function ErrorSummary({ items, onSelect, className }, ref) {
    if (items.length === 0) return null

    const title =
      items.length === 1
        ? 'Hay 1 error en el formulario'
        : `Hay ${items.length} errores en el formulario`

    return (
      <div
        className={cn(
          'rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200',
          className,
        )}
      >
        <h2
          ref={ref}
          tabIndex={-1}
          className="flex items-center gap-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <CircleAlert size={18} aria-hidden="true" />
          <span>
            {title}
            <span className="sr-only">. Pulse Tab para ir a cada error.</span>
          </span>
        </h2>
        <ul className="mt-2 list-inside list-disc space-y-1">
          {items.map((item) => (
            <li key={item.field}>
              <button
                type="button"
                onClick={() => onSelect(item.field)}
                className="text-left underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}: {item.message}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  },
)
