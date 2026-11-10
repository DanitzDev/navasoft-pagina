import {
    Factory,
    GraduationCap,
    Handshake,
    HardHat,
    Landmark,
    Layers,
    PiggyBank,
    RadioTower,
    Sprout,
    Wrench,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { sectors as navSectors } from "@/data/navigation";
import type { ContactTopic, ProductSlug } from "@/types";

/*
Sectores de Navasoft: cada sector tiene un slug, un nombre y una descripción
Plataformas sugeridas. Cambiar si es necesario o eliminar si no aplica. No es obligatorio que un sector tenga plataformas sugeridas
*/

export type SectorGroup = "finanzas" | "energia" | "industria" | "comunidad";

// Los nombres de las familias los invente yo
export const sectorGroups: Record<SectorGroup, string> = {
    finanzas: "Fondos y financiamiento",
    energia: "Energía y comunicaciones",
    industria: "Industria y producción",
    comunidad: "Comunidad y servicios",
};

type SectorExtra = {
    image: string; // foto de fondo del hero
    icon: LucideIcon;
    group: SectorGroup;
    area: "publico" | "empresarial"; // define a que servicio de Navasoft enlaza
    intro?: string; // si falta, se usa la descripción del menú
    focus: string[];
    products: ProductSlug[]; // plataformas relacionadas (relación sugerida, no confirmada)
    clients?: { name: string; note: string }[]; // clientes: solo si la maqueta lo dice de forma explícita
};

export type Sector = Omit<SectorExtra, "intro"> & {
    slug: string;
    name: string;
    description: string;
    intro: string;
};

const extras: Record<string, SectorExtra> = {
    "fondos-de-pensiones": {
        icon: PiggyBank,
        group: "finanzas",
        area: "empresarial",
        image: "/images/area-empresarial.jpeg",
        focus: [
            "Procesos de administración digitalizados",
            "Integración con los sistemas existentes",
            "Información confiable para la gestión y la rendición de cuentas",
        ], // GENERADO
        products: [],
    },
    asociaciones: {
        icon: Handshake,
        group: "comunidad",
        area: "empresarial",
        image: "/images/area-empresarial.jpeg",
        focus: [
            "Procesos administrativos más ordenados",
            "Mejor comunicación con los asociados",
            "Reportes para la toma de decisiones",
        ], // GENERADO
        products: [],
    },
    construccion: {
        icon: HardHat,
        group: "industria",
        area: "empresarial",
        image: "/images/area-empresarial.jpeg",
        focus: [
            "Control de la operación y de los procesos",
            "Automatización de tareas administrativas",
            "Indicadores para la gerencia",
        ], // GENERADO
        products: [],
    },
    "fondos-de-ahorro-y-prestamo": {
        icon: Landmark,
        group: "finanzas",
        area: "empresarial",
        image: "/images/area-empresarial.jpeg",
        focus: ["Transparencia", "Gestión financiera", "Control operativo"], // MAQUETA
        products: [],
    },
    servicios: {
        icon: Wrench,
        group: "comunidad",
        area: "publico",
        image: "/images/area-publico.jpeg",
        focus: [
            "Operación comercial y de campo organizada",
            "Facturación, cobros y atención de clientes",
            "Continuidad del servicio para los usuarios",
        ], // GENERADO
        products: ["gridxia"], // relación sugerida
    },
    agroindustria: {
        icon: Sprout,
        group: "industria",
        area: "empresarial",
        image: "/images/tracxia.jpeg",
        intro: "Trazabilidad de principio a fin, desde la finca hasta el consumidor final.", // REAL (Tracxia)
        focus: [
            "Control de todo el ciclo de vida de los productos",
            "Producción, bodegas y transporte en una sola solución",
            "Cumplimiento de certificaciones internacionales más fácil",
        ], // REAL (Tracxia)
        products: ["tracxia"],
    },
    "prestamos-para-la-educacion": {
        icon: GraduationCap,
        group: "finanzas",
        area: "publico",
        image: "/images/factxia.jpeg",
        focus: ["Digitalización", "Evidencia documental", "Seguimiento de trámites"], // MAQUETA (caso COSEVI / CONAPE)
        products: [],
        clients: [{ name: "CONAPE", note: "Educación y financiamiento social" }], // MAQUETA
    },
    electricidad: {
        icon: Zap,
        group: "energia",
        area: "publico",
        image: "/images/area-publico.jpeg",
        focus: ["Operación continua", "Gestión comercial", "Procesos críticos"], // MAQUETA (caso JASEC)
        products: ["gridxia"], // relación sugerida
        clients: [{ name: "JASEC", note: "Electrificación y servicios públicos" }], // MAQUETA
    },
    telecomunicaciones: {
        icon: RadioTower,
        group: "energia",
        area: "publico",
        image: "/images/area-iot.jpeg",
        focus: ["Operación continua", "Gestión comercial", "Innovación con IA, IoT y Cloud"], // IA, IoT y Cloud: REAL (Innovation Lab)
        products: [],
        clients: [{ name: "JASEC", note: "Energía, telecomunicaciones e innovación" }], // MAQUETA
    },
    "produccion-y-manufactura": {
        icon: Factory,
        group: "industria",
        area: "empresarial",
        image: "/images/hero-industria.jpeg",
        intro: "Gestión de producción, bodegas y logística de transporte en una sola solución.", // REAL (Tracxia)
        focus: [
            "Gestión de producción (MES)",
            "Administración de bodegas (WMS)",
            "Logística de transporte (TMS)",
        ], // REAL (Tracxia)
        products: ["tracxia"],
    },
};

// Sectores que el menú tiene pero esta tabla no conoce: se ven más simples, sin romperse
const fallback: SectorExtra = {
    icon: Layers,
    group: "comunidad",
    area: "empresarial",
    image: "/images/area-empresarial.jpeg",
    focus: [],
    products: [],
};

const slugOf = (href: string) => href.replace(/^\/sectores\//, "");

export const sectors: Sector[] = navSectors.map((item) => {
    const slug = slugOf(item.href);
    const extra = { ...fallback, ...extras[slug] };

    return {
        ...extra,
        slug,
        name: item.label,
        description: item.description,
        intro: extra.intro ?? item.description,
    };
});

// Aviso en desarrollo si el menú tiene un sector que esta tabla no conoce
if (import.meta.env.DEV) {
    const missing = navSectors.map((item) => slugOf(item.href)).filter((slug) => !extras[slug]);
    if (missing.length > 0) console.warn("[sectores] Sin contenido extra para:", missing);
}

// Tema que se preelige en el formulario de contacto
export const sectorTopic = (sector: Sector): ContactTopic =>
    sector.products[0] ?? (sector.area === "publico" ? "gobierno" : "privado");