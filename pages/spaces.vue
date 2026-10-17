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
  <section class="container mx-auto px-basic py-12">
    <PageIntro title="Fluid Spaces"
               description="Fluid values for Tailwind's spacing scale, from your smallest to your largest viewport."/>

    <div class="mt-10 grid gap-8 lg:grid-cols-[320px_1fr] items-start">
      <aside class="card lg:sticky lg:top-24">
        <h2 class="card-title">Settings</h2>
        <FormKit type="form" id="spacesSettingsForm"
                 :actions="false"
                 :value="initialSettingsFormData">
          <SpacesSettingsForm></SpacesSettingsForm>
        </FormKit>
      </aside>

      <div class="min-w-0 space-y-12">
        <div>
          <h2 class="section-title">Spaces</h2>
          <SpacesTable></SpacesTable>
        </div>

        <GeneratedCodeTabs :composable="spaces"></GeneratedCodeTabs>
      </div>
    </div>
  </section>
</template>
