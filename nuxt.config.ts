// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', 'nuxt-svgo'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true
    // and more...
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  }
})