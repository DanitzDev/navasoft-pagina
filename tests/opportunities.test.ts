import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateOpportunitySubmission } from '../src/lib/server/opportunities/ords.server.ts'

const valid = {
  nombre: 'María Pérez',
  correo: 'prueba@example.com',
  telefono: '88887777',
  enlace: '',
  presentacion: 'Experiencia en desarrollo de software.',
  perfil: 'profesional',
  area: 'desarrollo',
  consentimiento: true,
  curriculumNombre: 'curriculum.pdf',
  curriculumMime: 'application/pdf',
  curriculumBase64: Buffer.from(
    '%PDF-1.4\nDocumento sintético.\n%%EOF',
  ).toString('base64'),
}

test('el servidor valida requisitos obligatorios de la postulación', () => {
  for (const [field, value] of [
    ['nombre', ''],
    ['correo', 'correo-invalido'],
    ['telefono', '1234'],
    ['perfil', 'desconocido'],
    ['area', 'desconocida'],
    ['consentimiento', false],
    ['curriculumBase64', ''],
  ] as const) {
    const result = validateOpportunitySubmission({ ...valid, [field]: value })
    assert.ok(Object.keys(result.errors).length > 0, `${field} debe rechazarse`)
  }
  for (const perfil of ['constructor', 'toString', '__proto__'])
    assert.ok(
      validateOpportunitySubmission({ ...valid, perfil }).errors.perfil,
      `${perfil} no es un perfil permitido`,
    )
})

test('el servidor valida el correo y el consentimiento sin depender del navegador', () => {
  assert.ok(
    validateOpportunitySubmission({ ...valid, correo: 'no-es-correo' }).errors
      .correo,
  )
  assert.ok(
    validateOpportunitySubmission({ ...valid, consentimiento: 'true' }).errors
      .consentimiento,
  )
})

test('el servidor rechaza caracteres de control y datos de contacto malformados', () => {
  assert.ok(
    validateOpportunitySubmission({ ...valid, nombre: 'Persona\u0000Prueba' })
      .errors.nombre,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      correo: 'prueba\u0000@example.com',
    }).errors.correo,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      telefono: '88887777texto',
    }).errors.telefono,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      enlace: 'https://usuario:clave@example.com/perfil',
    }).errors.enlace,
  )
})

test('el servidor rechaza extensión y MIME incompatibles o tipos no admitidos', () => {
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      curriculumNombre: 'curriculum.pdf',
      curriculumMime: 'application/msword',
    }).errors.curriculum,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      curriculumNombre: 'curriculum.exe',
      curriculumMime: 'application/octet-stream',
    }).errors.curriculum,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      curriculumNombre: 'curriculum.docx',
      curriculumMime:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }).errors.curriculum,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      curriculumBase64: Buffer.from('%PDF-1.4\ntruncado').toString('base64'),
    }).errors.curriculum,
  )
})

test('el servidor limita el currículum a 5 MB', () => {
  const tooLarge = Buffer.concat([
    Buffer.from('%PDF-'),
    Buffer.alloc(5 * 1024 * 1024),
  ])
  const result = validateOpportunitySubmission({
    ...valid,
    curriculumBase64: tooLarge.toString('base64'),
  })
  assert.ok(result.errors.curriculum)
})

test('el servidor limita longitudes de nombre, correo y presentación', () => {
  assert.equal(
    validateOpportunitySubmission({ ...valid, nombre: 'x' }).errors.nombre,
    undefined,
  )
  assert.equal(
    validateOpportunitySubmission({ ...valid, nombre: 'x'.repeat(200) }).errors
      .nombre,
    undefined,
  )
  assert.ok(
    validateOpportunitySubmission({ ...valid, nombre: 'x'.repeat(201) }).errors
      .nombre,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      correo: `${'x'.repeat(250)}@a.co`,
    }).errors.correo,
  )
  assert.ok(
    validateOpportunitySubmission({
      ...valid,
      presentacion: 'x'.repeat(601),
    }).errors.presentacion,
  )
})
