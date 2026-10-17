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
      <template #suffix><span class="pl-2 text-zinc-400">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="maxWidth"
        validation="required"
        label="Max Width"
        step="1"
    >
      <template #suffix><span class="pl-2 text-zinc-400">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="scaleFactor"
        validation="required"
        label="Scale Factor"
        step=".1"
    >
    </FormKit>

    <FormKit
        type="select"
        name="mobileFirst"
        label="Mobile First"
        :options="['true', 'false']"
    ></FormKit>

  </div>
</template>

<style scoped lang="scss">

</style>
