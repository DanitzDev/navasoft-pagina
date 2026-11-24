import PageHeader from '../components/shared/page-header/PageHeader'
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'
import SiteLayout from '../components/layout/SiteLayout'

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Navasoft Soluciones · Tecnología que innova',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Navasoft Soluciones' },
      {
        property: 'og:image',
        content: 'https://navasoftsoluciones.com/og-default.jpg',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '48x48',
        href: '/Logo-Favicon-48.png',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/Montserrat-Regular.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/Montserrat-SemiBold.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/poppins.bold.woff2',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
})

// La raíz mantiene el documento y el layout también al mostrar una página 404.
// HeadContent reúne los metadatos de las rutas; Scripts permite la hidratación.
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <PageHeader
      title="Página no disponible"
      description="No encontramos la página que buscas. Revisa la dirección o vuelve al inicio."
    >
      <Link to="/" className="mt-6 inline-block underline underline-offset-4">
        Volver al inicio
      </Link>
    </PageHeader>
  )
}
