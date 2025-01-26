export default defineNuxtConfig({
	modules: ['../src/module', '@nuxtjs/tailwindcss'],
	ssr: false,
	devtools: { enabled: true },
	compatibilityDate: '2025-01-25',
	nuxtPermissionChecker: {
		global: true,
		redirect: '/',
	},
})