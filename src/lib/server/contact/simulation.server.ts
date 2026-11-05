import type { CrmTransport } from './crm.server.ts'

// Se selecciona exclusivamente desde el entorno del servidor de desarrollo.
// Nunca desde los campos del formulario ni parámetros de la URL.
export function developmentContactSimulation(
  environment: string | undefined,
  mode: string | undefined,
): CrmTransport | undefined {
  if (environment !== 'development') return undefined
  if (mode === 'simulate-success')
    return {
      async send() {
        return { status: 'sent' }
      },
    }
  if (mode === 'simulate-failure')
    return {
      async send() {
        return { status: 'failed' }
      },
    }
  if (mode === 'simulate-unavailable')
    return {
      async send() {
        return { status: 'unavailable' }
      },
    }
  if (mode === 'simulate-timeout')
    return {
      send(_data, signal) {
        return new Promise((_resolve, reject) => {
          if (signal.aborted) return reject(new Error('Simulación cancelada'))
          signal.addEventListener(
            'abort',
            () => reject(new Error('Simulación cancelada')),
            { once: true },
          )
        })
      },
    }
  return undefined
}
