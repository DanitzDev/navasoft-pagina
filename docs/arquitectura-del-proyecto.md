# Arquitectura del proyecto

Guía técnica para orientarse en el sitio web institucional de Navasoft Soluciones. Resume cómo se organizan las páginas, el contenido y las funciones de servidor, y dónde realizar cambios comunes.

## Tecnologías y ejecución

- **React 19 y TypeScript** implementan la interfaz y mantienen tipos estáticos.
- **TanStack Start y TanStack Router** ofrecen renderizado del lado del servidor, Server Functions y rutas basadas en archivos.
- **Vite** desarrolla y compila la aplicación; **Tailwind CSS 4** procesa utilidades y estilos.
- El servidor de producción es Node.js 22.12 o superior, iniciado por `app.js`. Sirve los recursos compilados de `dist/client` y entrega las demás solicitudes a TanStack Start.

Comandos habituales:

```bash
npm ci
npm run dev
npm run generate-routes
npx tsc --noEmit
npm run lint
npm test
npm run build
npm start
```

`npm run dev` inicia el sitio en `http://localhost:3000`. Los pasos de despliegue y configuración de secretos están en [Guía de ejecución y despliegue](guia-ejecucion-despliegue.md).

## Estructura del repositorio

```text
src/
  routes/                 Rutas de TanStack Router
  components/
    layout/               Composición general, encabezado, navegación y pie
    sections/             Componentes organizados por página/área de negocio
    shared/               Componentes compartidos entre secciones
    ui/                   Controles visuales reutilizables
  data/                   Catálogos y contenido editorial
  hooks/                  Hooks reutilizables
  lib/
    contact/              Adaptación de envío y tipos de resultado de Contacto
    server/               Server Functions y adaptadores exclusivos de Node
    validation/           Validación compartida de formularios
  styles/                 Estilos por área
  types/                  Tipos compartidos
  routeTree.gen.ts        Archivo generado por TanStack Router
public/                   Imágenes, tipografías, documentos y video
scripts/                  Utilidades de mantenimiento de recursos
tests/                    Pruebas automatizadas con node:test
docs/                     Documentación del proyecto
app.js                    Arranque de la aplicación compilada
```

Los nombres de carpetas bajo `components/sections` reflejan las áreas funcionales (home, about, products, sectors, contact, careers, entre otras). Los componentes deben presentar datos y coordinar interacción; el contenido reutilizable se mantiene en `src/data` cuando corresponda.

## Rutas

TanStack Router deriva la ruta tipada de la ubicación del archivo. Las rutas dinámicas `$slug` deben validar el parámetro contra su catálogo y devolver 404 si no existe.

| Página | URL | Archivos de ruta / contenido |
| --- | --- | --- |
| Inicio | `/` | `routes/index.tsx`, `data/hero.ts`, `data/site.ts` |
| Nosotros | `/nosotros` | `routes/nosotros.tsx`, `data/about.ts`, `data/history.ts` |
| Áreas | `/areas/:slug` | `routes/areas.$slug.tsx`, `data/areas.ts`, `data/innovation.ts` |
| Productos | `/productos`, `/productos/:slug` | `routes/productos/`, `data/products.ts`, `data/product-details.ts` |
| Sectores | `/sectores`, `/sectores/:slug` | `routes/sectores/`, `data/sectors.ts`, `data/sector-pages.ts` |
| Casos de éxito | `/casos-de-exito`, `/casos-de-exito/:slug` | `routes/casos-de-exito/`, `data/cases.ts` |
| Políticas | `/politicas`, `/politicas/:slug` | `routes/politicas/`, `data/policies.ts`, `data/policy-links.ts` |
| Contacto | `/contacto` | `routes/contacto.tsx`, `data/contact.ts` |
| Oportunidades | `/oportunidades` | `routes/oportunidades.tsx`, `data/opportunities.ts` |
| Soporte | `/soporte` | `routes/soporte.tsx` |

Al crear, mover o renombrar un archivo de ruta, ejecutar `npm run generate-routes`. Revisar el cambio generado, pero no editar `src/routeTree.gen.ts` manualmente.

## Flujo de renderizado

1. Una ruta en `src/routes` configura la página y, cuando aplica, sus metadatos y validación de parámetros.
2. La ruta carga un componente de página o sección de `src/components/sections`.
3. Los componentes leen catálogos en `src/data` y componen controles de `ui`, `shared` y `layout`.
4. `SiteLayout` integra navegación global, pie de página y estructura accesible común.
5. `src/lib/page-meta.ts` centraliza metadatos y el origen de las URL canónicas/sociales.

Las Server Functions son el límite entre navegador y servicios privados. Todo dato que llega desde una Server Function es entrada no confiable y debe validarse otra vez en servidor.

## Catálogos y contenido

| Contenido | Fuente principal |
| --- | --- |
| Navegación | `src/data/navigation.ts` |
| Inicio, banner y métricas | `src/data/hero.ts`, `site.ts`, `stats.ts` |
| Empresa e historia | `src/data/about.ts`, `history.ts`, `government.ts` |
| Áreas y productos | `src/data/areas.ts`, `innovation.ts`, `products.ts`, `product-details.ts`, `product-meta.ts` |
| Sectores | `src/data/sectors.ts`, `sector-pages.ts` |
| Casos y testimonios | `src/data/cases.ts`, `testimonials.ts` |
| Clientes y aliados | `src/data/clients.ts`, `client-directory.ts`, `partners.ts` |
| Políticas | `src/data/policies.ts`, `policy-links.ts` |
| Contacto y oportunidades | `src/data/contact.ts`, `opportunities.ts` |
| Recursos de imagen | `public/` y `src/data/image-manifest.json` |

No inventar nombres de clientes, métricas, resultados, vacantes ni beneficios. Confirmar con responsables de Navasoft las afirmaciones y derechos de uso de logos antes de publicarlos. Revisar anotaciones como `MAQUETA`, `GENERADO` u `OMITIDO` antes de convertir ese contenido en afirmaciones corporativas.

## Formularios

### Contacto

El formulario de consulta comercial llama a `deliverContact`, que usa la Server Function `submitContact`. El endpoint valida, limita solicitudes y transforma el resultado del CRM a estados comprensibles para la interfaz. Las credenciales OAuth viven en el proceso Node. Ver [Integración del formulario de contacto](integracion-contacto-ords.md).

### Oportunidades

El formulario de postulación valida datos y currículum en el servidor y entrega el contenido a ORDS mediante OAuth. La guía [Integración de oportunidades con ORDS](integracion-oportunidades-ords.md) describe el contrato, validaciones, límites y aceptación.

Los dos flujos comparten un límite de cinco intentos por IP dentro de 60 segundos, implementado en memoria por instancia. Los errores de cara al usuario no deben divulgar excepciones internas. No registrar credenciales, tokens, campos personales ni adjuntos.

## Estilos, accesibilidad y movimiento

`src/styles.css` importa estilos globales y `src/styles/` organiza estilos por contexto. Los componentes deben conservar etiquetas, foco visible, navegación con teclado, textos alternativos útiles y mensajes de validación asociados al control correspondiente. Las animaciones y carruseles deben respetar `prefers-reduced-motion`.

Antes de crear un control nuevo, revisar `src/components/ui` y `src/components/shared`. Para imágenes con variantes adaptables, usar el componente `ResponsiveImage` cuando aplique y mantener sincronizados el recurso y el manifiesto.

## Reglas de mantenimiento

- Mantener catálogos como fuente de verdad; evitar duplicar datos y slugs dentro de componentes.
- Al modificar navegación, verificar que cada enlace corresponda a una ruta vigente.
- Mantener el dominio canónico centralizado en `src/lib/page-meta.ts`.
- No modificar `routeTree.gen.ts` ni `dist/` a mano: ambos se regeneran durante generación/compilación.
- `node_modules/` se reconstruye con `npm ci`.
- Después de un cambio de rutas, tipos, servidor o contenido, elegir las verificaciones pertinentes (`npm run generate-routes`, `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`).

## Documentos relacionados

- [Guía del proyecto](guia-del-proyecto.md): criterios editoriales y mantenimiento de contenido.
- [Guía de ejecución y despliegue](guia-ejecucion-despliegue.md): configuración local, variables, Plesk y diagnóstico.
- [Integración del formulario de contacto](integracion-contacto-ords.md): contrato técnico y operación de Contacto.
- [Integración de oportunidades con ORDS](integracion-oportunidades-ords.md): contrato técnico de postulaciones.
