import { ClipboardList, FileText, Gauge, Network, Users, Wallet } from "lucide-react";
import type { Capability, ProductDetail, ProductSlug } from "@/types";

const gridxiaCapabilities: Capability[] = [
    { icon: Users, title: "Padrón de abonados", text: "Catastro de usuarios, medidores y predios, con historial de cambios y estados de servicio." },
    { icon: FileText, title: "Lecturas y facturación", text: "Toma de lecturas, cálculo de tarifas, emisión de recibos y control de ajustes." },
    { icon: Wallet, title: "Cobros y morosidad", text: "Estados de cuenta, convenios de pago y seguimiento de cartera para tesorería." },
    { icon: Network, title: "Inventario de red", text: "Tanques, tubería, válvulas y hidrantes, con órdenes de mantenimiento y bitácora." },
    { icon: ClipboardList, title: "Gobierno de la junta", text: "Actas, asambleas, reportes para la administración y trazabilidad de decisiones." },
    { icon: Gauge, title: "Indicadores operativos", text: "Volumen facturado, recuperación de cartera, incidencias y estado de activos." },
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
            pairs: [
                { before: "Hojas de cálculo y recibos manuales", after: "Recibos y cartera bajo control, no en cuadernos" },
                { before: "Un padrón que no coincide con la red y fugas sin historial", after: "La red deja de ser un mapa mental de un operador" },
                { before: "Asambleas sin cifras confiables", after: "La junta rinde cuentas con números, no con estimaciones" },
            ],
        },
        capabilities: gridxiaCapabilities,
        // Mi lectura del orden de trabajo, armada con las capacidades de arriba
        steps: [0, 1, 2, 5].map((i) => ({
            title: gridxiaCapabilities[i].title,
            text: gridxiaCapabilities[i].text,
        })),
        // Armadas solo con textos que ya están en la maqueta; reemplázalas por las reales de Navasoft
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
            {
                question: "¿Cómo puedo ver el producto?",
                answer:
                    "Le mostramos el producto sobre su proceso, no sobre una demo genérica. Puede pedir una demostración o una reunión desde esta página.",
            },
        ],
        ecosystem: {
            kicker: "Agua potable y ASADAS",
            blurb: "Abonados, facturación, recaudación y órdenes de trabajo para ASADAS, cooperativas y empresas de servicios.",
        },
    },
    navastay: {
        ecosystem: {
            kicker: "Administración de condominios",
            blurb: "Administración de condominios: cuotas, estados de cuenta, asambleas, reservas, accesos y mantenimientos.",
        },
    },
    tracxia: {
        ecosystem: {
            kicker: "Agroindustria y trazabilidad",
            blurb: "Trazabilidad de productos para agroindustria: lotes, origen, calidad, inventario y despacho — pensado para plantas, empaques y comercializadoras.",
        },
    },
    ordexia: {
        ecosystem: {
            kicker: "Preventas y cobros",
            blurb: "App móvil para control de preventas y cobros de dinero: pedidos en ruta, saldos de cliente y conciliación de lo cobrado.",
        },
    },
    factxia: {
        ecosystem: {
            kicker: "Facturación electrónica",
            blurb: "Facturación electrónica para Costa Rica: emisión, recepción, notas, estados de cuenta y la bitácora que pide una auditoría tributaria.",
        },
    },
};