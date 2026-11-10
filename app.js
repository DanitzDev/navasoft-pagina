import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import serveStatic from 'serve-static'
import { toNodeHandler } from 'srvx/node'

process.env.NODE_ENV ??= 'production'

const serveClient = serveStatic(
  fileURLToPath(new URL('./dist/client/', import.meta.url)),
  { index: false, redirect: false },
)

async function start() {
  const { default: app } = await import('./dist/server/server.js')
  const serveApp = toNodeHandler((request) => app.fetch(request))
  const server = createServer((request, response) => {
    serveClient(request, response, (error) => {
      if (error) {
        response.writeHead(error.statusCode ?? 500).end()
        return
      }

      void Promise.resolve()
        .then(() => serveApp(request, response))
        .catch((failure) => {
          console.error('Error al procesar una solicitud:', failure)
          if (response.headersSent) response.destroy()
          else response.writeHead(500).end()
        })
    })
  })

  const port = process.env.PORT || '3000'
  // IIS puede entregar una canalización con nombre en lugar de un puerto TCP.
  if (/^\d+$/.test(port)) server.listen(Number(port), process.env.HOST)
  else server.listen(port)
}

void start().catch((error) => {
  console.error(
    'No se pudo iniciar la aplicación. Ejecuta npm run build.',
    error,
  )
  process.exitCode = 1
})
