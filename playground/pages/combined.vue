<template>
  <div class="container mx-auto p-8">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-medium mb-4">
        Combined Page
      </h1>
      <p class="text-gray-600 mb-4">
        This page requires both 'user1:permission' and 'user2:permission' to access
      </p>
      <NuxtLink
        to="/"
        class="text-blue-500 hover:underline"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>
