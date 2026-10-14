import { Link } from '@tanstack/react-router'
import {
  footerCompany,
  footerEcosystem,
  footerSolutions,
  footerSocialLinks,
  siteContacts,
} from '../../../data/site'
import ContactIcon from './ContactIcon'
import SocialIcon from './SocialIcon'
import './Footer.css'

// Los destinos internos usan Link; contactos y redes mantienen sus protocolos
// externos (tel, mailto y https). Los datos se administran en src/data/site.ts.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container footer-columns">
        <div className="footer-about">
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
          <p className="footer-description">
            Transformamos experiencia en plataformas tecnológicas que generan
            impacto para gobiernos, empresas e industrias.
          </p>
          <address className="footer-contact">
            <ul>
              {siteContacts.map((contact) => (
                <li key={contact.kind} className="footer-contact-row">
                  <ContactIcon kind={contact.kind} />
                  {contact.href ? (
                    <a href={contact.href}>{contact.label}</a>
                  ) : (
                    <span>{contact.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </address>
        </div>
        <nav className="footer-column" aria-labelledby="footer-solutions-title">
          <h2 id="footer-solutions-title">Soluciones</h2>
          <ul className="footer-links">
            {footerSolutions.map((solution) => (
              <li key={solution.href}>
                <Link to={solution.href}>{solution.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-ecosystem-title">
          <h2 id="footer-ecosystem-title">Ecosistema</h2>
          <ul className="footer-links footer-products">
            {footerEcosystem.map((product) => (
              <li key={product.href}>
                <Link to={product.href} className="footer-product">
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
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link
                to="/contacto"
                search={{ motivo: 'reunion' }}
                className="footer-meeting-link"
              >
                Solicitar reunión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* TODO: integrar el SectionTitle compartido en esta franja cuando esté
          disponible, conservando la frase, la alineación y el diseño responsive. */}
      <div className="footer-statement">
        <div className="footer-container">
          <p>
            Transformamos experiencia en plataformas que generan impacto real.
          </p>
        </div>
      </div>
      <div className="footer-container footer-bottom">
        <p>© 2026 Navasoft Soluciones. Costa Rica y Centroamérica.</p>
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
