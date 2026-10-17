import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { fontSizesCss, fontSizesTailwind, type FontSizeRows } from '../libs/fontSizesCode'
import fontRows from './fixtures/font-rows.json'

const rows = fontRows as FontSizeRows
const expected = (file: string) => readFileSync(new URL(`./fixtures/expected/${file}`, import.meta.url), 'utf8')

describe('fontSizesCss', () => {
  test('matches the recorded CSS without comments', () => {
    expect(fontSizesCss(rows, false).join('\n')).toBe(expected('fonts-CSS-plain.txt'))
  })

  test('matches the recorded CSS with comments', () => {
    expect(fontSizesCss(rows, true).join('\n')).toBe(expected('fonts-CSS-comments.txt'))
  })
})

describe('fontSizesTailwind v3', () => {
  test('matches the recorded config without comments', () => {
    expect(fontSizesTailwind(rows, 'v3', false).join('\n')).toBe(expected('fonts-Tailwind-plain.txt'))
  })

  test('matches the recorded config with comments', () => {
    expect(fontSizesTailwind(rows, 'v3', true).join('\n')).toBe(expected('fonts-Tailwind-comments.txt'))
  })
})

describe('fontSizesTailwind v4', () => {
  const v4Rows: FontSizeRows = {
    'text-xs': {
      fontMinSize: 12, fontMaxSize: 15.6, lineMinSize: 1, lineMaxSize: 1,
      resultFontSize: 'clamp(0.75rem, 0.6717rem + 0.3913vi, 0.975rem)', resultLineHeight: '1em'
    },
    'text-base': {
      fontMinSize: 20.8, fontMaxSize: 16, lineMinSize: 0.9, lineMaxSize: 1.2,
      resultFontSize: 'clamp(1rem, 0.8957rem + 0.5217vi, 1.3rem)', resultLineHeight: 1
    }
  }

  test('writes an @theme block with font size and line height variables', () => {
    expect(fontSizesTailwind(v4Rows, 'v4', false)).toEqual([
      '@theme {',
      '  --text-xs: clamp(0.75rem, 0.6717rem + 0.3913vi, 0.975rem);',
      '  --text-xs--line-height: 1em;',
      '',
      '  --text-base: clamp(1rem, 0.8957rem + 0.5217vi, 1.3rem);',
      '  --text-base--line-height: 1;',
      '',
      '}'
    ])
  })

  test('adds a range comment before each class, with min and max in order', () => {
    expect(fontSizesTailwind(v4Rows, 'v4', true)).toEqual([
      '@theme {',
      '  /* xs: 12px → 15.6px | lh: 1em → 1em */',
      '  --text-xs: clamp(0.75rem, 0.6717rem + 0.3913vi, 0.975rem);',
      '  --text-xs--line-height: 1em;',
      '',
      '  /* base: 16px → 20.8px | lh: 0.9em → 1.2em */',
      '  --text-base: clamp(1rem, 0.8957rem + 0.5217vi, 1.3rem);',
      '  --text-base--line-height: 1;',
      '',
      '}'
    ])
  })
})
