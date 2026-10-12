import { useRef } from 'react'
import type { DropdownItem } from '../../../data/navigation'

type DropdownProps = {
  label: string
  items: DropdownItem[]
  mobile?: boolean
  onNavigate?: () => void
}

// conserva la apertura por teclado.
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
      name={mobile ? 'navbar-mobile-submenus' : 'navbar-desktop-submenus'}
      className={mobile ? 'navbar-disclosure mobile' : 'navbar-disclosure'}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !disclosure.current?.open) return
        // Escape cierra primero el submenú, sin cancelar el diálogo móvil.
        event.preventDefault()
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
        <svg
          aria-hidden="true"
          className="navbar-chevron"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            d="m3 4.5 3 3 3-3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <ul className="navbar-dropdown">
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} onClick={onNavigate}>
                {item.label}
              </a>
            ) : (
              <span className="block px-3 py-2">{item.label}</span>
            )}
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
