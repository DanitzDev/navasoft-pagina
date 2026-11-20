# Checklist de cierre y entrega

Lista operativa para cerrar la revisión, publicar la rama en el entorno de pruebas y preparar la entrega. Los pasos de Plesk y ORDS deben marcarse únicamente después de ejecutarlos en ese entorno.

## Estado previo

- QA de navegación y errores: revisión reportada como terminada por el equipo.
- Postulación y currículum: recepción confirmada en el entorno de pruebas por el responsable de QA.
- Contacto: formulario presente en el repositorio actual; el hallazgo anterior se atribuyó a una copia de revisión desactualizada.
- Demo por producto: el producto se indicará en observaciones; no se enviará como campo o lista independiente.
- Testimonios: ocultos temporalmente hasta disponer de material aprobado.
- Longitud del nombre: requisito confirmado, entre 1 y 200 caracteres.
- Rendimiento, contraste, imagen social y video en tablet: revisados según confirmación de QA.

Este resumen registra confirmaciones del equipo; no sustituye evidencia o resultados guardados en el libro de pruebas.

## Limpieza del repositorio

- [ ] Confirmar que el árbol de trabajo no tenga cambios sin guardar (`git status -sb`).
- [ ] Confirmar que `develop` apunte al commit que se publicará y esté sincronizada con `origin/develop`.
- [ ] Revisar commits incluidos desde el último despliegue; mantener los cambios agrupados y con mensajes descriptivos.
- [ ] Confirmar que `.env`, secretos, currículums, exports, logs locales, `node_modules` y `dist` no estén versionados.
- [ ] Confirmar que los documentos enlazados en `README.md` existan y que no haya rutas antiguas referenciadas.
- [ ] No borrar ramas remotas como parte de la limpieza rutinaria. Eliminar ramas locales solo después de confirmar que están fusionadas y ya no se necesitan.

Comandos de revisión:

```bash
git status -sb
git log --oneline --decorate -15
git diff --check
git ls-files .env .env.local node_modules dist
```

## Validación antes de desplegar

Desde la raíz del proyecto, con Node.js `22.12` o superior:

```bash
npm ci
npm run generate-routes
npx tsc --noEmit
npm run lint
npm test
npx prettier --check .
npm run build
```

Si la generación de rutas modifica `src/routeTree.gen.ts`, revisar el cambio y comprometerlo antes de construir. No publicar si alguna validación falla. El build de producción debe realizarse desde el mismo commit que se desplegará.

## Identificación de versión

El repositorio tiene un tag histórico `release/2.0`; `package.json` declara `private: true` y no define una versión npm. Para esta entrega:

- [ ] Acordar el identificador con el responsable del proyecto; no asumir que la versión del paquete privado define la versión del sitio.
- [ ] Registrar el commit exacto de entrega (`git rev-parse HEAD`) junto al identificador en el informe.
- [ ] Si el equipo usa tags, crear un tag nuevo y único sobre el commit ya validado. No mover ni reutilizar `release/2.0`.
- [ ] Anotar la fecha, ambiente, commit/tag, responsable del despliegue y resultado del checklist.

## Despliegue al entorno de pruebas en Plesk

- [ ] Confirmar que el repositorio de Plesk apunta a `develop` y al `Application Root` correcto.
- [ ] Confirmar Node.js `22.12+`, modo `production` y `app.js` como archivo de inicio.
- [ ] Sincronizar el checkout con el commit/tag acordado.
- [ ] Instalar dependencias según el procedimiento del hosting (`npm ci --include=dev`) y ejecutar `npm run build` en ese checkout.
- [ ] Verificar que las variables ORDS estén configuradas en el entorno privado del proceso Node; nunca usar prefijo `VITE_` para secretos.
- [ ] Confirmar que `ORDS_BASE_URL` use HTTPS, que el cliente OAuth de pruebas tenga el rol esperado y que el certificado sea válido.
- [ ] Confirmar `ORDS_TRUST_X_FORWARDED_FOR` solo si IIS/proxy sobrescribe el encabezado con una IP real confiable.
- [ ] Reiniciar la aplicación Node y confirmar estado activo, HTTPS y logs sin errores de arranque.
- [ ] Verificar que IIS no exponga `.env`, `.git`, código fuente, `node_modules`, `dist/server` ni otros archivos privados.

## Verificación posterior al despliegue

- [ ] Abrir las rutas principales y revisar consola del navegador, recursos, enlaces internos y 404 de rutas inválidas.
- [ ] Confirmar formulario de contacto visible y envío de prueba recibido una sola vez.
- [ ] Enviar una postulación sintética con un currículum de prueba y confirmar el registro y el archivo en ORDS.
- [ ] Revisar `ords_opportunity_timing` en el log de Node/IISNode y archivar únicamente métricas sin datos personales.
- [ ] Comprobar que cinco intentos por IP dentro de 60 segundos pasan el control y que el sexto se limita; coordinar una ventana de prueba para no afectar a otros usuarios.
- [ ] Confirmar que una respuesta lenta o timeout no muestre éxito falso y consultar ORDS antes de repetir.
- [ ] Revisar que los formularios mantengan sus datos ante errores y que los errores de archivo/consentimiento sean accesibles con teclado y lector de pantalla.
- [ ] Ejecutar la regresión y prueba final del plan QA sobre el commit desplegado; guardar resultado y evidencia en el libro de pruebas.

## Cierre de entrega

- [ ] Actualizar el libro de pruebas con los estados finales y referencias a evidencia.
- [ ] Adjuntar README, guía del proyecto, arquitectura, ejecución/despliegue e integraciones de formularios.
- [ ] Registrar pendientes aceptados (por ejemplo, testimonios ocultos hasta recibir contenido aprobado) con responsable, sin clasificarlos como defectos corregidos.
- [ ] Entregar commit/tag, ambiente probado, fecha, resultados de pruebas y pasos de reversión.

## Reversión

Antes de desplegar, registrar el último commit estable del entorno. Si el build no inicia o falla una ruta crítica, volver Plesk a ese commit, reconstruir con su lockfile, reiniciar Node y verificar las rutas/formularios. No borrar registros ni datos de prueba en ORDS sin coordinarlo con su responsable.
