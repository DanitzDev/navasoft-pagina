import {
    Accessibility,
    Award,
    Banknote,
    Building2,
    ClipboardCheck,
    Cloud,
    Code,
    FileText,
    Gavel,
    GraduationCap,
    Handshake,
    HeartHandshake,
    Leaf,
    Lightbulb,
    Recycle,
    RefreshCw,
    Scale,
    ShieldAlert,
    ShoppingCart,
    UserPlus,
    Users,
    Video,
    Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
 * Todo el contenido sale de los dos documentos de Navasoft (resumido, sin cambiar su sentido).
 * Lo único generado por mí son los textos de la página índice y los títulos de las tarjetas.
 */

export type PolicySection = { icon: LucideIcon; title: string; points: string[] };

export type PolicyPart = {
    id: string;
    tab: string;
    title: string;
    pdfPage?: number; // página del PDF donde empieza esta parte
    purpose: string;
    appliesTo: string[];
    principles: { title: string; text: string }[];
    sections: PolicySection[];
    commitment: string;
};

export type Policy = {
    slug: string;
    title: string;
    shortTitle: string;
    icon: LucideIcon;
    code: string;
    version: string;
    date: string;
    pdf: string;
    summary: string;
    parts: PolicyPart[];
    shared?: { title: string; sections: PolicySection[] }; // aplica a todas las partes
};

const sharedLaws =
    "Ley N.° 7600 (igualdad de oportunidades para las personas con discapacidad)";

export const policies: Policy[] = [
    {
        slug: "sostenibilidad",
        title: "Política de Sostenibilidad Ambiental, Innovación Responsable y Tecnología Verde",
        shortTitle: "Sostenibilidad ambiental",
        icon: Leaf,
        code: "NC-CR-POL-AMB-2026-01",
        version: "1.0",
        date: "octubre 2026",
        pdf: "/documents/Politica_Sostenibilidad_Navasoft.pdf",
        summary:
            "Navasoft se compromete con la protección del medio ambiente mediante prácticas sostenibles, el uso eficiente de los recursos tecnológicos y una cultura orientada a la responsabilidad ambiental.",
        parts: [
            {
                id: "politica",
                tab: "Política",
                title: "Política de sostenibilidad ambiental",
                purpose:
                    "Proteger el medio ambiente mediante prácticas sostenibles, el uso eficiente de los recursos tecnológicos y la promoción de una cultura organizacional orientada a la responsabilidad ambiental. La innovación tecnológica debe desarrollarse de manera responsable, procurando minimizar el impacto ambiental de las operaciones y contribuyendo al desarrollo sostenible.",
                appliesTo: [
                    "Empleados y colaboradores directos de todas las áreas",
                    "Proveedores de servicios y productos tecnológicos",
                    "Socios estratégicos y canales comerciales",
                    "Clientes y usuarios de las soluciones y plataformas",
                    "Contratistas y terceros que participen en proyectos de Navasoft",
                ],
                principles: [
                    {
                        title: "Sostenibilidad",
                        text: "Equilibrio entre desarrollo tecnológico, crecimiento empresarial y protección ambiental.",
                    },
                    {
                        title: "Responsabilidad ambiental",
                        text: "Reducir de forma activa el impacto ambiental de las operaciones cotidianas y los servicios.",
                    },
                    {
                        title: "Innovación responsable",
                        text: "Desarrollar soluciones tecnológicas eficientes que optimicen recursos y aporten valor sostenible.",
                    },
                    {
                        title: "Mejora continua",
                        text: "Acciones permanentes de revisión y fortalecimiento de las prácticas ambientales.",
                    },
                    {
                        title: "Cumplimiento normativo",
                        text: "Respetar la legislación ambiental aplicable y adoptar las mejores prácticas internacionales.",
                    },
                ],
                sections: [
                    {
                        icon: FileText,
                        title: "Digitalización responsable",
                        points: [
                            "Priorizar la documentación electrónica sobre los documentos impresos",
                            "Fomentar las firmas digitales en contratos, aprobaciones y trámites aplicables",
                            "Reducir la impresión innecesaria y promover procesos libres de papel",
                            "Favorecer plataformas digitales centralizadas para la gestión documental colaborativa",
                        ],
                    },
                    {
                        icon: Code,
                        title: "Desarrollo de software sostenible",
                        points: [
                            "Optimizar el uso de recursos computacionales en el código y la infraestructura",
                            "Diseñar sistemas eficientes en procesamiento y almacenamiento de datos",
                            "Minimizar operaciones redundantes y consultas excesivas",
                            "Considerar criterios de sostenibilidad durante todo el ciclo de vida del software (Green Coding)",
                        ],
                    },
                    {
                        icon: Zap,
                        title: "Uso eficiente de equipos y recursos",
                        points: [
                            "Uso responsable de computadoras, dispositivos móviles y equipos de oficina",
                            "Directivas de ahorro energético y suspensión automática en los dispositivos corporativos",
                            "Apagar los equipos y periféricos que no estén en uso al finalizar la jornada",
                            "Extender la vida útil de los activos con mantenimiento preventivo y actualización",
                        ],
                    },
                    {
                        icon: Video,
                        title: "Trabajo remoto y movilidad sostenible",
                        points: [
                            "Favorecer reuniones virtuales siempre que sea viable operativa y técnicamente",
                            "Impulsar el trabajo remoto o esquemas híbridos eficientes",
                            "Reducir desplazamientos innecesarios con herramientas digitales de colaboración",
                            "Planificar de forma consolidada las visitas presenciales a clientes o proveedores",
                        ],
                    },
                    {
                        icon: Recycle,
                        title: "Residuos electrónicos (e-waste)",
                        points: [
                            "Gestionar de forma segura y trazable los residuos tecnológicos",
                            "Reutilizar internamente equipos y componentes cuando su estado lo permita",
                            "Donar o reciclar equipos fuera de uso con canales, fundaciones o gestores autorizados",
                            "Garantizar la eliminación segura e irreversible de datos en dispositivos con información sensible",
                        ],
                    },
                    {
                        icon: ShoppingCart,
                        title: "Compras y contratación responsable",
                        points: [
                            "Considerar criterios ambientales en la adquisición de bienes, suministros y servicios",
                            "Preferir proveedores con prácticas de reciclaje, reducción de huella de carbono y eficiencia energética",
                            "Incentivar productos y materiales de menor impacto ambiental",
                            "Evaluar alternativas con certificaciones ambientales reconocidas internacionalmente",
                        ],
                    },
                    {
                        icon: GraduationCap,
                        title: "Sensibilización y capacitación",
                        points: [
                            "Programas de formación continua sobre sostenibilidad y tecnología verde",
                            "Campañas internas de concientización para el ahorro de recursos",
                            "Hábitos responsables en el uso de energía, agua y materiales de oficina",
                            "Divulgar buenas prácticas de protección ambiental e innovación sostenible",
                        ],
                    },
                    {
                        icon: Lightbulb,
                        title: "Innovación tecnológica con impacto positivo",
                        points: [
                            "Impulsar proyectos y herramientas que mejoren la eficiencia operativa de los clientes",
                            "Promover soluciones digitales que reduzcan el consumo de papel y los procesos manuales ineficientes",
                            "Favorecer la automatización inteligente que optimice el uso de recursos",
                            "Incentivar herramientas con beneficios ambientales y sociales",
                        ],
                    },
                    {
                        icon: Cloud,
                        title: "Nube e inteligencia artificial",
                        points: [
                            "Uso eficiente y dimensionado de la infraestructura en la nube",
                            "Evitar el aprovisionamiento innecesario o excesivo y los servidores ociosos",
                            "Usar herramientas de inteligencia artificial de manera ética, moderada y energéticamente responsable",
                            "Procurar que las soluciones respeten criterios de sostenibilidad y eficiencia de procesamiento",
                        ],
                    },
                    {
                        icon: Users,
                        title: "Responsabilidades de los colaboradores",
                        points: [
                            "Usar de forma responsable y racional los recursos tecnológicos y materiales asignados",
                            "Cumplir las disposiciones de la política",
                            "Proponer iniciativas que favorezcan la sostenibilidad",
                            "Reportar oportunidades de mejora ambiental y participar en las capacitaciones",
                        ],
                    },
                    {
                        icon: ClipboardCheck,
                        title: "Monitoreo, revisión y vigencia",
                        points: [
                            "Revisiones periódicas de las prácticas e iniciativas ambientales",
                            "Indicadores internos de sostenibilidad, digitalización y eficiencia energética",
                            "La política se revisa de manera anual y se actualiza ante cambios normativos, tecnológicos o estratégicos",
                            "La Dirección General aprueba formalmente cualquier modificación",
                        ],
                    },
                ],
                commitment:
                    "La innovación y la sostenibilidad deben marchar de la mano: desarrollar tecnología responsable, promover buenas prácticas ambientales y contribuir a un futuro más eficiente, sostenible y respetuoso con el entorno, con un valor duradero para los colaboradores, los clientes y la sociedad en general.",
            },
        ],
    },

    {
        slug: "igualdad-inclusion-diversidad",
        title: "Reglamento de Políticas de Igualdad, Inclusión y Diversidad",
        shortTitle: "Igualdad, inclusión y diversidad",
        icon: HeartHandshake,
        code: "NC-CR-POL-IID-2026-01",
        version: "1.0",
        date: "octubre 2026",
        pdf: "/documents/Reglamento_Igualdad_Inclusion_Diversidad_Navasoft.pdf",
        summary:
            "Navasoft se compromete con un entorno de trabajo y de desarrollo de software inclusivo, accesible, diverso y equitativo, para que todas las personas puedan acceder a sus soluciones tecnológicas y beneficiarse de ellas.",
        parts: [
            {
                id: "personal-regular",
                tab: "I. Personal regular",
                title: "Personal regular",
                pdfPage: 1,
                purpose:
                    "Promover un entorno de trabajo y de desarrollo de software inclusivo, accesible, diverso y equitativo. Todas las personas, sin importar su género, edad, origen étnico, religión, orientación sexual, identidad de género, capacidades diferentes u otras características personales, deben poder acceder y beneficiarse de las soluciones tecnológicas de Navasoft.",
                appliesTo: [
                    "Empleados y colaboradores directos",
                    "Proveedores de servicios y productos",
                    "Socios estratégicos",
                    "Clientes y usuarios finales de las plataformas digitales",
                ],
                principles: [
                    {
                        title: "Igualdad de oportunidades",
                        text: "Acceso equitativo a oportunidades laborales y de desarrollo profesional.",
                    },
                    {
                        title: "No discriminación",
                        text: "Se prohíbe cualquier forma de discriminación en el entorno físico y digital.",
                    },
                    {
                        title: "Inclusión activa",
                        text: "Medidas para garantizar la plena participación de todos los usuarios y colaboradores.",
                    },
                    {
                        title: "Accesibilidad universal",
                        text: "Los productos digitales cumplirán con estándares internacionales de accesibilidad (WCAG, ADA).",
                    },
                    {
                        title: "Respeto mutuo",
                        text: "Un ambiente de respeto, tolerancia y colaboración.",
                    },
                ],
                sections: [
                    {
                        icon: Accessibility,
                        title: "Accesibilidad digital y tecnológica",
                        points: [
                            "Cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1)",
                            "Compatibilidad con lectores de pantalla y tecnologías de asistencia",
                            "Opciones de personalización: tamaño de fuente, contraste de colores y navegación con teclado",
                            "Subtítulos y transcripciones en materiales multimedia",
                            "No usar solo el color para transmitir información crítica",
                        ],
                    },
                    {
                        icon: Code,
                        title: "Diseño de software inclusivo y accesible",
                        points: [
                            "Todos los proyectos deben cumplir los estándares WCAG 2.1 AA",
                            "Pruebas de accesibilidad con usuarios reales",
                            "Documentar las prácticas de accesibilidad de cada proyecto",
                            "Sistemas utilizables por personas con diversas capacidades",
                        ],
                    },
                    {
                        icon: UserPlus,
                        title: "Reclutamiento y selección inclusiva",
                        points: [
                            "Procesos de contratación objetivos y transparentes",
                            "Eliminar barreras en los procesos de aplicación y entrevistas",
                            "Promover activamente la inclusión de personas con discapacidad",
                            "Ajustes razonables para participar en entrevistas y capacitaciones",
                        ],
                    },
                    {
                        icon: GraduationCap,
                        title: "Desarrollo profesional y capacitación",
                        points: [
                            "Programas de capacitación inclusivos y accesibles",
                            "Acceso a herramientas y plataformas adaptadas",
                            "Capacitaciones sobre igualdad, accesibilidad y no discriminación",
                        ],
                    },
                    {
                        icon: Building2,
                        title: "Adaptación de entornos laborales y digitales",
                        points: [
                            "Ajustes razonables para empleados con discapacidades",
                            "Espacios físicos y digitales acordes con las normas de accesibilidad vigentes",
                            "Herramientas digitales con opciones para personas con diversas capacidades",
                        ],
                    },
                    {
                        icon: ShieldAlert,
                        title: "Prevención del acoso y la discriminación",
                        points: [
                            "Cero tolerancia frente al acoso, la discriminación y el maltrato en cualquier forma",
                            "Canales confidenciales para denuncias y seguimiento de casos",
                            "Todos los incidentes se investigan con imparcialidad y responsabilidad",
                        ],
                    },
                    {
                        icon: Users,
                        title: "Comité de Igualdad, Inclusión y Diversidad",
                        points: [
                            "Monitorea el cumplimiento de las políticas",
                            "Propone mejoras continuas en las prácticas de inclusión",
                            "Atiende y resuelve las denuncias relacionadas con accesibilidad e inclusión",
                        ],
                    },
                    {
                        icon: Handshake,
                        title: "Responsabilidades de los colaboradores",
                        points: [
                            "Fomentar un ambiente inclusivo y respetuoso",
                            "Informar cualquier barrera de accesibilidad en productos o procesos",
                            "Participar en las capacitaciones sobre inclusión y accesibilidad",
                        ],
                    },
                    {
                        icon: ClipboardCheck,
                        title: "Monitoreo, evaluación y auditoría",
                        points: [
                            "Auditorías periódicas del cumplimiento del reglamento",
                            "Herramientas como Lighthouse, WAVE o TAW para validar la accesibilidad digital",
                            "Retroalimentación de usuarios y colaboradores para identificar mejoras",
                        ],
                    },
                ],
                commitment:
                    "Un mundo digital inclusivo, donde todas las personas puedan participar plenamente y sin barreras. Navasoft se compromete a liderar con el ejemplo, creando tecnología accesible, respetuosa e inclusiva para todos.",
            },
            {
                id: "contratacion",
                tab: "II. Contratación y planilla",
                title: "Contratación de personal y planilla",
                pdfPage: 5,
                purpose:
                    "Crear un entorno laboral inclusivo, equitativo y respetuoso, garantizando que todos los procesos de contratación, selección y administración de personal sean transparentes, justos y libres de discriminación.",
                appliesTo: [
                    "Proceso de contratación y selección de personal",
                    "Administración y gestión de la planilla de empleados",
                    "Programas de capacitación y desarrollo profesional",
                    "Adaptación de espacios y herramientas de trabajo",
                ],
                principles: [
                    {
                        title: "Igualdad de oportunidades",
                        text: "Acceso equitativo a empleos y oportunidades de desarrollo profesional.",
                    },
                    {
                        title: "No discriminación",
                        text: "Se prohíbe toda forma de discriminación por género, edad, religión, orientación sexual, capacidades diferentes, origen étnico, entre otros.",
                    },
                    {
                        title: "Inclusión activa",
                        text: "Promover la participación de personas con diferentes capacidades en todos los niveles organizacionales.",
                    },
                    {
                        title: "Respeto mutuo",
                        text: "Un ambiente de trabajo respetuoso, colaborativo y tolerante.",
                    },
                    {
                        title: "Transparencia",
                        text: "Claridad y equidad en los procesos de contratación y gestión de personal.",
                    },
                ],
                sections: [
                    {
                        icon: UserPlus,
                        title: "Reclutamiento y selección inclusiva",
                        points: [
                            "Procesos objetivos, basados en competencias y habilidades",
                            "Eliminar barreras físicas y tecnológicas en las aplicaciones y entrevistas",
                            "Promover la inclusión de personas con discapacidad y de otros grupos en situación de vulnerabilidad",
                            "Ajustes razonables y formatos accesibles en las ofertas de empleo",
                        ],
                    },
                    {
                        icon: Banknote,
                        title: "Igualdad salarial",
                        points: [
                            "Equidad salarial para trabajos de igual valor, sin importar género, edad, origen étnico u otra característica personal",
                            "Auditorías salariales periódicas para verificar su cumplimiento",
                        ],
                    },
                    {
                        icon: Building2,
                        title: "Adaptación de entornos laborales",
                        points: [
                            "Ajustes razonables en el entorno físico y tecnológico para empleados con discapacidades",
                            "Espacios laborales acordes con las normas de accesibilidad vigentes",
                            "Herramientas tecnológicas adaptadas a las necesidades individuales de los colaboradores",
                        ],
                    },
                    {
                        icon: GraduationCap,
                        title: "Capacitación y sensibilización",
                        points: [
                            "Programas de capacitación inclusivos y accesibles para todo el personal",
                            "Temas: igualdad de género, accesibilidad digital y física, y no discriminación",
                            "Talleres periódicos de sensibilización sobre inclusión y diversidad",
                        ],
                    },
                    {
                        icon: FileText,
                        title: "Procesos administrativos inclusivos",
                        points: [
                            "Nómina, vacaciones, permisos y beneficios equitativos y transparentes",
                            "Documentación del personal disponible en formatos accesibles",
                            "Ajustes razonables para procesos administrativos que representen barreras",
                        ],
                    },
                    {
                        icon: Award,
                        title: "Evaluación del desempeño inclusivo",
                        points: [
                            "Criterios inclusivos y accesibles en la evaluación del desempeño",
                            "Evitar sesgos relacionados con género, capacidades, edad u otros factores personales",
                            "Retroalimentación constructiva y accesible para todos los empleados",
                        ],
                    },
                    {
                        icon: ShieldAlert,
                        title: "Prevención del acoso y la discriminación",
                        points: [
                            "Cero tolerancia frente al acoso, la discriminación y el maltrato",
                            "Canales confidenciales de denuncia",
                            "Incidentes investigados con imparcialidad y responsabilidad",
                            "Apoyo a las personas afectadas y sanciones según corresponda",
                        ],
                    },
                    {
                        icon: Users,
                        title: "Comité de Igualdad, Inclusión y Diversidad",
                        points: [
                            "Monitorea el cumplimiento de las políticas",
                            "Propone mejoras continuas en la contratación y la gestión de personal",
                            "Atiende las denuncias relacionadas con accesibilidad e inclusión",
                        ],
                    },
                    {
                        icon: ClipboardCheck,
                        title: "Monitoreo y auditoría",
                        points: [
                            "Auditorías periódicas del cumplimiento de las políticas",
                            "Retroalimentación anónima de los empleados para identificar mejoras",
                            "Los resultados se usan para implementar planes de mejora continua",
                        ],
                    },
                ],
                commitment:
                    "Un ambiente laboral inclusivo, donde cada persona pueda desarrollar su máximo potencial, con procesos justos, accesibles y respetuosos para todos los colaboradores.",
            },
        ],
        shared: {
            title: "Aplica a ambas partes",
            sections: [
                {
                    icon: Scale,
                    title: "Cumplimiento de normativas",
                    points: [
                        sharedLaws,
                        "Política Nacional de Accesibilidad Digital de Costa Rica",
                        "Reglamento General de Protección de Datos (RGPD)",
                        "Normas ISO 9241 (usabilidad y experiencia del usuario)",
                    ],
                },
                {
                    icon: Gavel,
                    title: "Sanciones por incumplimiento",
                    points: [
                        "Advertencias escritas",
                        "Suspensión temporal",
                        "Terminación de contrato, según la gravedad del caso",
                        "Acciones legales, si corresponde",
                    ],
                },
                {
                    icon: RefreshCw,
                    title: "Revisión y vigencia",
                    points: [
                        "Se revisa anualmente para garantizar su efectividad",
                        "Se actualiza para cumplir nuevas normativas locales e internacionales",
                        "Entra en vigor con la aprobación de la Dirección General de Navasoft",
                    ],
                },
            ],
        },
    },
];

// Contacto que aparece al pie de ambos documentos
export const policiesContact = "(506) 4070-0772 / (506) 4070-0773";
