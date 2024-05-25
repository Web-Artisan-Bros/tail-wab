import { fluidSize } from '@wab-use/libs'

export type CalcFontSizeResult = {
  name: string
  fontSize: {
    value: string
    cssVariable: string
    comment: string
  },
  lineHeight: {
    value: string
    cssVariable: string
    comment: string
  }
}[]

const tailwindFontSizes: [name: string, size: number, px: number][] = [
  // name fontSize lineHeight
  ['text-xs', 0.75, 1],
  ['text-sm', 0.875, 1.25],
  ['text-base', 1, 1.5],
  ['text-lg', 1.125, 1.75],
  ['text-xl', 1.25, 1.75],
  ['text-2xl', 1.5, 2],
  ['text-3xl', 1.875, 2.25],
  ['text-4xl', 2.25, 2.5],
  ['text-5xl', 3, 1],
  ['text-6xl', 3.75, 1],
  ['text-7xl', 4.5, 1],
  ['text-8xl', 6, 1],
  ['text-9xl', 8, 1]
]

/**
 * @param {number} minW
 * @param {number} maxW
 * @param {number} scaleFactor
 * @param {boolean} mobileFirst If true, values of TailwindCSS spacings will be the minimum value in clamp function, otherwise the maximum value
 * @param {boolean} includeComments
 * @return {[name: number, size: number, px: number]}
 */
export const calcFontSizes = (minW: number, maxW: number, scaleFactor: number, mobileFirst = false, includeComments = false): CalcFontSizeResult => {
  
  return tailwindFontSizes.reduce((acc, [name, fontSize, lineHeight]) => {
    const fontPxSize = fontSize * 16
    const linePxHeight = lineHeight * 16
    
    const fontMinSize = mobileFirst ? fontPxSize : fontPxSize * scaleFactor
    const fontMaxSize = mobileFirst ? fontPxSize * scaleFactor : fontPxSize
    const fontClampString = fluidSize(minW, maxW, fontMinSize, fontMaxSize)
    
    const lineMinSize = mobileFirst ? linePxHeight : linePxHeight * scaleFactor
    const lineMaxSize = mobileFirst ? linePxHeight * scaleFactor : linePxHeight
    const lineClampString = fluidSize(minW, maxW, lineMinSize, lineMaxSize)
    
    acc.push({
      name: `"${name}"`,
      fontSize: {
        value: fontClampString,
        cssVariable: `--wab-tu-${name}: ${fontClampString}`,
        comment: `/* font-${name}: ${fontMinSize}px → ${fontMaxSize}px */`
      },
      lineHeight: {
        value: lineClampString,
        cssVariable: `--wab-tu-line-${name}: ${lineClampString}`,
        comment: `/* line-${name}: ${lineMinSize}px → ${lineMaxSize}px */`
      },
    })
    
    return acc
  }, [] as CalcFontSizeResult)
}
