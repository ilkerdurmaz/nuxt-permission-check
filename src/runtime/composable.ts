import { ref, computed } from 'vue'

// Interface'i export edelim
export interface RoutePermissions {
  [key: string]: string[]
}

const userPermissions = ref<string[]>([])
const routePermissions = ref<RoutePermissions>({})
const isRoot = computed(() => userPermissions.value.length === 0)

export const usePermission = () => {
  const setPermissions = (permissions: string[]): void => {
    userPermissions.value = permissions
  }

  const setRoutePermissions = (permissions: RoutePermissions): void => {
    routePermissions.value = permissions
  }

  const hasPermission = (requiredPermissions: string[]): boolean => {
    if (isRoot.value) return true

    const orPermissions = requiredPermissions
      .filter(p => p.startsWith('||'))
      .map(p => p.slice(2))

    const andPermissions = requiredPermissions
      .filter(p => !p.startsWith('||'))

    if (orPermissions.some(permission => userPermissions.value.includes(permission))) {
      return true
    }

    return andPermissions.every(permission => userPermissions.value.includes(permission))
  }

  const getRequiredRoutePermissions = (routeName: string): string[] => {
    return routePermissions.value[routeName] || []
  }

  const canAccessRoute = (routeName: string, customRequiredPermissions?: string[]): boolean => {
    if (isRoot.value) return true

    const requiredPermissions = customRequiredPermissions ?? getRequiredRoutePermissions(routeName)
    return hasPermission(requiredPermissions)
  }

  return {
    setPermissions,
    setRoutePermissions,
    getRequiredRoutePermissions,
    hasPermission,
    canAccessRoute,
    isRoot,
  }
}
