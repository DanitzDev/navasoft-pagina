# Contacto y futura integración con el CRM

## Estado actual

El formulario tiene un único servicio de envío: `deliverContact`. El servidor
valida la solicitud y la deriva a un transporte interno `CrmTransport`. El
transporte actual devuelve `unavailable`: no hay API del CRM configurada, no se
realizan solicitudes externas y no se muestra un éxito simulado al visitante.

`CONTACT_DELIVERY_MODE` no activa por sí solo una integración CRM. El adaptador
se implementará cuando exista un contrato aprobado. No se inventó una URL,
un esquema de autenticación ni un formato externo.

## Protecciones implementadas y alcance

- POST de TanStack Start con middleware CSRF explícito en `src/start.ts`.
  Valida el origen de las funciones de servidor y rechaza solicitudes sin
  evidencia de origen o procedentes de otro sitio.
- Validación en cliente y nuevamente en servidor: tipos, longitudes máximas,
  motivos permitidos y rechazo de caracteres de control. Se conservan tildes y
  saltos de línea válidos en el mensaje.
- Solo se entrega al transporte una lista explícita de campos normalizados.
  Se ignoran tokens, URLs y destinatarios proporcionados por el visitante.
- Campo trampa para detectar automatizaciones básicas. No equivale a CAPTCHA.
- Límite en memoria de 5 intentos cada 10 minutos, aplicado antes de validar o
  enviar. Máximo 1000 identidades, con expiración. Se guardan hashes con sal
  efímera, no direcciones IP en claro. No se confía en X-Forwarded-For.
- Sin IP disponible se comparte un único límite conservador. Detrás de un proxy
  pueden agruparse visitantes legítimos; se debe adaptar la identidad al hosting.
- Tiempo de espera de 10 segundos y señal de cancelación para el adaptador.
  Debe respetar esa señal. Un fallo o timeout devuelve estado incierto y nunca
  provoca un reintento automático.
- Los módulos `.server.ts` quedan protegidos por el compilador frente a imports
  del navegador. No se almacenan ni registran los datos de las consultas.

El límite en memoria NO es una protección distribuida: se reinicia con el proceso
y cada instancia mantiene su propio contador. Mientras eso no esté resuelto,
el transporte real permanece sin implementar y no envía al CRM.

## Información necesaria del equipo del CRM

Solicitar endpoint HTTPS y método, entorno de pruebas, autenticación y permisos,
campos y límites, ejemplos de aceptación y rechazo, códigos de error, cuotas,
soporte de idempotencia y responsable técnico. Las credenciales deben entregarse
por un canal seguro y configurarse solo en el servidor, nunca en variables VITE_.

Antes de activar el envío real también se debe definir el hosting, la identidad
fiable del visitante y el límite distribuido, tamaño máximo de cuerpo HTTP en el
proxy, protección contra bots y tratamiento de los datos en el CRM. Probar el
flujo contra su entorno de pruebas sin registrar secretos ni mensajes completos.

## Comprobaciones

`npm test` cubre validación, rechazo de automatización básica, límite local,
campos permitidos, errores del proveedor, cancelación y transporte desactivado.
`npx tsc --noEmit` y `npm run build -- --configLoader runner` verifican los tipos
y la separación de módulos durante la compilación.

## Simulaciones locales sin correos ni CRM

No necesitan claves ni realizan solicitudes externas. En PowerShell, antes de
iniciar Vite, seleccionar UNO de estos valores en el proceso:

```powershell
$env:CONTACT_DELIVERY_MODE = 'simulate-success'
npm run dev -- --configLoader runner
```

- `simulate-success`: muestra la confirmación, limpia los datos y permite otra consulta.
- `simulate-failure`: informa el fallo y conserva lo escrito.
- `simulate-unavailable`: informa que el servicio no está disponible y conserva lo escrito.
- `simulate-timeout`: espera el límite de 10 segundos y devuelve un resultado incierto, sin reintentar.

Estas respuestas solo se habilitan si `NODE_ENV` es `development`. En producción
se ignoran y el transporte continúa desactivado. El visitante no puede elegir
el modo desde el formulario o la URL. El límite local sigue activo en estas pruebas.
No presentar una confirmación simulada como evidencia de entrega al CRM.

Para volver al estado normal, detener el servidor y ejecutar:

```powershell
Remove-Item Env:CONTACT_DELIVERY_MODE -ErrorAction SilentlyContinue
```

No es necesario modificar `.env.local`. No hay proveedores externos de prueba.

## Contrato interno que debe mapearse con el equipo del CRM

Estos son los campos que valida nuestro servidor; no constituyen todavía el
contrato de la API externa. El CRM debe confirmar equivalencias y requisitos.

| Campo interno | Obligatorio | Regla actual                                                    |
| ------------- | ----------- | --------------------------------------------------------------- |
| name          | Sí          | Texto de 2 a 100 caracteres                                     |
| email         | Sí          | Correo válido, máximo 254 caracteres                            |
| organization  | No          | Texto de hasta 150 caracteres                                   |
| phone         | No          | Hasta 30 caracteres; de 7 a 15 dígitos y separadores permitidos |
| reason        | Sí          | consulta, reunion o demo                                        |
| message       | Sí          | Texto de 10 a 3000 caracteres; permite saltos de línea          |

Se recortan espacios exteriores. Los opcionales omitidos se normalizan a cadena
vacía; si se proporcionan deben ser texto. El campo trampa `website` no se envía
al CRM. Tampoco se aceptan del navegador destinatarios, credenciales o URLs de envío.

Para la integración pendiente, el responsable del CRM debe confirmar:

1. URL HTTPS, método y entorno de pruebas.
2. Autenticación, permisos mínimos y forma segura de entregar credenciales.
3. Nombres, tipos y límites de campos; formato del teléfono y motivos de contacto.
4. Qué respuesta demuestra la aceptación de la consulta y, si existe, su identificador.
5. Errores de validación, autenticación, límite de solicitudes e indisponibilidad.
6. Tiempo máximo de respuesta y mecanismo de idempotencia para evitar duplicados.
7. Responsable de atender consultas y política de conservación de datos.

## Revisión del formulario antes de conectar el CRM

- Un envío vacío señala campos y lleva el foco al primer error.
- Los errores se actualizan al editar campos revisados.
- Durante el envío se bloquean campos y botón; un segundo submit no crea otra solicitud.
- Éxito: confirmación separada y acción para enviar otra consulta.
- Fallo, indisponibilidad o demora: se conserva el contenido; no hay reintentos automáticos.
- Límite de intentos: botón bloqueado con tiempo restante, mientras los campos siguen editables.
- La espera en pantalla es informativa: la protección efectiva se aplica en el servidor.
- Recargar la página no conserva datos personales en almacenamiento local.

## Revisión previa a guardar la rama

- Retirada la integración anterior y sus variables locales; no hay envío directo desde el navegador.
- CSRF comprobado por HTTP: POST con origen externo y POST sin evidencia de origen devuelven 403.
- 12 pruebas del servicio, verificación TypeScript y compilación de producción correctas.
- Actualizados seroval y zod a versiones compatibles corregidas. La auditoría de dependencias de producción no reportó vulnerabilidades conocidas en esta revisión.
- La auditoría completa conserva 19 avisos moderados en herramientas de desarrollo (cadena de ESLint/minimatch). Requieren una actualización coordinada de herramientas; no se aplicaron las degradaciones incompatibles sugeridas por `npm audit fix --force`.
- La seguridad de producción requiere resolver las condiciones del hosting descritas arriba y probar el contrato real del CRM. Esta revisión no equivale a una auditoría de penetración ni garantiza ausencia de vulnerabilidades.
