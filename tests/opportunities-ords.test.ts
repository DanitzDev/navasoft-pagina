import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sendOpportunityToOrds } from '../src/lib/server/opportunities/ords.server.ts'

const validApplication = {
  nombre: 'Persona de Prueba',
  correo: 'postulacion@example.test',
  telefono: '88887777',
  enlace: '',
  presentacion: 'Postulación sintética de integración.',
  perfil: 'profesional',
  area: 'desarrollo',
  consentimiento: true,
  curriculumNombre: 'cv-prueba.pdf',
  curriculumMime: 'application/pdf',
  curriculumBase64: Buffer.from('%PDF-1.4\nCV sintético\n%%EOF').toString(
    'base64',
  ),
}

function configureOrds(
  t: { after: (callback: () => void) => void },
  suffix: string,
) {
  const previousFetch = globalThis.fetch
  const previousEnv = {
    baseUrl: process.env.ORDS_BASE_URL,
    clientId: process.env.ORDS_CLIENT_ID,
    clientSecret: process.env.ORDS_CLIENT_SECRET,
  }
  const baseUrl = `https://ords-${suffix}.example.test/ords/navasoft`
  process.env.ORDS_BASE_URL = baseUrl
  process.env.ORDS_CLIENT_ID = 'integration-test-client'
  process.env.ORDS_CLIENT_SECRET = 'integration-test-secret'

  t.after(() => {
    globalThis.fetch = previousFetch
    if (previousEnv.baseUrl === undefined) delete process.env.ORDS_BASE_URL
    else process.env.ORDS_BASE_URL = previousEnv.baseUrl
    if (previousEnv.clientId === undefined) delete process.env.ORDS_CLIENT_ID
    else process.env.ORDS_CLIENT_ID = previousEnv.clientId
    if (previousEnv.clientSecret === undefined)
      delete process.env.ORDS_CLIENT_SECRET
    else process.env.ORDS_CLIENT_SECRET = previousEnv.clientSecret
  })

  return { baseUrl }
}

test('el cliente obtiene token y entrega una sola postulación con el contrato ORDS', async (t) => {
  const { baseUrl } = configureOrds(t, 'success')
  const requests: Array<{
    url: string
    init?: RequestInit
  }> = []
  globalThis.fetch = async (input, init) => {
    const url = String(input)
    requests.push({ url, init })
    if (url === `${baseUrl}/oauth/token`)
      return Response.json({
        access_token: 'test-bearer-token',
        token_type: 'Bearer',
        expires_in: 3600,
      })
    return Response.json({ resultado: 'creado' }, { status: 201 })
  }

  const result = await sendOpportunityToOrds(validApplication, '192.0.2.20')

  assert.deepEqual(result, { status: 'sent' })
  assert.equal(requests.length, 2)
  assert.equal(requests[0].url, `${baseUrl}/oauth/token`)
  assert.equal(
    new Headers(requests[0].init?.headers).get('authorization'),
    `Basic ${Buffer.from('integration-test-client:integration-test-secret').toString('base64')}`,
  )
  assert.equal(requests[1].url, `${baseUrl}/contacto/oportunidades`)
  assert.equal(requests[1].init?.method, 'POST')
  assert.equal(requests[0].init?.redirect, 'error')
  assert.equal(requests[1].init?.redirect, 'error')
  const headers = new Headers(requests[1].init.headers)
  assert.equal(headers.get('authorization'), 'Bearer test-bearer-token')
  assert.equal(headers.get('content-type'), 'application/json')
  assert.equal(headers.get('x-navasoft-client-ip'), '192.0.2.20')
  const payload = JSON.parse(String(requests[1].init.body))
  assert.equal(payload.nombre_completo, validApplication.nombre)
  assert.equal(payload.correo_electronico, validApplication.correo)
  assert.equal(payload.codigo_pais_celular, '+506')
  assert.equal(payload.numero_celular, '88887777')
  assert.equal(payload.perfil_candidato, 'PROFESIONAL')
  assert.equal(payload.area_interes, 'DESARROLLO')
  assert.equal(payload.curriculum_nombre, 'cv-prueba.pdf')
  assert.equal(payload.curriculum_mime, 'application/pdf')
  assert.equal(
    Buffer.from(payload.curriculum_base64, 'base64').toString(),
    Buffer.from(validApplication.curriculumBase64, 'base64').toString(),
  )
  assert.equal(payload.autoriza_reclutamiento, true)
  assert.equal('url_perfil' in payload, false)
})

test('el cliente se niega a enviar secretos si la base ORDS no es HTTPS segura', async (t) => {
  configureOrds(t, 'secure-url')
  let requests = 0
  globalThis.fetch = async () => {
    requests++
    return Response.json({})
  }

  for (const baseUrl of [
    'http://ords-insecure.example.test/ords/navasoft',
    'https://client:secret@ords.example.test/ords/navasoft',
    'https://ords.example.test/ords/navasoft?redirect=http://attacker.test',
  ]) {
    process.env.ORDS_BASE_URL = baseUrl
    assert.deepEqual(
      await sendOpportunityToOrds(validApplication, '192.0.2.23'),
      { status: 'unavailable' },
    )
  }
  assert.equal(requests, 0)
})

test('el cliente solo renueva y reenvía una vez cuando ORDS devuelve 401', async (t) => {
  const { baseUrl } = configureOrds(t, 'refresh')
  const sentTokens: string[] = []
  let tokenRequests = 0
  globalThis.fetch = async (input, init) => {
    const url = String(input)
    if (url === `${baseUrl}/oauth/token`) {
      tokenRequests++
      return Response.json({
        access_token: `test-token-${tokenRequests}`,
        token_type: 'Bearer',
        expires_in: 3600,
      })
    }
    sentTokens.push(new Headers(init?.headers).get('authorization') ?? '')
    if (sentTokens.length === 1) return new Response(null, { status: 401 })
    return Response.json({ resultado: 'ya_recibido' }, { status: 200 })
  }

  const result = await sendOpportunityToOrds(validApplication, '192.0.2.21')

  assert.deepEqual(result, { status: 'sent' })
  assert.equal(tokenRequests, 2)
  assert.deepEqual(sentTokens, ['Bearer test-token-1', 'Bearer test-token-2'])
})

test('el cliente propaga el límite indicado por ORDS', async (t) => {
  const { baseUrl } = configureOrds(t, 'rate-limit')
  globalThis.fetch = async (input) => {
    if (String(input) === `${baseUrl}/oauth/token`)
      return Response.json({
        access_token: 'test-bearer-token',
        token_type: 'Bearer',
        expires_in: 3600,
      })
    return new Response(null, {
      status: 429,
      headers: { 'retry-after': '47' },
    })
  }

  assert.deepEqual(
    await sendOpportunityToOrds(validApplication, '192.0.2.22'),
    {
      status: 'rate_limited',
      retryAfterSeconds: 47,
    },
  )
})
