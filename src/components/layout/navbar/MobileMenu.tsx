import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import {
  companyLinks,
  primaryLinks,
  products,
  sectors,
} from '../../../data/navigation'
import { ContactActions, NavDropdown, NavLink } from './NavElements'

type MobileMenuProps = { open: boolean; onClose: () => void }

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const panel = dialog.current
    if (!panel) return
    if (open && !panel.open) panel.showModal()
    if (!open && panel.open) panel.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    // el componente no debe bloquear otras vistas.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 1200px)')
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close()
    }
    closeOnDesktop()
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  function handleClose() {
    // Cada apertura empieza con los submenús cerrados.
    dialog.current?.querySelectorAll('details').forEach((submenu) => {
      submenu.open = false
    })
    onClose()
  }

  function closeMenu() {
    dialog.current?.close()
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const { left, right, top, bottom } =
      event.currentTarget.getBoundingClientRect()
    const outsidePanel =
      event.clientX < left ||
      event.clientX > right ||
      event.clientY < top ||
      event.clientY > bottom
    if (outsidePanel) closeMenu()
  }

  return (
    <dialog
      ref={dialog}
      id="navbar-mobile-menu"
      aria-labelledby="navbar-mobile-title"
      className="navbar-mobile-panel"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div className="navbar-mobile-heading">
        <h2 id="navbar-mobile-title">Menú</h2>
        <button type="button" aria-label="Cerrar menú" onClick={closeMenu}>
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="m6 6 12 12M6 18 18 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <nav aria-label="Principal móvil">
        <ul className="navbar-mobile-links">
          {primaryLinks.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} onNavigate={closeMenu}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavDropdown
              label="Productos"
              sectionHref="/productos"
              items={products}
              mobile
              onNavigate={closeMenu}
            />
          </li>
          <li>
            <NavLink href="/areas/navalav" onNavigate={closeMenu}>
              Innovación
            </NavLink>
          </li>
          <li>
            <NavDropdown
              label="Sectores que impulsamos"
              items={sectors}
              mobile
              onNavigate={closeMenu}
            />
          </li>
        </ul>
        <ul className="navbar-mobile-company">
          {companyLinks.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} onNavigate={closeMenu}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <ContactActions onNavigate={closeMenu} />
    </dialog>
  )
}
