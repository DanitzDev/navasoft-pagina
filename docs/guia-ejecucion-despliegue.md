# Guía de ejecución y despliegue

Pasos para instalar, ejecutar, revisar y desplegar el sitio. El proyecto necesita un proceso Node activo: una carpeta estática por sí sola no puede renderizar las rutas ni atender los formularios de servidor.

## Requisitos

- Node.js **22.12 o superior**. `package.json` declara el requisito.
- npm, Git y acceso al repositorio.
- Para compilar: dependencias de desarrollo instaladas (`npm ci` en local o `npm ci --include=dev` en Plesk).
- Para enviar formularios a ORDS: variables privadas del backend y acceso de red al endpoint Oracle.

Confirme la versión instalada antes de empezar:

```bash
node --version
npm --version
```

Si Node es anterior a `v22.12.0`, actualícelo antes de instalar y compilar.

## Preparar una copia local

Desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

El servidor de desarrollo queda en `http://localhost:3000` y recarga cambios al guardar. Para detenerlo, use `Ctrl+C` en la terminal.

La web puede revisarse sin credenciales ORDS, pero los formularios no guardarán datos en el CRM sin una configuración válida. No use postulaciones reales de personas para probar. Las variables en `.env.example` son nombres y ejemplo del endpoint; no contiene client ID ni secreto válidos.

### Variables de entorno

Los formularios utilizan estas variables del proceso Node:

| Variable                     | Requerida     | Descripción                                                                            |
| ---------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `ORDS_BASE_URL`              | Sí para ORDS  | URL base HTTPS con `/ords/navasoft`, sin barra final.                                  |
| `ORDS_CLIENT_ID`             | Sí para ORDS  | Cliente OAuth habilitado para rol `nsw_contacto_backend`.                              |
| `ORDS_CLIENT_SECRET`         | Sí para ORDS  | Secreto privado del cliente.                                                           |
| `ORDS_TRUST_X_FORWARDED_FOR` | Según hosting | `true` solo si proxy confiable sobrescribe `X-Forwarded-For`; de lo contrario `false`. |
| `CONTACT_DELIVERY_MODE`      | No            | Simulación local del formulario de contacto; valores abajo.                            |

Nunca use `VITE_` en nombres de secretos. Variables con ese prefijo pueden quedar embebidas en el bundle del navegador.

Para desarrollo local también puede guardar las cuatro variables ORDS en `.env.local` en la raíz del proyecto. Vite carga únicamente esas variables permitidas al proceso del servidor cuando ejecuta `npm run dev`; `.env.local` está excluido de Git. Use solo credenciales del ambiente de pruebas y reinicie el servidor después de modificar el archivo.

Para la terminal PowerShell, puede definir variables solo para esa sesión antes de `npm run dev`:

```powershell
$env:ORDS_BASE_URL = 'https://<host>/ords/navasoft'
$env:ORDS_CLIENT_ID = '<client-id>'
$env:ORDS_CLIENT_SECRET = '<secret>'
$env:ORDS_TRUST_X_FORWARDED_FOR = 'false'
npm run dev
```

Sustituya los marcadores por credenciales entregadas por el administrador de ORDS. No pegue secretos en el repositorio, capturas, logs, tickets ni canales compartidos. Cierre la terminal al terminar para eliminar esas variables de la sesión.

### Simular Contacto localmente

Solo el formulario de contacto tiene transportes de simulación. En una terminal aparte:

```powershell
$env:CONTACT_DELIVERY_MODE = 'simulate-success'
npm run dev
```

Modos admitidos: `simulate-success`, `simulate-failure`, `simulate-unavailable` y `simulate-timeout`. Se seleccionan en el servidor local y no llaman a ORDS. La simulación está deshabilitada automáticamente en producción. Para volver al envío configurado, cierre la terminal o ejecute `Remove-Item Env:CONTACT_DELIVERY_MODE`.

El formulario de oportunidades no tiene modo de simulación: sin credenciales/IP responde que el servicio está indisponible; un éxito real requiere ORDS. Consulte [Integración de oportunidades con ORDS](integracion-oportunidades-ords.md) y la [documentación original de la API](integracion-oportunidades-ords.pdf).

## Compilar, ejecutar y revisar

Generar rutas al crear o renombrar archivos de ruta, validar tipos, ejecutar lint y producir build:

```bash
npm run generate-routes
npx tsc --noEmit
npm run lint
npm test
npm run build
```

`npm test` usa `node:test`. `tests/contact.test.ts` cubre el servicio, la validación y el limitador de Contacto; `tests/opportunities.test.ts` cubre la validación server-side de postulaciones y archivos; `tests/opportunities-ords.test.ts` verifica el cliente HTTP con respuestas ORDS simuladas. Las pruebas simuladas no son end-to-end ni sustituyen la aceptación real de ORDS. El formulario de Oportunidades requiere comprobarse con credenciales de prueba y archivos sintéticos coordinados con el equipo; siga la [guía de integración](integracion-oportunidades-ords.md).

Para levantar el build en modo producción local:

```bash
npm start
```

Luego revise `http://localhost:3000`. `npm start` ejecuta `node app.js`, que carga `dist/server/server.js`, entrega estáticos desde `dist/client` y escucha el `PORT` del entorno; cuando no existe, usa `3000`. Para crear el build antes de arrancar, ejecute `npm run build`.

### Archivos de rutas

TanStack genera `src/routeTree.gen.ts`. Tras agregar o cambiar una ruta, ejecute `npm run generate-routes`; revise el diff, pero no corrija el archivo generado manualmente. Ejecute después TypeScript y build para detectar referencias inválidas.

## Despliegue a Plesk en Windows

Este procedimiento refleja el arranque Node preparado para el hosting de pruebas. Antes de publicar, confirme el estado y la configuración reales del dominio en Plesk; el hecho de que el proyecto tenga build local no significa que ya esté publicado.

1. En **Git** de Plesk, configure el repositorio y la rama acordada (el flujo documentado previamente usa `develop`) con despliegue manual. Confirme que el destino del repositorio coincide con **Application Root**.
2. En **Node.js**, elija Node.js `22.12` o superior, npm, modo `production` y `app.js` como **Application Startup File**.
3. En la configuración usada para Plesk Windows, **Document Root** y **Application Root** apuntan a la carpeta del proyecto. Confirme esta disposición con quien administre el hosting antes de desplegar.
4. En esa carpeta ejecute:

   ```bash
   npm ci --include=dev
   npm run build
   ```

5. Configure variables ORDS en el entorno privado del proceso. `app.js` también intenta cargar un archivo `.env` en la carpeta padre de `Application Root`; para que sea privado, colóquelo fuera de `httpdocs` y limite permisos al usuario del proceso Node.
6. Habilite o reinicie la aplicación Node desde Plesk. IIS/Plesk proporciona `PORT`; `app.js` acepta tanto puerto numérico como canalización nombrada de IISNode.
7. Revise HTTPS, logs de Node y las rutas esenciales con la lista de abajo.

#### Rutas físicas de `web.config`

Si cambia el dominio y Plesk también cambia la carpeta física del sitio, actualice en `web.config` las rutas absolutas para las páginas de error de IIS (`error_docs`) y `compilation` (`tempDirectory`). Por ejemplo, si Plesk muestra `C:\Inetpub\vhosts\navasoftsoluciones.com` como raíz física, las rutas deben apuntar a sus carpetas `error_docs` y `tmp` dentro de esa raíz. Confirme la ruta exacta en Plesk: el nombre del directorio puede ser distinto del dominio. Si Plesk conserva la misma ruta física, no la cambie solo por el cambio de dominio.

Este ajuste de rutas físicas es independiente del dominio canónico y de las URL sociales; si también cambia el dominio público, actualice la configuración descrita en [Metadatos y dominio](guia-del-proyecto.md#metadatos-y-dominio).

Para la migración prevista a `navasoftsoluciones.com`, confirme con el administrador los registros DNS para el dominio raíz y `www`, el destino del hosting, la emisión del certificado HTTPS y la redirección acordada entre `www` y el dominio raíz. Si `navasoft.es` seguirá activo, configure una redirección permanente que conserve la ruta y los parámetros de la URL. Actualice las referencias de dominio en el código y despliegue el build producido desde el commit acordado.

`app.js` sirve archivos públicos únicamente desde `dist/client` y envía otras solicitudes al servidor TanStack. Como Document Root puede coincidir con Application Root, pida al administrador verificar que IIS no exponga por acceso HTTP directo código fuente, `node_modules`, `dist/server`, `.env`, manifiestos, Git u otros archivos internos. No considere una prueba de navegador suficiente para confirmar que esas rutas están bloqueadas.

### Lista de comprobación después del despliegue

- [ ] Node está en `22.12` o superior y Plesk indica que la aplicación está activa.
- [ ] `/`, `/nosotros`, `/productos`, `/sectores`, `/casos-de-exito` y `/politicas` responden por HTTPS.
- [ ] `/contacto`, `/oportunidades` y `/soporte` cargan y sus enlaces funcionan.
- [ ] Un slug inválido y una URL retirada muestran 404.
- [ ] CSS, imágenes y recursos de cliente cargan sin 404.
- [ ] La configuración de ORDS está presente solo en el servidor. No probar un envío real con datos personales sin autorización y coordinación.
- [ ] IIS no permite descargar fuentes, dependencias, secretos, manifiestos ni bundle SSR.
- [ ] `https://navasoftsoluciones.com` y la variante `www` siguen la política acordada, tienen HTTPS válido y redirigen correctamente.
- [ ] URL canónicas, Open Graph y Twitter Card usan `https://navasoftsoluciones.com`; los recursos, formularios y rutas conservan su funcionamiento.

## Diagnóstico rápido

| Síntoma                                              | Qué revisar                                                                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| El proceso termina al iniciar                        | Ejecutar `npm run build`; revisar Node `22.12+`, `PORT`, archivo de inicio `app.js` y log de Plesk.                                                 |
| Respuesta 500 al abrir páginas después de actualizar | Confirmar que el build corresponde al mismo checkout y reiniciar Node tras actualizar archivos.                                                     |
| Página funciona pero faltan CSS o imágenes           | Confirmar que `npm run build` generó `dist/client` y que Plesk ejecuta el `app.js` de esa misma carpeta.                                            |
| Contacto muestra servicio no disponible              | Revisar variables ORDS, `CONTACT_DELIVERY_MODE`, IP confiable y logs sin imprimir credenciales.                                                     |
| ORDS devuelve 401                                    | Verificar que ID y secreto pertenezcan al mismo cliente; oportunidades renueva y repite una vez.                                                    |
| ORDS devuelve 403                                    | Revisar asignación del rol `nsw_contacto_backend` y privilegio del módulo ORDS.                                                                     |
| ORDS devuelve 415                                    | Confirmar que el proxy preserve `Content-Type: application/json`.                                                                                   |
| Oportunidades rechaza PDF/Word                       | Verificar tamaño ≤ 5 MiB, extensión, MIME enviado por el navegador y contenido real del archivo. DOCX debe contener `word/document.xml`.            |
| El usuario ve límite de solicitudes                  | Contacto y oportunidades comparten cinco intentos por IP cada 60 segundos; en hosting con múltiples instancias el contador en memoria no es global. |
| El formulario no confirma después de una demora      | Un timeout puede ser ambiguo: ORDS pudo recibirlo. Consultar logs por etapa/HTTP y comprobar duplicado antes de pedir otro envío.                   |

Los logs de formulario deben usarse para identificar etapa y código HTTP, nunca para copiar payloads, adjuntos, correos, teléfonos, secretos o tokens.

### Medir el tiempo de postulaciones

El backend escribe una línea JSON por intento con `event: "ords_opportunity_timing"`. En Plesk, revise el log de la aplicación Node.js/IISNode donde se capture `stdout` (salida estándar) y busque ese nombre de evento. La ubicación exacta depende de la configuración de Plesk/IISNode; también puede aparecer en **Dominios → Registros** si el hosting redirige allí la salida del proceso.

Ejemplo de campos registrados:

```json
{
  "event": "ords_opportunity_timing",
  "requestId": "<id-aleatorio>",
  "outcome": "sent",
  "validationMs": 69,
  "oauthMs": 935,
  "submissionMs": 6853,
  "totalMs": 7880,
  "responseStatus": 201
}
```

- `validationMs`: validación del formulario y del archivo en el backend.
- `oauthMs`: solicitud de token y lectura de su respuesta; queda en `0` si se reutilizó un token en caché.
- `submissionMs`: tiempo desde que se inicia el POST a ORDS hasta que `fetch` recibe sus encabezados de respuesta. Incluye transferencia/red y procesamiento de ORDS hasta responder; no separa esas dos partes.
- `totalMs`: duración total en el backend, incluida la preparación del payload y las etapas anteriores.
- `outcome` y `responseStatus`: resultado de la operación y estado HTTP de ORDS, si se recibió.
- `requestId`: identificador aleatorio para correlacionar esta línea con datos de diagnóstico; no contiene información de la postulación.

Para investigar lentitud, recopile varias solicitudes válidas de prueba con tamaños distintos de currículum (por ejemplo, un PDF pequeño y otro mayor), anote `submissionMs` y `totalMs`, y compare. Use solamente archivos sintéticos y personas de prueba autorizadas. Si el tiempo aumenta con el archivo, investigue la transferencia del Base64. Si es parecido con tamaños distintos, solicite al administrador de ORDS el tiempo de procesamiento del handler y de almacenamiento del adjunto para correlacionarlo por hora. Un único valor no permite atribuir el retraso a la red, a Plesk o a ORDS.

Como referencia, una prueba registrada el 2026-11-21 devolvió `201/sent`, con `validationMs=69`, `oauthMs=935`, `submissionMs=6853` y `totalMs=7880`. En esa muestra la mayor parte del tiempo estuvo en el POST y la espera de respuesta de ORDS; no se midió por separado la red y el trabajo interno de Oracle.

Una advertencia de Node `[DEP0005] Buffer() is deprecated` es independiente de estos tiempos y no significa que el envío haya fallado. El código de la aplicación usa `Buffer.from`; si el aviso persiste, utilice `node --trace-deprecation` en un entorno de diagnóstico para localizar si lo emite una dependencia. No comparta el log completo si contiene rutas privadas o datos operativos.

## Comandos auxiliares

| Comando           | Uso                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run check`   | Comprueba formato Prettier en el repositorio.                                                                      |
| `npm run format`  | Reescribe formato y ejecuta autofix ESLint en todo el repositorio; revisar el diff completo antes de conservarlo.  |
| `npm run images`  | Ejecuta `scripts/optimize-images.mjs`; revisar cambios en `public/` y el manifiesto antes de incorporarlos.        |
| `npm run preview` | Inicia Vite Preview para inspeccionar el build local; el arranque de hosting documentado sigue siendo `npm start`. |
