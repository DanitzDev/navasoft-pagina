import type { ReactNode } from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'

// Las rutas comparten este layout; children contiene únicamente su página.
// El salto apunta al main enfocable para evitar recorrer todo el Navbar con Tab.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#contenido" className="navbar-skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
