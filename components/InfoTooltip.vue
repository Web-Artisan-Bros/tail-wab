<script lang="ts" setup>
defineProps<{
  text: string
}>()

const root = ref<HTMLElement>()
// Hover opens the tooltip with a mouse; a click (or tap) pins it open until the next click outside
const hovering = ref(false)
const pinned = ref(false)
const open = computed(() => hovering.value || pinned.value)

function onPointerEnter (event: PointerEvent) {
  if (event.pointerType === 'mouse') hovering.value = true
}

function onDocumentPointerDown (event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) {
    pinned.value = false
    hovering.value = false
  }
}

function onKeydown (event: KeyboardEvent) {
  if (event.key === 'Escape') {
    pinned.value = false
    hovering.value = false
  }
}

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown))
</script>

<template>
  <span ref="root" class="inline-flex">
    <button type="button"
            class="info-tooltip-button"
            :aria-expanded="open"
            aria-label="More information"
            @click="pinned = !pinned"
            @pointerenter="onPointerEnter"
            @pointerleave="hovering = false"
            @blur="pinned = false"
            @keydown="onKeydown">
      <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 7v4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="8" cy="4.75" r="0.9" fill="currentColor"/>
      </svg>
    </button>

    <!-- Positioned against the closest relative ancestor (the field), so it is as wide as the field and never overflows the sidebar -->
    <span v-show="open" role="tooltip" class="info-tooltip">{{ text }}</span>
  </span>
</template>
