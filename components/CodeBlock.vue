<script lang="ts" setup>
import { HIGHLIGHT_THEME } from '~/composables/highlighter'

const props = defineProps<{
  code: string
  // scss for the Tailwind v4 @theme block: the css grammar reads its declarations as selectors
  lang: 'css' | 'scss' | 'javascript'
}>()

const html = ref('')
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const copyLabels = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' }
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function highlight () {
  const code = props.code

  try {
    const highlighter = await useHighlighter()

    // A newer code value may have arrived while the highlighter was loading
    if (code === props.code) {
      html.value = highlighter.codeToHtml(code, { lang: props.lang, theme: HIGHLIGHT_THEME })
    }
  } catch {
    // Shiki could not be loaded: the plain code stays visible
  }
}

async function copy () {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard API not available')
    await navigator.clipboard.writeText(props.code)
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
  }

  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => copyState.value = 'idle', 2000)
}

onMounted(highlight)
watch(() => props.code, highlight)
onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <div class="code-block">
    <button type="button" class="copy-button" @click="copy">{{ copyLabels[copyState] }}</button>

    <div v-if="html" v-html="html"></div>
    <pre v-else><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  @apply relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900;

  :deep(pre) {
    @apply overflow-x-auto p-4 font-mono text-sm leading-relaxed;
    background-color: transparent !important;
  }
}

.copy-button {
  @apply absolute right-3 top-3 rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent;
}
</style>
