export default defineNuxtPlugin((nuxtApp) => {
    const routePermissions = {
        'user1-page': 'user1:permission',
        'user2-page': 'user2:permission',
        combined: 'user1:permission && user2:permission',
        any: 'user1:permission || user2:permission',
    };

    nuxtApp.$permission.setRoutePermissions(routePermissions);
    nuxtApp.$permission.setPermissions(['user1:permission'])
    

    return {
        provide: {
            routePermissions
        }
    }
})