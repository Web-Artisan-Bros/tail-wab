<script lang="ts" setup>
const props = defineProps<{
  kind: 'fonts' | 'spaces'
}>()

// Examples use the default settings (320px → 1240px, factor 1.3, mobile first), so they match the tables
const content = {
  fonts: {
    problem: 'With breakpoints a font size jumps: text-base stays 16px up to 767px, then becomes 18px. Between two breakpoints the text is either too big for a small phone or too small for a wide screen, and every jump needs another class like md:text-lg.',
    property: '--text-base',
    clamp: ['1rem', '0.8957rem + 0.5217vi', '1.3rem'],
    example: 'text-base grows from 16px at 320px to 20.8px at 1240px',
    benefits: [
      'No media queries: one class per element instead of text-base md:text-lg lg:text-xl.',
      'Proportions stay the same at every width, not only at the breakpoints.',
      'Values are in rem, so they still follow the font size the user set in the browser.'
    ]
  },
  spaces: {
    problem: 'With breakpoints a space jumps: p-8 stays 32px until you add md:p-10 or lg:p-12. Between two breakpoints the layout is either too airy on a small phone or too tight on a wide screen.',
    property: '--spacing-8',
    clamp: ['2rem', '1.7913rem + 1.0435vi', '2.6rem'],
    example: 'spacing 8 grows from 32px at 320px to 41.6px at 1240px',
    benefits: [
      'No media queries: p-8 instead of p-8 md:p-10 lg:p-12.',
      'Paddings, margins and gaps grow with the text, so the layout keeps its rhythm.',
      'Values are in rem, so they still follow the font size the user set in the browser.'
    ]
  }
}

const text = computed(() => content[props.kind])
</script>

<template>
  <div class="card explainer">
    <h2 class="card-title">How fluid sizes work</h2>

    <p>{{ text.problem }}</p>

    <p class="mt-3">
      A fluid size grows linearly with the viewport between <strong>Min Width</strong> and
      <strong>Max Width</strong> and stays fixed outside them. CSS <code>clamp()</code> does it in one line:
      a minimum, a value that follows the viewport width (<code>vi</code>) and a maximum.
    </p>

    <!-- Same colours as the code in the og-image -->
    <div class="explainer-code">
      <span class="text-secondary">{{ text.property }}</span>: <span class="text-accent">clamp</span>(<span
        class="text-zinc-100">{{ text.clamp[0] }}</span>, <span class="text-zinc-100">{{ text.clamp[1] }}</span>, <span
        class="text-zinc-100">{{ text.clamp[2] }}</span>);
    </div>
    <p class="text-xs text-zinc-500">{{ text.example }}</p>

    <ul class="mt-4 space-y-1.5">
      <li v-for="benefit in text.benefits" :key="benefit" class="flex gap-2">
        <span class="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
        <span>{{ benefit }}</span>
      </li>
    </ul>
  </div>
</template>
