import { Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import {
  companyLinks,
  primaryLinks,
  products,
  sectors,
} from '../../../data/navigation'
import MobileMenu from './MobileMenu'
import { NavDropdown, NavLink } from './NavElements'
import NavbarActions from './NavbarActions'
import './Navbar.css'

// Coordina el menú móvil. Los enlaces y desplegables se delegan a NavElements,
// las acciones a NavbarActions y el diálogo a MobileMenu.
export default function Navbar() {
  // React controla la apertura; trigger conserva el botón al que volverá el foco.
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)

  return (
    <header className="navbar-header">
      <div className="navbar-surface">
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Navasoft Soluciones, inicio"
        >
          <img
            src="/images/brand/navasoft-white.png"
            alt="Navasoft Soluciones"
          />
        </Link>
        {/* Las dos filas de escritorio usan los mismos datos que el menú móvil.
            CSS oculta este bloque por debajo del breakpoint de 1200 px. */}
        <nav aria-label="Principal" className="navbar-desktop">
          <ul className="navbar-company">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <ul className="navbar-primary">
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
            <li>
              <NavDropdown
                label="Productos"
                sectionHref="/productos"
                items={products}
              />
            </li>
            <li>
              <NavLink href="/areas/navalav">Innovación</NavLink>
            </li>
            <li>
              <NavDropdown label="Sectores que impulsamos" items={sectors} />
            </li>
          </ul>
        </nav>
        {/* Reutiliza ButtonLink aquí solo se coloca el grupo. */}
        <div className="navbar-desktop navbar-desktop-actions">
          <NavbarActions />
        </div>
        {/* aria-controls identifica el diálogo y aria-expanded refleja su estado.
            El SVG es decorativo porque aria-label ya nombra este control. */}
        <button
          ref={trigger}
          type="button"
          className="navbar-trigger"
          aria-label="Abrir menú"
          aria-haspopup="dialog"
          aria-controls="navbar-mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.8"
              d="M5 6h14M5 12h14M5 18h14"
            />
          </svg>
        </button>
      </div>
      {/* El diálogo informa del cierre por botón, Escape, fondo o navegación.
          El padre sincroniza open y restaura el foco cuando el botón es visible. */}
      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false)
          // Al pasar a escritorio el botón queda oculto; no debe recibir foco.
          if (trigger.current?.getClientRects().length) trigger.current.focus()
        }}
      />
    </header>
  )
}
