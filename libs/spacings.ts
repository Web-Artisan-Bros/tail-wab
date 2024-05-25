import { fluidSize } from '@wab-use/libs'

export type CalcSpacingResult = {
  name: string
  value: string
  cssVariable: string
  comment: string
}[]

const tailwindSpacings: [name: number, size: number, px: number][] = [
  // name size pixels
  [0.5, 0.125, 2],
  [1, 0.25, 4],
  [1.5, 0.375, 6],
  [2, 0.5, 8],
  [2.5, 0.625, 10],
  [3, 0.75, 12],
  [3.5, 0.875, 14],
  [4, 1, 16],
  [5, 1.25, 20],
  [6, 1.5, 24],
  [7, 1.75, 28],
  [8, 2, 32],
  [9, 2.25, 36],
  [10, 2.5, 40],
  [11, 2.75, 44],
  [12, 3, 48],
  [14, 3.5, 56],
  [16, 4, 64],
  [20, 5, 80],
  [24, 6, 96],
  [28, 7, 112],
  [32, 8, 128],
  [36, 9, 144],
  [40, 10, 160],
  [44, 11, 176],
  [48, 12, 192],
  [52, 13, 208],
  [56, 14, 224],
  [60, 15, 240],
  [64, 16, 256],
  [72, 18, 288],
  [96, 24, 384],
  [80, 20, 320]
]

/**
 *
 * @param {number} minW
 * @param {number} maxW
 * @param {number} scaleFactor
 * @param {boolean} mobileFirst If true, values of TailwindCSS spacings will be the minimum value in clamp function, otherwise the maximum value
 * @param {boolean} includeComments
 * @return {[name: number, size: number, px: number]}
 */
export const calcSpacings = (minW: number, maxW: number, scaleFactor: number, mobileFirst = false, includeComments = false): CalcSpacingResult => {
  
  return tailwindSpacings.reduce((acc, [name, , px]) => {
    const minSize = mobileFirst ? px : px * scaleFactor
    const maxSize = mobileFirst ? px * scaleFactor : px
    const clampString = fluidSize(minW, maxW, minSize, maxSize)
    
    acc.push({
      name: `"${name}"`,
      value: clampString,
      cssVariable: `--wab-tu-spacing-${name}: ${clampString}`,
      comment: `/* spacing-${name}: ${minSize}px → ${maxSize}px */`
    })
    
    return acc
  }, [] as CalcSpacingResult)
}
