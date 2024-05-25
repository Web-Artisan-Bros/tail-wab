<script lang="ts" setup>

const initialSettingsFormData = ref<SpaceSettingsFormData>({
  mobileFirst: 'true',
  scaleFactor: 1.3,
  minWidth: 320,
  maxWidth: 1240
})
const spaces = useSpaces()

useHead({
  title: 'Fluid Spaces - TailWab'
})
</script>

<template>
  <section class="p-basic">
    <div class="container mx-auto">
      <h1 class="text-6xl text-black dark:text-white my-20">Fluid Spaces</h1>

      <FormKit type="form" id="spacesSettingsForm"
               :actions="false"
               :value="initialSettingsFormData">
        <SpacesSettingsForm></SpacesSettingsForm>
      </FormKit>

      <div class="mt-20 py-10">
        <h2 class="text-5xl text-black dark:text-white mb-10">Spaces</h2>

        <SpacesTable></SpacesTable>
      </div>

      <GeneratedCodeTabs :composable="spaces"></GeneratedCodeTabs>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
