import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  global?: boolean
  redirect?: string | boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-permission-checker',
    configKey: 'nuxtPermissionChecker',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    global: true,
    redirect: '/',
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.nuxtPermissionChecker = defu(nuxt.options.runtimeConfig.public.nuxtPermissionChecker, options)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({
      name: 'usePermission',
      as: 'usePermission',
      from: resolver.resolve('runtime/composable'),
    })
  },
})
