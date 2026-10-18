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
      '   --wabtu-0_5: half;',
      '   --wabtu-2: two;',
      '   --wabtu-10: ten;',
      '}'
    ])
  })

  test('never writes a dot in a CSS variable name', () => {
    expect(spacesCss(rows, false).filter(line => /--wabtu-[^:]*\./.test(line))).toEqual([])
  })

  test('turns the dot of a decimal key into an underscore, like the v4 output', () => {
    expect(spacesCss(rows, false)).toContain('   --wabtu-1_5: clamp(0.375rem, 0.3359rem + 0.1957vi, 0.4875rem);')
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

describe('spacesTailwind v4', () => {
  const v4Rows: SpaceRows = {
    '10': { minSize: 40, maxSize: 52, resultSize: 'clamp(2.5rem, 2.3500rem + 0.7500vi, 3.25rem)' },
    '1.5': { minSize: 6, maxSize: 7.8, resultSize: 'clamp(0.375rem, 0.3525rem + 0.1125vi, 0.4875rem)' },
    '0': { minSize: 0, maxSize: 0, resultSize: '0rem' },
    '0.5': { minSize: 2.6, maxSize: 2, resultSize: 'clamp(0.125rem, 0.1175rem + 0.0375vi, 0.1625rem)' }
  }

  test('writes an @theme block with one spacing variable per key, in numeric order', () => {
    expect(spacesTailwind(v4Rows, 'v4', false)).toEqual([
      '@theme {',
      '  --spacing-0: 0rem;',
      '  --spacing-0_5: clamp(0.125rem, 0.1175rem + 0.0375vi, 0.1625rem);',
      '  --spacing-1_5: clamp(0.375rem, 0.3525rem + 0.1125vi, 0.4875rem);',
      '  --spacing-10: clamp(2.5rem, 2.3500rem + 0.7500vi, 3.25rem);',
      '}'
    ])
  })

  test('adds a range comment before each key, with min and max in order', () => {
    const lines = spacesTailwind(v4Rows, 'v4', true)

    expect(lines).toContain('  /* 0.5: 2px → 2.6px */')
    expect(lines.indexOf('  /* 0.5: 2px → 2.6px */') + 1).toBe(lines.indexOf('  --spacing-0_5: clamp(0.125rem, 0.1175rem + 0.0375vi, 0.1625rem);'))
  })

  test('never writes a dot in a variable name', () => {
    expect(spacesTailwind(rows, 'v4', false).filter(line => /--spacing-[^:]*\./.test(line))).toEqual([])
  })
})
