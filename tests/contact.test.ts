import { test } from 'node:test'
import assert from 'node:assert/strict'
import { processContact } from '../src/lib/server/contact/service.server.ts'
import { createContactLimiter } from '../src/lib/server/contact/limiter.server.ts'
import { unconfiguredCrmTransport } from '../src/lib/server/contact/crm.server.ts'
import { validateContact } from '../src/lib/validation/contact.ts'
import { developmentContactSimulation } from '../src/lib/server/contact/simulation.server.ts'
import type { ContactData } from '../src/lib/validation/contact.ts'

const valid = {
  name: 'María Pérez',
  email: 'prueba@example.com',
  organization: '',
  phone: '',
  reason: 'consulta',
  message: 'Consulta de integración de prueba.',
  website: '',
}
const allow = () => ({ allowed: true, retryAfterSeconds: 0 })

test('rechaza tipos incorrectos incluso en teléfono y organización opcionales', async () => {
  for (const field of [
    'name',
    'email',
    'organization',
    'phone',
    'reason',
    'message',
  ]) {
    for (const value of [null, 123, false, [], {}]) {
      const result = await processContact(
        { ...valid, [field]: value },
        {
          consume: allow,
          transport: {
            async send() {
              assert.fail('No debe enviar datos inválidos')
            },
          },
        },
      )
      assert.equal(result.status, 'invalid')
      if (result.status === 'invalid')
        assert.ok(result.errors[field as keyof ContactData])
    }
  }
})

test('escenarios locales ejercitan éxito, rechazo, indisponibilidad y demora sin red', async () => {
  for (const [mode, expected] of [
    ['simulate-success', 'sent'],
    ['simulate-failure', 'failed'],
    ['simulate-unavailable', 'unavailable'],
    ['simulate-timeout', 'uncertain'],
  ]) {
    const transport = developmentContactSimulation('development', mode)!
    assert.deepEqual(
      await processContact(valid, { consume: allow, transport, timeoutMs: 5 }),
      { status: expected },
    )
    assert.equal(developmentContactSimulation('production', mode), undefined)
    assert.equal(developmentContactSimulation(undefined, mode), undefined)
  }
  assert.equal(
    developmentContactSimulation('development', 'arbitrary'),
    undefined,
  )
})

test('permite omitir campos opcionales y normaliza sus valores a vacío', () => {
  const { organization, phone, ...required } = valid
  const result = validateContact(required)
  assert.deepEqual(result.errors, {})
  assert.equal(result.data.phone, '')
  assert.equal(result.data.organization, '')
})

test('sin CRM configurado no confirma un envío ni devuelve datos personales', async () => {
  assert.deepEqual(
    await processContact(valid, {
      consume: allow,
      transport: unconfiguredCrmTransport,
    }),
    { status: 'unavailable' },
  )
})

test('rechaza entradas inválidas y campos antispam antes del transporte', async () => {
  let calls = 0
  const deps = {
    consume: allow,
    transport: {
      async send() {
        calls++
        return { status: 'sent' as const }
      },
    },
  }
  for (const input of [
    null,
    [],
    'texto',
    { ...valid, website: 'https://spam.invalid' },
    { ...valid, website: 1 },
  ]) {
    assert.deepEqual(await processContact(input, deps), { status: 'rejected' })
  }
  const result = await processContact({ ...valid, email: 'invalido' }, deps)
  assert.equal(result.status, 'invalid')
  assert.equal(calls, 0)
})

test('no permite caracteres de control, conserva tildes y saltos de línea del mensaje', () => {
  for (const field of ['name', 'email', 'organization', 'message']) {
    const result = validateContact({
      ...valid,
      [field]: 'texto\u0000oculto@example.com',
    })
    assert.ok(result.errors[field as keyof typeof result.errors])
  }
  assert.deepEqual(
    validateContact({ ...valid, message: 'Primera línea.\nSegunda línea.' })
      .errors,
    {},
  )
})

test('respeta los límites y no acepta un motivo arbitrario', () => {
  assert.ok(
    validateContact({ ...valid, message: 'x'.repeat(3001) }).errors.message,
  )
  assert.ok(validateContact({ ...valid, phone: '+506abc' }).errors.phone)
  assert.ok(
    validateContact({ ...valid, reason: 'administrador' }).errors.reason,
  )
})

test('solo transmite campos permitidos y normalizados', async () => {
  let received: ContactData | undefined
  const result = await processContact(
    {
      ...valid,
      name: '  María Pérez  ',
      token: 'ignorar',
      url: 'https://untrusted.invalid',
      recipient: 'intruso@example.com',
    },
    {
      consume: allow,
      transport: {
        async send(data) {
          received = data
          return { status: 'sent' }
        },
      },
    },
  )
  assert.deepEqual(result, { status: 'sent' })
  assert.equal(received?.name, 'María Pérez')
  assert.deepEqual(Object.keys(received!).sort(), [
    'email',
    'message',
    'name',
    'organization',
    'phone',
    'reason',
  ])
})

test('límite de intentos bloquea antes de enviar y se renueva al expirar', async () => {
  const limiter = createContactLimiter(2, 60000)
  assert.equal(limiter.consume('a', 0).allowed, true)
  assert.equal(limiter.consume('a', 1).allowed, true)
  assert.equal(limiter.consume('a', 2).allowed, false)
  assert.equal(limiter.consume('b', 2).allowed, true)
  let called = false
  const result = await processContact(valid, {
    consume: () => limiter.consume('a', 3),
    transport: {
      async send() {
        called = true
        return { status: 'sent' }
      },
    },
  })
  assert.equal(result.status, 'rate_limited')
  assert.equal(called, false)
  assert.equal(limiter.consume('a', 60000).allowed, true)
})

test('limita el tamaño del mapa de identidades', () => {
  const limiter = createContactLimiter(5, 1000, 1)
  assert.equal(limiter.consume('a', 0).allowed, true)
  assert.equal(limiter.consume('b', 1).allowed, false)
  assert.equal(limiter.consume('b', 1000).allowed, true)
})

test('fallos del proveedor no filtran detalles internos ni reintentan', async () => {
  let calls = 0
  const result = await processContact(valid, {
    consume: allow,
    transport: {
      async send() {
        calls++
        throw new Error('credencial-interna-no-debe-aparecer')
      },
    },
  })
  assert.deepEqual(result, { status: 'uncertain' })
  assert.equal(calls, 1)
})

test('aborta un envío lento sin afirmar que fue entregado', async () => {
  let signal: AbortSignal | undefined
  const result = await processContact(valid, {
    consume: allow,
    timeoutMs: 5,
    transport: {
      send(_data, currentSignal) {
        signal = currentSignal
        return new Promise(() => {})
      },
    },
  })
  assert.deepEqual(result, { status: 'uncertain' })
  assert.equal(signal?.aborted, true)
})
