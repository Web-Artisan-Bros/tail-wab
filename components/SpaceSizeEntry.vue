<script lang="ts" setup>
import { fluidSize } from '@wab-use/libs'
import { limitDecimals } from '~/libs/limitDecimals'
import { unitConvert } from '~/libs/unitConvert'

const props = defineProps<{
  entry: [name: number, size: number, px: number],
  settings: SpaceSettingsFormData
}>()

const name = computed(() => props.entry[0])
const pxSize = computed(() => props.entry[2])
const mobileFirst = computed<boolean>(() => props.settings.mobileFirst === 'true')

const values = ref({
  minSize: 0,
  maxSize: 0
})

watch(() => props.settings, (val) => {
  values.value.minSize = limitDecimals((mobileFirst.value ? pxSize.value : (pxSize.value / val.scaleFactor)), 2)
  values.value.maxSize = limitDecimals((mobileFirst.value ? pxSize.value * val.scaleFactor : pxSize.value), 2)
}, { immediate: true, deep: true })

const resultSize = computed(() => fluidSize(props.settings.minWidth, props.settings.maxWidth, values.value.minSize, values.value.maxSize).replace(';', ''))
</script>

<template>
  <tr class="group hover:bg-zinc-800/40">
    <td class="name-cell">{{ name }}</td>
    <td :class="{'default-cell': mobileFirst }">
      <FormKit type="number"
               v-model="values.minSize"
               step="0.01"
               :name="name + '[minSize]'"
               number="float"
               outer-class="!mb-0"
               inner-class="!max-w-none"
               input-class="font-mono !text-sm !py-1">
        <template #suffix><span class="pr-3 text-xs text-zinc-500">px</span></template>
      </FormKit>
    </td>
    <td :class="{'default-cell': !mobileFirst }">
      <FormKit type="number"
               v-model="values.maxSize"
               step="0.01"
               :name="name + '[maxSize]'"
               number="float"
               outer-class="!mb-0"
               inner-class="!max-w-none"
               input-class="font-mono !text-sm !py-1">
        <template #suffix><span class="pr-3 text-xs text-zinc-500">px</span></template>
      </FormKit>
    </td>
    <td class="hidden">
      <FormKit
          type="hidden"
          :name="name + '[resultSize]'"
          label="Result"
          v-model="resultSize"
      ></FormKit>
    </td>
  </tr>
</template>

<style scoped>
td {
  @apply px-3 py-2 border-t border-zinc-800;
}
</style>
