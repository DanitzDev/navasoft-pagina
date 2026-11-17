# Sitio web de Navasoft Soluciones

Sitio institucional de Navasoft, desarrollado con React, TypeScript, TanStack Start y Tailwind CSS. El proyecto genera páginas renderizadas en servidor y necesita Node.js para ejecutar tanto las páginas como los formularios conectados a ORDS.

## Inicio rápido

Requisitos: Node.js 22.12 o superior y npm.

```bash
npm ci
npm run dev
```

Abra <http://localhost:3000>. Para crear y ejecutar la versión de producción:

```bash
npm run build
npm start
```

## Documentación del proyecto

- [Guía del proyecto](docs/guia-del-proyecto.md): propósito, decisiones de contenido, rutas, arquitectura y cómo mantener los datos.
- [Guía de ejecución y despliegue](docs/guia-ejecucion-despliegue.md): instalación, variables de entorno, comandos, Plesk en Windows y diagnóstico.
- [Integración de oportunidades con ORDS](docs/integracion-oportunidades-ords.md): contrato de la API, validaciones de currículum, OAuth, límites y puesta en marcha.

## Comandos principales

| Comando                   | Para qué sirve                                   |
| ------------------------- | ------------------------------------------------ |
| `npm run dev`             | Servidor local de desarrollo en el puerto 3000.  |
| `npm run generate-routes` | Regenera el árbol de rutas de TanStack Router.   |
| `npx tsc --noEmit`        | Revisa tipos TypeScript sin emitir archivos.     |
| `npm run lint`            | Ejecuta ESLint.                                  |
| `npm run check`           | Comprueba formato con Prettier.                  |
| `npm test`                | Ejecuta las pruebas disponibles con `node:test`. |
| `npm run build`           | Compila los recursos del cliente y del servidor. |
| `npm start`               | Inicia la aplicación compilada con `app.js`.     |

Las rutas viven en `src/routes`. `src/routeTree.gen.ts` se genera automáticamente; no editarlo a mano. Las credenciales ORDS son privadas del proceso Node y nunca deben llevar el prefijo `VITE_`.
