<script lang="ts" setup>
const props = defineProps<{
  tabs: string[]
}>()
const active = ref(0)
</script>

<template>
  <div>
    <!-- header -->
    <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
      <div class="segmented" role="tablist">
        <button v-for="(tab, i) in tabs" :key="i"
                type="button"
                role="tab"
                :aria-selected="active === i"
                class="segmented-item"
                :class="{ 'is-active': active === i }"
                @click="active = i">
          {{ tab }}
        </button>
      </div>

      <slot name="actions" :active="active"></slot>
    </div>

    <!-- content -->
    <div v-for="(tab, i) in tabs" :key="i"
         v-show="active === i"
         role="tabpanel">
      <slot :name="tab.toLowerCase().replaceAll(' ', '_')"></slot>
    </div>
  </div>
</template>
