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
  <tr class="table-row group">
    <td class="font-bold text-xl border-r border-r-zinc-500 text-center">{{ name }}</td>
    <td :class="{'bg-blue-900' : mobileFirst }">
      <FormKit type="number"
               v-model="values.minSize"
               step="0.01"
               :name="name + '[minSize]'"
               number="float"
               :outer-class="{'mb-4':false}">
        <template #suffix><span class="-ml-1 pr-3">px</span></template>
      </FormKit>
    </td>

    <td :class="{'bg-blue-900' : !mobileFirst }">
      <FormKit type="number"
               v-model="values.maxSize"
               step="0.01"
               :name="name + '[maxSize]'"
               number="float"
               :outer-class="{'mb-4':false}">
        <template #suffix><span class="-ml-1 pr-3">px</span></template>
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
  @apply px-4 pt-4 group-last:pb-4 group-last:border-b border-zinc-500;
}
</style>
