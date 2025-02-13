import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  global?: boolean
  redirect?: string | boolean
  routePermissions?: Record<string, string[]>
  disabledClass?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-permission-check',
    configKey: 'nuxtPermissionCheck',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    global: true,
    redirect: '/',
    routePermissions: {},
    disabledClass: '',
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.nuxtPermissionCheck = defu(nuxt.options.runtimeConfig.public.nuxtPermissionCheck, options)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({
      name: 'usePermission',
      as: 'usePermission',
      from: resolver.resolve('runtime/composable'),
    })
  },
})
