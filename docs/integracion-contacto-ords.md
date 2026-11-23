# Integración del formulario de contacto con ORDS

Esta guía describe el flujo técnico para recibir consultas comerciales desde `/contacto` y registrarlas en el servicio ORDS de Navasoft. El adaptador necesita credenciales y conectividad configuradas en el servidor Node.

## Arquitectura del flujo

```text
ContactForm (navegador)
  → deliverContact (src/lib/contact/submit.ts)
  → submitContact (Server Function POST)
  → handleContactSubmission
  → processContact (límite y validación)
  → ordsContactTransport (OAuth y API ORDS)
  → POST {ORDS_BASE_URL}/contacto/mensajes
```

La interfaz no recibe ni escoge URL, destinatario, client ID, secreto o token. La IP se obtiene en el servidor y se envía a ORDS en el encabezado `X-Navasoft-Client-IP`.

## Configuración

Variables privadas del proceso Node:

```text
ORDS_BASE_URL=https://<host>/ords/navasoft
ORDS_CLIENT_ID=<client-id>
ORDS_CLIENT_SECRET=<secret>
ORDS_TRUST_X_FORWARDED_FOR=false
```

La base debe ser HTTPS y terminar en la raíz del módulo, sin barra final. El cliente OAuth debe tener los permisos requeridos por el módulo. Nunca usar prefijo `VITE_` en secretos ni incluir credenciales en el repositorio.

`ORDS_TRUST_X_FORWARDED_FOR` se establece en `true` únicamente cuando el proxy de confianza sustituye el encabezado y el adaptador de hosting entrega la IP del peer en el formato esperado. Por defecto se usa la IP obtenida por TanStack Start. Para Plesk/IIS, coordinar este valor con quien administra el hosting.

## Validación de datos

El mismo validador se usa en cliente y servidor, pero la validación server-side es la que protege la integración. Los valores se recortan y se construye un objeto con campos permitidos.

| Campo | Reglas del servidor |
| --- | --- |
| Nombre | Requerido, 1–200 caracteres, sin controles de línea. |
| Correo | Formato básico `usuario@dominio`, máximo 254 caracteres, sin controles. |
| Organización | Opcional, máximo 200 caracteres y una línea. |
| Teléfono | Opcional; requiere código internacional `+` y entre 7 y 15 dígitos totales. Separa código de país y número nacional. |
| Motivo | `consulta`, `reunion` o `demo`. |
| Mensaje | Requerido, 10–3000 caracteres; conserva saltos de línea permitidos. |
| Consentimiento | Debe ser booleano `true`. |
| Honeypot `website` | Debe estar vacío; un valor relleno se rechaza. |

Los tipos y límites se definen en `src/lib/validation/contact.ts`; las opciones del formulario también están en `src/data/contact.ts`.

## Contrato HTTP con ORDS

### Token OAuth

El backend solicita un token con OAuth `client_credentials`:

```http
POST {ORDS_BASE_URL}/oauth/token
Authorization: Basic base64(client_id:client_secret)
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```

Se espera una respuesta JSON con `token_type: "Bearer"`, `access_token` de tipo texto y `expires_in` numérico positivo. El token se almacena en memoria del proceso Node, separado por URL base y cliente, y se renueva con 30 segundos de margen. Si ORDS responde 401 al registrar el mensaje, se renueva y reintenta una sola vez.

### Registro del mensaje

```http
POST {ORDS_BASE_URL}/contacto/mensajes
Authorization: Bearer <access-token>
Content-Type: application/json
X-Navasoft-Client-IP: <ip-cliente>
```

El adaptador transforma el formulario a este contrato:

```json
{
  "nombre_completo": "Nombre de ejemplo",
  "correo_electronico": "persona@example.com",
  "organizacion": "Organización opcional",
  "codigo_pais_celular": "+506",
  "numero_celular": "88887777",
  "motivo_contacto": "CONSULTA_GENERAL",
  "mensaje": "Consulta de ejemplo con longitud válida.",
  "autoriza_contacto": true
}
```

`organizacion` se omite si está vacía. Los campos de teléfono se omiten si no se proporcionó número. El motivo se mapea así:

| Valor del formulario | Valor ORDS |
| --- | --- |
| `consulta` | `CONSULTA_GENERAL` |
| `reunion` | `SOLICITAR_REUNION` |
| `demo` | `SOLICITAR_DEMO` |

La guía de API debe confirmar que `SOLICITAR_REUNION` y `SOLICITAR_DEMO` son códigos aceptados por el ambiente configurado; el código los envía actualmente para esas dos opciones.

## Respuestas y resultado visible

| Respuesta ORDS | Interpretación del adaptador |
| --- | --- |
| HTTP 201 con `{"resultado":"creado"}` | `sent`: ORDS creó el mensaje. |
| HTTP 200 con `{"resultado":"ya_recibido"}` | `sent`: ORDS reconoce que ya recibió el mensaje. |
| HTTP 422 | `remote_invalid`: ORDS rechazó el contenido. |
| HTTP 429 | `rate_limited`: se propaga `Retry-After`; si falta o es inválido, se usa 60 segundos. |
| Otro HTTP no exitoso | `failed`. |
| Error de red o timeout | `uncertain`, porque la solicitud pudo haber sido aceptada antes del corte. |
| Configuración incompleta o IP ausente | `unavailable`. |

El procesamiento aplica un timeout de 10 segundos. No reintenta automáticamente una solicitud con resultado ambiguo. Antes de pedir al usuario que vuelva a enviar, verificar en ORDS si el registro fue creado.

## Protección contra abuso y privacidad

- Contacto y Oportunidades comparten **5 intentos por IP cada 60 segundos**, antes de validar y llamar a ORDS.
- Las IP se canonicalizan para evitar múltiples representaciones. La clave del limitador es un hash con sal aleatoria del proceso, no la IP en claro.
- El límite vive en memoria. Con varias instancias de Node, cada una tendrá su propio contador; para una cuota global se requiere almacenamiento compartido.
- Las redirecciones HTTP se rechazan en llamadas a token y mensajes para no reenviar credenciales o datos a otro destino.
- Los mensajes de log incluyen etapa, estado HTTP e identificador de seguimiento cuando existe. No deben incluir payload, correo, teléfono, mensaje, token ni secreto.

## Pruebas y aceptación

El repositorio permite probar el validador y el adaptador con respuestas simuladas. La prueba automatizada no acredita credenciales reales, configuración de proxy, disponibilidad de red ni persistencia en Oracle.

Para aceptar en el ambiente ORDS de pruebas:

1. Usar consultas sintéticas, consentimiento de prueba y teléfonos/correos no personales.
2. Confirmar que la solicitud válida se registra una sola vez y que la forma del payload coincide con el handler.
3. Confirmar tratamiento correcto de campos opcionales y de cada motivo de contacto.
4. Probar datos inválidos y honeypot no vacío; verificar que no lleguen a ORDS.
5. Probar 401, 422, 429, 5xx, timeout y pérdida de conexión; revisar que no se muestre éxito falso.
6. Verificar el límite: cinco intentos en 60 segundos y rechazo del siguiente intento en la misma IP.
7. Revisar logs de aplicación y ORDS para confirmar que no registran datos personales ni credenciales.

## Archivos relacionados

- `src/components/sections/contact/ContactForm.tsx`: captura de datos y estados de interfaz.
- `src/lib/contact/submit.ts`: llamada de interfaz a Server Function.
- `src/lib/server/end-contact.ts`: definición de Server Function.
- `src/lib/server/contact/endpoint.server.ts`: selección del transporte y entrada del servicio.
- `src/lib/server/contact/service.server.ts`: límite, validación y timeout.
- `src/lib/server/contact/crm.server.ts`: OAuth, contrato HTTP y mapeo al CRM.
- `src/lib/server/contact/shared-limiter.server.ts`: límite compartido con Oportunidades.
- `src/lib/server/request-ip.server.ts`: obtención y canonicalización de IP.
- `src/lib/validation/contact.ts`: tipos, límites y reglas de validación.
- `tests/contact.test.ts`: pruebas del flujo, validación y límites.
