import { siteContacts } from '../../../data/site'
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
                <li key={contact.label}>
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
        <div className="footer-column">
          <h2>Soluciones</h2>
        </div>
        <div className="footer-column">
          <h2>Ecosistema</h2>
        </div>
        <div className="footer-column">
          <h2>Empresa</h2>
        </div>
      </div>
      <div className="footer-container footer-bottom">
        <p>© 2026 Navasoft Soluciones. Costa Rica y Centroamérica.</p>
      </div>
    </footer>
  )
}
