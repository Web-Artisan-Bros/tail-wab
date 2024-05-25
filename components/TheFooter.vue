<script lang="ts" setup>

import WabLogo from '~/assets/wab_logo.svg'
</script>

<template>
  <footer class="bg-zinc-900 text-white border-t border-t-zinc-500 ">
    <div class="container mx-auto px-basic py-20 text-center text-lg flex flex-col items-center">
      <div class="flex items-center gap-3">
        Created and maintained with
        <FormKitIcon icon="heart" class="w-8 inline-block"/>
        by
      </div>

      <a href="https://en.webartisanbros.com"
         class="text-yellow-200 hover:underline underline-offset-4 text-2xl inline-block">
        <div class="logo">
          <WabLogo></WabLogo>
        </div>
        Web Artisan Bros
      </a>
    </div>
  </footer>
</template>

<style scoped>
.logo {
  @apply block text-center -mb-10;

  svg {
    @apply w-32 h-32 my-2 text-yellow-200 inline-block;
  }
}
</style>
