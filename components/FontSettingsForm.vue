<script lang="ts" setup>

</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-1 gap-x-4 items-end">
    <FormKit
        type="number"
        name="minWidth"
        validation="required"
        label="Min Width"
        step="1"
    >
      <template #label="context">
        <SettingLabel :context="context"
                      info="The viewport width where font sizes start growing. Below it they stay at their smallest value."/>
      </template>
      <template #suffix><span class="pl-2 text-zinc-400">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="maxWidth"
        validation="required"
        label="Max Width"
        step="1"
    >
      <template #label="context">
        <SettingLabel :context="context"
                      info="The viewport width where font sizes stop growing. Above it they stay at their largest value."/>
      </template>
      <template #suffix><span class="pl-2 text-zinc-400">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="fontScaleFactor"
        validation="required"
        label="Font Scale Factor"
        step=".1"
    >
      <template #label="context">
        <SettingLabel :context="context"
                      info="How much each font size changes between Min Width and Max Width. With 1.3, text-base goes from 16px to 20.8px."/>
      </template>
    </FormKit>
    <FormKit
        type="number"
        name="lineHeightScaleFactor"
        validation="required"
        label="Line Height Scale Factor"
        step=".1"
    >
      <template #label="context">
        <SettingLabel :context="context"
                      info="How much each line height changes between Min Width and Max Width. With 1, line heights do not change."/>
      </template>
    </FormKit>

    <FormKit
        type="select"
        name="mobileFirst"
        label="Mobile First"
        :options="['true', 'false']"
    >
      <template #label="context">
        <SettingLabel :context="context"
                      info="True: the Tailwind size is the one at Min Width and grows by the factor. False: it is the one at Max Width and shrinks by the factor."/>
      </template>
    </FormKit>

  </div>
</template>

<style scoped lang="scss">

</style>
