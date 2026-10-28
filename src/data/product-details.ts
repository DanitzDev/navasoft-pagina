import {
    BadgeCheck,
    Banknote,
    Boxes,
    CalendarCheck,
    CalendarDays,
    ClipboardList,
    FileCheck,
    FileText,
    Flag,
    Gauge,
    KeyRound,
    MessageSquare,
    Network,
    Package,
    Plug,
    RefreshCw,
    Route as RouteIcon,
    ScrollText,
    Search,
    ShoppingCart,
    Truck,
    Users,
    Wallet,
    Wrench,
} from "lucide-react";
import type { Capability, ProductDetail, ProductSlug } from "@/types";

// Toma capacidades por posición para armar los pasos (mi lectura del orden de trabajo)
const pick = (list: Capability[], ...indexes: number[]) =>
    indexes.map((i) => ({ title: list[i].title, text: list[i].text }));

const demoAnswer =
    "Le mostramos el producto sobre su proceso, no sobre una demo genérica. Puede pedir una demostración o una reunión desde esta página.";

// Preguntas armadas solo con textos de la maqueta; reemplázalas por las reales de Navasoft
const baseFaqs = (name: string, who: string) => [
    { question: `¿Para quién es ${name}?`, answer: `Para ${who}` },
    { question: "¿Cómo puedo ver el producto?", answer: demoAnswer },
];

const gridxia: Capability[] = [
    { icon: Users, title: "Padrón de abonados", text: "Catastro de usuarios, medidores y predios, con historial de cambios y estados de servicio." },
    { icon: FileText, title: "Lecturas y facturación", text: "Toma de lecturas, cálculo de tarifas, emisión de recibos y control de ajustes." },
    { icon: Wallet, title: "Cobros y morosidad", text: "Estados de cuenta, convenios de pago y seguimiento de cartera para tesorería." },
    { icon: Network, title: "Inventario de red", text: "Tanques, tubería, válvulas y hidrantes, con órdenes de mantenimiento y bitácora." },
    { icon: ClipboardList, title: "Gobierno de la junta", text: "Actas, asambleas, reportes para la administración y trazabilidad de decisiones." },
    { icon: Gauge, title: "Indicadores operativos", text: "Volumen facturado, recuperación de cartera, incidencias y estado de activos." },
];

const tracxia: Capability[] = [
    { icon: Package, title: "Lotes de producción", text: "Identificación de lotes desde recepción de materia prima hasta producto terminado." },
    { icon: RouteIcon, title: "Cadena de custodia", text: "Origen, transformaciones, mezclas y destino, con historial consultable." },
    { icon: BadgeCheck, title: "Calidad y certificados", text: "Registros de calidad, evidencias y documentos asociados a cada lote." },
    { icon: Boxes, title: "Inventario", text: "Existencias por lote, ubicación y estado, sin doble digitación." },
    { icon: Truck, title: "Despacho", text: "Pedidos, remisiones y vínculo entre lo que salió y a quién llegó." },
    { icon: Search, title: "Consulta rápida", text: "Búsqueda por lote, producto o cliente cuando hay una incidencia o una auditoría." },
];

const navastay: Capability[] = [
    { icon: Wallet, title: "Finanzas del condominio", text: "Cuotas de mantenimiento, estados de cuenta, facturación y registro de pagos." },
    { icon: MessageSquare, title: "Comunicación con residentes", text: "Convocatorias, actas y avisos desde un canal oficial, no desde hilos perdidos." },
    { icon: CalendarDays, title: "Reservas de áreas comunes", text: "Disponibilidad y reserva de salones, canchas y zonas sociales." },
    { icon: KeyRound, title: "Control de accesos", text: "Autorizaciones, ingresos permanentes, visitantes y bitácora." },
    { icon: Wrench, title: "Mantenimiento de activos", text: "Registro de activos, programación de mantenimientos e historial de fallas." },
    { icon: Gauge, title: "Reportes en tiempo real", text: "Cartera, ocupación de áreas y estado operativo para la administración y la junta." },
];

const ordexia: Capability[] = [
    { icon: ShoppingCart, title: "Preventa en ruta", text: "Toma de pedidos desde el móvil, con catálogo, precios y condiciones del cliente." },
    { icon: Banknote, title: "Cobros de dinero", text: "Registro de cobros, saldos y formas de pago, vinculados al cliente y a la factura." },
    { icon: Users, title: "Saldos de cliente", text: "El vendedor ve lo que debe cada punto, no lo que recuerda." },
    { icon: Flag, title: "Cierre de ruta", text: "Conciliación de pedidos y dinero al final del día, sin reconstruir papeles." },
    { icon: RefreshCw, title: "Sincronización", text: "La oficina ve la ruta en curso; el campo no espera a volver para reportar." },
    { icon: ClipboardList, title: "Control comercial", text: "Pedidos, cobros e incidencias como un solo expediente por cliente." },
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
        kicker: "Agua potable y ASADAS",
        heroTagline: "La operación de su junta, en un solo tablero.",
        problem: {
            intro:
                "Muchas ASADAS todavía operan con hojas de cálculo, recibos manuales y un padrón que no coincide con la red. Eso genera morosidad invisible, fugas sin historial y asambleas sin cifras confiables.",
            audience:
                "Para: Juntas administradoras de acueductos, ASADAS y operadores comunales de agua potable en Costa Rica.",
            // Los "before" los armé yo a partir del párrafo del problema
            pairs: [
                { before: "Hojas de cálculo y recibos manuales", after: "Recibos y cartera bajo control, no en cuadernos" },
                { before: "Un padrón que no coincide con la red y fugas sin historial", after: "La red deja de ser un mapa mental de un operador" },
                { before: "Asambleas sin cifras confiables", after: "La junta rinde cuentas con números, no con estimaciones" },
            ],
        },
        capabilities: gridxia,
        steps: pick(gridxia, 0, 1, 2, 5),
        faqs: [
            {
                question: "¿Para quién es Gridxia?",
                answer:
                    "Para juntas administradoras de acueductos, ASADAS y operadores comunales de agua potable en Costa Rica. También para cooperativas y empresas de servicios.",
            },
            {
                question: "¿Qué problema resuelve?",
                answer:
                    "Evita operar con hojas de cálculo, recibos manuales y un padrón que no coincide con la red, lo que genera morosidad invisible, fugas sin historial y asambleas sin cifras confiables.",
            },
            { question: "¿Cómo puedo ver el producto?", answer: demoAnswer },
        ],
        ecosystem: {
            kicker: "Agua potable y ASADAS",
            blurb:
                "Plataforma para juntas administradoras de agua potable y ASADAS: padrón, lecturas, facturación, cobros, red y asambleas.",
        },
    },

    tracxia: {
        kicker: "Agroindustria y trazabilidad",
        heroTagline: "De lote a destino, con evidencia.",
        problem: {
            intro:
                "Cuando un cliente, un auditor o un retiro de producto pregunta «¿de dónde salió este lote?», la respuesta no puede tardar tres días ni depender de un cuaderno en bodega.",
            audience:
                "Para: Plantas de condimentos y especias, empaques agrícolas, comercializadoras y operaciones agroindustriales que deben demostrar origen y lote.",
            pairs: [
                { after: "Responder un retiro o una auditoría en minutos" },
                { after: "Menos merma por inventario ciego" },
                { after: "Una historia de producto que el comercial puede mostrar" },
            ],
        },
        capabilities: tracxia,
        steps: pick(tracxia, 0, 1, 3, 4),
        faqs: baseFaqs(
            "Tracxia",
            "plantas de condimentos y especias, empaques agrícolas, comercializadoras y operaciones agroindustriales que deben demostrar origen y lote.",
        ),
        ecosystem: {
            kicker: "Agroindustria y trazabilidad",
            blurb:
                "Trazabilidad de productos para agroindustria: lotes, origen, calidad, inventario y despacho — pensado para plantas, empaques y comercializadoras.",
        },
    },

    navastay: {
        kicker: "Administración de condominios",
        heroTagline: "El condominio entero, en una sola plataforma.",
        problem: {
            intro:
                "La administración se fragmenta entre WhatsApp, Excel y un archivo de actas. El residente no ve su estado de cuenta; la junta no ve el mantenimiento; el acceso se gestiona de memoria.",
            audience:
                "Para: Administradores de condominios, juntas de copropietarios y desarrollos residenciales en Costa Rica.",
            pairs: [
                { after: "Cuotas y morosidad visibles para administración y junta" },
                { after: "Residentes con un canal único, no diez grupos" },
                { after: "Activos y accesos con bitácora, no con recuerdos" },
            ],
        },
        capabilities: navastay,
        // Sin pasos: sus capacidades no son una secuencia de trabajo
        faqs: baseFaqs(
            "NavaStay",
            "administradores de condominios, juntas de copropietarios y desarrollos residenciales en Costa Rica.",
        ),
        ecosystem: {
            kicker: "Administración de condominios",
            blurb:
                "Administración de condominios: cuotas, estados de cuenta, asambleas, reservas, accesos y mantenimientos.",
        },
    },

    ordexia: {
        kicker: "Preventas y cobros",
        heroTagline: "La ruta comercial, en el bolsillo.",
        problem: {
            intro:
                "El vendedor anota el pedido, cobra en efectivo o transferencia, y la oficina reconstruye el día al cierre. Se pierden pedidos, se duplican cobros y el saldo del cliente nunca coincide.",
            audience:
                "Para: Equipos de venta en ruta, distribuidores, plantas con preventa y operaciones que cobran en campo.",
            pairs: [
                { after: "Menos diferencia entre lo vendido y lo cobrado" },
                { after: "La oficina deja de reconstruir el día del vendedor" },
                { after: "Cartera visible mientras la ruta todavía está en calle" },
            ],
        },
        capabilities: ordexia,
        steps: pick(ordexia, 0, 1, 3, 4),
        faqs: baseFaqs(
            "Ordexia",
            "equipos de venta en ruta, distribuidores, plantas con preventa y operaciones que cobran en campo.",
        ),
        ecosystem: {
            kicker: "Preventas y cobros",
            blurb:
                "App móvil para control de preventas y cobros de dinero: pedidos en ruta, saldos de cliente y conciliación de lo cobrado.",
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
        steps: pick(factxia, 0, 1, 2, 5),
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