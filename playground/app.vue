<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useNuxtApp().$permissionCheck.setPermissions(['user1:permission'])
</script>
