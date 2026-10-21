import { Briefcase, Cpu, Landmark, Layers } from "lucide-react";
import type { Area } from "@/types";

export const areas: Area[] = [
    {
        slug: "publico",
        number: "01",
        navLabel: "Público",
        name: "Sector Público",
        description:
            "Modernizamos procesos, servicios y operaciones para instituciones que impactan miles de ciudadanos.",
        tags: ["Gobiernos locales", "Instituciones autónomas", "Servicios públicos", "Transformación digital"],
        note: "Municipalidad de La Unión, CONAPE, JASEC, COSEVI y ASADAS",
        image: "/images/area-publico.jpg",
        icon: Landmark,
        page: "gobierno",
    },
    {
        slug: "empresarial",
        number: "02",
        navLabel: "Empresarial",
        name: "Sector Empresarial",
        description:
            "Ayudamos a organizaciones privadas a optimizar operaciones, integrar sistemas y acelerar su crecimiento.",
        tags: [
            "Plataformas corporativas",
            "Automatización de procesos",
            "Integraciones empresariales",
            "Inteligencia de negocio",
        ],
        image: "/images/area-empresarial.jpg",
        icon: Briefcase,
        page: "privado",
    },
    {
        slug: "saas",
        number: "03",
        navLabel: "SaaS",
        name: "Ecosistema SaaS",
        kicker: "03 · Plataformas",
        description:
            "Plataformas propias diseñadas para transformar sectores específicos mediante soluciones modernas, escalables y orientadas a resultados.",
        tags: ["Gridxia", "Tracxia", "Ordexia", "Factxia", "NavaStay"],
        highlights: ["Futuro estratégico", "En expansión regional"],
        image: "/images/area-saas.jpg",
        icon: Layers,
    },
    {
        slug: "innovation-lab",
        number: "04",
        navLabel: "Innovation Lab",
        name: "Innovation Lab",
        description:
            "Investigamos, desarrollamos e integramos tecnologías emergentes para construir la industria inteligente del futuro.",
        tags: ["IA", "IoT", "Cloud"],
        image: "/images/area-lab.jpg",
        icon: Cpu,
        page: "navalab",
    },
];