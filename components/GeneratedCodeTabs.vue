<script lang="ts" setup>
import type { TailwindVersion } from '~/libs/fontSizesCode'

const props = defineProps<{
  composable: any
}>()

const spaces: any = props.composable
const versions: TailwindVersion[] = ['v4', 'v3']
</script>

<template>
  <div>
    <h2 class="section-title">Generated code</h2>
    <Tabs :tabs="['CSS', 'Tailwind']">
      <template #actions="{ active }">
        <ToggleSwitch v-if="active === 0"
                      label="Include comments"
                      v-model="spaces.cssIncludeComments.value"></ToggleSwitch>
        <div v-else class="flex flex-wrap items-center gap-3">
          <div class="segmented" role="radiogroup" aria-label="Tailwind version">
            <button v-for="version in versions" :key="version"
                    type="button"
                    role="radio"
                    :aria-checked="spaces.tailwindVersion.value === version"
                    class="segmented-item"
                    :class="{ 'is-active': spaces.tailwindVersion.value === version }"
                    @click="spaces.tailwindVersion.value = version">
              {{ version }}
            </button>
          </div>
          <ToggleSwitch label="Include comments"
                        v-model="spaces.twIncludeComments.value"></ToggleSwitch>
        </div>
      </template>
      <template #css>
        <CodeBlock lang="css" :code="spaces['cssResult'].value.join('\n')"></CodeBlock>
      </template>
      <template #tailwind>
        <CodeBlock :lang="spaces.tailwindVersion.value === 'v4' ? 'css' : 'javascript'"
                   :code="spaces['twResult'].value.join('\n')"></CodeBlock>
      </template>
    </Tabs>
  </div>
</template>
