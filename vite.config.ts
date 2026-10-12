import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: {
        // Activar estas rutas cuando exporten Route y tengan contenido.
        routeFileIgnorePattern:
          '^(api|productos|oportunidades|contacto|casos-de-exito)(\\.|$)',
      },
    }),
    viteReact(),
  ],
})

export default config
