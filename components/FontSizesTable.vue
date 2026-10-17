<script lang="ts" setup>
const tailwindFontSizes = ref<[name: string, fontSize: number, lineHeight: number][]>([
  // name fontSize lineHeight
  ['text-xs', 0.75, 1],
  ['text-sm', 0.875, 1.25],
  ['text-base', 1, 1.5],
  ['text-lg', 1.125, 1.75],
  ['text-xl', 1.25, 1.75],
  ['text-2xl', 1.5, 2],
  ['text-3xl', 1.875, 2.25],
  ['text-4xl', 2.25, 2.5],
  ['text-5xl', 3, 1],
  ['text-6xl', 3.75, 1],
  ['text-7xl', 4.5, 1],
  ['text-8xl', 6, 1],
  ['text-9xl', 8, 1]
])
const spacesSettingsForm = useFormKitContextById<FontSettingsFormData>('fontSettingsForm')
const settings = computed(() => spacesSettingsForm.value?.value)
</script>

<template>
  <FormKit type="form" id="fontSizesEntriesForm"
           :actions="false">
    <div class="size-table-wrapper">
      <table class="size-table min-w-[720px]" v-if="settings">
        <thead>
        <tr>
          <th class="name-cell">Name</th>
          <th :class="{'default-cell': settings.mobileFirst === 'true' }">
            Min font size
            <span class="badge" v-if="settings.mobileFirst === 'true'">Tailwind default</span>
          </th>
          <th :class="{'default-cell': settings.mobileFirst === 'true' }">
            Min line height
            <span class="badge" v-if="settings.mobileFirst === 'true'">Tailwind default</span>
          </th>
          <th :class="{'default-cell': settings.mobileFirst === 'false' }">
            Max font size
            <span class="badge" v-if="settings.mobileFirst === 'false'">Tailwind default</span>
          </th>
          <th :class="{'default-cell': settings.mobileFirst === 'false' }">
            Max line height
            <span class="badge" v-if="settings.mobileFirst === 'false'">Tailwind default</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <FontSizeEntry v-for="entry in tailwindFontSizes" :key="entry[0]"
                       :entry="entry" :settings="settings">
        </FontSizeEntry>
        </tbody>
      </table>
    </div>
  </FormKit>
</template>
