<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useNuxtApp().$permissionChecker.setPermissions(['user1:permission'])
</script>
