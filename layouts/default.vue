<script lang="ts" setup>
useHead({
  link: [
    {
      rel: 'icon',
      sizes: '32x32',
      href: "/favicon-32x32.png"
    },
    {
      rel: 'icon',
      type: 'favicon',
      href: "/favicon.ico"
    },
    {
      rel: 'apple-touch-icon',
      href: "/apple-touch-icon.png"
    }
  ],
  title: 'TailWab',
  htmlAttrs: {
    lang: 'en',
    class: 'dark'
  },
  bodyAttrs: {
    class: 'bg-zinc-950 text-zinc-100 font-sans antialiased'
  }
})

useSeoMeta({
  description: 'Tool that creates Tailwind config using Fluid Typography logic.',
})

</script>

<template>
  <TheHeader></TheHeader>

  <main>
    <slot></slot>
  </main>

  <TheFooter></TheFooter>
</template>

<style>
html {
  color-scheme: dark;
}
</style>

<style scoped>
main {
  @apply min-h-screen;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-title;
}

</style>
