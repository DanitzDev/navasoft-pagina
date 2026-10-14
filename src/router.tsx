import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Crear una instancia por llamada evita compartir estado entre peticiones SSR.
export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    // Recupera la posición al volver a una página con el historial del navegador.
    scrollRestoration: true,
    // Precarga al mostrar intención de seguir un enlace, por hover o foco.
    defaultPreload: 'intent',
    // Reutiliza precargas recientes para no repetir el loader por hover y foco.
    defaultPreloadStaleTime: 30_000,
  })

  return router
}

// Vincula los tipos de Link, parámetros y búsquedas con las rutas registradas.
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
