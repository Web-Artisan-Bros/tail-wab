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
  <tr class="table-row group">
    <td class="font-bold text-xl border-r border-r-zinc-500">{{ name }}</td>
    <td :class="{'bg-blue-900' : mobileFirst }">
      <FormKit type="number"
               v-model="values.fontMinSize"
               step="0.01"
               :name="name + '[fontMinSize]'"
               number="float"
               :outer-class="{'mb-4':false}">
        <template #suffix><span class="-ml-1 pr-3">px</span></template>
      </FormKit>
    </td>
    <td :class="{'bg-blue-950' : mobileFirst }" class="border-r border-zinc-500">
      <FormKit type="number"
               v-model="values.lineMinSize"
               step="0.01"
               :name="name + '[lineMinSize]'"
               number="float"
               :outer-class="{'mb-4':false}">
        <template #suffix><span class="-ml-1 pr-3">em</span></template>
      </FormKit>
    </td>

    <td :class="{'bg-blue-900' : !mobileFirst }">
      <FormKit type="number"
               v-model="values.fontMaxSize"
               step="0.01"
               :name="name + '[fontMaxSize]'"
               number="float"
               :outer-class="{'mb-4':false}">
        <template #suffix><span class="-ml-1 pr-3">px</span></template>
      </FormKit>
    </td>
    <td :class="{'bg-blue-950' : !mobileFirst }">
      <FormKit type="number"
               v-model="values.lineMaxSize"
               step="0.01"
               :name="name + '[lineMaxSize]'"
               number="float"
               :outer-class="{'mb-4':false}">
        <template #suffix><span class="-ml-1 pr-3">em</span></template>
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
  @apply px-4 pt-4 group-last:pb-4 group-last:border-b border-zinc-500;
}
</style>
