<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
console.log('app.vue')
useNuxtApp().$permissionChecker.setPermissions(['user1:permission'])
</script>
