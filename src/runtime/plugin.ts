import type { DirectiveBinding } from 'vue'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { usePermission } from './composable'
import { defineNuxtPlugin, addRouteMiddleware, useRuntimeConfig, abortNavigation, navigateTo } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.nuxtPermissionCheck
  const permission = usePermission()
  let unauthorizedCallback: (to: RouteLocationNormalizedGeneric, permissions: string[] | undefined) => void = () => {}

  if (config.routePermissions) {
    permission.setRoutePermissions(config.routePermissions)
  }

  // route middleware
  addRouteMiddleware('permission-check', (to, from) => {
    if (to.name && !permission.canAccessRoute(to.name.toString(), to.meta.permissions as string[] | undefined)) {
      unauthorizedCallback(to, to.meta.permissions as string[] | undefined ?? permission.getRequiredRoutePermissions(to.name.toString()))

      if (to.fullPath === from.fullPath) return navigateTo('/')
      return config.redirect ?? abortNavigation()
    }
  }, { global: config.global })

  // directive
  nuxtApp.vueApp.directive('can', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const isNegative = binding.arg === 'not'
      const permissions = Array.isArray(binding.value) ? binding.value : [binding.value]
      const userHasPermission = permission.hasPermission(permissions)
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
      permissionCheck: {
        ...permission,
        setUnauthorizedCallback: (callback: (to: RouteLocationNormalizedGeneric, permissions: string[] | undefined) => void) => {
          unauthorizedCallback = callback
        },
      },
    },
  }
})
