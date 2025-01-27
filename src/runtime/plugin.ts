import type { DirectiveBinding } from 'vue'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { usePermission } from './composable'
import { defineNuxtPlugin, addRouteMiddleware, useRuntimeConfig, abortNavigation } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.nuxtPermissionChecker
  const permission = usePermission()
  let unauthorizedCallback: (to: RouteLocationNormalizedGeneric, permissions: string) => void = () => {}

  if (config.routePermissions) {
    permission.setRoutePermissions(config.routePermissions)
  }

  // route middleware
  addRouteMiddleware('permission-checker', (to) => {
    if (to.name && !permission.canAccessRoute(to.name.toString(), to.meta.permissions as string | undefined)) {
      unauthorizedCallback(to, to.meta.permissions as string | undefined ?? permission.getRequiredRoutePermissions(to.name.toString()))
      return config.redirect ?? abortNavigation()
    }
  }, { global: config.global })

  // directive
  nuxtApp.vueApp.directive('can', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const isNegative = binding.arg === 'not'
      const userHasPermission = permission.hasPermission(binding.value)
      const isDisabled = binding.modifiers?.disabled

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
        ...permission,
        setUnauthorizedCallback: (callback: (to: RouteLocationNormalizedGeneric, permissions: string) => void) => {
          unauthorizedCallback = callback
        },
      },
    },
  }
})
