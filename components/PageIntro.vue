<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="grid items-start gap-8 lg:grid-cols-3">
    <!-- Sticky beside the explanation, at the same offset as the settings sidebar -->
    <div class="max-w-2xl lg:sticky lg:top-24">
      <h1 class="font-title text-4xl font-bold leading-tight text-zinc-50">{{ title }}</h1>
      <p class="mt-3 text-lg leading-relaxed text-zinc-400">{{ description }}</p>
    </div>

    <!-- Beside the title on large screens (two thirds of the width), under it on small ones -->
    <div class="lg:col-span-2">
      <slot></slot>
    </div>
  </div>
</template>
