import type { HighlighterCore, ThemeRegistration } from 'shiki/core'

export const HIGHLIGHT_THEME = 'tailwab'

// The code colours of the og-image: names in sky, functions in yellow, values in white, the rest in grey
const tailwabTheme: ThemeRegistration = {
  name: HIGHLIGHT_THEME,
  type: 'dark',
  colors: {
    'editor.background': '#18181b',
    'editor.foreground': '#a1a1aa'
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#71717a' } },
    {
      scope: ['variable.css', 'variable.scss', 'meta.object-literal.key', 'meta.object-literal.key string'],
      settings: { foreground: '#38bdf8' }
    },
    { scope: ['support.function'], settings: { foreground: '#fcd34d' } },
    { scope: ['constant.numeric', 'keyword.other.unit', 'string'], settings: { foreground: '#f4f4f5' } },
    {
      scope: ['keyword.control.at-rule', 'support.type.object.module', 'entity.other.attribute-name.pseudo-class'],
      settings: { foreground: '#d4d4d8' }
    }
  ]
}

let highlighter: Promise<HighlighterCore> | undefined

/**
 * Shared Shiki highlighter with only the languages and theme the generated code needs.
 * It is created on first use and must be called in the browser only.
 */
export function useHighlighter (): Promise<HighlighterCore> {
  highlighter ??= import('shiki/core').then(({ createHighlighterCore }) => createHighlighterCore({
    themes: [tailwabTheme],
    langs: [import('shiki/langs/css.mjs'), import('shiki/langs/scss.mjs'), import('shiki/langs/javascript.mjs')],
    loadWasm: import('shiki/wasm')
  })).catch((error) => {
    // Forget the failed attempt so that the next call can try again (browsers may still cache a failed import)
    highlighter = undefined
    throw error
  })

  return highlighter
}
