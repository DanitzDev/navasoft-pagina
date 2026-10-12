import {
  companyLinks,
  primaryLinks,
  products,
  sectors,
} from '../../data/navigation'
import { ContactActions, NavDropdown } from './NavElements'
import './Navbar.css'

export default function Navbar() {
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
      </div>
    </header>
  )
}
