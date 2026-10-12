import { useRef } from 'react'
import type { NavigationItem } from '../../data/navigation'

type DropdownProps = {
  label: string
  items: NavigationItem[]
  mobile?: boolean
  onNavigate?: () => void
}

// conserva la apertura por teclado sin simular un menú ARIA.
export function NavDropdown({
  label,
  items,
  mobile = false,
  onNavigate,
}: DropdownProps) {
  const disclosure = useRef<HTMLDetailsElement>(null)
  return (
    <details
      ref={disclosure}
      className={mobile ? 'navbar-disclosure mobile' : 'navbar-disclosure'}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !disclosure.current?.open) return
        event.stopPropagation()
        disclosure.current.open = false
        disclosure.current.querySelector('summary')?.focus()
      }}
      onBlur={(event) => {
        if (!mobile && !event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.open = false
        }
      }}
    >
      <summary>
        {label}
        <span aria-hidden="true" className="navbar-chevron">
          ⌄
        </span>
      </summary>
      <ul className="navbar-dropdown">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={onNavigate}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

export function ContactActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="navbar-actions">
      <a
        href="/contacto?motivo=reunion"
        onClick={onNavigate}
        className="meeting"
      >
        Solicitar reunión
      </a>
      <a href="/contacto?motivo=demo" onClick={onNavigate} className="demo">
        Pedir una demo
      </a>
    </div>
  )
}
