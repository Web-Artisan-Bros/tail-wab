<script lang="ts" setup>
import { fluidSize } from '@wab-use/libs'
import { limitDecimals } from '~/libs/limitDecimals'
import { unitConvert } from '~/libs/unitConvert'

const props = defineProps<{
  entry: [name: string, fontSize: number, lineHeight: number],
  settings: FontSettingsFormData
}>()

const name = computed(() => props.entry[0])
const fontSize = computed(() => props.entry[1])
const lineHeight = computed(() => props.entry[2])
const fontPxSize = computed(() => unitConvert(fontSize.value, 'rem', 'px'))
const mobileFirst = computed<boolean>(() => props.settings.mobileFirst === 'true')

// const fontMinSize = computed<number>(() => mobileFirst.value ? fontPxSize.value : (fontPxSize.value * props.settings.scaleFactor))
// const fontMaxSize = computed<number>(() => mobileFirst.value ? fontPxSize.value * props.settings.scaleFactor : fontPxSize.value)
// const lineMinSize = computed<number>(() => mobileFirst.value ? linePxHeight.value : linePxHeight.value * props.settings.scaleFactor)
// const lineMaxSize = computed<number>(() => mobileFirst.value ? linePxHeight.value * props.settings.scaleFactor : linePxHeight.value)

// const tailwindValue = computed(() => mobileFirst.value ? 'fontMinSize' : 'fontMaxSize')
const values = ref({
  fontMinSize: 0,
  fontMaxSize: 0,
  lineMinSize: 0,
  lineMaxSize: 0
})

watch(() => props.settings, (val) => {
  values.value.fontMinSize = limitDecimals((mobileFirst.value ? fontPxSize.value : (fontPxSize.value / val.fontScaleFactor)), 2)
  values.value.fontMaxSize = limitDecimals((mobileFirst.value ? fontPxSize.value * val.fontScaleFactor : fontPxSize.value), 2)

  values.value.lineMinSize = limitDecimals((mobileFirst.value ? lineHeight.value : lineHeight.value / val.lineHeightScaleFactor), 2)
  values.value.lineMaxSize = limitDecimals((mobileFirst.value ? lineHeight.value * val.lineHeightScaleFactor : lineHeight.value), 2)
}, { immediate: true, deep: true })

const resultFontSize = computed(() => fluidSize(props.settings.minWidth, props.settings.maxWidth, values.value.fontMinSize, values.value.fontMaxSize).replace(';', ''))
const resultLineHeight = computed(() => values.value.lineMinSize < 1 ? 1 : fluidSize(props.settings.minWidth, props.settings.maxWidth, values.value.lineMinSize, values.value.lineMaxSize, false, 'em').replace(';', ''))
</script>

<template>
  <tr class="group hover:bg-zinc-800/40">
    <td class="name-cell">{{ name }}</td>
    <td :class="{'default-cell': mobileFirst }">
      <FormKit type="number"
               v-model="values.fontMinSize"
               step="0.01"
               :name="name + '[fontMinSize]'"
               number="float"
               outer-class="!mb-0"
               inner-class="!max-w-none"
               input-class="font-mono !text-sm !py-1">
        <template #suffix><span class="pr-3 text-xs text-zinc-500">px</span></template>
      </FormKit>
    </td>
    <td :class="{'default-cell': mobileFirst }">
      <FormKit type="number"
               v-model="values.lineMinSize"
               step="0.01"
               :name="name + '[lineMinSize]'"
               number="float"
               outer-class="!mb-0"
               inner-class="!max-w-none"
               input-class="font-mono !text-sm !py-1">
        <template #suffix><span class="pr-3 text-xs text-zinc-500">em</span></template>
      </FormKit>
    </td>
    <td :class="{'default-cell': !mobileFirst }">
      <FormKit type="number"
               v-model="values.fontMaxSize"
               step="0.01"
               :name="name + '[fontMaxSize]'"
               number="float"
               outer-class="!mb-0"
               inner-class="!max-w-none"
               input-class="font-mono !text-sm !py-1">
        <template #suffix><span class="pr-3 text-xs text-zinc-500">px</span></template>
      </FormKit>
    </td>
    <td :class="{'default-cell': !mobileFirst }">
      <FormKit type="number"
               v-model="values.lineMaxSize"
               step="0.01"
               :name="name + '[lineMaxSize]'"
               number="float"
               outer-class="!mb-0"
               inner-class="!max-w-none"
               input-class="font-mono !text-sm !py-1">
        <template #suffix><span class="pr-3 text-xs text-zinc-500">em</span></template>
      </FormKit>
    </td>
    <td class="hidden">
      <FormKit
          type="hidden"
          :name="name + '[resultFontSize]'"
          label="Result"
          v-model="resultFontSize"
      ></FormKit>
      <FormKit
          type="hidden"
          :name="name + '[resultLineHeight]'"
          label="Result"
          v-model="resultLineHeight"
      ></FormKit>
    </td>
  </tr>
</template>

<style scoped>
td {
  @apply px-3 py-2 border-t border-zinc-800;
}
</style>
