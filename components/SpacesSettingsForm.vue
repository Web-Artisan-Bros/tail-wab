<script lang="ts" setup>

</script>

<template>
  <div class="p-10 border bg-zinc-900 rounded-xl grid gap-6 items-center grid-cols-2 lg:grid-cols-4">
    <FormKit
        type="number"
        name="minWidth"
        validation="required"
        label="Min Width"
        step="1"
        outer-class="basis-1"
    >
      <template #suffix><span class="pr-3">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="maxWidth"
        validation="required"
        label="Max Width"
        step="1"
        outer-class="basis-1"
    >
      <template #suffix><span class="pr-3">px</span></template>
    </FormKit>

    <FormKit
        type="number"
        name="scaleFactor"
        validation="required"
        label="Scale Factor"
        step=".1"
        outer-class="basis-1"
    >
    </FormKit>

    <FormKit
        type="select"
        name="mobileFirst"
        label="Mobile First"
        :options="['true', 'false']"
        outer-class="basis-1"
    ></FormKit>

  </div>
</template>

<style scoped lang="scss">

</style>
