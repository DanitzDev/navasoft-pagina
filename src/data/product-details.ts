import {
  Award, BookOpen, CalendarClock, ClipboardCheck, FileSpreadsheet, GraduationCap, HeartHandshake, Mail, Presentation, School, UserCheck, UserCog,
  FileDiff, FileSignature, Package, Search, Settings,
  Banknote,
  CalendarDays,
  FileCheck,
  FileText,
  Gauge,
  HardHat,
  KeyRound,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Monitor,
  BellRing,
  Factory,
  Warehouse,
  ShieldCheck,
  Camera,
  Scale,
  QrCode,
  Power,
  Route as RouteIcon,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react'
import type { Capability, ProductDetail, ProductSlug } from '@/types'

const gridxia: Capability[] = [
  {
    icon: Power,
    title: 'Órdenes de corte y reconexión',
    items: [
      'Gestión de órdenes de corte',
      'Gestión de órdenes de reconexión',
      'Ejecutar cortes',
      'Ejecutar reconexiones',
      'Evidencia fotográfica',
    ],
  },
  {
    icon: Gauge,
    title: 'Gestión integral de medidores',
    text: 'Más que una lectura. Convierta los datos en decisiones.',
    items: [
      'Catálogo completo de medidores',
      'Historial de consumos',
      'Registro de lecturas',
      'Ubicación geográfica',
      'Visualización en mapas',
      'Tendencias de consumo',
      'Seguimiento histórico',
    ],
  },
  {
    icon: HardHat,
    title: 'Control total de las cuadrillas',
    text: 'Auditoría completa de cada acción realizada.',
    items: [
      'GPS exacto',
      'Fotografías',
      'Fecha y hora',
      'Técnico responsable',
      'Observaciones de campo',
    ],
  },
  {
    icon: RouteIcon,
    title: 'Optimización inteligente de rutas',
    items: [
      'Latitud y longitud de cada servicio',
      'Ubicación geográfica de clientes',
      'Agrupación operativa por zonas',
      'Asignación de cuadrillas',
      'Planificación inteligente',
    ],
  },
  {
    icon: MapPin,
    title: 'Visualización geográfica inteligente',
    text: 'Vea toda su operación sobre mapas interactivos.',
    items: [
      'Clientes',
      'Medidores',
      'Cuadrillas',
      'Zonas de atención',
      'Sectores con mayor morosidad',
      'Concentración de órdenes',
      'Cobertura territorial',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Inteligencia de negocio para la gerencia',
    text: 'No solo administra operaciones: obtiene información estratégica.',
    items: [
      'Cortes realizados por día',
      'Reconexiones realizadas',
      'Técnicos más productivos',
      'Órdenes pendientes',
      'Rendimiento por zona',
      'Consumo promedio',
    ],
  },
]

const tracxia: Capability[] = [
  {
    icon: QrCode,
    title: 'Códigos QR para trazabilidad total',
    text: 'Acceda a toda la información con un solo escaneo.',
    items: [
      'Identificación inmediata',
      'Información centralizada',
      'Trazabilidad completa',
    ],
  },
  {
    icon: Camera,
    title: 'Evidencia en cada etapa',
    text: 'Cosechas, inspecciones, inventarios, empaque, distribución y entregas quedan respaldados con códigos QR, geolocalización, firmas digitales y evidencia fotográfica.',
    items: ['Geolocalización', 'Firmas digitales', 'Evidencia fotográfica'],
  },
  {
    icon: ShieldCheck,
    title: 'Calidad y certificaciones',
    text: 'Facilita el cumplimiento de certificaciones internacionales.',
    items: ['Inspecciones de calidad'],
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards y analítica avanzada',
    text: 'Transforme datos en decisiones.',
    items: [
      'Reportes ejecutivos',
      'Indicadores en tiempo real',
      'Toma de decisiones basada en datos',
    ],
  },
  {
    icon: BellRing,
    title: 'Alertas automáticas',
    text: 'Anticípese a los problemas antes de que ocurran.',
  },
  {
    icon: Scale,
    title: 'Control de pesaje y mermas',
    text: 'Información precisa para una mejor gestión.',
    items: [
      'Mayor precisión',
      'Menor desperdicio',
      'Información confiable para la toma de decisiones',
    ],
  },
]

const navastay: Capability[] = [
  {
    icon: Wallet,
    span: 2,
    title: 'Finanzas del condominio',
    text: 'Mantenga las finanzas de su condominio organizadas y siempre al día.',
    items: [
      'Administrar cuotas de mantenimiento',
      'Emitir recibos',
      'Registrar pagos',
      'Consultar estados de cuenta',
      'Comparar el presupuesto con la ejecución',
      'Facturación y pagos',
    ],
  },
  {
    icon: CalendarDays,
    span: 1,
    title: 'Reservas de áreas comunes',
    text: 'Los residentes pueden consultar disponibilidad y reservar espacios de forma rápida y sencilla.',
  },
  {
    icon: KeyRound,
    span: 1,
    title: 'Control de accesos',
    text: 'Lleve un registro completo de todos los ingresos.',
    items: ['Mayor seguridad para los residentes'],
  },
  {
    icon: Wrench,
    span: 1,
    title: 'Mantenimiento de activos',
    text: 'Controle los mantenimientos de activos de su condominio en óptimas condiciones.',
  },
  {
    icon: MessageSquare,
    span: 1,
    title: 'Comunicación con los residentes',
    text: 'Una buena administración comienza con una buena comunicación.',
    items: ['Más comunicación', 'Más organización'],
  },
]

const ordexia: Capability[] = [
  {
    icon: ShoppingCart,
    span: 2,
    title: 'Pedidos digitales en tiempo real',
    text: 'Los vendedores registran los pedidos directamente desde su dispositivo móvil y la información queda disponible para la operación.',
    items: ['Información del cliente', 'Detalles del pedido', 'Observaciones'],
  },
  {
    icon: LayoutDashboard,
    span: 1,
    title: 'Resumen del día',
    items: [
      'Pedidos',
      'Cobros',
      'Clientes',
      'Rutas',
      'Ventas del día',
      'Visita a cliente',
      'Pedido creado',
      'Cobro registrado',
    ],
  },
  {
    icon: Users,
    span: 1,
    title: 'Clientes',
    items: ['Crédito disponible', 'Clientes en la ruta'],
  },
  {
    icon: Banknote,
    span: 1,
    title: 'Cobros',
    items: ['Total cobrado', 'Cobro registrado en cada visita'],
  },
  {
    icon: RouteIcon,
    span: 1,
    title: 'Rutas',
    text: 'La transformación digital no comienza en la oficina: comienza en la ruta.',
    items: ['Ruta del día', 'Pedido, cobro y cliente en cada visita'],
  },
]

const factxia: Capability[] = [
  {
    icon: FileText,
    span: 2,
    title: "Facturación",
    text: "Facturas y tiquetes electrónicos, de contado o a crédito.",
    items: ["En colones o dólares", "Con descuentos", "Tratamiento de impuestos"],
  },
  {
    icon: FileDiff,
    span: 1,
    title: "Notas de ajuste",
    text: "Notas de crédito y débito relacionadas con los comprobantes originales.",
  },
  {
    icon: Users,
    span: 1,
    title: "Clientes y proveedores",
    text: "Registrar, buscar y actualizar identificaciones, contactos y ubicación.",
  },
  {
    icon: Package,
    span: 1,
    title: "Productos y servicios",
    text: "Mantener códigos internos, CABYS, unidades de medida, precios e impuestos.",
  },
  {
    icon: FileSignature,
    span: 1,
    title: "Proformas",
    text: "Preparar cotizaciones, generar su PDF, enviarlas y convertirlas en factura mediante confirmación.",
  },
  {
    icon: CalendarClock,
    span: 1,
    title: "Recurrencias",
    text: "Programar borradores internos mensuales y consultar su historial.",
  },
  {
    icon: FileCheck,
    span: 2,
    title: "Aceptación de XML",
    text: "Preparar, firmar y enviar respuestas de aceptación total, parcial o rechazo de los comprobantes recibidos.",
  },
  {
    icon: Wallet,
    span: 2,
    title: "Cobros y recibos",
    text: "Registrar abonos o pagos completos, y consultar saldos y vencimientos.",
    items: ["Recibos", "Estados de cuenta"],
  },
  {
    icon: Search,
    span: 1,
    title: "Consultas y reportes",
    text: "Buscar documentos, consultar estados ante Hacienda y revisar facturas y cobros mediante filtros.",
  },
  {
    icon: Settings,
    span: 3,
    title: "Administración",
    text: "Configurar empresas, usuarios, accesos y permisos mediante las herramientas autorizadas para cada tipo de usuario.",
  },
];

const acadxia: Capability[] = [
  {
    icon: School,
    span: 1,
    title: "Gestión de instituciones",
    text: "Alta de la institución junto con su administrador.",
    items: ["Tipo: escuela, colegio o instituto", "Período: trimestre, cuatrimestre, semestre o anual"],
  },
  {
    icon: BookOpen,
    span: 1,
    title: "Estructura académica",
    items: [
      "Niveles: grado, carrera o curso general",
      "Períodos",
      "Secciones",
      "Materias, incluidas las extracurriculares",
    ],
  },
  {
    icon: Users,
    span: 1,
    title: "Usuarios y personas",
    text: "Alta y edición de administradores, instructores, estudiantes y encargados.",
    items: ["Encargados asignados a estudiantes menores de edad", "Búsqueda de estudiantes"],
  },
  {
    icon: ClipboardCheck,
    span: 2,
    title: "Matrícula",
    text: "Con cupos y rangos de materias u optativas configurables.",
    items: [
      "Instituto: el estudiante elige materia y grupo",
      "Escuela y colegio: matrícula por nivel con optativas",
      "Retiro de materias u optativas pendientes",
      "Apertura o cierre de la matrícula por período",
      "Activación por el administrador una vez verificado el pago",
      "Próximamente: validación de prerrequisitos de materias",
    ],
  },
  {
    icon: CalendarClock,
    span: 1,
    title: "Grupos",
    text: "Asignación de instructor, horario y cupo máximo.",
  },
  {
    icon: Award,
    span: 2,
    title: "Evaluación",
    text: "Componentes con porcentaje por grupo, registro de notas por el instructor y cálculo de la nota final.",
    items: [
      "Nota mínima de aprobación configurable por institución",
      "El estudiante consulta cada componente, su aporte, la nota final y su resultado",
    ],
  },
  {
    icon: UserCheck,
    span: 1,
    title: "Asistencia",
    text: "Registro por sesión como presente, ausente o justificado.",
    items: ["Historial para el instructor", "Consulta para el estudiante"],
  },
  {
    icon: FileSpreadsheet,
    span: 2,
    title: "Reportes",
    text: "Reportes interactivos con filtros, orden y búsqueda.",
    items: ["Descarga en CSV, Excel y PDF"],
  },
  {
    icon: Mail,
    span: 1,
    title: "Correos automáticos",
    text: "Notificaciones con la imagen de marca, como la recuperación de contraseña.",
  },
];

export const productDetails: Record<ProductSlug, ProductDetail> = {
  gridxia: {
    kicker: 'Operación de campo',
    heroTagline:
      'La tecnología que convierte su operación en una ventaja competitiva.',
    mockupMenu: ['Órdenes', 'Medidores', 'Cuadrillas', 'Zonas', 'Reportes'],
    problem: {
      intro:
        'La pregunta que todos los administradores se hacen es «¿realmente fueron al lugar?». Y cada kilómetro innecesario significa más combustible, más tiempo y menos órdenes atendidas.',
      audience: 'Pensado para: administradores, técnicos de campo y gerencia.',
      pairs: [
        {
          before: 'La duda de si la cuadrilla realmente fue al lugar',
          after:
            'Auditoría completa de cada acción: GPS exacto, fotografías, fecha y hora, técnico responsable y observaciones de campo',
        },
        {
          before:
            'Kilómetros innecesarios: más combustible, más tiempo y menos órdenes atendidas',
          after:
            'Rutas optimizadas con planificación inteligente por zonas y cuadrillas',
        },
        {
          before:
            'Procesos dispersos, múltiples sistemas y pérdida de información',
          after: 'Todo centralizado en una sola plataforma',
        },
        {
          before: 'Decisiones basadas en suposiciones',
          after: 'Decisiones basadas en datos',
        },
      ],
    },
    capabilities: gridxia,
    surfacesTitle: 'Todo en una sola plataforma',
    surfaces: [
      {
        icon: Smartphone,
        name: 'Aplicación móvil para trabajo de campo',
        tagline: 'Una herramienta diseñada para el técnico.',
        items: [
          'Ver sus órdenes asignadas',
          'Navegar con Google Maps o Waze',
          'Ejecutar cortes',
          'Ejecutar reconexiones',
          'Registrar lecturas',
          'Capturar fotografías',
          'Registrar observaciones',
          'Reportar incidencias',
        ],
        closing: 'Todo desde una sola aplicación',
      },
      {
        icon: Monitor,
        name: 'Portal administrativo web',
        tagline:
          'Sin procesos dispersos, sin múltiples sistemas, sin pérdida de información.',
        items: [
          'Clientes',
          'Medidores',
          'Tarifas',
          'Cuadrillas',
          'Técnicos',
          'Zonas',
          'Órdenes',
          'Reportes',
          'Configuración operativa',
          'Cargas masivas mediante Excel',
        ],
        closing: 'Todo centralizado en una sola plataforma',
      },
    ],
    steps: [
      {
        title: 'Se configura en el portal',
        text: 'Desde el portal administrativo web se gestionan clientes, medidores, tarifas, cuadrillas, técnicos, zonas y la configuración operativa, con cargas masivas mediante Excel.',
      },
      {
        title: 'Se asignan órdenes y rutas',
        text: 'Las órdenes de corte y reconexión se asignan a las cuadrillas con planificación inteligente, agrupación por zonas y rutas optimizadas.',
      },
      {
        title: 'El técnico ejecuta en campo',
        text: 'Desde la aplicación móvil ve sus órdenes, navega con Google Maps o Waze, ejecuta cortes y reconexiones, registra lecturas y captura fotografías y observaciones.',
      },
      {
        title: 'La gerencia decide con datos',
        text: 'Cada acción queda auditada con GPS, fotografías, fecha y hora y técnico responsable, y alimenta indicadores y mapas para tomar decisiones basadas en datos.',
      },
    ],
    benefits: {
      title: 'Lo que obtiene con Gridxia',
      items: [
        'Operación digitalizada',
        'Optimización de rutas',
        'Geolocalización',
        'Evidencia fotográfica',
        'Gestión de cuadrillas',
        'Gestión de medidores',
        'Control de cortes y reconexiones',
        'Dashboard gerencial',
        'Inteligencia operacional',
        'Escalabilidad futura',
      ],
      savings: {
        title: 'Beneficios económicos inmediatos',
        lead: 'Reducción de costos',
        items: [
          'Menos combustible',
          'Menos tiempo improductivo',
          'Menos papel',
          'Menos errores administrativos',
          'Menos reclamos sin evidencia',
          'Menos desplazamientos innecesarios',
        ],
        closing: 'Más rentabilidad operativa',
      },
    },
    faqs: [
      {
        question: '¿Cómo sé que la cuadrilla realmente fue al lugar?',
        answer:
          'Gridxia registra una auditoría completa de cada acción realizada: GPS exacto, fotografías, fecha y hora, técnico responsable y observaciones de campo.',
      },
      {
        question: '¿Qué puede hacer el técnico desde la aplicación móvil?',
        answer:
          'Ver sus órdenes asignadas, navegar con Google Maps o Waze, ejecutar cortes y reconexiones, registrar lecturas, capturar fotografías, registrar observaciones y reportar incidencias, todo desde una sola aplicación.',
      },
      {
        question: '¿Qué se administra desde el portal web?',
        answer:
          'Clientes, medidores, cuadrillas, tarifas, técnicos, zonas, órdenes, reportes y la configuración operativa, además de cargas masivas mediante Excel.',
      },
      {
        question: '¿Cómo ayuda a reducir costos?',
        answer:
          'Con menos combustible, menos tiempo improductivo, menos papel, menos errores administrativos, menos reclamos sin evidencia y menos desplazamientos innecesarios.',
      },
    ],
    ecosystem: {
      kicker: 'Operación de campo',
      blurb:
        'Órdenes de corte y reconexión, lectura de medidores, cuadrillas y rutas, con geolocalización y evidencia fotográfica.',
    },
  },

  tracxia: {
    kicker: 'Trazabilidad agroindustrial',
    heroTagline:
      'Plataforma SaaS de trazabilidad agroindustrial para controlar todo el ciclo de vida de los productos, desde la finca hasta el consumidor final.',
    mockupMenu: ['Cosechas', 'Lotes', 'Bodegas', 'Transporte', 'Calidad'],
    capabilities: tracxia,
    surfacesTitle: 'Cuatro módulos en una sola solución',
    surfaces: [
      {
        icon: Factory,
        name: 'Gestión de producción (MES)',
        tagline: 'Seguimiento automático durante todo el ciclo operativo.',
        items: [
          'Gestión de cosechas',
          'Lotes identificados',
          'Estados: registrado, procesado y cerrado',
          'Empaque',
          'Flujo automatizado',
        ],
      },
      {
        icon: Warehouse,
        name: 'Administración de bodegas (WMS)',
        tagline: 'Control de inventario en tiempo real.',
        items: [
          'Inventarios',
          'Inventario actualizado',
          'Control por ubicación',
          'Mayor eficiencia operativa',
        ],
      },
      {
        icon: Truck,
        name: 'Logística de transporte (TMS)',
        tagline: 'Control total de rutas y entregas.',
        items: [
          'Seguimiento de rutas',
          'Control de entregas',
          'Historial de distribución',
          'Geolocalización',
        ],
      },
      {
        icon: QrCode,
        name: 'Trazabilidad alimentaria',
        tagline:
          'Toda la información centralizada desde el inicio del proceso.',
        items: [
          'Registro y control de origen',
          'Historial completo',
          'Registro de ubicaciones',
          'Códigos QR',
          'Inspecciones de calidad',
        ],
      },
    ],
    stepsTitle: 'Trazabilidad de principio a fin',
    steps: [
      {
        title: 'Origen',
        text: 'Desde la finca: toda la información centralizada desde el inicio del proceso, con cosechas, historial completo y registro de ubicaciones.',
      },
      {
        title: 'Proceso',
        text: 'Seguimiento automático de lotes y producción, con inspecciones de calidad, empaque y estados registrado, procesado y cerrado.',
      },
      {
        title: 'Distribución',
        text: 'Seguimiento de rutas, control de entregas e historial de distribución, con geolocalización, firmas digitales y evidencia fotográfica.',
      },
      {
        title: 'Cliente',
        text: 'Hasta el consumidor final: con un solo escaneo de un código QR se accede a toda la información.',
      },
    ],
    benefits: {
      title: 'Lo que obtiene con Tracxia',
      items: [
        'Control de todo el ciclo de vida de los productos, de la finca al consumidor final',
        'Producción, bodegas, transporte y trazabilidad en una sola solución',
        'Cumplimiento de certificaciones internacionales más fácil',
        'Mejor eficiencia operativa',
        'Información en tiempo real para decidir con datos',
        'Historial completo de movimientos',
        'Mayor transparencia y control',
        'Menor desperdicio y mayor precisión',
      ],
    },
    faqs: [
      {
        question: '¿Qué es Tracxia?',
        answer:
          'Una plataforma SaaS de trazabilidad agroindustrial diseñada para controlar todo el ciclo de vida de los productos, desde la finca hasta el consumidor final.',
      },
      {
        question: '¿Qué significan MES, WMS y TMS?',
        answer:
          'Son los módulos que Tracxia integra en una sola solución: gestión de producción (MES), administración de bodegas (WMS) y logística de transporte (TMS), junto con la trazabilidad alimentaria.',
      },
      {
        question: '¿Qué se puede gestionar con Tracxia?',
        answer:
          'Cosechas, inspecciones de calidad, inventarios, empaque, distribución y entregas, con lotes que pasan por los estados registrado, procesado y cerrado.',
      },
      {
        question: '¿Cómo se respalda cada etapa?',
        answer:
          'Con códigos QR, geolocalización, firmas digitales y evidencia fotográfica. Con un solo escaneo se accede a toda la información.',
      },
      {
        question: '¿Ayuda con las certificaciones internacionales?',
        answer:
          'La plataforma facilita el cumplimiento de certificaciones internacionales.',
      },
      {
        question: '¿Avisa si algo sale mal?',
        answer:
          'Cuenta con alertas automáticas para anticiparse a los problemas antes de que ocurran.',
      },
    ],
    ecosystem: {
      kicker: 'Trazabilidad agroindustrial',
      blurb:
        'Plataforma SaaS de trazabilidad: producción, bodegas, transporte y trazabilidad alimentaria, de la finca al consumidor final.',
    },
  },

  navastay: {
    kicker: 'Administración de condominios',
    heroTagline: 'Todo su condominio en una sola plataforma.',
    mockupMenu: [
      'Cuotas',
      'Estados de cuenta',
      'Reservas',
      'Accesos',
      'Mantenimientos',
    ],
    mockupDevice: 'phone',
    capabilities: navastay,
    steps: [
      {
        title: 'La administración organiza las finanzas',
        text: 'Administra las cuotas de mantenimiento, emite recibos, registra pagos y compara el presupuesto con la ejecución.',
      },
      {
        title: 'Los residentes consultan y reservan',
        text: 'Consultan la disponibilidad de las áreas comunes y reservan espacios de forma rápida y sencilla.',
      },
      {
        title: 'Accesos y mantenimientos quedan registrados',
        text: 'Se lleva un registro completo de todos los ingresos y se controlan los mantenimientos de activos del condominio.',
      },
      {
        title: 'Todos se comunican en un solo lugar',
        text: 'Más comunicación, más organización, y la administración del condominio disponible desde cualquier lugar.',
      },
    ],
    benefits: {
      title: 'Todo lo que necesita para una administración eficiente',
      items: [
        'Finanzas del condominio organizadas y siempre al día',
        'Reservas de espacios de forma rápida y sencilla',
        'Mayor seguridad para los residentes',
        'Mantenimientos de activos en óptimas condiciones',
        'Más comunicación, más organización',
        'Administración desde cualquier lugar',
      ],
    },
    faqs: [
      {
        question: '¿Qué se puede administrar con NavaStay?',
        answer:
          'Las cuotas de mantenimiento, los estados de cuenta, la facturación y los pagos, las reservas de áreas comunes, el control de accesos, los mantenimientos y la comunicación con los residentes, todo desde una sola plataforma.',
      },
      {
        question: '¿Cómo se manejan las finanzas del condominio?',
        answer:
          'Se pueden administrar las cuotas de mantenimiento, emitir recibos, registrar pagos, consultar estados de cuenta y comparar el presupuesto con la ejecución.',
      },
      {
        question: '¿Cómo reservan los residentes las áreas comunes?',
        answer:
          'Pueden consultar la disponibilidad y reservar espacios de forma rápida y sencilla.',
      },
      {
        question: '¿Cómo se controla el acceso al condominio?',
        answer:
          'Se lleva un registro completo de todos los ingresos, lo que da mayor seguridad a los residentes.',
      },
      {
        question: '¿Puedo administrar el condominio desde cualquier lugar?',
        answer:
          'Sí. NavaStay permite administrar el condominio desde cualquier lugar.',
      },
    ],
    ecosystem: {
      kicker: 'Administración de condominios',
      blurb:
        'Finanzas, reservas de áreas comunes, control de accesos, mantenimientos y comunicación con los residentes, en una sola plataforma.',
    },
  },

  ordexia: {
    kicker: 'Fuerza de ventas',
    logo: '/images/ordexia-icon.png',
    heroTagline:
      'La plataforma que impulsa a su equipo de ventas en cada visita.',
    mockupMenu: ['Pedidos', 'Cobros', 'Clientes', 'Rutas', 'Ventas'],
    mockupDevice: 'phone',
    problem: {
      intro:
        '¿Sus vendedores aún toman pedidos en papel, WhatsApp o llamadas? Dele a su equipo las herramientas que necesita para trabajar de forma más ágil y organizada.',
      audience: 'Pensado para: la fuerza de ventas y la operación en oficina.',
      pairs: [
        {
          before: 'Anotar el pedido en papel, WhatsApp o llamadas',
          after:
            'Los vendedores registran los pedidos directamente desde su dispositivo móvil',
        },
        {
          before: 'Anotar, enviar, digitar y esperar',
          after: 'De la visita al pedido en segundos',
        },
        {
          before: 'Más errores, más lentitud, menos control',
          after: 'Menos errores. Más velocidad. Más control.',
        },
      ],
    },
    capabilities: ordexia,
    surfacesTitle: 'Todo dentro de una operación más organizada y centralizada',
    surfaces: [
      {
        icon: Smartphone,
        name: 'Aplicación para el vendedor',
        tagline:
          'La plataforma que impulsa a su equipo de ventas en cada visita.',
        items: [
          'Pedidos',
          'Cobros',
          'Clientes',
          'Rutas',
          'Ventas del día',
          'Actividades del día',
        ],
      },
      {
        icon: Monitor,
        name: 'Oficina y operación',
        tagline: 'La oficina mantiene el control.',
        items: [
          'Pedidos digitales en tiempo real',
          'La información fluye desde la ruta',
          'Información disponible para la operación',
        ],
      },
    ],
    stepsTitle: 'De la visita al pedido en segundos',
    steps: [
      {
        title: 'El vendedor registra',
        text: 'Registra el pedido directamente desde su dispositivo móvil.',
      },
      {
        title: 'La información fluye',
        text: 'El pedido queda registrado en tiempo real.',
      },
      {
        title: 'La oficina mantiene el control',
        text: 'La información queda disponible para la operación.',
      },
    ],
    benefits: {
      title: 'Menos errores. Más velocidad. Más control.',
      items: [
        'Pedidos registrados desde el dispositivo móvil',
        'Pedidos digitales en tiempo real',
        'Información disponible para la operación',
        'Una operación más organizada y centralizada',
        'Pedido, cobro y cliente en cada visita',
        'Un equipo que trabaja de forma más ágil y organizada',
      ],
    },
    faqs: [
      {
        question: '¿Cómo registran los pedidos los vendedores?',
        answer:
          'Directamente desde su dispositivo móvil, y la información queda disponible para la operación.',
      },
      {
        question: '¿Qué cambia frente al proceso tradicional?',
        answer:
          'El proceso tradicional implica anotar, enviar, digitar y esperar. Con Ordexia el pedido queda registrado directamente en la plataforma, de la visita al pedido en segundos.',
      },
      {
        question: '¿Qué ve el vendedor en la aplicación?',
        answer:
          'Un resumen del día con pedidos, cobros, clientes y rutas, además de las ventas del día y las actividades: visitas a clientes, pedidos creados y cobros registrados.',
      },
      {
        question: '¿Qué controla la oficina?',
        answer:
          'La información fluye desde la ruta en tiempo real y la oficina mantiene el control de la operación.',
      },
    ],
    ecosystem: {
      kicker: 'Fuerza de ventas',
      blurb:
        'Pedidos, cobros, clientes y rutas desde el móvil del vendedor, con la información disponible para la operación en tiempo real.',
    },
  },

  factxia: {
    kicker: "Facturación electrónica",
    heroTagline:
      "Reúne la facturación electrónica y la gestión comercial de las empresas que trabajan con comprobantes de Costa Rica.",
    mockupMenu: ["Facturación", "Clientes", "Proformas", "Cobros", "Reportes"],
    problem: {
      intro:
        "Cuando una empresa lleva sus clientes, facturas, cotizaciones y cobros en archivos o controles separados, la información se dispersa. Factxia reúne esos procesos para reducir la digitación repetida y facilitar la consulta de cada operación.",
      audience: "Pensado para: empresas que trabajan con comprobantes electrónicos de Costa Rica.",
      pairs: [
        {
          before: "Clientes, facturas, cotizaciones y cobros en archivos o controles separados",
          after: "Esos procesos reunidos en una sola plataforma",
        },
        {
          before: "Digitación repetida",
          after: "Datos registrados que se reutilizan, con los importes calculados",
        },
        {
          before: "Documentos enviados a Hacienda sin seguimiento",
          after: "Seguimiento de los documentos enviados a Hacienda",
        },
        {
          before: "Ventas pendientes de pago sin identificar",
          after: "Abonos, saldos y vencimientos a la vista",
        },
      ],
    },
    capabilities: factxia,
    stepsTitle: "Operación diaria",
    steps: [
      {
        title: "Seleccionar el cliente",
        text: "El usuario elige al cliente entre los registrados de su empresa.",
      },
      {
        title: "Agregar productos o servicios",
        text: "Se agregan del catálogo, con sus códigos internos, CABYS, unidades de medida, precios e impuestos.",
      },
      {
        title: "Revisar los importes",
        text: "Se revisan cantidades, precios, descuentos e impuestos antes de emitir.",
      },
      {
        title: "Confirmar la emisión",
        text: "El sistema genera el comprobante electrónico en XML, lo firma y lo envía a Hacienda.",
      },
      {
        title: "Consultar Hacienda",
        text: "Se consulta la respuesta de Hacienda y el estado del documento.",
      },
      {
        title: "Entregar los documentos",
        text: "Se obtiene el PDF y se gestiona su envío por correo.",
      },
      {
        title: "Registrar y controlar el cobro",
        text: "Se registran abonos o pagos completos y se controlan saldos y vencimientos. La aceptación de Hacienda y el pago son estados distintos.",
      },
    ],
    benefits: {
      title: "Lo que obtiene con Factxia",
      items: [
        "Ahorro de tiempo: reutiliza los datos registrados y calcula los importes de los documentos",
        "Mayor orden: concentra la información comercial, los comprobantes y los cobros",
        "Seguimiento del dinero pendiente: muestra abonos, saldos y vencimientos",
        "Menos errores operativos: incorpora validaciones y controles contra registros duplicados",
        "Acceso desde distintos dispositivos: los clientes trabajan mediante la web",
        "Trazabilidad: conserva documentos e historiales para consultar lo ocurrido",
        "Administración de varias empresas: mantiene separados sus datos y accesos",
      ],
    },
    faqs: [
      {
        question: "¿Cómo se emite una factura?",
        answer:
          "El usuario selecciona al cliente, agrega productos o servicios y revisa cantidades, precios, descuentos e impuestos. Al confirmar la emisión, el sistema genera el comprobante electrónico en XML, lo firma y lo envía a Hacienda. Después permite consultar la respuesta, obtener el PDF y gestionar su envío por correo.",
      },
      {
        question: "¿Una factura aceptada por Hacienda ya está pagada?",
        answer:
          "No. La aceptación de Hacienda y el pago son estados distintos: una factura aceptada todavía puede tener un saldo pendiente de cobro.",
      },
      {
        question: "¿Necesito instalar una aplicación?",
        answer:
          "No. Los clientes usan la aplicación web desde el navegador de una computadora, una tableta o un teléfono, y la interfaz se adapta a pantallas pequeñas. No requiere instalar una aplicación nativa.",
      },
      {
        question: "¿Qué hace falta para empezar a facturar?",
        answer:
          "Navasoft prepara la instalación y se crea la empresa con sus usuarios. Luego se completa la configuración fiscal (identificación, razón social, ubicación, actividades económicas, acceso a Hacienda, certificado de firma y PIN), se registran los datos comerciales, se habilita el correo, se valida todo en pruebas y, por último, se habilita producción.",
      },
      {
        question: "¿Se pueden administrar varias empresas?",
        answer:
          "Sí. Cada empresa mantiene separados sus usuarios, clientes, productos y documentos, con separación de datos y accesos.",
      },
      {
        question: "¿Qué pasa con las facturas que recibo de mis proveedores?",
        answer:
          "Se conservan las facturas recibidas de proveedores, y se pueden preparar, firmar y enviar respuestas de aceptación total, parcial o rechazo.",
      },
    ],
    ecosystem: {
      kicker: "Facturación electrónica",
      blurb:
        "Facturación electrónica y gestión comercial para empresas que trabajan con comprobantes de Costa Rica: facturas, proformas, cobros y reportes.",
    },
  },

  acadxia: {
    kicker: "Gestión académica",
    heroTagline: "Plataforma web de gestión académica para escuelas, colegios e institutos.",
    heroVisual: "mockup", // todavía no hay foto del producto; el tablero ilustrativo usa los módulos reales
    mockupMenu: ["Matrícula", "Grupos", "Calificaciones", "Asistencia", "Reportes"],
    problem: {
      intro:
        "Muchas instituciones educativas pequeñas y medianas llevan la matrícula, las notas y la asistencia en Excel, en papel o en sistemas costosos y rígidos. Esto provoca errores, doble matrícula, notas inconsistentes y poco control.",
      audience: "Pensado para: escuelas, colegios e institutos.",
      pairs: [
        {
          before: "Matrícula en Excel o en papel, con doble matrícula",
          after: "Matrícula con cupos y rangos de materias u optativas configurables",
        },
        {
          before: "Notas inconsistentes",
          after: "Calificaciones con componentes de evaluación y porcentajes por grupo",
        },
        {
          before: "Poco control de la asistencia",
          after: "Asistencia registrada por sesión",
        },
        {
          before: "Depender de papeles y de consultas al personal",
          after: "Información disponible para estudiantes y encargados",
        },
      ],
    },
    capabilities: acadxia,
    surfacesTitle: "Una plataforma, cuatro perfiles",
    surfaces: [
      {
        icon: UserCog,
        name: "Administrador de la institución",
        tagline: "Gestiona el portal de su institución.",
        items: [
          "Configura niveles, períodos, secciones y materias",
          "Da de alta instructores, estudiantes y encargados",
          "Arma los grupos con instructor, horario y cupo",
          "Define las reglas de matrícula y la nota mínima",
          "Activa la matrícula una vez verificado el pago",
          "Busca estudiantes",
        ],
      },
      {
        icon: Presentation,
        name: "Instructor",
        tagline: "Maneja la parte académica de sus grupos.",
        items: [
          "Registra las notas de cada componente de evaluación",
          "Registra la asistencia por sesión",
          "Consulta el historial de asistencia",
        ],
      },
      {
        icon: GraduationCap,
        name: "Estudiante",
        tagline: "Consulta sus asistencias y notas y, si es mayor de edad, se matricula.",
        items: [
          "Se matricula (si es mayor de edad)",
          "Consulta cada componente, su aporte, la nota final y su resultado",
          "Consulta su asistencia",
        ],
      },
      {
        icon: HeartHandshake,
        name: "Encargado",
        tagline: "Da seguimiento al estudiante menor de edad a su cargo.",
        items: [
          "Información del estudiante a su cargo",
          "Sin depender de papeles ni de consultas al personal",
        ],
      },
    ],
    stepsTitle: "Cómo se incorpora una institución",
    steps: [
      {
        title: "Acuerdo comercial",
        text: "Se acuerdan las condiciones y se reúnen los datos del cliente: nombre, cédula jurídica, correo, tipo de institución y tipo de período.",
      },
      {
        title: "Alta de la institución",
        text: "Navasoft registra la institución y su administrador en un solo paso, y las credenciales se entregan por un canal aparte.",
      },
      {
        title: "Configuración",
        text: "El administrador configura niveles y períodos, secciones y materias, usuarios, grupos, reglas de matrícula y componentes de evaluación.",
      },
      {
        title: "Apertura de la matrícula",
        text: "Se abre la matrícula del período; el estudiante se matricula y queda pendiente de pago.",
      },
      {
        title: "Verificación del pago",
        text: "El pago se gestiona fuera de Acadxia y se confirma por correo. Con la confirmación, el administrador activa la matrícula.",
      },
      {
        title: "Operación continua",
        text: "El instructor registra notas y asistencia, estudiantes y encargados consultan su información y, al final, se cierra el período.",
      },
    ],
    benefits: {
      title: "Lo que obtiene con Acadxia",
      items: [
        "Menos errores y menos trabajo manual: las reglas de matrícula, cupos y evaluación se aplican solas",
        "Información centralizada, disponible desde cualquier lugar con un navegador",
        "Seguridad: contraseñas cifradas, acceso por roles y datos separados por institución",
        "Sin inversión en infraestructura: solo se necesita internet y un navegador",
        "Configurable a distintos tipos de institución y de período",
        "Reportes listos para usar, exportables a Excel, PDF y CSV",
        "Seguimiento por parte de los encargados de los estudiantes menores de edad",
        "Costo predecible con el modelo de suscripción y mejoras continuas sin costo de instalación",
      ],
    },
    faqs: [
      {
        question: "¿Necesito instalar algo?",
        answer:
          "No. Acadxia se usa desde el navegador, sin instalar nada en el equipo, y su diseño se adapta a computadora, tablet y celular. Solo se necesita conexión a internet. No es una aplicación nativa de Android ni de iOS.",
      },
      {
        question: "¿Cómo se mantienen separados los datos de cada institución?",
        answer:
          "Cada institución dispone de un espacio independiente. El sistema valida que instructores, estudiantes y secciones pertenezcan a la misma institución, de modo que una institución nunca ve ni mezcla datos con otra.",
      },
      {
        question: "¿Cómo se accede a la plataforma?",
        answer:
          "Los usuarios inician sesión con su correo o su cédula, con contraseñas cifradas y recuperación por un enlace de un solo uso enviado al correo. Cada persona ve solo lo que le corresponde según su perfil.",
      },
      {
        question: "¿Cómo funciona la matrícula?",
        answer:
          "En un instituto, el estudiante elige materia y grupo; en escuelas y colegios, la matrícula es por nivel con optativas. Queda pendiente de pago y el administrador la activa una vez verificado el pago.",
      },
      {
        question: "¿Cómo se ofrece Acadxia?",
        answer:
          "Como un servicio por suscripción: no se instala por cliente, sino que a cada institución se le crea su propio espacio dentro de la plataforma. Las condiciones comerciales las define Navasoft.",
      },
      {
        question: "¿Qué pasa con las mejoras y los respaldos?",
        answer:
          "La base de datos cuenta con respaldos automáticos. Como todas las instituciones usan la misma plataforma, las mejoras y correcciones se publican una sola vez y llegan a todos sin instalar nada.",
      },
    ],
    ecosystem: {
      kicker: "Gestión académica",
      blurb:
        "Plataforma web de gestión académica para escuelas, colegios e institutos: instituciones, usuarios, matrícula, grupos, calificaciones y asistencia.",
    },
  },
}
