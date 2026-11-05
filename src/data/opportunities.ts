import {
  Briefcase,
  Bug,
  Code,
  Cpu,
  Database,
  Globe,
  Hammer,
  Handshake,
  Layers,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/*
 * Cómo leer los comentarios de este archivo:
 *   // MAQUETA   → texto que sale de la maqueta (adaptado al "usted" del sitio)
 *   // GENERADO  → texto escrito por Claude con base en la maqueta; validar con Navasoft
 *   // OMITIDO   → algo de la maqueta que no se usó, y por qué
 */

export type ProfileId = 'profesional' | 'practicante'
export type AreaId =
  | 'desarrollo'
  | 'calidad'
  | 'infraestructura'
  | 'innovation'
  | 'comercial'
  | 'administracion'

// Lo que pide quien hace clic en un botón: perfil y/o área para dejar elegidos en el formulario
export type ApplyIntent = { profile?: ProfileId; area?: AreaId }

export type Profile = {
  id: ProfileId
  tab: string
  formLabel: string
  summary: string
  points: { title: string; text: string }[]
}

export type InterestArea = {
  id: AreaId
  label: string
  description: string
  icon: LucideIcon
}

export type Opening = {
  id: string
  title: string
  profile: ProfileId
  area: AreaId
  modality?: string
  summary: string
  requirements?: string[]
  example?: boolean
}

export type Perk = {
  icon: LucideIcon
  title: string
  text: string
  example?: boolean
}

// Interruptor: muestra la etiqueta "Ejemplo" en todo lo que no es información real
export const SHOW_EXAMPLE_LABEL = true

export const careersCopy = {
  hero: {
    eyebrow: 'Talento', // MAQUETA
    title: 'Profesionales y practicantes, en proyectos reales.', // MAQUETA
    // GENERADO. OMITIDO: la maqueta lista "municipalidades, plantas, juntas de agua y condominios";
    // quité la lista porque la información real de Gridxia ya no habla de agua.
    description:
      'Aquí se entra a sistemas que ya están en operación, con código y clientes reales, y con proyectos en Costa Rica y Centroamérica.',
    facts: [
      'Equipo en Costa Rica', // MAQUETA
      'Proyectos en Centroamérica', // MAQUETA
      'Modalidad según el rol y el proyecto', // MAQUETA
    ],
    image: '/images/area-empresarial.jpeg', // MAQUETA
    imageAlt: '', // MAQUETA
  },

  profiles: {
    eyebrow: 'Perfiles', // GENERADO
    title: 'Dos puertas de entrada', // MAQUETA
  },

  areas: {
    eyebrow: 'Áreas de interés', // MAQUETA (etiqueta del campo del formulario)
    title: '¿En qué área le gustaría aportar?', // GENERADO
    description: 'Explore las áreas en las que le gustaría aportar.', // GENERADO
  },

  platforms: {
    eyebrow: 'En qué se trabaja', // GENERADO
    title: 'Plataformas propias y proyectos para gobierno y empresa', // GENERADO
    // GENERADO: es una suposición razonable (los productos y las áreas son reales), pero que alguien
    // de Navasoft confirme que las personas nuevas se integran a esos equipos.
    description:
      'Según el área, las personas se integran a los equipos de las plataformas SaaS de Navasoft o a proyectos para el sector público y empresarial.',
  },

  steps: {
    eyebrow: 'Cómo aplicar', // MAQUETA (título del formulario)
    title: 'Así es el proceso', // GENERADO
  },

  openings: {
    eyebrow: 'Convocatorias', // GENERADO
    title: 'Posiciones abiertas', // GENERADO
    emptyTitle: 'No hay convocatorias publicadas por ahora', // GENERADO
    // GENERADO a partir de "Si hay un encaje, le escribimos"
    emptyText: 'Puede consultar por futuras oportunidades con nuestro equipo.',
    emptyCta: 'Consultar por oportunidades', // GENERADO
  },

  perks: {
    eyebrow: 'Beneficios', // GENERADO
    title: 'Lo que ofrece Navasoft', // GENERADO
  },

  faq: {
    title: 'Preguntas frecuentes', // GENERADO
  },

  apply: {
    eyebrow: 'Cargar currículum', // MAQUETA
    title: 'Envíe su currículum', // MAQUETA (descripción de la página)
    description:
      'PDF o Word. Si hay un encaje, le escribimos. No hay portal de seguimiento automático.', // MAQUETA
    checklistTitle: 'Qué necesita', // GENERADO
    checklist: [
      'Su currículum en PDF o Word, de hasta 5 MB',
      'Un correo y un teléfono de contacto',
      'El perfil y el área en la que quiere aportar',
    ], // GENERADO a partir de los campos del formulario
    whatsappText: '¿Prefiere escribirnos?', // GENERADO
    whatsappLabel: 'WhatsApp (506) 4070-0776', // MAQUETA (pie de página)
    whatsappHref: 'https://wa.me/50640700776', // MAQUETA (pie de página)
    consent:
      'Autorizo a Navasoft Soluciones a revisar este currículum con fines de reclutamiento. No se comparte con terceros.', // MAQUETA
    successTitle: 'Simulación completada', // GENERADO
    successText: 'El currículum de prueba no se envió.', // GENERADO
    errorText:
      'No pudimos enviar su currículum. Intente de nuevo o escríbanos por WhatsApp al (506) 4070-0776.', // GENERADO
  },
}

export const profiles: Profile[] = [
  {
    id: 'profesional',
    tab: 'Profesional',
    formLabel: 'Profesional', // MAQUETA (opción del formulario)
    // MAQUETA
    summary:
      'Desarrollo (Oracle Apex, web, móvil), datos, infraestructura, IoT, implementación o comercial. Se valora oficio más que títulos sueltos.',
    points: [
      {
        title: 'Para quién', // GENERADO
        text: 'Personas con experiencia en alguna de estas áreas que quieran aportar a plataformas que ya están en operación.',
      },
      {
        title: 'Qué se hace', // GENERADO
        text: 'Se trabaja en proyectos para el sector público, el sector empresarial y las plataformas SaaS de Navasoft, según el área.',
      },
      {
        title: 'Cómo se define', // MAQUETA
        text: 'Si hay un encaje, Navasoft escribe a la persona. La modalidad se define según el rol y el proyecto.',
      },
    ],
  },
  {
    id: 'practicante',
    tab: 'Practicante',
    formLabel: 'Practicante / pasante', // MAQUETA (opción del formulario)
    // MAQUETA. OMITIDO: "en una fábrica pequeña"; dejé solo "fábrica de software" porque
    // "pequeña" no es algo que la empresa quiera necesariamente decir de sí misma.
    summary:
      'Estudiantes que quieran aprender en una fábrica de software, con código y clientes reales. Las prácticas se acuerdan con el centro de estudio.',
    points: [
      {
        title: 'Para quién', // MAQUETA
        text: 'Estudiantes que quieran aprender haciendo, con código y clientes reales.',
      },
      {
        title: 'Qué se hace', // MAQUETA ("No hay un programa de sombras")
        text: 'Se entra directamente a proyectos reales: no hay un programa de sombras.',
      },
      {
        title: 'Cómo se acuerda', // MAQUETA
        text: 'Las prácticas se acuerdan con el centro de estudio.',
      },
    ],
  },
]

// Tres ideas que la maqueta repite dentro de sus textos, ordenadas como tarjetas
export const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Hammer,
    title: 'Oficio más que títulos sueltos', // MAQUETA
    text: 'Se valora lo que la persona sabe hacer.', // GENERADO
  },
  {
    icon: Layers,
    title: 'Proyectos reales', // GENERADO
    text: 'Se entra a sistemas que ya operan, con código y clientes reales.', // MAQUETA
  },
  {
    icon: Globe,
    title: 'Costa Rica y Centroamérica', // MAQUETA
    text: 'El equipo está en Costa Rica, con proyectos en el país y en la región. La modalidad depende del rol y del proyecto.', // MAQUETA
  },
]

// Los nombres (label) son las opciones del formulario de la maqueta; las descripciones son GENERADAS
export const areas: InterestArea[] = [
  {
    id: 'desarrollo',
    label: 'Desarrollo de software',
    description: 'Aplicaciones web y móviles, y plataformas con Oracle Apex.',
    icon: Code,
  },
  {
    id: 'calidad',
    label: 'Calidad y pruebas',
    description: 'Pruebas y control de calidad de las plataformas.',
    icon: Bug,
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura y bases de datos',
    description:
      'Servidores, bases de datos y la infraestructura donde operan las plataformas.',
    icon: Database,
  },
  {
    id: 'innovation',
    label: 'IoT, IA y NavaLav',
    description: 'El Innovation Lab: IA, IoT y Cloud.', // IA, IoT y Cloud: del sitio (área Innovation Lab)
    icon: Cpu,
  },
  {
    id: 'comercial',
    label: 'Comercial e implementación',
    description: 'Acercar las plataformas a los clientes y ponerlas en marcha.',
    icon: Handshake,
  },
  {
    id: 'administracion',
    label: 'Administración',
    description: 'Apoyo administrativo y financiero a la operación.',
    icon: Briefcase,
  },
]

// GENERADO a partir de las frases de la maqueta
export const applySteps = [
  {
    title: 'Consulte cómo postularse',
    text: 'Escríbanos e indique el perfil y el área que le interesan.', // MAQUETA
  },
  {
    title: 'Revisamos su perfil',
    text: 'Si hay un encaje, le escribimos. No hay portal de seguimiento automático.', // MAQUETA
  },
  {
    title: 'Definimos las condiciones',
    text: 'Las prácticas se acuerdan con el centro de estudio; en el caso de profesionales, la modalidad se define según el rol y el proyecto.', // MAQUETA
  },
]

// GENERADAS con respuestas tomadas de la maqueta
export const careersFaqs = [
  {
    question: '¿Cómo consulto por una oportunidad?',
    answer: 'Use el enlace de contacto en la sección de postulaciones.',
  },
  {
    question: '¿Qué pasa después de enviar mi currículum?',
    answer:
      'Si hay un encaje, Navasoft le escribe. No hay un portal de seguimiento automático.',
  },
  {
    question: '¿Dónde se trabaja y en qué modalidad?',
    answer:
      'El equipo está en Costa Rica, con proyectos en el país y en Centroamérica. La modalidad depende del rol y del proyecto.',
  },
  {
    question: '¿Cómo funcionan las prácticas?',
    answer:
      'Las prácticas se acuerdan con el centro de estudio. No hay un programa de sombras: se entra directamente a proyectos reales, con código y clientes reales.',
  },
  {
    question: '¿Se comparte mi currículum con terceros?',
    answer:
      'No. Se revisa con fines de reclutamiento y no se comparte con terceros.',
  },
  {
    question: '¿Qué áreas hay disponibles?',
    answer:
      'Desarrollo de software, calidad y pruebas, infraestructura y bases de datos, IoT, IA y NavaLav, comercial e implementación, y administración.',
  },
]

/*
 * CONVOCATORIAS: vacías a propósito. La maqueta no trae vacantes y no quiero inventarlas.
 * Cuando Navasoft pase una, agrégala aquí y la página muestra la lista con filtros.
 * Ejemplo (no lo descomentes con datos falsos):
 *
 * {
 *   id: "dev-apex-2026",
 *   title: "Desarrollador Oracle Apex",
 *   profile: "profesional",
 *   area: "desarrollo",
 *   modality: "Según el proyecto",
 *   summary: "Descripción corta del puesto.",
 *   requirements: ["Requisito 1", "Requisito 2"],
 * },
 */
export const openings: Opening[] = []

/*
 * BENEFICIOS: vacíos por la misma razón. La sección se oculta sola mientras no haya datos.
 * Ejemplo:
 *   { icon: GraduationCap, title: "Título del beneficio", text: "Descripción real." },
 */

export const perks: Perk[] = []
