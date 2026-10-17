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
                      info="The viewport width where spaces start growing. Below it they stay at their smallest value."/>
      </template>
      <template #suffix><span class="pl-2.5 text-zinc-400">px</span></template>
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
                      info="The viewport width where spaces stop growing. Above it they stay at their largest value."/>
      </template>
      <template #suffix><span class="pl-2.5 text-zinc-400">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="scaleFactor"
        validation="required"
        label="Scale Factor"
        step=".1"
    >
      <template #label="context">
        <SettingLabel :context="context"
                      info="How much each space changes between Min Width and Max Width. With 1.3, spacing 4 goes from 16px to 20.8px."/>
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
                      info="True: the Tailwind value is the one at Min Width and grows by the factor. False: it is the one at Max Width and shrinks by the factor."/>
      </template>
    </FormKit>

  </div>
</template>

<style scoped lang="scss">

</style>
