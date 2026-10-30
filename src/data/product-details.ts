import {
    Banknote,
    CalendarCheck,
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
    Plug,
    Power,
    Route as RouteIcon,
    ScrollText,
    ShoppingCart,
    Smartphone,
    TrendingUp,
    Truck,
    Users,
    Wallet,
    Wrench,
} from "lucide-react";
import type { Capability, ProductDetail, ProductSlug } from "@/types";

const demoAnswer =
    "Le mostramos el producto sobre su proceso, no sobre una demo genérica. Puede pedir una demostración o una reunión desde esta página.";

const baseFaqs = (name: string, who: string) => [
    { question: `¿Para quién es ${name}?`, answer: `Para ${who}` },
    { question: "¿Cómo puedo ver el producto?", answer: demoAnswer },
];

const gridxia: Capability[] = [
    {
        icon: Power,
        title: "Órdenes de corte y reconexión",
        items: [
            "Gestión de órdenes de corte",
            "Gestión de órdenes de reconexión",
            "Ejecutar cortes",
            "Ejecutar reconexiones",
            "Evidencia fotográfica",
        ],
    },
    {
        icon: Gauge,
        title: "Gestión integral de medidores",
        text: "Más que una lectura. Convierta los datos en decisiones.",
        items: [
            "Catálogo completo de medidores",
            "Historial de consumos",
            "Registro de lecturas",
            "Ubicación geográfica",
            "Visualización en mapas",
            "Tendencias de consumo",
            "Seguimiento histórico",
        ],
    },
    {
        icon: HardHat,
        title: "Control total de las cuadrillas",
        text: "Auditoría completa de cada acción realizada.",
        items: ["GPS exacto", "Fotografías", "Fecha y hora", "Técnico responsable", "Observaciones de campo"],
    },
    {
        icon: RouteIcon,
        title: "Optimización inteligente de rutas",
        items: [
            "Latitud y longitud de cada servicio",
            "Ubicación geográfica de clientes",
            "Agrupación operativa por zonas",
            "Asignación de cuadrillas",
            "Planificación inteligente",
        ],
    },
    {
        icon: MapPin,
        title: "Visualización geográfica inteligente",
        text: "Vea toda su operación sobre mapas interactivos.",
        items: [
            "Clientes",
            "Medidores",
            "Cuadrillas",
            "Zonas de atención",
            "Sectores con mayor morosidad",
            "Concentración de órdenes",
            "Cobertura territorial",
        ],
    },
    {
        icon: TrendingUp,
        title: "Inteligencia de negocio para la gerencia",
        text: "No solo administra operaciones: obtiene información estratégica.",
        items: [
            "Cortes realizados por día",
            "Reconexiones realizadas",
            "Técnicos más productivos",
            "Órdenes pendientes",
            "Rendimiento por zona",
            "Consumo promedio",
        ],
    },
];

const tracxia: Capability[] = [
    {
        icon: QrCode,
        title: "Códigos QR para trazabilidad total",
        text: "Acceda a toda la información con un solo escaneo.",
        items: ["Identificación inmediata", "Información centralizada", "Trazabilidad completa"],
    },
    {
        icon: Camera,
        title: "Evidencia en cada etapa",
        text: "Cosechas, inspecciones, inventarios, empaque, distribución y entregas quedan respaldados con códigos QR, geolocalización, firmas digitales y evidencia fotográfica.",
        items: ["Geolocalización", "Firmas digitales", "Evidencia fotográfica"],
    },
    {
        icon: ShieldCheck,
        title: "Calidad y certificaciones",
        text: "Facilita el cumplimiento de certificaciones internacionales.",
        items: ["Inspecciones de calidad"],
    },
    {
        icon: LayoutDashboard,
        title: "Dashboards y analítica avanzada",
        text: "Transforme datos en decisiones.",
        items: ["Reportes ejecutivos", "Indicadores en tiempo real", "Toma de decisiones basada en datos"],
    },
    {
        icon: BellRing,
        title: "Alertas automáticas",
        text: "Anticípese a los problemas antes de que ocurran.",
    },
    {
        icon: Scale,
        title: "Control de pesaje y mermas",
        text: "Información precisa para una mejor gestión.",
        items: ["Mayor precisión", "Menor desperdicio", "Información confiable para la toma de decisiones"],
    },
];

const navastay: Capability[] = [
    {
        icon: Wallet,
        span: 2,
        title: "Finanzas del condominio",
        text: "Mantenga las finanzas de su condominio organizadas y siempre al día.",
        items: [
            "Administrar cuotas de mantenimiento",
            "Emitir recibos",
            "Registrar pagos",
            "Consultar estados de cuenta",
            "Comparar el presupuesto con la ejecución",
            "Facturación y pagos",
        ],
    },
    {
        icon: CalendarDays,
        span: 1,
        title: "Reservas de áreas comunes",
        text: "Los residentes pueden consultar disponibilidad y reservar espacios de forma rápida y sencilla.",
    },
    {
        icon: KeyRound,
        span: 1,
        title: "Control de accesos",
        text: "Lleve un registro completo de todos los ingresos.",
        items: ["Mayor seguridad para los residentes"],
    },
    {
        icon: Wrench,
        span: 1,
        title: "Mantenimiento de activos",
        text: "Controle los mantenimientos de activos de su condominio en óptimas condiciones.",
    },
    {
        icon: MessageSquare,
        span: 1,
        title: "Comunicación con los residentes",
        text: "Una buena administración comienza con una buena comunicación.",
        items: ["Más comunicación", "Más organización"],
    },
];

const ordexia: Capability[] = [
    {
        icon: ShoppingCart,
        span: 2,
        title: "Pedidos digitales en tiempo real",
        text: "Los vendedores registran los pedidos directamente desde su dispositivo móvil y la información queda disponible para la operación.",
        items: ["Información del cliente", "Detalles del pedido", "Observaciones"],
    },
    {
        icon: LayoutDashboard,
        span: 1,
        title: "Resumen del día",
        items: [
            "Pedidos",
            "Cobros",
            "Clientes",
            "Rutas",
            "Ventas del día",
            "Visita a cliente",
            "Pedido creado",
            "Cobro registrado",
        ],
    },
    {
        icon: Users,
        span: 1,
        title: "Clientes",
        items: ["Crédito disponible", "Clientes en la ruta"],
    },
    {
        icon: Banknote,
        span: 1,
        title: "Cobros",
        items: ["Total cobrado", "Cobro registrado en cada visita"],
    },
    {
        icon: RouteIcon,
        span: 1,
        title: "Rutas",
        text: "La transformación digital no comienza en la oficina: comienza en la ruta.",
        items: ["Ruta del día", "Pedido, cobro y cliente en cada visita"],
    },
];

const factxia: Capability[] = [
    { icon: FileText, title: "Emisión de comprobantes", text: "Facturas, tiquetes, notas de crédito y débito listos para el flujo de Hacienda." },
    { icon: FileCheck, title: "Recepción y validación", text: "Lo que entra de proveedores queda aceptado, rechazado y archivado, no en un correo perdido." },
    { icon: Wallet, title: "Estados de cuenta", text: "El saldo del cliente se lee igual en oficina, en ruta y en tesorería." },
    { icon: ScrollText, title: "Bitácora tributaria", text: "Quién emitió, cuándo se aceptó y cuál XML corresponde: evidencia, no recuerdos." },
    { icon: Plug, title: "Integración con la operación", text: "Conecta con preventa, planta o el sistema a la medida que ya corre en Navasoft." },
    { icon: CalendarCheck, title: "Cierre de mes", text: "Reportes de emisión, pendientes y conciliación para contabilidad y gerencia." },
];

export const productDetails: Record<ProductSlug, ProductDetail> = {
    gridxia: {
        kicker: "Operación de campo",
        heroTagline: "La tecnología que convierte su operación en una ventaja competitiva.",
        mockupMenu: ["Órdenes", "Medidores", "Cuadrillas", "Zonas", "Reportes"],
        problem: {
            intro:
                "La pregunta que todos los administradores se hacen es «¿realmente fueron al lugar?». Y cada kilómetro innecesario significa más combustible, más tiempo y menos órdenes atendidas.",
            audience: "Pensado para: administradores, técnicos de campo y gerencia.",
            pairs: [
                {
                    before: "La duda de si la cuadrilla realmente fue al lugar",
                    after:
                        "Auditoría completa de cada acción: GPS exacto, fotografías, fecha y hora, técnico responsable y observaciones de campo",
                },
                {
                    before: "Kilómetros innecesarios: más combustible, más tiempo y menos órdenes atendidas",
                    after: "Rutas optimizadas con planificación inteligente por zonas y cuadrillas",
                },
                {
                    before: "Procesos dispersos, múltiples sistemas y pérdida de información",
                    after: "Todo centralizado en una sola plataforma",
                },
                {
                    before: "Decisiones basadas en suposiciones",
                    after: "Decisiones basadas en datos",
                },
            ],
        },
        capabilities: gridxia,
        surfacesTitle: "Todo en una sola plataforma",
        surfaces: [
            {
                icon: Smartphone,
                name: "Aplicación móvil para trabajo de campo",
                tagline: "Una herramienta diseñada para el técnico.",
                items: [
                    "Ver sus órdenes asignadas",
                    "Navegar con Google Maps o Waze",
                    "Ejecutar cortes",
                    "Ejecutar reconexiones",
                    "Registrar lecturas",
                    "Capturar fotografías",
                    "Registrar observaciones",
                    "Reportar incidencias",
                ],
                closing: "Todo desde una sola aplicación",
            },
            {
                icon: Monitor,
                name: "Portal administrativo web",
                tagline: "Sin procesos dispersos, sin múltiples sistemas, sin pérdida de información.",
                items: [
                    "Clientes",
                    "Medidores",
                    "Tarifas",
                    "Cuadrillas",
                    "Técnicos",
                    "Zonas",
                    "Órdenes",
                    "Reportes",
                    "Configuración operativa",
                    "Cargas masivas mediante Excel",
                ],
                closing: "Todo centralizado en una sola plataforma",
            },
        ],
        steps: [
            {
                title: "Se configura en el portal",
                text: "Desde el portal administrativo web se gestionan clientes, medidores, tarifas, cuadrillas, técnicos, zonas y la configuración operativa, con cargas masivas mediante Excel.",
            },
            {
                title: "Se asignan órdenes y rutas",
                text: "Las órdenes de corte y reconexión se asignan a las cuadrillas con planificación inteligente, agrupación por zonas y rutas optimizadas.",
            },
            {
                title: "El técnico ejecuta en campo",
                text: "Desde la aplicación móvil ve sus órdenes, navega con Google Maps o Waze, ejecuta cortes y reconexiones, registra lecturas y captura fotografías y observaciones.",
            },
            {
                title: "La gerencia decide con datos",
                text: "Cada acción queda auditada con GPS, fotografías, fecha y hora y técnico responsable, y alimenta indicadores y mapas para tomar decisiones basadas en datos.",
            },
        ],
        benefits: {
            title: "Lo que obtiene con Gridxia",
            items: [
                "Operación digitalizada",
                "Optimización de rutas",
                "Geolocalización",
                "Evidencia fotográfica",
                "Gestión de cuadrillas",
                "Gestión de medidores",
                "Control de cortes y reconexiones",
                "Dashboard gerencial",
                "Inteligencia operacional",
                "Escalabilidad futura",
            ],
            savings: {
                title: "Beneficios económicos inmediatos",
                lead: "Reducción de costos",
                items: [
                    "Menos combustible",
                    "Menos tiempo improductivo",
                    "Menos papel",
                    "Menos errores administrativos",
                    "Menos reclamos sin evidencia",
                    "Menos desplazamientos innecesarios",
                ],
                closing: "Más rentabilidad operativa",
            },
        },
        faqs: [
            {
                question: "¿Cómo sé que la cuadrilla realmente fue al lugar?",
                answer:
                    "Gridxia registra una auditoría completa de cada acción realizada: GPS exacto, fotografías, fecha y hora, técnico responsable y observaciones de campo.",
            },
            {
                question: "¿Qué puede hacer el técnico desde la aplicación móvil?",
                answer:
                    "Ver sus órdenes asignadas, navegar con Google Maps o Waze, ejecutar cortes y reconexiones, registrar lecturas, capturar fotografías, registrar observaciones y reportar incidencias, todo desde una sola aplicación.",
            },
            {
                question: "¿Qué se administra desde el portal web?",
                answer:
                    "Clientes, medidores, cuadrillas, tarifas, técnicos, zonas, órdenes, reportes y la configuración operativa, además de cargas masivas mediante Excel.",
            },
            {
                question: "¿Cómo ayuda a reducir costos?",
                answer:
                    "Con menos combustible, menos tiempo improductivo, menos papel, menos errores administrativos, menos reclamos sin evidencia y menos desplazamientos innecesarios.",
            },
        ],
        ecosystem: {
            kicker: "Operación de campo",
            blurb:
                "Órdenes de corte y reconexión, lectura de medidores, cuadrillas y rutas, con geolocalización y evidencia fotográfica.",
        },
    },

    tracxia: {
        kicker: "Trazabilidad agroindustrial",
        heroTagline:
            "Plataforma SaaS de trazabilidad agroindustrial para controlar todo el ciclo de vida de los productos, desde la finca hasta el consumidor final.",        mockupMenu: ["Cosechas", "Lotes", "Bodegas", "Transporte", "Calidad"],
        capabilities: tracxia,
        surfacesTitle: "Cuatro módulos en una sola solución",
        surfaces: [
            {
                icon: Factory,
                name: "Gestión de producción (MES)",
                tagline: "Seguimiento automático durante todo el ciclo operativo.",
                items: [
                    "Gestión de cosechas",
                    "Lotes identificados",
                    "Estados: registrado, procesado y cerrado",
                    "Empaque",
                    "Flujo automatizado",
                ],
            },
            {
                icon: Warehouse,
                name: "Administración de bodegas (WMS)",
                tagline: "Control de inventario en tiempo real.",
                items: ["Inventarios", "Inventario actualizado", "Control por ubicación", "Mayor eficiencia operativa"],
            },
            {
                icon: Truck,
                name: "Logística de transporte (TMS)",
                tagline: "Control total de rutas y entregas.",
                items: ["Seguimiento de rutas", "Control de entregas", "Historial de distribución", "Geolocalización"],
            },
            {
                icon: QrCode,
                name: "Trazabilidad alimentaria",
                tagline: "Toda la información centralizada desde el inicio del proceso.",
                items: [
                    "Registro y control de origen",
                    "Historial completo",
                    "Registro de ubicaciones",
                    "Códigos QR",
                    "Inspecciones de calidad",
                ],
            },
        ],
        stepsTitle: "Trazabilidad de principio a fin",
        steps: [
            {
                title: "Origen",
                text: "Desde la finca: toda la información centralizada desde el inicio del proceso, con cosechas, historial completo y registro de ubicaciones.",
            },
            {
                title: "Proceso",
                text: "Seguimiento automático de lotes y producción, con inspecciones de calidad, empaque y estados registrado, procesado y cerrado.",
            },
            {
                title: "Distribución",
                text: "Seguimiento de rutas, control de entregas e historial de distribución, con geolocalización, firmas digitales y evidencia fotográfica.",
            },
            {
                title: "Cliente",
                text: "Hasta el consumidor final: con un solo escaneo de un código QR se accede a toda la información.",
            },
        ],
        benefits: {
            title: "Lo que obtiene con Tracxia",
            items: [
                "Control de todo el ciclo de vida de los productos, de la finca al consumidor final",
                "Producción, bodegas, transporte y trazabilidad en una sola solución",
                "Cumplimiento de certificaciones internacionales más fácil",
                "Mejor eficiencia operativa",
                "Información en tiempo real para decidir con datos",
                "Historial completo de movimientos",
                "Mayor transparencia y control",
                "Menor desperdicio y mayor precisión",
            ],
        },
        faqs: [
            {
                question: "¿Qué es Tracxia?",
                answer:
                    "Una plataforma SaaS de trazabilidad agroindustrial diseñada para controlar todo el ciclo de vida de los productos, desde la finca hasta el consumidor final.",
            },
            {
                question: "¿Qué significan MES, WMS y TMS?",
                answer:
                    "Son los módulos que Tracxia integra en una sola solución: gestión de producción (MES), administración de bodegas (WMS) y logística de transporte (TMS), junto con la trazabilidad alimentaria.",
            },
            {
                question: "¿Qué se puede gestionar con Tracxia?",
                answer:
                    "Cosechas, inspecciones de calidad, inventarios, empaque, distribución y entregas, con lotes que pasan por los estados registrado, procesado y cerrado.",
            },
            {
                question: "¿Cómo se respalda cada etapa?",
                answer:
                    "Con códigos QR, geolocalización, firmas digitales y evidencia fotográfica. Con un solo escaneo se accede a toda la información.",
            },
            {
                question: "¿Ayuda con las certificaciones internacionales?",
                answer: "La plataforma facilita el cumplimiento de certificaciones internacionales.",
            },
            {
                question: "¿Avisa si algo sale mal?",
                answer: "Cuenta con alertas automáticas para anticiparse a los problemas antes de que ocurran.",
            },
        ],
        ecosystem: {
            kicker: "Trazabilidad agroindustrial",
            blurb:
                "Plataforma SaaS de trazabilidad: producción, bodegas, transporte y trazabilidad alimentaria, de la finca al consumidor final.",
        },
    },

    navastay: {
        kicker: "Administración de condominios",
        heroTagline: "Todo su condominio en una sola plataforma.",
        mockupMenu: ["Cuotas", "Estados de cuenta", "Reservas", "Accesos", "Mantenimientos"],
        mockupDevice: "phone",
        capabilities: navastay,
        steps: [
            {
                title: "La administración organiza las finanzas",
                text: "Administra las cuotas de mantenimiento, emite recibos, registra pagos y compara el presupuesto con la ejecución.",
            },
            {
                title: "Los residentes consultan y reservan",
                text: "Consultan la disponibilidad de las áreas comunes y reservan espacios de forma rápida y sencilla.",
            },
            {
                title: "Accesos y mantenimientos quedan registrados",
                text: "Se lleva un registro completo de todos los ingresos y se controlan los mantenimientos de activos del condominio.",
            },
            {
                title: "Todos se comunican en un solo lugar",
                text: "Más comunicación, más organización, y la administración del condominio disponible desde cualquier lugar.",
            },
        ],
        benefits: {
            title: "Todo lo que necesita para una administración eficiente",
            items: [
                "Finanzas del condominio organizadas y siempre al día",
                "Reservas de espacios de forma rápida y sencilla",
                "Mayor seguridad para los residentes",
                "Mantenimientos de activos en óptimas condiciones",
                "Más comunicación, más organización",
                "Administración desde cualquier lugar",
            ],
        },
        faqs: [
            {
                question: "¿Qué se puede administrar con NavaStay?",
                answer:
                    "Las cuotas de mantenimiento, los estados de cuenta, la facturación y los pagos, las reservas de áreas comunes, el control de accesos, los mantenimientos y la comunicación con los residentes, todo desde una sola plataforma.",
            },
            {
                question: "¿Cómo se manejan las finanzas del condominio?",
                answer:
                    "Se pueden administrar las cuotas de mantenimiento, emitir recibos, registrar pagos, consultar estados de cuenta y comparar el presupuesto con la ejecución.",
            },
            {
                question: "¿Cómo reservan los residentes las áreas comunes?",
                answer: "Pueden consultar la disponibilidad y reservar espacios de forma rápida y sencilla.",
            },
            {
                question: "¿Cómo se controla el acceso al condominio?",
                answer:
                    "Se lleva un registro completo de todos los ingresos, lo que da mayor seguridad a los residentes.",
            },
            {
                question: "¿Puedo administrar el condominio desde cualquier lugar?",
                answer: "Sí. NavaStay permite administrar el condominio desde cualquier lugar.",
            },
        ],
        ecosystem: {
            kicker: "Administración de condominios",
            blurb:
                "Finanzas, reservas de áreas comunes, control de accesos, mantenimientos y comunicación con los residentes, en una sola plataforma.",
        },
    },

    ordexia: {
        kicker: "Fuerza de ventas",
        logo: "/images/ordexia-icon.png",
        heroTagline: "La plataforma que impulsa a su equipo de ventas en cada visita.",
        mockupMenu: ["Pedidos", "Cobros", "Clientes", "Rutas", "Ventas"],
        mockupDevice: "phone",
        problem: {
            intro:
                "¿Sus vendedores aún toman pedidos en papel, WhatsApp o llamadas? Dele a su equipo las herramientas que necesita para trabajar de forma más ágil y organizada.",
            audience: "Pensado para: la fuerza de ventas y la operación en oficina.",
            pairs: [
                {
                    before: "Anotar el pedido en papel, WhatsApp o llamadas",
                    after: "Los vendedores registran los pedidos directamente desde su dispositivo móvil",
                },
                {
                    before: "Anotar, enviar, digitar y esperar",
                    after: "De la visita al pedido en segundos",
                },
                {
                    before: "Más errores, más lentitud, menos control",
                    after: "Menos errores. Más velocidad. Más control.",
                },
            ],
        },
        capabilities: ordexia,
        surfacesTitle: "Todo dentro de una operación más organizada y centralizada",
        surfaces: [
            {
                icon: Smartphone,
                name: "Aplicación para el vendedor",
                tagline: "La plataforma que impulsa a su equipo de ventas en cada visita.",
                items: ["Pedidos", "Cobros", "Clientes", "Rutas", "Ventas del día", "Actividades del día"],
            },
            {
                icon: Monitor,
                name: "Oficina y operación",
                tagline: "La oficina mantiene el control.",
                items: [
                    "Pedidos digitales en tiempo real",
                    "La información fluye desde la ruta",
                    "Información disponible para la operación",
                ],
            },
        ],
        stepsTitle: "De la visita al pedido en segundos",
        steps: [
            {
                title: "El vendedor registra",
                text: "Registra el pedido directamente desde su dispositivo móvil.",
            },
            {
                title: "La información fluye",
                text: "El pedido queda registrado en tiempo real.",
            },
            {
                title: "La oficina mantiene el control",
                text: "La información queda disponible para la operación.",
            },
        ],
        benefits: {
            title: "Menos errores. Más velocidad. Más control.",
            items: [
                "Pedidos registrados desde el dispositivo móvil",
                "Pedidos digitales en tiempo real",
                "Información disponible para la operación",
                "Una operación más organizada y centralizada",
                "Pedido, cobro y cliente en cada visita",
                "Un equipo que trabaja de forma más ágil y organizada",
            ],
        },
        faqs: [
            {
                question: "¿Cómo registran los pedidos los vendedores?",
                answer:
                    "Directamente desde su dispositivo móvil, y la información queda disponible para la operación.",
            },
            {
                question: "¿Qué cambia frente al proceso tradicional?",
                answer:
                    "El proceso tradicional implica anotar, enviar, digitar y esperar. Con Ordexia el pedido queda registrado directamente en la plataforma, de la visita al pedido en segundos.",
            },
            {
                question: "¿Qué ve el vendedor en la aplicación?",
                answer:
                    "Un resumen del día con pedidos, cobros, clientes y rutas, además de las ventas del día y las actividades: visitas a clientes, pedidos creados y cobros registrados.",
            },
            {
                question: "¿Qué controla la oficina?",
                answer:
                    "La información fluye desde la ruta en tiempo real y la oficina mantiene el control de la operación.",
            },
        ],
        ecosystem: {
            kicker: "Fuerza de ventas",
            blurb:
                "Pedidos, cobros, clientes y rutas desde el móvil del vendedor, con la información disponible para la operación en tiempo real.",
        },
    },

    factxia: {
        kicker: "Facturación electrónica",
        heroTagline: "Comprobantes que salen a tiempo y cuadran con Hacienda.",
        problem: {
            intro:
                "El comprobante se arma en un lado, se envía en otro y el cobro vive en un tercero. Cuando Hacienda o el cliente piden el XML, nadie sabe en qué bandeja quedó.",
            audience:
                "Para: Empresas, distribuidores y operaciones que emiten comprobantes electrónicos y no pueden reconstruir el mes en Excel.",
            pairs: [
                { after: "Dejar de reconstruir el mes cuando llega un requerimiento" },
                { after: "Cobro y factura en el mismo expediente" },
                { after: "Un solo canal entre operación, tesorería y Hacienda" },
            ],
        },
        capabilities: factxia,
        faqs: baseFaqs(
            "Factxia",
            "empresas, distribuidores y operaciones que emiten comprobantes electrónicos y no pueden reconstruir el mes en Excel.",
        ),
        ecosystem: {
            kicker: "Facturación electrónica",
            blurb:
                "Facturación electrónica para Costa Rica: emisión, recepción, notas, estados de cuenta y la bitácora que pide una auditoría tributaria.",
        },
    },
};