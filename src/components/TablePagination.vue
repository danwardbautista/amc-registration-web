<!-- /src/components/<!-- /src/components/TablePagination.vue -->
<template>
  <div class="bg-white px-4 sm:px-6 py-4 border-t border-gray-200">
    <!-- Mobile Layout -->
    <div class="block sm:hidden">
      <!-- Results info for mobile -->
      <div class="text-center text-sm text-gray-700 mb-4">
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
      </div>
      
      <!-- Per page selector for mobile -->
      <div class="flex items-center justify-center space-x-2 mb-4">
        <label for="per-page-mobile" class="text-sm text-gray-700">Show:</label>
        <select 
          id="per-page-mobile"
          :value="perPage" 
          @change="$emit('change-per-page', parseInt(($event.target as HTMLSelectElement).value))"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
        >
          <option 
            v-for="option in perPageOptions" 
            :key="option" 
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <span class="text-sm text-gray-700">per page</span>
      </div>

      <!-- Mobile pagination controls -->
      <div class="flex items-center justify-between">
        <button 
          @click="$emit('go-to-page', currentPage - 1)" 
          :disabled="currentPage <= 1" 
          :class="[
            'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentPage <= 1
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer bg-white'
          ]"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <!-- Current page indicator -->
        <span class="text-sm text-gray-700 font-medium">
          Page {{ currentPage }} of {{ pagination.last_page }}
        </span>

        <button 
          @click="$emit('go-to-page', currentPage + 1)"
          :disabled="currentPage >= pagination.last_page" 
          :class="[
            'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentPage >= pagination.last_page
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer bg-white'
          ]"
        >
          Next
          <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden sm:flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <!-- Results info -->
        <div class="flex items-center text-sm text-gray-700">
          <span>
            Showing {{ pagination.from }} to {{ pagination.to }}
            of {{ pagination.total }} results
          </span>
        </div>
        
        <!-- Per page selector -->
        <div class="flex items-center space-x-2">
          <label for="per-page" class="text-sm text-gray-700">Show:</label>
          <select 
            id="per-page"
            :value="perPage" 
            @change="$emit('change-per-page', parseInt(($event.target as HTMLSelectElement).value))"
            class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            <option 
              v-for="option in perPageOptions" 
              :key="option" 
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <span class="text-sm text-gray-700">per page</span>
        </div>
      </div>
      
      <!-- Pagination controls -->
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('go-to-page', currentPage - 1)" 
          :disabled="currentPage <= 1" 
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            currentPage <= 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer'
          ]"
        >
          Previous
        </button>

        <template v-for="page in paginationPages" :key="page">
          <button 
            v-if="page !== '...'" 
            @click="$emit('go-to-page', page as number)" 
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
              page === currentPage
                ? 'bg-emerald-500 text-white'
                : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
            ]"
          >
            {{ page }}
          </button>
          <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
        </template>

        <button 
          @click="$emit('go-to-page', currentPage + 1)"
          :disabled="currentPage >= pagination.last_page" 
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            currentPage >= pagination.last_page
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer'
          ]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaginatedResponse } from '../stores/registration'

interface Props {
  pagination: PaginatedResponse
  currentPage: number
  perPage: number
  perPageOptions?: number[]
}

interface Emits {
  (e: 'go-to-page', page: number): void
  (e: 'change-per-page', perPage: number): void
}

const props = withDefaults(defineProps<Props>(), {
  perPageOptions: () => [10, 20, 50]
})

defineEmits<Emits>()

const paginationPages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.currentPage
  const total = props.pagination.last_page

  // First page
  if (current > 3) {
    pages.push(1)
    if (current > 4) pages.push('...')
  }

  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    if (current < total - 3) pages.push('...')
    pages.push(total)
  }

  return pages
})
</script>