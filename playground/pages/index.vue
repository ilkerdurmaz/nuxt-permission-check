<template>
  <div class="container mx-auto p-8">
    <PermissionNotification ref="notification" />
    <!-- Header -->
    <h1 class="text-3xl font-medium mb-8">
      Nuxt Permission Playground
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Permission Manager -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-medium mb-4">
            Permission Manager
          </h2>
          <div class="space-y-2">
            <div
              v-for="permItem in availablePermissions"
              :key="permItem"
              class="flex items-center"
            >
              <input
                :id="permItem"
                v-model="selectedPermissions"
                type="checkbox"
                :value="permItem"
                class="mr-2"
              >
              <label
                :for="permItem"
                class="text-gray-700"
              >{{ permItem }}</label>
            </div>
          </div>
        </div>

        <!-- Current User Permissions -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-medium mb-4">
            Active Permissions
          </h2>
          <ul class="list-disc list-inside">
            <li
              v-for="perm in selectedPermissions"
              :key="perm"
              class="text-gray-700"
            >
              {{ perm }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Route Permissions -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-medium mb-4">
            Route Permissions
          </h2>
          <div class="space-y-2">
            <div
              v-for="(value, route) in $routePermissions"
              :key="route"
              class="text-gray-700"
            >
              <span class="font-medium">{{ route }}:</span>
              {{ value }}
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-medium mb-4">
            Navigation
          </h2>
          <div class="flex flex-col gap-2">
            <NuxtLink
              to="user1-page"
              class="text-red-500 hover:underline"
            >User 1 Page</NuxtLink>
            <NuxtLink
              to="user2-page"
              class="text-green-500 hover:underline"
            >User 2 Page</NuxtLink>
            <NuxtLink
              to="combined"
              class="text-green-500 hover:underline"
            >Combined</NuxtLink>
            <NuxtLink
              to="any"
              class="text-yellow-500 hover:underline"
            >Any</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Setup Instructions -->
    <div class="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-medium mb-4">
        Quick Start Guide
      </h2>

      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-medium mb-2">
            1. Installation
          </h3>
          <pre class="bg-gray-50 p-3 rounded"><code>npm install nuxt-permission</code></pre>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            2. Module Setup
          </h3>
          <pre class="bg-gray-50 p-3 rounded"><code>// nuxt.config.ts
export default defineNuxtConfig({
    modules: ['nuxt-permission'],
    nuxtPermissionChecker: {
        global: true,     // Enable global route middleware
        redirect: '/'     // Redirect path for unauthorized access
    }
})</code></pre>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            3. Define Route Permissions
          </h3>
          <pre class="bg-gray-50 p-3 rounded"><code>// plugins/permissions.js
export default defineNuxtPlugin((nuxtApp) => {
    const routePermissions = {
        'user1-page': 'user1:permission',                          // Single permission
        'user2-page': 'user2:permission',                          // Single permission
        'combined': 'user1:permission && user2:permission',        // Requires both permissions
        'any': 'user1:permission || user2:permission',             // Requires any of these permissions
    };

    // Set route permissions
    nuxtApp.$permissionChecker.setRoutePermissions(routePermissions);
});</code></pre>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            4. Usage in Components
          </h3>
          <pre class="bg-gray-50 p-3 rounded"><code>// Set permissions for current user
const app = useNuxtApp();
app.$permissionChecker.setPermissions(['user1:permission']);

// Handle unauthorized access
app.$permissionChecker.setUnauthorizedCallback((route, requiredPermissions) => {
    console.log(`Access Denied: Missing permissions (${requiredPermissions}) for ${route}`);
});</code></pre>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            5. Permission Types
          </h3>
          <div class="space-y-2 text-sm text-gray-600">
            <p><code class="bg-gray-100 px-2 py-1 rounded">'route': 'permission'</code> - Requires exact permission</p>
            <p><code class="bg-gray-100 px-2 py-1 rounded">'route': 'permission1 && permission2'</code> - Requires both permissions</p>
            <p><code class="bg-gray-100 px-2 py-1 rounded">'route': 'permission1 || permission2'</code> - Requires any of the permissions</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
console.log('index.vue')
const app = useNuxtApp()
const permission = app.$permissionChecker
const notification = ref(null)

const availablePermissions = [
  'user1:permission',
  'user2:permission',
  // Buraya daha fazla permission ekleyebilirsiniz
]

const selectedPermissions = ref([])

// Initialize permissions
permission.setPermissions(selectedPermissions.value)

// Watch for permission changes
watch(selectedPermissions, (newPermissions) => {
  permission.setPermissions(newPermissions)
})

// Unauthorized callback
onMounted(() => {
  app.$permissionChecker.setUnauthorizedCallback((route, requiredPermissions) => {
    notification.value?.showMessage(`You do not have the required permissions (${requiredPermissions}) to access this page`)
  })
})
</script>
