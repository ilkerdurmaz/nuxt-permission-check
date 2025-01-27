import type { DirectiveBinding } from 'vue'
import { usePermission } from './composable'
import { defineNuxtPlugin, addRouteMiddleware, useRuntimeConfig, abortNavigation } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.nuxtPermissionChecker
  const permission = usePermission()
  let unauthorizedCallback: (to: Route, permissions: string[]) => void = () => {
    console.log('unauthorizedCallback')
  }

  console.log('config', config)

  if (config.routePermissions) {
    permission.setRoutePermissions(config.routePermissions)
  }

  // route middleware
  addRouteMiddleware('permission', (to) => {
    if (to.name && !permission.canAccessRoute(to.name.toString())) {
      unauthorizedCallback(to, permission.getRequiredRoutePermissions(to.name.toString()))
      return config.redirect ?? abortNavigation()
    }
  }, { global: config?.global }) // module dönüştürünce ayar olarak alınacak

  // directive
  nuxtApp.vueApp.directive('can', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const isNegative = binding.arg === 'not'
      const userHasPermission = permission.hasPermission(binding.value)
      const isDisabled = binding.modifiers?.disabled

      // Remove / hide element if:
      // - Regular v-can and user doesn't have permission
      // - v-can:not and user has permission
      if (isNegative ? userHasPermission : !userHasPermission) {
        if (isDisabled) {
          el.style.opacity = '0.5'
          el.style.pointerEvents = 'none'
          el.style.cursor = 'not-allowed'
        }
        else {
          el.remove()
        }
      }
    },
  })

  return {
    provide: {
      permissionChecker: {
        setRoutePermissions: permission.setRoutePermissions,
        setPermissions: permission.setPermissions,
        getRequiredRoutePermissions: permission.getRequiredRoutePermissions,
        hasPermission: permission.hasPermission,
        canAccessRoute: permission.canAccessRoute,
        isRoot: permission.isRoot,
        setUnauthorizedCallback: (callback: (to: Route, permissions: string[]) => void) => {
          unauthorizedCallback = callback
        },
      },
    },
  }
})
