import { describe, expect, test } from 'vitest'
import { fluidLineHeight } from '../libs/lineHeight'

const settings = { minWidth: 320, maxWidth: 1240 }

/** Evaluates `clamp(<a>rem, <b>rem + <c>vi, <d>rem)` in px at a given viewport width */
function linePxAt (value: string, width: number): number {
  const match = value.match(/^clamp\(([\d.]+)rem, ([\d.-]+)rem \+ ([\d.-]+)vi, ([\d.]+)rem\)$/)
  if (!match) throw new Error(`Not a rem clamp: ${value}`)
  const [min, base, slope, max] = match.slice(1).map(Number)
  const px = base * 16 + slope * width / 100
  return Math.min(Math.max(px, min * 16), max * 16)
}

describe('fluidLineHeight', () => {
  test('keeps a fixed em value when the min and max ratios are equal', () => {
    expect(fluidLineHeight(settings, { fontMinSize: 16, fontMaxSize: 20.8, lineMinSize: 1.5, lineMaxSize: 1.5 })).toBe('1.5em')
  })

  test('falls back to the unitless 1 when the min ratio is below 1', () => {
    expect(fluidLineHeight(settings, { fontMinSize: 10, fontMaxSize: 12, lineMinSize: 0.83, lineMaxSize: 1 })).toBe(1)
  })

  test('writes a rem clamp from font size × ratio at Min Width to font size × ratio at Max Width', () => {
    // text-base, Mobile First, Font Scale Factor 1.3, Line Height Scale Factor 1.2: 16 × 1.5 = 24px → 20.8 × 1.8 = 37.44px
    expect(fluidLineHeight(settings, { fontMinSize: 16, fontMaxSize: 20.8, lineMinSize: 1.5, lineMaxSize: 1.8 }))
      .toBe('clamp(1.5rem, 1.2078rem + 1.4609vi, 2.34rem)')
  })

  test('actually grows between Min Width and Max Width', () => {
    const value = fluidLineHeight(settings, { fontMinSize: 16, fontMaxSize: 20.8, lineMinSize: 1.5, lineMaxSize: 1.8 }) as string

    expect(linePxAt(value, 320)).toBeCloseTo(24, 1)
    expect(linePxAt(value, 780)).toBeCloseTo(30.72, 1)
    expect(linePxAt(value, 1240)).toBeCloseTo(37.44, 1)
  })

  test('shrinks when Mobile First is false', () => {
    // text-base, Line Height Scale Factor 1.2, font 12.31px → 16px, ratio 1.25 → 1.5: 15.3875px → 24px
    const value = fluidLineHeight(settings, { fontMinSize: 12.31, fontMaxSize: 16, lineMinSize: 1.25, lineMaxSize: 1.5 }) as string

    expect(linePxAt(value, 320)).toBeCloseTo(15.39, 1)
    expect(linePxAt(value, 1240)).toBeCloseTo(24, 1)
  })
})
