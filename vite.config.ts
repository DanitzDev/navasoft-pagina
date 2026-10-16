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
        // El endpoint de contacto sigue pendiente de implementación.
        routeFileIgnorePattern: '^api(\\.|$)',
      },
    }),
    viteReact(),
  ],
})

export default config
