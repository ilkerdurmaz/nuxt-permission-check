<template>
  <div
    class="relative w-full flex pointer-events-auto"
    @mouseenter.stop="props.use.mouseEnter"
    @mouseleave.stop="props.use.mouseLeave"
  >
    <div
      class="flex w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border select-none"
    >
      <div class="w-full flex items-center p-4">
        <div class="flex-shrink-0">
          <i
            class="la text-2xl"
            :class="{
              'text-emerald-500 la-check-circle': settings.type == 'success',
              'text-blue-600 la-info-circle': settings.type == 'info',
              'text-yellow-500 la-warning': settings.type == 'warning',
              'text-red-500 la-exclamation-circle': settings.type == 'error',
            }"
          />
        </div>
        <div class="w-[246px] ml-3 flex-1 break-words">
          <p
            class="text-sm font-medium text-gray-900"
          >
            {{ settings.title ?? 'Title' }}
          </p>
          <p
            class="mt-1 text-sm text-gray-500"
          >
            {{ settings.message }}
          </p>
        </div>
      </div>
      <div
        v-if="settings.closable == true || settings.autoClose == false"
        class="w-[30px] h-[30px] flex mt-1 mr-1"
      >
        <button
          class="w-6 h-6 flex justify-center items-center rounded-md border hover:border-yellow-500 hover:text-yellow-500 transition-colors focus:ring-0 focus:outline-none shrink-0 shadow-sm ltr:ml-auto rtl:mr-auto"
          @click="props.use.destroy()"
        >
          <i class="la la-times text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  use: {
    type: Object as PropType<TNotificationController>,
    default: () => ({}),
  },
})

const settings = ref(props.use.getSettings())
props.use.start()
</script>
