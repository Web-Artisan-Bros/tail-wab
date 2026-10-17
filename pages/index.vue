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
  <section class="container mx-auto px-basic py-12">
    <PageIntro title="Fluid Fonts"
               description="Fluid font sizes and line heights for every Tailwind text-* class, from your smallest to your largest viewport."/>

    <div class="mt-10 grid gap-8 lg:grid-cols-[320px_1fr] items-start">
      <aside class="card lg:sticky lg:top-24">
        <h2 class="card-title">Settings</h2>
        <FormKit type="form" id="fontSettingsForm"
                 :actions="false"
                 :value="initialSettingsFormData">
          <FontSettingsForm></FontSettingsForm>
        </FormKit>
      </aside>

      <div class="min-w-0 space-y-12">
        <div>
          <h2 class="section-title">Font sizes</h2>
          <FontSizesTable></FontSizesTable>
        </div>

        <GeneratedCodeTabs :composable="fontSizes"></GeneratedCodeTabs>
      </div>
    </div>
  </section>
</template>
