import { limitDecimals } from './limitDecimals'
import type { TailwindVersion } from './fontSizesCode'

export type SpaceRow = {
  minSize: number
  maxSize: number
  resultSize: string
}

/** Rows of the spaces table, keyed by Tailwind spacing key (`0`, `0.5`, `1`, …) */
export type SpaceRows = Record<string, SpaceRow>

function sortedKeys (rows: SpaceRows): string[] {
  return Object.keys(rows).sort((a, b) => +a > +b ? 1 : -1)
}

function ranges (values: SpaceRow) {
  return {
    minSize: limitDecimals(values.minSize < values.maxSize ? values.minSize : values.maxSize, 4),
    maxSize: limitDecimals(values.minSize > values.maxSize ? values.minSize : values.maxSize, 4)
  }
}

export function spacesCss (rows: SpaceRows, comments: boolean): string[] {
  const toReturn = sortedKeys(rows).reduce((acc, key) => {
    const values = rows[key]

    acc.push(`   --wabtu-${key}: ${values.resultSize};`)

    if (comments) {
      const { minSize, maxSize } = ranges(values)

      acc.splice(-1, 0, `   /* ${key}: ${minSize}px → ${maxSize}px */`)
    }
    return acc
  }, [':root {'] as string[])

  toReturn.push('}')

  return toReturn
}

export function spacesTailwind (rows: SpaceRows, version: TailwindVersion, comments: boolean): string[] {
  if (version !== 'v3') throw new Error(`Unsupported Tailwind version: ${version}`)

  const toReturn = sortedKeys(rows).reduce((acc, key) => {
    const values = rows[key]

    acc.push(`      "${key}": "${values.resultSize}",`)

    if (comments) {
      const { minSize, maxSize } = ranges(values)

      acc.splice(-1, 0, `      // ${key}: ${minSize}px → ${maxSize}px`)
    }

    return acc
  }, [`module.exports = {
  theme: {
    spacing: {`] as string[])

  toReturn.push(`    }
  }
}`)

  return toReturn
}
