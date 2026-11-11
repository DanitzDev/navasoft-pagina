# Página web de Navasoft

Proyecto desarrollado con React, TypeScript, TanStack Start y Tailwind CSS.

## Ejecutar

```bash
npm ci
npm run dev
```

Disponible en `http://localhost:3000`.

## Ejecutar la compilación de producción

Usa Node.js 22.12 o superior.

```bash
npm ci --include=dev
npm run build
npm start
```

## Entorno de pruebas en Plesk para Windows

1. Confirma que el panel del dominio de pruebas muestra Node.js 22.12 o
   superior.
2. En **Git**, conecta el repositorio remoto, selecciona la rama `develop` y usa
   despliegue manual. El destino de Git debe coincidir con **Application Root**.
3. En **Node.js**, selecciona `npm`, el modo `production` y `app.js` como
   **Application Startup File**. En Plesk para Windows, **Document Root** y
   **Application Root** apuntan a la misma carpeta.
4. Desde esa carpeta, ejecuta `npm ci --include=dev` y `npm run build`. Después
   habilita Node.js o reinicia la aplicación si ya estaba habilitada. Plesk
   arranca `app.js` con el `PORT` asignado por el hosting.
5. Antes de compartir el enlace, verifica que funcionen `/`, `/soporte`,
   `/contacto` y `/oportunidades` por HTTPS. Confirma con el administrador que
   IIS bloquea el acceso HTTP directo a los archivos internos, incluidos `src/`, `dist/server/`,
   `node_modules/`, los archivos de entorno y los manifiestos de npm. La
   aplicación sirve los recursos públicos desde `dist/client`.

## Validar y compilar

```bash
npm run generate-routes
npx tsc --noEmit
npm run lint
npm run build
```

Las rutas están en `src/routes` y el Navbar y Footer en `src/components/layout`.
El archivo `src/routeTree.gen.ts` es generado automáticamente y no debe editarse manualmente.

El formulario de contacto consume ORDS desde su función de servidor. Configura
`ORDS_BASE_URL`, `ORDS_CLIENT_ID` y `ORDS_CLIENT_SECRET` en el entorno privado
del proceso Node. El cliente OAuth requiere el rol `nsw_contacto_backend`. Usa
`ORDS_TRUST_X_FORWARDED_FOR=true` solo si el proxy de confianza del hosting
reescribe ese encabezado; de forma predeterminada se usa la IP de la conexión.
