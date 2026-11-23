import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canonicalizeIp } from '../src/lib/server/request-ip.server.ts'

test('normaliza IPv4 e IPv6 para una clave estable por dirección', () => {
  assert.equal(canonicalizeIp('192.0.2.20'), '192.0.2.20')
  assert.equal(
    canonicalizeIp('2001:0db8:0000:0000:0000:0000:0000:0001'),
    '2001:db8::1',
  )
  assert.equal(canonicalizeIp('::ffff:192.0.2.20'), '192.0.2.20')
  assert.equal(canonicalizeIp('::ffff:c000:214'), '192.0.2.20')
})

test('rechaza valores que no son direcciones IP confiables', () => {
  assert.equal(canonicalizeIp(undefined), undefined)
  assert.equal(canonicalizeIp('192.0.2.20:443'), undefined)
  assert.equal(canonicalizeIp('attacker.example'), undefined)
  assert.equal(canonicalizeIp('fe80::1%eth0'), undefined)
})
