import { useRef, useState } from 'react'
import {
  companyLinks,
  primaryLinks,
  products,
  sectors,
} from '../../../data/navigation'
import MobileMenu from './MobileMenu'
import { ContactActions, NavDropdown } from './NavElements'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)

  return (
    <header className="navbar-header">
      <div className="navbar-surface">
        <a
          href="/"
          className="navbar-brand"
          aria-label="Navasoft Soluciones, inicio"
        >
          <img
            src="/images/brand/navasoft-white.png"
            alt="Navasoft Soluciones"
          />
        </a>
        <nav aria-label="Principal" className="navbar-desktop">
          <ul className="navbar-company">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <ul className="navbar-primary">
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <NavDropdown label="Productos" items={products} />
            </li>
            <li>
              <a href="/areas/navalav">Innovación</a>
            </li>
            <li>
              <NavDropdown label="Sectores que impulsamos" items={sectors} />
            </li>
          </ul>
        </nav>
        <div className="navbar-desktop">
          <ContactActions />
        </div>
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
          trigger.current?.focus()
        }}
      />
    </header>
  )
}
