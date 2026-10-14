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
import './Navbar.css'

export default function Navbar() {
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
        {/* TODO: integrar Button compartido para las acciones de escritorio:
            "Solicitar reunión" (/contacto?motivo=reunion) y
            "Pedir una demo" (/contacto?motivo=demo).
            Mostrar ambas únicamente en el breakpoint de escritorio. */}
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
