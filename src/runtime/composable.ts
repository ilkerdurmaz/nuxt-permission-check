import { ref, computed } from 'vue'

// Interface'i export edelim
export interface RoutePermissions {
  [key: string]: string | string[]
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

  const hasPermission = (permission: string | string[]): boolean => {
    if (isRoot.value) return true

    if (Array.isArray(permission)) {
      return permission.some(perm => userPermissions.value.includes(perm))
    }

    if (permission.includes('&&')) {
      const permissions = permission.split('&&').map(p => p.trim())
      return permissions.every(perm => userPermissions.value.includes(perm))
    }

    if (permission.includes('||')) {
      const permissions = permission.split('||').map(p => p.trim())
      return permissions.some(perm => userPermissions.value.includes(perm))
    }

    return userPermissions.value.includes(permission)
  }

  const getRequiredRoutePermissions = (routeName: string): string[] => {
    return routePermissions.value[routeName]
  }

  const canAccessRoute = (routeName: string, customRequiredPermissions: string): boolean => {
    if (isRoot.value) return true

    const requiredPermissions = customRequiredPermissions ?? getRequiredRoutePermissions(routeName)

    if (!requiredPermissions) return true

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
