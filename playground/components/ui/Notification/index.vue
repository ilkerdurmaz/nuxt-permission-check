<template>
  <div class="fixed top-2 right-2 pointer-events-none z-[9999] sm:items-start">
    <transition-group
      name="list"
      tag="ul"
    >
      <UiNotificationItems
        v-for="not of getNotificationStore()"
        :key="not.getSettings().id"
        :use="not"
        class="mt-2"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { getNotificationStore } from '~/composables/notification'
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
