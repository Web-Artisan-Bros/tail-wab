<script lang="ts" setup>
import type { FormKitFrameworkContext } from '@formkit/core'

// Replaces a FormKit label section (the slot replaces the whole <label>), adding an info tooltip after the text
defineProps<{
  context: FormKitFrameworkContext
  info: string
}>()
</script>

<template>
  <!-- !inline-flex: the theme gives select labels "block", so gap and centering would not apply there -->
  <span :class="[context.classes.label, '!inline-flex items-center gap-1']">
    <label :for="context.id">{{ context.label }}</label>
    <InfoTooltip :text="info"></InfoTooltip>
  </span>
</template>
