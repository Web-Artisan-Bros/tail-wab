<script lang="ts" setup>
defineProps<{
  label: string
}>()

const checked = defineModel<boolean>({ required: true })
</script>

<template>
  <button type="button"
          role="switch"
          :aria-checked="checked"
          class="inline-flex items-center gap-2 text-sm text-zinc-300"
          @click="checked = !checked">
    <span class="track" :class="{ 'is-on': checked }">
      <span class="thumb"></span>
    </span>
    {{ label }}
  </button>
</template>

<style scoped>
.track {
  @apply relative inline-block h-5 w-9 shrink-0 rounded-full bg-zinc-700 transition-colors;

  &.is-on {
    @apply bg-accent;
  }
}

.thumb {
  @apply absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform;

  .is-on & {
    @apply translate-x-4;
  }
}
</style>
