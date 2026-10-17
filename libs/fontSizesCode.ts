import { limitDecimals } from './limitDecimals'

export type TailwindVersion = 'v3' | 'v4'

export type FontSizeRow = {
  fontMinSize: number
  fontMaxSize: number
  lineMinSize: number
  lineMaxSize: number
  resultFontSize: string
  resultLineHeight: string | number
}

/** Rows of the font sizes table, keyed by class name (`text-xs`, `text-sm`, …) */
export type FontSizeRows = Record<string, FontSizeRow>

function ranges (values: FontSizeRow) {
  return {
    fontMinSize: limitDecimals(values.fontMinSize < values.fontMaxSize ? values.fontMinSize : values.fontMaxSize, 4),
    fontMaxSize: limitDecimals(values.fontMinSize > values.fontMaxSize ? values.fontMinSize : values.fontMaxSize, 4),
    lineMinSize: limitDecimals(values.lineMinSize < values.lineMaxSize ? values.lineMinSize : values.lineMaxSize, 4),
    lineMaxSize: limitDecimals(values.lineMinSize > values.lineMaxSize ? values.lineMinSize : values.lineMaxSize, 4)
  }
}

export function fontSizesCss (rows: FontSizeRows, comments: boolean): string[] {
  const toReturn = Object.keys(rows).reduce((acc, key) => {
    const values = rows[key]

    acc.push(`   --wabtu-${key}: ${values.resultFontSize};`)
    acc.push(`   --wabtu-${key}-lh: ${values.resultLineHeight};`)

    if (comments) {
      const { fontMinSize, fontMaxSize, lineMinSize, lineMaxSize } = ranges(values)

      acc.splice(-2, 0, `   /* ${key}: ${fontMinSize}px → ${fontMaxSize}px */`)
      acc.splice(-1, 0, `   /* ${key}-lh: ${lineMinSize}em → ${lineMaxSize}em */`)
    }

    acc.push('')
    return acc
  }, [':root {'] as string[])

  toReturn.push('}')

  return toReturn
}

export function fontSizesTailwind (rows: FontSizeRows, version: TailwindVersion, comments: boolean): string[] {
  if (version !== 'v3') throw new Error(`Unsupported Tailwind version: ${version}`)

  const toReturn = Object.keys(rows).reduce((acc, key) => {
    const values = rows[key]
    const name = key.replace('text-', '')

    acc.push(`      "${name}": ["${values.resultFontSize}", "${values.resultLineHeight}"],`)

    if (comments) {
      const { fontMinSize, fontMaxSize, lineMinSize, lineMaxSize } = ranges(values)

      acc.splice(-1, 0, `      // ${name}: ${fontMinSize}px → ${fontMaxSize}px | lh: ${lineMinSize}em → ${lineMaxSize}em`)
    }

    return acc
  }, [`module.exports = {
  theme: {
    fontSize: {`] as string[])

  toReturn.push(`    }
  }
}`)

  return toReturn
}
