<script lang="ts" setup>

import LfrLogo from '~/assets/lfr_logo.png'
</script>

<template>
  <footer class="border-t border-zinc-800">
    <div class="container mx-auto px-basic py-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
      Made by
      <a href="https://leicaflorianrobert.dev"
         class="inline-flex items-center gap-2 text-zinc-200 hover:text-accent-soft transition-colors">
        <img :src="LfrLogo" alt="" class="h-6 w-6">
        Leica Florian Robert
      </a>
    </div>
  </footer>
</template>
