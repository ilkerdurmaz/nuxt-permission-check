<template>
  <div class="container mx-auto p-8">
    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <h1 class="text-3xl font-medium">
        Any Page
      </h1>
      <p class="text-gray-600">
        This page is accessible to all users
      </p>
      <NuxtLink
        to="/user2-page"
        class="text-blue-500 hover:underline"
      >
        User2 Page
      </NuxtLink>
      <NuxtLink
        to="/"
        class="text-blue-500 hover:underline"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>
