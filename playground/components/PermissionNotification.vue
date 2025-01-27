<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-2 opacity-0"
  >
    <div
      v-if="message"
      class="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <svg
            class="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <p>{{ message }}</p>
        </div>
        <button
          class="ml-4 text-red-700 hover:text-red-900"
          @click="clearMessage"
        >
          ×
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const message = ref('')
const timeout = ref(null)

const showMessage = (msg) => {
  message.value = msg
  if (timeout.value) clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    message.value = ''
  }, 3000)
}

const clearMessage = () => {
  message.value = ''
  if (timeout.value) clearTimeout(timeout.value)
}

defineExpose({ showMessage })
</script>
