import { Link } from '@tanstack/react-router'
import {
  footerCompany,
  footerEcosystem,
  footerSolutions,
  footerSocialLinks,
  siteContacts,
} from '../../../data/site'
import { SectionTitle } from '../../ui/SectionTitle'
import ContactIcon from './ContactIcon'
import SocialIcon from './SocialIcon'
// Presentación básica.
import './Footer.basic.css'

// Los destinos internos usan Link; contactos y redes mantienen sus protocolos
// externos (tel, mailto y https). Los datos se administran en src/data/site.ts.
export default function Footer() {
  return (
    <footer className="site-footer">
      {/* El CSS del Footer adapta las cuatro columnas a cada tamaño de pantalla. */}
      <div className="footer-container footer-columns">
        <div className="footer-about">
          {/* Solo la identidad de marca se centra en móvil. */}
          <div className="footer-identity">
            <Link
              to="/"
              className="footer-brand"
              aria-label="Navasoft Soluciones, inicio"
            >
              <img
                src="/images/brand/navasoft-white.png"
                alt="Navasoft Soluciones"
                width="1200"
                height="562"
              />
            </Link>
            <p className="footer-company-name">Navasoft</p>
            <p className="footer-tagline">Tecnología que innova</p>
          </div>
          <p className="footer-description">
            Transformamos experiencia en plataformas tecnológicas que generan
            impacto para gobiernos, empresas e industrias.
          </p>
          {/* kind elige el SVG. Los destinos externos conservan sus protocolos. */}
          <address className="footer-contact">
            <ul>
              {siteContacts.map((contact) => (
                <li key={contact.kind} className="footer-contact-row">
                  <ContactIcon kind={contact.kind} />
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target={contact.openInNewTab ? '_blank' : undefined}
                      rel={
                        contact.openInNewTab ? 'noopener noreferrer' : undefined
                      }
                    >
                      {contact.label}
                      {/* Aviso de nueva pestaña exclusivo para lectores de pantalla. */}
                      {contact.openInNewTab && (
                        <span className="sr-only">
                          {' '}
                          (abre en una pestaña nueva)
                        </span>
                      )}
                    </a>
                  ) : (
                    <span>{contact.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </address>
        </div>
        {/* TanStack marca con aria-current la página exacta; los parámetros
            no alteran la selección de los enlaces de navegación. */}
        {/* aria-labelledby permite distinguir las columnas por su título. */}
        <nav className="footer-column" aria-labelledby="footer-solutions-title">
          <h2 id="footer-solutions-title">Soluciones</h2>
          <ul className="footer-links">
            {footerSolutions.map((solution) => (
              <li key={solution.href}>
                <Link
                  to={solution.href}
                  activeOptions={{ exact: true, includeSearch: false }}
                >
                  {solution.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-ecosystem-title">
          <h2 id="footer-ecosystem-title">Ecosistema</h2>
          <ul className="footer-links footer-products">
            {footerEcosystem.map((product) => (
              <li key={product.href}>
                <Link
                  to={product.href}
                  className="footer-product"
                  activeOptions={{ exact: true, includeSearch: false }}
                >
                  <span className="footer-product-name">{product.label}</span>
                  <span className="footer-product-description">
                    {product.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-company-title">
          <h2 id="footer-company-title">Empresa</h2>
          <ul className="footer-links">
            {footerCompany.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  activeOptions={{ exact: true, includeSearch: false }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {/* search envía el motivo validado por la ruta de Contacto. */}
              <Link
                to="/contacto"
                search={{ motivo: 'reunion' }}
                className="footer-meeting-link"
                activeOptions={{ exact: true, includeSearch: true }}
              >
                Solicitar reunión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* SectionTitle es compartido; el Footer limita su tamaño y tipografía
          para conservar las proporciones de la franja institucional. */}
      <div className="footer-statement">
        <div className="footer-container">
          <SectionTitle
            title="Transformamos experiencia en plataformas que generan impacto real."
            as="h2"
            align="center"
            className="footer-statement-title max-w-none"
          />
        </div>
      </div>
      {/* En móvil las redes se centran bajo el copyright; en escritorio,
          ambos bloques se sitúan en una misma fila. */}
      <div className="footer-container footer-bottom">
        <p>© 2026 Navasoft Soluciones. Costa Rica y Centroamérica.</p>
        {/* El enlace nombra la red y avisa de la apertura en otra pestaña. */}
        <nav aria-label="Redes sociales de Navasoft">
          <ul className="footer-social-links">
            {footerSocialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (abre en una pestaña nueva)`}
                  title={link.label}
                >
                  <SocialIcon network={link.network} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
