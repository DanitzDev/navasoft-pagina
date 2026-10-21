import { createFileRoute, Outlet } from '@tanstack/react-router'

// La ruta padre comparte el prefijo sin duplicar el contenido de sus páginas.
export const Route = createFileRoute('/productos')({ component: Outlet })
