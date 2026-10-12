import type { ReactNode } from 'react'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header />
      <main id="contenido" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <footer />
    </div>
  )
}
