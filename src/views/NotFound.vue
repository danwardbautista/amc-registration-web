<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full p-8 text-center">
      <!-- Empty Bucket Icon -->
      <div class="mb-6">
        <svg class="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      
      <!-- 404 Text -->
      <h1 class="text-6xl font-bold text-red-500 mb-4">404</h1>
      
      <!-- Page Not Found -->
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      
      <!-- Description -->
      <p class="text-gray-600 text-lg mb-8">
        The page you're looking for doesn't exist! 
      </p>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          @click="goHome" 
          class="px-4 py-2 bg-emerald-400 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
        >
          Take me back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

</script>