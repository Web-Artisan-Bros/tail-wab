<script lang="ts" setup>
onNuxtReady(() => {
  document.documentElement.classList.add('dark')
})

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
    },
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
    lang: 'it'
  }
})

useSeoMeta({
  description: 'Tool that creates Tailwind config using Fluid Typography logic.',
})

</script>

<template>
  <TheHeader ></TheHeader>

  <main class="dark:bg-slate-800 dark:text-white">
    <slot></slot>
  </main>

  <TheFooter></TheFooter>
</template>

<style scoped>
main {
  @apply min-h-screen;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-title;
}

</style>
