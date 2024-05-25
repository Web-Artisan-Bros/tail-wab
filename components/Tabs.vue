<script lang="ts" setup>
const props = defineProps<{
  tabs: string[]
}>()
const active = ref(0)
</script>

<template>
  <div>
    <!-- header -->
    <div class="flex ">
      <div v-for="(tab, i) in tabs" :key="i"
           class="p-4 cursor-pointer rounded-t-xl border-zinc-500 min-w-24 text-center"
           :class="{'bg-zinc-900 border-x border-t': active === i}"
           @click="active = i">
        {{ tab }}
      </div>
    </div>

    <!-- content -->
    <div v-for="(tab, i) in tabs" :key="i"
         v-show="active === i"
         class="px-4 py-8 bg-zinc-900 border -mt-[1px] rounded-b-xl rounded-tr-xl border-zinc-500 overflow-hidden"
         :class="{'rounded-tl-xl': i > 0}">
      <slot :name="tab.toLowerCase().replaceAll(' ', '_')"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
