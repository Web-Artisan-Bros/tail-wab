<script lang="ts" setup>

const tailwindSpaces = ref<[name: number, size: number, px: number][]>([
  // name size pixels
  [0, 0, 0],
  [0.5, 0.125, 2],
  [1, 0.25, 4],
  [1.5, 0.375, 6],
  [2, 0.5, 8],
  [2.5, 0.625, 10],
  [3, 0.75, 12],
  [3.5, 0.875, 14],
  [4, 1, 16],
  [5, 1.25, 20],
  [6, 1.5, 24],
  [7, 1.75, 28],
  [8, 2, 32],
  [9, 2.25, 36],
  [10, 2.5, 40],
  [11, 2.75, 44],
  [12, 3, 48],
  [14, 3.5, 56],
  [16, 4, 64],
  [20, 5, 80],
  [24, 6, 96],
  [28, 7, 112],
  [32, 8, 128],
  [36, 9, 144],
  [40, 10, 160],
  [44, 11, 176],
  [48, 12, 192],
  [52, 13, 208],
  [56, 14, 224],
  [60, 15, 240],
  [64, 16, 256],
  [72, 18, 288],
  [80, 20, 320],
  [96, 24, 384]
])
const spacesSettingsForm = useFormKitContextById<SpaceSettingsFormData>('spacesSettingsForm')
const settings = computed(() => spacesSettingsForm.value?.value)
</script>

<template>
  <FormKit type="form" id="spacesEntriesForm" :actions="false">
    <div class="overflow-auto">
      <table class="table-fixed w-full min-w-[1024px]" v-if="settings">
        <thead>
        <tr class="table-row font-bold border-b text-lg">
          <th class="text-center">Name</th>
          <th>Min Size
            <div class="font-normal italic text-blue-400" v-if="settings.mobileFirst === 'true'">
              Default Tailwind values
            </div>
          </th>
          <th>Max Size
            <div class="font-normal italic text-blue-400"
                 v-if="settings.mobileFirst === 'false'">
              Default Tailwind values
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <SpaceSizeEntry v-for="entry in tailwindSpaces" :key="entry[0]"
                        :entry="entry" :settings="settings">
        </SpaceSizeEntry>
        </tbody>
      </table>
    </div>
  </FormKit>
</template>

<style scoped lang="scss">

</style>
