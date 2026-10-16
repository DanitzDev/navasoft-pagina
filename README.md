# Página web de Navasoft

Proyecto desarrollado con React, TypeScript, TanStack Start y Tailwind CSS.

## Ejecutar

```bash
npm ci
npm run dev
```

Disponible en `http://localhost:3000`.

## Validar y compilar

```bash
npm run generate-routes
npx tsc --noEmit
npm run lint
npm run build
```

Las rutas están en `src/routes` y el Navbar y Footer en `src/components/layout`.
El archivo `src/routeTree.gen.ts` es generado automáticamente y no debe editarse manualmente.

El contenido definitivo de las páginas y los formularios siguen en desarrollo.
