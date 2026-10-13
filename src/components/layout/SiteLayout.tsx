import type { ReactNode } from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="contenido" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
