// Contenido reorganizado a partir del prototipo de Innovación.
// Los ejemplos describen aplicaciones posibles, no proyectos acreditados.
export const innovationCapabilities = [
  {
    id: 'iot',
    title: 'Internet de las cosas',
    summary: 'Conectar lo que ocurre en campo.',
    headline: 'De una señal en planta a información útil.',
    description:
      'Integramos sensores y dispositivos para capturar datos donde ocurre la operación y llevarlos a sistemas que permitan consultarlos y darles seguimiento.',
    examples: [
      'Captura de variables de equipos y procesos',
      'Telemetría de infraestructura física',
      'Tableros y alertas para la operación',
    ],
    image: '/images/area-iot.jpeg',
    alt: 'Ilustración de sensores y monitoreo en una línea industrial.',
  },
  {
    id: 'cloud',
    title: 'Nube e integración',
    summary: 'Reunir datos, sistemas y servicios.',
    headline: 'La información conectada con su operación.',
    description:
      'Diseñamos arquitecturas que reúnen telemetría, documentos y servicios, para que la información pueda acompañar a los equipos más allá de una sola ubicación.',
    examples: [
      'Centralización de datos de distintas fuentes',
      'Integración con plataformas existentes',
      'Servicios disponibles para distintos equipos',
    ],
    image: '/images/hero-trust.jpeg',
    alt: 'Ilustración de una sala de operaciones con tableros de información.',
  },
  {
    id: 'ai',
    title: 'Inteligencia artificial',
    summary: 'Aplicar modelos a una necesidad concreta.',
    headline: 'Menos revisión manual. Más contexto para decidir.',
    description:
      'Exploramos modelos que ayuden a clasificar información, identificar eventos y asistir tareas específicas. La prueba parte del proceso y de los datos disponibles.',
    examples: [
      'Clasificación de documentos e información',
      'Detección de eventos que requieren atención',
      'Asistencia en tareas de un proceso definido',
    ],
    image: '/images/hero-innovation.jpeg',
    alt: 'Ilustración de un laboratorio de tecnología con prototipos y modelos digitales.',
  },
] as const

export const innovationSteps = [
  {
    title: 'Entender',
    description:
      'Definimos el problema, el contexto de uso y qué necesitamos comprobar.',
  },
  {
    title: 'Prototipar',
    description:
      'Construimos una prueba acotada con los datos o dispositivos necesarios.',
  },
  {
    title: 'Validar',
    description:
      'Revisamos los resultados y la viabilidad antes de ampliar la solución.',
  },
  {
    title: 'Integrar',
    description:
      'Si la prueba funciona, llevamos la solución a producción con integración y soporte.',
  },
] as const
