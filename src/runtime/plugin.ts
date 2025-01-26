import { defineNuxtPlugin, addRouteMiddleware, useRuntimeConfig, abortNavigation } from '#app'
import { usePermission } from './composable'
import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig().public.nuxtPermissionChecker
    const permission = usePermission()
    let unauthorizedCallback: (to: Route, permissions: string[]) => void = () => { console.log('unauthorizedCallback') }

    console.log('config', config)

    if(config.routePermissions) {
        permission.setRoutePermissions(config.routePermissions)
    }

    //route middleware
    addRouteMiddleware('permission', (to, from) => {
        console.log('to', to)
        console.log('from', from)
        if (to.name && !permission.canAccessRoute(to.name.toString())) {
            unauthorizedCallback(to, permission.getRequiredRoutePermissions(to.name.toString()))
            return config.redirect ?? abortNavigation()
        }
    }, { global: config?.global }) // module dönüştürünce ayar olarak alınacak

    //directive
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
                } else {
                    el.remove()
                }
            }
        }
    })

    return {
        provide: {
            permission,
            setUnauthorizedCallback: (callback: (to: Route, permissions: string[]) => void) => {
                unauthorizedCallback = callback
            }
        }
    }
})
