# Guía del proyecto

Esta guía explica cómo está organizado el sitio institucional de Navasoft, dónde se mantiene cada tipo de contenido y qué decisiones del proyecto deben conservarse al ampliarlo.

## Propósito y decisiones vigentes

- El sitio presenta a Navasoft como una **empresa de tecnología especializada en transformar operaciones críticas**. Mantener esta idea en Nosotros, Inicio, áreas y contenido de marca.
- El dominio oficial configurado para URL canónicas y vistas previas es `https://navasoftsoluciones.com`. Se usa en los generadores de metadatos y la imagen Open Graph de reserva.
- Inicio y Nosotros comparten el mismo banner institucional, definido en `src/data/site.ts` y renderizado por el componente compartido.
- No publicar vacantes, beneficios, métricas, nombres de clientes ni promesas que no hayan sido confirmados por Navasoft. Las listas de vacantes y beneficios de oportunidades están vacías deliberadamente.
- Algunos datos conservan comentarios `MAQUETA`, `GENERADO` u `OMITIDO` en el código. Revisar su origen antes de presentarlos como afirmaciones corporativas. No eliminar esas marcas sin comprobar el contenido.
- El sitio tiene dos formularios que envían información al servidor y de ahí a ORDS: Contacto y Oportunidades. Sus credenciales y tokens nunca se envían al navegador.

## Mapa de páginas

Las rutas se crean a partir de archivos en `src/routes` mediante TanStack Router. Las rutas con `$slug` son páginas dinámicas que validan su contenido contra el catálogo correspondiente.

| URL                                         | Contenido y origen principal                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/`                                         | Inicio, secciones principales y banner institucional; `src/routes/index.tsx`, `src/data/hero.ts`, `src/data/site.ts`. |
| `/nosotros`                                 | Presentación, propósito, valores, historia y áreas de negocio; `src/data/about.ts`, `src/data/history.ts`.            |
| `/productos`                                | Catálogo del ecosistema; `src/data/products.ts`.                                                                      |
| `/productos/:slug`                          | Detalle de producto; datos en `src/data/product-details.ts`, metadatos en `src/data/product-meta.ts`.                 |
| `/areas/soluciones`                         | Soluciones para público y empresa, incluyendo ancla de clientes.                                                      |
| `/areas/innovationlab`                      | Página de InnovationLab.                                                                                              |
| `/sectores` y `/sectores/:slug`             | Índice y detalle de sectores; `src/data/sectors.ts` y `src/data/sector-pages.ts`.                                     |
| `/casos-de-exito` y `/casos-de-exito/:slug` | Índice, categorías y casos; `src/data/cases.ts`.                                                                      |
| `/politicas` y `/politicas/:slug`           | Índice y detalle de políticas; `src/data/policies.ts` y `src/data/policy-links.ts`.                                   |
| `/oportunidades`                            | Perfiles, áreas de interés y formulario de currículum; `src/data/opportunities.ts`.                                   |
| `/contacto`                                 | Formulario para consulta, reunión o demo; `src/data/contact.ts`.                                                      |
| `/soporte`                                  | Instrucciones y enlace al portal externo de tickets SAREM.                                                            |

Los nombres y slugs exactos se obtienen del catálogo del sitio; no crear rutas aisladas para contenido que deba compartir su catálogo. Los slugs anteriores que no estén en el catálogo ya no se redirigen: deben responder 404.

## Organización del código

```text
src/
  routes/                 Definición de rutas, metadatos y validación de slugs
  components/
    layout/               Navbar, Footer y composición común de las páginas
    ui/                   Controles reutilizables: botones, campos, tarjetas, etc.
    shared/               Elementos compartidos entre secciones
    sections/             Secciones de Inicio, Nosotros, Productos, Contacto...
  data/                   Catálogos y contenido del sitio
  lib/
    server/               Funciones y adaptadores exclusivos del servidor
    validation/           Validación de entradas de formularios
    contact/               Envío y resultados del formulario de contacto
  hooks/                  Hooks reutilizables
  styles.css              Entrada de estilos globales
  routeTree.gen.ts        Árbol de rutas generado; no editar manualmente
public/                   Imágenes, fuentes y otros recursos públicos
scripts/                  Automatizaciones de mantenimiento de recursos
tests/                    Pruebas automatizadas disponibles
docs/                     Guías de uso, mantenimiento y despliegue
app.js                    Arranque Node para la aplicación compilada y Plesk
```

### Cómo viaja una página

1. El archivo de `src/routes` declara la ruta, valida parámetros y configura sus metadatos.
2. La ruta presenta un componente de `src/components/sections`.
3. El componente recibe el catálogo o contenido desde `src/data` y reutiliza controles de `ui`, `shared` y `layout`.
4. `SiteLayout` añade el Navbar, el Footer y el enlace accesible para saltar al contenido.
5. `pageMeta` centraliza URL canónica, título, descripción y tarjetas para compartir.

Al añadir una ruta, crear el archivo siguiendo la convención de TanStack, añadir `head` con `pageMeta`, ejecutar `npm run generate-routes` y no editar a mano `src/routeTree.gen.ts`.

## Dónde actualizar contenido

| Quiero cambiar…    | Revisar primero…                                                         | Guía de mantenimiento                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Navegación         | `src/data/navigation.ts`, Navbar y Footer                                | Mantener destinos y etiquetas sincronizados; conservar accesibles los menús móvil y escritorio.                                                  |
| Productos          | `src/data/products.ts`, `product-details.ts`, `product-meta.ts`          | Usar el mismo `slug` en catálogo, detalle, imagen y metadatos. La ruta de detalle usa el catálogo para rechazar slugs desconocidos.              |
| Sectores           | `src/data/sectors.ts`, `src/data/sector-pages.ts`                        | El catálogo controla navegación y páginas válidas. Mantener slugs estables.                                                                      |
| Casos de éxito     | `src/data/cases.ts`                                                      | No inventar clientes, métricas o resultados. Respetar los textos que identifican clientes por sector cuando no hay autorización para nombrarlos. |
| Políticas          | `src/data/policies.ts`, `src/data/policy-links.ts`                       | Conservar enlaces a documentos y sus partes; verificar documentos de origen antes de reemplazarlos.                                              |
| Inicio / Nosotros  | `src/data/hero.ts`, `site.ts`, `about.ts`, `history.ts`, `government.ts` | Mantener el posicionamiento y reutilizar el banner acordado entre ambas páginas.                                                                 |
| Clientes y aliados | `src/data/clients.ts`, `client-directory.ts`, `partners.ts`              | Confirmar nombres, marcas y derechos de uso de logotipos.                                                                                        |
| Oportunidades      | `src/data/opportunities.ts`                                              | Vacantes y beneficios no se publican hasta recibir información aprobada. El contrato de envío se explica en la guía ORDS.                        |
| Imágenes           | `public/` y `src/data/image-manifest.json`                               | Usar `ResponsiveImage` cuando aplique; revisar textos alternativos, dimensiones y referencias antes de reemplazar recursos.                      |

Los componentes muestran el contenido, mientras que los catálogos mantienen listas y relaciones. Evitar duplicar etiquetas o datos de un catálogo dentro de varios componentes: una copia duplicada termina desactualizándose.

## Estilo y comportamiento

- Tailwind CSS 4 se procesa mediante `@tailwindcss/vite`; los estilos globales entran por `src/styles.css`.
- Para una interacción nueva, revisar primero los componentes de `src/components/ui` y los hooks existentes.
- Las páginas deben seguir funcionando con teclado, tener etiquetas y mensajes de error comprensibles, y conservar el enlace de salto al contenido.
- Mantener las preferencias de movimiento reducido cuando se agreguen animaciones. Revisar carruseles, foco y navegación tanto en móvil como en escritorio.
- Los enlaces de producto, sector, política y caso deben manejar slugs desconocidos con la página 404 de TanStack, no renderizar contenido vacío.

## Formularios y límites de confianza

- **Contacto:** `ContactForm` → `deliverContact` → `submitContact` → `handleContactSubmission` → validación/limitador → adaptador ORDS.
- **Oportunidades:** `ApplyForm` → `deliverApplication` → `submitOpportunity` → handler de servidor → validación de archivo y ORDS.
- Los datos recibidos por una Server Function siguen siendo entrada no confiable aunque el cliente use TypeScript. Validar en servidor, construir un payload con campos permitidos y no aceptar URL, token, IP ni destinatario desde el formulario.
- Configuración, resultado de OAuth, autenticación, tasas y pruebas del envío se explican en [guía de ejecución](guia-ejecucion-despliegue.md) y [guía ORDS de oportunidades](integracion-oportunidades-ords.md).
- Los cambios en los formularios deben mantener genéricos los errores visibles y evitar registrar información personal o contenido de adjuntos.

## Metadatos y dominio

Usar `pageMeta` en las rutas públicas para que URL canónica y URL social usen el origen compartido. El código ya está configurado para `https://navasoftsoluciones.com`; antes de publicar, confirmar que DNS, Plesk y el certificado HTTPS están listos.

Los orígenes de `src/lib/page-meta.ts`, `src/lib/seo.ts` y `src/routes/__root.tsx` ya apuntan al dominio nuevo. Si el entorno de compilación define `VITE_SITE_URL`, actualizarlo también a `https://navasoftsoluciones.com`, ya que prevalece sobre el valor predeterminado de `src/lib/seo.ts`. Mantener coherentes URL canónicas, Open Graph y Twitter Card; no cambiar cada página por separado.

Antes del corte, confirmar con quien administra el dominio los registros DNS del dominio raíz y `www`, el destino de hosting y la política de redirección. Instalar un certificado válido para los nombres que se publicarán, forzar HTTPS y acordar si `www` redirige al dominio raíz. Si se conserva `navasoft.es`, redirigir sus URL antiguas al destino equivalente en el nuevo dominio para preservar enlaces.

Después de desplegar, revisar que las páginas públicas respondan por HTTPS, que las redirecciones conserven rutas, que URL canónicas y tarjetas sociales utilicen `https://navasoftsoluciones.com`, y que recursos, formularios y páginas 404 funcionen. Actualizar también sitemap, robots, analítica y herramientas de buscadores si el proyecto o el hosting los utilizan. Registrar el commit desplegado, el resultado y el procedimiento de reversión.

## Archivos generados y recursos compilados

- `src/routeTree.gen.ts` lo administra el generador de rutas.
- `dist/` sale de `npm run build`; no editarlo como fuente. Está ignorado por Git.
- `node_modules/` se reconstruye con `npm ci` y no se mantiene a mano.
- `src/data/image-manifest.json` es el inventario generado/usado para recursos optimizados; tras cambiar imágenes, comprobar el comando `npm run images` y el diff antes de reemplazar otros archivos.
