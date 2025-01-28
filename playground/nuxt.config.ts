export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-01-25',
  nuxtPermissionCheck: {
    global: true,
    redirect: '/',
    disabledClass: 'permission-disabled',
  },
})
