<script lang="ts" setup>
const { siteUrl } = useRuntimeConfig().public
const route = useRoute()
const pageUrl = computed(() => siteUrl + route.path)

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: "/tailwab-logo.svg"
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
    lang: 'en',
    class: 'dark'
  },
  bodyAttrs: {
    class: 'text-zinc-100 font-sans antialiased'
  }
})

// Defaults for every page; the pages set their own title and description
useSeoMeta({
  description: 'Fluid typography and spacing for Tailwind CSS, with no media queries.',
  ogSiteName: 'TailWab',
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1280,
  ogImageHeight: 640,
  ogImageAlt: 'TailWab: fluid typography and spacing for Tailwind CSS',
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og-image.png`
})

</script>

<template>
  <TheHeader></TheHeader>

  <main>
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
