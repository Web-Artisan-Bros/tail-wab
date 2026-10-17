<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="grid items-start gap-8 lg:grid-cols-2">
    <div class="max-w-2xl">
      <h1 class="font-title text-4xl font-bold leading-tight text-zinc-50">{{ title }}</h1>
      <p class="mt-3 text-lg leading-relaxed text-zinc-400">{{ description }}</p>
    </div>

    <!-- Beside the title on large screens, under it on small ones -->
    <slot></slot>
  </div>
</template>
