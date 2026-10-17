<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="font-title text-4xl leading-tight text-zinc-50">{{ title }}</h1>
    <p class="mt-3 text-lg leading-relaxed text-zinc-400">{{ description }}</p>
  </div>
</template>
