<template>
  <div class="container mx-auto p-8">
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

        <!-- V-Can Example -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-medium mb-4">
            V-Can Example
          </h2>
          <div class="space-y-4">
            <button
              :key="selectedPermissions"
              v-can.disabled="'user2:permission'"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              @click="console.log('clicked')"
            >
              Only user2:permission can click
            </button>
          </div>
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
  </div>
</template>

<script setup>
const app = useNuxtApp()
const permission = app.$permissionCheck

const availablePermissions = [
  'user1:permission',
  'user2:permission',
  // Buraya daha fazla permission ekleyebilirsiniz
]

const selectedPermissions = ref(['user1:permission'])

// Initialize permissions
permission.setPermissions(selectedPermissions.value)

// Watch for permission changes
watch(selectedPermissions, (newPermissions) => {
  permission.setPermissions(newPermissions)
})

// Unauthorized callback
onMounted(() => {
  app.$permissionCheck.setUnauthorizedCallback((route, requiredPermissions) => {
    notify.error(`You do not have the required permissions (${requiredPermissions}) to access this page`)
  })
})
</script>

<style>
.permission-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}
</style>
