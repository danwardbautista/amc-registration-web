<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-full scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-full scale-95"
      >
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Success -->
                <div
                  v-if="toast.type === 'success'"
                  class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full"
                >
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <!-- Error -->
                <div
                  v-else-if="toast.type === 'error'"
                  class="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full"
                >
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <!-- Warning -->
                <div
                  v-else-if="toast.type === 'warning'"
                  class="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full"
                >
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <!-- Info -->
                <div
                  v-else
                  class="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full"
                >
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900">{{ toast.title }}</p>
                <p v-if="toast.message" class="mt-1 text-sm text-gray-500">{{ toast.message }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="toastStore.removeToast(toast.id)"
                  class="bg-white rounded-md inline-flex cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '../stores/toast'

const toastStore = useToastStore()
</script>