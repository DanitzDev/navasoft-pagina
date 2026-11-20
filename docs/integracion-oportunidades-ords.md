# Integración de Oportunidades con ORDS

Guía operativa para habilitar y aceptar el envío de postulaciones. El contrato de negocio debe coincidir con la documentación oficial de la API (`integracion-oportunidades-ords.pdf`). No crear un handler Oracle con nombres de columnas o reglas distintos a ese contrato.

## Qué se configura

El navegador envía la postulación a una Server Function del sitio. El servidor valida los campos y el archivo y luego actúa como cliente OAuth de ORDS. Las credenciales permanecen en el proceso Node y nunca se envían al navegador.

| Componente                 | Ruta o valor                                     | Responsable        |
| -------------------------- | ------------------------------------------------ | ------------------ |
| Función del sitio          | Server Function `submitOpportunity` (POST)       | Aplicación web     |
| Token OAuth                | `{ORDS_BASE_URL}/oauth/token`                    | Administrador ORDS |
| Recepción de postulaciones | `{ORDS_BASE_URL}/contacto/oportunidades`         | Administrador ORDS |
| Cliente OAuth              | `client_credentials`, rol `nsw_contacto_backend` | Administrador ORDS |

`ORDS_BASE_URL` es la base HTTPS del módulo, por ejemplo `https://<host>/ords/navasoft`, sin barra final. No apuntar al URL del token ni al del recurso directamente.

## Requisitos para quien administra ORDS

- Habilitar el módulo y el handler `POST /contacto/oportunidades` en el ambiente de pruebas.
- Proteger el recurso con OAuth Bearer y otorgar al cliente únicamente el rol/privilegio `nsw_contacto_backend` necesario para este handler.
- Crear credenciales independientes para pruebas y producción. Entregar el ID y el secreto por un canal seguro para instalarlos como variables privadas del proceso Node.
- Aceptar `Content-Type: application/json` y el encabezado `X-Navasoft-Client-IP` que envía el backend.
- Implementar el contrato de recepción descrito en la guía de API, incluyendo la decodificación del currículum Base64 y sus límites.
- Devolver `201` con `{"resultado":"creado"}` al guardar una postulación nueva. Para una solicitud reconocida como ya recibida, devolver `200` con `{"resultado":"ya_recibido"}`. Un `200` o `201` sin ese cuerpo no se considera éxito en el sitio.
- Responder `429` con `Retry-After` cuando el propio ORDS aplique un límite; el sitio devuelve ese tiempo al usuario.
- Proveer una forma segura de consultar el registro creado y comprobar el currículum, sin exponer datos personales en logs.

Si ORDS requiere IP de cliente, coordinar con la administración del hosting cómo se obtiene. El sitio usa la IP de la solicitud, y solo lee `X-Forwarded-For` cuando `ORDS_TRUST_X_FORWARDED_FOR=true` y el proxy confiable sobrescribe ese encabezado. No confiar en un encabezado que el navegador pueda falsificar.

## Variables privadas del servidor

Configurar en el entorno del proceso Node, no en variables `VITE_` ni en código cliente:

```text
ORDS_BASE_URL=https://<host>/ords/navasoft
ORDS_CLIENT_ID=<id-entregado-por-ords>
ORDS_CLIENT_SECRET=<secreto-entregado-por-ords>
ORDS_TRUST_X_FORWARDED_FOR=false
```

Para pruebas locales se pueden establecer temporalmente en la sesión de PowerShell antes de `npm run dev`. En Plesk/producción se configuran en el entorno privado de Node o en el `.env` privado descrito en la guía de despliegue. No subir valores reales a Git ni copiarlos a logs, capturas o chats.

Sin base URL, credenciales o una IP válida, el formulario devuelve indisponibilidad y no confirma una postulación.

## Validaciones antes de llamar a ORDS

El servidor rechaza solicitudes fabricadas desde fuera de la interfaz si no cumplen estas reglas:

- Nombre: 1–200 caracteres.
- Correo: formato básico válido y hasta 254 caracteres.
- Teléfono: ocho dígitos nacionales; el payload ORDS lleva `codigo_pais_celular: "+506"` y los dígitos en `numero_celular`.
- Perfil: `profesional` o `practicante`, mapeados a `PROFESIONAL` o `PRACTICANTE`.
- Área: una de las áreas vigentes, mapeada al código ORDS correspondiente.
- Consentimiento: debe ser el booleano real `true`.
- Currículum: PDF, DOC o DOCX; extensión y MIME deben coincidir; máximo 5 MiB. DOCX se comprueba como ZIP con `word/document.xml`.
- Presentación opcional: máximo 600 caracteres. URL de perfil opcional: HTTP o HTTPS y máximo 2000 caracteres.
- El adaptador Node limita cada cuerpo HTTP a 9 MiB antes de leerlo; ese margen permite el Base64 de un archivo de 5 MiB más los campos del formulario.

## Limitador de solicitudes

Contacto y Oportunidades comparten el límite del servidor: **5 intentos por IP dentro de 60 segundos**. Se aplica antes de llamar a ORDS y al sexto intento dentro de la ventana se devuelve `rate_limited`. Este requisito no es cinco intentos en diez minutos.

El contador actual vive en memoria. Si Node corre en varias instancias, cada instancia tendrá un contador independiente; para un límite global, el hosting debe ofrecer un almacén compartido (por ejemplo Redis) antes de considerar el límite distribuido.

## Plan de aceptación en ambiente de pruebas

Usar un correo y datos sintéticos autorizados, y un PDF/DOCX de prueba sin datos personales. Acordar previamente con ORDS quién comprobará los registros y archivos.

1. Solicitud válida: comprobar `201/creado`, una sola fila, campos normalizados y archivo recibido íntegro.
2. Revisión de opcionales: enviar sin URL de perfil ni presentación; no deben aparecer valores inventados.
3. Rechazos desde HTTP directo: nombre/correo/teléfono/perfil/área inválidos, consentimiento ausente, MIME/extensión discordantes, archivo corrupto y archivo mayor a 5 MiB. Confirmar que ORDS no recibió esos casos.
4. Duplicado reconocido: repetir únicamente con un caso de prueba acordado y comprobar que ORDS responda `200/ya_recibido` sin crear otro registro.
5. Límite: desde la misma IP hacer cinco intentos dentro de 60 segundos y verificar que el sexto se detenga antes de ORDS; desde otra IP debe contarse aparte.
6. Fallos: probar credenciales inválidas, respuesta `5xx`, pérdida de conexión y timeout. No debe mostrarse éxito falso. Tras un timeout se debe consultar ORDS antes de repetir, porque el servidor pudo guardar la postulación.
7. Confirmar que logs de aplicación y ORDS no guardan secretos, tokens, correo, teléfono ni contenido del currículum.

## Interpretación del resultado y reintentos

La interfaz solo presenta éxito cuando la función de servidor reconoce la respuesta contractual de ORDS: `201` con `resultado: "creado"`, o `200` con `resultado: "ya_recibido"`. Un `200` de la ruta interna `/_serverFn/...` significa que la Server Function respondió al navegador; para demostrar persistencia, hay que revisar además `outcome: "sent"` y `responseStatus: 200/201` en la medición del backend, y confirmar el registro en ORDS.

El cliente no reintenta automáticamente un envío cuyo resultado es incierto. Si vence el timeout, se pierde la conexión o el navegador no recibe confirmación, ORDS podría haber guardado la postulación antes de cortarse la respuesta. Antes de volver a enviarla, consultar el registro con el equipo de selección/ORDS y el identificador de prueba; no asumir que un timeout equivale a rechazo.

| Estado registrado          | Interpretación operativa                                                               | Acción recomendada                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `sent`, HTTP `201`         | ORDS informó que creó el registro.                                                     | Confirmar fila y archivo durante aceptación.                                                         |
| `sent`, HTTP `200`         | ORDS informó que la solicitud ya se había recibido.                                    | Comprobar que no haya duplicado y que exista el registro original.                                   |
| `rate_limited`, HTTP `429` | ORDS aplicó su propio límite.                                                          | Respetar `Retry-After`; no automatizar reintentos rápidos.                                           |
| `failed` con HTTP          | ORDS respondió, pero el estado/cuerpo no cumple el contrato esperado.                  | Revisar estado y contrato en logs de ORDS, sin copiar el payload.                                    |
| `failed` sin HTTP          | No se obtuvo una respuesta HTTP válida, por ejemplo un error de red/TLS/configuración. | Revisar conectividad, certificado, configuración y logs de Node.                                     |
| `timeout`                  | El límite conjunto del cliente venció sin confirmación.                                | Buscar el registro en ORDS antes de repetir.                                                         |
| `unavailable`              | Falta configuración requerida o una IP válida para hacer la llamada.                   | Revisar variables privadas y configuración del proxy; no pedir al usuario reintentar sin corregirla. |

## Diagnóstico de rendimiento

La línea `ords_opportunity_timing` se emite desde Node al finalizar cada intento validado. Los campos se explican en la [guía de ejecución y despliegue](guia-ejecucion-despliegue.md). Tome varias muestras de aceptación y registre únicamente fecha/hora, `requestId`, tamaño del currículum, tiempos, resultado y estado HTTP. El tamaño puede anotarse manualmente en la prueba; no se registra el contenido ni nombre del archivo.

Procedimiento recomendado:

1. Confirmar que el ambiente probado y la revisión desplegada sean los esperados; registrar la hora local y zona horaria.
2. Usar datos sintéticos autorizados y al menos dos currículums válidos de tamaños distintos, sin acercarse al máximo si no es necesario.
3. Esperar la línea de timing correspondiente a cada intento y comparar `oauthMs`, `submissionMs` y `totalMs`.
4. Repetir cada tamaño varias veces. OAuth puede ser cercano a cero porque los tokens se mantienen en caché; comparar una solicitud fría con solicitudes posteriores por separado.
5. Si `submissionMs` aumenta claramente con el tamaño, pedir al hosting revisar transferencia/salida de red y al equipo ORDS revisar recepción del cuerpo Base64.
6. Si `submissionMs` permanece alto independientemente del tamaño, pedir a ORDS el tiempo interno del handler, conversión Base64, escritura del BLOB y confirmación de transacción. Correlacionar por hora y `requestId` si el sistema Oracle registra un ID correlacionable; no añadir datos personales a la búsqueda.
7. No cambiar el timeout, eliminar validaciones ni permitir reintentos automáticos hasta entender si el cuello es tamaño, red o procesamiento y acordar la semántica de duplicados.

`submissionMs` engloba transferencia de la solicitud y espera hasta que Node recibe los encabezados de respuesta. No mide por separado DNS, conexión TLS, subida de bytes, handler PL/SQL, escritura del archivo ni lectura del JSON de respuesta. Para separar esos componentes se requieren mediciones adicionales en el proxy/hosting y ORDS.

## Pruebas disponibles en el repositorio

`npm test` cubre validaciones y límites de longitud/tamaño, además del cliente HTTP contra respuestas ORDS simuladas en memoria. Estas pruebas verifican el contrato de la aplicación; no prueban credenciales, red, handler ni persistencia del ambiente Oracle. El cierre de B-12 requiere completar el plan de aceptación anterior contra ORDS.
