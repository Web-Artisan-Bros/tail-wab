import type { TailwindVersion } from '~/libs/fontSizesCode'

const STORAGE_KEY = 'tailwab:tailwindVersion'

/**
 * Tailwind version of the generated config, shared by both pages and remembered in the browser.
 * The server always renders v4; the stored choice is applied after mount.
 */
export function useTailwindVersion (): Ref<TailwindVersion> {
  const version = useState<TailwindVersion>('tailwindVersion', () => 'v4')

  onMounted(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'v3' || stored === 'v4') version.value = stored
    } catch {
      // Storage not available (e.g. blocked in a private window): keep the current choice
    }

    watch(version, (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, value)
      } catch {
        // Same as above: the choice just isn't remembered
      }
    })
  })

  return version
}
