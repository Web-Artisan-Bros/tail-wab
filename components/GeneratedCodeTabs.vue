<script lang="ts" setup>

const props = defineProps<{
  composable: any
}>()

const spaces: any = props.composable
</script>

<template>
  <div>
    <h2 class="section-title">Generated code</h2>
    <Tabs :tabs="['CSS', 'Tailwind']">
      <template #actions="{ active }">
        <ToggleSwitch v-if="active === 0"
                      label="Include comments"
                      v-model="spaces.cssIncludeComments.value"></ToggleSwitch>
        <ToggleSwitch v-else
                      label="Include comments"
                      v-model="spaces.twIncludeComments.value"></ToggleSwitch>
      </template>
      <template #css>
        <CodeBlock lang="css" :code="spaces['cssResult'].value.join('\n')"></CodeBlock>
      </template>
      <template #tailwind>
        <CodeBlock lang="javascript" :code="spaces['twResult'].value.join('\n')"></CodeBlock>
      </template>
    </Tabs>
  </div>
</template>
