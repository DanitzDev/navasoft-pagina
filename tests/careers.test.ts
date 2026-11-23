import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { ApplicationFields } from '../src/lib/careers.ts'
import { validateApplication } from '../src/lib/careers.ts'

function application(nombre: string): ApplicationFields {
  return {
    nombre,
    correo: 'qa@example.com',
    telefono: '88887777',
    enlace: '',
    presentacion: '',
    perfil: 'profesional',
    area: 'desarrollo',
    curriculum: new File(['pdf'], 'curriculum.pdf', {
      type: 'application/pdf',
    }),
    consentimiento: true,
  }
}

test('el formulario acepta nombres de 1 a 200 caracteres', () => {
  assert.equal(validateApplication(application('X')).nombre, undefined)
  assert.equal(
    validateApplication(application('X'.repeat(200))).nombre,
    undefined,
  )
  assert.match(
    validateApplication(application('X'.repeat(201))).nombre ?? '',
    /200 caracteres/,
  )
  assert.match(validateApplication(application('')).nombre ?? '', /1 y 200/)
})
