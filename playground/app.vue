<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
console.log('app.vue')
useNuxtApp().$permission.setPermissions(['user1:permission'])
</script>