import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  getNavigationCurrent,
  isNavigationActive,
} from '../../../lib/navigation'
import type { DropdownItem } from '../../../data/navigation'

type DropdownProps = {
  label: string
  sectionHref?: string
  items: DropdownItem[]
  mobile?: boolean
  onNavigate?: () => void
}

// details/summary aporta apertura por teclado sin recrear un control nativo.
// El atributo name permite tener un solo submenú abierto por grupo.
export function NavDropdown({
  label,
  sectionHref,
  items,
  mobile = false,
  onNavigate,
}: DropdownProps) {
  const disclosure = useRef<HTMLDetailsElement>(null)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  // La categoría permanece activa también al visitar una de sus páginas hijas.
  const active = Boolean(
    (sectionHref && isNavigationActive(pathname, sectionHref)) ||
    items.some((item) => item.href && isNavigationActive(pathname, item.href)),
  )
  // Con navegación cliente, el submenú se cierra al cambiar de página.
  useEffect(() => {
    if (disclosure.current) disclosure.current.open = false
  }, [pathname])

  useEffect(() => {
    if (mobile) return
    // Mantener este valor alineado con el breakpoint de Navbar.css.
    const desktop = window.matchMedia('(min-width: 1200px)')

    function closeOutside(event: PointerEvent) {
      const panel = disclosure.current
      if (
        panel?.open &&
        event.target instanceof Node &&
        !panel.contains(event.target)
      ) {
        panel.open = false
      }
    }

    function closeOnMobile() {
      if (!desktop.matches && disclosure.current)
        disclosure.current.open = false
    }

    // Un panel oculto no debe reaparecer abierto al volver a escritorio.
    closeOnMobile()
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', closeOnMobile)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      desktop.removeEventListener('change', closeOnMobile)
    }
  }, [mobile])

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
      <summary data-active={active || undefined}>
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
              <NavLink href={item.href} onNavigate={onNavigate}>
                {item.label}
              </NavLink>
            ) : (
              <span className="block px-3 py-2">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

type NavLinkProps = {
  href: string
  children: ReactNode
  onNavigate?: () => void
}

// Centraliza el indicador activo y el cierre del panel móvil al navegar.
// Link conserva la navegación cliente y genera un enlace HTML accesible.
export function NavLink({ href, children, onNavigate }: NavLinkProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const current = getNavigationCurrent(pathname, href)

  return (
    <Link
      to={href}
      onClick={onNavigate}
      aria-current={current}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  )
}
