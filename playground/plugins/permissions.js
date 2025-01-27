import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('permissions plugin', nuxtApp.$permissionCheck)
  const routePermissions = {
    'user1-page': ['user1:permission'],
    'user2-page': ['user2:permission'],
    'combined': ['user1:permission', 'user2:permission'],
    'any': ['user1:permission', '||user2:permission'],
  }

  nuxtApp.$permissionCheck.setRoutePermissions(routePermissions)
  nuxtApp.$permissionCheck.setPermissions(['user1:permission'])

  return {
    provide: {
      routePermissions,
    },
  }
})
