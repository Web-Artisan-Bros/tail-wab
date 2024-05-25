<script lang="ts" setup>
import TailwabLogo from '~/assets/tailwab_logo.png'

</script>

<template>
  <header class="bg-zinc-900 text-white border-b border-b-zinc-500">
    <nav class=" container mx-auto ">
      <ul class="flex justify-center items-center gap-8">
        <li>
          <nuxt-link to="/" class="link">Fluid Fonts</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="logo-link block relative" aria-label="Go to homepage">
            <img :src="TailwabLogo" class="block">
            <div class="absolute -bottom-6 bg-zinc-900 px-16 py-1 rounded-b-xl border-b border-zinc-500 left-1/2 -translate-x-1/2 text-center text-base text-zinc-300 font-title">TailWab</div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/spaces" class="link">Fluid Spaces</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.link {
  @apply text-base px-4 py-3 hover:underline underline-offset-4;

  &.router-link-active {
    @apply text-yellow-200;
  }
}

.logo-link {
  img {
    @apply w-20 h-20 text-red-600;
  }
}
</style>
