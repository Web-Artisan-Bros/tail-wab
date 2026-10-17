import type { HighlighterCore } from 'shiki/core'

export const HIGHLIGHT_THEME = 'github-dark-default'

let highlighter: Promise<HighlighterCore> | undefined

/**
 * Shared Shiki highlighter with only the languages and theme the generated code needs.
 * It is created on first use and must be called in the browser only.
 */
export function useHighlighter (): Promise<HighlighterCore> {
  highlighter ??= import('shiki/core').then(({ createHighlighterCore }) => createHighlighterCore({
    themes: [import('shiki/themes/github-dark-default.mjs')],
    langs: [import('shiki/langs/css.mjs'), import('shiki/langs/javascript.mjs')],
    loadWasm: import('shiki/wasm')
  })).catch((error) => {
    // Forget the failed attempt so that the next call can try again (browsers may still cache a failed import)
    highlighter = undefined
    throw error
  })

  return highlighter
}
