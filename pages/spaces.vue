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
               description="Fluid values for Tailwind's spacing scale, from your smallest to your largest viewport.">
      <FluidExplainer kind="spaces"></FluidExplainer>
    </PageIntro>

    <div class="mt-10 grid gap-8 lg:grid-cols-[320px_1fr] items-start">
      <aside class="card settings-card lg:sticky lg:top-24">
        <h2 class="card-title">Settings</h2>
        <FormKit type="form" id="spacesSettingsForm"
                 :actions="false"
                 :value="initialSettingsFormData">
          <SpacesSettingsForm></SpacesSettingsForm>
        </FormKit>
      </aside>

      <!-- v-show inside Tabs keeps the table mounted: the generated code reads its form -->
      <Tabs class="min-w-0" :tabs="['Spaces', 'Generated code']">
        <template #spaces>
          <SpacesTable></SpacesTable>
        </template>
        <template #generated_code>
          <GeneratedCodeTabs :composable="spaces"></GeneratedCodeTabs>
        </template>
      </Tabs>
    </div>
  </section>
</template>
