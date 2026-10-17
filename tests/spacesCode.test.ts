import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { spacesCss, spacesTailwind, type SpaceRows } from '../libs/spacesCode'
import spaceRows from './fixtures/space-rows.json'

const rows = spaceRows as SpaceRows
const expected = (file: string) => readFileSync(new URL(`./fixtures/expected/${file}`, import.meta.url), 'utf8')

describe('spacesCss', () => {
  test('matches the recorded CSS without comments', () => {
    expect(spacesCss(rows, false).join('\n')).toBe(expected('spaces-CSS-plain.txt'))
  })

  test('matches the recorded CSS with comments', () => {
    expect(spacesCss(rows, true).join('\n')).toBe(expected('spaces-CSS-comments.txt'))
  })

  test('sorts the keys numerically', () => {
    const unsorted: SpaceRows = {
      '10': { minSize: 40, maxSize: 52, resultSize: 'ten' },
      '2': { minSize: 8, maxSize: 10.4, resultSize: 'two' },
      '0.5': { minSize: 2, maxSize: 2.6, resultSize: 'half' }
    }

    expect(spacesCss(unsorted, false)).toEqual([
      ':root {',
      '   --wabtu-0.5: half;',
      '   --wabtu-2: two;',
      '   --wabtu-10: ten;',
      '}'
    ])
  })
})

describe('spacesTailwind v3', () => {
  test('matches the recorded config without comments', () => {
    expect(spacesTailwind(rows, 'v3', false).join('\n')).toBe(expected('spaces-Tailwind-plain.txt'))
  })

  test('matches the recorded config with comments', () => {
    expect(spacesTailwind(rows, 'v3', true).join('\n')).toBe(expected('spaces-Tailwind-comments.txt'))
  })
})
