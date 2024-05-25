<script lang="ts" setup>

const props = defineProps<{
  composable: any
}>()

const spaces: any = props.composable
</script>

<template>
  <div class="mt-20 py-10">
    <h2 class="text-5xl text-black dark:text-white mb-10">Generated Code</h2>
    <div>
      <Tabs :tabs="['CSS', 'Tailwind']">
        <template #css>
          <div class="mb-10">
            <FormKit type="checkbox"
                     label="Include Comments"
                     v-model="spaces.cssIncludeComments.value"
            ></FormKit>
          </div>

          <pre class="bg-zinc-100 text-slate-900 -mx-4 -mb-8 p-4 font-mono"><code>{{
              spaces['cssResult'].value.join('\n')
            }}</code></pre>
        </template>
        <template #tailwind>
          <div class="mb-10">
            <FormKit type="checkbox"
                     label="Include Comments"
                     v-model="spaces.twIncludeComments.value"
            ></FormKit>
          </div>

          <pre class="bg-zinc-100 text-slate-900 -mx-4 -mb-8 p-4 font-mono"><code>{{
              spaces['twResult'].value.join('\n')
            }}</code></pre>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
