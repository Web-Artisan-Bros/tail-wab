import { limitDecimals } from './limitDecimals'
import type { TailwindVersion } from './fontSizesCode'

export type SpaceRow = {
  minSize: number
  maxSize: number
  resultSize: string
}

/** Rows of the spaces table, keyed by Tailwind spacing key (`0`, `0.5`, `1`, …) */
export type SpaceRows = Record<string, SpaceRow>

/** Key as it appears in a CSS variable name: a dot is not valid there, so `1.5` becomes `1_5` (as Tailwind v4 expects) */
function variableKey (key: string): string {
  return key.replace(/\./g, '_')
}

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

    acc.push(`   --wabtu-${variableKey(key)}: ${values.resultSize};`)

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
  if (version === 'v4') return spacesTheme(rows, comments)

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

/**
 * Tailwind v4 `@theme` block: `--spacing-<key>` for each key.
 * Dots become underscores (`--spacing-1_5`), which Tailwind v4 maps back to `p-1.5`.
 */
function spacesTheme (rows: SpaceRows, comments: boolean): string[] {
  const toReturn = sortedKeys(rows).reduce((acc, key) => {
    const values = rows[key]

    if (comments) {
      const { minSize, maxSize } = ranges(values)

      acc.push(`  /* ${key}: ${minSize}px → ${maxSize}px */`)
    }

    acc.push(`  --spacing-${variableKey(key)}: ${values.resultSize};`)
    return acc
  }, ['@theme {'] as string[])

  toReturn.push('}')

  return toReturn
}
