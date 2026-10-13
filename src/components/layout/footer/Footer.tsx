import {
  footerCompany,
  footerEcosystem,
  footerSolutions,
  siteContacts,
} from '../../../data/site'
import ContactIcon from './ContactIcon'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container footer-columns">
        <div className="footer-about">
          <a
            href="/"
            className="footer-brand"
            aria-label="Navasoft Soluciones, inicio"
          >
            <img
              src="/images/brand/navasoft-white.png"
              alt="Navasoft Soluciones"
              width="1200"
              height="562"
            />
          </a>
          <p className="footer-tagline">Tecnología que innova.</p>
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
                <a href={solution.href}>{solution.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-ecosystem-title">
          <h2 id="footer-ecosystem-title">Ecosistema</h2>
          <ul className="footer-links footer-products">
            {footerEcosystem.map((product) => (
              <li key={product.href}>
                <a href={product.href} className="footer-product">
                  <span className="footer-product-name">{product.label}</span>
                  <span className="footer-product-description">
                    {product.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-company-title">
          <h2 id="footer-company-title">Empresa</h2>
          <ul className="footer-links">
            {footerCompany.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a
                href="/contacto?motivo=reunion"
                className="footer-meeting-link"
              >
                Solicitar reunión
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-statement">
        <div className="footer-container">
          <p>
            Transformamos experiencia en plataformas que generan impacto real.
          </p>
        </div>
      </div>
      <div className="footer-container footer-bottom">
        <p>© 2026 Navasoft Soluciones. Costa Rica y Centroamérica.</p>
      </div>
    </footer>
  )
}
