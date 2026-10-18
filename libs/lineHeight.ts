import { fluidSize } from '@wab-use/libs'

export type LineHeightSettings = { minWidth: number, maxWidth: number }

/** Font sizes in px and line heights in em (ratio to the font size), at Min Width and at Max Width */
export type LineHeightValues = { fontMinSize: number, fontMaxSize: number, lineMinSize: number, lineMaxSize: number }

/**
 * Line height of a `text-*` class.
 *
 * - Same ratio at both ends: a fixed `em` value, which follows the (fluid) font size exactly.
 * - Min ratio below 1: the unitless `1`, so that lines never overlap.
 * - Different ratios: a `clamp()` in rem between font size × ratio at Min Width and at Max Width.
 *   A ratio that changes with the viewport cannot be written in `em` (CSS cannot multiply `em` by a `vi`
 *   fraction), so the line height is computed in px like the font size and written in rem.
 *   `fluidSize` with `pxToRem = false` is not used: it still divides the intercept by 16 and treats
 *   the `vi` slope as px, which is what kept the old `em` clamp at its minimum.
 */
export function fluidLineHeight (settings: LineHeightSettings, values: LineHeightValues): string | number {
  if (values.lineMinSize < 1) return 1
  if (values.lineMinSize === values.lineMaxSize) return `${values.lineMinSize}em`

  const lineMinPx = values.fontMinSize * values.lineMinSize
  const lineMaxPx = values.fontMaxSize * values.lineMaxSize

  return fluidSize(settings.minWidth, settings.maxWidth, lineMinPx, lineMaxPx).replace(';', '')
}
