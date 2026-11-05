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
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/Logo-Favicon.png',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
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
