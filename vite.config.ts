import { defineConfig, loadEnv } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    // Cargar solo variables privadas necesarias para funciones del servidor local.
    const localEnv = loadEnv(mode, process.cwd(), '')
    for (const name of [
      'ORDS_BASE_URL',
      'ORDS_CLIENT_ID',
      'ORDS_CLIENT_SECRET',
      'ORDS_TRUST_X_FORWARDED_FOR',
    ]) {
      if (process.env[name] === undefined && localEnv[name] !== undefined)
        process.env[name] = localEnv[name]
    }
  }

  return {
    resolve: { tsconfigPaths: true },
    plugins: [
      tailwindcss(),
      tanstackStart({
        router: {
          // Los formularios usan Server Functions, no rutas API basadas en archivos.
          routeFileIgnorePattern: '^api(\\.|$)',
        },
      }),
      viteReact(),
    ],
  }
})

export default config
