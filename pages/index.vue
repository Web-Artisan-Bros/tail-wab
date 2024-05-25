<script lang="ts" setup>
const initialSettingsFormData = ref<FontSettingsFormData>({
  minWidth: 320,
  maxWidth: 1240,
  fontScaleFactor: 1.3,
  lineHeightScaleFactor: 1,
  mobileFirst: 'true'
})
const fontSizes = useFontSizes()

useHead({
  title: 'Fluid Fonts - TailWab',
})
</script>

<template>
  <section class="p-basic">
    <div class="container mx-auto">
      <h1 class="text-6xl text-black dark:text-white my-20">Fluid Fonts</h1>

      <FormKit type="form" id="fontSettingsForm"
               :actions="false"
               :value="initialSettingsFormData">
        <FontSettingsForm></FontSettingsForm>
      </FormKit>

      <div class="mt-20 py-10">
        <h2 class="text-5xl text-black dark:text-white mb-10">Font sizes</h2>

        <FontSizesTable></FontSizesTable>
      </div>

      <GeneratedCodeTabs :composable="fontSizes"></GeneratedCodeTabs>
    </div>
  </section>
</template>

<style scoped>
thead {
  @apply sticky top-0
}

th {
  @apply p-4;
}
</style>
