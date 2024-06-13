import { expect, test } from 'vitest'

function sum (a, b) {
  return a + b
}

test('sumar 1 y 2 da 3', () => {
  expect(sum(1, 2)).toBe(3)
})
