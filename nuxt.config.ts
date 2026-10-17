// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', 'nuxt-svgo', '@nuxt/fonts'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true
    // and more...
  },
  formkit: {
    // The experimental autoImport drops the "form" input during SSR of /spaces
    autoImport: false
  },
  imports: {
    presets: [{ from: '@formkit/vue', imports: ['useFormKitContextById'] }]
  },
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Josefin Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  }
})
