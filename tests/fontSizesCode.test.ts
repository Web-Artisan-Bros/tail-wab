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
